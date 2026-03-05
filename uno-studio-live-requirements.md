# Uno Studio Live — Feature Requirements (Must-Haves & Nice-to-Haves)

> **Source:** Competitive analysis of 6 AI app builders (Dreamflow, Lovable, Vibecode, Builder.io, Bolt.new, Tempo Labs) across 45 features in 12 categories.
>
> **Methodology:** Features are prioritized based on how many competitors already offer them (table stakes vs. differentiators), strategic alignment with Uno's strengths (.NET, XAML, multi-platform, enterprise), and user impact.

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| **P0 — Must-Have** | Table stakes — most competitors have this. Shipping without it creates a visible gap. |
| **P1 — Should-Have** | Strong competitive expectation. ~50% of competitors have it. Missing it weakens positioning. |
| **P2 — Differentiator** | Few or no competitors have this. Uno can lead here due to structural advantages. |
| **P3 — Nice-to-Have** | Useful but not critical for launch. Can be added iteratively. |

---

## P0 — Must-Haves (Table Stakes)

These features are offered by 4–6 of the 6 competitors. Shipping without them would create an obvious gap.

### GitHub & Collaboration

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **GitHub native integration** | 5/6 (all except Vibecode) | Auth + repo connect + sync. This is baseline. Must support PAT or GitHub App auth, connect to existing repos, and track file changes. |
| **Branching** | 5/6 (4 YES + 1 LIMITED) | Create, switch, and manage branches. Essential for team workflows. |
| **Code export & project ownership** | 6/6 (4 YES + 2 LIMITED) | Users must be able to export and own their code. Standard .NET solution is already a strength — zero lock-in. |

### Prompt & AI Reasoning

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Codebase-aware prompting** | 6/6 (5 YES + 1 LIMITED) | Agent must reason over and edit actual project files. Must be XAML + .NET aware, not generic text editing. |
| **File / component targeting** | 6/6 (all YES) | Users click a control or file to scope the AI's edits. Critical for trust — reduces blast radius. Every competitor has this. |
| **Diff-aware prompting** | 6/6 (5 YES + 1 LIMITED) | Agent should compute diffs and update only changed lines. Full-file regeneration wastes tokens and creates merge noise. XAML structure makes this even more efficient. |
| **Persistent prompt memory** | 6/6 (5 YES + 1 LIMITED) | Project-level rules/knowledge that persist across sessions. Users need to store design rules, naming conventions, coding standards. Builder uses .mdc rules files; Lovable has Custom Knowledge; Bolt has Project Knowledge. |
| **Screenshot as prompt input** | 6/6 (all YES) | Drag/paste screenshots into chat for visual context. Universal feature — every competitor supports it. |

### Backend & Data

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Backend integration (auth + data)** | 6/6 (5 YES + 1 LIMITED) | Every competitor connects to Supabase/Firebase or similar. Uno should support optional backend integration or templates. Consider Azure-first + Supabase/Firebase options. |
| **Secrets management** | 6/6 (all YES) | Environment variables for API keys, tokens, connection strings. AI references by name without exposing values. |

### Safety & Validation

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Validation before apply** | 6/6 (4 YES + 2 LIMITED) | Build/compile checks before committing changes. Uno can combine MSBuild compilation + XAML validation + preview verification. |
| **Shareable preview & staging links** | 6/6 (all YES) | Share work-in-progress with stakeholders via URL. Every competitor offers this. |

### Pricing & Business Model

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Credits / token pricing** | 6/6 (all YES) | Every competitor has a credit/token system. Uno needs clear, predictable pricing. XAML-aware surgical edits could be more token-efficient — make this a selling point. |

---

## P1 — Should-Haves (Strong Competitive Expectation)

~50% of competitors offer these. Missing them weakens positioning but isn't fatal at launch.

### GitHub & Collaboration

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Import existing repo** | 4/6 (3 YES + 1 LIMITED) | Bring an existing codebase into the tool. Critical for real teams — not just greenfield projects. Dreamflow, Builder, and Bolt support this. |
| **Create new repo** | 5/6 (3 YES + 2 LIMITED) | Publish a project into a new GitHub repo from inside the tool. |
| **Push PRs** | 4/6 (3 YES + 1 LIMITED) | Commit and push changes. Builder's PR-first workflow is the gold standard for enterprise. |

