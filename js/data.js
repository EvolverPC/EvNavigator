// js/data.js - Centralized Application Data

const menuItems = [
    { id: 'home', label: 'Home', icon: `<svg>...</svg>`},
    { id: 'portco', label: 'PortCo', icon: `<svg>...</svg>`},
    { id: 'aria', label: 'Aria', icon: `<svg>...</svg>`},
    { id: 'workspace', label: "Workspace", icon: `<svg>...</svg>`},
    { id: 'modeling', label: 'Modeling', icon: `<svg>...</svg>`}
];

const techflow_anomalies = [
    { id: 'arr-comp', title: 'Anomaly #1: Non-Standard ARR Composition', issue: 'ARR includes projected perpetual revenue spread over 18 months', severity: 'CRITICAL', sourceDocuments: ['Financial_Statements_2024.pdf', 'Revenue_Recognition_Policy.pdf'], impact: 'Overstated recurring revenue metrics', analysis: 'The reported $12M ARR is composed of multiple revenue streams that do not align with generally accepted ARR definitions...' },
    { id: 'maint-fee', title: 'Anomaly #2: Inconsistent Maintenance Fee Structure', issue: 'Maintenance fees vary from 12% to 28% of contract value', severity: 'HIGH', sourceDocuments: ['Contract_Analysis_2023-2024.xlsx', 'Customer_Agreements_Sample.pdf'], impact: 'Revenue predictability and pricing strategy concerns', analysis: 'Our contract analysis revealed significant inconsistencies in maintenance fee structures across the customer base...' },
    { id: 'product-launch', title: 'Anomaly #3: Failed Recent Product Launches', issue: 'Zero sales recorded for 3 most recent product launches', severity: 'CRITICAL', sourceDocuments: ['Product_Launch_Reports_2024-2025.pdf', 'Sales_Pipeline_Analysis.xlsx'], impact: 'Innovation capacity and market fit concerns', analysis: `Three recent product launches have generated zero revenue to date...` }
];

const techflow_minorObservations = [
    { id: 'obs1', category: 'Documentation', text: 'Inconsistent naming conventions found across multiple technical documents.' },
    // ... all 12 minor observations
];

const techflow_workstreamData = [
    { id: 'business', title: 'Business & Strategy', icon: `<svg>...</svg>`, cards: [{label: "Market Size (TAM)", value: "$5.2B"}, {label: "Market CAGR", value: "18%"}, {label: "Competitive Moat", value: "Medium"}], suggestedQuestions: ["Summarize the competitive landscape and TechFlow's position.", "What are the key market trends impacting the company?", "Analyze the credibility of the 5-year strategic plan."] },
    // ... all 4 workstreams
];

const renewalOpportunities = [
    { account: 'Global Enterprises Inc.', segment: 'Gold', value: 3245000, date: 'July 15, 2025', circumstance: 'Business Success' },
    // ... all 10 opportunities
];

const suggestedPrompts = {
    'default': [ /* ... */ ],
    'sales-renewals': [ /* ... */ ],
    // ... all prompt categories
};

const selectableNotes = [
    { id: 'note1', text: 'The management team appears strong but lacks experience in a private equity-backed environment.' },
    // ... all 4 notes
];

const capabilities = [
    { id: 'sales-strategy', discipline: 'Sales', name: 'Sales Strategy' },
    // ... all 8 capabilities
];

const capabilityScenarios = {
    'sales-strategy': { 1: { 2: { actions: ['Define basic lead qualification criteria (e.g., BANT).', 'Document the current sales process.'], insight: '...' } } /* ... */ },
    // ... all scenarios for all capabilities
};

const techflow_ariaResponses = {
    "Summarize the competitive landscape and TechFlow's position.": { /* ... */ },
    // ... all pre-canned Aria responses
};