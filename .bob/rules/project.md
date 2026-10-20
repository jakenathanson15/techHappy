# Project Rules & Coding Standards — techHappy

## 1. Core Principles
- **Simplicity First**: Implement the minimal, cleanest solution that satisfies the requirement. Avoid premature optimization or unnecessary abstraction layers.
- **Type Safety**: Use strict TypeScript everywhere. Avoid `any` types; prefer explicit types, discriminated unions, and strict null checks.
- **Clean Builds**: Always clear stale `.next` artifacts (`npm run clean` or `rm -rf .next`) before generating production builds to prevent webpack chunk collision during active development.
- **Zero Emojis**: Use clean vector icons (Lucide React) for consistent, professional UI aesthetics.

## 2. Coding Standards
- **Naming Conventions**:
  - `PascalCase` for React components, classes, and types/interfaces.
  - `camelCase` for functions, variables, hooks, and utility methods.
  - `kebab-case` for file names.
  - `UPPER_SNAKE_CASE` for global constants and environment variable references.
- **Async & Error Handling**:
  - Always handle errors gracefully with clear user-facing messages and fallback states.
  - Prefer `async`/`await` over raw promise chaining.

## 3. Workflow & Git Conventions
- **Commit Messages**: Follow Conventional Commits format (`feat:`, `fix:`, `chore:`, `refactor:`).
- **Testing & Verification**:
  - Run type checks (`npm run typecheck`) and builds before committing code.