### Visual & Design Inputs

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Figma → app import** | 4/6 (3 YES + 1 LIMITED) | Builder leads with Visual Copilot. Bolt does URL-based import. If pursued, anchor to XAML + Uno Themes/SDS. |
| **Runtime / preview state as AI input** | 6/6 (4 YES + 2 LIMITED) | Agent uses preview output (screenshots, errors, visual state) as feedback. Uno can uniquely leverage Hot Design + visual tree + binding diagnostics. |
| **Custom assets (fonts, images)** | 6/6 (4 YES + 2 LIMITED) | Upload custom fonts (.ttf, .otf), images, SVGs. Must integrate with XAML resource dictionaries. |

### External Context

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **MCP / tool connectors** | 4/6 (3 YES + 1 LIMITED) | Lovable, Builder, and Tempo support MCP servers. Connects the agent to external tools (tickets, docs, databases). Growing expectation. |

### Backend & Data

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **DB state usable by AI** | 5/6 (4 YES + 1 LIMITED) | Agent can inspect database schemas and generate type-safe code against them. Lovable and Dreamflow auto-generate types from Supabase schemas. |

### Mobile

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Explicit mobile app target** | 5/6 (4 YES + 1 LIMITED) | "Create a mobile app" must be a first-class path. Uno Platform's foundation makes native mobile a core output. |
| **Mobile framework** | 5/6 (3 YES + 2 LIMITED) | Uno = C#/XAML (unique). Competitors use Flutter, React Native/Expo. The framework story must be clear. |
| **On-device testing** | 5/6 (3 YES + 2 LIMITED) | Physical device + emulator testing. Hot Design is a uniquely powerful mobile dev loop. |
| **Hot reload on device** | 6/6 (3 YES + 3 LIMITED) | Fast iteration on device. Uno supports Hot Reload for XAML + C# — significant advantage with Hot Design. |
| **Native UI & navigation** | 4/6 (3 YES + 1 LIMITED) | Platform-native controls (tab bars, gestures, haptics). Uno Platform provides true native controls — can offer a toolbox of mobile UI patterns. |
| **Device APIs & services** | 5/6 (3 YES + 2 LIMITED) | Camera, GPS, push notifications, biometrics. Uno Platform exposes native APIs via .NET. |

### Deployment & Publishing

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Web app publishing & hosting** | 6/6 (4 YES + 2 LIMITED) | One-click deploy to a public URL. Uno targets WebAssembly natively — built-in hosting with custom domain support. |
| **App Store / Play Store deployment** | 5/6 (2 YES + 3 LIMITED) | Only Dreamflow and Vibecode have full in-platform deployment. Others require export + EAS/Xcode. Integrated deployment with CI/CD hooks would differentiate. |

### AI Configuration

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **LLM model selection** | 4/6 (3 YES + 1 LIMITED) | Lovable, Bolt, and Tempo let users choose models. Uno should offer model-agnostic architecture: BYOK (bring your own keys), per-task model routing. |

### Quality

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Design system / theming enforcement** | 5/6 (2 YES + 3 LIMITED) | Builder and Tempo lead. Uno Themes and SDS provide a structured token system — enforce compliance at generation time. |

### Templates

| Feature | Competitors with it | Notes for Uno |
|---------|-------------------|---------------|
| **Sample templates** | 3/6 YES | Dreamflow, Lovable, and Bolt offer templates. Lowers the blank-canvas barrier. XAML-native templates (dashboards, CRUD apps, settings) would showcase Uno's cross-platform advantage. |

---

## P2 — Differentiators (Uno Can Lead)

Few or no competitors offer these. Uno has structural advantages that make these achievable and defensible.

### Platform Breadth (Unique to Uno)

| Feature | Competitors with it | Why Uno Wins |
|---------|-------------------|--------------|
| **Cross-platform from single codebase (7+ targets)** | 1/6 YES (Dreamflow = 3 platforms) | iOS, Android, Web (WASM), Windows, macOS, Linux, embedded — all from one C#/XAML project. No competitor exceeds 3 from a true single codebase. This is the headline differentiator. |
| **Desktop app target (Windows / macOS / Linux)** | 0/6 YES (1 LIMITED) | Zero competitors generate native desktop apps. Uno uniquely targets Windows, macOS, and Linux. |
| **Embedded / IoT targets** | 0/6 | Uno runs on embedded Linux (Skia). No competitor touches this space. Niche but defensible for industrial customers. |

### Accessibility (Massive Gap)

| Feature | Competitors with it | Why Uno Wins |
|---------|-------------------|--------------|
| **Accessible output by default (WCAG / ARIA)** | 0/6 YES (2 LIMITED) | No competitor systematically generates accessible output. Uno Platform's controls include built-in automation peers and accessibility support. Auto-generating accessible XAML is a legal requirement (ADA, EAA, Section 508) and a clear differentiator. |

