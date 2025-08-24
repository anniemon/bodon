# 예인 & 서정 결혼식 웹사이트 💒

예인과 서정의 결혼식을 위한 현대적이고 반응형 웹사이트입니다. 결혼식 정보, 방명록, 오시는 길 안내 등의 기능을 제공합니다.

## ✨ 주요 기능

- **📸 이미지 갤러리 & 비디오**: 결혼 사진들과 YouTube 영상을 포함한 반응형 캐러셀
- **📝 실시간 방명록**: 축하 메시지를 남길 수 있는 인터랙티브 방명록 (Supabase 연동)
- **📍 오시는 길**: 결혼식 장소 정보 및 네이버 지도 연결
- **📱 모바일 최적화**: 모든 기기에서 완벽한 사용자 경험
- **🎨 현대적 디자인**: 깔끔하고 우아한 UI/UX

## 🛠 기술 스택

- **Frontend**: [Gatsby](https://www.gatsbyjs.org/) (React 기반)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: CSS3 with responsive design
- **Form Handling**: [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
- **Layout**: [React Masonry CSS](https://github.com/paulcollett/react-masonry-css)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 🚀 빠른 시작

### 전제 조건

- Node.js (v14 이상)
- npm 또는 yarn
- Supabase 계정

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd bodon
   ```

2. **의존성 설치**

   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**

   프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

   ```env
   GATSBY_SUPABASE_URL=your_supabase_project_url
   GATSBY_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase 데이터베이스 설정**

   Supabase에서 다음 테이블을 생성하세요:

   ```sql
   CREATE TABLE guestbook (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **개발 서버 시작**

   ```bash
   npm run develop
   # 또는
   yarn develop
   ```

   사이트가 `http://localhost:8000`에서 실행됩니다.

## 📁 프로젝트 구조

```
.
├── src/
│   ├── components/          # React 컴포넌트들
│   │   ├── hero.js         # 메인 갤러리 & 비디오 캐러셀
│   │   ├── guestbook.js    # 방명록 기능
│   │   ├── event.js        # 오시는 길 정보
│   │   ├── contact.js      # 연락처 정보
│   │   └── ...
│   ├── images/             # 이미지 에셋들
│   ├── utils/              # 유틸리티 함수들
│   │   └── supabaseClient.js
│   └── pages/
│       └── index.js        # 메인 페이지
├── netlify.toml            # Netlify 배포 설정
├── gatsby-config.js        # Gatsby 설정
└── package.json
```

## 🎯 주요 컴포넌트

### Hero 컴포넌트

- 결혼 사진들과 YouTube 영상을 보여주는 캐러셀
- 모바일에서 YouTube 임베드 크기 최적화
- 이미지 프리로딩으로 성능 향상

### Guestbook 컴포넌트

- Supabase를 이용한 실시간 방명록
- 중복 제출 방지 기능
- 반응형 Masonry 레이아웃

### Event 컴포넌트

- 결혼식 장소 정보
- 네이버 지도 연동

## 🚀 배포

### Netlify 배포

1. **Netlify에 연결**

   - GitHub 저장소를 Netlify에 연결
   - 빌드 설정: `npm run build`
   - 퍼블리시 디렉토리: `public`

2. **환경 변수 설정**

   - Netlify 대시보드에서 환경 변수 추가:
     - `GATSBY_SUPABASE_URL`
     - `GATSBY_SUPABASE_ANON_KEY`

3. **자동 배포**
   - `master` 브랜치에 푸시하면 자동으로 배포됩니다.
