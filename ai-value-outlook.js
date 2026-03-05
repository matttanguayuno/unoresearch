// ============================================================
// Uno + AI Value Outlook - Interactive Page Module
// ============================================================
// Content model: edit the AI_VALUE_MODEL object below to update
// all sections, bullets, scenarios, and timeline items.
// ============================================================

var AI_VALUE_MODEL = {
  positioning: {
    exec: "Uno is the cross-platform runtime layer that makes AI-generated apps reliable, testable, and shippable.",
    product: "Uno + Studio Live turns agentic design-to-code into a deterministic build/test/deploy pipeline across platforms.",
    tech: "Uno provides a stable, deterministic abstraction (runtime + rendering + tooling) that AI agents can target and verify."
  },
  kpis: {
    exec: [
      { label: "Thesis", value: "AI reduces code-writing friction, not platform complexity." },
      { label: "Uno\u2019s durable value", value: "Deterministic cross-platform runtime + toolchain." },
      { label: "Winning posture", value: "Agent-first build/test/deploy substrate." }
    ],
    product: [
      { label: "User promise", value: "One prompt \u2192 multi-step pipeline \u2192 cross-platform app." },
      { label: "Differentiator", value: "Auditable, deterministic iteration loop." },
      { label: "Moat", value: "Deep platform integrations + consistent UI semantics." }
    ],
    tech: [
      { label: "Hard parts", value: "Rendering, perf, OS APIs, packaging, store compliance." },
      { label: "AI sweet spot", value: "Generate code + run pipelines + auto-fix regressions." },
      { label: "Critical enabler", value: "Stable runtime surface area + test harness." }
    ]
  },
  replaceVsCant: {
    replace: [
      "Boilerplate UI scaffolding and repetitive glue code",
      "Simple CRUD apps and standard integration patterns",
      "\u201CFirst draft\u201D layouts and component wiring",
      "Some debugging and refactoring (especially with agent loops)"
    ],
    cant: [
      "Eliminating the need for runtimes, rendering engines, and platform APIs",
      "Guaranteeing consistent behavior across OSes without deterministic abstractions",
      "Owning the app-store/build signing/release ecosystem automatically (without tooling)",
      "Performance tuning, accessibility nuance, and platform-specific edge cases at scale"
    ]
  },
  // Timeline (AI + Industry, merged & de-duplicated)
  timeline: [
    // --- Tier 1: Near-term ---
    { name: "Agentic orchestration & planning",
      desc: "AI agents plan, execute, test, and iterate autonomously \u2014 prompt \u2192 generate \u2192 build \u2192 test \u2192 preview \u2192 iterate.",
      detail: "Production-ready for constrained domains now; unreliable for open-ended tasks. Studio Live\u2019s explicit agent tools (build, publish, screenshot) are well-positioned. Multi-step workflows with conditional branching are the next frontier.",
      action: "Design agent tool pipelines with explicit, auditable step-by-step replay. Make the loop inspectable and replayable.",
      start: 0, end: 18, tier: 1 },
    { name: "Deterministic & auditable AI execution",
      desc: "Enterprises demand reproducible AI runs, explainable outputs, and \u2018why did the AI do this?\u2019 traceability.",
      detail: "Non-deterministic black-box generation is a dealbreaker for regulated industries. Studio Live\u2019s explicit tool model is a massive advantage \u2014 every agent action is a defined tool call, not opaque text generation.",
      action: "Implement deterministic agent runs with step replay. Generate diff + rationale per action. Make the audit trail a first-class feature.",
      start: 0, end: 18, tier: 1 },
    { name: "Token cost & efficiency optimization",
      desc: "As AI usage scales, token costs become a board-level concern. Tools that minimize token consumption per change gain economic advantage.",
      detail: "Diff-aware generation (Lovable, Bolt) already saves significant tokens. Semantic XAML editing is inherently more token-efficient than full-file text regeneration. This is an economic moat, not just technical optimization.",
      action: "Leverage XAML structure for surgical edits: modify a control\u2019s properties without re-sending the entire file. Benchmark token usage vs competitors.",
      start: 0, end: 12, tier: 1 },
    { name: "AI-native QA & cross-platform testing",
      desc: "Visual regression + multi-platform UI validation becomes table stakes; agents write, run, and maintain tests alongside code.",
      detail: "AI will raise the bar: agents will run full visual regression suites across every target on every commit. Cross-platform UI testing remains largely unsolved \u2014 first-mover advantage is significant. Frameworks with deterministic rendering and easy screenshot hooks will dominate.",
      action: "Generate platform-aware UI tests. Validate rendering across iOS, Android, Web, and Desktop. Auto-create accessibility audits for generated screens.",
      start: 0, end: 24, tier: 1 },
    { name: "Frameworks become \u201Ctargets\u201D",
      desc: "Agents prefer stable, deterministic APIs and layouts.",
      detail: "Today developers pick a framework; tomorrow AI agents will pick one. Agents optimize for predictability: stable APIs, consistent behavior across platforms, and fast feedback loops. Frameworks that break between versions or behave differently per platform will be deprioritized by code-generation models. Uno\u2019s single XAML surface and deterministic rendering make it a natural agent target.",
      start: 6, end: 24, tier: 1 },
    { name: "Design \u2194 code round-tripping",
      desc: "Bidirectional sync between design tools and code \u2014 from initial generation through ongoing drift control.",
      detail: "The hard part is maintaining semantic alignment over time, not the initial generation. Themes, tokens, and component libraries will be generated from prompts or Figma and continuously validated. Uno\u2019s theming infrastructure and Studio Live\u2019s design-to-code direction are well-positioned.",
      action: "Develop XAML \u2194 design tool mapping. Support Uno Themes / SDS token import from Figma. Generate XAML that references design system resources, not hardcoded values.",
      start: 0, end: 24, tier: 1 },
    { name: "AI-generated backend & data models",
      desc: "Most AI tools focus on UI generation, but real apps need auth, data models, APIs, and state management.",
      detail: "Backend generation remains shallow and opinionated across all competitors. The gap between \u2018generated UI\u2019 and \u2018working application\u2019 remains the biggest user pain point. No competitor does cross-platform backend generation well.",
      action: "Generate .NET backend scaffolding aligned with XAML UI. Shared contracts (DTOs), strong end-to-end typing, and API integration that matches the generated frontend.",
      start: 6, end: 24, tier: 1 },
    // --- Tier 2: Medium-term ---
    { name: "Multimodal context ingestion",
      desc: "Feeding screenshots, recordings, design artifacts, and error states into AI workflows as context \u2014 not just text prompts.",
      detail: "Context quality determines generation quality. Tools that can ingest visual context (screenshots of bugs, recordings of desired behavior, design comps) produce better results.",
      action: "Support screenshot/recording \u2192 UI generation workflows. Accept Figma frames, error screenshots, and visual references as prompt context.",
      start: 0, end: 18, tier: 2 },
    { name: "Multi-agent team workflows",
      desc: "Teams where multiple agents act on the same project, coordinated through shared state, PRs, and governance rules.",
      detail: "Adoption will be enterprise-led and governance-heavy. GitHub Copilot Workspace and Devin hint at this future. Designing for multi-agent coordination from the start matters.",
      action: "Design Studio Live\u2019s governance model to support multiple agents per project. Shared context, conflict prevention, and coordinated PRs.",
      start: 12, end: 24, tier: 2 },
    { name: "Autonomous deployment pipelines",
      desc: "Agents manage versions, packaging, and rollout checks.",
      detail: "End-to-end automation will extend past code generation into packaging, signing, store submission, and staged rollouts. Agents will own the entire lifecycle from commit to production. Frameworks with well-defined CLI/API hooks for build, publish, and health-check steps will integrate cleanly.",
      start: 24, end: 48, tier: 2 },
    { name: "Cross-platform consistency is a premium",
      desc: "AI increases output volume; consistency becomes the bottleneck.",
      detail: "When AI can generate screens in minutes, the hard problem shifts from \u201Cbuild it\u201D to \u201Cmake sure it looks and works the same everywhere.\u201D Teams shipping to web, iOS, Android, macOS, and desktop will pay a growing tax for inconsistencies \u2014 or choose a framework that guarantees parity.",
      start: 24, end: 60, tier: 2 },
    { name: "Enterprise compliance & governance",
      desc: "SOC2/ISO compliance, data residency, on-prem/private AI options, and IP ownership guarantees.",
      detail: "Critical for Uno\u2019s enterprise audience. A slow-burn differentiator. Most competitors ignore enterprise constraints entirely. Being ready when procurement teams ask these questions is a competitive advantage.",
      action: "Plan for private/on-prem AI deployment options. Ensure IP ownership clarity for generated code. Build compliance documentation into the product story early.",
      start: 18, end: 30, tier: 2 },
    // --- Tier 3: Long-term ---
    { name: "Local / hybrid AI execution",
      desc: "Local diffing, local validation, and partial offline operation \u2014 hybrid architectures reducing cost and improving privacy.",
      detail: "Reduces cost, improves privacy, and increases responsiveness. Particularly relevant for enterprises with data sensitivity requirements. Consider hybrid architecture: cloud for generation, local for validation and preview.",
      action: "Evaluate local model execution for validation and diffing. Track on-device model capabilities.",
      start: 18, end: 30, tier: 3 },
    { name: "AI app factories at scale",
      desc: "Tiny teams ship many apps; maintenance automation matters most.",
      detail: "Small teams (or even solo developers) will use AI to ship dozens of apps instead of one. At that scale, the bottleneck is maintenance: dependency updates, platform changes, regression fixes, and consistency across a portfolio. The framework that automates maintenance and provides a single surface for agents to manage wins the portfolio play.",
      start: 48, end: 84, tier: 3 },
    { name: "Runtime layers consolidate",
      desc: "Winners provide the most reliable substrate for agent execution.",
      detail: "Over time, development will converge on a few runtime substrates that agents trust: predictable behavior, broad platform reach, and strong tooling hooks. Frameworks that can\u2019t prove reliability will be abstracted away. This is both a threat and an opportunity for Uno \u2014 winning means being the substrate; losing means being hidden behind one.",
      start: 60, end: 84, tier: 3 }
  ],
  strategicPosition: [
    // --- Strengths ---
    { level: "good", title: "Determinism", desc: "Agents need predictable layout/render behavior to test and auto-fix reliably.", unoAngle: ["Consistent XAML semantics", "Single abstraction surface"] },
    { level: "good", title: "Single codebase leverage", desc: "AI can write 4 codebases, but you still maintain 4 systems; unified targets compound value.", unoAngle: ["Shared logic & UI", "Unified CI & release"] },
    { level: "good", title: "Agent toolability", desc: "Frameworks that expose build/test/screenshot hooks become \u201Cagent-native\u201D.", unoAngle: ["Build hooks", "Preview/screenshot loops (Studio Live direction)"] },
    // --- Competitive pressure ---
    { level: "warn", title: "Competitive pressure from AI builders", desc: "AI-native builders may abstract frameworks away if they own end-to-end deployment.", mitigation: "Partner/plug into builders. Be the runtime layer they target." },
    { level: "warn", title: "Web platform keeps eating \u201Cnative-needed\u201D territory", desc: "If browser engines keep adding layout primitives, offline-first capabilities, high-performance rendering, and native bridges, the set of apps that truly require native-quality UI may shrink.", mitigation: "Lean into \u201Cnative-grade + deterministic + testable\u201D and make WASM a first-class tier." },
    { level: "warn", title: "Positioning lag: \u201Cjust another cross-platform framework\u201D", desc: "If Uno\u2019s story remains \u201Ccross-platform framework\u201D while the market shifts to \u201CAI ships products,\u201D AI-first teams will assume Uno is a pre-agent toolchain.", mitigation: "Reposition as AI-ready substrate + trust layer (agent loops, verification, audits, reproducibility)." },
    { level: "warn", title: "Agent-toolability gap vs ecosystems with tighter loops", desc: "If React Native / Flutter / MAUI offer clean programmatic loops before Uno, AI systems will default-target those ecosystems.", mitigation: "First-class automation + golden diffs + SDK integrations that make Uno the lowest-friction target." },
    { level: "warn", title: "Platform compliance & distribution as choke point", desc: "Generating UI is cheap; shipping reliably is hard. If Uno can\u2019t make signing, packaging, store compliance agent-friendly, teams will route around it.", mitigation: "\u201CShip-ability\u201D features: packaging APIs, compliance checks, diagnostics, and reproducible release pipelines." },
    // --- Existential risks ---
    { level: "bad", title: "Existential risk: platform/runtime shifts", desc: "Not \u201CAI replaces Uno\u201D, but platform/runtime shifts could reduce the need for native layers entirely.", mitigation: "WASM strength helps. Native + web coverage hedges against any single platform\u2019s dominance." },
    { level: "bad", title: "AI app factories disintermediate framework choice", desc: "If platforms like Bolt/Lovable or future app factories own generation \u2192 build \u2192 runtime \u2192 deployment, developers may never explicitly choose a framework.", mitigation: "Be the easiest, most reliable \u201Cruntime target\u201D for agents + builders (APIs, templates, compliance)." }
  ],
  roadmap: {
    exec: [
      { p: "Now", title: "Reposition Uno as the AI-ready cross-platform substrate", desc: "Shift messaging from \u2018write once, run anywhere\u2019 to \u2018the runtime layer that makes AI-generated apps reliable, testable, and shippable across platforms.\u2019" },
      { p: "Now", title: "Make the agent loop the centerpiece of Studio Live", desc: "Surface the generate \u2192 build \u2192 test \u2192 preview \u2192 iterate cycle as the primary product story. Every demo should start from a prompt, not a blank editor." },
      { p: "Next", title: "Establish distribution partnerships with AI builders", desc: "Integrate Uno as a runtime/target option inside Bolt, Lovable, v0, and similar tools. Be available where AI-first teams already work instead of requiring them to come to Uno." },
      { p: "Next", title: "Ship a cross-platform trust layer", desc: "Visual regression baselines, snapshot comparison across platforms, and reproducible builds\u2014give executives proof that AI output meets quality bars." },
      { p: "Later", title: "Build the ecosystem flywheel", desc: "Once positioning and partnerships are in place, invest in community, case studies, and analyst coverage that reinforces the substrate narrative." }
    ],
    product: [
      { p: "Now", title: "Agentic pipelines as the product surface", desc: "The pipeline (actions, logs, diffs, checkpoints) is the product\u2014not just the generated code. Users should see and control the iteration loop, not just the output." },
      { p: "Now", title: "Design-system generation and drift control", desc: "Prompt or Figma \u2192 theme tokens \u2192 components \u2192 automated cross-platform parity checks. Keep design intent and shipped UI in sync continuously." },
      { p: "Next", title: "One-click multi-platform demo deployments", desc: "After generation, let users see their app running on web, desktop, and mobile with a single action. Reduce time-to-proof from hours to seconds." },
      { p: "Next", title: "Agent-friendly project templates", desc: "Curated, well-documented app shells that AI agents can reliably extend. Templates should include test harnesses and snapshot baselines out of the box." },
      { p: "Later", title: "Portfolio management for AI-generated apps", desc: "Dashboard for teams shipping many apps: track consistency, manage updates across a fleet, and surface regressions at portfolio scale." }
    ],
    tech: [
      { p: "Now", title: "First-class automation hooks (CLI/API)", desc: "Expose stable programmatic interfaces for: create project, add screens/components, build, run, test, screenshot, package/sign, publish, collect logs. Goal: an agent can run the full loop without \u201CUI driving\u201D IDEs." },
      { p: "Now", title: "Golden baselines + automated diffs (the trust layer)", desc: "Deterministic screenshots per platform/device + diff reports + artifact bundling (logs, perf counters, layout trees). Goal: agents can self-verify and fix regressions, and teams can audit changes." },
      { p: "Next", title: "Platform edge-case harness (codify the pain)", desc: "Encode known OS/browser quirks (safe areas/notches, keyboard behavior, text rendering, accessibility tree differences, input edge cases) into repeatable tests. Goal: turn tribal knowledge into a machine-checkable suite." },
      { p: "Next", title: "Agent integration SDK (be the \u201Cruntime target\u201D)", desc: "A lightweight SDK enabling third-party AI tools to target Uno: generate, apply, build, test, screenshot, diff, deploy through one surface area. Goal: \u201CUno inside\u201D becomes easy for builders to adopt." },
      { p: "Later", title: "Telemetry-driven quality loops (production \u2192 fixes)", desc: "Feed anonymized real-world crash signals + rendering anomalies into: automated issue clustering, suggested fixes, and framework hardening. Goal: close the loop continuously, not quarterly." },
      { p: "Now", title: "Reference pipelines & templates", desc: "Ship a small set of agent-ready templates (navigation shells, auth, settings, forms, offline caching) + \u201Cknown-good\u201D CI pipelines. Goal: reduce variance and make Uno the default starting point for agents." }
    ]
  }
};