### Safety & Trust

| Feature | Competitors with it | Why Uno Wins |
|---------|-------------------|--------------|
| **Auto-rollback on failure** | 0/6 YES (4 LIMITED) | No competitor has true automated rollback. All rely on manual checkpoints. Uno can offer safe rollback plans (revert commits, PR revert) as part of the agent's safety model. |
| **XAML-aware blast radius** | 0/6 | Structure-aware edits targeting UI subtrees, controls, styles, and resource dictionaries. Reduces unintended side effects — a trust advantage. |

### AI Architecture

| Feature | Competitors with it | Why Uno Wins |
|---------|-------------------|--------------|
| **Local / self-hosted AI execution** | 0/6 YES (1 LIMITED — bolt.diy only) | Enterprise and government need code to never leave their network. Studio Live + local LLM execution = unique enterprise offering. |
| **Repo as AI input (multi-repo context)** | 1/6 YES (Builder only) | Let the agent read additional repos (design systems, API docs, shared libraries) as context. Only Builder supports this. |

### Quality & Testing

| Feature | Competitors with it | Why Uno Wins |
|---------|-------------------|--------------|
| **Visual regression testing** | 0/6 YES (2 LIMITED) | Capture and compare screenshots across iterations and platforms. No competitor offers multi-platform visual regression. |

### Intelligence

| Feature | Competitors with it | Why Uno Wins |
|---------|-------------------|--------------|
| **Telemetry / analytics as AI input** | 1/6 YES (Builder), 2 LIMITED | Use real usage data to prioritize what the agent optimizes. Combine Studio Live with diagnostics for data-driven iteration. |

---

## P3 — Nice-to-Haves (Iterative Additions)

Useful features that can be added after launch without impacting core positioning.

| Feature | Competitors with it | Notes |
|---------|-------------------|-------|
| **Merging (in-product)** | 2/6 YES, 2 LIMITED | Most tools defer merging to GitHub. Keep merge in GitHub for governance; consider safe merge options later. |
| **Live updates after publish** | 1/6 YES (Builder), 5 LIMITED | Most tools require manual re-deploy. Auto-update for staging + manual promotion for production is the best of both worlds. |
| **Mobile-first editing (build from phone)** | 1/6 YES (Vibecode only) | Novel but niche. Consider whether Studio Live's design mode could work on tablet form factors. |
| **In-app feedback** | 4/6 YES | Built-in bug report / feature request channel. Low effort, good for user signal. |

---

## Strategic Priorities Summary

### Launch Readiness (P0 + critical P1)

For Studio Live to be competitive at launch, it needs:

