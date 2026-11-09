# BKLimpf 포트폴리오 리뉴얼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 배포본을 기준선으로 가져온 뒤, 메인 인트로·마우스 트레일, 바둑판 포커스 호버, 상세 페이지 모션을 정적 사이트에 구현한다.

**Architecture:** 정적 HTML/CSS/바닐라 JS를 유지한다(빌드 없음). 메인 전용 코드는 `hero.css`/`hero.js`, 스크롤 등장은 공용 `reveal.js`로 분리한다. 그리드는 기존 `script.js`, 상세는 기존 `project.js`/`project-detail.css`를 수정한다. 검증은 `tests/smoke.py` 한 파일에서 Playwright(Python, 이미 설치됨)로 로컬 서버를 띄워 한다.

**Tech Stack:** HTML/CSS/JS(ES2017, 라이브러리 없음), Python 3.14 + playwright(sync API) + Pillow(이미 설치됨, pytest 없음)

**Spec:** `docs/superpowers/specs/2026-11-09-portfolio-renewal-design.md`. 참고 구현(승인된 시안)은 `.superpowers/brainstorm/202-1794200095/content/`의 `hero-a-v5.html`, `work-grid.html`(mode 2), `detail-page.html`이다. 값은 시안에서 그대로 옮긴다.

## Global Constraints

- 외부 JS 라이브러리 금지. 폰트/아이콘 CDN은 기존 것(Google Fonts Open Sans, Font Awesome 6.4.0)만 쓴다
- 팔레트: 배경 `#ccc8c2`/`#e6e2dc`, 잉크 `#3e3431`·`#4f4540`, 보조 `#857870`, 버튼 `#4B3D39`, 버튼 호버 `#2f2523`
- 이징: 등장 `cubic-bezier(.16,1,.3,1)`, 퇴장 `cubic-bezier(.4,0,.2,1)`. 바운스/오버슈트 금지
- 로고에 transform·blur·opacity 애니메이션 금지. 드러남은 `clip-path`만 쓴다. 이미지는 `assets/logo-1000.png`, 메뉴는 `assets/logo-160.png`
- blur는 메인 썸네일 등장(2px, 0.4s)에서만 쓴다. 그 외 등장 효과에는 blur 금지
- 상단 메뉴는 Home · Portfolio · About 세 개
- 프로젝트 수와 번호는 모두 `projectsData.length`에서 계산한다(20개). 하드코딩 금지
- `prefers-reduced-motion: reduce`이면 모든 등장 효과를 최종 상태로 즉시 보여준다. `(pointer: coarse)`이면 커스텀 커서·썸네일 트레일·커서 조명을 끈다
- 커밋은 사용자가 요청할 때만 한다. 각 Task의 "Commit" 단계는 사용자가 커밋을 허락했을 때만 실행한다

## Review Focus

1. **로고 선명도**: 고배율(DPR 2) 화면에서 로고 가장자리가 계단처럼 깨지면 안 된다 → Task 2에 `test_hero_logo_assets`(1000px 축소본 사용, 3D transform 없음)
2. **빠른 마우스 이동**: 마우스를 빠르게 휘저어도 썸네일은 350ms당 최대 1장, 동시 표시 최대 3장이다 → Task 2 `test_hero_trail_rate`
3. **창 크기 변경**: 인트로 도중이나 이후에 창 크기를 바꿔도 라인·로고가 어긋나지 않아야 한다(라인 좌표는 stage 기준 %) → Task 2 `test_hero_resize_alignment`
4. **잘못된 `?id`**: `project.html?id=99`, `?id=abc`, id 없음이면 "프로젝트를 찾을 수 없습니다." 화면이 나오고 사이드 버튼이 없어야 하며 JS 에러도 없어야 한다 → Task 4 `test_detail_bad_id`
5. **정보 없는 프로젝트**: `client/category/role`이 모두 비면 정보 행 자체가 없어야 한다(빈 줄이나 선만 남으면 안 됨) → Task 4 `test_detail_info_row`

---

## File Structure

