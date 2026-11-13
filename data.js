const imageUrls = [
    "assets/ogt_th.jpg", // 0: OGT (Oh! Get Tool!)
    "assets/ai_driven_th.jpg",  // 1: Web & Brand by AI
    "assets/VL_project_th.png", // 1: Value Life Project
    "https://static.wixstatic.com/media/cf309e_274514ae4ddf4f8daebab3a4dcb38079~mv2.png",  // 2: GameAIfy
    "https://static.wixstatic.com/media/cf309e_c863943301c14063af889e10f3a00a62~mv2.png",  // 3: 엔픽셀 기업문화 IR
    "https://static.wixstatic.com/media/cf309e_bb47044c585a4a5b82ea8e6331f04f0b~mv2.png",  // 3: 그랑사가 게임 콘텐츠
    "https://static.wixstatic.com/media/cf309e_5bb155684e744b5a93fa5da7f2a17508~mv2.png",  // 4: 그랑사가 SNS
    "https://static.wixstatic.com/media/cf309e_3995dbde325644a8a0e7d7456d8c1986~mv2.png",  // 5: 크로노오디세이
    "https://static.wixstatic.com/media/cf309e_dc16a328ab664fa9b5fe40dd8a509a64~mv2.png",  // 6: BMW
    "https://static.wixstatic.com/media/cf309e_53a781ab867e4f55bc4bacc97b6f4822~mv2.png",  // 7: Canon
    "https://static.wixstatic.com/media/cf309e_5feda5a1457e49d395bc9d147c39c998~mv2.png",  // 8: 바쉐론 콘스탄틴
    "https://static.wixstatic.com/media/cf309e_1076f07272664e7d8de148d13618e804~mv2.png",  // 9: 헤렌
    "https://static.wixstatic.com/media/cf309e_f3d9fa18e40b4ff3b6333b56de6ce6ce~mv2.png",  // 10: 프레쉬
    "https://static.wixstatic.com/media/cf309e_41f3339343344acba761672086f368d1~mv2.png",  // 11: 델리
    "https://static.wixstatic.com/media/cf309e_d31c55d580e940ffa1478c37c6353653~mv2.png",  // 12: Hamll
    "https://static.wixstatic.com/media/cf309e_43964ac7bfb24deb953b36ab48246ee6~mv2.png",  // 13: 콘트라
    "https://static.wixstatic.com/media/cf309e_bf362104fa9545a793b22e4bcd23573a~mv2.png",  // 14: NCsoft
    "https://static.wixstatic.com/media/cf309e_b0889412b4c44f478e03b41cd62d2e7b~mv2.png",  // 15: 청량
    "https://static.wixstatic.com/media/cf309e_28b33cbd0e704aa58861b7537b3ffcb8~mv2.png",  // 16: 테라
    "https://static.wixstatic.com/media/cf309e_0f7f3680c88745e4b5d27dda59b7f872~mv2.png",  // 17: 포트리스
    "https://static.wixstatic.com/media/cf309e_aa198842a9ab49bb966c1f72e756aeb0~mv2.png"   // 18: 검은사막
];

const backButtonHtml = `
    <div class="project-footer">
        <a href="index.html#portfolio" class="back-btn">← 목록으로 돌아가기</a>
    </div>`;

