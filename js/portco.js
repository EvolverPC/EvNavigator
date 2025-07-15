// js/portco.js - Logic for the individual PortCo dashboards

document.addEventListener('DOMContentLoaded', async () => {
    // Load shared components (header, sidebar) first
    await loadSharedComponents();
    
    // Determine the correct company ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const companyIdFromUrl = urlParams.get('company');

    if (!companyIdFromUrl) {
        document.getElementById('main-content').innerHTML = `
            <div class="text-center py-16">
                <h2 class="text-xl font-semibold">No Company Selected</h2>
                <p class="text-gray-500 mt-2">Please return to the Home page and select a portfolio company.</p>
            </div>`;
        return;
    }

    // Update the global state to match the URL
    let state = loadState();
    state.selectedCompanyId = companyIdFromUrl;
    saveState(state);

    // Render the page based on the now-correct company ID
    renderPortcoPage(companyIdFromUrl);
    
    // Update the header dropdown to reflect the current company
    Navigation.updateCompanySelector();
});


function renderPortcoPage(companyId) {
    const mainContent = document.getElementById('main-content');

    switch (companyId) {
        case 'techflow-solutions':
            mainContent.innerHTML = renderTechFlowDashboard();
            break;
        case 'cloudvantage':
            mainContent.innerHTML = renderCloudVantageDashboard();
            initializeCloudVantageInteractions();
            break;
        case 'dataflow-systems':
        case 'innovate-inc':
        case 'scaleops':
            mainContent.innerHTML = renderGenericDashboard(companyId);
            break;
        default:
            mainContent.innerHTML = `<div class="text-center py-16"><h2>Company Not Found</h2></div>`;
            break;
    }
    
    initializeCommonEventListeners();
}

// =================================================================
// DASHBOARD RENDERING FUNCTIONS (NOW THEMED)
// =================================================================

function renderTechFlowDashboard() {
    const workstreams = [
        { title: 'Data Extraction', status: 'Completed', statusClass: 'status-completed', metrics: [{value: 247, label: 'Documents'}, {value: '1,834', label: 'Data Points'}] },
        { title: 'Anomaly Detection', status: 'In Progress', statusClass: 'status-progress', alert: true, metrics: [{value: '3', label: 'Critical Flags'}, {value: '12', label: 'Minor Issues'}] },
        { title: 'Valuation Modeling', status: 'Completed', statusClass: 'status-completed', metrics: [{value: '$85M', label: 'Valuation'}, {value: '6.8x', label: 'Revenue Multiple'}] },
        { title: 'Synergy Analysis', status: 'In Progress', statusClass: 'status-progress', metrics: [{value: '67%', label: 'Portfolio Fit'}, {value: '$8.2M', label: 'Synergy Value'}] },
        { title: 'Growth Modeling', status: 'Pending', statusClass: 'status-pending', metrics: [{value: '-', label: 'Scenarios'}, {value: '-', label: 'Growth Rate'}] },
        { title: 'IC Dashboard', status: 'Pending', statusClass: 'status-pending', metrics: [{value: 'T-5 Days', label: 'Readiness'}, {value: '5', label: 'Days Remaining'}] }
    ];

    return `
        <div class="portco-container">
            <div class="portco-header">
                <div><h1 class="portco-title">TechFlow Solutions</h1><p class="portco-subtitle">Series B SaaS • $55M ARR • Day 9 of 14</p></div>
                <div class="portco-status-badge status-progress"><span class="status-ping"></span>Analysis in Progress</div>
            </div>
            <div class="portco-card">
                <div class="progress-header"><h2 class="card-title">Due Diligence Progress</h2><span class="progress-percent">65% Complete</span></div>
                <div class="progress-bar-container"><div class="progress-bar-fill" style="width: 65%"></div></div>
                <div class="progress-labels"><span>Day 1</span><span>Decision Ready (Day 14)</span></div>
            </div>
            <div class="portco-grid-2-1">
                <div class="space-y-8">
                    <div class="portco-card"><h2 class="card-title">Live Scorecard</h2><div class="scorecard-grid"><div class="score-item"><p class="score-label">Financial Health</p><p class="score-value" style="color:var(--status-success)">8.4</p></div><div class="score-item"><p class="score-label">Operations</p><p class="score-value" style="color:var(--accent-blue)">7.8</p></div><div class="score-item"><p class="score-label">Growth Potential</p><p class="score-value" style="color:var(--purple)">9.1</p></div><div class="score-item"><p class="score-label">Strategic Fit</p><p class="score-value" style="color:var(--status-warning)">6.7</p></div></div></div>
                    <div class="portco-card"><h2 class="card-title">Recent Activity</h2><div class="activity-list"><div class="activity-item activity-success"><p class="activity-title">Valuation Model Complete</p><p class="activity-time">2 hours ago</p></div><div class="activity-item activity-error"><p class="activity-title">Customer Churn Anomaly Detected</p><p class="activity-time">4 hours ago</p></div><div class="activity-item activity-info"><p class="activity-title">Synergy Analysis Updated</p><p class="activity-time">6 hours ago</p></div></div></div>
                </div>
                <div class="portco-card">
                    <h2 class="card-title">Diligence Workstreams</h2>
                    <div class="workstream-grid">${workstreams.map(ws => `<div class="workstream-card ${ws.alert ? 'alert' : ''}" ${ws.alert ? 'data-action="navigate-aria" data-context="anomaly-report"' : ''}>${ws.alert ? '<span class="workstream-alert-dot"></span>' : ''}<div class="workstream-header"><h3 class="workstream-title">${ws.title}</h3><span class="workstream-status ${ws.statusClass}">${ws.status}</span></div><div class="workstream-metrics">${ws.metrics.map(m => `<div><p class="workstream-value">${m.value}</p><p class="workstream-label">${m.label}</p></div>`).join('')}</div></div>`).join('')}</div>
                </div>
            </div>
        </div>
    `;
}