| 파일 | 책임 |
|---|---|
| `index.html` | 메인 마크업: hero, 그리드 컨테이너, About, footer. 배포본 기준 |
| `style.css` | 공통 스타일, 그리드, About. 배포본 기준에서 수정 |
| `hero.css` / `hero.js` (신규) | 메인 인트로, 커서 조명, 썸네일 트레일, 커스텀 커서 |
| `reveal.js` (신규) | 공용 스크롤 등장. `[data-reveal]` 요소에 `.in`을 붙인다 |
| `script.js` | 그리드 생성, 포커스 호버용 마크업, 클릭 시 전환 데이터 저장 |
| `project.html` / `project.js` / `project-detail.css` | 상세: 고정 바, 진행 바, 헤더·정보 행, 이미지 등장, 좌우 버튼, 전환 재현 |
| `data.js` | `imageUrls[]`, `projectsData[]`(20개, 선택 필드 `client/category/role`) |
| `assets/` | 배포본 자산 20개, `logo-1000.png`, `logo-160.png`, `favicon.png` |
| `tests/smoke.py` (신규) | 로컬 서버와 Playwright 검사. `python -I tests/smoke.py [test_name]` |
| `backup/local-2026-11-09/` (신규, `.gitignore`) | 덮어쓰기 전 로컬 파일 백업 |

---

### Task 1: 배포본 기준선 + 자산 + 검사 도구

**Files:**
- Create: `tests/smoke.py`, `backup/local-2026-11-09/*`, `assets/logo-1000.png`, `assets/logo-160.png`, `assets/favicon.png`
- Modify(배포본으로 교체): `index.html`, `style.css`, `script.js`, `data.js`, `project.html`, `project.js`, `project-detail.css`. 그리고 `.gitignore`

**Interfaces:**
- Produces: `tests/smoke.py`의 헬퍼 `serve()`(포트 8765로 `http.server`를 띄우는 컨텍스트 매니저), `page(viewport=(1440,900), reduced=False, touch=False)`(Playwright page 컨텍스트 매니저), 테스트 러너(인자가 없으면 `test_`로 시작하는 함수 전부, 있으면 그 하나만 실행하고, 실패 시 exit 1). 전역 `BASE="http://127.0.0.1:8765"`. 시작할 때 `os.chdir`로 저장소 루트(`tests/`의 상위)로 이동한다. 서버는 전체 실행에서 한 번만 띄운다.
- Produces: `data.js` 전역 `imageUrls`(길이 20), `projectsData`(길이 20, 첫 항목 `"Web & Brand by AI"`, 마지막 `"검은사막"`)

- [ ] **Step 1: 백업.** 로컬 `index.html style.css script.js data.js project.html project.js project-detail.css`를 `backup/local-2026-11-09/`에 복사하고 `.gitignore`에 `backup/`를 추가한다.
- [ ] **Step 2: 실패하는 테스트 작성.** `tests/smoke.py`에 아래를 쓴다.

```python
def test_baseline():
    with page() as p:
        p.goto(BASE + "/index.html")
        n = p.evaluate("projectsData.length"); assert n == 20, n
        assert p.evaluate("imageUrls.length") == 20
        assert p.evaluate("projectsData[0].title") == "Web & Brand by AI"
        assert p.evaluate("projectsData[19].title") == "검은사막"
    for f in ["ai_driven_th.jpg","VL_project_th.png","ai_driven_02.jpg","클로드.png","logo-1000.png","logo-160.png","favicon.png"]:
        assert os.path.exists(os.path.join("assets", f)), f
    from PIL import Image
    assert Image.open("assets/logo-1000.png").size == (1000, 518)
    assert Image.open("assets/logo-160.png").size == (160, 83)
```

- [ ] **Step 3: 실행해서 실패를 확인한다.** `python -I tests/smoke.py test_baseline` → FAIL(`n == 19`).
- [ ] **Step 4: 배포본 가져오기.**
  - 위 7개 파일을 `https://www.bklimportfolio.com/<file>`에서 받아 교체한다
  - 배포본 `data.js`에 나오는 `assets/*` 20개를 받아 `assets/`에 저장한다. 한글 파일명은 URL 인코딩해서 요청한다
  - 로컬에만 있던 단독 "Fitters Studio" 항목은 가져오지 않는다. 배포본 1번 프로젝트 안에 이미 있다
- [ ] **Step 5: 자산 만들기.**
  - Wix 로고 원본(spec 4절 URL)을 PIL LANCZOS로 1000px·160px 너비로 줄인다
  - `favicon.png`는 로고를 64×64 투명 정사각형 가운데에 맞춘 것이다
- [ ] **Step 6: 실행해서 통과를 확인한다.** `python -I tests/smoke.py test_baseline` → PASS. 브라우저로 `index.html`과 `project.html?id=0`을 열어 콘솔 에러가 없는지도 본다.
- [ ] **Step 7: Commit**(허락 시) `git add -A ':!backup' && git commit -m "chore: sync baseline from live site, add assets and smoke tests"`

