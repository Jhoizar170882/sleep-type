# Contributing to Sleep Type Quiz

Thank you for your interest in contributing! Whether you're fixing a bug, suggesting a feature, improving docs, or adding a translation — every contribution makes this project better. We're glad you're here.

---

## How to Contribute

There are many ways to contribute:

- **Bug reports** — found something broken? Let us know.
- **Feature requests** — have an idea? Open an issue to discuss it.
- **Documentation** — improve clarity, fix typos, add examples.
- **Translations** — help make the quiz accessible in more languages.
- **Code** — fix bugs or implement new features.

---

## Development Setup

### Prerequisites

- Node.js 18+

### Steps

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/<your-username>/sleep-type.git
   cd sleep-type
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

---

## Code Style

- **TypeScript** — all frontend code is written in TypeScript. Avoid using `any`.
- **ESLint** — run linting before committing:

  ```bash
  npm run lint
  ```

- **Tailwind CSS v4** — use Tailwind utility classes for styling. Avoid inline styles.

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|--------|-------------|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, whitespace (no logic change) |
| `refactor:` | Code restructuring without behavior change |
| `test:` | Adding or updating tests |
| `chore:` | Build process, dependencies, tooling |

**Example:**

```
feat: add dark mode toggle
fix: correct sleep score calculation for edge case
docs: update setup instructions in README
```

---

## Pull Request Process

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes.

3. Run linting and fix any issues:

   ```bash
   npm run lint
   ```

4. Push your branch and open a pull request on GitHub.

5. Write a clear PR description explaining **what** changed and **why**.

6. Link any related issues using GitHub keywords (e.g., `Closes #42`).

PRs are reviewed as promptly as possible. Please be patient and responsive to feedback.

---

## Bug Reports

When reporting a bug, please include:

- **Steps to reproduce** — what exactly did you do?
- **Expected behavior** — what should have happened?
- **Actual behavior** — what happened instead?
- **Browser and OS** — e.g., Chrome 120 on macOS 14
- Screenshots or console errors if applicable

Open a bug report here: [GitHub Issues](https://github.com/black4305/sleep-type/issues)

---

## Feature Requests

Have an idea for a new feature? We'd love to hear it — but please **open an issue to discuss it first** before writing code. This helps avoid duplicate work and ensures the feature fits the project's direction.

Describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you considered

---

## Adding Translations

The project uses [i18next](https://www.i18next.com/) for internationalization. Translation files live in `src/i18n/`.

To add a new language:

1. Create a new JSON file in `src/i18n/`, named after the language code (e.g., `fr.json` for French).
2. Copy the structure from an existing file (e.g., `en.json`) and translate the values.
3. Register the new language in the i18n configuration file.
4. Open a PR with the new translation file.

If you're unsure about a translation, it's fine to open a draft PR and ask for review.

---

## Code of Conduct

This project is built on respectful collaboration. We expect all contributors to:

- Be kind and considerate in all interactions
- Welcome differing viewpoints and experiences
- Accept constructive feedback gracefully
- Focus on what is best for the community and the project

Harassment, discrimination, or disrespectful behavior of any kind will not be tolerated. If you experience or witness unacceptable behavior, please report it by opening a private issue or contacting the maintainers directly.

---

Thanks again for contributing. Every improvement, no matter how small, matters.
