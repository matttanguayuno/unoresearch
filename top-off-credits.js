// Top-Off Credits Comparison Data & Renderer
const topOffCreditsData = {
  title: "Top-Off Credits Comparison",
  subtitle: "How AI dev tools handle pay-as-you-go credits, token purchases, and expiration policies.",
  lastUpdated: "April 2026",
  tools: [
    {
      name: "Bolt.new",
      topOff: true,
      topOffLabel: "Yes (reload tokens)",
      expiry: "No expiry",
      expiryIcon: "no-expiry",
      notes: "Unused tokens roll over to next month on Pro plans. Bolt uses a token-based system rather than dollar credits.",
      source: "https://bolt.new/pricing"
    },
    {
      name: "Tempo Labs",
      topOff: true,
      topOffLabel: "Yes ($50 for 250 credits)",
      expiry: "No expiry",
      expiryIcon: "no-expiry",
      notes: "Bonus credits purchased for paid plans explicitly do not expire — a strong differentiator.",
      source: "https://www.tempo.new"
    },
    {
      name: "Lovable",
      topOff: true,
      topOffLabel: "Yes (on-demand top-ups on Pro+)",
      expiry: "End of billing cycle",
      expiryIcon: "short",
      notes: "Pro and above plans include on-demand credit top-ups. Monthly credits reset each billing cycle; credit rollovers available on Pro+.",
      source: "https://lovable.dev/pricing"
    },
    {
      name: "Replit",
      topOff: true,
      topOffLabel: "Yes (credit packs)",
      expiry: "6 months",
      expiryIcon: "medium",
      notes: "Credit packs available in $100–$1,000 tiers with volume discounts. Packs expire 6 months after purchase, do not renew or roll over.",
      source: "https://docs.replit.com/billing/managing-spend"
    },
    {
      name: "Vercel v0",
      topOff: true,
      topOffLabel: "Yes (purchase additional credits)",
      expiry: "Unknown (see FAQ)",
      expiryIcon: "unknown",
      notes: "Team and Business plans allow purchasing additional credits shared across the team. Monthly included credits reset each cycle. Expiry details in their FAQ.",
      source: "https://v0.app/pricing"
    },
    {
      name: "Codex (OpenAI API)",
      topOff: true,
      topOffLabel: "Yes (prepaid API credits)",
      expiry: "1 year",
      expiryIcon: "long",
      notes: "Standard OpenAI prepaid billing — purchased credits expire after 1 year, are non-refundable. Auto-recharge available.",
      source: "https://help.openai.com/en/articles/8264644-what-is-prepaid-billing"
    },
    {
      name: "Builder.io",
      topOff: true,
      topOffLabel: "Yes (Agent credits, $25/500)",
      expiry: "Monthly reset",
      expiryIcon: "short",
      notes: "Uses an Agent credit system. Pro and Team plans include 500 credits/user/month; additional 500-credit packs available for $25/mo. Credits reset monthly.",
      source: "https://www.builder.io/pricing"
    },
    {
      name: "Cursor",
      topOff: false,
      topOffLabel: "No (subscription tiers only)",
      expiry: "N/A",
      expiryIcon: "na",
      notes: "Usage is tied to plan limits (Pro, Pro+, Ultra tiers at $20/$60/$200/mo). No separate credit purchase mechanism.",
      source: "https://www.cursor.com/pricing"
    },
    {
      name: "Vibecode.app",
      topOff: null,
      topOffLabel: "Unclear",
      expiry: "Unknown",
      expiryIcon: "unknown",
      notes: "Very limited public pricing info; likely subscription-based usage.",
      source: null
    },
    {
      name: "Dreamflow",
      topOff: null,
      topOffLabel: "Unclear / not publicly documented",
      expiry: "Unknown",
      expiryIcon: "unknown",
      notes: "No clear public pricing docs on top-ups; likely usage bundled in plans or custom pricing.",
      source: null
    }
  ],
  corrections: [
    {
      tool: "Builder.io",
      original: 'Not really a "credits" model',
      corrected: "Builder.io now uses Agent credits. Additional 500-credit packs available at $25/mo on Pro and Team plans."
    },
    {
      tool: "Lovable",
      original: "Limited / tied to plans",
      corrected: "Lovable Pro and above now offer explicit on-demand credit top-ups with credit rollovers."
    },
    {
      tool: "Vercel v0",
      original: "~1 year expiry",
      corrected: "Could not confirm the ~1 year claim from public sources. v0's FAQ references purchased credit expiry but the answer is behind an accordion."
    }
  ]
};

let topOffCreditsInitialized = false;

function initTopOffCredits() {
  if (topOffCreditsInitialized) return;
  topOffCreditsInitialized = true;

  const container = document.getElementById('top-off-credits-content');
  if (!container) return;

  const d = topOffCreditsData;

  function topOffIcon(val) {
    if (val === true) return '<span class="toc-icon toc-yes" title="Yes">✅</span>';
    if (val === false) return '<span class="toc-icon toc-no" title="No">❌</span>';
    return '<span class="toc-icon toc-unknown" title="Unclear">❓</span>';
  }

  // Sort: tools with top-off first, then alphabetical
  const sorted = [...d.tools].sort((a, b) => {
    const av = a.topOff === true ? 0 : a.topOff === false ? 2 : 1;
    const bv = b.topOff === true ? 0 : b.topOff === false ? 2 : 1;
    if (av !== bv) return av - bv;
    return a.name.localeCompare(b.name);
  });

  container.innerHTML = `
    <div class="toc-page">
      <div class="toc-hero">
        <h1 class="toc-hero-title">${d.title}</h1>
      </div>

      <table class="feature-grid-table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Top-Off Credits?</th>
            <th>Expiry</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map(t => `
            <tr>
              <td class="feature-cell">
                ${t.source ? `<a href="${t.source}" target="_blank" rel="noopener noreferrer">${t.name}</a>` : t.name}
              </td>
              <td class="status-cell">
                ${topOffIcon(t.topOff)}
                <span class="toc-topoff-label">${t.topOffLabel}</span>
              </td>
              <td class="status-cell">
                ${t.expiry}
              </td>
              <td>${t.notes}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
