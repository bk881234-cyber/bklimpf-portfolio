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
def page(viewport=(1440, 900), reduced=False, touch=False, dpr=1):
    ctx = _browser.new_context(
        viewport={"width": viewport[0], "height": viewport[1]}, device_scale_factor=dpr,
        reduced_motion="reduce" if reduced else "no-preference",
        has_touch=touch, is_mobile=touch,
    )
    # the site uses `scroll-behavior: smooth`; tests need the page to stop where Playwright scrolls it
    ctx.add_init_script("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');"
                        "s.textContent='html{scroll-behavior:auto!important}';document.head.appendChild(s)})")
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


# ---------------------------------------------------------------- Task 3
def test_grid():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.evaluate("document.querySelectorAll('.portfolio-item').length") == 20
        assert p.evaluate("getComputedStyle(document.querySelector('.portfolio-grid')).gap") == "4px"
        cols = p.evaluate("getComputedStyle(document.querySelector('.portfolio-grid')).gridTemplateColumns.split(' ').length")
        assert cols == 5, cols
        p.locator(".portfolio-item").nth(7).scroll_into_view_if_needed(); p.wait_for_timeout(1200)
        assert p.evaluate("document.querySelectorAll('.portfolio-item.in').length") >= 10
        p.hover(".portfolio-item >> nth=7"); p.wait_for_timeout(600)
        other = p.evaluate("getComputedStyle(document.querySelectorAll('.portfolio-item')[6],'::before').opacity")
        mine = p.evaluate("getComputedStyle(document.querySelectorAll('.portfolio-item')[7],'::before').opacity")
        img_op = p.evaluate("getComputedStyle(document.querySelectorAll('.portfolio-item img')[6]).opacity")
        assert other == "1" and mine == "0" and img_op == "1", (other, mine, img_op)
        assert p.evaluate("document.querySelectorAll('.portfolio-item')[7].querySelector('.cap-t').textContent") == "BMW"


def test_grid_click_plays_transition():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        p.locator(".portfolio-item").nth(7).scroll_into_view_if_needed(); p.wait_for_timeout(900)
        p.locator(".portfolio-item").nth(7).click()
        p.wait_for_timeout(120)
        assert "index.html" in p.url, p.url                    # still on the grid while the panel opens
        assert p.locator(".grid-trans").count() == 1
        p.wait_for_url("**/project.html?id=7", timeout=3000)


def test_grid_back_restores_clean():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        p.locator(".portfolio-item").nth(7).scroll_into_view_if_needed(); p.wait_for_timeout(900)
        p.locator(".portfolio-item").nth(7).click(); p.wait_for_url("**/project.html?id=7", timeout=3000)
        p.go_back(); p.wait_for_timeout(500)
        assert p.locator(".grid-trans").count() == 0


def test_header_bg_after_small_scroll():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(500)
        p.mouse.wheel(0, 120); p.wait_for_timeout(300)
        assert p.evaluate("document.getElementById('header').classList.contains('is-scrolled')")


def test_hero_logo_size():
    for vw, vh, lo in [(1440, 900, 650), (2560, 1440, 900)]:
        with page(viewport=(vw, vh)) as p:
            p.goto(BASE + "/index.html"); p.wait_for_timeout(400)
            w = p.evaluate("document.querySelector('.hero-stage').getBoundingClientRect().width")
            assert lo <= w <= 1000, (vw, w)


# ---------------------------------------------------------------- Task 4
def test_detail_page():
    with page() as p:
        errors = []; p.on("pageerror", lambda e: errors.append(str(e)))
        p.goto(BASE + "/project.html?id=7"); p.wait_for_timeout(1500)
        assert "08 / 20" in p.inner_text(".dp-top")
        assert p.locator(".prev-btn").get_attribute("href") == "project.html?id=6"
        assert p.locator(".next-btn").get_attribute("href") == "project.html?id=8"
        assert p.locator(".back-btn").count() >= 1
        assert p.locator(".dp-next").count() == 0
        assert not p.locator(".project-title-bar").is_visible()   # live hides the in-content title bar
        p.mouse.wheel(0, 1500); p.wait_for_timeout(1300)
        assert p.evaluate("parseFloat(getComputedStyle(document.querySelector('.dp-bar')).width)") > 0
        assert p.evaluate("document.querySelectorAll('.project-images [data-reveal].in').length") >= 1
        f = p.evaluate("getComputedStyle(document.querySelector('.project-images [data-reveal]')).filter")
        assert f == "none", f                                   # no blur on detail reveals
        assert errors == [], errors