function renderCloudVantageDashboard() {
    const kpis = [
        { label: 'ARR', value: '$78M', change: '+4% QoQ', changeColor: 'var(--status-success)' },
        { label: 'Net Revenue Retention', value: '128%', change: '+3% vs Target', changeColor: 'var(--status-success)' },
        { label: 'EBITDA Margin', value: '31%', change: '-1% vs Target', changeColor: 'var(--status-error)' },
        { label: 'Rule of 40', value: '58%', change: 'Healthy', changeColor: 'var(--status-success)' }
    ];
    const programs = [
        { name: 'Enterprise GTM Strategy', dept: 'Sales', status: 'On Track', statusClass: 'status-completed', progress: 75 },
        { name: 'ABM Campaign Launch', dept: 'Marketing', status: 'On Track', statusClass: 'status-completed', progress: 90 },
        { name: 'Channel Partner Program', dept: 'Partners', status: 'At Risk', statusClass: 'status-warning', progress: 45 },
        { name: 'Platform Scalability Initiative', dept: 'Engineering', status: 'On Track', statusClass: 'status-completed', progress: 60 },
        { name: 'AI-Powered Feature Dev', dept: 'Product', status: 'Behind', statusClass: 'status-error', progress: 30 },
        { name: 'Leadership Development', dept: 'HR', status: 'On Track', statusClass: 'status-completed', progress: 85 }
    ];
    return `
        <div class="portco-container">
            <div class="portco-header">
                <div><h1 class="portco-title">CloudVantage</h1><p class="portco-subtitle">Growth Stage • Q2 2025</p></div>
                <div class="portco-status-badge status-completed"><span class="status-dot-solid"></span>Healthy</div>
            </div>
            <div class="kpi-grid">${kpis.map(kpi => `<div class="kpi-card"><p class="kpi-label">${kpi.label}</p><p class="kpi-value">${kpi.value}</p><p class="kpi-detail" style="color: ${kpi.changeColor};">${kpi.change}</p></div>`).join('')}</div>
            <div class="portco-card">
                <h2 class="card-title">Active Programs</h2>
                <div class="program-list">${programs.map(p => `<div class="program-item"><div class="program-name">${p.name}</div><div class="program-dept">${p.dept}</div><div class="program-status-wrapper"><span class="program-status ${p.statusClass}">${p.status}</span></div><div class="program-progress-container"><div class="program-progress-bar" style="width: ${p.progress}%"></div></div><div class="program-progress-text">${p.progress}%</div></div>`).join('')}</div>
            </div>
            <div class="portco-card">
                <h2 class="card-title">Departmental Updates</h2>
                <div class="tabs-container"><nav class="tab-nav" data-tab-group="dept"><button data-tab-name="sales" class="tab-button active">Sales</button><button data-tab-name="marketing" class="tab-button">Marketing</button><button data-tab-name="product" class="tab-button">Product</button><button data-tab-name="engineering" class="tab-button">Engineering</button><button data-tab-name="hr" class="tab-button">HR</button></nav></div>
                <div id="dept-content-container" class="tab-content-area"></div>
            </div>
        </div>
    `;
}

