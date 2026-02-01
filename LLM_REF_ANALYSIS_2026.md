# LLM-Oriented AI Coding: Comprehensive Analysis & Refactoring Plan

**Date:** 31.01.2026
**Project:** ProTrader Systems (protrade-visual-guide)

## 🎯 Core Principles of LLM-Oriented AI Coding

For an AI agent to work effectively, the codebase must adhere to:

1. **Predictability over Novelty**: Use standard patterns and flat structures.
2. **Explicit Context**: Minimize "magic" and hidden state. Prefer props and explicit service calls.
3. **Low Cognitive Load (Per File)**: Small, focused files are easier for AI to process within context limits.
4. **Single Source of Truth**: Business logic belongs in services/hooks, not inlined in UI components.
5. **Standardized Tooling**: Use Consistent naming and folder conventions.

---

## 📊 Quick Status Audit

| Metric | Status | Note |
| :--- | :--- | :--- |
| **Code Consolidation** | ⚠️ Needs Work | Many duplicate pages (`Session1/2`, `Gallery1/2`). |
| **Logic Isolation** | ⚠️ Needs Work | Inline `fetch` calls in components (e.g., `QuizSection`). |
| **Naming Consistency** | 🟡 Average | Ambiguity between `components/course` and `courses`. |
| **Template Redundancy** | 🔴 High | Multiple small files for legal docs could be generic. |

---

## 🔴 High Priority (Immediate Refactoring)

### 1. Consolidate Duplicate Pages & Components

* **Current Issues**: `Session1Gallery.tsx` and `Session2Gallery.tsx` are 95% identical, differing only in hardcoded image lists. `SessionOne.tsx` and `SessionTwo.tsx` follow the same pattern.
* **Refactoring**:
  * Create a generic `GalleryPage.tsx` that accepts a `sessionId` or `config` object.
  * Move image data to `src/data/galleries.ts`.
  * **Impact**: Removes ~700 lines of redundant code. Makes it 2x faster for AI to update gallery logic.

### 2. Centralize Service Layer (Refactor Webhooks)

* **Current Issues**: `QuizSection.tsx` calls `n8n.protradersystems.com` directly via `fetch`. Hardcoded URLs make it impossible for AI to swap environments reliably.
* **Refactoring**:
  * Move quiz submission to `src/services/registrationService.ts` or a new `quizService.ts`.
  * Use `import.meta.env.VITE_N8N_WEBHOOK_QUIZ` for URLs.
  * **Impact**: Fixes the "Response not JSON" and 502 errors by adding proper error handling/retries in one place.

### 3. Resolve Component Directory Ambiguity

* **Target**: `src/components/course` and `src/components/courses`.
* **Action**: Rename `src/components/course` to `src/components/course-details` or merge into `src/components/training`.
* **Impact**: Prevents AI from looking in the wrong folder when asked to "edit course components".

---

## 🟡 Medium Priority (Stabilization)

### 1. Generic Legal/Static Page Template

* **Current Issues**: `PrivacyPolicy.tsx`, `PublicOffer.tsx`, and `EligibleClients.tsx` are nearly empty wrappers.
* **Refactoring**:
  * Create a `StaticPageLayout.tsx` and map routes to data-driven content.
  * **Impact**: Reduces file count in `src/pages`, making the file explorer cleaner for AI.

### 2. Localization of Technical Categories

* **Current Issues**: In `Session2Gallery.tsx`, categories like "Exit: TS-BS" are hardcoded strings.
* **Refactoring**:
  * Move these to `ru.ts` and `uk.ts`.
  * **Impact**: Ensures 100% translation coverage.

### 3. Break Down "God Components"

* **Targets**: `N8NLab.tsx` (~800 lines) and `QuizSection.tsx` (~400 lines).
* **Refactoring**:
  * Extract `QuizQuestion`, `QuizResults`, and `EmailGate` into `src/components/home/quiz/`.
  * **Impact**: Prevents context overflow when an AI tries to edit a specific part of the quiz.

---

## 🟢 Low Priority (Cleanup & Polish)

### 1. Asset Naming Pipeline

* **Target**: `public/images/course/...`
* **Action**: Rename files to lower-case, kebab-case without dates (e.g., `s-p-moe-flashcard-p1.png`).
* **Impact**: Easier for AI to reference assets without typos.

### 2. Standardize Icon Provider

* **Action**: Ensure all icons come from `lucide-react` via `@/components/icons` if used frequently.

---

## 🗑️ Deletion Registry (Safe to Remove)

| File/Directory | Reason |
| :--- | :--- |
| `src/pages/Indicators.tsx` | Placeholder, unused in current sitemap. |
| `src/pages/Strategies.tsx` | Placeholder, unused. |
| `src/components/courses/CourseCard.tsx` | If replaced by unified training cards. |

## ✅ Conclusion

By merging the Session and Gallery pages and moving all API logic to the Service layer, the codebase will become **"Agent-Ready"**. Currently, there is too much "noisy duplication" that confuses LLMs and leads to inconsistent updates.

**Recommended First Step**: Create `src/services/quizService.ts` to solve the current 502 error reported in the Lab Session.