---

### Task 2: 메인 화면 (인트로 · 버튼 · 커서 · 썸네일 트레일)

**Files:**
- Create: `hero.css`, `hero.js`
- Modify: `index.html`(hero 섹션과 header 교체, `<link rel="icon" href="assets/favicon.png">`, 스크립트 순서 `data.js → hero.js → script.js → reveal.js`), `style.css`(기존 `.hero-*`, `.btn-pdf` 규칙 삭제)
- Test: `tests/smoke.py`

**Interfaces:**
- Consumes: `imageUrls`, `projectsData`(Task 1)
- Produces: hero DOM `#hero.hero` 아래 `.hero-stage > .hero-path, .hero-line, .hero-reveal > img.hero-logo, .hero-tip`, `.hero-meta`, `a.hero-btn[href="./portfolio.pdf"][download]`, `.hero-trail`, `.hero-cursor > .hero-cursor-label`. 인트로가 끝나면 `#hero`에 `is-lit` 클래스가 붙는다. 전역 `window.heroReplay()`.
- Produces: 공통 header 마크업 `header#header > a.logo > img[src="assets/logo-160.png"]` + `nav a.nav-link` 3개. Task 4가 같은 마크업을 쓴다.

- [ ] **Step 1: 실패하는 테스트 작성.**

```python
def test_hero_intro():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.evaluate("document.getElementById('hero').classList.contains('is-lit')")
        assert p.evaluate("getComputedStyle(document.querySelector('.hero-reveal')).clipPath") in ("none", "inset(0px)")
        assert p.evaluate("[...document.querySelectorAll('#header nav a')].map(a=>a.textContent.trim())") == ["Home","Portfolio","About"]
        assert p.get_attribute("a.hero-btn", "href") == "./portfolio.pdf"
        assert p.evaluate("document.querySelector('a.hero-btn').hasAttribute('download')")

def test_hero_logo_assets():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.get_attribute("img.hero-logo", "src").endswith("assets/logo-1000.png")
        t = p.evaluate("getComputedStyle(document.querySelector('.hero-stage')).transform")
        assert t in ("none", "matrix(1, 0, 0, 1, 0, 0)"), t

def test_hero_line_alignment():  # line centre == arrow shaft (49.13% of stage height)
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(300)
        r = p.evaluate("""()=>{const s=document.querySelector('.hero-stage').getBoundingClientRect(),
             l=document.querySelector('.hero-path').getBoundingClientRect();
             return ((l.top+l.height/2)-s.top)/s.height}""")
        assert abs(r - 0.4913) < 0.004, r

def test_hero_resize_alignment():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        p.set_viewport_size({"width": 1024, "height": 700}); p.wait_for_timeout(200)
        r = p.evaluate("""()=>{const s=document.querySelector('.hero-stage').getBoundingClientRect(),
             l=document.querySelector('.hero-path').getBoundingClientRect();
             return ((l.top+l.height/2)-s.top)/s.height}""")
        assert abs(r - 0.4913) < 0.004, r

def test_hero_trail_rate():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        box = p.locator("#hero").bounding_box()
        p.mouse.move(box["x"]+50, box["y"]+box["height"]*.8)
        for i in range(80):  # fast sweep, ~1.3s
            p.mouse.move(box["x"]+50+i*(box["width"]-100)/80, box["y"]+box["height"]*.8); p.wait_for_timeout(16)
        made = p.evaluate("document.querySelectorAll('.hero-trail .ti').length")
        vis = p.evaluate("document.querySelectorAll('.hero-trail .ti:not(.out)').length")
        assert 2 <= made <= 5, made
        assert vis <= 3, vis

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
```

- [ ] **Step 2: 실행해서 실패를 확인한다.** `python -I tests/smoke.py` → hero 테스트 7개 FAIL.
- [ ] **Step 3: `hero.css` 구현.**
  - `hero-a-v5.html`의 `.a5*` 규칙을 `.hero*`로 옮긴다
  - hero는 `min-height: 100vh`, 전체 폭
  - stage: `left:30.2%; top:18%; width:39.6%; aspect-ratio:2000/1035`. 모바일(≤768px)에서는 `width:72%; left:14%`
  - 라인·경로·화살촉 `top:49.13%`. 라인 높이 1.5px, 경로 1px, 투명도 .35
  - 썸네일: 정사각 9.5%. 등장 `filter .4s ease-out`, `opacity .7s`, `transform 1.6s`. 퇴장은 spec 4절 값
  - `@media (pointer:coarse){ .hero-cursor,.hero-trail,.hero-spot{display:none} .hero{cursor:auto} }`