const projectsData = [
    {
        title: "OGT (Oh! Get Tool!)",
        htmlContent: `
            <div class="project-page-wrapper product-showcase-page">
                <div class="project-title-bar">
                    <h2>OGT (Oh! Get Tool!)</h2>
                </div>
                <div class="project-images">
                    <img src="assets/ogt_00_hero.jpg" alt="OGT Creative Suite Hero" class="hero-image">
                </div>
                <div class="project-description-section">
                    <p class="desc-main">내 작업 흐름에 맞게 직접 기획하고 개발한 웹 기반 이미지 · 보정 · 동영상 편집 툴입니다.</p>
                    <p class="desc-sub">무거운 프로그램을 따로 켜지 않고 브라우저에서 사진 불러오기부터 디자인 편집, 인물 보정, 쇼츠 영상 제작까지 이어서 작업합니다.</p>
                </div>

                <!-- 시작 화면 & 규격 선택 -->
                <div class="multi-platform-section">
                    <div class="multi-platform-container">
                        <div class="platform-text-column">
                            <h3 class="platform-title">작업 목적에 바로 들어가는 시작 화면</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">사진 열기와 영상 편집 진입 버튼을 상단에 배치해 시작 단계의 불필요한 탐색을 줄였습니다.</p>
                                <p class="platform-desc-detail">블로그·인스타(1:1, 4:5), 쇼츠·릴스(9:16), 유튜브 썸네일(16:9), 링크 미리보기(1200×630), 인쇄용 A4(300dpi)와 직접 입력까지 자주 쓰는 규격을 한 화면에서 바로 선택해 시작할 수 있습니다.</p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/ogt_main.jpg" alt="OGT 시작 화면 및 캔버스 규격 선택">
                        </div>
                    </div>
                </div>

                <!-- 멀티 프레임 이미지 편집 -->
                <div class="multi-platform-section section-light">
                    <div class="multi-platform-container platform-reverse">
                        <div class="platform-text-column">
                            <h3 class="platform-title">멀티 프레임 이미지 편집</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">여러 장의 시안이나 캐릭터 바리에이션을 한 캔버스 위 프레임 단위로 나란히 배치해 비교하며 편집합니다.</p>
                                <p class="platform-desc-detail">포토샵과 같은 단축키(V·M·C·T·P·B)와 레이어, 블렌드 모드, 정렬·꾸미기 속성을 브라우저에 맞춰 정리해 실무 속도를 그대로 유지했습니다.</p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/ogt_editor_work.jpg" alt="OGT 멀티 프레임 이미지 편집 화면">
                        </div>
                    </div>
                </div>

                <div class="project-images" style="padding-top: 70px;">
                    <img src="assets/ogt_edit_workspace.png" alt="OGT 사진 및 텍스트 레이어 편집 화면">
                </div>

                <!-- 무료 이미지 검색 -->
                <div class="multi-platform-section">
                    <div class="multi-platform-container">
                        <div class="platform-text-column">
                            <h3 class="platform-title">에디터 안 무료 사진 검색</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">외부 스톡 사이트를 오가지 않고 작업 화면 안에서 Pixabay 무료 사진과 벡터를 바로 검색합니다.</p>
                                <p class="platform-desc-detail">한글·영어 검색과 이미지 방향 필터를 지원해 찾은 사진을 클릭 한 번으로 현재 프레임 레이어에 즉시 배치할 수 있습니다.</p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/ogt_free_photo.png" alt="OGT 무료 사진 검색 모달">
                        </div>
                    </div>
                </div>

                <!-- 템플릿 라이브러리 -->
                <div class="multi-platform-section section-light">
                    <div class="multi-platform-container platform-reverse">
                        <div class="platform-text-column">
                            <h3 class="platform-title">실무 템플릿 & 내 템플릿 저장</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">카드뉴스, 유튜브 썸네일, 체크리스트, 공지 배너 등 자주 만드는 포맷을 템플릿으로 바로 불러옵니다.</p>
                                <p class="platform-desc-detail">사진과 문구만 바꿔 빠르게 시안을 완성하고, 직접 만든 레이아웃을 '내 템플릿'으로 저장해 반복 작업을 줄였습니다.</p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/ogt_templates.jpg" alt="OGT 템플릿 라이브러리">
                        </div>
                    </div>
                </div>

                <!-- 이미지 보정 -->
                <div class="multi-platform-section">
                    <div class="multi-platform-container">
                        <div class="platform-text-column">
                            <h3 class="platform-title">얼굴 인식 & 정밀 이미지 보정</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">자동 보정과 픽셀 유동화(Shift+Ctrl+X), 배경 흐림, AI 지우개, 밝기·커브, LUT 색감 보정을 한 화면에 모았습니다.</p>
                                <p class="platform-desc-detail">보정 전·후 비교 슬라이더로 변화를 바로 확인하고, 얼굴 인식 기반의 눈·코·턱선 다듬기부터 노이즈 제거·화질 개선까지 이어서 처리합니다.</p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/ogt_retouch_face.jpg" alt="OGT 이미지 보정 및 픽셀 유동화 화면">
                        </div>
                    </div>
                </div>

                <!-- 동영상 편집 -->
                <div class="multi-platform-section section-light">
                    <div class="multi-platform-container platform-reverse">
                        <div class="platform-text-column">
                            <h3 class="platform-title">쇼츠·릴스 중심 동영상 편집</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">이미지 작업에서 곧바로 영상 편집기로 넘어가 세로형(9:16) 쇼츠와 일반 영상을 제작합니다.</p>
                                <p class="platform-desc-detail">비디오(V1~V3)·오디오(A1~A3) 멀티트랙 타임라인, 음성 기반 자동 자막 생성(C1), 자막 스타일 프리셋과 클립 컷 편집까지 한 툴에서 마무리합니다.</p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/ogt_video_work.jpg" alt="OGT 동영상 편집 타임라인 및 자막 편집 화면">
                        </div>
                    </div>
                </div>

                <div class="ai-project-inline-info" style="padding-top: 60px;">
                    <div class="ai-tools-list">
                        <span class="tool-badge figma">Figma</span>
                        <span class="tool-badge claude">Claude Code</span>
                        <span class="tool-badge antigravity">Antigravity</span>
                    </div>
                    <p class="ai-project-desc">
                        기획부터 UI/UX 설계, 캔버스 편집·이미지 보정·영상 타임라인 구현까지 실제 디자이너의 작업 흐름에 맞춰 최적화한 자체 제작 스튜디오입니다.
                    </p>
                </div>
                <div class="visit-site-wrap">
                    <a href="https://image-editor-murex-phi.vercel.app/" target="_blank" class="btn-visit-site">
                        <i class="fas fa-external-link-alt" style="margin-right: 8px;"></i>OGT 에디터 방문하기
                    </a>
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "Web & Brand by AI",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>Web & Brand by AI</h2>
                </div>
                <div class="project-images">
                    <!-- Main Hero Header Image -->
                    <img src="assets/ai_driven_01.jpg" alt="Web & Brand by AI Overview" class="hero-image">

                    <!-- AI Highlight Section -->
                    <div class="ai-highlight-section">
                        <div class="ai-highlight-container">
                            <h3 class="ai-highlight-title">AI-Driven Efficiency & High Quality Design</h3>
                            <p class="ai-highlight-desc">
                                기획 단계부터 디자인 가공, 정밀 코딩 및 배포에 이르기까지 검증된 차세대 AI 협업 프로세스를 정립했습니다.<br>
                                다양한 지능형 툴들을 적재적소에 유기적으로 배치함으로써, 작업 공정을 신속하게 완수함과 동시에 완성도 높은 퀄리티의 프리미엄 UX/UI 결과물을 일관되게 창출해 냈습니다.
                            </p>
                            <div class="ai-highlight-icons">
                                <div class="ai-icon-item">
                                    <img src="assets/안티그래비티.png" alt="안티그래비티">
                                    <span>안티그래비티</span>
                                </div>
                                <div class="ai-icon-item">
                                    <img src="assets/제미나이.png" alt="제미나이">
                                    <span>제미나이</span>
                                </div>
                                <div class="ai-icon-item">
                                    <img src="assets/클로드.png" alt="클로드">
                                    <span>클로드</span>
                                </div>
                                <div class="ai-icon-item">
                                    <img src="assets/클로드코드.png" alt="클로드코드">
                                    <span>클로드코드</span>
                                </div>
                                <div class="ai-icon-item">
                                    <img src="assets/포토샵.png" alt="포토샵">
                                    <span>포토샵</span>
                                </div>
                                <div class="ai-icon-item">
                                    <img src="assets/피그마.png" alt="피그마">
                                    <span>피그마</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 1st Project: Fitters Studio Images -->
                    <img src="assets/ai_driven_02.jpg" alt="Fitters Studio Screen 1">
                    <img src="assets/ai_driven_03.jpg" class="img-before-text" alt="Fitters Studio Screen 2">

                    <!-- 1st Project: Fitters Studio Inline Info (Above Button) -->
                    <div class="ai-project-inline-info">
                        <div class="ai-tools-list">
                            <span class="tool-badge photoshop">Photoshop</span>
                            <span class="tool-badge figma">Figma</span>
                            <span class="tool-badge claude">Claude Code</span>
                        </div>
                        <p class="ai-project-desc">
                            Photoshop과 Figma를 활용하여 고품질의 비주얼 인터페이스를 가공하고, Claude Code AI 어시스턴트를 개발 엔진으로 융합하여 기획 및 프론트엔드 빌드 주기를 효율화한 하이브리드 웹 디자인 사이트입니다.
                        </p>
                    </div>
                    
                    <div class="visit-site-wrap">
                        <a href="https://www.fittersstudio.com/" target="_blank" class="btn-visit-site">
                            <i class="fas fa-external-link-alt" style="margin-right: 8px;"></i>Fitters Studio 방문하기
                        </a>
                    </div>

                    <!-- 2nd Project: OGD Market Images -->
                    <img src="assets/ai_driven_04.jpg" alt="OGD Market Screen 1">
                    <img src="assets/ai_driven_05.jpg" class="img-before-text" alt="OGD Market Screen 2">

                    <!-- 2nd Project: OGD Market Inline Info (Above Button) -->
                    <div class="ai-project-inline-info">
                        <div class="ai-tools-list">
                            <span class="tool-badge antigravity">Antigravity</span>
                            <span class="tool-badge stitch">Stitch</span>
                            <span class="tool-badge claude">Claude Code</span>
                        </div>
                        <p class="ai-project-desc">
                            독자적인 에이전트 Antigravity와 고성능 Stitch 프레임워크 환경, 그리고 Claude Code의 자동화 개발 조력 역량에 조화롭게 연계하여 복잡한 e-Commerce 마켓플레이스 서비스를 신속하게 구축했습니다.
                        </p>
                    </div>
                    
                    <div class="visit-site-wrap">
                        <a href="https://ogd-market-new.vercel.app/" target="_blank" class="btn-visit-site">
                            <i class="fas fa-external-link-alt" style="margin-right: 8px;"></i>OGD Platform 방문하기
                        </a>
                    </div>

                    <!-- 3rd Project: Stockify Images -->
                    <img src="assets/ai_driven_6.jpg" alt="Stockify Screen 1">
                    <img src="assets/ai_driven_7.jpg" class="img-before-text" alt="Stockify Screen 2">

                    <!-- 3rd Project: Stockify Inline Info (Bottom) -->
                    <div class="ai-project-inline-info">
                        <div class="ai-tools-list">
                            <span class="tool-badge antigravity">Antigravity</span>
                            <span class="tool-badge figma">Figma</span>
                        </div>
                        <p class="ai-project-desc">
                            Figma로 디자인 프로토타입을 단단히 세팅하고, 지능형 AI 코딩 코파일럿 Antigravity의 유기적 가이드라인 및 코드 생성을 통해 모던하고 반응성이 뛰어난 브랜딩 서비스 구조를 설계하였습니다.
                        </p>
                    </div>
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "Value Life Project",
        htmlContent: `
            <div class="project-page-wrapper vl-project-page">
                <div class="project-title-bar">
                    <h2>Value Life Project</h2>
                </div>
                <div class="project-images">
                    <!-- Section 1 & 2: Overview and Logo details -->
                    <img src="assets/VL_project01.png" alt="Value Life Project Overview" class="vl-hero-img">
                    
                    <!-- Section 3: Character Illustration -->
                    <img src="assets/VL_project02.png" alt="Value Life Character Development" class="vl-char-img">
                </div>
                <div class="project-description-section">
                    <p class="desc-main">부의 미래를 이끌어갈 8명의 핵심 캐릭터를 기획하고 디자인 하였습니다.</p>
                    <p class="desc-sub">전문적인 금융 정보와 친근하고 쉬운 비주얼 가이드라인을 제공하고자 합니다.</p>
                </div>
                
                <div class="project-images">
                    <!-- Section 4: Cardnews layout -->
                    <img src="assets/VL_project03.png" alt="Value Life Cardnews Template" class="vl-cardnews-img">
                </div>
                <div class="project-description-section">
                    <p class="desc-main">카드뉴스 템플릿에 맞춤 일러스트를 접목시켜 복잡한 소식을 명확하고 친근하게 전달하며,</p>
                    <p class="desc-sub">다양한 채널에서 유연하게 활용할 수 있는 가이드라인을 제안합니다.</p>
                </div>

                <!-- Section 5: Multi Platform Expansion Strategy -->
                <div class="multi-platform-section">
                    <div class="multi-platform-container">
                        <div class="platform-text-column">
                            <h3 class="platform-title">멀티 플랫폼 콘텐츠 확장 전략</h3>
                            <div class="platform-desc-box">
                                <p class="platform-desc-highlight">다양한 채널(인스타그램, 유튜브 등)에 브랜드 콘텐츠를 유연하게 녹여내어 브랜딩 가치를 구축하고,</p>
                                <p class="platform-desc-detail">
                                    시각적 통일성을 잃지 않으면서 채널 성격에 맞는 레이아웃 템플릿으로 가공하였습니다.<br>
                                    일관된 브랜드 톤앤매너를 유지하며 대중에게 보다 신뢰감 있고 친밀한 브랜드 경험을 선사합니다.
                                </p>
                            </div>
                        </div>
                        <div class="platform-image-column">
                            <img src="assets/VL_project04.png" alt="Instagram and Threads Mobile Feed Layout">
                        </div>
                    </div>
                </div>

                <!-- Section 6: YouTube Channel Layout -->
                <div class="project-images youtube-section">
                    <img src="assets/VL_project05.png" alt="Value Life YouTube Channel Structure" class="vl-youtube-img">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "GameAIfy",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>GameAIfy</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_b35e5f6025894ab3b744364cb9c28567~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_33204810b1754545bace37530199f537~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_58dc188f2d334a3e9f2a09dd54667699~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_70c3a0615bc94dab91742a3d4ea857be~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_f914ccbb8763445a8fe3abe3d7e0f2a2~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_2a91a0a5344949f8924bb6c4597ccac8~mv2.png" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "엔픽셀 기업문화 IR",
        htmlContent: `
            <div class="project-page-wrapper npixel-ir-page">
                <div class="project-title-bar">
                    <h2>엔픽셀 기업문화 IR</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_cbc9411d1a244d02b0bbcdc3573db1da~mv2.jpg" alt="" class="hero-image">
                    <img src="https://static.wixstatic.com/media/cf309e_3f09f58aa82f46b1953d05527894fee3~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_7d8ad2e8821e486c945145b8597fb18e~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_2db867b488a741ba90ffd1e4e316279a~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_375033b948eb41f3b994f35c10b6f637~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "그랑사가 게임 콘텐츠",
        htmlContent: `
            <div class="project-page-wrapper gransaga-contents-page">
                <div class="project-title-bar">
                    <h2>그랑사가 게임 콘텐츠</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_dbd38f11422f4c4984dc4fbe05a87bb4~mv2.jpg" alt="" class="hero-image">
                    <img src="https://static.wixstatic.com/media/cf309e_f38b17cbd3334c64bbd8f92029725c56~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_2fde6b4b7ec945ee84611477591a3a34~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_5c57189a4a614ab9bc66166190a41735~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_8513dc1406254479b079794a04fc1dd4~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_9e54f2f314e74fe6a76e9ef3df589e6c~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_5a222723291243aba0a252e2c2f977a9~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_c3b31e0fc130459f88e8b739a4c44884~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_876c1886601a47bdad8a59d9b68c1889~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_b4338b9cbbce47bc9a0936b81ce11c76~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_ca86f6ec5f434314ac9c7c61ec183adf~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_6a34ba20e98e4761a588a025ab888793~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_f7d2a53b38074b519d2dffd1cc434cff~mv2.gif" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_e8a1cf1bc870453ebbce97533a771a64~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_00fda5e1f8534213ab53b0944bb4d731~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_a905632ac85d43cab9d80748b39f4391~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "그랑사가 SNS",
        htmlContent: `
            <div class="project-page-wrapper gransaga-sns-page">
                <div class="project-title-bar">
                    <h2>그랑사가 SNS</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_11e3c84c77b544028ebcacfe1dd7f1e4~mv2.jpg" alt="" class="hero-image">
                    <img src="https://static.wixstatic.com/media/cf309e_859d7ed72e6f4af9bf837f82e18a7190~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_69ac08bfebfd4f318ac1c34fc2b6c1cf~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_2d0df0b9bfe54cc58f41eb6c5ffd0dd5~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_6f2d4c4765d449a38cff24b48b54b7ad~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_c90d5eb23d474191b5884ca99eeeaa1a~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "크로노오디세이",
        htmlContent: `
            <div class="project-page-wrapper chrono-page">
                <div class="project-title-bar">
                    <h2>크로노오디세이</h2>
                    <p class="project-subtitle">게임 공식 웹사이트 기획 및 디자인</p>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_ed48671a471b4dadad7c0300b3993ddc~mv2.png" alt="" class="hero-image">
                </div>
                <!-- Overview Image placed directly under main hero image -->
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_9be5eeafeeaa4f50a125e4c75641db70~mv2.png" alt="">
                </div>
                <div class="project-section">
                    <h3>Main Page</h3>
                    <p>2차 트레일러 영상을 메인에 보여줌으로서 게임의 웅장함을 전달</p>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_efdece6216bb46e18dfc822a23ae1e5f~mv2.jpg" alt="">
                </div>
                <div class="project-images character-grid">
                    <img src="https://static.wixstatic.com/media/cf309e_e5c99008b1894be3a5a1245dd097fdb1~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_30c991c3de5f42e7bfdc69f09266ad28~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_879344d1d221421b87cfca8926201f50~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_b0e86e248f8d4c3fa8dc48185547512c~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_6402bf1c407b4b6eab81de70e6bb94ce~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_b0d815541c7449338dc10eae09389ec9~mv2.png" alt="">
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_8faabae646854ff481706c9466354aa0~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "BMW",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>BMW</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_c53ad42016224d029ad3a44fc215bf45~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_6b8cde1460c548baac0d1a5798edb170~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_a0bce64d4aec4fef8a389fc56dff7c34~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_5ab0e4c36f1241db831790197e5cd813~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_6a2683189eb14efebec20d8d2bcf98dd~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_e6bbfd5f4fdd415c9c3bf00eb6fb128f~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_4c2303b9a12242f1bd9726868af28e91~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "Canon",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>Canon</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_bfe49ef561044a7f91bfa2b36a3e2d52~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_c0fb72b082f44464af4ea16695f90b12~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_904dad174c2c487a84d4b80ab1adb383~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_8fa91aad955f47298a78449c4ba26708~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_40f9b14600bf49f2b811a3226f5dfd6a~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_28322237790e431e8a628688657b3e96~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "바쉐론 콘스탄틴",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>바쉐론 콘스탄틴</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_93b21f7fd85c4a15bf6a1f02696b41c4~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_520fce09d17c4132b81c378e91564dd9~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_bd7d4d629649498ca2b9eb415ea77609~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "헤렌",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>헤렌</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_01d68481fa5f4a4ab2aa04bdea7f4e5b~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_3d723ac6262a4ac3a1a734992b747631~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_505f3fa1f55b4aeea20581738b92cc3c~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "프레쉬",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>프레쉬</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_34d11c4aa5dd462a9b8d92116207c7df~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_b3a740304ff242d7b37c8866869a3249~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_cb665f73d9644b1388646f762f98cf7a~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_59722bf5d6504dd0a39faa664066ee77~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "델리",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>델리</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_cc6d36d5dba6497d96df05f5bf2cba82~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_87f60306533040aab067197b04bcd874~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_a1907fde18d94ec89c0de4c230c5d541~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_52489bc55e514c1a85bb8e81196c0cfd~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "Hamll",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>Hamll</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_9f7bc0bc4b464b99b41c921a8df2bd28~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_a2438d4ceecc41e88153758a1f6c0903~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_7566ff94b46d4a53b6a40ec3a06fd740~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "콘트라",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>콘트라</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_644b7d078a56477fbb292c03f634d0bc~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_25eef38444d5442697ce65baf023ca53~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "NCsoft",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>NCsoft</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_34dfef3a9f604e7f8c559d2b446e6556~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_0d916c9328b34ac986a6bb52e258c451~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_a253bc2fef854cf180f3c7a32441653f~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "청량",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>청량</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_6ec4a2123e6840f38c18026d209ad0fd~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_e26a58a9e96042a882d15b9b1a829575~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_f4ac4cab6eb047d19bf7897508695ff0~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "테라",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>테라</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_80361ce9410d4db493ba6d939c1d44aa~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_92b93c7db11a4f788c1542a6f26a367c~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_487f195e3fc3446885d5f18644c67690~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "포트리스",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>포트리스</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_8caa2756299e45c18fa28b8a5bc78f53~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_83d5e6de019c4dbe864927b41597aea6~mv2.jpg" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_d3a39f16f68044e6b80cd63613758968~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    },
    {
        title: "검은사막",
        htmlContent: `
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>검은사막</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_270e0a5f86c74995972a6a2aabf776e5~mv2.jpg" alt="">
                </div>
                ${backButtonHtml}
            </div>`
    }
];
