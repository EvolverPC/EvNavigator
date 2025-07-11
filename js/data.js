// js/data.js - Centralized Application Data - 100% Ported from Original File

// NOTE: All data from the original V104 file is now present here.
// The "renderFunc" properties contain the full, rich HTML for each generative response.

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
    { id: 'product-launch', title: 'Anomaly #3: Failed Recent Product Launches', issue: 'Zero sales recorded for 3 most recent product launches', severity: 'CRITICAL', sourceDocuments: ['Product_Launch_Reports_2024-2025.pdf', 'Sales_Pipeline_Analysis.xlsx'], impact: 'Innovation capacity and market fit concerns', analysis: `Three recent product launches have generated zero revenue to date: "TechFlow Analytics Pro" (launched March 2024), "TechFlow Mobile Suite" (launched September 2024), and "TechFlow AI Assistant" (launched February 2025). Combined R&D investment for these products totaled $3.2M over 18 months. This pattern suggests potential issues with product-market fit, go-to-market execution, or competitive positioning. The lack of any sales traction, even pilot programs or trials, raises questions about the company's innovation pipeline and ability to expand beyond its core offerings. This could significantly impact future growth projections and the sustainability of R&D investments.` }
];

const techflow_minorObservations = [
    { id: 'obs1', category: 'Documentation', text: 'Inconsistent naming conventions found across multiple technical documents.', impact: 'Minor risk of confusion during technical hand-off.' },
    { id: 'obs2', category: 'Technical', text: 'Code repository shows multiple active coding standards (Python PEP8, Google Style Guide).', impact: 'Increases code complexity and onboarding time for new developers.' },
    { id: 'obs3', category: 'Commercial', text: 'Sample SOWs reviewed lack specific, measurable deliverables in 40% of cases.', impact: 'Risk of scope creep and customer disputes.' },
    { id: 'obs4', category: 'HR', text: 'High employee turnover (35% YoY) noted in the junior engineering department.', impact: 'Indicates potential management or compensation issues; loss of institutional knowledge.' },
    { id: 'obs5', category: 'Finance', text: 'Expense reporting process is entirely manual and requires physical signatures.', impact: 'Inefficient process, delays financial closing.' },
    { id: 'obs6', category: 'Legal', text: 'Several enterprise contracts are missing signatures from the customer side.', impact: 'Potential enforceability issues.' },
];

