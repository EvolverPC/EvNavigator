// js/data.js - Centralized Application Data - COMPLETE AND CORRECTED

const menuItems = [
    { id: 'home', label: 'Home', icon: `<svg>...</svg>`},
    { id: 'portco', label: 'PortCo', icon: `<svg>...</svg>`},
    { id: 'aria', label: 'Aria', icon: `<svg>...</svg>`},
    { id: 'workspace', label: "Workspace", icon: `<svg>...</svg>`},
    { id: 'modeling', label: 'Modeling', icon: `<svg>...</svg>`}
];

const techflow_anomalies = [
    { id: 'arr-comp', title: 'Anomaly #1: Non-Standard ARR Composition', issue: 'ARR includes projected perpetual revenue spread over 18 months', severity: 'CRITICAL', sourceDocuments: ['Financial_Statements_2024.pdf', 'Revenue_Recognition_Policy.pdf'], impact: 'Overstated recurring revenue metrics', analysis: 'The reported $12M ARR is composed of multiple revenue streams that do not align with generally accepted ARR definitions. Our analysis found that approximately 23% ($2.76M) of the reported ARR consists of projected perpetual license revenue spread over 18 months post-contract signing. Additionally, maintenance fees on legacy perpetual contracts comprise another 18% ($2.16M). Only 59% ($7.08M) represents true committed subscription revenue. This composition significantly overstates the company\'s recurring revenue quality and predictability, which is a key metric for SaaS valuations.' },
    { id: 'maint-fee', title: 'Anomaly #2: Inconsistent Maintenance Fee Structure', issue: 'Maintenance fees vary from 12% to 28% of contract value', severity: 'HIGH', sourceDocuments: ['Contract_Analysis_2023-2024.xlsx', 'Customer_Agreements_Sample.pdf'], impact: 'Revenue predictability and pricing strategy concerns', analysis: 'Our contract analysis revealed significant inconsistencies in maintenance fee structures across the customer base. Of the 247 perpetual license contracts reviewed, 34% charge maintenance fees below the industry minimum of 17%, with some as low as 12%. This suggests either aggressive pricing to win deals or lack of pricing discipline. The wide variance (12%-28%) indicates inconsistent value delivery or negotiation practices. Industry benchmarks typically see maintenance fees between 18-22% for mature software companies, making TechFlow\'s structure both below market and highly variable.' },
    { id: 'product-launch', title: 'Anomaly #3: Failed Recent Product Launches', issue: 'Zero sales recorded for 3 most recent product launches', severity: 'CRITICAL', sourceDocuments: ['Product_Launch_Reports_2024-2025.pdf', 'Sales_Pipeline_Analysis.xlsx'], impact: 'Innovation capacity and market fit concerns', analysis: "Three recent product launches have generated zero revenue to date: 'TechFlow Analytics Pro' (launched March 2024), 'TechFlow Mobile Suite' (launched September 2024), and 'TechFlow AI Assistant' (launched February 2025). Combined R&D investment for these products totaled $3.2M over 18 months. This pattern suggests potential issues with product-market fit, go-to-market execution, or competitive positioning. The lack of any sales traction, even pilot programs or trials, raises questions about the company's innovation pipeline and ability to expand beyond its core offerings. This could significantly impact future growth projections and the sustainability of R&D investments." }
];

const techflow_minorObservations = [
    { id: 'obs1', category: 'Documentation', text: 'Inconsistent naming conventions found across multiple technical documents.', impact: 'Minor risk of confusion during technical hand-off.' },
    { id: 'obs2', category: 'Technical', text: 'Code repository shows multiple active coding standards (Python PEP8, Google Style Guide).', impact: 'Increases code complexity and onboarding time for new developers.' },
    { id: 'obs3', category: 'Commercial', text: 'Sample SOWs reviewed lack specific, measurable deliverables in 40% of cases.', impact: 'Risk of scope creep and customer disputes.' },
    { id: 'obs4', category: 'HR', text: 'High employee turnover (35% YoY) noted in the junior engineering department.', impact: 'Indicates potential management or compensation issues; loss of institutional knowledge.' },
    { id: 'obs5', category: 'Finance', text: 'Expense reporting process is entirely manual and requires physical signatures.', impact: 'Inefficient process, delays financial closing.' },
    { id: 'obs6', category: 'Legal', text: 'Several enterprise contracts are missing signatures from the customer side.', impact: 'Potential enforceability issues.' },
    { id: 'obs7', category: 'Security', text: 'Multi-factor authentication is not enforced on key internal systems.', impact: 'Increased risk of unauthorized access.' },
    { id: 'obs8', category: 'Sales', text: 'Salesforce data shows low adoption of contact logging by AEs.', impact: 'Incomplete customer interaction history hinders forecasting.' },
    { id: 'obs9', category: 'Marketing', text: 'Website has a low Lighthouse performance score (65/100).', impact: 'Poor user experience and negative impact on SEO.' },
    { id: 'obs10', category: 'Product', text: 'No formal process for collecting and prioritizing customer feature requests.', impact: 'Risk of building features that lack market demand.' },
    { id: 'obs11', category: 'BI', text: 'Key business dashboards are manually updated in spreadsheets.', impact: 'High risk of data errors and significant time sink for analysts.' },
    { id: 'obs12', category: 'Operations', text: 'Vendor contract review process is ad-hoc and lacks a central repository.', impact: 'Potential for auto-renewals of unused or unfavorable services.' }
];

