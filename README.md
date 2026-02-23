<div align="center">

```
 ███████╗██╗     ███████╗███████╗██████╗     ████████╗██╗   ██╗██████╗ ███████╗
 ██╔════╝██║     ██╔════╝██╔════╝██╔══██╗    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
 ███████╗██║     █████╗  █████╗  ██████╔╝       ██║    ╚████╔╝ ██████╔╝█████╗
 ╚════██║██║     ██╔══╝  ██╔══╝  ██╔═══╝        ██║     ╚██╔╝  ██╔═══╝ ██╔══╝
 ███████║███████╗███████╗███████╗██║            ██║      ██║   ██║     ███████╗
 ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝            ╚═╝      ╚═╝   ╚═╝     ╚══════╝
```

### Discover your biological clock — in 10 questions

[English](README.md) | [한국어](README.ko.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg?logo=opensourceinitiative&logoColor=white)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=awslambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?logo=github&logoColor=white)](CONTRIBUTING.md)

</div>

---

## Live Demo

<div align="center">

**[sleeptypequiz.com](https://sleeptypequiz.com)**

> Screenshots coming soon. Star this repo to stay updated.

</div>

---

## What is a Sleep Chronotype?

Your **chronotype** is your body's natural preference for when to sleep and be active — determined by genetics, age, and circadian biology. It governs whether you thrive at sunrise, peak at midnight, or fall somewhere in between.

This is not about willpower or laziness. It is biology. Understanding your chronotype lets you schedule deep work, exercise, and rest at the times when your body is actually ready for them.

This quiz analyzes 10 dimensions of your daily rhythm — wake time, energy peaks, meal patterns, creativity windows, sleep onset, and more — to match you with one of four chronotype archetypes popularized by sleep researcher Dr. Michael Breus.

---

## The Four Chronotypes

| | 🦁 Lion | 🐻 Bear | 🐺 Wolf | 🐬 Dolphin |
|---|---|---|---|---|
| **Population** | ~15% | ~55% | ~15% | ~10% |
| **Personality** | Morning warrior | Solar-powered | Night thinker | Light sleeper |
| **Peak hours** | 8 AM – 12 PM | 10 AM – 2 PM | 5 PM – 12 AM | Sporadic |
| **Sleep time** | 9:30 PM | 11:00 PM | 1:00 AM | Irregular |
| **Strength** | Discipline & drive | Steady productivity | Creative bursts | Hypersensitive focus |

---

## Features

- 10-question science-based chronotype quiz covering wake time, energy peaks, meal patterns, creativity, and more
- 4 detailed result profiles — Lion, Bear, Wolf, Dolphin — each with a personalized description and trait tags
- Score breakdown showing your percentage match across all four chronotypes
- Interactive daily timeline visualization tailored to each chronotype
- 5 actionable productivity and sleep tips per result
- Dark cosmic theme with an animated star background
- Mobile-first responsive design — works seamlessly on all screen sizes
- Bilingual — English and Korean (i18next with full translation coverage)
- One-tap SNS sharing — Twitter, Facebook, KakaoTalk, and Copy Link
- Serverless backend — AWS Lambda + API Gateway for result submission
- Global stats — see how your chronotype compares to all other quiz takers

---

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?logo=i18next&logoColor=white)

**Backend**

![Python](https://img.shields.io/badge/Python_3.11-3776AB?logo=python&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=awslambda&logoColor=white)
![API Gateway](https://img.shields.io/badge/API_Gateway-FF4F8B?logo=amazonapigateway&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

**Infrastructure**

![AWS S3](https://img.shields.io/badge/S3-569A31?logo=amazons3&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-8C4FFF?logo=amazonaws&logoColor=white)
![Serverless](https://img.shields.io/badge/Serverless_Framework-FD5750?logo=serverless&logoColor=white)

---

## Architecture

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

The frontend is a fully static React SPA deployed to S3 and served globally via CloudFront. Quiz submissions hit API Gateway, which triggers a Python Lambda function that scores the answers, writes the result to PostgreSQL, and returns the chronotype. The `/api/stats` endpoint powers the real-time global distribution display on the result page.

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/black4305/sleep-type.git
cd sleep-type

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

**Running the backend locally:**

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env

# Start the API locally with Serverless Offline
sls offline start
```

The local API will be available at `http://localhost:3000/prod`.

**Environment variables required for the backend:**

| Variable | Description |
|---|---|
| `DB_HOST` | PostgreSQL host |
| `DB_NAME` | Database name (default: `sleepquiz`) |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_PORT` | Database port (default: `5432`) |
| `VPC_SECURITY_GROUP_ID` | AWS VPC security group ID |
| `VPC_SUBNET_ID_1` | First VPC subnet ID |
| `VPC_SUBNET_ID_2` | Second VPC subnet ID |
| `ALLOWED_ORIGIN` | CORS allowed origin (default: `*`) |

---

## Project Structure

```
sleep-type/
├── src/
│   ├── components/
│   │   ├── AnalyzingOverlay.tsx   # Loading animation between quiz and result
│   │   ├── LanguageToggle.tsx     # EN / KO switcher
│   │   ├── ScoreBreakdown.tsx     # Percentage bars for all 4 chronotypes
│   │   ├── SEOHead.tsx            # Dynamic meta tags per page
│   │   ├── ShareButtons.tsx       # Twitter / Facebook / KakaoTalk / Copy
│   │   ├── StarBackground.tsx     # Animated cosmic background
│   │   ├── Timeline.tsx           # Daily schedule visualization
│   │   └── ui/                    # shadcn/ui base components
│   ├── data/
│   │   ├── chronotypes.ts         # 4 chronotype definitions + timelines
│   │   └── questions.ts           # 10 quiz questions with scoring matrix
│   ├── i18n/
│   │   ├── en.json                # English translations
│   │   ├── ko.json                # Korean translations
│   │   └── index.ts               # i18next configuration
│   ├── pages/
│   │   ├── LandingPage.tsx        # Hero + chronotype cards + how it works
│   │   ├── QuizPage.tsx           # 10-question quiz flow
│   │   └── ResultPage.tsx         # Result reveal + timeline + tips + share
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # TypeScript type definitions
│   └── main.tsx
├── backend/
│   ├── handler.py                 # Lambda entry point (submit + stats)
│   ├── scoring.py                 # Chronotype scoring algorithm
│   ├── db.py                      # PostgreSQL connection layer
│   ├── schema.sql                 # Database schema
│   ├── requirements.txt
│   └── serverless.yml             # Serverless Framework config (ap-northeast-2)
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── index.html
└── vite.config.ts
```

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push to your branch — `git push origin feature/your-feature`
5. Open a Pull Request

For bug reports and feature requests, please [open an issue](https://github.com/black4305/sleep-type/issues).

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

---

## Acknowledgments

The four chronotype framework — Lion, Bear, Wolf, Dolphin — is based on the research of **Dr. Michael Breus**, clinical psychologist and sleep specialist, as presented in his book *The Power of When* (2016). The scoring model in this quiz is inspired by his chronotype assessment methodology.

---

## Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=black4305/sleep-type&type=Date)](https://star-history.com/#black4305/sleep-type&Date)

</div>

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with React · TypeScript · Python · AWS · and a lot of late nights

**If this project helped you discover your biological clock, please leave a star. It keeps the wolves awake.**

[![GitHub stars](https://img.shields.io/github/stars/black4305/sleep-type?style=social)](https://github.com/black4305/sleep-type/stargazers)

</div>