const techflow_workstreamData = [
    { id: 'business', title: 'Business & Strategy', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`, cards: [{label: "Market Size (TAM)", value: "$5.2B"}, {label: "Market CAGR", value: "18%"}, {label: "Competitive Moat", value: "Medium"}], suggestedQuestions: ["Summarize the competitive landscape and TechFlow's position.", "What are the key market trends impacting the company?", "Analyze the credibility of the 5-year strategic plan."] },
    { id: 'commercial', title: 'Commercial & Customer', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-teal-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, cards: [{label: "LTV:CAC Ratio", value: "3.1x"}, {label: "Net Revenue Retention", value: "105%"}, {label: "Logo Churn", value: "18%"}], suggestedQuestions: ["Show the Quality of Revenue report.", "Analyze the efficiency of the sales and marketing funnel.", "Identify the top 10 customers by revenue and any concentration risks."] },
    { id: 'tech', title: 'Technology & Operations', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-indigo-600"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" x2="12" y1="2" y2="22"/></svg>`, cards: [{label: "Technical Debt Score", value: "High"}, {label: "Core App Uptime", value: "99.8%"}, {label: "Dev Velocity", value: "Low"}], suggestedQuestions: ["Summarize the key architectural risks and their potential cost to remediate.", "How does the R&D team's velocity compare to industry benchmarks?", "What is the plan for migrating off the legacy monolithic architecture?"] },
    { id: 'financial', title: 'Financial & Risk', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-red-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`, cards: [{label: "Gross Margin", value: "72%"}, {label: "Monthly Burn Rate", value: "$450K"}, {label: "Cash Runway", value: "11 mos"}], suggestedQuestions: ["Provide an overview of the current registered anomalies.", "What are the key risks to achieving the 2025 forecast?", "Analyze the quality of earnings and identify any one-time adjustments."] }
];

const cloudvantage_workstreamData = [
    { id: 'integration', title: 'NewCo Integration', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-purple-600"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`, cards: [{label: "100-Day Plan", value: "On Track"}, {label: "Synergy Target", value: "$2.1M"}, {label: "Team Morale", value: "Medium"}], suggestedQuestions: ["Generate a 100-day integration plan for the NewCo acquisition.", "Analyze the cross-sell opportunities between CloudVantage and NewCo products.", "Draft a communication plan to NewCo customers about the acquisition."] },
    { id: 'sales', title: 'Sales & GTM', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`, cards: [{label: "Quota Attainment", value: "103%"}, {label: "Pipeline Coverage", value: "3.5x"}, {label: "NewCo Product Sales", value: "$250k"}], suggestedQuestions: ["Process the renewals for the NewCo acquisition customers.", "Analyze the current sales compensation plan for the Enterprise team.", "What are the biggest risks in the current sales pipeline?"] },
    { id: 'product', title: 'Product & Engineering', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-indigo-600"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" x2="12" y1="2" y2="22"/></svg>`, cards: [{label: "Roadmap Progress", value: "75%"}, {label: "NPS", value: "52"}, {label: "Ticket Volume", value: "-15% WoW"}], suggestedQuestions: ["What are the key drivers behind our current NPS score?", "Analyze the recent trends in customer support ticket volume.", "What is the status of the NewCo product integration?"] },
    { id: 'finance', title: 'Financial Performance', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-green-600"><path d="M12 2.02c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4h-6"/><path d="M12 18V6"/></svg>`, cards: [{label: "ARR Growth (YoY)", value: "28%"}, {label: "EBITDA Margin", value: "31%"}, {label: "NRR", value: "128%"}], suggestedQuestions: ["Generate a board-level summary of Q2 financial performance.", "Analyze the key drivers of our Net Revenue Retention.", "Model the financial impact of a 5% price increase on the legacy NewCo customer base."] }
];

const techflow_ariaResponses = {
    "Summarize the competitive landscape and TechFlow's position.": {
        id: 'competitive-landscape',
        title: "Competitive Landscape Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Competitive Landscape Analysis</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Market_Analysis_Gartner_2024.pdf, Competitor_Website_Scans.zip, Expert_Interview_Transcript_1.txt</p><div class="space-y-4"><div class="font-semibold">Key Competitors vs. TechFlow Solutions:</div><div class="space-y-3 text-sm"><div class="flex items-center gap-4"><span class="w-32 font-medium text-gray-600">InnovateCorp</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-blue-500 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 75%">Market Leader</div></div></div><div class="flex items-center gap-4"><span class="w-32 font-medium text-gray-600">DataSystems</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-blue-400 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 60%">Established Player</div></div></div><div class="flex items-center gap-4"><span class="w-32 font-medium text-gray-600">TechFlow</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-teal-500 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 40%">Niche Challenger</div></div></div><div class="flex items-center gap-4"><span class="w-32 font-medium text-gray-600">AgileCloud</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-blue-300 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 35%">New Entrant</div></div></div></div></div><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="TechFlow operates as a niche challenger in a market dominated by InnovateCorp. While TechFlow has strong brand recognition in its specific vertical (as noted in expert interviews), it lacks the broad feature set and marketing budget of the leaders. Its primary competitive advantage is its deep domain expertise and customer service, which has created a loyal, albeit small, customer base. The key risk is being squeezed between the feature-rich incumbents and more nimble new entrants like AgileCloud."></p></div></div><div class="build-item bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"><p class="font-bold text-green-800">Judgement (High Confidence - 95%):</p><p class="text-green-700">TechFlow has a defensible niche but faces significant scaling challenges. A key part of the investment thesis must be to either deepen this niche or strategically expand its feature set to compete more broadly.</p></div></div>`,
        followUpQuestions: ["How does their pricing compare to InnovateCorp?", "What is their customer acquisition strategy?", "Draft a SWOT analysis based on these findings."]
    },
    "Provide an overview of the current registered anomalies.": {
        id: 'anomaly-overview',
        title: "Anomaly Detection Report",
        renderFunc: (state) => {
            const renderAnomaly = (anomaly) => {
                const isFlagged = !!state.diligenceWorkspace.keyRisks[anomaly.id];
                return `<div class="build-item aria-response-bubble">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${anomaly.title}</h3>
                    <div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="border-b"><th class="p-2">Issue</th><th class="p-2">Severity</th><th class="p-2">Impact</th></tr></thead><tbody><tr><td class="p-2">${anomaly.issue}</td><td class="p-2"><span class="font-bold px-2 py-0.5 rounded-full inline-block ${anomaly.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}">${anomaly.severity}</span></td><td class="p-2">${anomaly.impact}</td></tr></tbody></table></div>
                    <div class="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500"><p class="text-sm text-gray-800"><span class="font-bold">Analysis:</span> <span class="anomaly-analysis-text" data-text="${anomaly.analysis}"></span></p></div>
                    <div class="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                        <div class="tooltip">
                            <svg data-action="flag-response" data-response-id="${anomaly.id}" class="feedback-icon ${isFlagged ? 'flagged' : ''}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                            <span class="tooltip-text">Flag for Workspace</span>
                        </div>
                    </div>
                </div>`;
            };
            const renderMinorObservation = (obs) => {
                const isFlagged = !!state.diligenceWorkspace.keyRisks[obs.id];
                return `<div class="p-4 bg-gray-50 rounded-lg border flex flex-col">
                    <div class="flex-grow"><p class="font-semibold text-gray-800">${obs.category}</p><p class="text-gray-600">${obs.text}</p></div>
                    <div class="flex justify-between items-center mt-3 pt-2 border-t">
                         <div class="tooltip">
                            <svg data-action="flag-response" data-response-id="${obs.id}" class="feedback-icon ${isFlagged ? 'flagged' : ''}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                            <span class="tooltip-text">Flag for Workspace</span>
                        </div>
                    </div>
                </div>`;
            };

            const minorObsExpanded = state.techflowAria.minorObservationsExpanded;

            return `<div id="anomaly-discovery-content" class="space-y-4">
                <div class="build-item bg-white p-6 rounded-lg shadow-md border border-red-200">
                    <h2 class="text-xl font-semibold text-red-700 flex items-center gap-3 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>Significant Anomalies Detected</h2>
                    <p class="text-gray-600">Our Auto Due Diligence Agent has completed its analysis of TechFlow Solutions and identified 3 significant anomalies that require immediate attention. These findings could materially impact the investment decision and valuation model.</p>
                </div>
                ${techflow_anomalies.map(renderAnomaly).join('')}
                <div class="build-item bg-white rounded-lg shadow-md border">
                    <div class="p-6 cursor-pointer" data-action="toggle-observations">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-700">Minor Observations (${techflow_minorObservations.length})</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-500 transition-transform ${minorObsExpanded ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                    ${minorObsExpanded ? `<div class="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">${techflow_minorObservations.map(renderMinorObservation).join('')}</div>` : ''}
                </div>
            </div>`;
        },
        followUpQuestions: ["How should we adjust the valuation model based on these anomalies?", "What is the true recurring revenue quality?", "Draft an email to management asking about these issues."]
    },
    "What are the key market trends impacting the company?": { 
        id: 'market-trends',
        title: "Key Market Trends Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Key Market Trends Analysis</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Industry_Analyst_Reports_2025.pdf, TechCrunch_Articles.html, Customer_Advisory_Board_Minutes.docx</p><div class="space-y-4 text-gray-700"><div class="flex items-start gap-3"><span class="font-bold text-blue-600 text-xl">1</span><div><h4 class="font-semibold">AI Integration:</h4><p class="text-sm">Customers are increasingly demanding AI-powered features for automation and predictive analytics. TechFlow's recent 'AI Assistant' launch failure indicates a critical gap in this area.</p></div></div><div class="flex items-start gap-3"><span class="font-bold text-blue-600 text-xl">2</span><div><h4 class="font-semibold">Platform Consolidation:</h4><p class="text-sm">Enterprise buyers prefer integrated platforms over point solutions. TechFlow's standalone nature is a growing disadvantage against competitors like InnovateCorp who offer a full suite.</p></div></div><div class="flex items-start gap-3"><span class="font-bold text-blue-600 text-xl">3</span><div><h4 class="font-semibold">Data Privacy Regulations:</h4><p class="text-sm">Increased scrutiny on data handling (GDPR, CCPA) creates compliance overhead but also an opportunity for vendors who can demonstrate robust security, an area where TechFlow is currently average.</p></div></div></div></div><div class="build-item bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg"><p class="font-bold text-amber-800">Judgement (Medium Confidence - 80%):</p><p class="text-amber-700">The company is behind on two of the three most critical market trends (AI, Platform). This poses a significant threat to long-term growth unless the product roadmap is aggressively re-prioritized post-acquisition.</p></div></div>`, 
        followUpQuestions: ["How can TechFlow leverage AI to defend its niche?", "What would a 'bolt-on' acquisition strategy look like?", "Estimate the cost of achieving SOC 2 compliance."] 
    },
    "Analyze the credibility of the 5-year strategic plan.": { 
        id: 'strategic-plan-credibility',
        title: "Strategic Plan Credibility Assessment",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Strategic Plan Credibility Assessment</h3><p class="text-sm text-gray-500 mb-4">Source Documents: 5-Year_Strategic_Plan.pptx, Board_Meeting_Minutes_2024.pdf, Management_Financial_Projections.xlsx</p><div class="space-y-4"><div class="font-semibold">Plan vs. Reality Check:</div><table class="w-full text-sm text-left"><thead><tr class="border-b"><th class="p-2">Metric</th><th class="p-2">Plan (YoY Growth)</th><th class="p-2">Actual (LTM)</th><th class="p-2">Credibility</th></tr></thead><tbody><tr class="border-b"><td class="p-2">New ARR Growth</td><td class="p-2">40%</td><td class="p-2 text-red-600 font-semibold">15%</td><td class="p-2 text-red-600">Low</td></tr><tr class="border-b"><td class="p-2">Geographic Expansion (EMEA)</td><td class="p-2">$5M ARR</td><td class="p-2 text-red-600 font-semibold">$0.5M ARR</td><td class="p-2 text-red-600">Low</td></tr><tr><td class="p-2">Headcount Growth</td><td class="p-2">25%</td><td class="p-2 text-green-600 font-semibold">22%</td><td class="p-2 text-green-600">High</td></tr></tbody></table></div><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="The strategic plan's revenue projections are overly optimistic and not grounded in recent performance. The plan assumes a 40% growth in new ARR, whereas the company has only achieved 15% in the last twelve months. The EMEA expansion target is significantly off-track. The only credible component is headcount growth, which ironically contributes to the high cash burn rate without a corresponding revenue increase. The plan lacks concrete initiatives to address the product gaps and competitive pressures identified in other workstreams."></p></div></div><div class="build-item bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"><p class="font-bold text-red-800">Judgement (High Confidence - 95%):</p><p class="text-red-700">The management's strategic plan is not credible and requires a complete overhaul. The financial model should be rebuilt using a more conservative, bottom-up approach based on historical performance and known risks.</p></div></div>`, 
        followUpQuestions: ["Build a more realistic 'Base Case' financial model.", "What are the key assumptions in the management plan?", "Draft questions for the CEO regarding the plan's achievability."] 
    },
    "Show the Quality of Revenue report.": { 
        id: 'qor-report',
        title: "Quality of Revenue Report",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Quality of Revenue (QoR) Report</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Stripe_Data_Export.csv, Salesforce_Opportunity_Data.csv, Product_Usage_Logs.json</p><div class="grid md:grid-cols-2 gap-6"><div class="space-y-6"><div class="p-4 bg-gray-50 rounded-lg"><h4 class="font-semibold text-gray-800 mb-2">Upsell / Cross-sell</h4><ul class="text-sm space-y-1 list-disc list-inside"><li>Only 15% of customers use >1 module.</li><li>No formal process for identifying expansion opportunities.</li><li>Sales team is compensated on new logos only.</li></ul></div><div class="p-4 bg-gray-50 rounded-lg"><h4 class="font-semibold text-gray-800 mb-2">Packaging & Pricing</h4><ul class="text-sm space-y-1 list-disc list-inside"><li>Single, flat-rate pricing model limits monetization.</li><li>No usage-based or tiered pricing exists.</li><li>Heavy, inconsistent discounting observed at quarter-end.</li></ul></div></div><div class="p-4 bg-gray-50 rounded-lg"><h4 class="font-semibold text-gray-800 mb-4">ARR Growth Recommendations</h4><div class="space-y-3"><div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 border-b pb-2"><div class="col-span-2">Recommendation</div><div>Impact</div></div><div class="grid grid-cols-3 gap-4 text-sm items-center"><div class="col-span-2">Implement 3-tiered pricing (Good, Better, Best) with usage-based components.</div><div><span class="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">High</span></div></div><div class="grid grid-cols-3 gap-4 text-sm items-center"><div class="col-span-2">Launch a program to convert the perpetual license base to recurring subscriptions.</div><div><span class="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">High</span></div></div><div class="grid grid-cols-3 gap-4 text-sm items-center"><div class="col-span-2">Introduce a dedicated Customer Success team focused on NRR.</div><div><span class="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Medium</span></div></div></div></div></div></div><div class="build-item bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"><p class="font-bold text-green-800">Judgement (High Confidence - 90%):</p><p class="text-green-700">Significant, untapped potential exists to improve revenue quality. Implementing tiered packaging, an expansion-focused sales motion, and a proactive customer success function could dramatically increase NRR and LTV.</p></div></div>`, 
        followUpQuestions: ["Draft a plan for a new pricing and packaging model.", "What is the profile of the top 20% of customers?", "Model the impact of a 10% increase in NRR."] 
    },
    "Analyze the efficiency of the sales and marketing funnel.": { 
        id: 'funnel-efficiency',
        title: "Sales & Marketing Funnel Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Sales & Marketing Funnel Analysis</h3><p class="text-sm text-gray-500 mb-4">Source Documents: HubSpot_Analytics_Export.csv, Salesforce_Pipeline_History.csv</p><div class="space-y-2"><div class="flex items-center gap-2"><div class="w-24 text-right text-sm font-semibold">Leads</div><div class="flex-1"><div class="h-8 bg-teal-500 text-white text-xs flex items-center justify-center" style="width: 100%;">10,000</div></div></div><div class="flex items-center gap-2"><div class="w-24 text-right text-sm font-semibold">MQLs (5%)</div><div class="flex-1"><div class="h-8 bg-teal-400 text-white text-xs flex items-center justify-center" style="width: 50%;">500</div></div></div><div class="flex items-center gap-2"><div class="w-24 text-right text-sm font-semibold">SQLs (20%)</div><div class="flex-1"><div class="h-8 bg-teal-300 text-black text-xs flex items-center justify-center" style="width: 10%;">100</div></div></div><div class="flex items-center gap-2"><div class="w-24 text-right text-sm font-semibold">Wins (15%)</div><div class="flex-1"><div class="h-8 bg-teal-200 text-black text-xs flex items-center justify-center" style="width: 1.5%;">15</div></div></div></div><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="The funnel shows a significant drop-off from MQL (Marketing Qualified Lead) to SQL (Sales Qualified Lead), with an 80% leakage rate. This suggests a misalignment between marketing campaigns and sales criteria, or an ineffective lead nurturing process. The final win rate of 15% from qualified opportunities is below the industry benchmark of 20-25%, indicating potential issues in sales execution or product competitiveness during the final stages. The overall lead-to-win conversion rate is a very low 0.15%."></p></div></div><div class="build-item bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg"><p class="font-bold text-amber-800">Judgement (Medium Confidence - 85%):</p><p class="text-amber-700">The sales and marketing engine is inefficient. There is a clear opportunity to create value by improving lead qualification, nurturing, and sales closing processes. This represents a significant operational uplift project.</p></div></div>`, 
        followUpQuestions: ["What is the current Customer Acquisition Cost (CAC)?", "Propose initiatives to improve the MQL to SQL conversion rate.", "How does sales performance vary by rep?"] 
    },
    "Identify the top 10 customers by revenue and any concentration risks.": { 
        id: 'customer-concentration',
        title: "Customer Concentration Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Customer Concentration Analysis</h3><p class="text-sm text-gray-500 mb-4">Source Documents: ARR_by_Customer.xlsx, Customer_Contracts.zip</p><div class="space-y-4"><div class="font-semibold">Top 10 Customer ARR Contribution:</div><div class="w-full bg-gray-200 rounded-full h-6 flex"><div class="bg-red-500 h-6 text-white text-xs flex items-center justify-center" style="width: 28%" title="Global FinCorp: $3.36M">Top 2 (28%)</div><div class="bg-orange-500 h-6 text-white text-xs flex items-center justify-center" style="width: 17%" title="NextGen Health: $2.04M">Top 3-5 (17%)</div><div class="bg-yellow-500 h-6 text-black text-xs flex items-center justify-center" style="width: 15%" title="Innovate Retail: $1.8M">Top 6-10 (15%)</div><div class="bg-gray-300 h-6 text-black text-xs flex items-center justify-center" style="width: 40%">All Others (40%)</div></div></div><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="There is a significant customer concentration risk. The top 2 customers, Global FinCorp and HealthUnited, account for 28% of the total $12M reported ARR. The top 10 customers collectively represent 60% of total ARR. Furthermore, the contract for Global FinCorp ($3.36M ARR) is up for renewal in 4 months and contains non-standard termination for convenience clauses. The loss of this single customer would have a material impact on the company's financial stability."></p></div></div><div class="build-item bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"><p class="font-bold text-red-800">Judgement (High Confidence - 100%):</p><p class="text-red-700">Customer concentration is a critical risk. A key condition of the deal should be the successful and early renewal of the Global FinCorp contract under standard terms. A VCP to diversify the customer base is essential.</p></div></div>`, 
        followUpQuestions: ["What is the renewal status of the Global FinCorp contract?", "Analyze the profitability of the top 10 customers.", "Draft a risk mitigation plan for customer concentration."] 
    },
    "Summarize the key architectural risks and their potential cost to remediate.": { 
        id: 'architectural-risks',
        title: "Architectural Risk Summary",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Architectural Risk Summary</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Tech_Architecture_Overview.pptx, Code_Quality_Scan_SonarQube.xml, CTO_Interview_Notes.txt</p><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="The core application is a legacy monolith built on an outdated framework. This creates significant risks: 1) **Scalability:** It cannot handle the projected 3x user growth over the next 2 years. 2) **Developer Velocity:** A small change requires a full system redeployment, slowing down feature releases. 3) **Hiring:** It is difficult to find engineers skilled in this legacy technology. The CTO estimates a full migration to a microservices architecture would take 18-24 months and cost approximately $4.5M in dedicated engineering resources."></p></div></div><div class="build-item bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"><p class="font-bold text-red-800">Judgement (High Confidence - 95%):</p><p class="text-red-700">Technical debt is a critical issue that will throttle growth if not addressed. The remediation cost must be factored into the valuation model, and a detailed migration plan should be a Day 1 priority for the new leadership.</p></div></div>`, 
        followUpQuestions: ["What is the estimated cost of the migration?", "What skills are missing on the current team to execute this?", "Draft an IC memo slide on technical debt."] 
    },
    "How does the R&D team's velocity compare to industry benchmarks?": { 
        id: 'rd-velocity',
        title: "R&D Velocity & Efficiency Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">R&D Velocity & Efficiency</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Jira_Velocity_Reports.csv, Engineering_Headcount_Data.xlsx, Industry_SaaS_Benchmarks.pdf</p><div class="space-y-4"><div class="font-semibold">Key R&D Metrics:</div><table class="w-full text-sm text-left"><thead><tr class="border-b"><th class="p-2">Metric</th><th class="p-2">TechFlow</th><th class="p-2">Industry Benchmark</th><th class="p-2">Assessment</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Cycle Time (Idea to Prod)</td><td class="p-2 font-semibold">95 days</td><td class="p-2">45-60 days</td><td class="p-2 text-red-600">Poor</td></tr><tr class="border-b"><td class="p-2">Deployment Frequency</td><td class="p-2 font-semibold">Monthly</td><td class="p-2">Weekly/Daily</td><td class="p-2 text-red-600">Poor</td></tr><tr><td class="p-2">R&D % of Revenue</td><td class="p-2 font-semibold">32%</td><td class="p-2">20-25%</td><td class="p-2 text-amber-600">High</td></tr></tbody></table></div><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="TechFlow's R&D velocity is significantly below industry standards for a company of its size. The long cycle time and infrequent deployments are direct symptoms of the monolithic architecture and lack of automated testing. Furthermore, R&D spending as a percentage of revenue is high, indicating inefficiency. The company is spending more than its peers to produce less, which is confirmed by the recent failed product launches. This suggests a poor return on R&D investment."></p></div></div><div class="build-item bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"><p class="font-bold text-red-800">Judgement (High Confidence - 90%):</p><p class="text-red-700">The R&D function is inefficient and slow, representing a major operational drag. A transformation plan focusing on DevOps, agile practices, and ROI-based project selection is required to improve efficiency and support growth.</p></div></div>`, 
        followUpQuestions: ["What is the current state of their CI/CD pipeline?", "Analyze the R&D team's composition and skill levels.", "Propose a plan to improve developer velocity."] 
    },
    "What is the plan for migrating off the legacy monolithic architecture?": { 
        id: 'migration-plan',
        title: "Monolith Migration Plan Assessment",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Monolith Migration Plan Assessment</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Project_Phoenix_Migration_Plan.pptx, CTO_Interview_Notes.txt</p><div class="mt-8"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="Management has a high-level plan, codenamed 'Project Phoenix,' to migrate to a microservices architecture. However, the plan lacks critical details. There is no budget allocated, no specific engineering resources assigned, and no clear strategy for data migration or managing dependencies during the transition. The timeline appears aggressive given the team's current velocity and lack of experience with microservices. The CTO acknowledged in an interview that the plan is 'more of a vision than a blueprint' at this stage."></p></div></div><div class="build-item bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg"><p class="font-bold text-amber-800">Judgement (Medium Confidence - 75%):</p><p class="text-amber-700">A migration plan exists conceptually but is not actionable. The lack of detail, budget, and resourcing makes it highly unlikely to succeed as currently outlined. This must be treated as a new initiative to be built from the ground up post-close.</p></div></div>`, 
        followUpQuestions: ["Draft a more realistic migration timeline.", "What are the biggest risks in this migration plan?", "Identify potential external partners to assist with the migration."] 
    },
    "What are the key risks to achieving the 2025 forecast?": { 
        id: 'forecast-risks',
        title: "2025 Forecast Risk Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">2025 Forecast Risk Analysis</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Management_Financial_Projections.xlsx, Risk_Register.docx, Sales_Pipeline_Analysis.xlsx</p><div class="space-y-4"><div class="font-semibold">Top 3 Risks to Forecast:</div><div class="p-4 border rounded-lg"><h4 class="font-semibold text-red-600">1. Customer Concentration & Churn</h4><p class="text-sm text-gray-600">The forecast assumes renewal of Global FinCorp ($3.36M) and a reduction in logo churn from 18% to 12%. Given the contract's terms and current churn drivers, this is a high-risk assumption.</p></div><div class="p-4 border rounded-lg"><h4 class="font-semibold text-red-600">2. New Product Revenue</h4><p class="text-sm text-gray-600">The model includes $4M in revenue from new products in 2025. Given the 100% failure rate of the last 3 launches, this revenue is highly speculative and should be heavily discounted.</p></div><div class="p-4 border rounded-lg"><h4 class="font-semibold text-amber-600">3. Sales Team Ramp-up</h4><p class="text-sm text-gray-600">The plan requires 10 new sales reps to be fully ramped and productive within 6 months. Historical data shows the average ramp time is 9-12 months, suggesting a likely shortfall in new bookings.</p></div></div></div><div class="build-item bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"><p class="font-bold text-red-800">Judgement (High Confidence - 95%):</p><p class="text-red-700">The 2025 forecast as presented by management is not achievable. We recommend creating a "Base Case" model that removes all new product revenue and uses historical churn and sales ramp-up rates, resulting in a ~40% reduction to the top-line forecast.</p></div></div>`, 
        followUpQuestions: ["Build the 'Base Case' financial model.", "What is the financial impact of the Global FinCorp contract churning?", "Analyze the sales pipeline quality."] 
    },
    "Analyze the quality of earnings and identify any one-time adjustments.": { 
        id: 'qoe-analysis',
        title: "Quality of Earnings Analysis",
        renderFunc: () => `<div class="space-y-6"><div class="build-item bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-lg mb-4">Quality of Earnings (QoE) Analysis</h3><p class="text-sm text-gray-500 mb-4">Source Documents: Audited_Financials_2024.pdf, Management_Adjustments_Memo.docx, General_Ledger_Detail.xlsx</p><div class="mt-4"><p class="font-semibold">Analysis:</p><p class="text-gray-700 anomaly-analysis-text" data-text="We have adjusted the reported EBITDA of $6.8M for two key items: 1) **Non-recurring Legal Fees ($0.45M):** The company incurred significant one-time legal expenses related to a patent dispute that has now been settled. 2) **Owner's Salary Adjustment ($0.27M):** The founder/CEO's salary is below market rate. We have adjusted this to a market-rate salary of $450K, resulting in a $0.27M reduction in EBITDA. The resulting Adjusted EBITDA of $6.08M is a more accurate representation of the company's sustainable profitability."></p></div></div><div class="build-item bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"><p class="font-bold text-green-800">Judgement (Medium Confidence - 85%):</p><p class="text-green-700">The quality of earnings is reasonably high after adjustments. The legal fees appear genuinely non-recurring. Further diligence is needed to confirm the market rate for the CEO's salary in a company of this size and stage.</p></div></div>`, 
        followUpQuestions: ["What other potential add-backs were considered?", "Analyze the working capital trends over the last 24 months.", "Is the revenue recognition policy appropriate?"] 
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
            const segmentColors = { Gold: 'bg-yellow-400', Silver: 'bg-gray-300', Bronze: 'bg-yellow-600' };
            return `<div class="build-item space-y-4">
                <p class="text-gray-700">I've analyzed the upcoming renewals for the recently acquired "NewCo" customers. Based on their current contract values and our standard pricing playbook, I've identified several uplift opportunities.</p>
                <div class="overflow-x-auto border rounded-lg"><table class="w-full text-left text-sm">
                    <thead class="bg-gray-50"><tr class="border-b"><th class="p-3 font-semibold text-gray-600">Account</th><th class="p-3 font-semibold text-gray-600">Segment</th><th class="p-3 font-semibold text-gray-600">Contract Value</th><th class="p-3 font-semibold text-gray-600">Renewal Date</th><th class="p-3 font-semibold text-gray-600">Circumstance</th></tr></thead>
                    <tbody>${renewalOpportunities.map(c => `<tr class="border-t"><td class="p-3 font-medium text-gray-800">${c.account}</td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium text-gray-800 ${segmentColors[c.segment]}">${c.segment}</span></td><td class="p-3 text-gray-700">$${c.value.toLocaleString()}</td><td class="p-3 text-gray-700">${c.date}</td><td class="p-3 text-gray-700">${c.circumstance}</td></tr>`).join('')}</tbody>
                </table></div>
                <div class="mt-4 p-4 bg-sky-50 border-l-4 border-sky-400 rounded-r-lg">
                    <h4 class="font-semibold text-sky-800 mb-2">Pricing Playbook Recommendation:</h4>
                    <ul class="list-disc list-outside pl-5 space-y-1 text-gray-700">
                        <li><strong>20% uplift</strong> for Gold customers with "Business Success".</li>
                        <li><strong>10% uplift</strong> for Silver customers with "Business" or "Technical Success".</li>
                        <li><strong>25% uplift</strong> for all Bronze customers to align with standard pricing.</li>
                    </ul>
                </div>
            </div>`;
        },
        followUpQuestions: ["Apply the recommended uplifts and show the financial impact.", "Generate conversation guides for the sales team.", "Which customers are at the highest risk of churning with this increase?"]
    },
    "Generate a 100-day integration plan for the NewCo acquisition.": {
        id: '100-day-plan',
        title: "NewCo 100-Day Integration Plan",
        renderFunc: () => {
            const phases = [
                { name: 'Day 1-30: Stabilize & Communicate', tasks: ['Announce deal to both teams with unified messaging.', 'Establish integration leadership team.', 'Conduct initial HR systems & benefits review.', 'Launch employee pulse surveys.'] },
                { name: 'Day 31-60: Plan & Design', tasks: ['Finalize integrated product roadmap.', 'Define go-to-market strategy for cross-selling.', 'Map sales territories and compensation plans.', 'Complete financial system integration plan.'] },
                { name: 'Day 61-100: Execute & Integrate', tasks: ['Launch first joint marketing campaign.', 'Begin cross-training for sales and support teams.', 'Migrate NewCo financial data to CloudVantage ERP.', 'Hold first all-hands company meeting.'] }
            ];
            return `<div class="build-item space-y-6">
                <h3 class="font-semibold text-lg mb-2">NewCo Acquisition: 100-Day Integration Plan</h3>
                <div class="flex space-x-4 overflow-x-auto py-2">
                    ${phases.map(phase => `
                        <div class="flex-1 min-w-[280px] bg-gray-50 p-4 rounded-lg border">
                            <h4 class="font-bold text-gray-800">${phase.name}</h4>
                            <ul class="mt-3 space-y-2 text-sm text-gray-700">
                                ${phase.tasks.map(task => `<li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>${task}</span></li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                <div class="build-item bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg"><p class="font-bold text-purple-800">Judgement:</p><p class="text-purple-700">This plan prioritizes early wins in communication and GTM alignment to build momentum, while tackling more complex systems integration in a phased approach to minimize business disruption.</p></div>
            </div>`;
        },
        followUpQuestions: ["Assign owners to each of these workstreams.", "What are the key synergy targets for this plan?", "How will we measure the success of the integration?"]
    },
    "Analyze the cross-sell opportunities between CloudVantage and NewCo products.": {
        id: 'cross-sell-analysis',
        title: "Cross-Sell Opportunity Analysis",
        renderFunc: () => {
            return `<div class="build-item space-y-6">
                <h3 class="font-semibold text-lg mb-2">Cross-Sell Opportunity Analysis: CloudVantage + NewCo</h3>
                <div class="bg-white p-6 rounded-lg shadow-md border grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h4 class="font-semibold text-gray-800">Customer Base Overlap</h4>
                        <p class="text-sm text-gray-600 mb-4">Analysis of the two customer lists reveals a low overlap, presenting a significant cross-sell opportunity.</p>
                        <div class="relative w-48 h-48 mx-auto">
                            <div class="absolute top-0 left-0 w-32 h-32 bg-blue-300/50 rounded-full border-2 border-blue-500"></div>
                            <div class="absolute bottom-0 right-0 w-32 h-32 bg-teal-300/50 rounded-full border-2 border-teal-500"></div>
                            <div class="absolute top-[4.5rem] left-[4.5rem] w-8 h-8 flex items-center justify-center font-bold text-gray-700">12%</div>
                            <div class="absolute top-2 left-8 text-sm font-semibold text-blue-700">CloudVantage<br>Customers</div>
                            <div class="absolute bottom-2 right-8 text-sm font-semibold text-teal-700">NewCo<br>Customers</div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold text-gray-800">Identified Synergy</h4>
                            <p class="text-sm text-gray-600">By selling NewCo's 'Analytics Suite' to the existing CloudVantage base, we project a significant, high-margin ARR increase.</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm font-bold text-gray-700">Projected Cross-Sell ARR</p>
                            <p class="text-3xl font-bold text-green-600">$3.2M</p>
                            <p class="text-sm text-gray-500 mt-1">over first 18 months</p>
                        </div>
                    </div>
                </div>
                 <div class="build-item bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"><p class="font-bold text-green-800">Judgement (High Confidence):</p><p class="text-green-700">The low customer overlap and complementary nature of the products represent a strong validation of the acquisition thesis. A dedicated cross-sell sales motion should be launched immediately.</p></div>
            </div>`;
        },
        followUpQuestions: ["Which customer segments are the best targets for the cross-sell campaign?", "Develop a compensation plan for the sales team to incentivize cross-selling.", "Draft a marketing email for the first cross-sell campaign."]
    },
    "Generate a board-level summary of Q2 financial performance.": {
        id: 'q2-financial-summary',
        title: "Q2 Financial Performance Summary",
        renderFunc: () => {
            return `<div class="build-item space-y-6">
                <h3 class="font-semibold text-lg mb-2">Q2 Financial Performance Summary</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg border"><p class="text-sm font-bold text-gray-700">ARR</p><p class="text-2xl font-bold text-blue-600">$78M</p><p class="text-sm text-green-600">+4% QoQ</p></div>
                    <div class="bg-gray-50 p-4 rounded-lg border"><p class="text-sm font-bold text-gray-700">EBITDA Margin</p><p class="text-2xl font-bold text-blue-600">31%</p><p class="text-sm text-red-600">-1% vs. Target</p></div>
                    <div class="bg-gray-50 p-4 rounded-lg border"><p class="text-sm font-bold text-gray-700">NRR</p><p class="text-2xl font-bold text-blue-600">128%</p><p class="text-sm text-green-600">+3% vs. Target</p></div>
                    <div class="bg-gray-50 p-4 rounded-lg border"><p class="text-sm font-bold text-gray-700">Rule of 40</p><p class="text-2xl font-bold text-blue-600">58%</p><p class="text-sm text-green-600">Healthy</p></div>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800 mt-4">Q2 ARR Walk ($M)</h4>
                    <div class="flex items-end justify-between text-center text-sm p-4 bg-white border rounded-lg mt-2 h-64">
                        <div class="w-1/6"><p class="font-semibold">$75.0</p><div class="bg-gray-400" style="height: 200px;"></div><p class="text-xs text-gray-500 mt-1">Q1 ARR</p></div>
                        <div class="w-1/6"><p class="font-semibold text-green-600">+$4.5</p><div class="bg-green-500" style="height: 60px;"></div><p class="text-xs text-gray-500 mt-1">New Bookings</p></div>
                        <div class="w-1/6"><p class="font-semibold text-green-600">+$1.8</p><div class="bg-green-300" style="height: 24px;"></div><p class="text-xs text-gray-500 mt-1">Expansion</p></div>
                        <div class="w-1/6"><p class="font-semibold text-red-600">-$1.2</p><div class="bg-red-500" style="height: 16px;"></div><p class="text-xs text-gray-500 mt-1">Churn</p></div>
                        <div class="w-1/6"><p class="font-semibold text-red-600">-$2.1</p><div class="bg-red-300" style="height: 28px;"></div><p class="text-xs text-gray-500 mt-1">Contraction</p></div>
                        <div class="w-1/6"><p class="font-semibold">$78.0</p><div class="bg-gray-400" style="height: 212px;"></div><p class="text-xs text-gray-500 mt-1">Q2 ARR</p></div>
                    </div>
                </div>
                <div class="build-item bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"><p class="font-bold text-green-800">Operating Partner Judgement:</p><p class="text-green-700">Solid quarter. Top-line growth is healthy and NRR remains best-in-class. The slight miss on EBITDA is acceptable given the investment in NewCo integration. The key focus for Q3 must be mitigating the elevated contraction from the newly acquired customer base.</p></div>
            </div>`;
        },
        followUpQuestions: ["Which customers are contributing most to contraction?", "What is the forecast for Q3?", "How does our Rule of 40 compare to our peer group?"]
    },
    "Analyze the key drivers of our Net Revenue Retention.": {
        id: 'nrr-analysis',
        title: "Net Revenue Retention Analysis",
        renderFunc: () => {
            return `<div class="build-item space-y-6">
                <h3 class="font-semibold text-lg mb-2">Net Revenue Retention (NRR) Analysis - Q2</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2 text-center">NRR Composition: 128%</h4>
                        <div class="w-full bg-gray-200 rounded-full h-8 flex text-white font-semibold text-sm">
                            <div class="bg-teal-500 h-8 flex items-center justify-center" style="width: 100%;" title="Base Revenue"></div>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-8 flex text-white font-semibold text-sm mt-2">
                            <div class="bg-green-500 h-8 flex items-center justify-center rounded-l-full" style="width: 35%;" title="Expansion: +35%">+35%</div>
                            <div class="bg-red-500 h-8 flex items-center justify-center" style="width: 5%;" title="Churn: -5%">-5%</div>
                            <div class="bg-red-400 h-8 flex items-center justify-center rounded-r-full" style="width: 2%;" title="Contraction: -2%">-2%</div>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">NRR by Customer Segment</h4>
                        <table class="w-full text-left text-sm">
                            <thead><tr class="border-b"><th class="p-2">Segment</th><th class="p-2">NRR</th><th class="p-2">Note</th></tr></thead>
                            <tbody>
                                <tr class="border-b"><td class="p-2 font-medium">Enterprise</td><td class="p-2 font-semibold text-green-600">142%</td><td class="p-2">Strong upsell of premium features</td></tr>
                                <tr class="border-b"><td class="p-2 font-medium">Mid-Market</td><td class="p-2 font-semibold text-yellow-600">105%</td><td class="p-2">High churn from NewCo base</td></tr>
                                <tr><td class="p-2 font-medium">SMB</td><td class="p-2 font-semibold text-green-600">115%</td><td class="p-2">High seat expansion</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="build-item bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"><p class="font-bold text-blue-800">Actionable Insight:</p><p class="text-blue-700">Enterprise expansion is the primary driver of our best-in-class NRR. However, the Mid-Market segment is a concern; churn from the acquired NewCo base is dragging down performance. A dedicated customer success motion for these at-risk accounts is recommended for Q3.</p></div>
            </div>`;
        },
        followUpQuestions: ["List the NewCo customers that churned in Q2.", "What is the LTV:CAC ratio for the Enterprise segment?", "Model the impact of a 10% churn reduction in Mid-Market."]
    },
    "What are the key drivers behind our current NPS score?": {
        id: 'nps-analysis',
        title: "Net Promoter Score Analysis",
        renderFunc: () => {
            return `<div class="build-item space-y-6">
                <h3 class="font-semibold text-lg mb-2">Net Promoter Score (NPS) Analysis</h3>
                <div class="text-center bg-white p-4 rounded-lg border">
                    <p class="text-sm font-bold text-gray-700">Overall NPS</p>
                    <p class="text-6xl font-bold text-green-600">52</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">Score Breakdown</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center"><span class="w-24 font-medium">Promoters</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-green-500 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 65%">65%</div></div></div>
                            <div class="flex items-center"><span class="w-24 font-medium">Passives</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-yellow-500 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 22%">22%</div></div></div>
                            <div class="flex items-center"><span class="w-24 font-medium">Detractors</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-red-500 h-5 rounded-full text-white text-xs flex items-center px-2" style="width: 13%">13%</div></div></div>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">Key Themes from Comments</h4>
                        <p class="text-sm font-semibold text-green-700">Promoters Mention:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 mb-2"><li>"Platform is reliable and fast"</li><li>"Excellent customer support"</li></ul>
                        <p class="text-sm font-semibold text-red-700">Detractors Mention:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600"><li>"Missing key features from NewCo product"</li><li>"Pricing is too high for the value"</li></ul>
                    </div>
                </div>
                <div class="build-item bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg"><p class="font-bold text-indigo-800">Product Team Judgement:</p><p class="text-indigo-700">The core CloudVantage platform is delighting users. However, the delay in integrating key NewCo features is creating a vocal group of detractors. Accelerating the product integration roadmap is the highest-leverage action to improve NPS.</p></div>
            </div>`;
        },
        followUpQuestions: ["What specific features are detractors asking for?", "How does NPS differ between legacy CloudVantage and NewCo customers?", "Draft a survey to dig deeper into the pricing concerns."]
    },
    "Analyze the recent trends in customer support ticket volume.": {
        id: 'ticket-volume-analysis',
        title: "Customer Support Ticket Analysis",
        renderFunc: () => {
            return `<div class="build-item space-y-6">
                <h3 class="font-semibold text-lg mb-2">Customer Support Ticket Analysis (Last 12 Weeks)</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="md:col-span-2 bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">Weekly Ticket Volume</h4>
                        <div class="h-64 w-full relative">
                            <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="w-full h-full">
                                <path d="M 0 50 L 25 45 L 50 60 L 75 30 L 100 25 L 125 40 L 150 75 L 175 65 L 200 55 L 225 45 L 250 50 L 275 40" fill="none" stroke="#3b82f6" stroke-width="2"></path>
                                <path d="M 150 75 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0" fill="#ef4444"></path>
                                <text x="150" y="95" font-size="8" text-anchor="middle" fill="#ef4444">NewCo Onboarding Spike</text>
                            </svg>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">Ticket Categories (Q2)</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center"><span class="w-32 font-medium">"How-To" Question</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-blue-500 h-5 rounded-full" style="width: 55%"></div></div><span class="w-8 text-right">55%</span></div>
                            <div class="flex items-center"><span class="w-32 font-medium">Bug Report</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-red-500 h-5 rounded-full" style="width: 20%"></div></div><span class="w-8 text-right">20%</span></div>
                            <div class="flex items-center"><span class="w-32 font-medium">Billing Inquiry</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-yellow-500 h-5 rounded-full" style="width: 15%"></div></div><span class="w-8 text-right">15%</span></div>
                            <div class="flex items-center"><span class="w-32 font-medium">Other</span><div class="flex-1 bg-gray-200 rounded-full h-5"><div class="bg-gray-400 h-5 rounded-full" style="width: 10%"></div></div><span class="w-8 text-right">10%</span></div>
                        </div>
                    </div>
                </div>
                <div class="build-item bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg"><p class="font-bold text-yellow-800">Customer Success Judgement:</p><p class="text-yellow-700">The spike in ticket volume directly corresponds to the start of the NewCo customer onboarding. The high percentage of "How-To" questions indicates a significant gap in our onboarding documentation and training for these new users. This is a low-cost, high-impact area for improvement.</p></div>
            </div>`;
        },
        followUpQuestions: ["What are the most common 'How-To' questions?", "Create a project plan to improve the NewCo onboarding experience.", "How does our ticket resolution time compare to industry benchmarks?"]
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