1. **GitHub integration** — connect, branch, commit, push
2. **XAML-aware AI editing** — codebase-aware, diff-aware, component-targeted prompting
3. **Persistent project rules** — user-defined coding standards, design rules, naming conventions
4. **Screenshot → prompt** — visual context for debugging and iteration
5. **Preview + validation loop** — build/compile check before committing, live preview with diagnostics
6. **Code export** — standard .NET solution, zero lock-in (already Uno's strength)
7. **Shareable preview links** — share WIP with stakeholders
8. **Secret management** — env vars for API keys
9. **Credit/token pricing model** — clear and predictable

### Differentiation Story (P2)

These are the features that make Studio Live _different_, not just _another AI builder_:

1. **7+ platform targets from one codebase** — the headline. No one else does this.
2. **Accessible by default** — auto-generate accessible XAML. Legal requirement, moral imperative, and a gap no competitor fills.
3. **Desktop app targets** — Windows, macOS, Linux. Zero competitors.
4. **XAML-aware blast radius** — structure-aware edits, not raw text generation. Trust advantage.
5. **Hot Design + Hot Reload** — live visual editing on physical devices. Uniquely powerful mobile dev loop.
6. **.NET ecosystem integration** — NuGet, Azure DevOps, MSAL, 12M+ developers. Generated code integrates immediately.
7. **Local/self-hosted AI** — air-gapped execution for regulated industries. No competitor offers this.

### Post-Launch Roadmap Candidates

1. Figma → XAML import (anchor to Uno Themes / SDS)
2. MCP connectors (GitHub Issues, docs, internal KB)
3. App Store / Play Store deployment pipeline
4. LLM model selection (BYOK, per-task routing)
5. Visual regression testing across platforms
6. Telemetry-informed recommendations
7. Design system enforcement at generation time
8. Multi-repo context (read additional repos for AI context)
9. Sample templates (dashboards, CRUD, onboarding flows)
10. Auto-rollback on failure

---

## Competitive Landscape Quick Reference

### Feature Coverage by Tool

| Tool | YES | LIMITED | NO | Primary Strength |
|------|-----|---------|-----|-----------------|
| **Dreamflow** | 30 | 5 | 10 | Flutter mobile-first, in-platform App Store deployment, most complete Git integration |
| **Lovable** | 18 | 10 | 17 | Best onboarding UX, strong Supabase integration, web-focused simplicity |
| **Vibecode** | 11 | 5 | 29 | Mobile-first editing (build from phone), native iOS UI components, innovative UX |
| **Builder.io** | 22 | 9 | 14 | Enterprise features, PR-native workflow, Figma integration, multi-repo context |
| **Bolt.new** | 18 | 11 | 16 | WebContainers runtime, generous free tier, simple developer experience |
| **Tempo** | 20 | 10 | 15 | Model selection (7 options), ShadCN/Storybook design system, Figma plugin |

### Features No Competitor Has (Uno's Blue Ocean)

- Native desktop app targets (Windows, macOS, Linux)
- 7+ platform single codebase
- Embedded / IoT targets
- Accessible output by default (systematic WCAG compliance)
- True auto-rollback on failure
- Local/self-hosted AI execution (only bolt.diy, an open-source fork, partially supports this)
- Visual regression testing across multiple platforms
- XAML/semantic-aware UI editing

---

## Appendix: Feature-by-Feature Status Matrix

### A. GitHub & Collaboration

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| GitHub native integration | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Import existing repo | ✅ | ❌ | ❌ | ✅ | ✅ | ⚠️ |
| Create new repo | ⚠️ | ✅ | ❌ | ⚠️ | ✅ | ✅ |
| Branching | ✅ | ⚠️ | ❌ | ✅ | ✅ | ✅ |
| Push PRs | ✅ | ⚠️ | ❌ | ✅ | ❌ | ✅ |
| Merging | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ |

### B. Prompt Context & AI Reasoning

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Codebase-aware prompting | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| Repo as AI input | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| File/component targeting | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Diff-aware prompting | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| Persistent prompt memory | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |

### C. Visual & Design Inputs

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Screenshot as prompt input | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Figma → app import | ❌ | ⚠️ | ❌ | ✅ | ✅ | ✅ |
| Runtime/preview as AI input | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ |
| Custom assets | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ |

### D. External Context & Ecosystem

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| MCP / tool connectors | ❌ | ✅ | ⚠️ | ✅ | ❌ | ✅ |
| Telemetry as AI input | ❌ | ⚠️ | ❌ | ✅ | ⚠️ | ❌ |

### E. Backend, Data & Secrets

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Backend integration | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| DB state usable by AI | ✅ | ✅ | ❌ | ✅ | ⚠️ | ✅ |
| Secrets | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### F. Safety & Validation

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Validation before apply | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ |
| Auto-rollback on failure | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ |

### G. Mobile

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Explicit mobile target | ✅ | ❌ | ✅ | ✅ | ⚠️ | ✅ |
| Mobile framework | ✅ | ❌ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| On-device testing | ✅ | ❌ | ✅ | ✅ | ⚠️ | ⚠️ |
| Hot reload on device | ✅ | ❌ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| Mobile-first editing | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Native UI & navigation | ✅ | ❌ | ✅ | ❌ | ⚠️ | ❌ |
| Device APIs & services | ✅ | ❌ | ✅ | ⚠️ | ⚠️ | ❌ |

### H. Deployment & Publishing

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| App Store deployment | ✅ | ❌ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| Code export & ownership | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |
| Web app publishing | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |
| Shareable preview links | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Live updates after publish | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ |

### I. Desktop & Platform Breadth

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Cross-platform single codebase | ✅ (3) | ❌ (1) | ⚠️ (2) | ⚠️ | ⚠️ (3) | ⚠️ (3) |
| Desktop app target | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Embedded / IoT | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### J. Accessibility & Quality

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Accessible output (WCAG) | ❌ | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| Design system enforcement | ⚠️ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| Visual regression testing | ❌ | ⚠️ | ❌ | ❌ | ❌ | ⚠️ |

### K. AI Configuration

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| LLM model selection | ❌ | ✅ | ❌ | ⚠️ | ✅ | ✅ |
| Local/self-hosted AI | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ |

### L. Misc

| Feature | Dreamflow | Lovable | Vibecode | Builder | Bolt | Tempo |
|---------|-----------|---------|----------|---------|------|-------|
| Feedback | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Credits / token pricing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sample templates | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |

---

*Generated from competitive analysis data. Last updated: July 2025.*