- [ ] **Step 4: `hero.js` 구현.**
  - 인트로: 1500ms easeInOutCubic, 진행률 0.72에서 `is-lit`. `hero-a-v5.html`의 `a5Play` 로직을 그대로 쓴다
  - 커서 lerp: 조명 0.08, 커서 0.35
  - 트레일 조건: `dist > hero.width*0.05 && now-lastT > 350`. 1100ms 뒤 `.out`, 2600ms 뒤 제거. 보이는 것이 3개를 넘으면 가장 오래된 것에 `.out`
  - 썸네일 URL: `static.wixstatic.com`이면 `+'/v1/fill/w_300,h_300,al_c,q_80/thumb.jpg'`, 아니면 그대로. 모두 미리 로드한다
  - 라벨: `NN / ${projectsData.length} ${title}`. 커서 x가 72%를 넘으면 `.flip`
  - `matchMedia('(pointer:coarse)').matches`면 pointer 핸들러를 등록하지 않는다. reduced-motion이면 즉시 `is-lit`, clipPath `none`
- [ ] **Step 5: 실행해서 통과를 확인한다.** `python -I tests/smoke.py` → 전부 PASS. 브라우저로 DPR 2 확대 캡처를 찍어 로고 가장자리를 눈으로 확인한다.
- [ ] **Step 6: Commit**(허락 시) `git commit -m "feat: hero intro, cursor light and thumbnail trail"`

---

### Task 3: 포트폴리오 그리드 (포커스 호버 · 스크롤 등장)

**Files:**
- Create: `reveal.js`
- Modify: `script.js`, `style.css`(`.portfolio-*` 교체), `index.html`(섹션 제목 마크업)
- Test: `tests/smoke.py`

**Interfaces:**
- Consumes: `imageUrls`, `projectsData`
- Produces:
  - 타일 마크업 `.portfolio-item[data-index] > img + .portfolio-cap > .cap-n + .cap-t`. 클릭하면 `sessionStorage.setItem('bk-transition', JSON.stringify({index, rect:{x,y,w,h}, src}))` 후 `project.html?id=N`으로 이동한다
  - `reveal.js`: `[data-reveal]` 요소가 화면에 들어오면 `.in`을 붙인다(threshold 0.08, 한 번만). 요소별 지연은 CSS 변수 `--i`. Task 4와 Task 5가 같은 속성을 쓴다

- [ ] **Step 1: 실패하는 테스트 작성.**

```python
def test_grid():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        assert p.evaluate("document.querySelectorAll('.portfolio-item').length") == 20
        assert p.evaluate("getComputedStyle(document.querySelector('.portfolio-grid')).gap") == "4px"
        assert p.evaluate("getComputedStyle(document.querySelector('.portfolio-grid')).gridTemplateColumns.split(' ').length") == 5
        assert "20 PROJECTS" in p.inner_text(".portfolio-section")
        p.locator(".portfolio-item").nth(7).scroll_into_view_if_needed(); p.wait_for_timeout(1200)
        assert p.evaluate("document.querySelectorAll('.portfolio-item.in').length") >= 10
        p.hover(".portfolio-item >> nth=7"); p.wait_for_timeout(600)
        other = p.evaluate("getComputedStyle(document.querySelectorAll('.portfolio-item')[6],'::before').opacity")
        mine  = p.evaluate("getComputedStyle(document.querySelectorAll('.portfolio-item')[7],'::before').opacity")
        img_op = p.evaluate("getComputedStyle(document.querySelectorAll('.portfolio-item img')[6]).opacity")
        assert other == "1" and mine == "0" and img_op == "1", (other, mine, img_op)
        assert p.evaluate("document.querySelectorAll('.portfolio-item')[7].querySelector('.cap-t').textContent") == "BMW"
```

