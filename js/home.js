// js/home.js - Logic for the main portfolio dashboard (index.html)

document.addEventListener('DOMContentLoaded', async () => {
    // This function from shared.js loads the header and sidebar
    await loadSharedComponents();
    
    // This function renders the main content for the home page
    renderHomePage();
});

function renderHomePage() {
    const mainContent = document.getElementById('main-content');
    
    // Data for the home page dashboard.
    const pipelineStages = [
        { name: 'Due Diligence', count: 1, color: 'var(--accent-blue)' },
        { name: 'Strategize', count: 3, color: 'var(--accent-teal)' },
        { name: 'Transform', count: 2, color: 'var(--purple)' },
        { name: 'Grow', count: 1, color: 'var(--status-success)' },
        { name: 'Exit', count: 0, color: 'var(--text-muted)' }
    ];
    
    const companies = [
        { id: 'techflow-solutions', name: 'TechFlow Solutions', stage: 'Due Diligence', arr: 55, nrr: 105, ebitda: 22, status: 'At Risk', statusColor: 'var(--status-warning)', stageColor: 'var(--accent-blue)' },
        { id: 'cloudvantage', name: 'CloudVantage', stage: 'Grow', arr: 78, nrr: 128, ebitda: 31, status: 'Healthy', statusColor: 'var(--status-success)', stageColor: 'var(--status-success)' },
        { id: 'innovate-inc', name: 'Innovate Inc.', stage: 'Transform', arr: 120, nrr: 122, ebitda: 18, status: 'Healthy', statusColor: 'var(--status-success)', stageColor: 'var(--purple)' },
        { id: 'dataflow-systems', name: 'DataFlow Systems', stage: 'Strategize', arr: 32, nrr: 115, ebitda: 25, status: 'Healthy', statusColor: 'var(--status-success)', stageColor: 'var(--accent-teal)' },
        { id: 'scaleops', name: 'ScaleOps', stage: 'Strategize', arr: 19, nrr: 108, ebitda: 12, status: 'Needs Attention', statusColor: 'var(--status-warning)', stageColor: 'var(--accent-teal)' },
    ];

    // This is the full HTML content for the home dashboard.
    mainContent.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-alert">
                <div class="alert-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/></svg>
                </div>
                <div>
                    <p class="alert-title">Action Required: TechFlow Solutions</p>
                    <p class="alert-text">Due diligence has uncovered 3 critical anomalies. Resolution is pending before proceeding.</p>
                </div>
            </div>

            <h2 class="section-title">Portfolio-wide KPIs</h2>
            <div class="kpi-grid">
                <div class="kpi-card"><p class="kpi-label">Portfolio Enterprise Value</p><p class="kpi-value" style="color: var(--accent-blue);">$2.4B</p><p class="kpi-detail" style="color: var(--status-success);">+12% vs target</p></div>
                <div class="kpi-card"><p class="kpi-label">Active Programs</p><p class="kpi-value" style="color: var(--purple);">15</p><p class="kpi-detail">across 8 companies</p></div>
                <div class="kpi-card"><p class="kpi-label">Avg. MOIC Target</p><p class="kpi-value" style="color: var(--status-success);">2.3x</p><p class="kpi-detail" style="color: var(--status-success);">+0.3x vs industry</p></div>
                <div class="kpi-card"><p class="kpi-label">Avg. Time to Value</p><p class="kpi-value" style="color: var(--accent-teal);">18 mos</p><p class="kpi-detail" style="color: var(--status-success);">-50% vs traditional</p></div>
            </div>

            <h2 class="section-title">Program Execution Pipeline</h2>
            <div class="pipeline-wrapper">${pipelineStages.map((stage, index) => `<div class="chevron-item" style="--bg-color: ${stage.color}; z-index: ${pipelineStages.length - index};"><span class="chevron-name">${stage.name}</span><span class="chevron-count">${stage.count}</span></div>`).join('')}</div>
            
            <h2 class="section-title">Portfolio Company Overview</h2>
            <div class="company-grid">
                ${companies.map(company => `
                    <div class="company-card" data-action="view-company" data-company-id="${company.id}">
                        <div>
                            <div class="company-header">
                                <h3 class="company-name">${company.name}</h3>
                                <span class="company-stage" style="background-color: ${company.stageColor}20; color: ${company.stageColor};">${company.stage}</span>
                            </div>
                            <div class="company-stats">
                                <div><p class="stat-label">ARR</p><p class="stat-value">$${company.arr}M</p></div>
                                <div><p class="stat-label">NRR</p><p class="stat-value">${company.nrr}%</p></div>
                                <div><p class="stat-label">EBITDA</p><p class="stat-value">${company.ebitda}%</p></div>
                            </div>
                        </div>
                        <div class="company-footer">
                            <span class="status-dot" style="background-color: ${company.statusColor};"></span>
                            <span class="status-text">${company.status}</span>
                        </div>
                    </div>`).join('')}
                <div class="add-company-card">
                    <div class="add-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
                    <p class="add-text">Add Company</p>
                </div>
            </div>
        </div>
    `;

    // Re-attach event listeners for the newly rendered company cards
    const companyCards = mainContent.querySelectorAll('[data-action="view-company"]');
    companyCards.forEach(card => {
        card.addEventListener('click', () => {
            const companyId = card.dataset.companyId;
            if (companyId) {
                let state = loadState();
                state.selectedCompanyId = companyId;
                saveState(state);
                window.location.href = `portco.html?company=${companyId}`;
            }
        });
    });
}