const techflow_workstreamData = [
    { id: 'business', title: 'Business & Strategy', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`, cards: [{label: "Market Size (TAM)", value: "$5.2B"}, {label: "Market CAGR", value: "18%"}, {label: "Competitive Moat", value: "Medium"}], suggestedQuestions: ["Summarize the competitive landscape and TechFlow's position.", "What are the key market trends impacting the company?", "Analyze the credibility of the 5-year strategic plan."], suggestedActions: [{ text: "Draft a 'Go-to-Market' slide for the IC memo.", description: "Generate a pre-formatted slide summarizing the GTM strategy for your Investment Committee memo." }, { text: "Prioritize 'Platform Consolidation' risk in the 100-day plan.", description: "Add this key risk to the 100-day plan to ensure it is addressed post-close." }, { text: "Generate key questions for the CEO regarding the strategic plan.", description: "Create a list of targeted questions to challenge the assumptions in the management's plan." }] },
    { id: 'commercial', title: 'Commercial & Customer', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-teal-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, cards: [{label: "LTV:CAC Ratio", value: "3.1x"}, {label: "Net Revenue Retention", value: "105%"}, {label: "Logo Churn", value: "18%"}], suggestedQuestions: ["Show the Quality of Revenue report.", "Analyze the efficiency of the sales and marketing funnel.", "Identify the top 10 customers by revenue and any concentration risks."], suggestedActions: [{ text: "Generate a pricing model with 'Good-Better-Best' tiers.", description: "Create a draft pricing model to improve monetization and expansion revenue." }, { text: "Draft an email to the Head of Sales about the MQL-to-SQL drop-off.", description: "Generate a pre-written email to kick off a conversation about funnel efficiency." }, { text: "Add 'Customer Concentration' as a key risk to the workspace.", description: "Flag this critical issue in your workspace to track it as part of the diligence process." }] },
    { id: 'tech', title: 'Technology & Operations', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-indigo-600"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" x2="12" y1="2" y2="22"/></svg>`, cards: [{label: "Technical Debt Score", value: "High"}, {label: "Core App Uptime", value: "99.8%"}, {label: "Dev Velocity", value: "Low"}], suggestedQuestions: ["Summarize the key architectural risks and their potential cost to remediate.", "How does the R&D team's velocity compare to industry benchmarks?", "What is the plan for migrating off the legacy monolithic architecture?"], suggestedActions: [{ text: "Estimate the cost and timeline for a monolith-to-microservices migration.", description: "Generate a high-level estimate for the cost and timeline of this critical project." }, { text: "Generate a job description for a 'Lead DevOps Engineer'.", description: "Create a job description to hire the talent needed to improve developer velocity." }, { text: "Draft an IC memo slide on technical debt.", description: "Summarize the technical debt issue and mitigation plan for the Investment Committee." }] },
    { id: 'financial', title: 'Financial & Risk', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-red-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`, cards: [{label: "Gross Margin", value: "72%"}, {label: "Monthly Burn Rate", value: "$450K"}, {label: "Cash Runway", value: "11 mos"}], suggestedQuestions: ["Provide an overview of the current registered anomalies.", "What are the key risks to achieving the 2025 forecast?", "Analyze the quality of earnings and identify any one-time adjustments."], suggestedActions: [{ text: "Draft an email to the CFO requesting clarification on revenue recognition policies.", description: "Generate a pre-written email to the CFO to get clarity on a key accounting policy." }, { text: "Request all contracts with non-standard terms be uploaded to the data room.", description: "Log a formal request to the deal team to gather critical legal documents." }, { text: "Build the 'Base Case' financial model.", description: "Create a more realistic financial model based on diligence findings, not just management's view." }] }
];

const cloudvantage_workstreamData = [
    { id: 'integration', title: 'NewCo Integration', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-purple-600"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`, cards: [{label: "100-Day Plan", value: "On Track"}, {label: "Synergy Target", value: "$2.1M"}, {label: "Team Morale", value: "Medium"}], suggestedQuestions: ["Generate a 100-day integration plan for the NewCo acquisition.", "Analyze the cross-sell opportunities between CloudVantage and NewCo products.", "Draft a communication plan to NewCo customers about the acquisition."], suggestedActions: [{ text: "Draft a communication plan to NewCo customers about the acquisition.", description: "Generate a customer-facing email to announce the acquisition and reassure them." }, { text: "Identify key integration risks.", description: "Analyze potential culture clashes, system incompatibilities, and leadership gaps." }, { text: "Create a synergy tracking dashboard.", description: "Build a simple dashboard to monitor the realization of cost and revenue synergies." }] },
    { id: 'sales', title: 'Sales & GTM', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`, cards: [{label: "Quota Attainment", value: "103%"}, {label: "Pipeline Coverage", value: "3.5x"}, {label: "NewCo Product Sales", value: "$250k"}], suggestedQuestions: ["Process the renewals for the NewCo acquisition customers.", "Analyze the current sales compensation plan for the Enterprise team.", "What are the biggest risks in the current sales pipeline?"], suggestedActions: [{ text: "Draft a revised sales comp plan.", description: "Create a new compensation plan that incentivizes cross-selling NewCo products." }, { text: "Generate talking points for the sales team about top pipeline risks.", description: "Equip the sales team with strategies to de-risk key deals in the pipeline." }, { text: "Analyze sales rep performance.", description: "Identify top performers and reps who may need additional coaching." }] },
    { id: 'product', title: 'Product & Engineering', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-indigo-600"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" x2="12" y1="2" y2="22"/></svg>`, cards: [{label: "Roadmap Progress", value: "75%"}, {label: "NPS", value: "52"}, {label: "Ticket Volume", value: "-15% WoW"}], suggestedQuestions: ["What are the key drivers behind our current NPS score?", "Analyze the recent trends in customer support ticket volume.", "What is the status of the NewCo product integration?"], suggestedActions: [{ text: "Draft a product roadmap update for the board.", description: "Create a summary slide of recent progress and upcoming feature releases." }, { text: "Analyze the root cause of recent support tickets.", description: "Identify common themes in customer issues to inform product improvements." }, { text: "Generate a list of questions for the Head of Engineering about the NewCo integration.", description: "Prepare for a technical review of the product integration status." }] },
    { id: 'finance', title: 'Financial Performance', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-green-600"><path d="M12 2.02c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4h-6"/><path d="M12 18V6"/></svg>`, cards: [{label: "ARR Growth (YoY)", value: "28%"}, {label: "EBITDA Margin", value: "31%"}, {label: "NRR", value: "128%"}], suggestedQuestions: ["Generate a board-level summary of Q2 financial performance.", "Analyze the key drivers of our Net Revenue Retention.", "Model the financial impact of a 5% price increase on the legacy NewCo customer base."], suggestedActions: [{ text: "Model the financial impact of a 5% price increase on the legacy NewCo customer base.", description: "Create a scenario model to understand the potential impact of a price change." }, { text: "Draft an email to the CFO about the EBITDA margin dip.", description: "Prepare a data-driven inquiry to understand the variance against the target." }, { text: "Generate a cohort analysis of NRR.", description: "Break down Net Revenue Retention by customer start date to identify trends." }] }
];

const techflow_ariaResponses = {
    "Summarize the competitive landscape and TechFlow's position.": {
        id: 'competitive-landscape',
        title: "Competitive Landscape Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Competitive Landscape Analysis</h3><p class="response-subtitle">Source Documents: Market_Analysis_Gartner_2024.pdf, ...</p></div>
            <div class="build-item space-y-4"><div class="response-section-title">Key Competitors vs. TechFlow Solutions:</div><div class="bar-chart-container"><div class="bar-chart-item"><span class="bar-label">InnovateCorp</span><div class="bar-wrapper"><div class="bar" style="width: 75%; background-color: var(--accent-blue);">Market Leader</div></div></div><div class="bar-chart-item"><span class="bar-label">DataSystems</span><div class="bar-wrapper"><div class="bar" style="width: 60%; background-color: var(--accent-blue);">Established Player</div></div></div><div class="bar-chart-item"><span class="bar-label">TechFlow</span><div class="bar-wrapper"><div class="bar" style="width: 40%; background-color: var(--accent-teal);">Niche Challenger</div></div></div><div class="bar-chart-item"><span class="bar-label">AgileCloud</span><div class="bar-wrapper"><div class="bar" style="width: 35%; background-color: var(--accent-blue);">New Entrant</div></div></div></div></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="TechFlow operates as a niche challenger in a market dominated by InnovateCorp. While TechFlow has strong brand recognition in its specific vertical, it lacks the broad feature set and marketing budget of the leaders. Its primary competitive advantage is its deep domain expertise and customer service. The key risk is being squeezed between the feature-rich incumbents and more nimble new entrants like AgileCloud."></p></div>
            <div class="build-item judgement-box success"><p class="judgement-title">Judgement (High Confidence - 95%):</p><p class="judgement-text" data-typing-text="TechFlow has a defensible niche but faces significant scaling challenges. The investment thesis must focus on either deepening this niche or strategically expanding its feature set to compete more broadly."></p></div>
        </div>`,
        followUpQuestions: ["How does TechFlow's pricing compare to these competitors?", "What is the customer sentiment for InnovateCorp vs. TechFlow?", "Generate a SWOT analysis for TechFlow."]
    },
    "Provide an overview of the current registered anomalies.": {
        id: 'anomaly-overview',
        title: "Anomaly Detection Report",
        renderFunc: (state) => {
            const { keyRisks } = state.diligenceWorkspace;
            const renderAnomaly = (anomaly) => {
                const isFlagged = !!keyRisks[anomaly.id];
                const severityClass = anomaly.severity === 'CRITICAL' ? 'critical' : 'high';
                return `<div class="build-item space-y-3">
                    <div class="response-title-area">
                        <h3 class="response-title">${anomaly.title}</h3>
                        <button data-action="flag-response" data-response-id="${anomaly.id}" class="feedback-icon ${isFlagged ? 'filled' : ''}" title="Add to Workspace"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></button>
                    </div>
                    <div class="data-table-container"><table class="data-table"><thead><tr><th>Issue</th><th>Severity</th><th>Impact</th></tr></thead><tbody><tr><td>${anomaly.issue}</td><td><span class="status-badge ${severityClass}">${anomaly.severity}</span></td><td>${anomaly.impact}</td></tr></tbody></table></div>
                    <div class="analysis-box"><p class="response-text"><span class="font-bold">Analysis:</span> <span class="anomaly-analysis-text" data-typing-text="${anomaly.analysis}"></span></p></div>
                </div>`;
            };
            const renderMinorObservation = (obs) => {
                const isFlagged = !!keyRisks[obs.id];
                return `<div class="minor-observation-item">
                    <div><p class="font-semibold">${obs.category}: <span class="font-normal">${obs.text}</span></p></div>
                    <button data-action="flag-response" data-response-id="${obs.id}" class="feedback-icon ${isFlagged ? 'filled' : ''}" title="Add to Workspace"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></button>
                </div>`;
            };

            const minorObsExpanded = state.techflowAria.minorObservationsExpanded;

            return `<div id="anomaly-discovery-content" class="aria-response-content">
                <div class="build-item alert-callout error">
                    <h2 class="alert-callout-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>Significant Anomalies Detected</h2>
                    <p class="response-text" data-typing-text="Our Auto Due Diligence Agent has completed its analysis and identified 3 significant anomalies that require immediate attention. These findings could materially impact the investment decision and valuation model."></p>
                </div>
                ${techflow_anomalies.map(renderAnomaly).join('')}
                <div class="build-item card-base">
                    <button class="minor-observations-header" data-action="toggle-observations">
                        <h3 class="response-title">Minor Observations (${techflow_minorObservations.length})</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon ${minorObsExpanded ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="minor-observations-content ${minorObsExpanded ? 'expanded' : 'collapsed'}">
                        <div class="minor-observations-grid">${techflow_minorObservations.map(renderMinorObservation).join('')}</div>
                    </div>
                </div>
            </div>`;
        },
        followUpQuestions: ["Which anomaly has the biggest impact on valuation?", "Draft an email to the CFO about the ARR composition.", "What's the plan to fix the failed product launches?"]
    },
    "What are the key market trends impacting the company?": { 
        id: 'market-trends',
        title: "Key Market Trends Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Key Market Trends Analysis</h3><p class="response-subtitle">Source Documents: Industry_Analyst_Reports_2025.pdf, ...</p></div>
            <div class="build-item list-container"><div class="list-item"><span class="list-number" style="color:var(--accent-blue)">1</span><div><h4 class="list-title">AI Integration:</h4><p class="list-text" data-typing-text="Customers are increasingly demanding AI-powered features for automation and predictive analytics. TechFlow's recent 'AI Assistant' launch failure indicates a critical gap in this area."></p></div></div><div class="list-item"><span class="list-number" style="color:var(--accent-blue)">2</span><div><h4 class="list-title">Platform Consolidation:</h4><p class="list-text" data-typing-text="Enterprise buyers prefer integrated platforms over point solutions. TechFlow's standalone nature is a growing disadvantage against competitors like InnovateCorp who offer a full suite."></p></div></div><div class="list-item"><span class="list-number" style="color:var(--accent-blue)">3</span><div><h4 class="list-title">Data Privacy Regulations:</h4><p class="list-text" data-typing-text="Increased scrutiny on data handling (GDPR, CCPA) creates compliance overhead but also an opportunity for vendors who can demonstrate robust security, an area where TechFlow is currently average."></p></div></div></div>
            <div class="build-item judgement-box warning"><p class="judgement-title">Judgement (Medium Confidence - 80%):</p><p class="judgement-text" data-typing-text="The company is behind on two of the three most critical market trends (AI, Platform). This poses a significant threat to long-term growth unless the product roadmap is aggressively re-prioritized post-acquisition."></p></div>
        </div>`,
        followUpQuestions: ["How much would it cost to build a competitive AI feature?", "Which companies could TechFlow acquire to become a platform?", "Draft a slide on market trends for the IC memo."]
    },
    "Analyze the credibility of the 5-year strategic plan.": { 
        id: 'strategic-plan-credibility',
        title: "Strategic Plan Credibility Assessment",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Strategic Plan Credibility Assessment</h3><p class="response-subtitle">Source Documents: 5-Year_Strategic_Plan.pptx, ...</p></div>
            <div class="build-item"><div class="response-section-title">Plan vs. Reality Check:</div><div class="data-table-container"><table class="data-table"><thead><tr><th>Metric</th><th>Plan (YoY Growth)</th><th>Actual (LTM)</th><th>Credibility</th></tr></thead><tbody><tr><td>New ARR Growth</td><td>40%</td><td class="text-error">15%</td><td class="text-error">Low</td></tr><tr><td>Geographic Expansion (EMEA)</td><td>$5M ARR</td><td class="text-error">$0.5M ARR</td><td class="text-error">Low</td></tr><tr><td>Headcount Growth</td><td>25%</td><td class="text-success">22%</td><td class="text-success">High</td></tr></tbody></table></div></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="The strategic plan's revenue projections are overly optimistic and not grounded in recent performance. The plan assumes a 40% growth in new ARR, whereas the company has only achieved 15% in the last twelve months. The EMEA expansion target is significantly off-track. The plan lacks concrete initiatives to address the product gaps and competitive pressures."></p></div>
            <div class="build-item judgement-box error"><p class="judgement-title">Judgement (High Confidence - 95%):</p><p class="judgement-text" data-typing-text="The management's strategic plan is not credible and requires a complete overhaul. The financial model should be rebuilt using a more conservative, bottom-up approach based on historical performance and known risks."></p></div>
        </div>`,
        followUpQuestions: ["Build a more realistic 'Base Case' financial model.", "What are the key questions for the CEO about this plan?", "How does this plan compare to their last 3-year plan?"]
    },
    "Show the Quality of Revenue report.": { 
        id: 'qor-report',
        title: "Quality of Revenue Report",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Quality of Revenue (QoR) Report</h3><p class="response-subtitle">Source Documents: Stripe_Data_Export.csv, ...</p></div>
            <div class="build-item grid md:grid-cols-2 gap-6">
                <div class="space-y-6"><div class="card-base"><h4 class="response-section-title">Upsell / Cross-sell</h4><ul class="list-disc pl-5 space-y-1 text-sm" data-animate-list><li>Only 15% of customers use >1 module.</li><li>No formal process for identifying expansion opportunities.</li><li>Sales team is compensated on new logos only.</li></ul></div><div class="card-base"><h4 class="response-section-title">Packaging & Pricing</h4><ul class="list-disc pl-5 space-y-1 text-sm" data-animate-list><li>Single, flat-rate pricing model limits monetization.</li><li>No usage-based or tiered pricing exists.</li><li>Heavy, inconsistent discounting observed at quarter-end.</li></ul></div></div>
                <div class="card-base"><h4 class="response-section-title">ARR Growth Recommendations</h4><div class="data-table-container"><table class="data-table"><thead><tr><th>Recommendation</th><th>Impact</th></tr></thead><tbody><tr><td>Implement 3-tiered pricing (Good, Better, Best) with usage-based components.</td><td><span class="status-badge high">High</span></td></tr><tr><td>Launch a program to convert the perpetual license base to recurring subscriptions.</td><td><span class="status-badge high">High</span></td></tr><tr><td>Introduce a dedicated Customer Success team focused on NRR.</td><td><span class="status-badge">Medium</span></td></tr></tbody></table></div></div>
            </div>
            <div class="build-item judgement-box success"><p class="judgement-title">Judgement (High Confidence - 90%):</p><p class="judgement-text" data-typing-text="Significant, untapped potential exists to improve revenue quality. Implementing tiered packaging, an expansion-focused sales motion, and a proactive customer success function could dramatically increase NRR and LTV."></p></div>
        </div>`,
        followUpQuestions: ["Generate a draft of a 3-tiered pricing model.", "What is the estimated cost to build a Customer Success team?", "Model the revenue impact of converting the license base."]
    },
    "Analyze the efficiency of the sales and marketing funnel.": { 
        id: 'funnel-efficiency',
        title: "Sales & Marketing Funnel Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Sales & Marketing Funnel Analysis</h3><p class="response-subtitle">Source Documents: HubSpot_Analytics_Export.csv, ...</p></div>
            <div class="build-item funnel-chart-container"><div class="funnel-item"><div class="funnel-label">Leads</div><div class="funnel-bar" style="width: 100%; background-color: var(--accent-teal);">10,000</div></div><div class="funnel-item"><div class="funnel-label">MQLs (5%)</div><div class="funnel-bar" style="width: 50%; background-color: var(--accent-teal);">500</div></div><div class="funnel-item"><div class="funnel-label">SQLs (20%)</div><div class="funnel-bar" style="width: 10%; background-color: var(--accent-teal);">100</div></div><div class="funnel-item"><div class="funnel-label">Wins (15%)</div><div class="funnel-bar" style="width: 1.5%; background-color: var(--accent-teal);">15</div></div></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="The funnel shows a significant drop-off from MQL (Marketing Qualified Lead) to SQL (Sales Qualified Lead), with an 80% leakage rate. This suggests a misalignment between marketing campaigns and sales criteria, or an ineffective lead nurturing process. The final win rate of 15% from qualified opportunities is below the industry benchmark of 20-25%."></p></div>
            <div class="build-item judgement-box warning"><p class="judgement-title">Judgement (Medium Confidence - 85%):</p><p class="judgement-text" data-typing-text="The sales and marketing engine is inefficient. There is a clear opportunity to create value by improving lead qualification, nurturing, and sales closing processes."></p></div>
        </div>`,
        followUpQuestions: ["Draft an email to the Head of Sales about the MQL-to-SQL drop-off.", "What are the top 3 initiatives to improve the win rate?", "How does this funnel compare to portfolio company benchmarks?"]
    },
    "Identify the top 10 customers by revenue and any concentration risks.": { 
        id: 'customer-concentration',
        title: "Customer Concentration Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Customer Concentration Analysis</h3><p class="response-subtitle">Source Documents: ARR_by_Customer.xlsx, ...</p></div>
            <div class="build-item"><div class="response-section-title">Top 10 Customer ARR Contribution:</div><div class="stacked-bar-container"><div class="stacked-bar-segment" style="width: 28%; background-color: var(--status-error);" title="Top 2: $3.36M">Top 2 (28%)</div><div class="stacked-bar-segment" style="width: 17%; background-color: var(--status-warning);" title="Top 3-5: $2.04M">Top 3-5 (17%)</div><div class="stacked-bar-segment" style="width: 15%; background-color: var(--accent-blue);" title="Top 6-10: $1.8M">Top 6-10 (15%)</div><div class="stacked-bar-segment" style="width: 40%; background-color: var(--bg-hover); color: var(--text-secondary);">All Others (40%)</div></div></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="There is a significant customer concentration risk. The top 2 customers, Global FinCorp and HealthUnited, account for 28% of the total $12M reported ARR. The top 10 customers collectively represent 60% of total ARR. Furthermore, the contract for Global FinCorp ($3.36M ARR) is up for renewal in 4 months and contains non-standard termination for convenience clauses."></p></div>
            <div class="build-item judgement-box error"><p class="judgement-title">Judgement (High Confidence - 100%):</p><p class="judgement-text" data-typing-text="Customer concentration is a critical risk. A key condition of the deal should be the successful and early renewal of the Global FinCorp contract under standard terms. A VCP to diversify the customer base is essential."></p></div>
        </div>`,
        followUpQuestions: ["What is the renewal status of the Global FinCorp contract?", "Request all contracts with non-standard terms.", "What is the plan to diversify the customer base?"]
    },
    "Summarize the key architectural risks and their potential cost to remediate.": { 
        id: 'architectural-risks',
        title: "Architectural Risk Summary",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Architectural Risk Summary</h3><p class="response-subtitle">Source Documents: Tech_Architecture_Overview.pptx, ...</p></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="The core application is a legacy monolith built on an outdated framework. This creates significant risks: 1) **Scalability:** It cannot handle the projected 3x user growth. 2) **Developer Velocity:** A small change requires a full system redeployment, slowing down feature releases. 3) **Hiring:** It is difficult to find engineers skilled in this legacy technology. The CTO estimates a full migration to a microservices architecture would take 18-24 months and cost approximately $4.5M in dedicated engineering resources."></p></div>
            <div class="build-item judgement-box error"><p class="judgement-title">Judgement (High Confidence - 95%):</p><p class="judgement-text" data-typing-text="Technical debt is a critical issue that will throttle growth if not addressed. The remediation cost must be factored into the valuation model, and a detailed migration plan should be a Day 1 priority."></p></div>
        </div>`,
        followUpQuestions: ["Estimate the cost and timeline for a monolith-to-microservices migration.", "What is the current plan for this migration?", "Draft an IC memo slide on technical debt."]
    },
    "How does the R&D team's velocity compare to industry benchmarks?": { 
        id: 'rd-velocity',
        title: "R&D Velocity & Efficiency Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">R&D Velocity & Efficiency</h3><p class="response-subtitle">Source Documents: Jira_Velocity_Reports.csv, ...</p></div>
            <div class="build-item"><div class="response-section-title">Key R&D Metrics:</div><div class="data-table-container"><table class="data-table"><thead><tr><th>Metric</th><th>TechFlow</th><th>Industry Benchmark</th><th>Assessment</th></tr></thead><tbody><tr><td>Cycle Time (Idea to Prod)</td><td>95 days</td><td>45-60 days</td><td class="text-error">Poor</td></tr><tr><td>Deployment Frequency</td><td>Monthly</td><td>Weekly/Daily</td><td class="text-error">Poor</td></tr><tr><td>R&D % of Revenue</td><td>32%</td><td>20-25%</td><td class="text-warning">High</td></tr></tbody></table></div></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="TechFlow's R&D velocity is significantly below industry standards. The long cycle time and infrequent deployments are direct symptoms of the monolithic architecture and lack of automated testing. Furthermore, R&D spending as a percentage of revenue is high, indicating inefficiency. The company is spending more than its peers to produce less."></p></div>
            <div class="build-item judgement-box error"><p class="judgement-title">Judgement (High Confidence - 90%):</p><p class="judgement-text" data-typing-text="The R&D function is inefficient and slow, representing a major operational drag. A transformation plan focusing on DevOps, agile practices, and ROI-based project selection is required."></p></div>
        </div>`,
        followUpQuestions: ["Generate a job description for a 'Lead DevOps Engineer'.", "What are the main drivers of the long cycle time?", "How can we improve the ROI of R&D spend?"]
    },
    "What is the plan for migrating off the legacy monolithic architecture?": { 
        id: 'migration-plan',
        title: "Monolith Migration Plan Assessment",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Monolith Migration Plan Assessment</h3><p class="response-subtitle">Source Documents: Project_Phoenix_Migration_Plan.pptx, ...</p></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="Management has a high-level plan, codenamed 'Project Phoenix,' to migrate to a microservices architecture. However, the plan lacks critical details. There is no budget allocated, no specific engineering resources assigned, and no clear strategy for data migration or managing dependencies during the transition. The CTO acknowledged in an interview that the plan is 'more of a vision than a blueprint' at this stage."></p></div>
            <div class="build-item judgement-box warning"><p class="judgement-title">Judgement (Medium Confidence - 75%):</p><p class="judgement-text" data-typing-text="A migration plan exists conceptually but is not actionable. The lack of detail, budget, and resourcing makes it highly unlikely to succeed as currently outlined. This must be treated as a new initiative to be built from the ground up post-close."></p></div>
        </div>`,
        followUpQuestions: ["Estimate the cost and timeline for a monolith-to-microservices migration.", "Who on the team has experience with microservices?", "Generate key questions for the CTO about this plan."]
    },
    "What are the key risks to achieving the 2025 forecast?": { 
        id: 'forecast-risks',
        title: "2025 Forecast Risk Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">2025 Forecast Risk Analysis</h3><p class="response-subtitle">Source Documents: Management_Financial_Projections.xlsx, ...</p></div>
            <div class="build-item list-container"><div class="list-item"><h4 class="list-title text-error">1. Customer Concentration & Churn</h4><p class="list-text" data-typing-text="The forecast assumes renewal of Global FinCorp ($3.36M) and a reduction in logo churn from 18% to 12%. This is a high-risk assumption."></p></div><div class="list-item"><h4 class="list-title text-error">2. New Product Revenue</h4><p class="list-text" data-typing-text="The model includes $4M in revenue from new products in 2025. Given the 100% failure rate of the last 3 launches, this revenue is highly speculative."></p></div><div class="list-item"><h4 class="list-title text-warning">3. Sales Team Ramp-up</h4><p class="list-text" data-typing-text="The plan requires 10 new sales reps to be fully ramped and productive within 6 months. Historical data shows the average ramp time is 9-12 months."></p></div></div>
            <div class="build-item judgement-box error"><p class="judgement-title">Judgement (High Confidence - 95%):</p><p class="judgement-text" data-typing-text="The 2025 forecast as presented by management is not achievable. We recommend creating a 'Base Case' model that removes all new product revenue and uses historical churn and sales ramp-up rates."></p></div>
        </div>`,
        followUpQuestions: ["Build the 'Base Case' financial model.", "What is the financial impact of the Global FinCorp churn?", "How much cash would be needed to fund the plan?"]
    },
    "Analyze the quality of earnings and identify any one-time adjustments.": { 
        id: 'qoe-analysis',
        title: "Quality of Earnings Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Quality of Earnings (QoE) Analysis</h3><p class="response-subtitle">Source Documents: Audited_Financials_2024.pdf, ...</p></div>
            <div class="build-item"><p class="response-section-title">Analysis:</p><p class="response-text" data-typing-text="We have adjusted the reported EBITDA of $6.8M for two key items: 1) **Non-recurring Legal Fees ($0.45M):** The company incurred significant one-time legal expenses related to a patent dispute that has now been settled. 2) **Owner's Salary Adjustment ($0.27M):** The founder/CEO's salary is below market rate. We have adjusted this to a market-rate salary of $450K, resulting in a $0.27M reduction in EBITDA. The resulting Adjusted EBITDA of $6.08M is a more accurate representation of the company's sustainable profitability."></p></div>
            <div class="build-item judgement-box success"><p class="judgement-title">Judgement (Medium Confidence - 85%):</p><p class="judgement-text" data-typing-text="The quality of earnings is reasonably high after adjustments. The legal fees appear genuinely non-recurring. Further diligence is needed to confirm the market rate for the CEO's salary."></p></div>
        </div>`,
        followUpQuestions: ["Draft an email to the CFO requesting clarification on revenue recognition policies.", "Are there any other potential one-time adjustments?", "Show the full QoE bridge."]
    },
    "Draft a 'Go-to-Market' slide for the IC memo.": {
        id: 'draft-gtm-slide',
        title: "Draft GTM Slide",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">IC Memo Slide: Go-to-Market Strategy</h4>
            <ul class="list-disc pl-5 space-y-2 text-sm" data-animate-list>
                <li><span class="font-semibold">Phase 1 (0-6 Months):</span> Deepen niche focus. Retrain sales team on value-based selling for the core vertical. Implement a dedicated Customer Success function to reduce existing logo churn from 18% to 12%.</li>
                <li><span class="font-semibold">Phase 2 (6-18 Months):</span> Introduce tiered pricing model to drive expansion revenue. Launch targeted marketing campaigns to win back market share from 'DataSystems'.</li>
                <li><span class="font-semibold">Phase 3 (18+ Months):</span> Explore adjacent market vertical based on product-market fit analysis from Phase 1 and 2.</li>
            </ul>
        </div>`,
        followUpQuestions: []
    },
    "Prioritize 'Platform Consolidation' risk in the 100-day plan.": {
        id: 'prioritize-risk',
        title: "Prioritize Risk in 100-Day Plan",
        renderFunc: () => `<div class="aria-response-content build-item card-base text-success">
            <p data-typing-text="**Action Complete.** The risk of 'Platform Consolidation' has been added as a P1 priority to the draft 100-Day Plan. A new workstream, 'Competitive Analysis & Product Strategy,' has been created and assigned to the Head of Product."></p>
        </div>`,
        followUpQuestions: []
    },
    "Generate key questions for the CEO regarding the strategic plan.": {
        id: 'generate-ceo-questions',
        title: "Generated CEO Questions",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">Key Questions for CEO on Strategic Plan</h4>
            <ol class="list-decimal pl-5 space-y-2 text-sm" data-animate-list>
                <li>The plan projects 40% new ARR growth, but historical performance is 15%. What specific, new initiatives will bridge this 25% gap?</li>
                <li>The EMEA expansion target of $5M seems ambitious given the current $0.5M run-rate. What is the detailed plan for headcount, marketing, and channel partnerships to support this?</li>
                <li>Given the recent failures in new product launches, how has our product development and go-to-market process changed to de-risk future launches?</li>
            </ol>
        </div>`,
        followUpQuestions: []
    },
    "Generate a pricing model with 'Good-Better-Best' tiers.": {
        id: 'generate-pricing-model',
        title: "Generated Pricing Model",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">Draft Pricing Model: 3-Tier Structure</h4>
            <div class="data-table-container"><table class="data-table">
                <thead><tr><th></th><th>Starter (Good)</th><th>Professional (Better)</th><th>Enterprise (Best)</th></tr></thead>
                <tbody>
                    <tr><td>Core Features</td><td class="text-center text-success">✔</td><td class="text-center text-success">✔</td><td class="text-center text-success">✔</td></tr>
                    <tr><td>Advanced Reporting</td><td class="text-center text-error">✖</td><td class="text-center text-success">✔</td><td class="text-center text-success">✔</td></tr>
                    <tr><td>API Access</td><td class="text-center text-error">✖</td><td class="text-center text-success">✔</td><td class="text-center text-success">✔</td></tr>
                    <tr><td>Dedicated Support</td><td class="text-center text-error">✖</td><td class="text-center text-error">✖</td><td class="text-center text-success">✔</td></tr>
                </tbody>
            </table></div>
        </div>`,
        followUpQuestions: []
    },
    "Draft an email to the Head of Sales about the MQL-to-SQL drop-off.": {
        id: 'draft-email-mql',
        title: "Draft Email to Head of Sales",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <p><span class="font-semibold">To:</span> Head of Sales</p>
            <p><span class="font-semibold">Subject:</span> Urgent Review: MQL-to-SQL Conversion Rate</p>
            <hr class="my-2 border-border-color">
            <div class="response-text" data-typing-text="Hi [Name],\n\nHope you're having a productive week. Our diligence analysis has flagged a significant drop-off in the MQL-to-SQL conversion rate, which has fallen to 20% (an 80% leakage rate). This suggests a potential misalignment between marketing's lead generation and the sales team's qualification criteria.\n\nCould you please provide your perspective on the quality of leads received recently? I'd like to schedule a brief 30-minute meeting with you and the Head of Marketing to diagnose the root cause and align on a corrective action plan.\n\nBest,\nAria"></div>
        </div>`,
        followUpQuestions: []
    },
    "Estimate the cost and timeline for a monolith-to-microservices migration.": {
        id: 'estimate-migration',
        title: "Migration Cost & Timeline Estimate",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">High-Level Migration Estimate</h4>
            <p class="response-subtitle mb-2">Based on analysis of the current codebase and team velocity, here is a preliminary estimate:</p>
            <ul class="list-disc pl-5 space-y-2 text-sm" data-animate-list>
                <li><span class="font-semibold">Estimated Timeline:</span> 18-24 months</li>
                <li><span class="font-semibold">Required Team:</span> 2 dedicated "platform" squads (8-10 engineers)</li>
                <li><span class="font-semibold">Estimated Cost (Resources):</span> $4.0M - $5.5M</li>
                <li><span class="font-semibold">Key Risks:</span> Data migration complexity, potential for business disruption during transition, hiring for specialized skills.</li>
            </ul>
        </div>`,
        followUpQuestions: []
    },
    "Generate a job description for a 'Lead DevOps Engineer'.": {
        id: 'generate-jd-devops',
        title: "Generated Job Description",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">Job Description: Lead DevOps Engineer</h4>
            <p class="response-section-title mt-2">Responsibilities:</p>
            <ul class="list-disc pl-5 text-sm" data-animate-list>
                <li>Design, build, and maintain our CI/CD pipeline to improve developer velocity and deployment frequency.</li>
                <li>Implement infrastructure-as-code (IaC) using Terraform and container orchestration using Kubernetes.</li>
                <li>Champion DevOps best practices and mentor junior engineers.</li>
            </ul>
            <p class="response-section-title mt-2">Qualifications:</p>
            <ul class="list-disc pl-5 text-sm" data-animate-list>
                <li>5+ years of experience in a DevOps or SRE role.</li>
                <li>Deep expertise with AWS, Docker, and Kubernetes.</li>
                <li>Proven experience migrating a monolithic application to microservices.</li>
            </ul>
        </div>`,
        followUpQuestions: []
    },
    "Draft an IC memo slide on technical debt.": {
        id: 'draft-ic-slide-tech-debt',
        title: "Draft IC Memo Slide on Technical Debt",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">IC Memo Slide: Technical Debt & Mitigation</h4>
            <p class="response-section-title mt-2">The Situation:</p>
            <p class="response-text" data-typing-text="The core application is a legacy monolith, resulting in slow developer velocity (95-day cycle time vs. 45-day benchmark) and high R&D spend (32% of revenue vs. 20-25% benchmark)."></p>
            <p class="response-section-title mt-2">The Risk:</p>
            <p class="response-text" data-typing-text="Inability to scale, innovate, or compete effectively. Will throttle growth within 18 months."></p>
            <p class="response-section-title mt-2">The Plan:</p>
            <p class="response-text" data-typing-text="A 24-month, $4.5M migration to a microservices architecture. This will be a key pillar of the 100-day plan, led by a newly hired VP of Engineering."></p>
        </div>`,
        followUpQuestions: []
    },
    "Draft an email to the CFO requesting clarification on revenue recognition policies.": {
        id: 'draft-email-rev-rec',
        title: "Draft Email to CFO",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <p><span class="font-semibold">To:</span> CFO, TechFlow Solutions</p>
            <p><span class="font-semibold">Subject:</span> Diligence Question: Revenue Recognition for Perpetual Licenses</p>
            <hr class="my-2 border-border-color">
            <div class="response-text" data-typing-text="Hi [Name],\n\nAs part of our ongoing diligence, we are analyzing the composition of the company's ARR. We noted that revenue from some perpetual license contracts appears to be recognized over an 18-month period.\n\nCould you please provide the formal revenue recognition policy document that outlines the accounting treatment for these specific contracts? Understanding this is key to accurately assessing the quality of recurring revenue.\n\nAppreciate your help.\n\nBest,\nAria"></div>
        </div>`,
        followUpQuestions: []
    },
    "Request all contracts with non-standard terms be uploaded to the data room.": {
        id: 'request-contracts',
        title: "Request Contracts",
        renderFunc: () => `<div class="aria-response-content build-item card-base text-success">
            <p data-typing-text="**Action Complete.** A formal request has been logged in the diligence tracker and sent to the deal team lead: 'Please request that the target company identify and upload all customer contracts containing non-standard termination or payment clauses to the 'Legal' folder in the data room by EOD tomorrow.'"></p>
        </div>`,
        followUpQuestions: []
    },
    "Build the 'Base Case' financial model.": {
        id: 'build-base-case-model',
        title: "Generated 'Base Case' Financial Model",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">'Base Case' Financial Model (Adjusted from Management Case)</h4>
            <div class="data-table-container"><table class="data-table">
                <thead><tr><th>Metric</th><th>Management Case (2025)</th><th>Base Case (2025)</th><th>Key Adjustment</th></tr></thead>
                <tbody>
                    <tr><td>New ARR Growth</td><td>40%</td><td class="text-error">18%</td><td>Aligned to historical + 3% uplift</td></tr>
                    <tr><td>New Product Revenue</td><td>$4.0M</td><td class="text-error">$0.5M</td><td>Discounted by 87.5% due to launch risk</td></tr>
                    <tr><td>Total Revenue</td><td>$77M</td><td class="text-error">$62M</td><td>Reflects lower growth assumptions</td></tr>
                </tbody>
            </table></div>
        </div>`,
        followUpQuestions: []
    }
};

const cloudvantage_ariaResponses = {
    "Process the renewals for the NewCo acquisition customers.": {
        id: 'newco-renewals',
        title: "NewCo Acquisition Renewal Analysis",
        renderFunc: () => {
            const renewalOpportunities = [
                { account: 'Global Enterprises Inc.', segment: 'Gold', value: 3245000, date: 'July 15, 2025', circumstance: 'Business Success' },
                { account: 'Apex Solutions', segment: 'Gold', value: 2780000, date: 'August 3, 2025', circumstance: 'Technical Success' },
                { account: 'Stellar Technologies', segment: 'Silver', value: 925000, date: 'July 28, 2025', circumstance: 'Business Success' },
                { account: 'Fusion Micro', segment: 'Bronze', value: 125000, date: 'September 14, 2025', circumstance: 'Technical Success' },
                { account: 'Horizon Solutions', segment: 'Bronze', value: 95000, date: 'July 25, 2025', circumstance: 'Struggler' },
            ];
            const segmentColors = { Gold: 'var(--status-warning)', Silver: 'var(--text-muted)', Bronze: '#cd7f32' };
            return `<div class="aria-response-content">
                <div class="build-item"><p class="response-text" data-typing-text="I've analyzed the upcoming renewals for the recently acquired 'NewCo' customers. Based on their current contract values and our standard pricing playbook, I've identified several uplift opportunities."></p></div>
                <div class="build-item data-table-container"><table class="data-table">
                    <thead><tr><th>Account</th><th>Segment</th><th>Contract Value</th><th>Renewal Date</th><th>Circumstance</th></tr></thead>
                    <tbody>${renewalOpportunities.map(c => `<tr><td>${c.account}</td><td><span class="status-badge" style="background-color:${segmentColors[c.segment]}20; color:${segmentColors[c.segment]}">${c.segment}</span></td><td>$${c.value.toLocaleString()}</td><td>${c.date}</td><td>${c.circumstance}</td></tr>`).join('')}</tbody>
                </table></div>
                <div class="build-item analysis-box">
                    <h4 class="response-section-title">Pricing Playbook Recommendation:</h4>
                    <ul class="list-disc list-outside pl-5 space-y-1 text-sm" data-animate-list>
                        <li><strong>20% uplift</strong> for Gold customers with "Business Success".</li>
                        <li><strong>10% uplift</strong> for Silver customers with "Business" or "Technical Success".</li>
                        <li><strong>25% uplift</strong> for all Bronze customers to align with standard pricing.</li>
                    </ul>
                </div>
            </div>`;
        },
        followUpQuestions: ["Apply the recommended uplifts and show the financial impact.", "Generate conversation guides for the sales team.", "Which customers are at the highest risk of churning with this increase?"]
    },
    "Analyze the current sales compensation plan for the Enterprise team.": {
        id: 'sales-comp-analysis',
        title: "Sales Comp Plan Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Sales Compensation Plan Analysis</h3><p class="response-subtitle">Source Documents: Sales_Comp_Plan_FY25.pdf, ...</p></div>
            <div class="build-item"><p class="response-section-title">Key Findings:</p><ul class="list-disc pl-5 text-sm" data-animate-list><li>The current plan is 100% focused on New Business ARR, with no incentive for renewals or expansion.</li><li>Accelerators for over-performance are below market benchmarks, potentially capping motivation.</li><li>The plan does not include a component for selling newly acquired 'NewCo' products.</li></ul></div>
            <div class="build-item judgement-box warning"><p class="judgement-title">Judgement (Medium Confidence - 85%):</p><p class="judgement-text" data-typing-text="The current compensation plan is misaligned with the strategic goal of increasing Net Revenue Retention (NRR). It actively discourages the sales team from focusing on the existing customer base and cross-selling opportunities."></p></div>
        </div>`,
        followUpQuestions: ["Draft a revised sales comp plan.", "Model the financial impact of the new plan.", "What are the benchmarks for sales accelerators?"]
    },
    "What are the key drivers behind our current NPS score?": {
        id: 'nps-drivers',
        title: "NPS Driver Analysis",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">NPS Driver Analysis (Score: 52)</h3><p class="response-subtitle">Source Documents: NPS_Survey_Results_Q2.csv, ...</p></div>
            <div class="build-item grid md:grid-cols-2 gap-4">
                <div><h4 class="response-section-title text-success">Top Promoters (Score 9-10)</h4><ul class="list-disc pl-5 text-sm" data-animate-list><li>"Excellent customer support"</li><li>"Platform is reliable and always available"</li><li>"Deep domain expertise of the team"</li></ul></div>
                <div><h4 class="response-section-title text-error">Top Detractors (Score 0-6)</h4><ul class="list-disc pl-5 text-sm" data-animate-list><li>"Lack of key features compared to competitors"</li><li>"The user interface feels outdated"</li><li>"Integration with our other tools is difficult"</li></ul></div>
            </div>
            <div class="build-item judgement-box success"><p class="judgement-title">Judgement (High Confidence - 92%):</p><p class="judgement-text" data-typing-text="The high NPS score is primarily driven by strong customer service and reliability, not product superiority. While this is a strength, it's a fragile position. The feedback from detractors clearly indicates a growing product gap that needs to be addressed to maintain customer loyalty long-term."></p></div>
        </div>`,
        followUpQuestions: ["Which features are detractors asking for most?", "What is the status of the UI refresh project?", "How can we improve the integration experience?"]
    },
    "Generate a board-level summary of Q2 financial performance.": {
        id: 'q2-summary',
        title: "Q2 Financial Performance Summary",
        renderFunc: () => `<div class="aria-response-content">
            <div class="build-item"><h3 class="response-title">Q2 2025 Financial Summary</h3><p class="response-subtitle">Source Documents: Q2_Financial_Package.xlsx, ...</p></div>
            <div class="build-item kpi-grid">${[
                { label: 'ARR', value: '$78M', change: '+4% QoQ', changeColor: 'var(--status-success)' },
                { label: 'NRR', value: '128%', change: '+3% vs Target', changeColor: 'var(--status-success)' },
                { label: 'EBITDA Margin', value: '31%', change: '-1% vs Target', changeColor: 'var(--status-error)' },
                { label: 'Rule of 40', value: '58%', change: 'Healthy', changeColor: 'var(--text-muted)' }
            ].map(kpi => `<div class="kpi-card"><p class="kpi-label">${kpi.label}</p><p class="kpi-value">${kpi.value}</p><p class="kpi-detail" style="color: ${kpi.changeColor};">${kpi.change}</p></div>`).join('')}</div>
            <div class="build-item"><p class="response-section-title">Executive Summary:</p><p class="response-text" data-typing-text="CloudVantage delivered a strong Q2, exceeding ARR targets driven by robust Net Revenue Retention of 128%. This indicates strong product stickiness and successful expansion within the existing customer base. EBITDA margin was slightly below target due to planned investments in the 'NewCo' integration and R&D for the upcoming AI feature. Overall, the business remains healthy and is tracking well against the annual plan."></p></div>
        </div>`,
        followUpQuestions: ["Analyze the key drivers of our Net Revenue Retention.", "What caused the dip in EBITDA margin?", "What is the forecast for Q3?"]
    },
    "Draft a revised sales comp plan.": {
        id: 'draft-sales-comp',
        title: "Draft Sales Comp Plan",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">Draft: Revised Sales Comp Plan</h4>
            <ul class="list-disc pl-5 space-y-2 text-sm" data-animate-list>
                <li><strong>Structure:</strong> 70% Base / 30% Variable</li>
                <li><strong>Commission:</strong> 60% New Business ARR, 30% Expansion ARR (Upsell/Cross-sell), 10% Renewal Rate Modifier.</li>
                <li><strong>NewCo Kicker:</strong> 1.25x commission multiplier on all NewCo products sold for the first 12 months.</li>
                <li><strong>Accelerators:</strong> Tiered accelerators starting at 101% of quota, with a 2x multiplier for deals >200% of quota.</li>
            </ul>
        </div>`,
        followUpQuestions: []
    },
    "Model the financial impact of a 5% price increase on the legacy NewCo customer base.": {
        id: 'model-price-increase',
        title: "Price Increase Impact Model",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <h4 class="response-title">Scenario: 5% Price Increase on NewCo Base</h4>
            <div class="data-table-container"><table class="data-table">
                <thead><tr><th>Metric</th><th>Current</th><th>Projected</th><th>Impact</th></tr></thead>
                <tbody>
                    <tr><td>NewCo Customer ARR</td><td>$15.2M</td><td>$15.5M</td><td class="text-success">+$0.3M</td></tr>
                    <tr><td>Assumed Churn Increase</td><td>0%</td><td>2%</td><td class="text-error">-$0.3M</td></tr>
                    <tr><td>Net ARR Impact</td><td></td><td class="font-bold">$0</td><td>Neutral</td></tr>
                </tbody>
            </table></div>
            <p class="response-subtitle mt-2" data-typing-text="**Note:** The model assumes a 2% increase in churn directly attributable to the price increase, resulting in a net-neutral ARR impact. This suggests the price increase is too low to offset the potential churn risk."></p>
        </div>`,
        followUpQuestions: ["What if we model a 10% increase?", "Can we segment customers to apply the increase selectively?"]
    },
    "Draft a communication plan to NewCo customers about the acquisition.": {
        id: 'draft-comm-plan',
        title: "Draft Customer Communication",
        renderFunc: () => `<div class="aria-response-content build-item card-base">
            <p><span class="font-semibold">To:</span> Valued NewCo Customer</p>
            <p><span class="font-semibold">Subject:</span> Exciting News: NewCo is Joining CloudVantage!</p>
            <hr class="my-2 border-border-color">
            <div class="response-text" data-typing-text="Dear [Customer Name],\n\nWe are thrilled to announce that NewCo has been acquired by CloudVantage, a leader in the enterprise software space. This partnership will bring together the best of both companies, accelerating innovation and delivering even more value to you.\n\nThere will be no immediate changes to your service, and your current points of contact will remain the same. We are committed to a smooth transition and will be sharing more details about the exciting future ahead in the coming weeks.\n\nSincerely,\nThe CloudVantage & NewCo Teams"></div>
        </div>`,
        followUpQuestions: []
    }
};

const selectableNotes = [ { id: 'note1', text: 'The management team appears strong but lacks experience in a private equity-backed environment.' }, { id: 'note2', text: 'There is a significant concentration of revenue with the top two customers, posing a potential risk.' }, { id: 'note3', text: 'The company has strong brand recognition in its niche but has not yet explored adjacent markets.' }, { id: 'note4', text: 'Technical debt in the core product could hinder future growth and scalability if not addressed.' } ];
const capabilities = [
    { id: 'sales-strategy', discipline: 'Sales', name: 'Sales Strategy' }, { id: 'brand-awareness', discipline: 'Marketing', name: 'Brand Awareness' },
    { id: 'applications', discipline: 'Build', name: 'Application Architecture' }, { id: 'customer-success', discipline: 'Run', name: 'Customer Success' },
    { id: 'financial-reporting', discipline: 'Finance', name: 'Financial Reporting & Controls' }, { id: 'budgeting-forecasting', discipline: 'Finance', name: 'Budgeting & Forecasting' },
    { id: 'cash-flow-management', discipline: 'Finance', name: 'Cash Flow Management' }, { id: 'pricing-margin-analysis', discipline: 'Finance', name: 'Pricing & Margin Analysis' }
];
const capabilityScenarios = {
    'sales-strategy': { 1: { 2: { actions: ['Define basic lead qualification criteria (e.g., BANT).', 'Document the current sales process.'], insight: 'Establishing a documented process is the first step to identifying bottlenecks and improving team consistency.' } }, 2: { 3: { actions: ['Implement a CRM system (e.g., HubSpot, Salesforce).', 'Create standardized sales collateral and email templates.'], insight: 'A CRM will provide a single source of truth for customer interactions, enabling basic pipeline reporting and forecasting.' } }, 3: { 4: { actions: ['Develop and implement a formal sales methodology (e.g., MEDDIC, Challenger).', 'Integrate lead scoring into the CRM.'], insight: 'A formal methodology ensures a repeatable, scalable sales motion and improves forecast accuracy by qualifying deals more rigorously.' } }, 4: { 5: { actions: ['Deploy AI-powered sales forecasting and conversation intelligence tools.', 'Implement a dynamic, data-driven territory and quota plan.'], insight: 'AI-driven insights will optimize sales efforts by predicting which deals are most likely to close and identifying coaching opportunities for reps.' } } },
    'brand-awareness': { 1: { 2: { actions: ['Create professional social media profiles on relevant platforms (e.g., LinkedIn).', 'Develop a basic brand style guide (logo, colors, fonts).'], insight: 'A consistent visual identity is foundational for building brand recognition.' } }, 2: { 3: { actions: ['Launch a company blog with regular, SEO-optimized content.', 'Begin targeted social media advertising campaigns.'], insight: 'Content marketing and targeted ads will start driving inbound traffic and building an audience.' } }, 3: { 4: { actions: ['Implement a marketing automation platform to manage campaigns and nurture leads.', 'Develop a thought leadership program (webinars, whitepapers).'], insight: 'Marketing automation allows for scaling communication and personalizing the user journey, significantly improving lead quality.' } }, 4: { 5: { actions: ['Utilize a Customer Data Platform (CDP) for hyper-personalization.', 'Launch an influencer and partner marketing program.'], insight: 'A CDP provides a unified customer view, enabling highly targeted, multi-channel campaigns that maximize ROI and brand impact.' } } },
    'applications': { 1: { 2: { actions: ['Map all application dependencies.', 'Establish a version control system (e.g., Git) for all codebases.'], insight: 'Version control is non-negotiable for collaborative development and preventing code loss.' } }, 2: { 3: { actions: ['Containerize the main application using Docker.', 'Set up a basic CI/CD pipeline for automated testing and deployment.'], insight: 'CI/CD dramatically increases deployment frequency and reduces manual errors, accelerating time-to-market for new features.' } }, 3: { 4: { actions: ['Begin decomposing the monolith by extracting the first microservice.', 'Implement an API Gateway to manage service-to-service communication.'], insight: 'Extracting the first microservice proves the architectural pattern and provides immediate scalability benefits for that specific function.' } }, 4: { 5: { actions: ['Adopt a service mesh (e.g., Istio) for advanced traffic management and observability.', 'Implement event-driven architecture for asynchronous communication.'], insight: 'A service mesh provides granular control and deep insights into a complex microservices environment, ensuring resilience and security.' } } },
    'customer-success': { 1: { 2: { actions: ['Implement a shared inbox or basic ticketing system for support.', 'Create a simple FAQ/knowledge base for customers.'], insight: 'Centralizing support requests is the first step to tracking issues and identifying common problems.' } }, 2: { 3: { actions: ['Define and track a basic Customer Health Score.', 'Establish a proactive check-in cadence for key accounts.'], insight: 'A health score allows the team to move from a reactive to a proactive stance, identifying at-risk customers before they churn.' } }, 3: { 4: { actions: ['Deploy a dedicated Customer Success Platform (e.g., Gainsight, ChurnZero).', 'Automate onboarding and key touchpoints based on product usage data.'], insight: 'A CS platform automates proactive engagement at scale, ensuring a consistent customer experience and freeing up CSMs for high-value strategic work.' } }, 4: { 5: { actions: ['Use AI to predict churn risk and identify expansion opportunities.', 'Provide CSMs with AI-generated "next best actions" for each customer.'], insight: 'Predictive AI transforms customer success from a cost center to a revenue driver by systematically reducing churn and surfacing upsell opportunities.' } } },
    'financial-reporting': { 1: { 2: { actions: ['Document a month-end close checklist.', 'Perform manual bank and key balance sheet reconciliations.'], insight: 'A documented checklist is the first step toward a repeatable and auditable close process, reducing reliance on individuals.' } }, 2: { 3: { actions: ['Implement accounting software/ERP to automate journal entries.', 'Standardize the chart of accounts across the business.'], insight: 'An ERP system creates a single source of truth for financial data, drastically reducing manual consolidation errors and enabling faster closing.' } }, 3: { 4: { actions: ['Deploy a financial reporting tool (e.g., PowerBI, Tableau) for self-service dashboards.', 'Establish a formal internal controls framework (e.g., COSO-lite).'], insight: 'Self-service dashboards empower business leaders with real-time data, while a controls framework builds trust with lenders and auditors.' } }, 4: { 5: { actions: ['Implement AI for transaction categorization and anomaly detection.', 'Move towards a continuous close process with real-time reporting.'], insight: 'AI-driven finance functions can predict closing variances and identify risks before they become material, representing best-in-class financial management.' } } },
    'budgeting-forecasting': { 1: { 2: { actions: ['Establish a formal annual budgeting process with department head input.', 'Begin monthly budget vs. actual variance analysis.'], insight: 'A formal budget process creates accountability, while variance analysis is the first step in understanding business performance drivers.' } }, 2: { 3: { actions: ['Develop a driver-based financial model in Excel.', 'Implement a rolling 12-month forecast, updated quarterly.'], insight: 'A driver-based model links financial outcomes to operational metrics (e.g., sales reps, website traffic), making the forecast more accurate and actionable.' } }, 3: { 4: { actions: ['Implement a dedicated Corporate Performance Management (CPM/FP&A) tool.', 'Integrate operational data (e.g., CRM pipeline) directly into the forecast model.'], insight: 'A dedicated CPM tool eliminates Excel errors, enables complex scenario planning, and provides a scalable platform for a growing business.' } }, 4: { 5: { actions: ['Utilize predictive analytics/ML to generate baseline forecasts.', 'Automate scenario analysis for key strategic decisions.'], insight: 'AI/ML can identify complex correlations and seasonality that human analysis might miss, leading to a more accurate and less biased forecast.' } } },
    'cash-flow-management': { 1: { 2: { actions: ['Create and maintain a 13-week cash flow forecast in Excel.', 'Establish a formal process for reviewing aged receivables.'], insight: 'A 13-week cash forecast is the standard for PE-backed companies, providing critical visibility into short-term liquidity and covenant compliance.' } }, 2: { 3: { actions: ['Implement automated dunning/collections reminders.', 'Negotiate improved payment terms with key suppliers and customers.'], insight: 'Automating collections is a high-ROI activity that accelerates cash inflows, while negotiating terms can permanently improve the cash conversion cycle.' } }, 3: { 4: { actions: ['Implement a Treasury Management System (TMS) for cash pooling and investment.', 'Develop a formal working capital optimization program with clear KPIs.'], insight: 'A formal working capital program with dedicated resources can unlock millions in trapped cash from the balance sheet, a key PE value lever.' } }, 4: { 5: { actions: ['Use AI to predict customer payment behavior and optimize collections strategy.', 'Implement dynamic discounting for early payment based on real-time liquidity needs.'], insight: 'Predictive analytics transforms cash management from a reporting function to a strategic weapon, optimizing liquidity and returns.' } } },
    'pricing-margin-analysis': { 1: { 2: { actions: ['Develop a standard price list for all products/services.', 'Perform high-level gross margin analysis by product line.'], insight: 'A standard price list is the first step to instilling pricing discipline and moving away from ad-hoc discounting.' } }, 2: { 3: { actions: ['Analyze profitability by customer and product/SKU.', 'Implement a formal deal desk or approval matrix for non-standard discounts.'], insight: 'Granular profitability analysis often reveals that 20% of customers generate 80% of profits, allowing for focused retention and sales efforts.' } }, 3: { 4: { actions: ['Implement a Configure, Price, Quote (CPQ) system to enforce pricing rules.', 'Conduct a value-based pricing study to align price with customer value.'], insight: 'A CPQ system automates and controls the sales quoting process, preventing margin erosion from unauthorized discounting. Value-based pricing can lead to significant margin uplift.' } }, 4: { 5: { actions: ['Implement dynamic pricing models based on demand and competitive intelligence.', 'Use AI to provide sales reps with optimized pricing recommendations in real-time.'], insight: 'Dynamic and AI-driven pricing allows the company to maximize revenue for every single transaction, a hallmark of a highly sophisticated commercial organization.' } } },
};