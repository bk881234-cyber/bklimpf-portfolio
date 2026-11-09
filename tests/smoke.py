"""Smoke tests for the static portfolio site.

Run all:   python -I tests/smoke.py
Run one:   python -I tests/smoke.py test_hero_intro
Serves the repo root on 127.0.0.1:8765 and drives Chromium via Playwright.
"""
import contextlib, functools, http.server, os, sys, threading, traceback

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
BASE = "http://127.0.0.1:8765"

from playwright.sync_api import sync_playwright  # noqa: E402


@contextlib.contextmanager
def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k):
            pass
    handler = functools.partial(Quiet, directory=ROOT)
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 8765), handler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    try:
        yield
    finally:
        httpd.shutdown()


_pw = None
_browser = None


@contextlib.contextmanager
def page(viewport=(1440, 900), reduced=False, touch=False):
    ctx = _browser.new_context(
        viewport={"width": viewport[0], "height": viewport[1]},
        reduced_motion="reduce" if reduced else "no-preference",
        has_touch=touch, is_mobile=touch,
    )
    p = ctx.new_page()
    try:
        yield p
    finally:
        ctx.close()


# ---------------------------------------------------------------- Task 1
def test_baseline():
    with page() as p:
        p.goto(BASE + "/index.html")
        n = p.evaluate("projectsData.length"); assert n == 20, n
        assert p.evaluate("imageUrls.length") == 20
        assert p.evaluate("projectsData[0].title") == "Web & Brand by AI"
        assert p.evaluate("projectsData[19].title") == "검은사막"
    for f in ["ai_driven_th.jpg", "VL_project_th.png", "ai_driven_02.jpg", "클로드.png",
              "logo-1000.png", "logo-160.png", "favicon.png"]:
        assert os.path.exists(os.path.join("assets", f)), f
    from PIL import Image
    assert Image.open("assets/logo-1000.png").size == (1000, 518)
    assert Image.open("assets/logo-160.png").size == (160, 83)


def test_no_page_errors():
    for path in ["/index.html", "/project.html?id=0", "/project.html?id=7"]:
        with page() as p:
            errors = []
            p.on("pageerror", lambda e: errors.append(str(e)))
            p.goto(BASE + path); p.wait_for_timeout(500)
            assert errors == [], (path, errors)


# ---------------------------------------------------------------- Task 2
SHAFT = """()=>{const s=document.querySelector('.hero-stage').getBoundingClientRect(),
     l=document.querySelector('.hero-path').getBoundingClientRect();
     return ((l.top+l.height/2)-s.top)/s.height}"""


def test_hero_intro():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.evaluate("document.getElementById('hero').classList.contains('is-lit')")
        cp = p.evaluate("getComputedStyle(document.querySelector('.hero-reveal')).clipPath")
        assert cp in ("none", "inset(0px)"), cp
        nav = p.evaluate("[...document.querySelectorAll('#header nav a')].map(a=>a.textContent.trim())")
        assert nav == ["Home", "Portfolio", "About"], nav
        assert p.get_attribute("a.hero-btn", "href") == "./portfolio.pdf"
        assert p.evaluate("document.querySelector('a.hero-btn').hasAttribute('download')")


def test_hero_logo_assets():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.get_attribute("img.hero-logo", "src").endswith("assets/logo-1000.png")
        t = p.evaluate("getComputedStyle(document.querySelector('.hero-stage')).transform")
        assert t in ("none", "matrix(1, 0, 0, 1, 0, 0)"), t


def test_hero_line_alignment():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(300)
        r = p.evaluate(SHAFT)
        assert abs(r - 0.4913) < 0.004, r


def test_hero_resize_alignment():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        p.set_viewport_size({"width": 1024, "height": 700}); p.wait_for_timeout(200)
        r = p.evaluate(SHAFT)
        assert abs(r - 0.4913) < 0.004, r


def test_hero_trail_rate():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        p.evaluate("""window.__t=[];window.__maxVis=0;new MutationObserver(()=>{
            __maxVis=Math.max(__maxVis,document.querySelectorAll('.hero-trail .ti:not(.out)').length)})
            .observe(document.querySelector('.hero-trail'),{childList:true,subtree:true,attributes:true});
            new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(()=>__t.push(performance.now()))))
            .observe(document.querySelector('.hero-trail'),{childList:true})""")
        box = p.locator("#hero").bounding_box()
        y = box["y"] + box["height"] * .8
        p.mouse.move(box["x"] + 50, y)
        for i in range(80):  # fast sweep
            p.mouse.move(box["x"] + 50 + i * (box["width"] - 100) / 80, y); p.wait_for_timeout(16)
        ts = p.evaluate("__t")
        gaps = [b - a for a, b in zip(ts, ts[1:])]
        assert len(ts) >= 2, ts
        assert min(gaps) >= 345, gaps            # at most one thumbnail per 350ms
        assert p.evaluate("__maxVis") <= 3, p.evaluate("__maxVis")


def test_hero_reduced_motion():
    with page(reduced=True) as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(100)
        assert p.evaluate("document.getElementById('hero').classList.contains('is-lit')")


def test_hero_touch_no_trail():
    with page(touch=True) as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.evaluate("getComputedStyle(document.querySelector('.hero-cursor')).display") == "none"
        p.mouse.move(100, 500); p.mouse.move(600, 500)
        assert p.evaluate("document.querySelectorAll('.hero-trail .ti').length") == 0


# ---------------------------------------------------------------- runner
def main(argv):
    global _pw, _browser
    names = argv[1:] or [n for n in globals() if n.startswith("test_")]
    failed = 0
    with serve():
        _pw = sync_playwright().start()
        _browser = _pw.chromium.launch()
        try:
            for name in names:
                try:
                    globals()[name]()
                    print(f"PASS {name}")
                except Exception:
                    failed += 1
                    print(f"FAIL {name}")
                    traceback.print_exc(limit=3)
        finally:
            _browser.close(); _pw.stop()
    print(f"{len(names) - failed}/{len(names)} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