// ============================================================
// Rendering Engine
// ============================================================
(function () {
  var avViewMode = "exec";
  var MAX_MONTHS = 84; // 7 years for timeline axis

  function avEl(tag, attrs, children) {
    attrs = attrs || {};
    children = children || [];
    var n = document.createElement(tag);
    for (var k in attrs) {
      if (!attrs.hasOwnProperty(k)) continue;
      var v = attrs[k];
      if (k === "cls") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.indexOf("on") === 0 && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    [].concat(children).forEach(function (c) {
      if (c == null) return;
      if (typeof c === "string") n.appendChild(document.createTextNode(c));
      else n.appendChild(c);
    });
    return n;
  }

  function dotCls(level) {
    return "av-dot " + (level === "good" ? "av-dot--good" : level === "warn" ? "av-dot--warn" : "av-dot--bad");
  }

  // --- KPIs ---
  var kpiColors = ["blue", "violet", "green", "rose", "cyan"];
  function renderAvKpis() {
    var host = document.getElementById("av-kpis");
    if (!host) return;
    host.innerHTML = "";
    var items = AI_VALUE_MODEL.kpis[avViewMode] || [];
    items.forEach(function (it, idx) {
      host.appendChild(
        avEl("div", { cls: "av-kpi av-kpi--color", "data-color": kpiColors[idx % kpiColors.length] }, [
          avEl("div", { cls: "av-kpi__label" }, it.label),
          avEl("div", { cls: "av-kpi__value" }, it.value)
        ])
      );
    });
  }

  // --- Replace vs Can't ---
  function renderAvReplaceCant() {
    var host = document.getElementById("av-replace-cant");
    if (!host) return;
    host.innerHTML = "";
    var left = avEl("div", { cls: "av-kpi av-kpi--replace" }, [
      avEl("div", { cls: "av-kpi__label" }, [
        avEl("span", { cls: "av-rc-icon av-rc-icon--replace", "aria-hidden": "true", html: "&#9888;" }),
        "AI replaces"
      ]),
      avEl("ul", { cls: "av-list" }, AI_VALUE_MODEL.replaceVsCant.replace.map(function (x) { return avEl("li", {}, x); }))
    ]);
    var right = avEl("div", { cls: "av-kpi av-kpi--cant" }, [
      avEl("div", { cls: "av-kpi__label" }, [
        avEl("span", { cls: "av-rc-icon av-rc-icon--cant", "aria-hidden": "true", html: "&#10004;" }),
        "AI can\u2019t replace"
      ]),
      avEl("ul", { cls: "av-list" }, AI_VALUE_MODEL.replaceVsCant.cant.map(function (x) { return avEl("li", {}, x); }))
    ]);
    host.appendChild(avEl("div", { cls: "av-row" }, [left, right]));
  }

  // --- Visual Timeline (horizontal axis) ---
  function renderAvTimeline() {
    var host = document.getElementById("av-timeline");
    if (!host) return;
    host.innerHTML = "";

    var tierLabels = { 1: "Near-term", 2: "Medium-term", 3: "Long-term" };
    var tierClasses = { 1: "av-tl-tier-1", 2: "av-tl-tier-2", 3: "av-tl-tier-3" };
    var items = AI_VALUE_MODEL.timeline.slice().sort(function (a, b) {
      return (a.tier || 9) - (b.tier || 9) || a.start - b.start || a.end - b.end;
    });

    // Track
    var axisLabels = ["Now", "1y", "2y", "3y", "4y", "5y", "6y", "7y"];
    var track = avEl("div", { cls: "av-tl-track" }, [
      avEl("div", { cls: "av-tl-line" }),
      avEl("div", { cls: "av-tl-labels" }, axisLabels.map(function (lbl) {
        return avEl("span", { cls: "av-tl-label" }, lbl);
      }))
    ]);

    // Nodes
    var nodesContainer = avEl("div", { cls: "av-tl-nodes" });
    items.forEach(function (item, idx) {
      var leftPct = (item.start / MAX_MONTHS) * 100;
      var widthPct = ((item.end - item.start) / MAX_MONTHS) * 100;
      var topPx = idx * 56;
      var tierClass = tierClasses[item.tier] || "av-tl-tier-1";
      var tierLabel = tierLabels[item.tier] || "Near-term";

      // Build popup content
      var popupChildren = [
        avEl("div", { cls: "av-tl-popup-header" }, [
          avEl("span", { cls: "av-tl-badge " + tierClass }, tierLabel),
          avEl("strong", {}, item.name),
          avEl("button", { cls: "av-tl-popup-close", "aria-label": "Close", html: "&times;" })
        ]),
        avEl("p", { cls: "av-tl-popup-summary" }, item.desc),
        item.detail ? avEl("p", { cls: "av-tl-popup-detail" }, item.detail) : null
      ];
      if (item.action) {
        popupChildren.push(avEl("div", { cls: "av-tl-popup-action" }, [
          avEl("span", { cls: "av-mitigation-label" }, "Uno\u2019s action: "),
          item.action
        ]));
      }
      popupChildren.push(
        avEl("div", { cls: "av-tl-popup-meta" }, [
          avEl("span", {}, "Timeframe: " + (item.start === 0 ? "Now" : (item.start / 12).toFixed(0) + "y") + " \u2013 " + (item.end / 12).toFixed(0) + "y")
        ])
      );
      var popupContent = avEl("div", { cls: "av-tl-popup" }, popupChildren);
      var node = avEl("div", {
        cls: "av-tl-node " + tierClass,
        style: "left:" + leftPct + "%;width:" + widthPct + "%;top:" + topPx + "px;",
        tabindex: "0",
        role: "button",
        "aria-label": item.name
      }, [
        avEl("div", { cls: "av-tl-bar" }),
        avEl("div", { cls: "av-tl-node-label" }, [
          avEl("span", { cls: "av-tl-badge " + tierClass }, tierLabel),
          item.name
        ]),
        popupContent
      ]);

      // Toggle popup on click
      node.addEventListener("click", function (e) {
        e.stopPropagation();
        // Ignore clicks on the close button (handled separately)
        if (e.target.classList.contains("av-tl-popup-close")) {
          node.classList.remove("av-tl-node--open");
          return;
        }
        // Ignore clicks inside the popup content to allow text selection
        if (e.target.closest(".av-tl-popup") && !e.target.closest(".av-tl-popup-close")) return;
        var isOpen = node.classList.contains("av-tl-node--open");
        // Close all other open popups first
        var allOpen = nodesContainer.querySelectorAll(".av-tl-node--open");
        for (var j = 0; j < allOpen.length; j++) allOpen[j].classList.remove("av-tl-node--open");
        if (!isOpen) node.classList.add("av-tl-node--open");
      });
      node.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); node.click(); }
        if (e.key === "Escape") node.classList.remove("av-tl-node--open");
      });

      nodesContainer.appendChild(node);
    });

    nodesContainer.style.minHeight = (items.length * 56) + "px";

    var legend = avEl("div", { cls: "av-color-legend", style: "margin-bottom: 0.75rem;" }, [
      avEl("span", { cls: "av-legend-pill" }, [avEl("span", { cls: "av-tl-badge av-tl-tier-1", style: "margin-right:4px;" }, "Near-term"), "0\u20132 years"]),
      avEl("span", { cls: "av-legend-pill" }, [avEl("span", { cls: "av-tl-badge av-tl-tier-2", style: "margin-right:4px;" }, "Medium-term"), "2\u20135 years"]),
      avEl("span", { cls: "av-legend-pill" }, [avEl("span", { cls: "av-tl-badge av-tl-tier-3", style: "margin-right:4px;" }, "Long-term"), "5\u20137 years"])
    ]);
    host.appendChild(legend);
    host.appendChild(avEl("div", { cls: "av-tl-axis" }, [track, nodesContainer]));
  }


  // --- Strategic Position (strengths + risks, unified) ---
  function renderAvStrategicPosition() {
    var host = document.getElementById("av-strategic-position");
    if (!host) return;
    host.innerHTML = "";
    var list = AI_VALUE_MODEL.strategicPosition || [];
    list.forEach(function (r) {
      var left = avEl("div", { cls: "av-titem__left" }, [
        avEl("div", { cls: "av-titem__name" }, [
          avEl("span", { cls: dotCls(r.level), style: "margin-right:8px;" }),
          r.title
        ]),
        avEl("div", { cls: "av-titem__desc" }, r.desc)
      ]);
      var right = null;
      if (r.unoAngle) {
        right = avEl("div", { cls: "av-titem__right" }, [
          avEl("div", { cls: "av-titem__angle" }, [
            avEl("span", { cls: "av-angle-label" }, "Uno\u2019s angle"),
            avEl("ul", { cls: "av-angle-list" }, r.unoAngle.map(function (x) { return avEl("li", {}, x); }))
          ])
        ]);
      } else if (r.mitigation) {
        right = avEl("div", { cls: "av-titem__right" }, [
          avEl("div", { cls: "av-titem__mitigation" }, [
            avEl("span", { cls: "av-mitigation-label" }, "Mitigation signal"),
            avEl("p", { cls: "av-titem__mitigation-text" }, r.mitigation)
          ])
        ]);
      }
      host.appendChild(avEl("div", { cls: "av-titem av-titem--risk" }, [left, right]));
    });
  }

  // --- Roadmap ---
  function renderAvRoadmap() {
    var host = document.getElementById("av-roadmap");
    if (!host) return;
    host.innerHTML = "";
    var list = AI_VALUE_MODEL.roadmap[avViewMode] || [];
    list.forEach(function (a) {
      var phaseCls = "av-phase av-phase--" + a.p.toLowerCase();
      host.appendChild(
        avEl("div", { cls: "av-titem" }, [
          avEl("div", { cls: "av-titem__name" }, [
            avEl("span", { cls: phaseCls }, a.p),
            " " + a.title
          ]),
          avEl("div", { cls: "av-titem__desc" }, a.desc)
        ])
      );
    });
  }

  // --- Positioning ---
  function renderAvPositioning() {
    var posLine = document.getElementById("av-positioning-line");
    if (posLine) posLine.textContent = AI_VALUE_MODEL.positioning[avViewMode];
  }

  // --- View ---
  function setAvView(v) {
    avViewMode = v;
    document.querySelectorAll("[data-av-view]").forEach(function (x) {
      x.classList.toggle("active", x.getAttribute("data-av-view") === v);
    });
    renderAllAv();
  }

  function renderAllAv() {
    renderAvKpis();
    renderAvPositioning();
    renderAvReplaceCant();
    renderAvTimeline();
    renderAvStrategicPosition();
    renderAvRoadmap();
  }

  // --- Init ---
  window.initAiValueOutlook = function () {
    // Wire view chips
    document.querySelectorAll("[data-av-view]").forEach(function (chip) {
      chip.addEventListener("click", function () { setAvView(chip.getAttribute("data-av-view")); });
      chip.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAvView(chip.getAttribute("data-av-view")); }
      });
    });

    // Close timeline popups on outside click
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".av-tl-node")) {
        var allOpen = document.querySelectorAll(".av-tl-node--open");
        for (var i = 0; i < allOpen.length; i++) allOpen[i].classList.remove("av-tl-node--open");
      }
    });

    setAvView("exec");
  };
})();