function renderGenericDashboard(companyId) {
    const title = companyId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return `
        <div class="portco-container">
            <div class="portco-header">
                <div><h1 class="portco-title">${title}</h1><p class="portco-subtitle">Strategize Stage</p></div>
                <div class="portco-status-badge status-completed"><span class="status-dot-solid"></span>Healthy</div>
            </div>
            <div class="portco-card text-center p-8">
                <h2 class="card-title">Dashboard Under Construction</h2>
                <p class="text-secondary mt-2">A detailed dashboard for ${title} is being configured.</p>
            </div>
        </div>
    `;
}

// =================================================================
// INTERACTION INITIALIZERS
// =================================================================

function initializeCloudVantageInteractions() {
    const container = document.getElementById('main-content');
    const tabButtons = container.querySelectorAll('[data-tab-group="dept"] .tab-button');
    const deptContentContainer = container.querySelector('#dept-content-container');

    const deptContents = {
        sales: {
            metrics: [ { label: 'Quota Attainment', value: '103%', color: 'var(--status-success)' }, { label: 'Pipeline Coverage', value: '3.5x', color: 'var(--text-primary)' }, { label: 'Avg. Deal Size', value: '$85k', color: 'var(--text-primary)' }, { label: 'Budget Adherence', value: '+3.1%', color: 'var(--status-error)' } ],
            content: `<p><strong class="font-semibold">Highlights:</strong> Exceeded quota, driven by strong performance in the new Enterprise segment. Landed two Fortune 500 logos.</p><p><strong class="font-semibold">Lowlights:</strong> Mid-market team struggled, hitting only 85% of their number. Budget overage due to higher commission payouts on large deals.</p><p><strong class="font-semibold">Next Period Focus:</strong> Double down on Enterprise playbook, provide additional training for mid-market reps.</p><p><strong class="font-semibold">Help Wanted:</strong> Need marketing to accelerate SQL delivery for the mid-market segment.</p>`,
            context: 'sales-renewals'
        },
        marketing: {
            metrics: [ { label: 'MQLs vs Target', value: '115%', color: 'var(--status-success)' }, { label: 'SQLs vs Target', value: '92%', color: 'var(--status-warning)' }, { label: 'CAC', value: '$12.5k', color: 'var(--text-primary)' }, { label: 'Budget Adherence', value: '-1.5%', color: 'var(--status-success)' } ],
            content: `<p><strong class="font-semibold">Highlights:</strong> ABM campaign for Enterprise was a huge success, generating high-quality leads. Managed budget effectively.</p><p><strong class="font-semibold">Lowlights:</strong> MQL-to-SQL conversion rate dropped, indicating some lead quality issues in our top-of-funnel content.</p><p><strong class="font-semibold">Next Period Focus:</strong> Optimize lead scoring model, launch targeted mid-market campaigns.</p><p><strong class="font-semibold">Help Wanted:</strong> Sales feedback on lead quality is critical to our optimization efforts.</p>`,
            context: 'marketing'
        },
        product: {
            metrics: [ { label: 'Roadmap Adherence', value: '70%', color: 'var(--status-error)' }, { label: 'Feature Adoption', value: '45%', color: 'var(--text-primary)' }, { label: 'NPS', value: '52', color: 'var(--status-success)' }, { label: 'Budget Adherence', value: '+5.2%', color: 'var(--status-error)' } ],
            content: `<p><strong class="font-semibold">Highlights:</strong> Successfully launched two major platform enhancements which have received positive customer feedback and contributed to a high NPS score.</p><p><strong class="font-semibold">Lowlights:</strong> The flagship AI-Powered Feature is significantly delayed due to unforeseen technical complexity. This has caused budget overruns.</p><p><strong class="font-semibold">Next Period Focus:</strong> Finalize a revised, de-risked timeline for the AI feature. Conduct customer interviews to validate the next set of roadmap priorities.</p><p><strong class="font-semibold">Help Wanted:</strong> Need engineering to provide a firm estimate on the remaining work for the AI feature to reset expectations.</p>`,
            context: 'product'
        },
        engineering: {
            metrics: [ { label: 'Sprint Completion', value: '88%', color: 'var(--status-warning)' }, { label: 'Cycle Time', value: '4.2d', color: 'var(--text-primary)' }, { label: 'Uptime', value: '99.98%', color: 'var(--status-success)' }, { label: 'Budget Adherence', value: '+2.8%', color: 'var(--status-warning)' } ],
            content: `<p><strong class="font-semibold">Highlights:</strong> Maintained excellent platform stability and uptime. Successfully completed critical scalability work ahead of schedule.</p><p><strong class="font-semibold">Lowlights:</strong> Team velocity was impacted by the complexity of the AI feature, leading to lower sprint completion rates. Some technical debt was incurred to meet deadlines.</p><p><strong class="font-semibold">Next Period Focus:</strong> Dedicate one sprint to tech debt reduction. Finalize architecture for the AI feature.</p><p><strong class="font-semibold">Help Wanted:</strong> Clearer, finalized requirements from Product for the AI feature to prevent further scope creep.</p>`,
            context: 'engineering'
        },
        hr: {
            metrics: [ { label: 'Employee Attrition', value: '8%', color: 'var(--status-success)' }, { label: 'Time to Hire', value: '42d', color: 'var(--text-primary)' }, { label: 'eNPS', value: '65', color: 'var(--status-success)' }, { label: 'Budget Adherence', value: '-2.1%', color: 'var(--status-success)' } ],
            content: `<p><strong class="font-semibold">Highlights:</strong> Employee satisfaction (eNPS) is at an all-time high. Attrition remains well below industry average. The leadership development program is receiving excellent feedback.</p><p><strong class="font-semibold">Lowlights:</strong> Time to hire for senior engineering roles remains a challenge.</p><p><strong class="font-semibold">Next Period Focus:</strong> Launch a new employee referral program to improve the engineering talent pipeline. Complete the annual compensation review.</p><p><strong class="font-semibold">Help Wanted:</strong> Engineering managers' participation in final-round interviews to speed up the hiring process.</p>`,
            context: 'hr'
        }
    };

    function renderDeptContent(dept) {
        const deptData = deptContents[dept];
        if (!deptData) return;
        
        deptContentContainer.innerHTML = `
            <div class="dept-kpi-grid">${deptData.metrics.map(metric => `<div class="dept-kpi-item"><p class="dept-kpi-label">${metric.label}</p><p class="dept-kpi-value" style="color: ${metric.color};">${metric.value}</p></div>`).join('')}</div>
            <div class="dept-content">${deptData.content}</div>
            <div class="dept-actions"><button data-action="navigate-aria" data-context="${deptData.context}" class="primary-button">Dive Deeper with Aria</button></div>
        `;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const dept = button.dataset.tabName;
            renderDeptContent(dept);
        });
    });

    renderDeptContent('sales');
}

function initializeCommonEventListeners() {
    document.getElementById('main-content').addEventListener('click', e => {
        const target = e.target.closest('[data-action="navigate-aria"]');
        if (target) {
            const context = target.dataset.context;
            const company = loadState().selectedCompanyId;
            window.location.href = `aria.html?company=${company}&trigger=${context}`;
        }
    });
}