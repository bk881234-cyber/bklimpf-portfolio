const imageUrls = [
    "https://static.wixstatic.com/media/cf309e_274514ae4ddf4f8daebab3a4dcb38079~mv2.png",  // 0: GameAIfy
    "https://static.wixstatic.com/media/cf309e_c863943301c14063af889e10f3a00a62~mv2.png",  // 1: 엔픽셀 기업문화 IR
    "https://static.wixstatic.com/media/cf309e_bb47044c585a4a5b82ea8e6331f04f0b~mv2.png",  // 2: 그랑사가 게임 콘텐츠
    "https://static.wixstatic.com/media/cf309e_5bb155684e744b5a93fa5da7f2a17508~mv2.png",  // 3: 그랑사가 SNS
    "https://static.wixstatic.com/media/cf309e_3995dbde325644a8a0e7d7456d8c1986~mv2.png",  // 4: 크로노오디세이
    "https://static.wixstatic.com/media/cf309e_dc16a328ab664fa9b5fe40dd8a509a64~mv2.png",  // 5: BMW
    "https://static.wixstatic.com/media/cf309e_53a781ab867e4f55bc4bacc97b6f4822~mv2.png",  // 6: Canon
    "https://static.wixstatic.com/media/cf309e_5feda5a1457e49d395bc9d147c39c998~mv2.png",  // 7: 바쉐론 콘스탄틴
    "https://static.wixstatic.com/media/cf309e_1076f07272664e7d8de148d13618e804~mv2.png",  // 8: 헤렌
    "https://static.wixstatic.com/media/cf309e_f3d9fa18e40b4ff3b6333b56de6ce6ce~mv2.png",  // 9: 프레쉬
    "https://static.wixstatic.com/media/cf309e_41f3339343344acba761672086f368d1~mv2.png",  // 10: 델리
    "https://static.wixstatic.com/media/cf309e_d31c55d580e940ffa1478c37c6353653~mv2.png",  // 11: Hamll
    "https://static.wixstatic.com/media/cf309e_43964ac7bfb24deb953b36ab48246ee6~mv2.png",  // 12: 콘트라
    "https://static.wixstatic.com/media/cf309e_bf362104fa9545a793b22e4bcd23573a~mv2.png",  // 13: NCsoft
    "https://static.wixstatic.com/media/cf309e_b0889412b4c44f478e03b41cd62d2e7b~mv2.png",  // 14: 청량
    "https://static.wixstatic.com/media/cf309e_28b33cbd0e704aa58861b7537b3ffcb8~mv2.png",  // 15: 테라
    "https://static.wixstatic.com/media/cf309e_0f7f3680c88745e4b5d27dda59b7f872~mv2.png",  // 16: 포트리스
    "https://static.wixstatic.com/media/cf309e_aa198842a9ab49bb966c1f72e756aeb0~mv2.png"   // 17: 검은사막
];

const backButtonHtml = `
    <div class="project-footer">
        <a href="index.html#portfolio" class="back-btn">← 목록으로 돌아가기</a>
    </div>`;

const projectsData = [
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
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>엔픽셀 기업문화 IR</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_cbc9411d1a244d02b0bbcdc3573db1da~mv2.jpg" alt="">
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
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>그랑사가 게임 콘텐츠</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_dbd38f11422f4c4984dc4fbe05a87bb4~mv2.jpg" alt="">
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
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>그랑사가 SNS</h2>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_11e3c84c77b544028ebcacfe1dd7f1e4~mv2.jpg" alt="">
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
            <div class="project-page-wrapper">
                <div class="project-title-bar">
                    <h2>크로노오디세이</h2>
                    <p class="project-subtitle">게임 공식 웹사이트 기획 및 디자인</p>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_ed48671a471b4dadad7c0300b3993ddc~mv2.png" alt="">
                </div>
                <div class="project-section">
                    <h3>Main Page</h3>
                    <p>2차 트레일러 영상을 메인에 보여줌으로서 게임의 웅장함을 전달</p>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_efdece6216bb46e18dfc822a23ae1e5f~mv2.jpg" alt="">
                </div>
                <div class="project-section">
                    <h3>Characters</h3>
                    <p>5명의 캐릭터와 캐릭터 스토리를 인게임 종족 아이콘 탭으로 구성</p>
                </div>
                <div class="project-images character-grid">
                    <img src="https://static.wixstatic.com/media/cf309e_e5c99008b1894be3a5a1245dd097fdb1~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_30c991c3de5f42e7bfdc69f09266ad28~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_879344d1d221421b87cfca8926201f50~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_b0e86e248f8d4c3fa8dc48185547512c~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_6402bf1c407b4b6eab81de70e6bb94ce~mv2.png" alt="">
                    <img src="https://static.wixstatic.com/media/cf309e_b0d815541c7449338dc10eae09389ec9~mv2.png" alt="">
                </div>
                <div class="project-section">
                    <h3>Concept Art</h3>
                    <p>크로노오디세이의 다양한 컨셉아트를 고해상도로 다운받을 수 있는 페이지 구성</p>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_8faabae646854ff481706c9466354aa0~mv2.jpg" alt="">
                </div>
                <div class="project-section">
                    <h3>Overview</h3>
                    <p>크로노오디세이 게임의 세계관을 간단하게 설명하는 페이지 구성</p>
                </div>
                <div class="project-images">
                    <img src="https://static.wixstatic.com/media/cf309e_9be5eeafeeaa4f50a125e4c75641db70~mv2.png" alt="">
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