def test_detail_wraparound():
    with page() as p:
        p.goto(BASE + "/project.html?id=0"); p.wait_for_timeout(500)
        assert p.locator(".prev-btn").get_attribute("href") == "project.html?id=19"
        p.goto(BASE + "/project.html?id=19"); p.wait_for_timeout(500)
        assert p.locator(".next-btn").get_attribute("href") == "project.html?id=0"


def test_detail_bad_id():
    for q in ["?id=99", "?id=abc", "?id=-1", ""]:
        with page() as p:
            errors = []; p.on("pageerror", lambda e: errors.append(str(e)))
            p.goto(BASE + "/project.html" + q); p.wait_for_timeout(500)
            assert "프로젝트를 찾을 수 없습니다" in p.inner_text("body"), q
            assert p.locator(".project-side-nav").count() == 0, q
            assert errors == [], (q, errors)


# ---------------------------------------------------------------- Task 5
def test_about_and_polish():
    with page() as p:
        errors = []; p.on("pageerror", lambda e: errors.append(str(e)))
        p.goto(BASE + "/index.html"); p.wait_for_timeout(500)
        html = p.content()
        assert "트랜드" not in html and "트렌드" in html
        assert p.request.get(BASE + "/assets/favicon.png").status == 200
        p.locator("#about").scroll_into_view_if_needed(); p.wait_for_timeout(1400)
        n = p.evaluate("document.querySelectorAll('#about [data-reveal].in').length")
        assert n >= 3, n
        assert errors == [], errors


# ---------------------------------------------------------------- final review fixes
def test_hero_logo_hidpi():  # logo bitmap must be >= displayed device pixels on wide Retina screens
    with page(viewport=(1920, 1080), dpr=2) as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(800)
        # with srcset, naturalWidth is density-corrected; measure the chosen file's real bitmap width
        nat = p.evaluate("""()=>new Promise(r=>{const i=new Image();i.onload=()=>r(i.naturalWidth);
              i.src=document.querySelector('img.hero-logo').currentSrc})""")
        shown = p.evaluate("document.querySelector('img.hero-logo').getBoundingClientRect().width * devicePixelRatio")
        assert nat >= shown, (nat, shown)


def test_hero_cursor_visible_until_custom_cursor():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(300)
        assert p.evaluate("getComputedStyle(document.getElementById('hero')).cursor") != "none"   # during intro
        p.wait_for_timeout(2400)
        assert p.evaluate("getComputedStyle(document.getElementById('hero')).cursor") != "none"   # lit, mouse not moved
        box = p.locator("#hero").bounding_box()
        p.mouse.move(box["x"] + 200, box["y"] + 200); p.mouse.move(box["x"] + 260, box["y"] + 220)
        p.wait_for_timeout(100)
        assert p.evaluate("getComputedStyle(document.getElementById('hero')).cursor") == "none"   # custom cursor shown


def test_hero_reduced_motion_no_trail():
    with page(reduced=True) as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(300)
        box = p.locator("#hero").bounding_box(); y = box["y"] + box["height"] * .8
        for i in range(60):
            p.mouse.move(box["x"] + 50 + i * (box["width"] - 100) / 60, y); p.wait_for_timeout(30)
        assert p.evaluate("document.querySelectorAll('.hero-trail .ti').length") == 0


def test_no_serif_headings():   # user: drop the serif title block on detail pages and the "Portfolio" word
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(400)
        assert p.locator(".portfolio-head").count() == 0
        assert "Portfolio" not in p.inner_text(".portfolio-section")
        p.goto(BASE + "/project.html?id=0"); p.wait_for_timeout(600)
        assert p.locator(".dp-hero").count() == 0
        assert "PROJECT 01" not in p.inner_text("main")
        assert "01 / 20" in p.inner_text(".dp-top")


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
