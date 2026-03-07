// Requirements data — structured from competitive analysis
// Categories aligned with the "By Feature" tab sections (A–L)
const requirementsData = {
  meta: {
    title: "Uno Studio Live — Feature Requirements",
    subtitle: "Prioritized must-haves and nice-to-haves based on competitive analysis of 6 AI app builders across 45 features.",
    methodology: "Features prioritized by how many competitors offer them (table stakes vs. differentiators), strategic alignment with Uno's strengths (.NET, XAML, multi-platform, enterprise), and user impact."
  },
  priorities: [
    {
      id: "p0",
      label: "P0 — Must-Have",
      tagColor: "#67e5ad",
      tagBg: "rgba(103, 229, 173, 0.12)",
      tagBorder: "rgba(103, 229, 173, 0.35)",
      description: "Table stakes — most competitors have this. Shipping without it creates a visible gap.",
      icon: "🎯"
    },
    {
      id: "p1",
      label: "P1 — Should-Have",
      tagColor: "#6489FF",
      tagBg: "rgba(100, 137, 255, 0.12)",
      tagBorder: "rgba(100, 137, 255, 0.35)",
      description: "Strong competitive expectation. ~50% of competitors have it. Missing it weakens positioning.",
      icon: "📌"
    },
    {
      id: "p2",
      label: "P2 — Differentiator",
      tagColor: "#c084fc",
      tagBg: "rgba(192, 132, 252, 0.12)",
      tagBorder: "rgba(192, 132, 252, 0.35)",
      description: "Few or no competitors have this. Uno can lead here due to structural advantages.",
      icon: "🚀"
    },
    {
      id: "p3",
      label: "P3 — Nice-to-Have",
      tagColor: "#9ca3af",
      tagBg: "rgba(156, 163, 175, 0.12)",
      tagBorder: "rgba(156, 163, 175, 0.35)",
      description: "Useful features that can be added iteratively after launch.",
      icon: "💡"
    }
  ],
  // All features organized by category (matching By Feature sections A–L)
  categories: [
    {
      id: "github_collab",
      name: "A. GitHub & Collaboration",
      features: [
        { id: "github-native-integration", name: "GitHub native integration", priority: "p0", coverage: "5/6", coverageDetail: "all except Vibecode", note: "Auth + repo connect + sync. Must support PAT or GitHub App auth, connect to existing repos, and track file changes." },
        { id: "branching", name: "Branching", priority: "p0", coverage: "5/6", coverageDetail: "4 YES + 1 LIMITED", note: "Create, switch, and manage branches. Essential for team workflows." },
        { id: "import-existing-repo", name: "Import existing repo", priority: "p1", coverage: "4/6", coverageDetail: "3 YES + 1 LIMITED", note: "Bring an existing codebase into the tool. Critical for real teams — not just greenfield projects." },
        { id: "create-new-repo", name: "Create new repo", priority: "p1", coverage: "5/6", coverageDetail: "3 YES + 2 LIMITED", note: "Publish a project into a new GitHub repo from inside the tool." },
        { id: "push-prs", name: "Push PRs", priority: "p1", coverage: "4/6", coverageDetail: "3 YES + 1 LIMITED", note: "Commit and push changes. Builder's PR-first workflow is the gold standard for enterprise." },
        { id: "merging-in-product", name: "Merging (in-product)", priority: "p3", coverage: "2/6", coverageDetail: "1 YES + 1 LIMITED", note: "Most tools defer merging to GitHub. Keep merge in GitHub for governance." }
      ]
    },
    {
      id: "prompt_ai",
      name: "B. Prompt Context & AI Reasoning",
      features: [
        { id: "codebase-aware-prompting", name: "Codebase-aware prompting", priority: "p0", coverage: "6/6", coverageDetail: "5 YES + 1 LIMITED", note: "Agent must reason over and edit actual project files. Must be XAML + .NET aware, not generic text editing." },
        { id: "file-component-targeting", name: "File / component targeting", priority: "p0", coverage: "6/6", coverageDetail: "all YES", note: "Users click a control or file to scope the AI's edits. Critical for trust — reduces blast radius." },
        { id: "diff-aware-prompting", name: "Diff-aware prompting", priority: "p0", coverage: "6/6", coverageDetail: "5 YES + 1 LIMITED", note: "Agent should compute diffs and update only changed lines. XAML structure makes this even more efficient." },
        { id: "persistent-prompt-memory", name: "Persistent prompt memory", priority: "p0", coverage: "6/6", coverageDetail: "5 YES + 1 LIMITED", note: "Project-level rules/knowledge that persist across sessions. Store design rules, naming conventions, coding standards." },
        { id: "xaml-aware-blast-radius", name: "XAML-aware blast radius", priority: "p2", coverage: "0/6", coverageDetail: "none", note: "Structure-aware edits targeting UI subtrees, controls, styles, and resource dictionaries. Trust advantage.", highlight: true },
        { id: "repo-as-ai-input", name: "Repo as AI input (multi-repo context)", priority: "p2", coverage: "1/6", coverageDetail: "Builder only", note: "Let the agent read additional repos (design systems, API docs, shared libraries) as context." }
      ]
    },
    {
      id: "visual_design",
      name: "C. Visual & Design Inputs",
      features: [
        { id: "screenshot-as-prompt-input", name: "Screenshot as prompt input", priority: "p0", coverage: "6/6", coverageDetail: "all YES", note: "Drag/paste screenshots into chat for visual context. Universal feature." },
        { id: "figma-app-import", name: "Figma → app import", priority: "p1", coverage: "4/6", coverageDetail: "3 YES + 1 LIMITED", note: "Builder leads with Visual Copilot. If pursued, anchor to XAML + Uno Themes/SDS." },
        { id: "runtime-preview-state-ai-input", name: "Runtime / preview state as AI input", priority: "p1", coverage: "6/6", coverageDetail: "4 YES + 2 LIMITED", note: "Agent uses preview output as feedback. Uno can uniquely leverage Hot Design + visual tree + binding diagnostics." },
        { id: "custom-assets", name: "Custom assets (fonts, images)", priority: "p1", coverage: "6/6", coverageDetail: "4 YES + 2 LIMITED", note: "Upload custom fonts, images, SVGs. Must integrate with XAML resource dictionaries." }
      ]
    },
    {
      id: "external_context",
      name: "D. External Context & Ecosystem",
      features: [
        { id: "mcp-tool-connectors", name: "MCP / tool connectors", priority: "p1", coverage: "4/6", coverageDetail: "3 YES + 1 LIMITED", note: "Connects the agent to external tools (tickets, docs, databases). Growing expectation." },
        { id: "telemetry-analytics-ai-input", name: "Telemetry / analytics as AI input", priority: "p2", coverage: "1/6", coverageDetail: "Builder only, 2 LIMITED", note: "Use real usage data to prioritize what the agent optimizes." }
      ]
    },
    {
      id: "backend_data",
      name: "E. Backend, Data & Secrets",
      features: [
        { id: "db-state-usable-by-ai", name: "DB state usable by AI", priority: "p1", coverage: "5/6", coverageDetail: "4 YES + 1 LIMITED", note: "Agent can inspect database schemas and generate type-safe code against them." },
        { id: "backend-integration", name: "Backend integration (auth + data)", priority: "p0", coverage: "6/6", coverageDetail: "5 YES + 1 LIMITED", note: "Every competitor connects to Supabase/Firebase or similar. Consider Azure-first + Supabase/Firebase options." },
        { id: "secrets-management", name: "Secrets management", priority: "p0", coverage: "6/6", coverageDetail: "all YES", note: "Environment variables for API keys, tokens, connection strings. AI references by name without exposing values." }
      ]
    },
    {
      id: "safety_validation",
      name: "F. Safety, Validation & Execution",
      features: [
        { id: "validation-before-apply", name: "Validation before apply", priority: "p0", coverage: "6/6", coverageDetail: "4 YES + 2 LIMITED", note: "Build/compile checks before committing changes. Combine MSBuild compilation + XAML validation + preview verification." },
        { id: "auto-rollback-on-failure", name: "Auto-rollback on failure", priority: "p2", coverage: "0/6", coverageDetail: "4 LIMITED", note: "No competitor has true automated rollback. Offer safe rollback plans (revert commits, PR revert)." }
      ]
    },
    {
      id: "mobile",
      name: "G. Mobile",
      features: [
        { id: "explicit-mobile-app-target", name: "Explicit mobile app target", priority: "p0", coverage: "5/6", coverageDetail: "4 YES + 1 LIMITED", note: "5/6 competitors support this and mobile is core to Uno's cross-platform identity. 'Create a mobile app' must be a first-class path from day one." },
        { id: "mobile-framework", name: "Mobile framework", priority: "p1", coverage: "5/6", coverageDetail: "2 YES + 3 LIMITED", note: "Uno = C#/XAML (unique). Competitors use Flutter, React Native/Expo." },
        { id: "on-device-testing", name: "On-device testing", priority: "p1", coverage: "5/6", coverageDetail: "3 YES + 2 LIMITED", note: "Physical device + emulator testing. Hot Design is a uniquely powerful mobile dev loop." },
        { id: "hot-reload-on-device", name: "Hot reload on device", priority: "p1", coverage: "5/6", coverageDetail: "2 YES + 3 LIMITED", note: "Fast iteration on device. Uno supports Hot Reload for XAML + C#." },
        { id: "native-ui-navigation", name: "Native UI & navigation", priority: "p1", coverage: "3/6", coverageDetail: "2 YES + 1 LIMITED", note: "Platform-native controls (tab bars, gestures, haptics). Uno provides true native controls." },
        { id: "device-apis-services", name: "Device APIs & services", priority: "p1", coverage: "4/6", coverageDetail: "2 YES + 2 LIMITED", note: "Camera, GPS, push notifications, biometrics. Uno exposes native APIs via .NET." },
        { id: "mobile-first-editing", name: "Mobile-first editing (build from phone)", priority: "p3", coverage: "1/6", coverageDetail: "Vibecode only", note: "Novel but niche. Consider whether Studio Live could work on tablet form factors." }
      ]
    },
    {
      id: "deployment",
      name: "H. Deployment, Publishing & Sharing",
      features: [
        { id: "code-export-project-ownership", name: "Code export & project ownership", priority: "p0", coverage: "6/6", coverageDetail: "4 YES + 2 LIMITED", note: "Users must be able to export and own their code. Standard .NET solution is already a strength — zero lock-in." },
        { id: "shareable-preview-staging", name: "Shareable preview & staging links", priority: "p0", coverage: "6/6", coverageDetail: "all YES", note: "Share work-in-progress with stakeholders via URL. Every competitor offers this." },
        { id: "web-app-publishing", name: "Web app publishing & hosting", priority: "p0", coverage: "6/6", coverageDetail: "4 YES + 2 LIMITED", note: "All 6 competitors offer this — table stakes. One-click deploy to a public URL. Uno targets WebAssembly natively." },
        { id: "app-store-deployment", name: "App Store / Play Store deployment", priority: "p1", coverage: "5/6", coverageDetail: "2 YES + 3 LIMITED", note: "Only Dreamflow and Vibecode have full in-platform deployment. Integrated deployment would differentiate." },
        { id: "live-updates-after-publish", name: "Live updates after publish", priority: "p3", coverage: "1/6", coverageDetail: "1 YES (Builder), 5 LIMITED", note: "Auto-update for staging + manual promotion for production." }
      ]
    },
    {
      id: "desktop_platform",
      name: "I. Desktop & Platform Breadth",
      features: [
        { id: "cross-platform-7-targets", name: "Cross-platform (7+ targets)", priority: "p0", coverage: "0/6", coverageDetail: "Best competitor: 3 platforms", note: "This IS Uno. One C#/XAML project targeting iOS, Android, Web (WASM), Windows, macOS, Linux, embedded. Core value proposition — must be a first-class capability from day one.", highlight: true },
        { id: "desktop-app-target", name: "Desktop app target", priority: "p0", coverage: "0/6", coverageDetail: "1 LIMITED (Dreamflow)", note: "Zero competitors generate native desktop apps. Uno uniquely targets Windows, macOS, and Linux. This is a defining capability, not optional.", highlight: true },
        { id: "embedded-iot-targets", name: "Embedded / IoT targets", priority: "p2", coverage: "0/6", coverageDetail: "none", note: "Uno runs on embedded Linux (Skia). No competitor touches this space. Niche but defensible." }
      ]
    },
    {
      id: "accessibility",
      name: "J. Accessibility & Output Quality",
      features: [
        { id: "accessible-output-wcag", name: "Accessible output by default (WCAG)", priority: "p1", coverage: "0/6", coverageDetail: "2 LIMITED", note: "No competitor systematically generates accessible output. Uno's controls include built-in automation peers. Legal requirement for enterprise customers (ADA, EAA). Competitive gap Uno is well-positioned to fill.", highlight: true },
        { id: "visual-regression-testing", name: "Visual regression testing", priority: "p2", coverage: "0/6", coverageDetail: "2 LIMITED", note: "Capture and compare screenshots across iterations and platforms. Multi-platform visual regression." },
        { id: "design-system-theming", name: "Design system / theming enforcement", priority: "p0", coverage: "5/6", coverageDetail: "2 YES + 3 LIMITED", note: "5/6 competitors have this. Uno Themes and SDS provide a structured token system — enforce compliance at generation time. Critical for enterprise consistency." }
      ]
    },
    {
      id: "ai_config",
      name: "K. AI Agent Configuration",
      features: [
        { id: "llm-model-selection", name: "LLM model selection", priority: "p1", coverage: "3/6", coverageDetail: "2 YES + 1 LIMITED", note: "Bolt (5 Claude models) and Tempo (7 models) let users choose. Builder has internal routing. Offer model-agnostic architecture." },
        { id: "local-self-hosted-ai", name: "Local / self-hosted AI execution", priority: "p2", coverage: "0/6", coverageDetail: "1 LIMITED (bolt.diy only)", note: "Enterprise and government need code to never leave their network. Unique enterprise offering.", highlight: true }
      ]
    },
    {
      id: "misc",
      name: "L. Misc",
      features: [
        { id: "credits-token-pricing", name: "Credits / token pricing", priority: "p0", coverage: "6/6", coverageDetail: "all YES", note: "Every competitor has a credit/token system. XAML-aware surgical edits could be more token-efficient — make this a selling point." },
        { id: "sample-templates", name: "Sample templates", priority: "p1", coverage: "3/6", coverageDetail: "3 YES", note: "Lowers the blank-canvas barrier. XAML-native templates would showcase cross-platform advantage." },
        { id: "in-app-feedback", name: "In-app feedback", priority: "p3", coverage: "4/6", coverageDetail: "4 YES", note: "Built-in bug report / feature request channel. Low effort, good for user signal." },
        { id: "starting-prompt", name: "Starting prompt", priority: "p0", coverage: "6/6", coverageDetail: "all YES", note: "Every competitor provides a starting prompt interface. This is a fundamental UX entry point for AI-assisted app generation." }
      ]
    }
  ]
};
