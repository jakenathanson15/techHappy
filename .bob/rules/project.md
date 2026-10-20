# Project Rules & Coding Standards — techHappy

## 1. Core Principles
- **Simplicity First**: Implement the minimal, cleanest solution that satisfies the requirement. Avoid premature optimization or unnecessary abstraction layers.
- **Type Safety**: Use strict TypeScript everywhere. Avoid `any` types; prefer explicit types, discriminated unions, and strict null checks.
- **Modularity & Separation of Concerns**: Keep business logic separated from presentation/UI logic. Group related files by feature/domain.

## 2. Coding Standards
- **Naming Conventions**:
  - `PascalCase` for React components, classes, and types/interfaces.
  - `camelCase` for functions, variables, hooks, and utility methods.
  - `kebab-case` for file names (except React component files if matching PascalCase convention is preferred).
  - `UPPER_SNAKE_CASE` for global constants and environment variable references.
- **Async & Error Handling**:
  - Always handle errors gracefully with clear user-facing messages and actionable error logs.
  - Prefer `async`/`await` over raw promise chaining.
  - Validate incoming request payloads / inputs at boundaries (e.g., using Zod or equivalent schema validation).

## 3. Workflow & Git Conventions
- **Commit Messages**: Follow Conventional Commits format:
  - `feat: add user authentication flow`
  - `fix: resolve hydration mismatch on dashboard`
  - `chore: update dependencies`
  - `refactor: simplify data fetching layer`
- **Testing**:
  - Ensure new business logic is covered by unit or integration tests.
  - Run linters, type checks, and tests before finalizing any task.
- **AI Agent Guidelines**:
  - Keep `AGENTS.md` and docs updated when architectural decisions or key dependencies change.
  - Read existing code and context before making modifications.
