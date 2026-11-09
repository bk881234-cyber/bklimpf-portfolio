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
