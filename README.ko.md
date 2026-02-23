<div align="center">

```
 ███████╗██╗     ███████╗███████╗██████╗     ████████╗██╗   ██╗██████╗ ███████╗
 ██╔════╝██║     ██╔════╝██╔════╝██╔══██╗    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
 ███████╗██║     █████╗  █████╗  ██████╔╝       ██║    ╚████╔╝ ██████╔╝█████╗
 ╚════██║██║     ██╔══╝  ██╔══╝  ██╔═══╝        ██║     ╚██╔╝  ██╔═══╝ ██╔══╝
 ███████║███████╗███████╗███████╗██║            ██║      ██║   ██║     ███████╗
 ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝            ╚═╝      ╚═╝   ╚═╝     ╚══════╝
```

### 당신의 생체시계를 발견하세요 — 10개의 질문으로

[English](README.md) | [한국어](README.ko.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=aws-lambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![CI](https://github.com/black4305/sleep-type/actions/workflows/ci.yml/badge.svg)](https://github.com/black4305/sleep-type/actions/workflows/ci.yml)

</div>

---

## 목차

- [데모 / 스크린샷](#데모--스크린샷)
- [수면 크로노타입이란?](#수면-크로노타입이란)
- [네 가지 크로노타입](#네-가지-크로노타입)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [아키텍처](#아키텍처)
- [빠른 시작](#빠른-시작)
- [프로젝트 구조](#프로젝트-구조)
- [로드맵](#로드맵)
- [기여하기](#기여하기)
- [라이선스](#라이선스)

---

## 데모 / 스크린샷

라이브 데모: 준비 중

> 스크린샷이 곧 추가됩니다. 업데이트 소식을 받으려면 이 저장소에 Star를 남겨 주세요.

---

## 왜 Sleep Type인가?

- **과학적 근거, 추측 없음** — 무작위 성격 테스트가 아닌, Dr. Michael Breus의 크로노타입 연구를 기반으로 합니다
- **실용적인 결과** — 단순한 유형 라벨이 아닌, 맞춤형 하루 일정을 제공합니다
- **프라이버시 우선** — 계정 불필요, 개인정보 수집 없음
- **빠름** — 10문항, 3분, 즉시 결과 확인
- **오픈 소스** — 점수 계산 알고리즘을 직접 확인하고 개선할 수 있습니다

---

## 수면 크로노타입이란?

**크로노타입**은 언제 자고 언제 활동하는지에 대한 몸의 자연스러운 선호 방식입니다. 유전자, 나이, 생물학적 특성이 복합적으로 작용하여 결정됩니다. 당신이 해 뜰 무렵에 최상의 컨디션을 발휘하는지, 자정에 절정을 맞는지, 혹은 그 사이 어딘가인지를 결정하는 것이 바로 크로노타입입니다.

이 테스트는 기상 시간, 에너지 절정 구간, 식사 패턴, 창의적 집중 시간대 등 일상 리듬의 10가지 차원을 분석하여 네 가지 수면 유형 중 당신에게 가장 잘 맞는 유형을 찾아드립니다.

---

## 네 가지 크로노타입

| | 🦁 사자형 | 🐻 곰형 | 🐺 늑대형 | 🐬 돌고래형 |
|---|---|---|---|---|
| **인구 비율** | 약 15% | 약 55% | 약 15% | 약 10% |
| **성향** | 아침형 사자 | 표준형 곰 | 저녁형 늑대 | 불규칙형 돌고래 |
| **최고 집중 시간대** | 오전 8시 ~ 오후 12시 | 오전 10시 ~ 오후 2시 | 오후 5시 ~ 자정 | 예측 불가 |
| **취침 시간** | 오후 9시 30분 | 오후 11시 | 오전 1시 | 불규칙 |
| **강점** | 규율과 추진력 | 안정적 생산성 | 창의적 폭발력 | 예민한 집중력 |

---

## 주요 기능

- 과학 기반 10문항 크로노타입 테스트
- 맞춤형 하루 생산성 팁이 포함된 4가지 상세 결과 프로필
- 크로노타입별 인터랙티브 하루 타임라인 시각화
- 별이 움직이는 다크 코스믹 테마
- 모바일 우선 반응형 디자인
- 한국어 · 영어 이중 언어 지원 (i18next)
- 원탭 SNS 공유 — 트위터, 페이스북, 카카오톡
- 서버리스 백엔드 — AWS Lambda + API Gateway
- 글로벌 통계 — 다른 사용자와 내 유형 비교

---

## 기술 스택

**Frontend**

![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)

**Backend**

![Python](https://img.shields.io/badge/Python_3.11-3776AB?logo=python&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=aws-lambda&logoColor=white)
![API Gateway](https://img.shields.io/badge/API_Gateway-FF4F8B?logo=amazon-api-gateway&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

**Infrastructure**

![AWS S3](https://img.shields.io/badge/S3-569A31?logo=amazons3&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-8C4FFF?logo=amazon-aws&logoColor=white)
![Serverless](https://img.shields.io/badge/Serverless_Framework-FD5750?logo=serverless&logoColor=white)

---

## 아키텍처

```
                   ┌─────────────────────────────────┐
                   │           User Browser           │
                   └────────────────┬────────────────┘
                                    │
                   ┌────────────────▼────────────────┐
                   │        S3 + CloudFront           │
                   │       (React SPA — CDN)          │
                   └────────────────┬────────────────┘
                                    │ API calls (HTTPS)
                   ┌────────────────▼────────────────┐
                   │          API Gateway             │
                   │    POST /api/submit              │
                   │    GET  /api/stats               │
                   └────────────────┬────────────────┘
                                    │ invokes
                   ┌────────────────▼────────────────┐
                   │         AWS Lambda               │
                   │  (Python 3.11 — Serverless)      │
                   └────────────────┬────────────────┘
                                    │ SQL
                   ┌────────────────▼────────────────┐
                   │     PostgreSQL (AWS RDS)         │
                   │      quiz results + stats        │
                   └─────────────────────────────────┘
```

---

## 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/black4305/sleep-type.git
cd sleep-type

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

앱은 `http://localhost:5173` 에서 확인할 수 있습니다.

**백엔드 로컬 실행:**

```bash
cd backend

# Python 의존성 설치
pip install -r requirements.txt

# Serverless로 로컬 API 서버 실행
sls offline start
```

로컬 API는 `http://localhost:3000/prod` 에서 확인할 수 있습니다.

---

## 프로젝트 구조

```
sleep-type/
├── src/
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   └── ui/             # shadcn/ui 기본 컴포넌트
│   ├── data/
│   │   ├── chronotypes.ts  # 4가지 크로노타입 정의 및 타임라인
│   │   ├── questions.ts    # 10개 퀴즈 문항과 점수 매트릭스
│   │   └── calculateChronotype.ts
│   ├── i18n/
│   │   ├── en.json         # 영어 번역
│   │   └── ko.json         # 한국어 번역
│   ├── pages/              # 라우트 단위 페이지 컴포넌트
│   ├── hooks/              # 커스텀 React 훅
│   └── types/              # TypeScript 타입 정의
├── backend/
│   ├── handler.py          # Lambda 진입점
│   ├── scoring.py          # 크로노타입 점수 계산 로직
│   ├── db.py               # PostgreSQL 연결 레이어
│   ├── schema.sql          # 데이터베이스 스키마
│   ├── requirements.txt
│   ├── serverless.yml      # Serverless Framework 설정
│   └── .env.example        # 환경 변수 템플릿
├── public/
│   ├── robots.txt           # 크롤러 규칙
│   ├── sitemap.xml          # SEO 사이트맵
│   └── favicon.svg          # 달과 별 파비콘
├── index.html
└── vite.config.ts
```

---

## 로드맵

- [x] 10문항과 4가지 크로노타입 결과를 포함한 핵심 퀴즈
- [x] 이중 언어 지원 (영어 + 한국어)
- [x] SNS 공유 (트위터, 페이스북, 카카오톡)
- [x] 글로벌 통계를 갖춘 서버리스 백엔드
- [x] 인터랙티브 하루 타임라인 시각화
- [ ] 추가 언어 지원 (일본어, 중국어, 스페인어)
- [ ] PDF 리포트 다운로드
- [ ] 수면 스케줄 캘린더 내보내기 (.ics)
- [ ] 다크/라이트 테마 토글
- [ ] 크로노타입 간 상세 비교

전체 제안 기능 목록은 [이슈 트래커](https://github.com/black4305/sleep-type/issues)를 확인해 주세요.

---

## 기여하기

기여를 환영합니다. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md) 를 참고해 주세요.

기여 절차는 아래와 같습니다:

1. 저장소를 Fork 합니다
2. 기능 브랜치를 생성합니다 — `git checkout -b feature/기능명`
3. 변경 사항을 커밋합니다 — `git commit -m "feat: 기능 설명"`
4. 브랜치에 Push 합니다 — `git push origin feature/기능명`
5. Pull Request를 엽니다

버그 리포트나 기능 요청은 [이슈 트래커](../../issues) 를 이용해 주세요.

---

## 기여자

<a href="https://github.com/black4305/sleep-type/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=black4305/sleep-type" />
</a>

---

## 후원

이 프로젝트가 유용하다면 개발을 지원해 주세요:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/black4305)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-EA4AAA?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/black4305)

---

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

---

<div align="center">

React · TypeScript · Python · AWS 그리고 수많은 밤샘 작업으로 만들어졌습니다 🐺

**이 프로젝트가 도움이 되었거나 즐거우셨다면 Star를 남겨 주세요.**

내 몸의 리듬을 이해하는 것이 최고의 자기계발입니다.

</div>