- [ ] **Step 2: 실행해서 실패를 확인한다.** `python -I tests/smoke.py test_grid` → FAIL.
- [ ] **Step 3: 구현.**
  - `work-grid.html` mode 2 규칙을 `.portfolio-*`로 옮긴다
  - 다른 타일에는 `::before`로 `rgba(32,24,21,.42)` 막과 `saturate(.8)`을 준다. 호버한 타일은 scale 1.04, `::after` 그림자, 캡션
  - 반응형 열 수: ≤1280 4열, ≤1024 3열, ≤480 2열
  - 타일에 `data-reveal`과 `style="--i:N"`을 붙인다. 등장 시 `transition-delay: calc(var(--i)*40ms)`
  - 터치 기기에서는 캡션을 항상 표시하고 막은 쓰지 않는다
- [ ] **Step 4: 실행해서 통과를 확인한다.** `python -I tests/smoke.py` → 전부 PASS
- [ ] **Step 5: Commit**(허락 시) `git commit -m "feat: portfolio grid focus hover and scroll reveal"`

---

### Task 4: 상세 페이지 (전환 · 고정 바 · 정보 행 · 이미지 등장 · 좌우 버튼)

**Files:**
- Modify: `project.html`(Task 2의 header 마크업, favicon, `reveal.js` 로드), `project.js`, `project-detail.css`, `data.js`(필드 추가)
- Test: `tests/smoke.py`

**Interfaces:**
- Consumes: `sessionStorage['bk-transition']`(Task 3), `[data-reveal]`/`reveal.js`(Task 3), header 마크업(Task 2)
- Produces: `project.js` 함수 `renderHeader(index:number, data:object) -> HTMLElement`(`.dp-hero` 반환. 정보 행 `.dp-info`는 값이 있는 칸만 만들고 하나도 없으면 생략), `createProjectNavigation(index:number) -> void`(배포본 함수를 유지하고 클래스명도 유지), `playTransition() -> void`(sessionStorage 값이 있으면 오버레이를 재현한 뒤 삭제)

- [ ] **Step 1: 실패하는 테스트 작성.**

```python
def test_detail_page():
    with page() as p:
        errors = []; p.on("pageerror", lambda e: errors.append(str(e)))
        p.goto(BASE + "/project.html?id=7"); p.wait_for_timeout(1500)
        assert p.inner_text(".dp-hero h1").strip() == "BMW"
        assert "08 / 20" in p.inner_text(".dp-top")
        assert p.locator(".prev-btn").get_attribute("href") == "project.html?id=6"
        assert p.locator(".next-btn").get_attribute("href") == "project.html?id=8"
        assert p.locator(".back-btn").count() >= 1
        assert p.locator(".dp-next").count() == 0
        p.mouse.wheel(0, 1500); p.wait_for_timeout(1300)
        assert float(p.evaluate("parseFloat(getComputedStyle(document.querySelector('.dp-bar')).width)")) > 0
        assert p.evaluate("document.querySelectorAll('.project-images img[data-reveal].in, .project-images [data-reveal].in').length") >= 1
        assert errors == [], errors

def test_detail_wraparound():
    with page() as p:
        p.goto(BASE + "/project.html?id=0"); p.wait_for_timeout(500)
        assert p.locator(".prev-btn").get_attribute("href") == "project.html?id=19"

def test_detail_info_row():
    with page() as p:
        p.goto(BASE + "/project.html?id=7"); p.wait_for_timeout(800)
        assert "BMW" in p.inner_text(".dp-info")                      # client filled
        assert "ROLE" not in p.inner_text(".dp-info")                 # empty field not rendered
        p.goto(BASE + "/project.html?id=11"); p.wait_for_timeout(800)  # 프레쉬: no fields → no row
        assert p.locator(".dp-info").count() == 0

def test_detail_bad_id():
    for q in ["?id=99", "?id=abc", ""]:
        with page() as p:
            errors = []; p.on("pageerror", lambda e: errors.append(str(e)))
            p.goto(BASE + "/project.html" + q); p.wait_for_timeout(500)
            assert "프로젝트를 찾을 수 없습니다" in p.inner_text("body"), q
            assert p.locator(".project-side-nav").count() == 0
            assert errors == [], (q, errors)

def test_detail_transition():
    with page() as p:
        p.goto(BASE + "/index.html"); p.wait_for_timeout(2600)
        p.locator(".portfolio-item").nth(7).scroll_into_view_if_needed()
        p.locator(".portfolio-item").nth(7).click(); p.wait_for_url("**/project.html?id=7")
        assert p.locator(".dp-trans").count() == 1          # overlay exists right after load
        p.wait_for_timeout(1800)
        assert p.locator(".dp-trans").count() == 0
        assert p.evaluate("sessionStorage.getItem('bk-transition')") is None
```

