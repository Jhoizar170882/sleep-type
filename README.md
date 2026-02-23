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

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=aws-lambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## What is a Sleep Chronotype?

Your **chronotype** is your body's natural preference for when to sleep and be active — shaped by genetics, age, and biology. It determines whether you thrive at sunrise, peak at midnight, or something in between.

This quiz analyzes 10 dimensions of your daily rhythm — wake time, energy peaks, meal patterns, creativity windows, and more — to match you with one of four sleep animals.

> 📸 Screenshots coming soon! Star this repo to stay updated.

---

## The Four Chronotypes

| | 🦁 Lion | 🐻 Bear | 🐺 Wolf | 🐬 Dolphin |
|---|---|---|---|---|
| **Population** | ~15% | ~55% | ~15% | ~10% |
| **Personality** | Morning warrior | Solar-powered | Night thinker | Light sleeper |
| **Peak hours** | 8 AM – 12 PM | 10 AM – 2 PM | 5 PM – 12 AM | Sporadic |
| **Sleep** | 9:30 PM | 11 PM | 1 AM | Irregular |
| **Strength** | Discipline & drive | Steady productivity | Creative bursts | Hypersensitive focus |

---

## Features

- 10-question science-based chronotype quiz
- 4 detailed result profiles with personalized daily tips
- Interactive daily timeline visualization per chronotype
- Dark cosmic theme with animated star background
- Mobile-first responsive design
- Bilingual — Korean and English (i18next)
- One-tap SNS sharing — Twitter, Facebook, KakaoTalk
- Serverless backend — AWS Lambda + API Gateway
- Global stats — see how your type compares to other users

---

## Tech Stack

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

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/sleep-type.git
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

# Start the API locally with Serverless
sls offline start
```

The local API will be available at `http://localhost:3000/prod`.

---

## Project Structure

```
sleep-type/
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/             # shadcn/ui base components
│   ├── data/
│   │   ├── chronotypes.ts  # 4 chronotype definitions + timelines
│   │   ├── questions.ts    # 10 quiz questions with scoring matrix
│   │   └── calculateChronotype.ts
│   ├── i18n/
│   │   ├── en.json         # English translations
│   │   └── ko.json         # Korean translations
│   ├── pages/              # Route-level page components
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript type definitions
├── backend/
│   ├── handler.py          # Lambda entry point
│   ├── scoring.py          # Chronotype scoring logic
│   ├── db.py               # PostgreSQL connection layer
│   ├── schema.sql          # Database schema
│   ├── requirements.txt
│   ├── serverless.yml      # Serverless Framework config
│   └── .env.example        # Environment variables template
├── public/
│   ├── robots.txt           # Crawler rules
│   ├── sitemap.xml          # SEO sitemap
│   └── favicon.svg          # Moon + stars favicon
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

For bug reports and feature requests, please [open an issue](../../issues).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with React · TypeScript · Python · AWS · and a lot of late nights 🐺

**If this project helped you or made you smile, please leave a star.**

</div>
