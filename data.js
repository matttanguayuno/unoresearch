// Data
const data = {
  "meta": {
    "title": "AI App Builders Research — Uno Studio Live",
    "subtitle": "Docs-only competitive analysis (no inference). Click to drill into evidence.",
    "methodology": [
      "Only explicitly documented capabilities are marked ✅.",
      "⚠️ means documented but limited/constrained or workflow-based.",
      "❌ means not documented / not supported in available docs."
    ],
    "toolsReviewed": [
      "Dreamflow",
      "Lovable",
      "Vibecode.app",
      "Builder.io Projects",
      "Bolt.new",
      "Tempo",
      ""
    ]
  },
  "tools": [
    {
      "id": "dreamflow",
      "name": "Dreamflow",
      "typeHint": "IDE-like git panel + app builder",
      "website": "https://dreamflow.com",
      "primaryDocs": {
        "docs": "https://docs.dreamflow.com/"
      }
    },
    {
      "id": "lovable",
      "name": "Lovable",
      "typeHint": "Prompt-first app builder + MCP connectors",
      "website": "https://lovable.dev",
      "primaryDocs": {
        "docs": "https://docs.lovable.dev/"
      }
    },
    {
      "id": "vibecode",
      "name": "Vibecode.app",
      "typeHint": "Generation-first + export/SSH workflow",
      "website": "https://vibecodeapp.com",
      "primaryDocs": {
        "docs": "https://vibecodeapp.mintlify.app/"
      }
    },
    {
      "id": "builder",
      "name": "Builder.io",
      "typeHint": "PR-native governance + repo-connected editing",
      "website": "https://www.builder.io",
      "primaryDocs": {
        "docs": "https://www.builder.io/c/docs/intro"
      }
    },
    {
      "id": "bolt",
      "name": "Bolt.new",
      "typeHint": "Repo-backed builder + Figma + Supabase",
      "website": "https://bolt.new",
      "primaryDocs": {
        "docs": "https://support.bolt.new/"
      }
    },
    {
      "id": "tempo",
      "name": "Tempo",
      "typeHint": "Visual React builder + Figma plugin + local IDE sync",
      "website": "https://www.tempo.new",
      "primaryDocs": {
        "docs": "https://tempolabsinc.mintlify.app/"
      }
    }
  ],
  "unoVsCompetitors": {
    "title": "Uno vs Competitors",
    "intro": "This tab synthesizes our research on Dreamflow, Lovable, Vibecode, Builder.io, Bolt.new, and Tempo alongside the Studio Live vision. The goal is to highlight meaningful differentiation opportunities (not just feature checklists).",
    "cards": [
      {
        "id": "ui-semantics",
        "headline": "1. Semantic UI structure: a potential moat",
        "summary": "Studio Live's planned Design mode includes Elements + Toolbox + properties. This suggests a path toward structure-aware edits (safer than raw text generation).",
        "readMore": {
          "observed": [
            "The Studio Live design includes an Elements tree and a Toolbox organized by control categories, plus a selection/properties panel pattern.",
            "Competitors primarily operate on text/files; some have editors, but semantic UI editing tied to a runtime is not consistently core."
          ],
          "whyItMatters": [
            "Structure-aware editing can reduce blast radius: edits can target a subtree/component instead of touching arbitrary files.",
            "It enables higher-level intents (\"tighten spacing\", \"align to design system\") with fewer regressions than prompt-only code edits."
          ],
          "opportunityForUno": [
            "Treat UI structure as a first-class artifact: selected element → constrained changes → predictable diffs.",
            "Even if the agent initially edits code, expose structure-level targeting in the UX (\"apply only to this page/component/style resource\")."
          ]
        }
      },
      {
        "id": "preview-loop",
        "headline": "2. Preview-first iteration as ground truth",
        "summary": "Studio Live appears preview-first. If the agent can use preview output as feedback (not just display), it can outperform text-only workflows on correctness.",
        "readMore": {
          "observed": [
            "Studio Live centers the canvas/preview. There is a 'Get app screenshot' agent tool and a 'Download My App' action.",
            "Competitors often have preview, but it's not always a first-class feedback input for the agent."
          ],
          "whyItMatters": [
            "Visual ground truth reduces 'prompt drift' and helps validate outcomes (\"did we actually build what we intended?\").",
            "Preview-driven iteration is especially important for UI-heavy apps where code correctness and visual correctness diverge."
          ],
          "opportunityForUno": [
            "Make preview output actionable: screenshot capture, visual diffs between versions, and quick rollback to prior versions.",
            "Use preview feedback to guide iteration prompts (\"here's what changed visually; what should we adjust?\")."
          ]
        }
      },
      {
        "id": "agent-tools",
        "headline": "3. Agent model: explicit tools (trust) vs implicit actions",
        "summary": "Studio Live's design includes explicit agent tools (build, publish, screenshot). This is a trust advantage if kept central to the UX.",
        "readMore": {
          "observed": [
            "Studio Live includes 'Agent Tool' actions such as Build workspace, Publish build artifacts, and Get app screenshot.",
            "Some competitors blur action boundaries (changes can feel opaque); Builder's PR workflow is explicit about change packaging; Bolt emphasizes frequent commits/sync."
          ],
          "whyItMatters": [
            "Explicit tools clarify capability boundaries: users understand what the agent can do and when it is doing it.",
            "This improves auditability and reduces fear: 'the agent ran tool X' is easier to trust than 'the agent changed things.'"
          ],
          "opportunityForUno": [
            "Keep the agent tool-based: make actions intentional, logged, and reviewable.",
            "Treat the Log Console as a first-class companion to agent tools (inputs, outputs, errors, artifacts)."
          ]
        }
      },
      {
        "id": "product-shape",
        "headline": "4. Product shape: AI Studio vs AI Chat",
        "summary": "Many competitors are either a chat overlay on code, or a studio-like builder. Studio Live has a clear 'AI studio' shape (shell + canvas + modes).",
        "readMore": {
          "observed": [
            "Studio Live's architecture includes a dedicated shell (navigation + App Builder + Log Console + Settings) and a central canvas/preview surface.",
            "Competitors vary: some resemble full studios (e.g., Dreamflow/Builder/Bolt patterns), others lean more on repo sync + chat (e.g., Lovable), or export/SSH workflows (e.g., Vibecode)."
          ],
          "whyItMatters": [
            "A studio makes the build loop explicit and reduces friction for users who aren't living in a full IDE.",
            "A studio also creates room for guardrails and 'safe iteration' patterns (build checks, preview verification, versioning)."
          ],
          "opportunityForUno": [
            "Lean into the 'studio loop' explicitly: prompt → generate → build → preview → iterate.",
            "Make system state visible (what changed, what ran, what succeeded/failed) so the experience feels trustworthy rather than magical."
          ]
        }
      },
      {
        "id": "safety-scope",
        "headline": "5. Safety: scope control + validation beats speed alone",
        "summary": "Competitors often choose between speed (auto-sync) and governance (PRs). Studio Live can combine fast iteration with visible constraints and validation.",
        "readMore": {
          "observed": [
            "Competitor patterns vary: Builder emphasizes PR packaging; Bolt emphasizes frequent commits/sync; Dreamflow supports in-product Git operations; Lovable emphasizes GitHub as source of truth; Vibecode relies on external workflows.",
            "Studio Live's design includes build/publish tooling and a Log Console, which can support technical validation signals."
          ],
          "whyItMatters": [
            "Teams fear unpredictable changes more than they fear slower generation. Safety and clarity improve adoption.",
            "Validation is especially important in multi-platform UI where 'it compiles' doesn't always mean 'it's correct.'"
          ],
          "opportunityForUno": [
            "Expose 'blast radius' and constraints: what the agent will touch, what it will not touch, and why.",
            "Make validation visible: build status, errors, preview confirmation, and version checkpoints the user can revert to."
          ]
        }
      },
      {
        "id": "governance-path",
        "headline": "6. Collaboration path: Solo loop now, Team governance later",
        "summary": "PR-first workflows are powerful but can slow early usage. A 'Solo mode → Team mode' progression matches how users adopt these tools.",
        "readMore": {
          "observed": [
            "Some competitors are PR-centric (Builder); others emphasize direct commits/sync (Bolt) or repo connection patterns (Dreamflow/Lovable).",
            "Studio Live's current design doesn't explicitly emphasize GitHub/PR surfaces, so governance is best framed as a roadmap decision rather than a current claim."
          ],
          "whyItMatters": [
            "Solo users want speed and minimal friction; teams eventually need review, CI gates, and traceability.",
            "Supporting both prevents a common trap: tools that feel amazing alone but break down in real collaboration."
          ],
          "opportunityForUno": [
            "Design a clear progression: fast iteration by default, with an optional 'Team Mode' that introduces PRs/branches/review gates when needed.",
            "Keep governance compatible with the agent tool model (e.g., 'propose changes as PR', 'run CI checks', 'summarize diff in human terms')."
          ]
        }
      }
      ,
      {
        "id": "ai-model-flexibility",
        "headline": "7. AI model flexibility: let teams choose their engine",
        "summary": "Competitors lock users into a single LLM. Studio Live can offer model-agnostic agent architecture — choose models per task, bring your own keys, or run local models for sensitive code.",
        "readMore": {
          "observed": [
            "Lovable recently added model selection (Claude, GPT-4o, Gemini). Bolt.new offers model switching. Vibecode is tied to Claude Code. Builder.io uses its own routing across models.",
            "No competitor offers local/on-premise model execution or task-specialized model routing (e.g., fast model for styling, reasoning model for architecture)."
          ],
          "whyItMatters": [
            "Enterprise customers need data residency control — code processed by external LLMs is a deal-breaker in regulated industries (finance, healthcare, defense).",
            "Different tasks benefit from different models: layout/styling is a fast-model task; refactoring architecture is a reasoning-model task. One-size-fits-all wastes tokens and quality."
          ],
          "opportunityForUno": [
            "Offer model-agnostic agent architecture: users bring their own API keys, choose models per task type, or connect to Azure OpenAI for enterprise compliance.",
            "Support local/self-hosted model execution for air-gapped environments — a unique selling point for government and enterprise.",
            "Implement task-aware model routing: use smaller, faster models for simple styling changes and more capable models for complex architectural decisions."
          ]
        }
      },
      {
        "id": "accessibility-first",
        "headline": "8. Accessibility by default: the gap no one is filling",
        "summary": "No competitor systematically generates accessible output. WCAG compliance, ARIA labels, keyboard navigation, and screen reader support are afterthoughts — if addressed at all.",
        "readMore": {
          "observed": [
            "None of the five reviewed competitors (Dreamflow, Lovable, Vibecode, Builder.io, Bolt.new) document accessibility validation, WCAG compliance checks, or ARIA attribute generation as a built-in feature.",
            "AI-generated UI frequently fails basic accessibility standards: missing alt text, insufficient contrast ratios, non-focusable interactive elements, and missing semantic roles."
          ],
          "whyItMatters": [
            "Accessibility is a legal requirement in many markets (ADA, EAA, Section 508). Apps that fail accessibility audits face lawsuits, fines, and reputational damage.",
            "The EU Accessibility Act (EAA) takes effect June 2025, requiring digital products to meet EN 301 549 standards. This creates immediate market demand.",
            "Making accessibility automatic (not opt-in) positions Uno as the responsible choice for professional app development."
          ],
          "opportunityForUno": [
            "Uno Platform already has strong accessibility support in its control library. Studio Live should auto-generate accessible XAML: semantic roles, automation properties, keyboard navigation, and contrast-compliant theming.",
            "Add accessibility validation as a build-time check: flag missing AutomationProperties, insufficient contrast ratios, and non-keyboard-navigable controls before commit.",
            "Position 'accessible by default' as a key differentiator for government, enterprise, and EU market customers."
          ]
        }
      },
      {
        "id": "full-stack-studio",
        "headline": "9. Full-stack studio with a runtime it controls",
        "summary": "Studio Live isn't just a chat overlay — it's a full development environment built on a runtime Uno controls. This is the Dreamflow/FlutterFlow model applied to the .NET ecosystem, with broader platform reach.",
        "readMore": {
          "observed": [
            "Dreamflow succeeds because it owns the Flutter runtime end-to-end: widget tree, preview, build, deploy. Studio Live has the same structural advantage with Uno Platform + .NET.",
            "Most competitors are thin wrappers around code generation (Lovable, Bolt) or content management layers (Builder.io). They don't control the runtime, limiting their ability to provide deep tooling."
          ],
          "whyItMatters": [
            "Owning the runtime enables capabilities competitors can't replicate: Hot Design for live on-device editing, visual tree inspection, binding diagnostics, and platform-specific rendering checks.",
            "Runtime ownership also means the studio can guarantee build correctness — it knows every valid state of the UI framework, unlike tools that generate code for frameworks they don't control."
          ],
          "opportunityForUno": [
            "Lean into runtime ownership: make Hot Design, visual tree, and XAML diagnostics core parts of the agent's toolkit — not just developer conveniences.",
            "Use runtime knowledge to generate provably correct UI: the agent knows the control API, valid property combinations, and platform-specific rendering behaviors.",
            "Position Studio Live as 'the Dreamflow of .NET' — but targeting 7+ platforms instead of 3, with enterprise-grade tooling."
          ]
        }
      }
    ],
    "closingNote": "Takeaway: The strongest differentiation path isn't 'better prompting.' It's a more trustworthy build loop — explicit tools, preview-first feedback, structure-aware UI editing, accessible-by-default output, and a full-stack studio built on a runtime Uno controls. Combined with model flexibility and 7+ platform reach, this creates defensible advantages that generic AI builders cannot replicate."
  },
  "missedOpportunities": {
    "title": "Missed opportunities in today's AI app builders (where Uno can lead)",
    "subtitle": "These are scope-shaping capability areas that competitors commonly under-deliver on. They are recommendations, not claims about current Studio Live features.",
    "cards": [
      {
        "id": "understand-before-change",
        "headline": "Understand impact before changing anything",
        "summary": "Most tools generate first and explain later. Uno can lead with 'impact previews' and change boundaries before edits are applied.",
        "readMore": {
          "competitorGap": [
            "Many AI builders apply changes quickly but do not reliably explain what will be affected (which screens, shared styles, resource dictionaries, cross-platform implications).",
            "Users often discover unintended side effects only after preview/build—or worse, after merging."
          ],
          "opportunityForUno": [
            "Introduce a pre-change 'impact preview' step: what files, screens, resources, and components are likely to change and how broadly they are reused.",
            "Expose explicit change boundaries: 'only this page,' 'only this style dictionary,' 'only this component subtree.'"
          ],
          "whyItMatters": [
            "Reduces fear and surprises, which are the main blockers to adoption in real teams.",
            "Turns the agent into a trustworthy teammate rather than a generator that must be constantly supervised."
          ]
        }
      },
      {
        "id": "intent-negotiation",
        "headline": "Negotiate intent instead of blindly executing prompts",
        "summary": "UI requests are often underspecified ('make it cleaner'). Uno can make intent clarification a first-class step.",
        "readMore": {
          "competitorGap": [
            "Most tools treat prompts as commands, which works for concrete tasks but fails for UX/design language requests.",
            "Underspecified requests lead to 'prompt drift' and repeated iteration cycles."
          ],
          "opportunityForUno": [
            "Add an 'intent negotiation' step: reflect back understanding, propose 2–3 approaches, ask the user to choose before changing UI/code.",
            "Standardize this for common UX requests (hierarchy, spacing, readability, navigation clarity, accessibility)."
          ],
          "whyItMatters": [
            "Cuts iteration time by aligning on direction before changes land.",
            "Makes Studio Live more useful to non-designers and non-developers (PMs, stakeholders) without lowering quality."
          ]
        }
      },
      {
        "id": "evaluation-and-critique",
        "headline": "Evaluate and critique output, not just generate it",
        "summary": "Competitors are good at 'doing' but weak at 'judging.' Uno can ship evaluation loops (visual, runtime, UX).",
        "readMore": {
          "competitorGap": [
            "Most tools lack a consistent mechanism to judge whether a change improved UX or introduced regressions.",
            "Preview exists, but it's not usually treated as structured feedback for the agent."
          ],
          "opportunityForUno": [
            "Make evaluation a step: after a change, run checks and summarize results (build status, runtime errors, visual differences, basic UX heuristics).",
            "Use screenshots and runtime signals as inputs to guide the next iteration ('what changed,' 'what might have regressed,' 'what to fix next')."
          ],
          "whyItMatters": [
            "Improves reliability and reduces the 'it looked fine in the prompt' problem.",
            "Creates a measurable quality loop that is hard for generic AI builders to replicate."
          ]
        }
      },
      {
        "id": "system-level-consistency",
        "headline": "System-level UI consistency across screens and patterns",
        "summary": "Competitors often optimize single-screen edits. Uno can act as a UI system steward across the app.",
        "readMore": {
          "competitorGap": [
            "Many tools work file-by-file or page-by-page, which can accidentally fragment a UI system (inconsistent spacing, styles, control usage).",
            "Design system alignment is typically manual and fragile."
          ],
          "opportunityForUno": [
            "Add app-wide 'consistency awareness': detect when a new pattern diverges from existing conventions and suggest standardization.",
            "Support refactoring toward shared components/resources when repeated patterns appear."
          ],
          "whyItMatters": [
            "Consistency is one of the largest UX quality multipliers and a major cost driver in mature apps.",
            "This makes Studio Live valuable after the first demo—during real app evolution."
          ]
        }
      },
      {
        "id": "time-and-memory",
        "headline": "Semantic history and decision memory (beyond Git)",
        "summary": "AI builders rarely capture 'why' decisions were made. Uno can preserve intent, alternatives, and rationale over time.",
        "readMore": {
          "competitorGap": [
            "Version control captures what changed, but not why the change happened or what alternatives were tried and rejected.",
            "Teams repeatedly re-litigate prior design decisions because the rationale is lost."
          ],
          "opportunityForUno": [
            "Track 'semantic history': key design choices, rejected options, and the reasoning behind changes (human + agent).",
            "Make it searchable: 'why is this layout like this?' 'when did we adopt this pattern?'"
          ],
          "whyItMatters": [
            "Reduces churn and rework in long-lived codebases.",
            "Becomes a compounding advantage for teams that iterate frequently with AI."
          ]
        }
      },
      {
        "id": "multi-role-workflows",
        "headline": "Multi-role workflows (PM, designer, QA), not only developers",
        "summary": "Most tools assume a single technical user. Uno can design role-friendly flows and permissions from the start.",
        "readMore": {
          "competitorGap": [
            "Many AI builders implicitly assume one user driving prompts and accepting changes.",
            "Non-dev stakeholders struggle to contribute without breaking process or quality."
          ],
          "opportunityForUno": [
            "Support role-based workflows: e.g., PM requests UX improvements, designer adjusts structure/styling, dev approves/merges technical changes.",
            "Introduce permissioned agent capabilities (who can run build/publish, who can propose PRs, who can approve)."
          ],
          "whyItMatters": [
            "Unlocks broader adoption inside real organizations.",
            "Creates a natural bridge from fast iteration to governed, team-scale delivery."
          ]
        }
      },
      {
        "id": "explainability-by-design",
        "headline": "Explainability as a first-class feature",
        "summary": "Trust is usually a side effect. Uno can design explicit 'why this change' explanations and constraints.",
        "readMore": {
          "competitorGap": [
            "Tools often output code without clearly explaining rationale, tradeoffs, or expected impact.",
            "Users are left to infer intent from diffs, which is slow and error-prone."
          ],
          "opportunityForUno": [
            "Require the agent to justify changes in plain language (what it did, why, what it didn't touch, what to verify).",
            "Optionally cite guidelines or rules-of-thumb used (accessibility, touch targets, layout principles)."
          ],
          "whyItMatters": [
            "Increases confidence and reduces review time.",
            "Makes Studio Live more adoptable in enterprise settings where accountability matters."
          ]
        }
      },
      {
        "id": "platform-native-quality",
        "headline": "Platform-native quality at AI speed",
        "summary": "All web-first AI builders generate React/Tailwind. Mobile-first ones generate React Native or Flutter. None generate truly platform-native UI that looks and feels right on each target.",
        "readMore": {
          "competitorGap": [
            "Lovable and Bolt produce web-only output (React + Tailwind). Dreamflow generates Flutter (single rendering engine, not native controls). Vibecode generates React Native (bridge-based, not fully native). Builder.io generates web framework code.",
            "The 'looks like a web wrapper' problem persists across all competitors. Platform-specific design patterns (Fluent on Windows, Material on Android, Cupertino on iOS) are not respected by default."
          ],
          "opportunityForUno": [
            "Uno Platform's WinUI/XAML controls render natively on each platform. Studio Live can generate apps that look and feel native everywhere — not web wrappers, not cross-platform compromises.",
            "Leverage platform-specific theming: Fluent on Windows, Material on Android, Cupertino on iOS — applied automatically based on target platform."
          ],
          "whyItMatters": [
            "Users notice when an app doesn't feel native. Non-native UI reduces engagement, increases uninstall rates, and signals 'amateur' to enterprise buyers.",
            "This is the classic Flutter/React Native criticism. Uno can make the AI builder the first to solve it."
          ]
        }
      },
      {
        "id": "dotnet-ecosystem-integration",
        "headline": ".NET ecosystem integration as a strategic moat",
        "summary": "No competitor leverages an existing enterprise ecosystem. They all create isolated projects. Uno projects are .NET solutions that integrate immediately with the enterprise stack.",
        "readMore": {
          "competitorGap": [
            "Lovable, Bolt, and Vibecode create standalone JavaScript/TypeScript projects with no connection to enterprise infrastructure. Dreamflow creates Flutter/Dart projects.",
            "None integrate with NuGet package management, Azure DevOps, MSAL authentication, or enterprise CI/CD pipelines out of the box."
          ],
          "opportunityForUno": [
            "Studio Live projects are standard .NET solutions that integrate with NuGet, Azure DevOps, existing CI/CD, enterprise authentication (MSAL), and thousands of .NET libraries.",
            "The generated app isn't a prototype — it's immediately deployable within the enterprise stack. No rewrite needed to 'make it production-ready.'"
          ],
          "whyItMatters": [
            "Enterprise adoption requires stack compatibility. A tool that generates code incompatible with existing infrastructure creates migration costs that kill adoption.",
            "The .NET ecosystem has 12M+ developers and deep enterprise penetration. This is a ready-made market that no other AI builder serves."
          ]
        }
      },
      {
        "id": "codebase-convention-learning",
        "headline": "AI that learns your codebase conventions",
        "summary": "Persistent memory exists in competitors but is shallow — 'remember my tokens,' not 'understand our architecture.' Uno can go deeper.",
        "readMore": {
          "competitorGap": [
            "Lovable's Custom Knowledge and Bolt's Project Knowledge store simple rules and preferences. Builder's .mdc rules are configuration files. None analyze the existing codebase to learn patterns.",
            "New pages/features generated by AI frequently diverge from established project conventions (naming, structure, navigation patterns, service patterns) — requiring manual correction."
          ],
          "opportunityForUno": [
            "Studio Live can analyze an existing Uno app and learn its patterns: naming conventions, page structure, MVVM service patterns, navigation style, resource dictionary organization.",
            "New pages and features generated by the agent automatically follow the same conventions — reducing review friction and maintaining consistency over time."
          ],
          "whyItMatters": [
            "Convention drift is the #1 source of tech debt in AI-assisted codebases. Preventing it at generation time is orders of magnitude cheaper than fixing it later.",
            "Teams adopting AI tools need confidence that generated code will 'fit in' — not require constant cleanup."
          ]
        }
      }
    ],
    "closingCallout": {
      "headline": "Key takeaway for scope",
      "text": "If Studio Live only copies the 'prompt → generate' loop, it competes on commodity ground. The biggest opportunity is to become the control plane for AI-driven UI evolution: understanding, constraints, evaluation, and trust."
    }
  },
  "matrices": {
    "matrix3_featureCentric_v2": {
      "title": "Matrix 3 v2 — Feature-centric comparison (strict)",
      "legend": {
        "YES": "✅ Docs (explicit)",
        "LIMITED": "⚠️ Docs (explicit but limited / constrained)",
        "NO": "❌ Not documented / not supported"
      },
      "sections": [
        {
          "id": "github_collab",
          "headline": "A. GITHUB",
          "name": "A. GitHub & collaboration model",
          "features": [
            {
              "id": "gh_native",
              "name": "GitHub native integration",
              "whyItMatters": "Baseline: whether the product offers first-class GitHub integration.",
              "unoOpportunity": "Ensure Studio Live has a clear auth + repo connect story aligned with team workflows.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Built-in Source Control panel. Connect via repo HTTPS URL + Personal Access Token (PAT). Once connected, Dreamflow tracks file changes and supports common Git operations inside the UI (branching, committing/pushing, pulling/merging, conflict resolution, disconnect).", "links": ["https://docs.dreamflow.com/integrations/git"], "screenshots": ["dreamflow-github-native-integration.png"] },
                "lovable": { "status": "YES", "note": "GitHub becomes the single source of truth once connected. Two-way sync is supported: edits in Lovable appear in GitHub, and edits in GitHub appear back in Lovable. Connection depends on stable repo path (org/account/repo name).", "links": ["https://docs.lovable.dev/integrations/github"] },
                "vibecode": { "status": "NO", "note": "No native GitHub integration documented; export/SSH workflow instead.", "links": ["https://vibecodeapp.mintlify.app/features/export-ssh"] },
                "builder": { "status": "YES", "note": "Repo-connected workflow designed around pull requests. Changes are packaged and submitted as PRs from inside the product (Send PR), reviewed in a Pull requests tab, and further edits can be requested by commenting on the PR and tagging @builderio-bot.", "links": ["https://www.builder.io/c/docs/projects-git-providers"], "screenshots": ["builder-github-native-integration-1.png", "builder-github-native-integration-2.png", "builder-github-native-integration-3.png"] },
                "bolt": { "status": "YES", "note": "GitHub integration with frequent auto-commits and regular fetch. Bolt creates a commit whenever a change 'doesn't break the project', and checks GitHub periodically (docs mention every 30 seconds) to pull in external updates.", "links": ["https://support.bolt.new/integrations/git"], "screenshots": ["bolt-github-native-integration.png"] },
                "tempo": { "status": "YES", "note": "Built-in GitHub integration. Connect via GitHub App (personal accounts only — organization repos not yet supported). Supports creating repos, branches, committing, pushing, and pulling. Two-way sync between Tempo canvas and GitHub.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"] }
              }
            },
            {
              "id": "import_repo",
              "name": "Import existing repo",
              "whyItMatters": "Whether you can bring an existing codebase into the tool.",
              "unoOpportunity": "Import matters for real teams; supporting it increases enterprise credibility.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Supports importing existing Flutter repos via 'Clone Codebase'. Limitations include Flutter-only (non-Flutter/monorepo may fail), and projects that require local servers/background processes or private dependencies may fail. Codegen scripts can't be executed inside Dreamflow; generated files must be produced externally and committed.", "links": ["https://docs.dreamflow.com/integrations/git"], "screenshots": ["dreamflow-import-existing-repo.png"] },
                "lovable": { "status": "NO", "note": "Lovable FAQ: importing existing repos is not supported.", "links": ["https://docs.lovable.dev/integrations/github"] },
                "vibecode": { "status": "NO", "note": "Not documented.", "links": ["https://vibecodeapp.mintlify.app/docs"] },
                "builder": { "status": "YES", "note": "Connects to existing repositories as the basis for Projects. Intended for working against real codebases with PR-based delivery to the repo (not an export-only model).", "links": ["https://www.builder.io/c/docs/projects-git-providers"], "screenshots": ["builder-import-existing-repo.png"] },
                "bolt": { "status": "YES", "note": "Docs explicitly include an 'Import an existing repository' flow as part of the GitHub integration. Bolt then syncs via commits/fetch (rather than PR creation inside the tool).", "links": ["https://support.bolt.new/integrations/git"] },
                "tempo": { "status": "LIMITED", "note": "Personal GitHub accounts only. Can push to existing repos. Organization/team repos not supported. No documented 'import existing codebase' flow — projects start from Tempo's canvas or Figma import.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"], "screenshots": ["tempo-import-existing-repo-1.png"] }
              }
            },
            {
              "id": "create_repo",
              "name": "Create new repo",
              "whyItMatters": "Whether the tool can publish a project into a new GitHub repo.",
              "unoOpportunity": "Fast start for new projects; must be compatible with org/team needs.",
              "cells": {
                "dreamflow": { "status": "LIMITED", "note": "Connecting an existing Dreamflow project to Git requires a 'new blank repository' (repo must be blank or only contain README/LICENSE). Practically, repo creation happens on the Git provider side first, then you connect it in Dreamflow.", "links": ["https://docs.dreamflow.com/integrations/git"], "screenshots": ["dreamflow-create-new-repo.png"] },
                "lovable": { "status": "YES", "note": "Connect flow creates a repo in chosen org.", "links": ["https://docs.lovable.dev/integrations/github"] },
                "vibecode": { "status": "NO", "note": "Not documented.", "links": ["https://vibecodeapp.mintlify.app/docs"] },
                "builder": { "status": "LIMITED", "note": "Repo creation implied but not explicit in our cited docs.", "links": ["https://www.builder.io/c/docs/projects-git-providers"] },
                "bolt": { "status": "YES", "note": "GitHub integration supports creating a new repo from a Bolt project (documented as part of the integration's workflows).", "links": ["https://support.bolt.new/integrations/git"], "screenshots": ["bolt-create-new-repo.png"] },
                "tempo": { "status": "YES", "note": "Can create a new GitHub repo directly from a Tempo project via the GitHub integration panel.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"], "screenshots": ["tempo-create-new-repo-1.png", "tempo-create-new-repo-2.png"] }
              }
            },
            {
              "id": "branching",
              "name": "Branching",
              "whyItMatters": "Branching is required for safe collaboration and parallel changes.",
              "unoOpportunity": "Branching + PR-native workflows should be default for team mode.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Branching is supported directly in the Source Control panel: create a branch, switch branches, and refresh branch list. Dreamflow can also pull changes and merge commits from the remote branch.", "links": ["https://docs.dreamflow.com/integrations/git"], "screenshots": ["dreamflow-branching.png"] },
                "lovable": { "status": "LIMITED", "note": "Branch switching is Labs/experimental.", "links": ["https://docs.lovable.dev/features/labs"] },
                "vibecode": { "status": "NO", "note": "Not documented.", "links": ["https://vibecodeapp.mintlify.app/docs"] },
                "builder": { "status": "YES", "note": "Full branch management in Projects: create, rename, delete, and share branches. Commit Mode must be set to Pull Requests or Draft Pull Requests to enable branching. When a branch is merged, Builder automatically deletes it. Each new branch is a fresh clone of the main branch.", "links": ["https://www.builder.io/c/docs/projects-git-providers#branches"] },
                "bolt": { "status": "YES", "note": "Branch switching is supported as part of GitHub integration. Merge is not described as an in-app operation (workflow expects merging in GitHub).", "links": ["https://support.bolt.new/integrations/git"], "screenshots": ["bolt-branching.png"] },
                "tempo": { "status": "YES", "note": "Supports creating and switching branches within the GitHub integration panel. Branches can be created, committed to, and pushed.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"], "screenshots": ["tempo-branching.png"] }
              }
            },
            {
              "id": "pr_creation",
              "name": "Push PRs",
              "whyItMatters": "Push/commit is the basic unit of saving changes to a repository.",
              "unoOpportunity": "Ensure smooth git push workflow with clear commit messages.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Supports committing and pushing changes directly through Source Control panel.", "links": ["https://docs.dreamflow.com/integrations/git"], "screenshots": ["dreamflow-push-prs.png"] },
                "lovable": { "status": "LIMITED", "note": "Auto-commits and syncs code to GitHub, but pull requests are created in GitHub, not inside Lovable. The GitHub integration page lists PRs, branches, and code reviews as GitHub collaboration benefits you get after connecting — not in-platform features.", "links": ["https://docs.lovable.dev/integrations/github"] },
                "vibecode": { "status": "NO", "note": "Not documented. Vibecode documentation makes no mention of GitHub integration or any Git-based workflows.", "links": ["https://www.vibecodeapp.com/docs"] },
                "builder": { "status": "YES", "note": "Changes are committed and pushed as part of PR workflow.", "links": ["https://www.builder.io/c/docs/projects-git-providers#create-a-pull-request"] },
                "bolt": { "status": "NO", "note": "Pull requests are not supported within Bolt.new and must be created in GitHub.", "links": ["https://support.bolt.new/integrations/git"] },
                "tempo": { "status": "YES", "note": "Supports committing and pushing directly from Tempo's GitHub panel. PR creation is documented as part of the GitHub workflow.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"] }
              }
            },
            {
              "id": "merge_in_product",
              "name": "Merging",
              "whyItMatters": "Merging is typically done in GitHub for governance; in-tool merge can be risky.",
              "unoOpportunity": "Keep merge in GitHub in team mode; consider safe merge options later.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Supports merging via pull operation - fetches and merges commits from remote branch.", "links": ["https://docs.dreamflow.com/integrations/git"], "screenshots": ["dreamflow-merging.png"] },
                "lovable": { "status": "LIMITED", "note": "Branch switching is available (Labs feature), enabling work on feature branches in Lovable, but merging is done in GitHub — no in-tool merge UI or operation.", "links": ["https://docs.lovable.dev/features/labs#github-branch-switching"] },
                "vibecode": { "status": "NO", "note": "Not documented.", "links": ["https://vibecodeapp.mintlify.app/docs"] },
                "builder": { "status": "NO", "note": "Workflow merges in Git provider.", "links": ["https://www.builder.io/c/docs/gitlab-self-hosted"] },
                "bolt": { "status": "NO", "note": "Not supported in-app. Must merge branches in GitHub.", "links": ["https://support.bolt.new/integrations/git"] },
                "tempo": { "status": "NO", "note": "Merging is done in GitHub. Tempo supports commit/push/pull but not in-product merge.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"] }
              }
            }
          ]
        },
        {
          "id": "prompt_scope",
          "name": "B. Prompt context & AI reasoning scope",
          "features": [
            {
              "id": "codebase_aware_prompting",
              "name": "Codebase-aware prompting",
              "whyItMatters": "Agent can reason over and change the actual project files/code.",
              "unoOpportunity": "Ensure Studio Live reasoning is XAML + .NET aware, not generic file editing.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Agent operates over project workspace.", "links": ["https://docs.dreamflow.com/workspace"], "screenshots": ["dreamflow-codebase-aware-prompting.png"] },
                "lovable": { "status": "YES", "note": "App iteration + debugging guidance documented.", "links": ["https://docs.lovable.dev/tips-tricks/troubleshooting"], "screenshots": ["lovable-codebase-aware-prompting-1.png", "lovable-codebase-aware-prompting-2.png"] },
                "vibecode": { "status": "LIMITED", "note": "Prompts apply to generated project; scope not clearly defined in docs.", "links": ["https://vibecodeapp.mintlify.app/docs"] },
                "builder": { "status": "YES", "note": "Supports refining applications through prompts in Chat tab with immediate code changes.", "links": ["https://www.builder.io/c/docs/fusion-projects-from-prompts"] },
                "bolt": { "status": "YES", "note": "Prompts operate over project/files in Bolt environment.", "links": ["https://support.bolt.new/best-practices/prompting-effectively#prompt-effectively"] },
                "tempo": { "status": "YES", "note": "Reasoning Mode (Gemini + Claude) scans the full codebase for large-context analysis. Normal Mode (Claude 3.7) operates on current project context. AI iterates on the entire React + TypeScript + Tailwind + ShadCN project.", "links": ["https://tempolabsinc.mintlify.app/ChatModes"] }
              }
            },
            {
              "id": "repo_as_ai_input",
              "name": "Repo as AI input (read context)",
              "whyItMatters": "Whether you can bring an existing repo as the AI's context source.",
              "unoOpportunity": "Import + context should be first-class for real teams (monorepos, libs, etc.).",
              "cells": {
                "dreamflow": { "status": "NO", "note": "Only works with primary connected repo, not additional repos for context.", "links": ["https://docs.dreamflow.com/integrations/git"] },
                "lovable": { "status": "NO", "note": "Docs: cannot import existing repo into Lovable.", "links": ["https://docs.lovable.dev/integrations/github"] },
                "vibecode": { "status": "NO", "note": "Not documented. Vibecode documentation makes no mention of GitHub integration or any Git-based workflows.", "links": ["https://www.vibecodeapp.com/docs"] },
                "builder": { "status": "YES", "note": "Connect additional repositories to give the LLM context from other sources such as design systems or API documentation. Added via Project Settings > Workspace Settings > Add Repository.", "links": ["https://www.builder.io/c/docs/projects-git-providers#add-additional-repositories"], "screenshots": ["builder-repo-as-ai-input.png"] },
                "bolt": { "status": "NO", "note": "No native feature to mount or access a second external GitHub repository for background context — each project is tied to its own repo. Workarounds exist (open public repo via bolt.new/~/url, Product References ZIP upload, manual file upload, Chrome extension) but none provide true multi-repo context.", "links": ["https://support.bolt.new/integrations/git"] },
                "tempo": { "status": "NO", "note": "Projects are self-contained React apps. No documented feature to import an external repo as AI context. GitHub integration is for the project's own repo only.", "links": ["https://tempolabsinc.mintlify.app/Basics/Starter%20Repo%20and%20Github%20Integration"] }
              }
            },
            {
              "id": "file_component_targeting",
              "name": "File / component targeting",
              "whyItMatters": "Scope limiting reduces unintended changes and increases trust.",
              "unoOpportunity": "Uno can lead with XAML/component-scoped edits and guardrails.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Supports Inspect Mode (click widget to jump to code) and component-specific editing.", "links": ["https://www.youtube.com/watch?v=T2p23PI5B98"], "screenshots": ["dreamflow-file-component-targeting.png"] },
                "lovable": { "status": "YES", "note": "Visual edit mode lets you select elements directly in the live preview and edit them visually. The Edit button also allows selecting a specific component and prompting changes scoped to it. Multi-select supported via ⌘/Win key for batch edits.", "links": ["https://docs.lovable.dev/features/design#visual-editing", "https://docs.lovable.dev/prompting/prompting-one#10-layer-context-with-the-edit-button"], "screenshots": ["lovable-file-component-targeting-1.png", "lovable-file-component-targeting-2.png"] },
                "vibecode": { "status": "YES", "note": "Select feature allows visual component targeting: navigate to the screen containing the component, tap Select, tap the component to target it, then tap Done. The selected component becomes the scope for subsequent AI prompts. No code editor — entirely visual.", "links": ["https://youtu.be/nOldVhPug5E?si=5AErIaJ6K1ihPdtu&t=694"], "screenshots": ["vibecode-select-1.png", "vibecode-select-2.png"] },
                "builder": { "status": "YES", "note": "Codebase search allows referencing any file in the repository. Type @ in the prompt to refer a file.", "links": ["https://www.builder.io/c/docs/fusion-prompt-essentials"], "screenshots": ["builder-file-component-targeting-1.png", "builder-file-component-targeting-2.png"] },
                "bolt": { "status": "YES", "note": "In Code view, right-click files and select 'Target file' to limit Bolt to specific files.", "links": ["https://support.bolt.new/building/using-bolt/code-view"], "screenshots": ["bolt-file-component-targeting-1.png", "bolt-file-component-targeting-2.png", "bolt-file-component-targeting-3.png"] },
                "tempo": { "status": "YES", "note": "Click on any component in the visual editor to select it, then prompt AI changes scoped to that component. Supports incremental prompting where you target specific UI elements for focused edits.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "screenshots": ["tempo-file-component-targeting-1.png", "tempo-file-component-targeting-2.png", "tempo-file-component-targeting-3.png"] }
              }
            },
            {
              "id": "diff_aware_prompting",
              "name": "Diff-aware prompting",
              "whyItMatters": "Diff-aware agents are safer and produce cleaner PRs/commits.",
              "unoOpportunity": "Make diff the unit of reasoning (PR-native by default).",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Agentic edits with diffs. Supports surgical updates across AI Prompt, Visual Canvas, and Source Code with widget-aware context for targeted edits.", "links": ["https://news.ycombinator.com/item?id=45130588"] },
                "lovable": { "status": "YES", "note": "Computes diffs to update only precisely modified lines. Uses AST-based generation with Hot Module Replacement for instant updates without full-file regeneration.", "links": ["https://lovable.dev/blog/visual-edits"], "screenshots": ["lovable-diff-aware-prompting.png"] },
                "vibecode": { "status": "LIMITED", "note": "No public documentation confirming diff-aware or incremental patching behavior. Vibecode likely applies targeted updates given its component-select workflow, but the mechanism is not documented.", "links": [] },
                "builder": { "status": "YES", "note": "Re-exporting a Figma design applies changes as a code diff rather than generating new files. The AI respects and preserves code and functionality developers have already implemented. Also keeps a tree representation for fast surgical updates.", "links": ["https://www.builder.io/guide/figma-design-to-code"] },
                "bolt": { "status": "YES", "note": "Diffs feature stops Bolt from rewriting entire files during small changes. Can save millions of tokens by avoiding full-file regeneration.", "links": ["https://trickle.so/blog/bolt-new-review"] },
                "tempo": { "status": "YES", "note": "Tempo applies context-aware modifications, editing only the relevant parts of the codebase rather than regenerating entire files. The visual editor and code editor work in synergy — changes in one are reflected in the other — enabling iterative refinement. Version history allows reviewing and reverting individual changes.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/Prompting", "title": "Google AI Overview — Tempo Labs", "snippet": "Context-Aware Modifications (edits only relevant parts), Visual & Code Synergy (changes reflected bidirectionally), Iterative Refinement (build upon previous prompts), and Version History (review/revert changes)."}] }
              }
            },
            {
              "id": "persistent_prompt_memory",
              "name": "Persistent prompt memory",
              "whyItMatters": "Project-level memory can help — but also causes drift if unmanaged.",
              "unoOpportunity": "Explicit memory controls (reset, pin facts, scope memory).",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Agent Instructions provide high-level architectural patterns and library preferences that persist through the development cycle. Widget Tree maintains inherent UI structure memory.", "links": ["https://docs.dreamflow.com/workspace"] },
                "lovable": { "status": "YES", "note": "Custom Knowledge acts as a project blueprint storing design rules, functionality requirements, and technical goals. Visual Scope Selection and Dev Mode maintain state across the project.", "links": ["https://docs.lovable.dev/features/knowledge"], "screenshots": ["lovable-persistent-prompt-memory.png"] },
                "vibecode": { "status": "LIMITED", "note": "Workspace persistence: each project retains code, database config, and auth settings across sessions. Claude Code (the underlying agent) reads the full codebase at session start, preserving awareness of past architecture decisions. However, there is no dedicated 'project rules' or 'knowledge' feature for explicitly storing persistent instructions — memory is implicit via codebase context, not user-configurable.", "links": [] },
                "builder": { "status": "YES", "note": "Builder rules (.mdc files in .builder/rules/) provide persistent and reusable context since AI doesn't retain memory between sessions. Also supports Visual Editor Instructions panel and System Prompts for long-term constraints.", "links": ["https://www.builder.io/c/docs/configuration-builder-rules#what-to-know"], "screenshots": ["builder-persistent-prompt-memory.png"] },
                "bolt": { "status": "YES", "note": "Project Knowledge provides persistent background instructions for goals, style expectations, terminology, constraints, and workflow habits. Also supports Personal Settings that apply across all projects.", "links": ["https://support.bolt.new/building/using-bolt/project-settings"], "screenshots": ["bolt-persistent-prompt-memory.png"] },
                "tempo": { "status": "YES", "note": "Custom Knowledge lets you store persistent instructions, design rules, and project context that the AI references across all prompts. Acts as a project-level memory for maintaining consistency.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "screenshots": ["tempo-persistent-prompt-memory.png"] }
              }
            }
          ]
        },
        {
          "id": "visual_design_inputs",
          "name": "C. Visual & design inputs",
          "features": [
            {
              "id": "screenshot_prompt_input",
              "name": "Screenshot as prompt input",
              "whyItMatters": "Visual context helps with debugging and UI iteration.",
              "unoOpportunity": "Studio Live can tie screenshots directly to XAML controls and live preview state.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Add screenshots for design inspiration. Dreamflow Agent generates entire app structure, UI components, and functionality from text and image descriptions.", "links": ["https://docs.dreamflow.com/quickstart/"], "screenshots": ["dreamflow-screenshot-as-prompt-input.png"] },
                "lovable": { "status": "YES", "note": "Paste or drag-and-drop screenshots from Figma designs or hand-drawn sketches. Lovable converts visual designs into functional code.", "links": ["https://docs.lovable.dev/introduction/getting-started#using-a-sketch"], "screenshots": ["lovable-screenshot-as-prompt-input.png"] },
                "vibecode": { "status": "YES", "note": "Upload screenshots in AI chat to define design styles, create prototypes, and generate layouts. Screenshots alongside prompts create custom mixed designs for functional mobile apps.", "links": [], "screenshots": ["vibecode-screenshot-as-prompt-input.png"] },
                "builder": { "status": "YES", "note": "Include screenshots and images with prompts. AI uses them to understand issues or provide design inspiration for new features. Supports screenshots and PDF files.", "links": ["https://www.builder.io/c/docs/projects-best-practices"], "screenshots": ["builder-screenshot-prompt-input.png"] },
                "bolt": { "status": "YES", "note": "Upload images to inform Bolt. Add images as examples of look and feel. Supports .jpg, .jpeg, .png, .gif, .webp, .svg. Drag-and-drop or attach via chat.", "links": ["https://support.bolt.new/building/using-bolt/interacting-ai#supported-file-types"], "screenshots": ["bolt-screenshot-as-prompt-input-1.png", "bolt-screenshot-as-prompt-input-2.png", "bolt-screenshot-as-prompt-input-3.png"] },
                "tempo": { "status": "YES", "note": "Supports image prompts. Users can upload screenshots or design mockups alongside text prompts to guide AI generation. The AI uses visual context to generate matching UI components.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "screenshots": ["tempo-screenshot-prompt-input-1.png", "tempo-screenshot-prompt-input-2.png"] }
              }
            },
            {
              "id": "figma_import",
              "name": "Figma → app import",
              "whyItMatters": "Design-to-code reduces iteration cycles and handoff friction.",
              "unoOpportunity": "If pursued, anchor it to XAML + design systems (SDS/Uno Themes).",
              "cells": {
                "dreamflow": { "status": "NO", "note": "No direct Figma import. Use screenshots of Figma frames as visual context, or describe design system in prompts. Sister platform FlutterFlow has this feature, not Dreamflow.", "links": ["https://docs.dreamflow.com/workspace"] },
                "lovable": { "status": "LIMITED", "note": "Previously integrated via Builder.io Figma plugin partnership ('Export to Lovable' option). However, this integration stopped working around late 2025 and is currently non-functional. Without it, Lovable has no native Figma import — users must use screenshots of Figma frames as visual context instead.", "links": ["https://www.figma.com/community/plugin/747985167520967365/builder-io-figma-to-code-ai-apps-react-vue-tailwind-etc"], "screenshots": ["lovable-figma-app-import-1.png", "lovable-figma-app-import-2.png", "lovable-figma-app-import-3.png", "lovable-figma-app-import-4.png"] },
                "vibecode": { "status": "NO", "note": "Mobile-first builder using natural language prompts and mobile interaction. No native Figma import feature. Supports source code downloads and SSH to editors.", "links": ["https://vibecodeapp.mintlify.app/docs"] },
                "builder": { "status": "YES", "note": "Most mature integration. Dedicated Figma plugin with Visual Copilot. One-click conversion to React, Vue, Svelte, Angular, HTML. CLI maps Figma layers to existing codebase components.", "links": ["https://www.figma.com/community/plugin/747985167520967365/builder-io-figma-to-code-ai-apps-react-vue-tailwind-etc"], "screenshots": ["builder-figma-app-import-1.png", "builder-figma-app-import-2.png"] },
                "bolt": { "status": "YES", "note": "Direct Figma Frame URL imports (no plugin). Paste 'Copy link to selection' URL into chatbox. Supports mid-project imports. Converts to React/Tailwind code.", "links": ["https://www.youtube.com/watch?v=L3j9O5hrlmY"], "screenshots": ["bolt-figma-app-import-1.png", "bolt-figma-app-import-2.png", "bolt-figma-app-import-3.png", "bolt-figma-app-import-4.png"] },
                "tempo": { "status": "YES", "note": "Dedicated Figma plugin (<a href='https://www.figma.com/community/plugin/1463689183126672406/tempo-ai-powered-figma-to-code-react' target='_blank'>Tempo AI — Figma to Code</a>) that converts Figma designs into Tempo projects. Install the Figma plugin, select frames, and export to Tempo. Maintains design structure and converts to React + Tailwind + ShadCN components.", "links": ["https://tempolabsinc.mintlify.app/FigmaPlugin", "https://www.figma.com/community/plugin/1463689183126672406/tempo-ai-powered-figma-to-code-react"], "screenshots": ["tempo-figma-app-import-1.png"] }
              }
            },
            {
              "id": "runtime_preview_as_input",
              "name": "Runtime / preview state as AI input",
              "whyItMatters": "Makes the agent a debugger, not just a code generator.",
              "unoOpportunity": "Uno can lead here with Hot Design + visual tree + diagnostics as context.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Realtime Preview with AI agent assistance. Add debug outputs and monitor state changes as they happen. Keeps agent, visual canvas, and code in sync during live run session.", "links": ["https://docs.dreamflow.com/workspace"], "screenshots": ["dreamflow-runtime-preview-state-as-ai-input.png"] },
                "lovable": { "status": "YES", "note": "Vision Language Model (VLM) agents take screenshots of website to determine next action. Users add screenshots to prompts for describing bugs or UX issues the AI needs to fix.", "links": ["https://docs.lovable.dev/tips-tricks/troubleshooting"], "screenshots": ["lovable-runtime-preview-state-as-ai-input.png"] },
                "vibecode": { "status": "LIMITED", "note": "Provides live preview (standard for AI builders), but no public documentation confirming runtime state or preview screenshots fed back to AI as structured input for automated iteration.", "links": [] },
                "builder": { "status": "YES", "note": "Visual Editor exposes a live state object for AI context. AI attempts to fix runtime errors using live preview as validation. Visual Copilot 2.0 maps designs to existing code components and design tokens, debugging discrepancies between design and live implementation.", "links": ["https://www.builder.io/c/docs/projects-overview"] },
                "bolt": { "status": "YES", "note": "Built on StackBlitz WebContainers. AI automatically detects and fixes runtime errors from browser console. Discuss feature debugs projects using current project state as context.", "links": ["https://support.bolt.new/building/using-bolt/projects-files"] },
                "tempo": { "status": "LIMITED", "note": "Visual editor shows a live preview of the app. 'Fix with AI' button appears on errors — error fixes are free and do not count towards monthly credits. However, no documentation of the preview state being systematically fed back to the AI as structured context for iteration.", "links": ["https://tempolabsinc.mintlify.app/Pricing"] }
              }
            },
            {
              "id": "custom_assets",
              "name": "Custom Assets",
              "whyItMatters": "Real apps need brand-specific fonts and imagery — not just defaults. Custom asset support determines whether the tool can produce production-ready output or only generic prototypes.",
              "unoOpportunity": "Studio Live can integrate asset management with XAML resource dictionaries, font registration, and platform-specific asset pipelines across all Uno targets.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Custom fonts (.ttf, .otf, .woff) uploaded via Assets → Fonts → 'Upload Assets' button, then selected in Theme → Typography. Fonts are bundled into assets/fonts and auto-registered in pubspec.yaml on export. Custom images and SVG icons managed through the Properties Panel or AI agent prompts; stored in the project's assets/ directory and packaged with source code on export — no broken cloud links.", "links": ["https://docs.dreamflow.com/workspace/assets", "https://docs.dreamflow.com/workspace/theme"], "screenshots": ["dreamflow-custom-assets-1.png", "dreamflow-custom-assets-2.png", "dreamflow-custom-assets-3.png", "dreamflow-custom-assets-4.png"] },
                "lovable": { "status": "LIMITED", "note": "Custom Fonts: Supports Google Fonts and web-safe fonts specified by name or direct link; AI integrates via useEffect or Tailwind config. Local .ttf/.otf files can be manually uploaded to public/fonts via GitHub for bundling. Custom Assets (Images & Videos): Drag-and-drop images into chat — Lovable analyzes and places them, storing in Supabase Storage for dynamic features. For production, upload images to the connected GitHub repo's public/ folder and reference via paths like public/hero-image.jpg. Assets in public/ are included in local export; external URLs (e.g., Unsplash) remain cloud links unless manually moved. Export: GitHub Sync is the most robust method — all assets in public/ are available locally. ZIP download includes entire codebase and all project files.", "links": ["https://docs.lovable.dev/tips-tricks/custom-fonts", "https://docs.lovable.dev/features/design"] },
                "vibecode": { "status": "LIMITED", "note": "Follows a 'vibe coding' philosophy — asset management is prompt-driven rather than manual file explorer. Custom Fonts: Ask the agent to change to any Google Font (e.g., 'Change the font to Montserrat'); AI updates project config automatically. Best to specify font choice early in the vibe for consistent application across screens. Custom Assets: Adjust images/styling via 'Pinch to Build' long-press gesture for on-the-fly design customization. AI generates visual elements (icons, images) during initial build. Supabase integration available for complex asset/media storage. Export: Full source code download or SSH connection to editors like Cursor. Downloaded codebase includes assets and font configuration for local development or App Store publishing. One-click backup exports all data and uploads as a single ZIP file.", "links": [] },
                "builder": { "status": "YES", "note": "Full Asset Library with batch upload (up to 100 MB per file), folder organization, alt text, and SEO slugs. Images get automatic WebP optimization and lazy loading. Custom fonts supported through the visual editor and carried over from Figma imports.", "links": ["https://www.builder.io/c/docs/images", "https://www.builder.io/c/docs/asset-library"], "screenshots": ["builder-custom-assets-1.png", "builder-custom-assets-2.png", "builder-custom-assets-3.png", "builder-custom-assets-4.png", "builder-custom-assets-5.png", "builder-custom-assets-6.png"] },
                "bolt": { "status": "YES", "note": "Manages assets as local files within a browser-based WebContainer environment. Custom Fonts: Upload .ttf/.woff2 files to project's /public/fonts directory via file explorer, then prompt AI to apply them (generates @font-face CSS). Google Fonts supported by name — AI auto-imports into global CSS. Custom Assets: Upload via chatbox paperclip icon (images, SVGs, videos). Can explicitly instruct Bolt to save to /public/images and use as project assets. AI generates code with relative paths (e.g., &lt;img src=/images/logo.png /&gt;) treating them as local assets, not external URLs. Export: ZIP download includes all uploaded fonts and images in public/ folder. GitHub Sync commits assets as physical files to your repository, ensuring full portability independent of the Bolt platform.", "links": ["https://support.bolt.new/building/using-bolt/interacting-ai"], "screenshots": ["bolt-custom-assets-1.png", "bolt-custom-assets-2.png", "bolt-custom-assets-3.png"] },
                "tempo": { "status": "YES", "note": "Drag-and-drop visual editor supports adding images and video to projects. Docs reference uploading custom assets. ShadCN UI component library includes icons. Projects are React + Tailwind so standard web asset workflows apply (public/ directory, import statements). Assets included in GitHub push and local IDE sync.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "screenshots": ["tempo-custom-assets-1.png", "tempo-custom-assets-2.png"] }
              }
            }
          ]
        },
        {
          "id": "external_context",
          "name": "D. External context & ecosystem",
          "features": [
            {
              "id": "mcp_connectors",
              "name": "MCP / tool connectors",
              "whyItMatters": "Lets the agent access real work context (tickets, docs, roadmaps).",
              "unoOpportunity": "MCP can connect Studio Live to GitHub Issues/Projects, docs, and internal KB.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "No MCP support documented. Agent Panel provides AI assistance but has no tool connector or MCP integration. OpenAI proxy is available for adding AI features to apps, not for external tool access.", "links": ["https://docs.dreamflow.com/workspace/agent-panel"] },
                "lovable": { "status": "YES", "note": "Personal Connectors (MCP servers) for access to private tools during app creation. MCP servers documented (including custom servers + auth options).", "links": ["https://docs.lovable.dev/integrations/mcp-servers"], "screenshots": ["lovable-mcp-tool-connectors.png"] },
                "vibecode": { "status": "LIMITED", "note": "No official built-in MCP client documented. Users can export projects to Cursor, which natively supports MCP.", "links": [] },
                "builder": { "status": "YES", "note": "Native support for connecting custom MCP servers to query application-specific databases. Fusion Integrations for developers.", "links": ["https://www.builder.io/c/docs/fusion-integrations-for-developers"], "screenshots": ["builder-mcp-tool-connectors-1.png", "builder-mcp-tool-connectors-2.png", "builder-mcp-tool-connectors-3.png"] },
                "bolt": { "status": "NO", "note": "Not documented.", "links": ["https://support.bolt.new/building/using-bolt/projects-files"] },
                "tempo": { "status": "YES", "note": "Tempo supports MCP (Model Context Protocol) server connections, allowing the AI agent to access external tools and data sources during development. Configurable through project settings.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "screenshots": ["tempo-mcp-tool-connectors-1.png", "tempo-mcp-tool-connectors-2.png"] }
              }
            },
            {
              "id": "telemetry_as_context",
              "name": "Telemetry / analytics as AI input",
              "whyItMatters": "Lets the agent prioritize impact and detect regressions.",
              "unoOpportunity": "Uno can lead by combining Studio Live with telemetry and diagnostics.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "No documentation of telemetry or analytics being used as AI input. Dreamflow docs describe workspace panels, agent chat, and debugging tools but no analytics dashboards or user behavior tracking fed back to the AI.", "links": ["https://docs.dreamflow.com/workspace"] },
                "lovable": { "status": "LIMITED", "note": "Provides usage analytics for SaaS dashboards and generates live analytics for apps. AI input focuses on natural language feedback or external tools (n8n) rather than automated telemetry-to-code loop.", "links": ["https://docs.lovable.dev/integrations/mcp-servers"] },
                "vibecode": { "status": "NO", "note": "No public documentation indicating telemetry or analytics used as direct input for AI generation engine.", "links": [] },
                "builder": { "status": "YES", "note": "Data sources including analytics APIs can be connected to Visual Editor AI for data-driven generation. Smart Targeting uses behavioral insights for content personalization. API endpoints can be passed to AI for prototyping based on performance metrics.", "links": ["https://www.builder.io/c/docs/advanced-settings#what-to-know"] },
                "bolt": { "status": "LIMITED", "note": "Built-in analytics on paid plans track traffic, top pages, 404 errors. AI helps embed third-party tracking code but doesn't automatically ingest metrics to propose code changes.", "links": ["https://support.bolt.new/cloud/hosting/analytics"] },
                "tempo": { "status": "NO", "note": "No documentation of telemetry or analytics being used as AI input. Tempo is focused on UI building, not analytics-driven iteration.", "links": [] }
              }
            }
          ]
        },
        {
          "id": "backend_data_secrets",
          "name": "E. Backend, data & secrets",
          "features": [
            {
              "id": "opinionated_backend",
              "name": "Backend integration (auth + data)",
              "whyItMatters": "Speeds up shipping real apps with auth/data. OAuth enables secure connections without pasting secrets.",
              "unoOpportunity": "Optional: integrate common backends or provide templates; first-class OAuth where possible.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Deep native Supabase/Firebase support. Auto-generates client setup, schema updates, and OAuth login pages (OAuth 2.0 authorization code grant flow).", "links": ["https://docs.dreamflow.com/integrations/supabase/", "https://docs.dreamflow.com/integrations/firebase/"], "screenshots": ["dreamflow-backend-integration-1.png", "dreamflow-backend-integration-2.png", "dreamflow-backend-integration-3.png"] },
                "lovable": { "status": "YES", "note": "Supabase-native (powers Lovable Cloud). AI auto-generates database tables, Auth flows (one-click Google/GitHub OAuth), and Edge Functions via chat. Auto-handles callback URLs and token management.", "links": ["https://docs.lovable.dev/integrations/supabase", "https://docs.lovable.dev/features/google-auth"], "screenshots": ["lovable-backend-integration-1.png", "lovable-backend-integration-2.png", "lovable-backend-integration-3.png", "lovable-backend-integration-4.png", "lovable-backend-integration-5.png", "lovable-backend-integration-6.png"] },
                "vibecode": { "status": "LIMITED", "note": "No native Auth/DB support — adding login risks locking yourself out since there is no database functionality yet. Third-party APIs can be added, and Vibecode Cloud (beta) enables authentication by prompting the AI to integrate it.", "links": ["https://www.vibecodeapp.com/docs/faq/data-integrations"] },
                "builder": { "status": "YES", "note": "Integration-agnostic. Supabase MCP server + Firebase Studio partnership. Enterprise SSO (OIDC, SAML 2.0). Bridges backend data and authenticated sessions into visual editor.", "links": ["https://www.builder.io/c/docs/fusion-connect-to-supabase", "https://www.builder.io/c/docs/sso-general", "https://firebase.blog/posts/2025/09/firebase-studio-builder-io-design-development/"], "screenshots": ["builder-backend-integration-1.png", "builder-backend-integration-2.png"] },
                "bolt": { "status": "YES", "note": "Provider-agnostic with Bolt Database for new projects. Dedicated Auth module (Google SSO, GitHub login). Auto-configures Supabase Auth for OAuth flows and user sessions. bolt.diy has structured Supabase paths.", "links": ["https://support.bolt.new/integrations/supabase", "https://support.bolt.new/integrations/google-sso"] },
                "tempo": { "status": "YES", "note": "Supabase integration via 'Connect to Supabase' button in the Tempo interface for database and backend services. Clerk auth integration is also documented with step-by-step setup (env vars, sign-in/sign-up components). Supports connecting backend data sources to React projects.", "links": ["https://tempolabsinc.mintlify.app/Guides/ClerkAuth"], "screenshots": ["tempo-backend-integration-1.png", "tempo-backend-integration-2.png"] }
              }
            },
            {
              "id": "db_state_as_context",
              "name": "DB state usable by AI",
              "whyItMatters": "Lets the agent reason about real data, schemas, and migrations safely.",
              "unoOpportunity": "If pursued: schema-aware suggestions + migration PRs; avoid direct DB mutation.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Agent can generate database.types.ts from connected Supabase schema on demand. Deep Supabase/Firebase integration with auto-generated client setup and schema updates. Types must be manually regenerated when schema changes.", "links": ["https://docs.dreamflow.com/integrations/supabase/#generate-types-from-database-schema"] },
                "lovable": { "status": "YES", "note": "Schema-Aware Generation. Tight Supabase integration maintains constant awareness of existing PostgreSQL tables and types. AI inspects tables to ensure new features correctly reference column names and foreign key relationships.", "links": ["https://docs.lovable.dev/integrations/supabase"] },
                "vibecode": { "status": "NO", "note": "No backend data connection yet. FAQ states connecting a project to a backend to store data is 'a feature that is coming very soon.'", "links": ["https://www.vibecodeapp.com/docs/faq/data-integrations"] },
                "builder": { "status": "YES", "note": "Native Connectivity. Data Connectors and Supabase MCP Server allow AI to directly inspect live data and schemas. Visual Copilot maps UI components to actual database fields in real-time.", "links": ["https://www.builder.io/c/docs/fusion-connect-to-supabase"] },
                "bolt": { "status": "LIMITED", "note": "Session-Based Context. Standard web version has limited visibility into external databases unless schema explicitly shared in chat. bolt.diy fork supports MCP server configs to query local/remote database metadata.", "links": ["https://support.bolt.new/integrations/supabase"] },
                "tempo": { "status": "YES", "note": "Full-stack AI platform with native Supabase integration. Schema-aware AI can generate SQL scripts, create tables, and map data to React components via natural language prompts. Generates API calls, data types, and Edge Functions for backend logic including auth, payments (Stripe/Polar), and CRUD operations. Supports Row-Level Security, authentication tables, and user provisioning workflows.", "links": ["https://tempolabsinc.mintlify.app/Guides/ClerkAuth"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "DB Schema Awareness: Tempo's AI is schema-aware. Use natural language prompts to generate SQL scripts, create new tables, and map data directly to React components. Full-Stack Code Generation: generates API calls, data types, and Edge Functions for authentication, payment processing (Stripe/Polar), and database CRUD operations."}] }
              }
            },
            {
              "id": "secrets_handling_documented",
              "name": "Secrets",
              "whyItMatters": "Key for trust and enterprise adoption.",
              "unoOpportunity": "Make secret boundaries explicit; audit trails for any secret exposure to AI.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Variable-Based Context. Manages secrets via Environment Variable configuration. AI references variables (Stripe, SendGrid) using .env syntax. AI knows secret exists without plain-text in prompts.", "links": ["https://docs.dreamflow.com/integrations/supabase/#2-add-required-secrets"], "screenshots": ["dreamflow-secrets.png"] },
                "lovable": { "status": "YES", "note": "Integrated Secret Management. Dedicated Secrets and Environment Variables section in project settings. Manages Supabase service role keys and API keys (Stripe) securely. AI references by name, actual values hidden from frontend.", "links": ["https://docs.lovable.dev/integrations/cloud"], "screenshots": ["lovable-secrets.png"] },
                "vibecode": { "status": "YES", "note": "Environment variables managed through deployment settings. After deployment, view and edit env vars to rotate API keys, add integrations, or fix misconfigured secrets.", "links": ["https://www.vibecodeapp.com/docs/deployments/guide#step-3-configure-environment-variables"] },
                "builder": { "status": "YES", "note": "Private Keys managed via Space Settings with Admin permissions. Private API Keys provide server-side write access and private content access. Keys can be created/revoked per Space or Organization.", "links": ["https://www.builder.io/c/docs/using-your-api-key#prerequisites"] },
                "bolt": { "status": "YES", "note": "Client-Side Secrets. Uses .env file in WebContainer environment. Environmental Variables in project settings UI inject secrets during build/runtime without hardcoding into chat history or public forks.", "links": ["https://support.bolt.new/concepts/intro-databases#understanding-environment-variables"] },
                "tempo": { "status": "YES", "note": "Supports environment variables for managing secrets and API keys. Env vars can be added directly in the Tempo interface for integrations like Clerk auth (VITE_CLERK_PUBLISHABLE_KEY), Supabase, Stripe, and other services. Values are injected at build/runtime without hardcoding into prompts.", "links": ["https://tempolabsinc.mintlify.app/Guides/ClerkAuth"], "screenshots": ["tempo-secrets.png"] }
              }
            }
          ]
        },
        {
          "id": "safety_authority",
          "name": "F. Safety, validation & execution authority",
          "features": [
            {
              "id": "validation_before_apply",
              "name": "Validation before apply",
              "whyItMatters": "Prevents committing broken states; increases reliability.",
              "unoOpportunity": "Combine compile/build checks + UI sanity checks + PR workflow in team mode.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Project Rules (AGENTS.md) loaded into agent context on every generation ensure code follows architecture patterns, coding standards, and testing conventions. Rules are applied to every agent action. Restore Checkpoint provides rollback if changes are wrong.", "links": ["https://docs.dreamflow.com/workspace/agent-panel/#project-rules"] },
                "lovable": { "status": "YES", "note": "Visual & Logic Verification. Browser Testing agent runs app in virtual browser to verify changes. Pre-deployment checks ensure code doesn't break existing Supabase schemas or frontend logic.", "links": ["https://docs.lovable.dev/features/testing"] },
                "vibecode": { "status": "LIMITED", "note": "Manual Verification. Relies on user to preview app in live canvas. Optimized for speed and 'vibing,' lacks automated unit testing or rigorous validation gates found in enterprise tools.", "links": [] },
                "builder": { "status": "YES", "note": "Model Validation Hooks (custom JS) block publishing if conditions aren't met. Fusion AI runs type checking, formatting, and testing on modified files. Plan Mode reviews implementation proposals before code is written. PR workflow integrates with CI/CD. Live Preview for real-time testing.", "links": ["https://www.builder.io/c/docs/validation-hooks"] },
                "bolt": { "status": "YES", "note": "Runtime Error Detection. Runs code in WebContainer as real-time validation gate. Terminal logs failures, AI automatically offers to fix errors before continuing. Creates commits only when changes don't break the project.", "links": ["https://support.bolt.new/integrations/git"] },
                "tempo": { "status": "LIMITED", "note": "'Fix with AI' button appears when errors are detected in the preview. Error fixes are free and do not count towards monthly credits. However, this is reactive error fixing, not pre-commit validation or automated testing.", "links": ["https://tempolabsinc.mintlify.app/Pricing"] }
              }
            },
            {
              "id": "auto_rollback",
              "name": "Auto-rollback on failure",
              "whyItMatters": "Critical for higher autonomy; not common yet.",
              "unoOpportunity": "Offer safe rollback plans (revert commits / PR revert) rather than silent auto-rollbacks.",
              "cells": {
                "dreamflow": { "status": "LIMITED", "note": "Restore Checkpoint rolls project back to exact state before any agent prompt. Includes all agent changes and manual edits after that point. Undo/Redo in top bar for quick reversals. Manual rollback only — no automatic failure detection rollback.", "links": ["https://docs.dreamflow.com/workspace/agent-panel/#restore-checkpoint"], "screenshots": ["dreamflow-auto-rollback-on-failure.png"] },
                "lovable": { "status": "LIMITED", "note": "Native Git Integration. Creates commits when AI makes changes. Operates primarily on main/active branch, manual Git branching possible in connected repo. No automatic rollback on detected failures.", "links": ["https://docs.lovable.dev/integrations/github"] },
                "vibecode": { "status": "LIMITED", "note": "Deployment History allows viewing all past deployments, rolling back to previous versions if something goes wrong, and tracking changes over time. Manual rollback only — no automatic failure detection rollback.", "links": ["https://vibecodeapp.mintlify.app/deployments/guide#deployment-history"] },
                "builder": { "status": "NO", "note": "No auto-rollback. Version history allows restoring previous content versions manually. GitHub integration provides Git-based rollback externally.", "links": ["https://www.builder.io/c/docs/history"] },
                "bolt": { "status": "LIMITED", "note": "Manual/Export-based. Single-session WebContainer with Push to GitHub. No built-in UI for managing multiple Git branches. Users push to GitHub and create branches externally. No automatic rollback.", "links": ["https://support.bolt.new/integrations/git"] },
                "tempo": { "status": "NO", "note": "No automated rollback on failure detection. Ctrl+Z reverts recent AI changes manually. Git-based rollbacks available via GitHub integration (revert to previous commit and redeploy). Preview environments allow verifying code before committing to production. Supabase migrations use transactional safety to prevent partial schema updates. All rollback mechanisms are manual, not automated.", "links": ["https://tempolabsinc.mintlify.app/Prompting"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "Tempo Labs does not feature fully automated production auto-rollback. Provides manual mechanisms: version reversion (Ctrl+Z), Git-based rollbacks via GitHub integration, Supabase transactional safety for schema migrations, and preview environments for pre-production verification."}] }
              }
            }
          ]
        },
        {
          "id": "mobile_target_stack",
          "name": "G. Mobile",
          "features": [
            {
              "id": "explicit_mobile_target",
              "name": "Explicit mobile app target",
              "whyItMatters": "Is 'create a mobile app' a first-class path in the product, or does mobile only happen incidentally via responsive web?",
              "unoOpportunity": "Studio Live's Uno Platform foundation makes native mobile a core output — not an afterthought or bolt-on.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Mobile is the primary target. Dreamflow is built by FlutterFlow and generates Flutter apps by default. Project templates are described as working 'seamlessly across mobile, tablet, and web platforms.' The quickstart flow creates a mobile-first app.", "links": ["https://docs.dreamflow.com/quickstart/", "https://dreamflow.app/"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://dreamflow.app/", "title": "Dreamflow — Official Website", "snippet": "\"Build for any screen. Build robust, responsive apps that fit every device size, powered by Flutter. Deploy to App Store, Play Store & Web with a few clicks.\""}], "screenshots": ["dreamflow-explicit-mobile-app-target.png"] },
                "lovable": { "status": "NO", "note": "Web-only. Lovable FAQ explicitly states: 'No, Lovable is focused on web applications, but you can design mobile-friendly web apps.' No native mobile app creation path.", "links": ["https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development", "title": "FAQ — Lovable Docs", "snippet": "\"Does Lovable support mobile app development? No, Lovable is focused on web applications, but you can design mobile-friendly web apps.\""}] },
                "vibecode": { "status": "YES", "note": "Mobile-native is the core promise. The tagline is 'Create native apps in seconds with AI.' The Vibecode app itself runs on iOS and lets you build native mobile apps from your phone. Also has a web interface for building.", "links": ["https://www.vibecodeapp.com/"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.vibecodeapp.com/", "title": "Vibecode — Official Website", "snippet": "\"Create native apps in seconds with AI.\""}] },
                "builder": { "status": "YES", "note": "Dedicated mobile app platform with SDKs for React Native, Swift, and Kotlin. Visual drag-and-drop editing using registered native components. Content-as-Data headless CMS for structured mobile content. Cross-platform: iOS, Android, web.", "links": ["https://www.builder.io/m/mobile-apps"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.builder.io/m/mobile-apps", "title": "Mobile Apps — Builder.io", "snippet": "Ship mobile app experiences faster. Builder SDKs for React Native, Swift, or Kotlin apps keep your code clean and performant when you register native components from your design system in the Builder Visual Editor. Centralize content across your organization so anyone can instantly create, iterate, and share content updates across iOS, Android, web, or any other mobile platform."}] },
                "bolt": { "status": "LIMITED", "note": "Possible but not default. If you include 'mobile app' in your first prompt, Bolt generates an Expo-compatible project. Otherwise it creates a web app. Docs state: 'By mentioning mobile app in your very first prompt, you'll set up the right foundation from the beginning.'", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"If you know you want your project to be a mobile app, it's important to say so right from the start. Projects created for web do not easily switch over to mobile. By mentioning mobile app in your very first prompt, you'll set up the right foundation from the beginning.\""}] },
                "tempo": { "status": "YES", "note": "Native mobile app target via Expo and React Native integration. Select Expo as framework during project creation to generate React Native code. QR code preview with Expo Go for real-device testing. AI understands mobile patterns (navigation stacks, tab bars, gestures) when Expo target is active. Compiles to true native code for iOS and Android. Deployment to App Store requires EAS or external tools like Natively.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "Tempo Labs has an explicit mobile app target through native Expo and React Native integration. Framework selection at project creation, QR code real-device previews via Expo Go, mobile-specific AI logic for navigation stacks/tab bars/gestures, and true native code compilation for iOS and Android."}] }
              }
            },
            {
              "id": "mobile_framework",
              "name": "Mobile framework",
              "whyItMatters": "The underlying native framework determines capabilities, performance, ecosystem access, and long-term maintainability.",
              "unoOpportunity": "Uno Platform generates native apps via C#/XAML across iOS, Android, Web, and Desktop — a unique breadth story.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Flutter (Dart). All generated code is Flutter/Dart. Leverages the Flutter ecosystem for native iOS and Android rendering with a single codebase. The Flutter SDK is auto-downloaded by the Local Run companion app.", "links": ["https://docs.dreamflow.com/quickstart/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/quickstart/", "title": "Quickstart — Dreamflow Docs", "snippet": "\"When you create a project from scratch, you'll begin with Flutter's classic counter app template.\""}] },
                "lovable": { "status": "NO", "note": "No mobile framework. Generates React + Tailwind CSS + Vite web applications only. No native mobile framework or output.", "links": ["https://docs.lovable.dev/introduction/faq#what-tech-stacks-does-lovable-know"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#what-tech-stacks-does-lovable-know", "title": "FAQ — Lovable Docs", "snippet": "\"What tech stacks does Lovable know? Lovable builds front-end using React, Tailwind & Vite, and can connect to OpenAPI backends.\""}] },
                "vibecode": { "status": "YES", "note": "React Native + Expo. Documentation references React Native components and Expo's build service (EAS). Uses native iOS libraries like react-native-bottom-tabs, @gorhom/bottom-sheet, and @react-native-community/datetimepicker.", "links": ["https://vibecodeapp.mintlify.app/prompting/native-ui-components", "https://vibecodeapp.mintlify.app/introduction/deploy-app-store"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/prompting/native-ui-components", "title": "Native iOS UI Components — Vibecode Docs", "snippet": "\"Use react-native-bottom-tabs and @bottom-tabs/react-navigation package to implement Native bottom tabs.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/introduction/deploy-app-store", "title": "Deploy to App Store — Vibecode Docs", "snippet": "\"Vibecode uses Expo to build and deploy your app. Expo gives you 20 free builds per month.\""}] },
                "builder": { "status": "LIMITED", "note": "React Native, Swift, SwiftUI, and Kotlin via Native Mobile SDKs for CMS content delivery and drag-and-drop visual editing. However, Fusion (AI code generation) targets web frameworks only (React, Next.js, Vue, Svelte, Angular). Mobile framework support comes from the CMS/SDK side, not AI-generated code.", "links": ["https://www.builder.io/blog/native-mobile-sdks"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.builder.io/blog/native-mobile-sdks", "title": "Introducing Native Mobile SDKs — Builder.io Blog", "snippet": "Builder is adding Native Mobile SDKs to the Builder headless CMS. Teams who code native apps in Swift, SwiftUI, and Kotlin now have the same drag-and-drop visual editing functionality as teams building for the web or cross-platform mobile apps using React Native. Developers can register custom Swift, SwiftUI, and Kotlin components with Builder so anyone can create experiences by dragging and dropping custom components."}] },
                "bolt": { "status": "LIMITED", "note": "Expo (React Native) when explicitly requested. By default Bolt creates web projects. When a mobile app is requested, it generates Expo-compatible React Native code. The framework choice depends on the initial prompt.", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"Expo is a platform that lets you build mobile apps for both iPhone and Android using the same code. When you ask Bolt to create a mobile app, it automatically uses Expo to make your app work on multiple platforms.\""}] },
                "tempo": { "status": "LIMITED", "note": "Expo (React Native) when selected at project creation. Generates React Native code with mobile-aware AI (navigation stacks, tab bars, gestures). QR code preview via Expo Go on physical devices. However, final App Store/Play Store deployment requires exporting to GitHub and building with EAS or external tools like Natively — Tempo does not handle native builds or store submission directly.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "Tempo generates React Native code via Expo framework. Preview via Expo Go QR code on physical devices. Final deployment requires exporting to GitHub and using EAS to build .ipa/.apk files. Does not handle App Store submission directly."}] }
              }
            },
            {
              "id": "on_device_testing",
              "name": "On-device testing (physical + emulator)",
              "whyItMatters": "Mobile apps must be tested on real devices and emulators to catch platform-specific issues. Browser preview alone is insufficient.",
              "unoOpportunity": "Studio Live can leverage Hot Design for on-device visual editing — a uniquely powerful mobile dev loop.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Comprehensive. (1) Local Run companion app: syncs project, auto-downloads Flutter SDK, detects connected physical devices, launches iOS Simulator / Android Emulator with dedicated start/stop buttons. (2) Download code and run via flutter run on any device. (3) QR code scanning for live preview on physical devices (web-based, not native). Up to 5 simultaneous preview sessions.", "links": ["https://docs.dreamflow.com/test/test-on-mobile-device/", "https://dreamflow.app/blog/introducing-mobile-preview-instantly-test-your-app-on-real-devices"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/test/test-on-mobile-device/", "title": "Testing App on Mobile Devices — Dreamflow Docs", "snippet": "\"Once setup is complete, a list of available devices and simulators appears, including the iOS Simulator, Android Emulator, and any connected physical devices. To begin, click the play (▶) button next to the simulator to start it.\""}, {"type": "blog", "sourceCategory": "official", "url": "https://dreamflow.app/blog/introducing-mobile-preview-instantly-test-your-app-on-real-devices", "title": "Introducing Mobile Preview: Instantly Test Your App on Real Devices", "snippet": "\"Mobile Preview is a web-based preview for rapid visual testing and layout validation. It's not a native build or simulator. Native device features and platform-specific APIs won't be available in the preview. For full native testing, you'll still want to create actual builds.\""}] },
                "lovable": { "status": "NO", "note": "No native mobile device testing. Lovable is web-only — the preview includes a mobile/desktop toggle for responsive layout checking in the browser, but there is no emulator, simulator, or on-device native testing. Third-party tutorials show a manual workaround using Capacitor to wrap the web app into an APK after exporting to GitHub, but this is not a Lovable-provided workflow.", "links": ["https://docs.lovable.dev/introduction/getting-started", "https://medium.com/@gabrielchege/from-idea-to-apk-in-under-30-minutes-building-your-first-mobile-app-with-lovable-ed10c972a113"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/getting-started", "title": "Quick start — Lovable Docs", "snippet": "\"Toggle between web and mobile view for responsive design.\""}, {"type": "blog", "sourceCategory": "third-party", "url": "https://medium.com/@gabrielchege/from-idea-to-apk-in-under-30-minutes-building-your-first-mobile-app-with-lovable-ed10c972a113", "title": "From Idea to APK in under 30 Minutes — Medium", "snippet": "\"Every Lovable project can be instantly transformed into a native mobile app using Capacitor technology. This means you're not just building a website — you're creating a real mobile app that can be installed on Android devices.\""}] },
                "vibecode": { "status": "YES", "note": "On-device is the primary workflow. The Vibecode iOS app (also available on iPad and Android) lets you build and test apps directly on your phone. The app description states you can 'view and test your app on your phone.' The website highlights real-time cross-platform preview. Emulator/simulator not built-in but available after code download via standard Expo tooling.", "links": ["https://apps.apple.com/ca/app/vibecode-ai-app-builder/id6742912146", "https://vibecodeapp.framer.website/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://apps.apple.com/ca/app/vibecode-ai-app-builder/id6742912146", "title": "Vibecode - AI App Builder — App Store", "snippet": "\"You can simply generate apps with prompting. View and test your app on your phone. Improve and complete the development of your app. Share with anyone in 1-click using App Clips.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.framer.website/", "title": "Vibecode — Official Website", "snippet": "\"Preview your app on your phone or Mac, test real interactions, and refine details using simple prompts or tweaks. Every change updates instantly across platforms.\""}] },
                "builder": { "status": "YES", "note": "Supported via Native Mobile SDKs. Builder.io integrates into your existing native codebase (React Native, Swift, Kotlin). The Visual Editor shows a live preview inside a native emulator while you drag and drop components. For physical devices, run your project locally (e.g. npx expo start) and Builder content updates instantly on the device. Mobile Sidecar Preview in the editor shows mobile viewport rendering. For web apps, a preview URL (including localhost) lets you test on any device on your local network.", "links": ["https://www.builder.io/blog/native-mobile-sdks", "https://www.builder.io/c/docs/projects-overview"], "evidence": [{"type": "blog", "sourceCategory": "official", "url": "https://www.builder.io/blog/native-mobile-sdks", "title": "Native Mobile SDK features — Builder.io Blog", "snippet": "\"Using Builder Mobile SDKs, anyone can drag and drop native components, including text, images, buttons, and more, without submitting new app code. While marketers drag and drop to compose a front-end digital experience, Builder generates native code and shows a live preview in a native emulator inside the Builder Visual Editor. Whatever you can build visually, you can preview in real-time and publish in seconds.\""}] },
                "bolt": { "status": "LIMITED", "note": "Via Expo Go app. Click Device Preview icon in Bolt → scan QR code with Expo Go on your phone for on-device testing. First build takes extra time. Emulator/simulator not built-in — requires downloading code and running locally with Expo CLI. Bolt docs note: 'Mobile browsers are not fully supported in Bolt yet.'", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"While working on your app, you can quickly test it on your own phone using Expo Go. Log in to Bolt and open your mobile project. Click the Device Preview icon in the top center of your screen. Open your Expo Go app, then scan the QR code. The first time you do this, it will take some time to build.\""}] },
                "tempo": { "status": "LIMITED", "note": "Supported via Expo integration when mobile framework is selected. Physical device: QR code preview via Expo Go — scan from View → 'Preview on Your Phone' in the Tempo editor. Changes hot-reload instantly on device. Emulator: open project in local VS Code, then run with standard Expo commands (npx expo start) on iOS Simulator or Android Emulator. Built-in Canvas provides basic web-simulated preview for layout/UI tweaks. Requires Expo framework selection at project creation.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "QR Code Preview via Expo Go for physical device testing with hot reloading. Emulator testing via local VS Code sync with standard React Native/Expo tooling. Built-in Canvas for web-simulated preview. Full native debugging tools accessible on emulators."}] }
              }
            },
            {
              "id": "hot_reload_on_device",
              "name": "Hot reload on device",
              "whyItMatters": "Fast iteration cycles are critical for mobile development. Without hot reload, each change requires a full rebuild.",
              "unoOpportunity": "Uno Platform supports Hot Reload for XAML + C#. Combined with Hot Design, this is a significant mobile dev loop advantage.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Flutter Hot Reload is supported via the Local Run companion app. Changes in Dreamflow sync to the local Flutter project and reflect instantly on the running device/emulator. The docs describe this as a core part of the development loop.", "links": ["https://docs.dreamflow.com/test/test-on-mobile-device/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/test/test-on-mobile-device/", "title": "Testing App on Mobile Devices — Dreamflow Docs", "snippet": "\"Any changes you make in Dreamflow are automatically hot reloaded on the connected device. Updates appear instantly without restarting the app, allowing you to iterate quickly and continuously refine your app in real time.\""}], "screenshots": ["dreamflow-hot-reload-on-device.png"] },
                "lovable": { "status": "NO", "note": "Not applicable — no mobile device target. Web preview uses Vite HMR (Hot Module Replacement) for browser-based iteration.", "links": ["https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development", "title": "FAQ — Lovable Docs", "snippet": "\"Does Lovable support mobile app development? No, Lovable is focused on web applications, but you can design mobile-friendly web apps.\""}] },
                "vibecode": { "status": "YES", "note": "Live iteration on device via the Vibecode iOS app. 'Pinch to Build' lets you long-press on your phone to customize the running app without leaving it. Changes appear in real-time on the device.", "links": ["https://vibecodeapp.mintlify.app/features/pinch-to-build"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/features/pinch-to-build", "title": "Pinch to Build — Vibecode Docs", "snippet": "\"The revolutionary feature that allows you to build your app without leaving the app.\""}] },
                "builder": { "status": "LIMITED", "note": "Web: Visual Editor iframe preview updates instantly with drag-and-drop, responsive toggle for mobile views. Native (React Native, Swift, Kotlin): Builder acts as headless CMS passing JSON — published changes reflect without re-compile or App Store submission, but true hot reload relies on framework capabilities (React Native Fast Refresh, Flutter Hot Reload). Builder SDK handles real-time data injection.", "links": ["https://www.builder.io/blog/native-mobile-sdks"], "evidence": [{"type": "ai-summary", "sourceCategory": "third-party", "url": "https://www.builder.io/blog/native-mobile-sdks", "title": "Builder.io Hot Reload on Device — Google AI Summary", "snippet": "Builder.io supports real-time visual updates on mobile devices through its Visual Editor, but implementation varies by platform. Web & Responsive Mobile: iframe-based preview updates instantly with drag-and-drop, responsive design toggle for mobile views. Native Mobile (React Native, iOS, Android): Builder acts as headless CMS passing content as JSON. Published changes reflect without full re-compile or App Store submission. True hot reload during development relies on framework capabilities (Flutter Hot Reload, React Native Fast Refresh) while Builder SDK handles real-time data injection. Supports stale-while-revalidate CDN caching and device-specific reload settings."}] },
                "bolt": { "status": "LIMITED", "note": "Expo Fast Refresh is available when running via Expo Go, but the workflow requires scanning a QR code and the connection can be fragile. The primary Bolt preview is web-based (WebContainers). Hot reload quality depends on Expo's standard behavior, not Bolt-specific tooling.", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"Fast iteration: see changes immediately without rebuilding.\""}] },
                "tempo": { "status": "LIMITED", "note": "Full Fast Refresh (Hot Reloading) when using Expo target. AI prompt changes or code saves push instantly to the Expo dev server, and the Expo Go app on physical devices auto-refreshes within seconds. State preservation via React Native Fast Refresh (navigation state, form data retained). Web canvas also uses Vite HMR for instant browser preview. Requires Expo framework selection at project creation.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "Full Hot Reloading (Fast Refresh) for on-device testing via Expo. Changes sync instantly to Expo dev server and auto-refresh on physical devices. State preservation via Fast Refresh. Web parity: browser editor matches hand-held device preview."}] }
              }
            },
            {
              "id": "mobile_first_editing",
              "name": "Mobile-first editing (build from phone)",
              "whyItMatters": "Building apps directly from a mobile device is a novel paradigm that removes the desktop IDE requirement entirely.",
              "unoOpportunity": "Consider whether Studio Live's design mode and prompt interactions could work on tablet/phone form factors.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "Desktop/browser-based IDE only. The Dreamflow workspace is designed for desktop browser usage. The Local Run companion app is a desktop app. QR preview lets you see the app on your phone, but editing is done on desktop.", "links": ["https://docs.dreamflow.com/workspace"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/workspace", "title": "Workspace — Dreamflow Docs", "snippet": "\"The workspace is organized into panels that work together to provide a complete development experience. This integrated workspace approach eliminates the need to switch between different tools and provides a cohesive environment for building, testing, and deploying Flutter applications.\""}] },
                "lovable": { "status": "NO", "note": "Desktop/browser-based only. The Lovable interface is designed for desktop browsers. No mobile editing workflow.", "links": ["https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development", "title": "FAQ — Lovable Docs", "snippet": "\"Does Lovable support mobile app development? No, Lovable is focused on web applications, but you can design mobile-friendly web apps.\""}] },
                "vibecode": { "status": "YES", "note": "Vibecode's signature differentiator. The Vibecode iOS app lets you create and edit native apps directly from your phone. 'Pinch to Build' allows in-context editing by long-pressing on elements in the running app. AI chat for prompting also works from the mobile interface.", "links": ["https://www.vibecodeapp.com/", "https://vibecodeapp.mintlify.app/features/pinch-to-build"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.vibecodeapp.com/", "title": "Vibecode — Official Website", "snippet": "\"Get the mobile app to keep building on the go. Create native apps in seconds with AI.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/introduction/creating-first-app", "title": "Creating Your First App — Vibecode Docs", "snippet": "\"Download the App and Create an Account. Start by downloading Vibecode and creating your account. Create a New Project. Once you're logged in, hit 'New project' and type whatever idea that you have for an app.\""}] },
                "builder": { "status": "NO", "note": "Desktop-first editing. You can access the Builder admin via mobile browsers (Safari iOS, Chrome Android), but the drag-and-drop Visual Editor is optimized for mouse and keyboard. On smaller devices, the editor defaults to single-panel layout. Builder encourages building 'for' a phone using desktop features: Mobile Sidecar Preview and Artboard Mode with side-by-side mobile preview.", "links": ["https://www.builder.io/blog/native-mobile-sdks"], "evidence": [{"type": "ai-summary", "sourceCategory": "third-party", "url": "https://www.builder.io/blog/native-mobile-sdks", "title": "Builder.io Mobile-First Editing — Google AI Summary", "snippet": "Builder.io is designed for a desktop-first editing workflow. You can access the Builder admin via mobile browsers (Safari iOS, Chrome Android) and view dashboard or content entries, but the full drag-and-drop experience is optimized for mouse and keyboard on a larger screen. Visual Editor 2.0 defaults to single-panel layout on smaller devices. Instead of building on a phone, Builder encourages building for a phone: Mobile Sidecar Preview opens a persistent phone-sized preview next to the desktop editor; Artboard Mode allows side-by-side mobile preview that updates instantly."}] },
                "bolt": { "status": "NO", "note": "Desktop/browser-based only. Bolt's interface is a desktop web IDE. Bolt is described as an 'AI-powered builder for websites, web apps, and mobile apps' but is accessed via desktop browser.", "links": ["https://support.bolt.new/building/intro-bolt"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/building/intro-bolt", "title": "Introduction to Bolt — Bolt.new Support", "snippet": "\"Bolt is an AI-powered builder for websites, web apps, and mobile apps. Simply type your idea into the chat, click the arrow icon, and Bolt will transform your idea into a working product in minutes.\""}] },
                "tempo": { "status": "NO", "note": "Desktop/browser-based only. Tempo's visual editor is a desktop web IDE with drag-and-drop component editing. No mobile editing interface.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://tempolabsinc.mintlify.app/", "title": "Tempo Labs Documentation", "snippet": "Tempo is a visual React builder accessed via desktop browser. No mobile editing workflow."}] }
              }
            },
            {
              "id": "native_ui_navigation",
              "name": "Native UI & navigation",
              "whyItMatters": "Platform-native controls and navigation patterns (tab bars, gestures, haptics) are what separate real mobile apps from web wrappers.",
              "unoOpportunity": "Uno Platform provides true native controls. Studio Live can offer a toolbox of mobile-specific UI patterns with platform-aware rendering.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Full Flutter widget library. Quickstart examples show bottom navigation bars (Home, Search, Library), native gestures via touch controls, and share-sheet integration. The widget tree and properties editor supports all standard Flutter navigation patterns (MaterialApp, Navigator, BottomNavigationBar, Drawer, TabBar).", "links": ["https://docs.dreamflow.com/quickstart/", "https://docs.dreamflow.com/workspace/widget-tree"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/workspace/widget-tree", "title": "Widget Tree — Dreamflow Docs", "snippet": "\"Insert new widgets into your tree by selecting a parent widget, clicking the plus (add) button, and choosing from a categorized catalog of available widgets (Framework, Project, Dependencies). Framework widgets are widgets imported directly from the Flutter framework, or the Material and Cupertino Flutter Libraries.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/quickstart/", "title": "Quickstart — Dreamflow Docs", "snippet": "\"Build a sleek music streaming app like Spotify, with a dark theme, album art grids, a bottom navigation bar (Home, Search, Library) and a clean now-playing screen with controls and progress bar.\""}], "screenshots": ["dreamflow-native-ui-navigation.png"] },
                "lovable": { "status": "NO", "note": "Web-only UI. Generates responsive web layouts with React + Tailwind. No native mobile navigation or platform-specific UI components. Mobile-friendly web patterns only (hamburger menus, responsive grids).", "links": ["https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development", "title": "FAQ — Lovable Docs", "snippet": "\"Does Lovable support mobile app development? No, Lovable is focused on web applications, but you can design mobile-friendly web apps.\""}] },
                "vibecode": { "status": "YES", "note": "Extensive native iOS UI components documented: Large Header Titles, Context Menus (Zeego), Liquid Glass Bottom Tabs (react-native-bottom-tabs), Modals & Bottom Sheets (@gorhom/bottom-sheet), iOS-Style Switches, Date/Time Pickers (@react-native-community/datetimepicker), Haptic Feedback (built-in), iOS-Style Segmented Control, Swipe to Delete, and Safe Area handling.", "links": ["https://vibecodeapp.mintlify.app/prompting/native-ui-components"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/prompting/native-ui-components", "title": "Native iOS UI Components — Vibecode Docs", "snippet": "\"Easy-to-copy prompts for implementing native iOS UI patterns in your Vibecode apps. Covers: Large Header Titles, Context Menu (Zeego), Liquid Glass Bottom Tabs (react-native-bottom-tabs), Modals and Bottom Sheets (@gorhom/bottom-sheet), iOS-Style Switch, Date and Time Pickers, Haptics, iOS-Style Segmented Control, Swipe to Delete.\""}] },
                "builder": { "status": "NO", "note": "Web-only. Builder generates web components using the connected web framework's component library. No native mobile navigation patterns.", "links": ["https://www.builder.io/fusion"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.builder.io/fusion", "title": "Fusion — Builder.io", "snippet": "\"Use Fusion with these frameworks: React, Next.js, Vue, Svelte, Angular.\""}] },
                "bolt": { "status": "LIMITED", "note": "Whatever Expo / React Native supports. When Bolt generates an Expo project, it can include React Navigation (stack, tab, drawer) and native components. However, Bolt has no mobile-specific UI documentation or patterns — the quality depends on the AI's general React Native knowledge and the user's prompt specificity.", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"Expo is a platform that lets you build mobile apps for both iPhone and Android using the same code. When you ask Bolt to create a mobile app, it automatically uses Expo to make your app work on multiple platforms.\""}] },
                "tempo": { "status": "NO", "note": "Web-only UI. Generates React + Tailwind + ShadCN web components. No native mobile navigation or platform-specific UI components. ShadCN provides web design system components (buttons, dialogs, forms) but no mobile-native patterns.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://tempolabsinc.mintlify.app/", "title": "Tempo Labs Documentation", "snippet": "Tempo generates React + TypeScript + Tailwind + ShadCN web applications. No native mobile UI components."}] }
              }
            },
            {
              "id": "device_apis_services",
              "name": "Device APIs & services",
              "whyItMatters": "Camera, GPS, push notifications, offline storage, biometrics — these are what make mobile apps genuinely useful beyond a website.",
              "unoOpportunity": "Uno Platform exposes native APIs via .NET. Studio Live can generate platform-specific code for device capabilities with proper permission handling.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Documentation explicitly mentions push notifications, camera access, file storage, and app permissions. Notes that these require native device testing (not browser preview). Deep Supabase/Firebase integration supports server-side push notification workflows.", "links": ["https://docs.dreamflow.com/test/test-on-mobile-device/#using-the-live-preview-on-your-mobile-device", "https://docs.dreamflow.com/integrations/supabase/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/test/test-on-mobile-device/#using-the-live-preview-on-your-mobile-device", "title": "Testing App on Mobile Devices — Dreamflow Docs", "snippet": "\"Download and Run the App on Your Device. Best for testing how your app behaves as a real iOS or Android app. Lets you verify that features tied to the device's operating system—such as notifications, camera, file storage, or app permissions—work properly.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/integrations/supabase/", "title": "Supabase Integration — Dreamflow Docs", "snippet": "\"Calling external APIs securely (e.g., Stripe, Twilio, OpenAI) without exposing keys in the client app. Dreamflow makes it easy to integrate Supabase into your app with a guided, step-by-step setup.\""}] },
                "lovable": { "status": "NO", "note": "Not applicable — web-only platform. No access to native device APIs. Limited to browser-available APIs (basic geolocation, camera via browser prompt).", "links": ["https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development", "title": "FAQ — Lovable Docs", "snippet": "\"Does Lovable support mobile app development? No, Lovable is focused on web applications, but you can design mobile-friendly web apps.\""}] },
                "vibecode": { "status": "YES", "note": "Expo Push Notifications documented with cross-platform support. Haptic feedback is a built-in feature. RevenueCat for in-app purchases referenced in deployment docs. Camera, GPS, and sensors available through Expo's standard API library (expo-camera, expo-location, etc.) but not each individually documented in Vibecode-specific docs.", "links": ["https://vibecodeapp.mintlify.app/integrations/expo-push-notifications", "https://docs.expo.dev/versions/latest/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/integrations/expo-push-notifications", "title": "Expo Push Notifications — Vibecode Docs", "snippet": "\"Expo Push Notifications is a cross-platform notification service that works seamlessly with Expo and React Native apps. It enables sending push notifications to iOS and Android devices with a simple API, handling all platform-specific details automatically.\""}, {"type": "docs", "sourceCategory": "third-party", "url": "https://docs.expo.dev/versions/latest/", "title": "Expo SDK API Reference", "snippet": "Expo SDK provides access to device APIs including camera, location, notifications, file system, sensors, haptics, and more — all available to Vibecode apps via React Native / Expo."}] },
                "builder": { "status": "LIMITED", "note": "Indirect access via custom component registration. Builder.io has React Native, Swift (beta), and Kotlin SDKs. Developers write native components wrapping device APIs (camera, GPS, push notifications, gestures, etc.) and register them with Builder so they appear as draggable blocks in the Visual Editor. However, Builder provides no built-in device API blocks — all native capability must be coded by the developer and registered.", "links": ["https://www.builder.io/blog/native-mobile-sdks"], "evidence": [{"type": "blog", "sourceCategory": "official", "url": "https://www.builder.io/blog/native-mobile-sdks", "title": "Introducing Native Mobile SDKs — Builder.io Blog", "snippet": "Most teams create reusable components to deliver custom navigation, backend data, gestures, and other input types to their app. Like in the Builder SDKs for web frameworks and React Native, developers can now register custom Swift, SwiftUI, and Kotlin components with Builder so anyone can create experiences by dragging and dropping custom components."}] },
                "bolt": { "status": "LIMITED", "note": "Available through Expo's API library when a mobile project is generated. Expo provides expo-camera, expo-location, expo-notifications, expo-file-system, etc. However, Bolt docs do not specifically document mobile API integration — the user must prompt for these features and rely on the AI generating correct Expo API usage.", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"Adding in-app purchases to your Expo app: RevenueCat is a tool to power in-app purchases. They've provided a guide to adding RevenueCat to a Bolt Android app. You can also use RevenueCat in iOS apps.\""}] },
                "tempo": { "status": "NO", "note": "Not applicable — web-only platform. No access to native device APIs. Limited to browser-available APIs (basic geolocation, camera via browser prompt). No push notifications, offline storage, or biometrics.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://tempolabsinc.mintlify.app/", "title": "Tempo Labs Documentation", "snippet": "Tempo generates React + Vite web applications. No native device API access beyond standard browser APIs."}] }
              }
            }
          ]
        },
        {
          "id": "deployment_publishing",
          "name": "H. Deployment, publishing & sharing",
          "features": [
            {
              "id": "app_store_deployment",
              "name": "App Store / Play Store deployment",
              "whyItMatters": "The last mile — can you actually ship to real users? In-platform deployment vs 'download code and figure it out' is a huge UX difference.",
              "unoOpportunity": "Studio Live can differentiate by offering integrated mobile deployment with clear guidance, CI/CD hooks, and certificate management.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Direct deployment from within the platform to both Apple App Store and Google Play Store. Documented step-by-step: iOS via API key + Bundle ID + Publish > iOS; Android via service account credentials + AAB file + Publish > Android. Supports internal testing tracks, draft submissions, and production releases.", "links": ["https://docs.dreamflow.com/deployment/apple-app-store-deployment", "https://docs.dreamflow.com/deployment/google-playstore-deployment"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/deployment/apple-app-store-deployment", "title": "Apple App Store Deployment — Dreamflow Docs", "snippet": "\"Dreamflow allows you to deploy your apps directly to the Apple App Store from within the platform. To deploy your app from Dreamflow, navigate to Publish > iOS, specify the Bundle ID and Version Code, and then click Submit Build to App Store.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/deployment/google-playstore-deployment", "title": "Google Play Store Deployment — Dreamflow Docs", "snippet": "\"Dreamflow allows you to deploy your apps directly to the Google Play Store from within the platform. To deploy your app from Dreamflow, navigate to Publish > Android, set the Track to Internal, and update the version code.\""}], "screenshots": ["dreamflow-app-store-play-store-deployment-1.png", "dreamflow-app-store-play-store-deployment-2.png", "dreamflow-app-store-play-store-deployment-3.png", "dreamflow-app-store-play-store-deployment-4.png", "dreamflow-app-store-play-store-deployment-5.png", "dreamflow-app-store-play-store-deployment-6.png"] },
                "lovable": { "status": "NO", "note": "Not applicable — web-only. Deployment is to a web URL (.lovable.app) with optional custom domain. No App Store or Play Store publishing.", "links": ["https://docs.lovable.dev/features/deploy"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/features/deploy", "title": "Publish your app — Lovable Docs", "snippet": "\"Publishing turns your Lovable project into a live web app by deploying a snapshot of your project to a URL you can share. By default, your app is published to [published-url].lovable.app.\""}] },
                "vibecode": { "status": "YES", "note": "Direct App Store deployment documented step-by-step: sign in with Apple Developer credentials, configure bundle ID, build via Expo's cloud service (EAS Build, 15–30 min), auto-upload to App Store Connect / TestFlight. Google Play deployment also referenced but less documented. Built-in 'Publish on App Store' flow inside the product.", "links": ["https://vibecodeapp.mintlify.app/introduction/deploy-app-store"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/introduction/deploy-app-store", "title": "Deploy to App Store — Vibecode Docs", "snippet": "\"Ready to share your app with the world? Vibecode makes it easy to publish your app directly to the Apple App Store. Once you tap Start Build, Vibecode will authenticate your credentials with Apple, set up certificates and provisioning profiles, build your app using Expo's cloud infrastructure, upload your app to App Store Connect. The build process typically takes 15–30 minutes.\""}], "screenshots": ["vibecode-app-store-play-store-deployment-1.png", "vibecode-app-store-play-store-deployment-2.png", "vibecode-app-store-play-store-deployment-3.png", "vibecode-app-store-play-store-deployment-4.png", "vibecode-app-store-play-store-deployment-5.png", "vibecode-app-store-play-store-deployment-6.png", "vibecode-app-store-play-store-deployment-7.png", "vibecode-app-store-play-store-deployment-8.png"] },
                "builder": { "status": "LIMITED", "note": "No in-platform deployment pipeline. Apps using Builder.io SDKs (React Native, Swift, Kotlin) are published via standard tools (Xcode, Expo/EAS Build, Play Console). Builder provides no build or submission automation. Key advantage: once published, content managed through Builder's Visual Editor updates instantly via Content API without requiring a new App Store submission.", "links": ["https://www.builder.io/blog/native-mobile-sdks", "https://medium.com/@tusharkumar27864/best-practices-for-deploying-your-react-native-app-to-the-ios-app-store-92b6a0ddcba6", "https://reactnative.dev/docs/publishing-to-app-store"], "evidence": [{"type": "ai-summary", "sourceCategory": "third-party", "url": "https://www.builder.io/blog/native-mobile-sdks", "title": "Builder.io App Store Deployment — Google AI Summary", "snippet": "Publishing with Builder.io isn't a one-click process for the App Store; you build your app in a mobile framework (like React Native or Flutter) and integrate Builder.io to manage content. Integrate the SDK (@builder.io/sdk-react-native), register custom components, then use standard iOS deployment (Xcode Archive + App Store Connect) and standard Android deployment (generate .aab, upload to Play Console). Once integrated, clicking Publish in the Builder.io dashboard updates your app's content instantly without needing a new App Store submission."}, {"type": "web", "sourceCategory": "third-party", "url": "https://medium.com/@tusharkumar27864/best-practices-for-deploying-your-react-native-app-to-the-ios-app-store-92b6a0ddcba6", "title": "Best Practices for Deploying React Native App to iOS App Store — Medium", "snippet": "Standard React Native iOS deployment workflow: Xcode Archive, App Store Connect distribution, TestFlight beta testing."}, {"type": "docs", "sourceCategory": "official", "url": "https://reactnative.dev/docs/publishing-to-app-store", "title": "Publishing to App Store — React Native Docs", "snippet": "Official React Native documentation for publishing to the Apple App Store and Google Play Store."}] },
                "bolt": { "status": "LIMITED", "note": "Not integrated — requires export + local tooling. Workflow: download code from Bolt → install EAS CLI locally → run 'eas build --platform ios --auto-submit' for TestFlight → submit via App Store Connect. Same for Android via Google Play Console. The build and submission happen outside Bolt entirely.", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"After building your app with Bolt, download the code and open it in a code editor such as VS Code. Install the EAS CLI by running: npm install -g eas-cli. Run eas build --platform ios --auto-submit. EAS will build your app for iPhone, create an app listing in your Apple Developer account, set up a TestFlight testing group, and submit your build for internal testing.\""}] },
                "tempo": { "status": "LIMITED", "note": "No in-platform deployment to stores. Workflow: push Tempo project to GitHub → use EAS Build to create .ipa/.apk/.aab binaries → submit to App Store Connect / Google Play Console via EAS CLI or manual upload. You own 100% of the generated code with no platform lock-in. Some users pair with third-party tools like Natively for more automated store submission.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "No one-click deploy to App Store or Play Store. Generates production-ready code for standard Expo/EAS pipeline: export to GitHub, use EAS Build for binaries, submit to stores. 100% code ownership, can use any CI/CD tool. Optional third-party tools like Natively for automated submission."}] }
              }
            },
            {
              "id": "code_export_native_ownership",
              "name": "Code export & native project ownership",
              "whyItMatters": "Can you leave the platform with a production-quality native project? Vendor lock-in is a major concern for teams investing in mobile.",
              "unoOpportunity": "Uno Platform projects are standard .NET solutions — fully portable to Visual Studio, VS Code, Rider, or CI/CD pipelines. No lock-in.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Full Flutter project download. Download the complete Dart/Flutter codebase, open in VS Code or Android Studio, and continue development independently. The exported project is a standard Flutter project with pubspec.yaml, lib/ structure, and all dependencies. Can run flutter build/run with no Dreamflow dependency.", "links": ["https://docs.dreamflow.com/integrations/git"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/integrations/git", "title": "Git Integration — Dreamflow Docs", "snippet": "\"Dreamflow supports Git integration, allowing you to connect your projects directly to GitHub, GitLab, or other Git providers. Connect Project to Git: Use this option when you already have a project in Dreamflow and want to link it to a Git repository. Push changes from your project to the remote repository.\""}], "screenshots": ["dreamflow-code-export.png"] },
                "lovable": { "status": "LIMITED", "note": "Full code export with ownership, but web-only — no native mobile project. Lovable provides GitHub sync (auto-push on every change), ZIP download, and individual file export. Exported code is production-ready React + TypeScript + Vite, including database schemas (SQL migrations), assets, and configuration. Self-hosting docs explicitly state: 'You own your code… Clone, export, and self-host without restriction.' Built on open-source tech with no proprietary frameworks. However, the output is a web codebase, not an iOS/Android native project.", "links": ["https://docs.lovable.dev/tips-tricks/self-hosting", "https://docs.lovable.dev/integrations/github"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/tips-tricks/self-hosting", "title": "Self-hosting: Run your Lovable Cloud project anywhere — Lovable Docs", "snippet": "\"You own your code. Use our GitHub integration to export your code anytime. Clone, export, and self-host without restriction. You own your data. Your database, storage, and configurations can be exported or migrated to another provider. Lovable is built on open source technologies. Everything runs on open standards and open-source technologies. No proprietary frameworks, no hidden dependencies.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/integrations/github", "title": "Connect your project to GitHub — Lovable Docs", "snippet": "\"Connecting your Lovable project to GitHub lets you: Back up your code, Collaborate easily, Sync automatically, Work locally, Deploy anywhere. When you build with Lovable, your code lives inside the Lovable platform. You can export and sync everything to GitHub in just a few clicks.\""}], "screenshots": ["lovable-code-export-1.png", "lovable-code-export-2.png", "lovable-code-export-3.png"] },
                "vibecode": { "status": "YES", "note": "Source code download available on Pro, Max, and Ultra tiers. Exports a standard React Native / Expo project. Also supports SSH export to Cursor or other editors for continued development. The exported code includes standard package.json, app.json, and Expo configuration.", "links": ["https://vibecodeapp.mintlify.app/features/export-ssh", "https://vibecodeapp.mintlify.app/features/download-code"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/features/export-ssh", "title": "Export and SSH — Vibecode Docs", "snippet": "\"SSH allows you to connect your Vibecode projects directly to code editors like Cursor. This gives you a secure, direct connection to your code so you can edit, deploy, and manage your app from your preferred development environment.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/features/download-code", "title": "Download Your Code — Vibecode Docs", "snippet": "\"Vibecode allows you to download your code and use it in your own development environment. Whether you want to use Cursor, VS Code, or any other IDE, you can export your code and continue building. After all, the code is yours!\""}], "screenshots": ["vibecode-code-export.png"] },
                "builder": { "status": "LIMITED", "note": "Builder.io is designed to live inside your codebase — you always own the code. Projects connects to your Git repo (GitHub, GitLab, Azure DevOps, Bitbucket), and changes are submitted as pull requests to your repository. CLI Devtools (npm init builder.io@latest) can sync generated code into your local project. Visual Copilot exports Figma designs as framework code. For mobile: the React Native SDK (@builder.io/sdk-react-native) integrates into your own React Native project, which you fully own. However, Builder does not generate or scaffold a native project for you — it integrates into one you create and maintain.", "links": ["https://www.builder.io/c/docs/projects-git-providers", "https://www.builder.io/c/docs/devtools"], "screenshots": ["builder-code-export-1.png"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://www.builder.io/c/docs/projects-git-providers", "title": "Connect to GitHub — Builder.io Docs", "snippet": "\"Builder clones your repository, installs dependencies, runs the development server, and opens the Visual Editor, giving full access to the connected project for real-time content editing and previewing. To submit changes and create a pull request (PR) to the connected repository: In the Visual Editor, make the required updates. Click Send PR from the toolbar.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://www.builder.io/c/docs/devtools", "title": "Publish Quickstart (Devtools) — Builder.io Docs", "snippet": "\"You can skip manual integration and let Builder's Devtools handle the details for you. Builder Devtools automatically integrates your app with Builder and provides an intuitive UI for registering components and managing content. Install: npm init builder.io@latest.\""}] },
                "bolt": { "status": "YES", "note": "Full code download available. When an Expo project is generated, the downloaded code is a standard Expo/React Native project with package.json, app.json, and all dependencies. Can be opened in VS Code and continued with expo start / eas build independently. Also syncs to GitHub.", "links": ["https://support.bolt.new/integrations/git"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/git", "title": "GitHub for version control — Bolt.new Support", "snippet": "\"You're never locked into using Bolt. You can build in Bolt, switch to working directly in GitHub, and then come back to Bolt whenever you want. And since your code lives in GitHub, you can publish your site with other services too, not just through Bolt hosting or the Bolt/Netlify integration.\""}], "screenshots": ["bolt-code-export.png"] },
                "tempo": { "status": "YES", "note": "Full code ownership via GitHub integration. Push to GitHub from the editor to maintain control of your code. The VS Code extension (TempoLabs.tempo, 5.3K installs) provides SSH-based remote access to edit Tempo project code in your local IDE. No ZIP download feature — GitHub is the only export path. Exported code is a standard React + TypeScript + Vite project with no proprietary dependencies.", "links": ["https://www.tempo.new", "https://marketplace.visualstudio.com/items?itemName=TempoLabs.tempo"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.tempo.new", "title": "Tempo Labs — Homepage", "snippet": "Push to GitHub: Maintain control of your code, choose your hosting infrastructure, and deploy anywhere. Open in VSCode: Edit code locally using your favourite editor and extensions."}, {"type": "docs", "sourceCategory": "official", "url": "https://marketplace.visualstudio.com/items?itemName=TempoLabs.tempo", "title": "Tempo — VS Code Marketplace", "snippet": "Extension to leverage AI for design & development in a single workspace. Access code running inside of Tempo. Jump to line support when using with Tempo. Requires the SSH - Remote extension."}] }
              }
            },
            {
              "id": "web_publishing",
              "name": "Web app publishing & hosting",
              "whyItMatters": "Can you take your project live as a web app with a public URL directly from the platform? Built-in hosting removes an entire layer of DevOps complexity. Custom domains make it production-ready.",
              "unoOpportunity": "Uno Platform apps target WebAssembly natively. Studio Live could offer one-click web publishing with built-in hosting and custom domain support, eliminating the need for separate hosting configuration.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "One-Click Deployment publishes the app to the web instantly under a shareable Dreamflow URL (e.g. https://<unique-id>.share.dreamflow.app). No additional setup needed. Can Update Deployment or Unpublish at any time. Custom deployment (e.g. custom domain, custom index.html) is listed as 'Coming soon'.", "links": ["https://docs.dreamflow.com/deployment/web-deployment"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/deployment/web-deployment", "title": "Web Deployment — Dreamflow Docs", "snippet": "\"With One-Click Deployment, you can instantly publish your app to the web without any additional setup. Dreamflow automatically builds and hosts your project under a shareable Dreamflow URL. To deploy your app, navigate to Publish > Web and click One-Click Deployment.\""}], "screenshots": ["dreamflow-web-app-publishing-hosting-1.png", "dreamflow-web-app-publishing-hosting-2.png"] },
                "lovable": { "status": "YES", "note": "Built-in hosting at [name].lovable.app with one-click Publish button. Custom domains available on paid plans. Site metadata (favicon, title, OG image, description) configurable in the publish modal. Security review prompted before publishing. Business/Enterprise plans add access controls (anyone vs. workspace-only).", "links": ["https://docs.lovable.dev/features/deploy"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/features/deploy", "title": "Publish your app — Lovable Docs", "snippet": "\"Publishing turns your Lovable project into a live web app by deploying a snapshot of your project to a URL you can share. By default, your app is published to [published-url].lovable.app. Once published, you can update your live app at any time and connect a custom domain for a polished, on-brand experience.\""}], "screenshots": ["lovable-web-app-publishing-hosting-1.png", "lovable-web-app-publishing-hosting-2.png"] },
                "vibecode": { "status": "LIMITED", "note": "Vibecode Deployments provide a .vibecode.app URL, but this is a website for accessing the mobile app — not a standalone web app. The FAQ confirms 'Our web app builder is launching soon.' Deployment includes environment variables, logs, history, and rollback. Custom domains 'coming soon'.", "links": ["https://vibecodeapp.mintlify.app/deployments/guide", "https://www.vibecodeapp.com/faq#web-app"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/deployments/guide", "title": "Deploying Your App — Vibecode Docs", "snippet": "\"Once deployed, your app gets its own public URL (and API endpoint) that works anywhere — on any device, any browser, anytime. Your URL will look like yourProject.vibecode.app or similar.\""}, {"type": "web", "sourceCategory": "official", "url": "https://www.vibecodeapp.com/faq#web-app", "title": "Vibecode FAQ: Web App", "snippet": "\"Can I use Vibecode to build a web app? Our web app builder is launching soon.\""}] },
                "builder": { "status": "LIMITED", "note": "Builder.io is not a hosting platform. Your web app runs on your own hosting (Vercel, Netlify, etc.) and Builder sends content to it over APIs. Projects (Fusion) generates code committed to your Git repo, which you deploy yourself. The Visual Editor uses a Preview URL connected to your hosted environment. No built-in hosting or one-click web publish.", "links": ["https://www.builder.io/c/docs/deploy-preview"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://www.builder.io/c/docs/deploy-preview", "title": "Deploy and Preview — Builder.io Docs", "snippet": "Builder is not a hosting platform. You deploy your code to your own platform the same way you always do, and we send content to it over APIs. The Visual Editor uses a Preview URL connected to your hosted environment."}] },
                "bolt": { "status": "YES", "note": "Built-in Bolt hosting at [name].bolt.host with one-click Publish button. Free for all users (Free and Pro). Custom domains available on Pro plans. Also supports publishing to Netlify as an alternative. Security audit runs automatically on publish.", "links": ["https://support.bolt.new/cloud/hosting/publish", "https://support.bolt.new/cloud/hosting"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/cloud/hosting/publish", "title": "Hosting: Publish your project — Bolt.new Support", "snippet": "\"Every project created in Bolt is eligible for free bolt.host publishing with no setup required. This means you can publish your site publicly without the hassle of connecting to a third-party hosting application.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/cloud/hosting", "title": "Hosting — Bolt.new Support", "snippet": "\"Bolt hosting lets you publish your project to a live URL in seconds, with a free .bolt.host domain included. No third-party account is required: Bolt handles everything. All Bolt users, both Free and Pro, can publish their projects.\""}], "screenshots": ["bolt-web-app-publishing-hosting-1.png", "bolt-web-app-publishing-hosting-2.png"] },
                "tempo": { "status": "YES", "note": "One-click Vercel deployment. Deploy button in the editor publishes to a Vercel preview URL (valid for 24 hours). After 24 hours, users can claim the deployment to their own Vercel account with a custom domain. Tempo handles the Vercel integration automatically.", "links": ["https://tempolabsinc.mintlify.app/essentials/deploying"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://tempolabsinc.mintlify.app/essentials/deploying", "title": "Deploying — Tempo Labs Docs", "snippet": "Deploy your Tempo project to Vercel with one click. Preview URLs are available for 24 hours, after which you can claim the deployment to your own Vercel account."}] }
              }
            },
            {
              "id": "shareable_preview_links",
              "name": "Shareable preview & staging links",
              "whyItMatters": "Before going fully public, teams need to share work-in-progress with stakeholders, QA, or clients. Private preview links with access controls save time and reduce risk of premature exposure.",
              "unoOpportunity": "Studio Live can offer private preview links with role-based access, password protection, and expiration — making it easy to share progress with non-technical stakeholders.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "One-Click Web Deployment creates a shareable Dreamflow URL that can be shared with testers and stakeholders for previewing the app. The shareable link is the deployed web preview itself. Can Unpublish to revoke access. Being Flutter-based, also supports sharing via native device testing flows.", "links": ["https://docs.dreamflow.com/deployment/web-deployment"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/deployment/web-deployment", "title": "Web Deployment — Dreamflow Docs", "snippet": "\"Shareable link: Easily share your app with teammates, testers, or clients. Full control: Unpublish when you're ready to stop sharing or move to a custom deployment.\""}] },
                "lovable": { "status": "YES", "note": "Two independent visibility layers. Project visibility (Public/Workspace/Restricted) controls who sees the editor and code. Website access (on publish) controls who visits the live URL. Business/Enterprise plans support workspace-only access on published URLs. On Free/Pro, anyone with the link can visit. Strong separation between project visibility and published app access.", "links": ["https://docs.lovable.dev/features/project-visibility", "https://docs.lovable.dev/features/deploy"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/features/project-visibility", "title": "Control project visibility — Lovable Docs", "snippet": "\"Project visibility controls who can see, edit, and remix the unpublished version of your project. You can set project visibility to: Public — Anyone can view and remix. Workspace — Only workspace members can view and collaborate. Restricted — Only you can see and edit.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/features/deploy", "title": "Publish your app — Lovable Docs", "snippet": "\"Business and Enterprise plans: You can control who can visit the published app URL, either anyone with the link or only authenticated workspace members.\""}] },
"vibecode": { "status": "YES", "note": "Built-in sharing feature that lets you share your app via link or message directly from the app \u2014 no App Store publish required. Docs state: 'share it with friends, family, or co-workers in just a tap.' Also supports QR code scanning from the web app to open in the Vibecode mobile app for live preview.", "links": ["https://vibecodeapp.mintlify.app/introduction/sharing-app"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/introduction/sharing-app", "title": "Sharing Your App \u2014 Vibecode Docs", "snippet": "\"With Vibecode, you can build an app right on your phone, make updates instantly, and then share it with friends, family, or co-workers in just a tap\u2026 no need to publish it to the App Store. The sharing experience is seamless: just use the share feature and send your app via link or message.\""}], "screenshots": ["vibecode-shareable-preview-staging-link.png"] },
                "builder": { "status": "YES", "note": "Visual Editor preview URLs let team members preview content on the actual site before publishing. Preview URLs can point to localhost, staging, or production. Content entries have Draft vs Published states — drafts are only visible in preview mode. Scheduling allows setting future publish dates. Roles and permissions control who can edit vs publish.", "links": ["https://www.builder.io/c/docs/guides/preview-url", "https://www.builder.io/c/docs/scheduling"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://www.builder.io/c/docs/guides/preview-url", "title": "Editing and Previewing Your Site — Builder.io Docs", "snippet": "\"When you've integrated your app with Builder, you can edit and preview your site using a preview URL. Setting a preview URL gives you a way to develop and preview your site in the browser, just as you would any other site.\""}, {"type": "docs", "sourceCategory": "official", "url": "https://www.builder.io/c/docs/scheduling", "title": "Schedule content — Builder.io Docs", "snippet": "\"You can specify a date and time to publish a Page or Section so that your content goes live when you want it to.\""}] },
                "bolt": { "status": "YES", "note": "Dedicated Sharing feature (separate from Publish). Click Share to create a private hosted preview. Invite by email or generate a private link. Site visibility set to Private — viewers can see the live app but not access the project or code. Teams plans add domain-based whitelisting (e.g. @company.com). Available on paid plans only.", "links": ["https://support.bolt.new/cloud/hosting/sharing"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/cloud/hosting/sharing", "title": "Sharing — Bolt.new Support", "snippet": "\"Bolt supports secure sharing of a working prototype without exposing your full project. You can generate a private link so others can explore your app in a hosted environment, while your files and code stay safely inside Bolt. Sharing focuses on private access, while publishing is used when you are ready for the world to see your app.\""}], "screenshots": ["bolt-shareable-preview-3.png"] },
                "tempo": { "status": "YES", "note": "Vercel preview URLs serve as shareable links. Team sharing via email invitation to the Tempo project. Preview deployments are accessible to anyone with the URL for 24 hours.", "links": ["https://tempolabsinc.mintlify.app/essentials/deploying"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://tempolabsinc.mintlify.app/essentials/deploying", "title": "Deploying — Tempo Labs Docs", "snippet": "Vercel preview URLs provide shareable staging links for team review."}] }
              }
            },
            {
              "id": "live_updates_after_publish",
              "name": "Live updates after publish",
              "whyItMatters": "When you make changes, do published apps update automatically, or must you manually re-deploy? Auto-update reduces friction but risks pushing unfinished work. Manual update gives control but adds a step.",
              "unoOpportunity": "Studio Live could offer both auto-deploy (for staging) and manual promotion (for production), giving teams the best of both worlds.",
              "cells": {
                "dreamflow": { "status": "LIMITED", "note": "Manual update required. After making changes to your project, you must click 'Update Deployment' to publish the latest version. The live web app does not auto-update. For App Store deployments, a full rebuild and resubmission is required for each update.", "links": ["https://docs.dreamflow.com/deployment/web-deployment"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/deployment/web-deployment", "title": "Web Deployment — Dreamflow Docs", "snippet": "\"If you make changes to your project, click Update Deployment to publish the latest version. You can click Unpublish to remove the app from its live URL whenever you no longer want it accessible.\""}] },
                "lovable": { "status": "LIMITED", "note": "Manual update required. Changes made after publishing remain unpublished until you explicitly click 'Update' in the Publish modal. This gives full control — no accidental pushes of in-progress work. Project visibility and website access are independent settings.", "links": ["https://docs.lovable.dev/features/deploy"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/features/deploy", "title": "Publish your app — Lovable Docs", "snippet": "\"Any changes you make after publishing remain unpublished and are only visible according to your project visibility until you publish again. You can continue to iterate on your app, and when ready to push updates, click Update in the Publish modal.\""}] },
                "vibecode": { "status": "LIMITED", "note": "Manual re-deploy required. Each deployment creates a versioned snapshot. The deployment dashboard shows full deployment history with the ability to roll back to previous versions. Changes in the editor do not automatically push to the live deployment.", "links": ["https://vibecodeapp.mintlify.app/deployments/guide"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/deployments/guide", "title": "Deploying Your App — Vibecode Docs", "snippet": "\"View a complete history of every deployment you've made. See when each version went live, roll back to previous versions if something goes wrong, and track changes over time.\""}] },
                "builder": { "status": "YES", "note": "Content updates are near-instantaneous — no redeploy needed. Clicking Publish pushes data to the Content API (Save alone only stores a draft). Delays possible due to CDN/SSR caching. Supports automated scheduling, API-driven publishing (Write API with published: 'published'), Live Preview for testing without publishing, and Live Sync between environments. Code changes (via Fusion) still require PR merge and standard deployment.", "links": ["https://www.builder.io/c/docs/how-builder-works-technical", "https://www.builder.io/c/docs/scheduling"], "evidence": [{"type": "ai-summary", "sourceCategory": "third-party", "url": "https://www.builder.io/c/docs/how-builder-works-technical", "title": "Builder.io Live Updates — Google AI Summary", "snippet": "Changes are typically designed to go live almost immediately (within seconds to a few minutes). Delays are often caused by caching mechanisms (e.g., Vercel, CDNs). Simply clicking Save stores a draft but does not update the Content API — you must Publish. Automated Scheduling sets content to go live at a specific date/time. Live Preview allows real-time changes without publishing. API-driven publishing via Write API with published: 'published' bypasses manual editor. Live Sync keeps content in sync between environments. A Publish action is the trigger that pushes data to your live production API."}] },
                "bolt": { "status": "LIMITED", "note": "Manual update required. After sharing or publishing, changes in the editor are NOT automatically pushed to the live site. You must click 'Update' to push the latest version. Same behavior for both shared (private) and published (public) sites.", "links": ["https://support.bolt.new/cloud/hosting/sharing"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/cloud/hosting/sharing", "title": "Sharing — Bolt.new Support", "snippet": "\"Your site is not automatically updated when changes are made to your project in Bolt. Just like publishing your site, after sharing it, you'll need to click Update whenever you want people to see the latest version of your app.\""}], "screenshots": ["bolt-live-updates-update-after-publish.png"] },
                "tempo": { "status": "LIMITED", "note": "Web apps: Automatic via CI/CD. When connected to GitHub, syncing/committing from the Tempo editor triggers automatic redeployment on Vercel/Netlify. Instant preview URLs update in real-time as you edit. Mobile apps (Expo): Manual store submission required for native changes (new plugins, icons). JavaScript-only changes (typo fixes, button colors) can be pushed instantly via EAS Update (Over-the-Air) without App Store approval.", "links": ["https://www.tempo.new"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://www.tempo.new", "title": "Google AI Overview — Tempo Labs Live Updates", "snippet": "Web Apps: If you have connected your Tempo project to GitHub, every time you Sync or Commit your changes, your hosting provider (like Vercel) detects the change and automatically redeploys the live site. Tempo provides an instant preview URL that stays updated in real-time as you edit. Mobile Apps: Major changes require a new EAS build and store resubmission. JavaScript-only changes can be pushed via EAS Update (Over-the-Air) directly to users' phones without App Store approval."}] }
              }
            }
          ]
        },
        {
          "id": "desktop_platform_breadth",
          "name": "I. Desktop & platform breadth",
          "features": [
            {
              "id": "cross_platform_single_codebase",
              "name": "Cross-platform from single codebase",
              "whyItMatters": "One project targeting iOS + Android + Web + Desktop from a single codebase reduces per-platform maintenance cost and ensures consistency. More supported platforms = broader reach from a single investment.",
              "unoOpportunity": "Uno Platform's core value prop: single C#/XAML codebase → 7+ targets (iOS, Android, Web, Windows, macOS, Linux, embedded). No competitor exceeds 3 from a true single codebase.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "3 platforms: iOS, Android, Web. Flutter's single Dart codebase compiles to all three. Templates described as working 'seamlessly across mobile, tablet, and web platforms.' Desktop (macOS/Windows/Linux) is supported by Flutter but not surfaced in Dreamflow.", "links": ["https://docs.dreamflow.com/quickstart/", "https://dreamflow.app/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.dreamflow.com/quickstart/", "title": "Quickstart — Dreamflow Docs", "snippet": "\"Our templates are fully customizable to match your brand and requirements while being designed to work seamlessly across mobile, tablet, and web platforms.\""}, {"type": "web", "sourceCategory": "official", "url": "https://dreamflow.app/", "title": "Dreamflow — Official Website", "snippet": "\"Deploy to App Store, Play Store & Web with a few clicks.\""}], "screenshots": ["dreamflow-cross-platform-from-single-codebase.png"] },
                "lovable": { "status": "NO", "note": "1 platform: Web only. No cross-platform mobile story. Apps run in web browsers; you can visit the URL on a phone browser for responsive layout, but there is no native compilation.", "links": ["https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://docs.lovable.dev/introduction/faq#does-lovable-support-mobile-app-development", "title": "FAQ — Lovable Docs", "snippet": "\"Does Lovable support mobile app development? No, Lovable is focused on web applications, but you can design mobile-friendly web apps.\""}] },
                "vibecode": { "status": "LIMITED", "note": "2 platforms: iOS, Android (React Native/Expo). Single codebase compiles to both. Web app builder is 'launching soon' per FAQ — not yet available. Desktop is not a documented target.", "links": ["https://vibecodeapp.mintlify.app/introduction/deploy-app-store", "https://www.vibecodeapp.com/faq#web-app"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://vibecodeapp.mintlify.app/introduction/deploy-app-store", "title": "Deploy to App Store — Vibecode Docs", "snippet": "Publish your Vibecode app to iOS App Store and Google Play Store."}, {"type": "web", "sourceCategory": "official", "url": "https://www.vibecodeapp.com/faq#web-app", "title": "Vibecode FAQ: Web App", "snippet": "Can I use Vibecode to build a web app? Our web app builder is launching soon."}] },
                "builder": { "status": "LIMITED", "note": "Web frameworks (React, Vue, etc.) + content delivery to React Native, Swift, Kotlin via Native Mobile SDKs — not a true single-codebase story. CMS content models can serve the same content across platforms, but Fusion AI generates code for one web framework at a time.", "links": ["https://www.builder.io/m/mobile-apps", "https://www.builder.io/blog/native-mobile-sdks"], "evidence": [{"type": "web", "sourceCategory": "official", "url": "https://www.builder.io/m/mobile-apps", "title": "Mobile Apps — Builder.io", "snippet": "Centralize content across your organization so anyone can instantly create, iterate, and share content updates across iOS, Android, web, or any other mobile platform. Choose the best integration for your workflow, whether GraphQL, REST API, or the Builder SDKs for React Native, Swift, or Kotlin apps."}] },
                "bolt": { "status": "LIMITED", "note": "Up to 3 platforms when using Expo: iOS, Android, and Web. However, web is the default output; you must explicitly request mobile. The same Bolt project cannot simultaneously serve as a web app and native mobile app without restructuring.", "links": ["https://support.bolt.new/integrations/expo"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://support.bolt.new/integrations/expo", "title": "Expo for mobile apps — Bolt.new Support", "snippet": "\"Cross-platform: write once, run on iPhone, Android, and web.\""}] },
                "tempo": { "status": "LIMITED", "note": "Up to 3 platforms when Expo is selected: iOS, Android, and Web from a single codebase. AI generates shared logic and mobile-adaptive UI from a single prompt. However, web (React + Vite) is the default; mobile requires explicit Expo framework selection. Desktop is not a documented target.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://tempolabsinc.mintlify.app/", "title": "Google AI Overview — Tempo Labs", "snippet": "Tempo uses 'write once, run everywhere' philosophy through Expo integration. A single prompt generates code for iOS, Android, and Web simultaneously. AI understands mobile patterns (tab bars, navigation stacks) that adapt across platforms."}] }
              }
            },
            {
              "id": "desktop_app_target",
              "name": "Desktop app target (Windows / macOS / Linux)",
              "whyItMatters": "Many enterprise and productivity apps require native desktop targets. Web-only tools force a browser-based deployment model that may not meet requirements.",
              "unoOpportunity": "Uno Platform uniquely targets Windows, macOS, and Linux desktop apps from a single codebase — a gap no competitor fills.",
              "cells": {
                "dreamflow": { "status": "LIMITED", "note": "Flutter supports desktop (Windows, macOS, Linux) but Dreamflow docs focus on mobile + web. Desktop is not prominently surfaced in the platform's UI or deployment docs.", "links": ["https://docs.dreamflow.com/quickstart/"] },
                "lovable": { "status": "NO", "note": "Web-only. No desktop app target. Apps run in browsers only.", "links": ["https://docs.lovable.dev/introduction/faq"] },
                "vibecode": { "status": "NO", "note": "Mobile-first (iOS/Android). No desktop app target documented. Web builder 'launching soon.'", "links": ["https://www.vibecodeapp.com/faq"] },
                "builder": { "status": "NO", "note": "Web framework code generation only (React, Vue, Angular, etc.). No native desktop output. Electron or Tauri wrapping is user-managed.", "links": ["https://www.builder.io/fusion"] },
                "bolt": { "status": "NO", "note": "Web-first with optional Expo mobile. No desktop app target. Would require manual Electron/Tauri wrapping after export.", "links": ["https://support.bolt.new/building/intro-bolt"] },
                "tempo": { "status": "NO", "note": "Web-only. Generates React + Vite web applications. No desktop app target. Electron or Tauri wrapping would be user-managed after export.", "links": ["https://tempolabsinc.mintlify.app/"] }
              }
            },
            {
              "id": "embedded_iot_target",
              "name": "Embedded / IoT targets",
              "whyItMatters": "Industrial, automotive, and IoT applications need lightweight UI on embedded Linux or specialized hardware. This is a niche but defensible market.",
              "unoOpportunity": "Uno Platform runs on embedded Linux (Skia-based rendering). No competitor touches this space, making it a unique differentiator for industrial customers.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "Flutter has experimental embedded support, but Dreamflow does not surface or support it.", "links": [] },
                "lovable": { "status": "NO", "note": "Web-only. No embedded target.", "links": [] },
                "vibecode": { "status": "NO", "note": "Mobile-only. No embedded target.", "links": [] },
                "builder": { "status": "NO", "note": "Web CMS platform. No embedded target.", "links": [] },
                "bolt": { "status": "NO", "note": "Web-first builder. No embedded target.", "links": [] },
                "tempo": { "status": "NO", "note": "Web-only builder. No embedded or IoT target.", "links": [] }
              }
            }
          ]
        },
        {
          "id": "accessibility_quality",
          "name": "J. Accessibility & output quality",
          "features": [
            {
              "id": "a11y_generation",
              "name": "Accessible output by default (WCAG / ARIA)",
              "whyItMatters": "AI-generated UI frequently fails accessibility standards. Automated WCAG compliance and semantic markup reduce legal risk and broaden user reach.",
              "unoOpportunity": "Uno Platform's controls include built-in automation peers and accessibility support. Studio Live can generate accessible XAML by default — a gap no competitor fills.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "No documentation of accessibility validation, WCAG compliance, or ARIA generation. Flutter does provide Semantics widgets, but Dreamflow does not enforce or validate their usage.", "links": [] },
                "lovable": { "status": "NO", "note": "No accessibility features documented. Generated React/Tailwind output does not systematically include ARIA labels, roles, or contrast validation.", "links": [] },
                "vibecode": { "status": "NO", "note": "No accessibility features documented. Mobile-first focus, but no mention of VoiceOver, TalkBack, or accessibility testing.", "links": [] },
                "builder": { "status": "LIMITED", "note": "Visual Editor includes an accessibility tab for setting ARIA attributes manually. No automated accessibility validation or generation of accessible markup by default.", "links": ["https://www.builder.io/c/docs/intro"] },
                "bolt": { "status": "NO", "note": "No accessibility features documented. Generated output depends on AI's general knowledge of accessibility, not systematic enforcement.", "links": [] },
                "tempo": { "status": "LIMITED", "note": "Not WCAG-compliant by default, but provides building blocks. AI defaults to semantic HTML tags (button, nav, header) for foundational accessibility. ShadCN components include some ARIA attributes. Users can prompt the AI to add specific ARIA labels and keyboard navigation. Custom Knowledge feature can enforce project-wide accessibility rules (e.g., 'always use high-contrast colors and descriptive alt text'). Connecting an accessible design system via GitHub preserves established ARIA roles. Manual verification still required for complex interactive elements (focus management, custom dropdowns).", "links": [], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://www.tempo.new", "title": "Google AI Overview — Tempo Labs Accessibility", "snippet": "Tempo's AI generally defaults to semantic HTML tags which provides foundational accessibility. You can prompt the AI to add ARIA features or use Custom Knowledge to enforce accessibility standards across your project. Connecting an accessible design system via GitHub maintains ARIA roles. Automated tools alone cannot achieve 100% WCAG compliance — manual verification of complex interactive elements is still required."}] }
              }
            },
            {
              "id": "design_system_enforcement",
              "name": "Design system / theming enforcement",
              "whyItMatters": "AI-generated code often hardcodes colors, sizes, and styles instead of referencing design tokens. This creates maintenance debt and visual inconsistency.",
              "unoOpportunity": "Uno Themes and SDS (Semantic Design System) provide a structured token system. Studio Live can enforce design system compliance at generation time.",
              "cells": {
                "dreamflow": { "status": "LIMITED", "note": "Agent Instructions can specify design patterns, but there's no automated enforcement that generated code references a design system rather than hardcoding values.", "links": ["https://docs.dreamflow.com/workspace/agent-panel"] },
                "lovable": { "status": "LIMITED", "note": "Custom Knowledge can store design rules. Tailwind provides some structure. No automated design token enforcement.", "links": ["https://docs.lovable.dev/features/knowledge"] },
                "vibecode": { "status": "NO", "note": "No design system features documented. Generated code uses inline styles and component-level styling.", "links": [] },
                "builder": { "status": "YES", "note": "Visual Copilot CLI maps Figma design tokens to codebase variables. Builder rules can enforce component usage. Closest to systematic design system enforcement among competitors.", "links": ["https://www.builder.io/guide/figma-design-to-code"] },
                "bolt": { "status": "LIMITED", "note": "Project Knowledge can include design rules. Generates Tailwind utility classes. No automated enforcement that output references design tokens.", "links": ["https://support.bolt.new/building/using-bolt/project-settings"] },
                "tempo": { "status": "YES", "note": "Strong design system support. Uses ShadCN UI as the default component library with Tailwind CSS theming. Storybook integration lets teams define and enforce design systems. Visual editor respects component library constraints. Figma plugin enables design-to-code with consistent styling.", "links": ["https://tempolabsinc.mintlify.app/"], "evidence": [{"type": "docs", "sourceCategory": "official", "url": "https://tempolabsinc.mintlify.app/", "title": "Tempo Labs Documentation", "snippet": "Tempo uses ShadCN UI components with Tailwind CSS theming and supports Storybook for design system management."}] }
              }
            },
            {
              "id": "visual_regression_testing",
              "name": "Visual regression testing",
              "whyItMatters": "Detecting unintended visual changes across versions is critical for UI quality. Manual visual review doesn't scale.",
              "unoOpportunity": "Studio Live can capture and compare screenshots across iterations and platforms — a multi-platform visual regression system no competitor offers.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "No visual regression testing documented. Preview is available but not used for automated comparison.", "links": [] },
                "lovable": { "status": "LIMITED", "note": "VLM agents take screenshots for debugging, but no automated visual comparison between versions.", "links": ["https://docs.lovable.dev/tips-tricks/troubleshooting"] },
                "vibecode": { "status": "NO", "note": "No visual regression features documented.", "links": [] },
                "builder": { "status": "NO", "note": "Live preview available but no automated visual diff or regression detection.", "links": [] },
                "bolt": { "status": "NO", "note": "Runtime error detection exists, but no visual regression testing.", "links": [] },
                "tempo": { "status": "LIMITED", "note": "No built-in visual regression tool, but supports it through integrations. Storybook integration enables visual regression by comparing component stories. Every change is a Git commit, so standard CI/CD pipelines (GitHub Actions + Playwright/Cypress/Jest) can run regression suites on each sync. Automated Error Correction agent catches syntax/build-breaking changes before deployment. Exported React code supports snapshot testing. Manual rollbacks via Undo history or Git revert. Pro tip from docs: link Chromatic to a Tempo-synced GitHub repo for automated visual diffing of every component on every AI change.", "links": [], "evidence": [{"type": "web", "sourceCategory": "third-party", "url": "https://www.tempo.new", "title": "Google AI Overview — Tempo Labs Regression Testing", "snippet": "Tempo uses Storybook as its source of truth for visual regression testing. Every change is a Git commit enabling standard CI/CD regression suites. Automated Error Correction agent detects and fixes breaking changes. For professional teams, linking a Chromatic account to the Tempo-synced GitHub repo automates visual diffing of every component."}] }
              }
            }
          ]
        },
        {
          "id": "ai_agent_config",
          "name": "K. AI agent configuration",
          "features": [
            {
              "id": "llm_model_choice",
              "name": "LLM model selection",
              "whyItMatters": "Different tasks benefit from different models. Model lock-in limits flexibility and can create data residency concerns for enterprise.",
              "unoOpportunity": "Offer model-agnostic architecture: bring your own keys, choose models per task, run local models for air-gapped environments.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Model picker with 8 options:<ul><li>Auto</li><li>Claude Sonnet 4.5</li><li>Claude Opus 4.5</li><li>Claude Opus 4.6</li><li>Gemini 3.0 (Preview)</li><li>Gemini 3.0 Flash</li><li>GPT-5.2</li><li>GPT-5.1</li></ul>", "links": ["https://docs.dreamflow.com/workspace/agent-panel"], "screenshots": ["dreamflow-llm-model-selection.png"] },
                "lovable": { "status": "NO", "note": "No user-facing model selector. Internally uses:<ul><li>Claude Opus 4.5/4.6</li><li>Claude Sonnet 4.5</li></ul>Lovable AI (in-app chatbot) uses:<ul><li>GPT-5.2</li><li>Gemini 3 Flash/Pro</li></ul>", "links": ["https://docs.lovable.dev/introduction/getting-started"] },
                "vibecode": { "status": "LIMITED", "note": "Claude Code models only (single provider) with 4 options:<ul><li>Claude Sonnet 4.6 (default)</li><li>Claude Opus 4.5</li><li>Claude Opus 4.6</li><li>Claude Haiku 4.5</li></ul>", "links": ["https://vibecodeapp.mintlify.app/docs"], "screenshots": ["vibecode-llm-model-selection.png"] },
                "builder": { "status": "YES", "note": "Full model picker with credit costs per model. 10 options + Auto:<ul><li>Auto (defaults to Gemini 3.0 Flash)</li><li>Claude Haiku 4.5 (5)</li><li>Claude Sonnet 4.6 (15)</li><li>Claude Opus 4.6 (25)</li><li>GPT-5.3 Codex (10)</li><li>GPT-5.2 (5)</li><li>GPT-5.1 Codex Mini (2)</li><li>GPT-5 Mini (1)</li><li>Gemini 3.1 Pro (10)</li><li>Gemini 3.0 Flash (3)</li></ul>", "links": ["https://www.builder.io/fusion"], "screenshots": ["builder-llm-model-selection.png"] },
                "bolt": { "status": "YES", "note": "Model switching available with 7 options:<ul><li>Sonnet 4.5 (default)</li><li>Haiku 4.5</li><li>Sonnet 4.6</li><li>Opus 4.5</li><li>Opus 4.6</li><li>Codex</li><li>v1 Agent (legacy)</li></ul>", "links": ["https://support.bolt.new/building/intro-bolt"], "screenshots": ["bolt-llm-model-selection.png"] },
                "tempo": { "status": "YES", "note": "Direct model selection with 7 options:<ul><li>Auto (default)</li><li>Opus 4.6</li><li>Sonnet 4.6</li><li>Haiku 4.5</li><li>Gemini 3.1 Pro</li><li>GPT 5.2</li><li>GPT 5.3 Codex</li></ul>Auto is available on all plans; other models appear locked behind paid tiers. Also offers three chat modes: Normal, Reasoning (multi-model), and Search (with sourced answers).", "links": ["https://www.tempo.new"], "evidence": [{"type": "screenshot", "sourceCategory": "official", "url": "", "title": "Tempo Labs — Model Selection UI", "snippet": "Model picker shows Auto (selected), Opus 4.6, Sonnet 4.6, Haiku 4.5, Gemini 3.1 Pro, GPT 5.2, GPT 5.3 Codex. Non-Auto models show lock icons indicating paid tier access."}], "screenshots": ["tempo-llm-mode-selection.png"] }
              }
            },
            {
              "id": "mode_selection",
              "name": "Mode selection",
              "whyItMatters": "Different tasks benefit from different agent behaviors. Plan mode thinks before acting, agent mode executes autonomously, chat mode enables conversation. Letting users choose modes gives finer control over the AI's approach.",
              "unoOpportunity": "Offer configurable agent modes (plan, code, chat, review) with auto-mode switching based on context. This is table stakes — most competitors already support it.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "Mode selection available.", "links": [], "screenshots": ["dreamflow-mode-selection.png"] },
                "lovable": { "status": "YES", "note": "Supports Chat mode and Edit mode.", "links": [], "screenshots": ["lovable-mode-selection-1.png", "lovable-mode-selection-2.png"] },
                "vibecode": { "status": "NO", "note": "Single agent mode via Claude Code. No mode switching.", "links": [] },
                "builder": { "status": "YES", "note": "Multiple interaction modes available.", "links": [], "screenshots": ["builder-mode-selection-1.png", "builder-mode-selection-2.png", "builder-mode-selection-3.png"] },
                "bolt": { "status": "YES", "note": "Multiple agent modes available.", "links": [], "screenshots": ["bolt-mode-selection-1.png", "bolt-mode-selection-2.png"] },
                "tempo": { "status": "YES", "note": "Three chat modes: Normal, Reasoning (multi-model), and Search (with sourced answers).", "links": [], "screenshots": ["tempo-mode-selection.png"] }
              }
            },
            {
              "id": "local_selfhosted_ai",
              "name": "Local / self-hosted AI execution",
              "whyItMatters": "Enterprise and government customers require code to never leave their network. Air-gapped AI execution is a hard requirement for regulated industries.",
              "unoOpportunity": "Studio Live + local LLM execution would be a unique enterprise offering. No competitor supports this.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "Cloud-only. All AI processing occurs on Dreamflow's servers.", "links": [] },
                "lovable": { "status": "NO", "note": "Cloud-only. AI processing occurs on Lovable's infrastructure.", "links": [] },
                "vibecode": { "status": "NO", "note": "Cloud-only. AI processing uses Claude Code remotely.", "links": [] },
                "builder": { "status": "NO", "note": "Cloud-only. SaaS platform with no self-hosted option for AI processing.", "links": [] },
                "bolt": { "status": "LIMITED", "note": "bolt.diy (open-source fork) allows self-hosting with custom model providers. Official Bolt.new is cloud-only.", "links": ["https://github.com/stackblitz-labs/bolt.diy"] },
                "tempo": { "status": "NO", "note": "Cloud-only. All AI processing occurs on Tempo's servers using Claude and Gemini models.", "links": [] }
              }
            }
          ]
        },
        {
          "id": "misc",
          "name": "L. Misc",
          "features": [
            {
              "id": "feedback",
              "name": "Feedback",
              "whyItMatters": "A built-in way to send feedback to the platform vendor (bug reports, feature requests, suggestions) helps users feel heard and gives the vendor actionable signal for improving the product.",
              "unoOpportunity": "Studio Live could provide an in-app feedback channel — bug reports, feature requests, satisfaction surveys — so the team gets direct signal from users without friction.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "", "links": [], "screenshots": ["dreamflow-feedback-1.png", "dreamflow-feedback-2.png", "dreamflow-feedback-3.png"] },
                "lovable": { "status": "NO", "note": "", "links": [] },
                "vibecode": { "status": "YES", "note": "", "links": [], "screenshots": ["vibecode-feedback-1.png", "vibecode-feedback-2.png"] },
                "builder": { "status": "YES", "note": "", "links": [], "screenshots": ["builder - feedback 1.png", "builder - feedback 2.png"] },
                "bolt": { "status": "NO", "note": "", "links": [] },
                "tempo": { "status": "YES", "note": "", "links": [], "screenshots": ["tempo-feedback.png"] }
              }
            },
            {
              "id": "credits",
              "name": "Credits / Token Pricing",
              "whyItMatters": "Credit/token systems determine how much AI generation users can do per month and at what cost. Transparent pricing and generous free tiers drive adoption. Understanding what a 'credit' actually buys helps compare value across tools.",
              "unoOpportunity": "Studio Live can differentiate with transparent, predictable pricing — especially if XAML-aware edits are more token-efficient than full-file regeneration. Offering clear cost-per-action visibility would address a common frustration with opaque credit systems.",
              "cells": {
                "dreamflow": {
                  "status": "YES",
                  "note": "Credit cost varies by complexity: simple tasks ~0.30 credits, complex prompts up to ~10.50 credits. A small modern chat app cost ~4.42 credits to create. 100 credits could yield 10–300+ iterations depending on whether they are minor tweaks or full feature rebuilds.",
                  "noteTable": {
                    "columns": ["Plan", "Price", "Credits"],
                    "rows": [
                      ["Free", "$0", "10 (one-time)"],
                      ["Hobby", "$20/mo", "100/mo"],
                      ["Pro", "$90/mo", "500/mo"],
                      ["Enterprise", "Custom", "Custom"]
                    ]
                  },
                  "links": [{ "label": "Pricing", "url": "https://dreamflow.app/#pricing" }],
                  "screenshots": ["dreamflow-credits.png"]
                },
                "lovable": {
                  "status": "YES",
                  "note": "~1 credit per prompt/message. Small changes (e.g. button color) ~0.5 credits. Initial app structure or complex multi-page changes 2+ credits. Bug fixing can burn 10–20+ credits quickly. 100 credits (Pro) can complete ~50% of an MVP if managed well, but can disappear in a few hours of intense vibe coding. 5 daily credits (Free) = minor tweaks or a basic app skeleton per day.",
                  "noteTable": {
                    "columns": ["Plan", "Price", "Credits"],
                    "rows": [
                      ["Free", "$0", "5/day (~30/mo)"],
                      ["Pro", "$25/mo", "100/mo + 5/day (~150/mo)"],
                      ["Business", "$50/mo", "100/mo + SSO"],
                      ["Enterprise", "Custom", "Custom"]
                    ],
                    "footnote": "Pro is shared across unlimited users. Credits roll over. Student discount up to 50% off Pro."
                  },
                  "links": [{ "label": "Pricing", "url": "https://lovable.dev/pricing" }],
                  "screenshots": ["lovable-credits-1.png", "lovable-credits-2.png", "lovable-credits-3.png", "lovable-credits-4.png"]
                },
                "vibecode": {
                  "status": "YES",
                  "note": "Transparent pass-through: $1 in credits = $1 in AI usage (Anthropic/OpenAI). Credits roll over and never expire. Pricing described as experimental.",
                  "noteTable": {
                    "columns": ["Plan", "Price", "Credits"],
                    "rows": [
                      ["Free", "$0", "$2.50 (one-time)"],
                      ["Plus", "$20/mo", "$20/mo"],
                      ["Pro", "$50/mo", "$55/mo"],
                      ["Max", "$200/mo", "$220/mo"]
                    ]
                  },
                  "links": [{ "label": "Pricing", "url": "https://vibecodeapp.com/pricing" }],
                  "screenshots": ["vibecode-credits-1.png", "vibecode-credits-2.png"]
                },
                "builder": {
                  "status": "YES",
                  "note": "Uses token-mapped 'Agent Credits.' AI auto-scales reasoning depth with task complexity. Claude Sonnet 4: input 75 credits/$3 per 1M tokens, cache write 94/$3.75, cache read 8/$0.30, output 375/$15. Can switch to cheaper models (0.1× cost = 10× the prompts for same credits). Credits pool at team/space level, rollover up to 2× monthly allotment.",
                  "noteTable": {
                    "columns": ["Plan", "Price", "Credits"],
                    "rows": [
                      ["Free", "$0/user/mo", "75/mo (25/day limit)"],
                      ["Pro", "$24/user/mo", "500/user/mo (no daily limit)"],
                      ["Team", "$40/user/mo", "500/user/mo (no daily limit)"],
                      ["Enterprise", "Custom", "Custom"]
                    ],
                    "footnote": "Additional credits: $25/mo per 500. Free plan: no rollover, capacity fixed regardless of users. Pro/Team: rollover up to 2×."
                  },
                  "links": [
                    { "label": "Pricing", "url": "https://builder.io/pricing" },
                    { "label": "Agent Credits docs", "url": "https://builder.io/c/docs/ai-credits" }
                  ],
                  "screenshots": ["builder-credits-1.png", "builder-credits-2.png", "builder-credits-3.png", "builder-credits-4.png", "builder-credits-5.png"]
                },
                "bolt": {
                  "status": "YES",
                  "note": "Uses raw AI tokens (not abstract credits). Token cost scales with project size — complex projects can consume 100K+ tokens per single prompt. Free users (300K daily) may get only 2–3 major revisions per day once a project grows complex. Tokens roll over for 1 additional month on paid plans.",
                  "noteTable": {
                    "columns": ["Plan", "Price", "Tokens"],
                    "rows": [
                      ["Free", "$0", "~1M (300K/day limit)"],
                      ["Pro", "$20/mo", "~10M/mo"],
                      ["Pro 26M", "$50/mo", "26M/mo"],
                      ["Teams (max)", "$2,000/mo", "1,200M/mo"]
                    ]
                  },
                  "links": [{ "label": "Token billing", "url": "https://support.bolt.new/account-and-subscription/tokens" }],
                  "screenshots": ["bolt-credits-1.png", "bolt-credits-2.png"]
                },
                "tempo": {
                  "status": "YES",
                  "note": "Per-credit model with simplified 3-tier pricing. Credits vary by plan. Error fixes are free and do not count towards monthly credits. Pro plan includes full access to code & reasoning agents. Bonus credits: $50 for 250 (do not expire, paid plans only). Agent+ tier ($4,500/mo) provides human engineers building 1–3 features/week with 48–72hr turnaround.",
                  "noteTable": {
                    "columns": ["Plan", "Price", "Credits"],
                    "rows": [
                      ["Free", "$0", "30 credits (max 5/day)"],
                      ["Pro", "$30/mo", "150 credits"],
                      ["Agent+", "$4,500/mo", "Human-built features (1–3/week)"]
                    ],
                    "footnote": "Bonus credits: $50 for 250 (paid plans, do not expire). Error fixes are free. Agent+ includes unlimited design revisions and code review improvements."
                  },
                  "links": [{ "label": "Pricing", "url": "https://www.tempo.new/#pricing" }],
                  "evidence": [{"type": "screenshot", "sourceCategory": "official", "url": "https://www.tempo.new/#pricing", "title": "Tempo Labs Pricing", "snippet": "Free: $0/mo, 30 credits (max 5/day), error fixes free. Pro: $30/mo, 150 credits, full access to code & reasoning agents, $50 for 250 bonus credits anytime. Agent+: $4,500/mo, human engineers build 1-3 features/week, 48-72hr turnaround, unlimited design revisions."}],
                  "screenshots": ["tempo-credits.png"]
                }
              }
            },
            {
              "id": "templates",
              "name": "Sample Templates",
              "whyItMatters": "Pre-made templates let users skip the blank-canvas problem and start building immediately without crafting a prompt. They lower the barrier to entry, showcase best practices, and help users understand what the tool can do — driving faster time-to-value and higher activation rates.",
              "unoOpportunity": "Studio Live could offer XAML-native templates (dashboards, CRUD apps, settings pages, onboarding flows) that demonstrate platform-specific patterns. Templates that target multiple platforms out of the box would highlight Uno's cross-platform advantage from the first click.",
              "cells": {
                "dreamflow": { "status": "YES", "note": "", "links": [], "screenshots": ["dreamflow-templates-1.png", "dreamflow-templates-2.png", "dreamflow-templates-3.png", "dreamflow-templates-4.png"] },
                "lovable": { "status": "YES", "note": "", "links": [], "screenshots": ["lovable-templates-1.png", "lovable-templates-2.png", "lovable-templates-3.png"] },
                "vibecode": { "status": "NO", "note": "", "links": [] },
                "builder": { "status": "NO", "note": "", "links": [] },
                "bolt": { "status": "YES", "note": "", "links": [], "screenshots": ["bolt-templates-1.png", "bolt-templates-2.png"] },
                "tempo": { "status": "NO", "note": "", "links": [] }
              }
            },
            {
              "id": "starting_prompt",
              "name": "Starting Prompt",
              "whyItMatters": "The starting prompt is the user's first interaction with the AI agent. A well-designed prompt input experience — with rich context options, file/image attachments, and clear guidance — dramatically affects the quality of generated output and the user's first impression of the tool.",
              "unoOpportunity": "Studio Live can differentiate with a XAML-aware starting prompt that understands Uno Platform project structure, lets users reference existing pages/controls, and offers guided templates for common scenarios (new page, refactor, add feature).",
              "cells": {
                "dreamflow": { "status": "YES", "note": "", "links": [], "screenshots": ["dreamflow-starting-prompt-1.png", "dreamflow-starting-prompt-2.png", "dreamflow-starting-prompt-3.png", "dreamflow-starting-prompt-4.png", "dreamflow-starting-prompt-5.png", "dreamflow-starting-prompt-6.png", "dreamflow-starting-prompt-7.png"] },
                "lovable": { "status": "YES", "note": "", "links": [], "screenshots": ["lovable-starting-prompt-1.png", "lovable-starting-prompt-2.png", "lovable-starting-prompt-3.png", "lovable-starting-prompt-4.png"] },
                "vibecode": { "status": "YES", "note": "", "links": [], "screenshots": ["vibecode-starting-prompt-1.png", "vibecode-starting-prompt-2.png", "vibecode-starting-prompt-3.png", "vibecode-starting-prompt-4.png", "vibecode-starting-prompt-5.png"] },
                "builder": { "status": "YES", "note": "", "links": [], "screenshots": ["builder-starting-prompt-1.png", "builder-starting-prompt-2.png", "builder-starting-prompt-3.png", "builder-starting-prompt-4.png", "builder-starting-prompt-5.png", "builder-starting-prompt-6.png", "builder-starting-prompt-7.png", "builder-starting-prompt-8.png"] },
                "bolt": { "status": "YES", "note": "", "links": [], "screenshots": ["bolt-starting-prompt-1.png", "bolt-starting-prompt-2.png", "bolt-starting-prompt-3.png", "bolt-starting-prompt-4.png", "bolt-starting-prompt-5.png", "bolt-starting-prompt-6.png", "bolt-starting-prompt-7.png"] },
                "tempo": { "status": "YES", "note": "", "links": [], "screenshots": ["tempo-starting-prompt-1.png"] }
              }
            },
            {
              "id": "speech_to_prompt",
              "name": "Speech to Prompt",
              "whyItMatters": "Voice input for prompts enables hands-free interaction and faster prompt entry, especially for longer or more conversational instructions. It lowers the barrier for non-technical users.",
              "unoOpportunity": "Integrating speech-to-prompt in Studio Live would make the tool more accessible and enable rapid prototyping through natural voice commands.",
              "cells": {
                "dreamflow": { "status": "NO", "note": "", "links": [], "screenshots": [] },
                "lovable": { "status": "YES", "note": "", "links": [], "screenshots": ["lovable-starting-prompt-4.png"] },
                "vibecode": { "status": "YES", "note": "", "links": [], "screenshots": ["vibecode-starting-prompt-4.png"] },
                "builder": { "status": "NO", "note": "", "links": [], "screenshots": [] },
                "bolt": { "status": "NO", "note": "", "links": [], "screenshots": [] },
                "tempo": { "status": "NO", "note": "", "links": [], "screenshots": [] }
              }
            }
          ]
        }
      ]
    },
    "matrix1_github_byTool": {
      "title": "Matrix 1 — GitHub integration (by tool) [appendix summary]",
      "rows": [
        {
          "tool": "Dreamflow",
          "cells": [
            { "feature": "Auth model", "value": "PAT required (scopes documented)", "evidence": "https://docs.dreamflow.com/integrations/git" },
            { "feature": "Import repo", "value": "Clone Codebase (Flutter only)", "evidence": "https://docs.dreamflow.com/integrations/git" },
            { "feature": "Blank repo constraint", "value": "Connect Project to Git requires blank/README/LICENSE", "evidence": "https://docs.dreamflow.com/integrations/git" }
          ]
        },
        {
          "tool": "Lovable",
          "cells": [
            { "feature": "Auth model", "value": "GitHub integration documented", "evidence": "https://docs.lovable.dev/integrations/github" },
            { "feature": "Import repo", "value": "Not supported (FAQ)", "evidence": "https://docs.lovable.dev/integrations/github" },
            { "feature": "Branch switching", "value": "Labs/experimental", "evidence": "https://docs.lovable.dev/features/labs" }
          ]
        },
        {
          "tool": "Vibecode.app",
          "cells": [
            { "feature": "GitHub integration", "value": "Not documented; export/SSH workflow", "evidence": "https://vibecodeapp.mintlify.app/features/export-ssh" }
          ]
        },
        {
          "tool": "Builder.io Projects",
          "cells": [
            { "feature": "PR creation", "value": "Send PR workflow documented", "evidence": "https://www.builder.io/c/docs/projects-git-providers" },
            { "feature": "Merge", "value": "Merge in Git provider (workflow)", "evidence": "https://www.builder.io/c/docs/gitlab-self-hosted" }
          ]
        },
        {
          "tool": "Bolt.new",
          "cells": [
            { "feature": "Org accounts", "value": "Not supported (individual only)", "evidence": "https://support.bolt.new/integrations/git" },
            { "feature": "Auto-commit gating", "value": "Commits created when changes don't break project", "evidence": "https://support.bolt.new/integrations/git" }
          ]
        }
      ]
    },
    "matrix2_promptInput_expanded_byTool": {
      "title": "Matrix 2 — Prompt/Input (expanded) [appendix summary]",
      "rows": [
        {
          "tool": "Lovable",
          "cells": [
            { "feature": "Screenshots as input", "value": "Recommended explicitly for debugging/prompts", "evidence": "https://docs.lovable.dev/tips-tricks/troubleshooting" },
            { "feature": "MCP connectors", "value": "Supported (Notion/Jira/Linear/custom)", "evidence": "https://docs.lovable.dev/integrations/mcp-servers" }
          ]
        },
        {
          "tool": "Bolt.new",
          "cells": [
            { "feature": "Figma import", "value": "Supported via Anima", "evidence": "https://support.bolt.new/integrations/figma" },
            { "feature": "Supabase", "value": "OAuth integration documented", "evidence": "https://support.bolt.new/integrations/supabase" }
          ]
        },
        {
          "tool": "Dreamflow",
          "cells": [
            { "feature": "Firebase/Supabase panels", "value": "Documented in workspace", "evidence": "https://docs.dreamflow.com/workspace" }
          ]
        },
        {
          "tool": "Vibecode.app",
          "cells": [
            { "feature": "Backend/data integrations", "value": "Coming soon", "evidence": "https://www.vibecodeapp.com/docs/faq/data-integrations" }
          ]
        },
        {
          "tool": "Builder.io Projects",
          "cells": [
            { "feature": "Multi repo context", "value": "Additional repos for context documented", "evidence": "https://www.builder.io/c/docs/projects-git-providers" }
          ]
        }
      ]
    }
  },
  "unoOpportunityCards": [
    {
      "id": "pr_native_ai",
      "title": "PR-native AI by default",
      "summary": "Make the agent's default output a clean pull request with rationale and test notes.",
      "whyNow": "This is the fastest way to earn trust with real teams. It also becomes the backbone that everything else plugs into (diffs, reviews, CI, governance). It's the clearest \"enterprise-ready\" story.",
      "whatCompetitorsDo": ["Builder: Send PR", "Others: sync/commit/export"],
      "howUnoWins": ["Default to PRs in team mode", "Diff-aware prompting + scoped changes", "CI/validation hooks before PR submission"]
    },
    {
      "id": "scope_aware_edits",
      "title": "Scope-aware edits (XAML-aware blast radius)",
      "summary": "User/system can constrain changes to a file/component/template/resource dictionary.",
      "whyNow": "This is the \"make AI safe for UI engineering\" wedge. It directly solves the biggest fear: unpredictable changes. It's also uniquely defensible for Uno because of XAML + controls/templates/resources.",
      "howUnoWins": ["First-class XAML targeting", "Rules like: never touch resources outside SDS dictionary", "Read-only analysis mode + apply mode"]
    },
    {
      "id": "dual_layer_safety",
      "title": "Dual-layer safety (technical + governance)",
      "summary": "Combine validation gating (Bolt-like) with PR governance (Builder-like).",
      "whyNow": "PRs alone are process; gating alone is technical. Combining both is what turns autonomy from scary to usable. Also a prerequisite for moving from \"assistant\" to \"agent.\"",
      "howUnoWins": ["Compile/build + basic UI sanity before commit/PR", "PR-only changes in team mode", "Clear rollback guidance"]
    },
    {
      "id": "runtime_preview_context",
      "title": "Runtime + preview state as context",
      "summary": "Use Hot Design / visual tree / binding errors as agent context.",
      "whyNow": "Very differentiating, but slightly more complex to build and explain. Huge value for debugging and UI correctness once it's working, especially with Hot Design.",
      "howUnoWins": ["Feed preview diagnostics into the agent", "Generate fixes tied to live UI issues", "Platform-specific rendering checks"]
    },
    {
      "id": "telemetry_informed_ai",
      "title": "Telemetry-informed recommendations",
      "summary": "Use usage + error telemetry to prioritize what the agent optimizes.",
      "whyNow": "Potentially massive long-term, but it's the most \"second-order\" — it needs good data plumbing, a clear UX, and strong user trust first. It shines once PR/scope/safety exist because then it can drive what to work on next.",
      "howUnoWins": ["Map work to impact (hot paths)", "Detect regressions from real error spikes", "Prioritize controls/pages based on usage"]
    }
  ],
  "unoUniqueAdvantages": {
    "title": "What no competitor can match",
    "subtitle": "Structural advantages that make Studio Live fundamentally different from generic AI app builders.",
    "items": [
      {
        "icon": "🎯",
        "title": "Single codebase → 7+ platforms",
        "description": "iOS, Android, Web (WASM), Windows, macOS, Linux, and embedded — from one C#/XAML project. No competitor covers more than 3 platforms from a single codebase."
      },
      {
        "icon": "🏢",
        "title": ".NET / C# enterprise ecosystem",
        "description": "NuGet packages, Azure DevOps, Visual Studio, MSAL auth, and 12M+ developers. Generated code integrates immediately with existing enterprise infrastructure."
      },
      {
        "icon": "🌳",
        "title": "XAML semantic editing",
        "description": "Structure-aware edits that target UI subtrees, controls, styles, and resource dictionaries — not just raw text generation. Reduces blast radius and increases correctness."
      },
      {
        "icon": "🔥",
        "title": "Hot Design + Hot Reload on device",
        "description": "Live visual editing and instant code reload on physical devices and emulators. A uniquely powerful mobile development loop that no web-based builder can replicate."
      },
      {
        "icon": "🔓",
        "title": "Zero vendor lock-in",
        "description": "Standard .NET solution. Open in Visual Studio, VS Code, or Rider. Build with MSBuild or dotnet CLI. Deploy through any CI/CD pipeline. No proprietary runtime dependencies."
      },
      {
        "icon": "♿",
        "title": "Accessibility built into controls",
        "description": "Uno Platform's control library includes built-in accessibility support: automation peers, screen reader compatibility, keyboard navigation, and high-contrast theming."
      }
    ]
  },
  "threatWatch": {
    "title": "Threat watch: emerging competitors",
    "subtitle": "These tools aren't direct competitors today but are converging on the same space. Monitoring them helps Uno stay ahead of market shifts.",
    "threats": [
      {
        "id": "copilot-workspace",
        "name": "GitHub Copilot Workspace",
        "category": "IDE-native AI",
        "threatLevel": "high",
        "description": "Full repo-aware AI editing integrated into the world's largest developer platform. Plans, implements, and validates multi-file changes with full codebase context.",
        "whyWatch": "GitHub's distribution advantage (100M+ developers) makes any Copilot feature instantly mainstream.",
        "unoAngle": "Copilot is framework-agnostic and has no UI-specific intelligence. Studio Live's XAML awareness and platform-native knowledge remain unique."
      },
      {
        "id": "cursor-windsurf",
        "name": "Cursor / Windsurf",
        "category": "AI-native IDE",
        "threatLevel": "high",
        "description": "AI-native IDEs with agent mode, full codebase indexing, and multi-step autonomous task execution. Growing rapidly among professional developers.",
        "whyWatch": "These tools are becoming the default coding environment for early adopters. If they add visual editing or UI-specific features, they could compete directly.",
        "unoAngle": "IDEs are general-purpose; they lack UI-specific tooling (visual trees, preview feedback, design system enforcement). Studio Live is purpose-built for UI development."
      },
      {
        "id": "firebase-studio",
        "name": "Firebase Studio (Project IDX)",
        "category": "Google AI builder",
        "threatLevel": "medium",
        "description": "Google's cloud IDE with Gemini integration, full-stack templates, and built-in Firebase services. Supports Flutter, React, Angular, and more.",
        "whyWatch": "Google's AI model capabilities (Gemini) and Firebase ecosystem create a vertically integrated builder with cloud infrastructure baked in.",
        "unoAngle": "Firebase Studio is framework-agnostic with no UI-editing intelligence. Uno's runtime ownership and multi-platform native output remain differentiated."
      },
      {
        "id": "replit-agent",
        "name": "Replit Agent",
        "category": "Full-stack AI builder",
        "threatLevel": "medium",
        "description": "Full-stack AI agent that plans, codes, and deploys complete applications. Natural language to running app with built-in hosting and database.",
        "whyWatch": "Replit's 'idea to deployed app in minutes' story is compelling for prototyping. If they add mobile/native targets, they become a direct competitor.",
        "unoAngle": "Replit generates web-only output. No native mobile, no desktop, no enterprise ecosystem integration. Projects are ephemeral rather than production-grade."
      },
      {
        "id": "v0-vercel",
        "name": "v0 by Vercel",
        "category": "UI generation",
        "threatLevel": "medium",
        "description": "AI-powered UI component generator that produces React/Tailwind code from prompts and screenshots. Tight integration with Vercel deployment.",
        "whyWatch": "v0's UI generation quality is high and improving rapidly. If they expand beyond components to full applications, they compete with the generation layer.",
        "unoAngle": "v0 generates web-only React components. No multi-platform story, no runtime control, no enterprise features. Studio Live generates complete multi-platform applications."
      }
    ]
  },
  "futureTrends": {
    "title": "Future trends shaping AI-driven development",
    "subtitle": "Emerging shifts reshaping the competitive landscape. Uno's opportunity: build an AI software engineering environment, not just another UI generator.",
    "trends": [
      {
        "id": "agentic-orchestration",
        "trend": "Agentic orchestration & planning",
        "tier": 1,
        "description": "AI agents that plan, execute, test, and iterate autonomously over multi-step workflows — not just single prompt-response cycles. Production-ready for constrained domains now; unreliable for open-ended tasks.",
        "timeframe": "Now – 12 months",
        "implication": "Studio Live's explicit agent tools (build, publish, screenshot) are well-positioned. Need to support chained/orchestrated multi-step workflows and conditional branching.",
        "unoAction": "Design agent tool pipelines: prompt → generate → build → test → preview → iterate. Make the loop explicit and auditable with step-by-step replay."
      },
      {
        "id": "deterministic-auditable",
        "trend": "Deterministic & auditable AI execution",
        "tier": 1,
        "description": "Enterprises demand reproducible AI runs, explainable outputs, and 'why did the AI do this?' traceability. Non-deterministic black-box generation is a dealbreaker for regulated industries.",
        "timeframe": "Now – 18 months",
        "implication": "Studio Live's explicit tool model is a massive advantage — every agent action is a defined tool call, not opaque text generation. Competitors treat the AI as a black box.",
        "unoAction": "Implement deterministic agent runs with step replay. Generate diff + rationale per action. Make the audit trail a first-class feature, not an afterthought."
      },
      {
        "id": "token-cost-optimization",
        "trend": "Token cost & efficiency optimization",
        "tier": 1,
        "description": "As AI usage scales, token costs become a board-level concern. Tools that minimize token consumption per change gain economic advantage — this is an economic moat, not just technical optimization.",
        "timeframe": "Now – 12 months",
        "implication": "Diff-aware generation (Lovable, Bolt) already saves significant tokens. Semantic XAML editing is inherently more token-efficient than full-file text regeneration.",
        "unoAction": "Leverage XAML structure for surgical edits: modify a control's properties without re-sending the entire file. Benchmark token usage vs competitors and make efficiency a selling point."
      },
      {
        "id": "design-code-convergence",
        "trend": "Design ↔ code round-tripping",
        "tier": 1,
        "description": "Bidirectional sync between design tools (Figma, Sketch) and code is becoming table stakes. The hard part is maintaining semantic alignment over time, not the initial generation.",
        "timeframe": "Now – 18 months",
        "implication": "Builder.io leads with Visual Copilot. Bolt supports Figma URL import. The expectation of Figma ↔ code sync is mainstream. Competitors fail at maintaining design system references over time.",
        "unoAction": "Develop XAML ↔ design tool mapping. Support Uno Themes / SDS token import from Figma. Generate XAML that references design system resources, not hardcoded values."
      },
      {
        "id": "backend-generation",
        "trend": "AI-generated backend & data models",
        "tier": 1,
        "description": "Most AI tools focus on UI generation, but real apps need auth, data models, APIs, and state management. Backend generation remains shallow and opinionated across all competitors.",
        "timeframe": "6 – 24 months",
        "implication": "No competitor does cross-platform backend generation well. The gap between 'generated UI' and 'working application' remains the biggest user pain point.",
        "unoAction": "Generate .NET backend scaffolding aligned with XAML UI. Shared contracts (DTOs), strong end-to-end typing, and API integration that matches the generated frontend."
      },
      {
        "id": "ai-native-testing",
        "trend": "AI-native testing & cross-platform QA",
        "tier": 1,
        "description": "Agents that automatically write, run, and maintain tests alongside generated code. Visual regression testing and cross-platform UI validation remain largely unsolved.",
        "timeframe": "12 – 24 months",
        "implication": "Huge gap across all competitors. Unit test generation is weak but improving; UI testing is brittle; visual regression across platforms is mostly unsolved. First mover advantage is significant.",
        "unoAction": "Generate platform-aware UI tests. Validate rendering across iOS, Android, Web, and Desktop. Auto-create accessibility audits for generated screens."
      },
      {
        "id": "multimodal-context",
        "trend": "Multimodal context ingestion",
        "tier": 2,
        "description": "Feeding screenshots, screen recordings, design artifacts, and error states into AI workflows as context — not just text prompts. Voice is supplemental input, not a primary workflow.",
        "timeframe": "Now – 18 months",
        "implication": "Context quality determines generation quality. Tools that can ingest visual context (screenshots of bugs, recordings of desired behavior, design comps) produce better results.",
        "unoAction": "Support screenshot/recording → UI generation workflows. Accept Figma frames, error screenshots, and visual references as prompt context. Voice input as optional convenience."
      },
      {
        "id": "multi-agent-collaboration",
        "trend": "Multi-agent team workflows",
        "tier": 2,
        "description": "Teams where multiple agents act on the same project, coordinated through shared state, PRs, and governance rules. Adoption will be enterprise-led and governance-heavy.",
        "timeframe": "12 – 24 months",
        "implication": "Designing for multi-agent coordination from the start matters. GitHub Copilot Workspace and Devin hint at this future. Formal AI governance and approvals follow at 18–30 months.",
        "unoAction": "Design Studio Live's governance model to support multiple agents per project. Shared context, conflict prevention, and coordinated PRs become essential."
      },
      {
        "id": "enterprise-compliance",
        "trend": "Enterprise compliance & governance",
        "tier": 2,
        "description": "SOC2/ISO compliance, data residency requirements, on-prem/private AI options, and IP ownership guarantees. Won't matter for indie tools but critical for Uno's enterprise audience.",
        "timeframe": "18 – 30 months",
        "implication": "A slow-burn differentiator. Most competitors ignore enterprise constraints entirely. Being ready when procurement teams ask these questions is a competitive advantage.",
        "unoAction": "Plan for private/on-prem AI deployment options. Ensure IP ownership clarity for generated code. Build compliance documentation into the product story early."
      },
      {
        "id": "local-hybrid-ai",
        "trend": "Local / hybrid AI execution",
        "tier": 3,
        "description": "Local diffing, local validation, and partial offline operation. Not fully local AI, but hybrid architectures that reduce cost, improve privacy, and increase responsiveness.",
        "timeframe": "18 – 30 months",
        "implication": "Cost savings, privacy guarantees, and faster iteration loops. Particularly relevant for enterprises with data sensitivity requirements.",
        "unoAction": "Evaluate local model execution for validation and diffing. Consider hybrid architecture: cloud for generation, local for validation and preview. Track on-device model capabilities."
      }
    ]
  }
};