- [ ] **Step 2: 실행해서 실패를 확인한다.** `python -I tests/smoke.py` → detail 테스트 5개 FAIL.
- [ ] **Step 3: `data.js` 필드 추가.**
  - 제목에서 확실한 값만 넣는다
  - client: BMW→"BMW", Canon→"Canon", 바쉐론 콘스탄틴→"Vacheron Constantin", NCsoft→"NCSOFT", 헤렌→"HEREN", Hamll→"현대Hmall", 엔픽셀 기업문화 IR→"NPIXEL"
  - category: 그랑사가 게임 콘텐츠·그랑사가 SNS·크로노오디세이·콘트라·청량·테라·포트리스·검은사막·NCsoft·GameAIfy→"Game", BMW·Canon·바쉐론·헤렌→"Brand"
  - `role`은 모두 비운다. 나머지 필드는 넣지 않는다
- [ ] **Step 4: `project.js`/`project-detail.css` 구현.**
  - `detail-page.html`의 고정 바(`.dp-top`: 로고 160, `NN / total`, "← ALL WORK"→`index.html#portfolio`), 진행 바(`.dp-bar`), 헤더(`renderHeader`)를 옮긴다
  - 헤더는 `htmlContent`의 기존 `.project-title-bar`를 대체한다. 렌더 후 그 요소를 제거한다
  - `htmlContent` 안의 이미지와 `.project-live-section` 등 텍스트 블록에 `data-reveal`을 붙인다. 등장은 `clip-path inset(12% 0 0 0)→inset(0)`, translateY 40px→0, 1.1s, blur 없음
  - 좌우 버튼 색: 원형 배경 `rgba(240,237,233,.85)`, 아이콘 `#3e3431`, 호버 시 `#4B3D39` 배경과 흰 아이콘. 카드 배경 `rgba(240,237,233,.94)`
  - `playTransition`: 전체 화면 `.dp-trans`를 rect에서 0,0,100vw,100vh로 0.9s `cubic-bezier(.76,0,.24,1)`, 그다음 0.6s 페이드, 제거. sessionStorage는 즉시 삭제한다
  - 잘못된 id 분기에서는 `createProjectNavigation`과 `playTransition`을 호출하지 않는다
- [ ] **Step 5: 실행해서 통과를 확인한다.** `python -I tests/smoke.py` → 전부 PASS
- [ ] **Step 6: Commit**(허락 시) `git commit -m "feat: project detail motion, info row, restyled side nav"`

---

### Task 5: About 등장 · 오탈자 · 마무리 확인

**Files:**
- Modify: `index.html`(About 요소에 `data-reveal`, "트랜드"→"트렌드"), `style.css`(About 등장 규칙)
- Test: `tests/smoke.py`

**Interfaces:**
- Consumes: `reveal.js`(Task 3)

- [ ] **Step 1: 실패하는 테스트 작성.**

```python
def test_about_and_polish():
    with page() as p:
        errors = []; p.on("pageerror", lambda e: errors.append(str(e)))
        p.goto(BASE + "/index.html"); p.wait_for_timeout(500)
        html = p.content()
        assert "트랜드" not in html and "트렌드" in html
        assert p.request.get(BASE + "/assets/favicon.png").status == 200
        p.locator("#about").scroll_into_view_if_needed(); p.wait_for_timeout(1200)
        assert p.evaluate("document.querySelectorAll('#about [data-reveal].in').length") >= 3
        assert errors == [], errors
```

- [ ] **Step 2: 실행해서 실패를 확인한다.** `python -I tests/smoke.py test_about_and_polish` → FAIL
- [ ] **Step 3: 구현.** About의 이름 블록, 서비스 4개, SKILLS, HOBBIES에 `data-reveal`과 `--i`를 붙인다. 등장은 translateY 18px→0과 opacity로 하고 blur는 쓰지 않는다. 오탈자 1곳을 고친다.
- [ ] **Step 4: 전체 확인.**
  - `python -I tests/smoke.py` → 전부 PASS
  - 1440·1024·390 폭에서 `index.html`, `project.html?id=6`(크로노오디세이, 텍스트 블록 있음), `project.html?id=0`(Web & Brand by AI, AI 도구 그리드·사례 텍스트·외부 링크 버튼 있음)을 캡처해 겹침과 넘침이 없는지 본다
- [ ] **Step 5: Commit**(허락 시) `git commit -m "feat: about reveal, typo fix"`
