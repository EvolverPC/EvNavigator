// js/workspace.js - Logic for the workspace and final report page

let projectionChart = null; // Global reference to the chart instance

// --- DATA REQUIRED FOR THIS COMPONENT ---
// Moved here from data.js to make the component self-contained and prevent errors.
const strategicValueLevers = [
    { id: 'lever1', title: 'Territory Expansion', impact: 'Medium', description: 'Expand sales into two new adjacent geographic markets.' },
    { id: 'lever2', title: 'Industry Consolidation', impact: 'High', description: 'Acquire 1-2 smaller competitors to gain market share and technology.' },
    { id: 'lever3', title: 'Pricing Optimization', impact: 'High', description: 'Implement a three-tiered, value-based pricing model.' },
    { id: 'lever4', title: 'Operational Efficiency', impact: 'Medium', description: 'Reduce cloud infrastructure costs by 15% through optimization.' }
];

const otherObservations = [
    { id: 'obs1', text: 'Management team is technically strong but lacks experience scaling a sales organization.' },
    { id: 'obs2', text: 'The core product has a loyal customer base but an aging user interface.' },
    { id: 'obs3', text: 'Company has no formal channel partnership program, representing an untapped growth vector.' }
];


document.addEventListener('DOMContentLoaded', async () => {
    await loadSharedComponents();
    let state = loadState();
    renderWorkspacePage(state);
    initializeWorkspaceListeners(state);
});

function renderWorkspacePage(currentState) {
    const mainContent = document.getElementById('main-content');
    
    if (currentState.isReportFinalized) {
        // This part remains for future use
    } else {
        mainContent.innerHTML = renderWorkspace(currentState);
        // Render the chart after the canvas element is in the DOM
        renderProjectionChart(); 
    }
}

function renderWorkspace(currentState) {
    const { keyRisks, valueLevers } = currentState.diligenceWorkspace;
    const flaggedItems = Object.values(keyRisks);

    return `
        <div class="workspace-container-v2">
            <!-- Top Header Boxes -->
            <div class="workspace-header">
                <h3 class="header-title">Major PortCo Observations</h3>
                <p class="header-text">Key insights from automated diligence and initial analysis of TechFlow Solutions, highlighting both strengths and areas for improvement.</p>
            </div>
            <div class="thesis-box">
                <h3 class="header-title">Investment Thesis</h3>
                <p class="header-text">Acquire a niche market leader with a sticky product and strong technical team, currently undervalued due to correctable go-to-market inefficiencies and a lack of strategic pricing. Implement a proven PE playbook to accelerate growth and expand margins, leading to a top-quartile return.</p>
            </div>

            <!-- Main Grid -->
            <div class="workspace-grid-v2">
                <!-- Left Column: Inputs -->
                <div class="input-column">
                    <div class="input-card">
                        <h4 class="input-title">Strategic Value Levers</h4>
                        <div class="input-list">
                            ${strategicValueLevers.map(lever => `
                                <div class="input-item">
                                    <div class="item-content">
                                        <span class="item-impact-badge" data-impact="${lever.impact.toLowerCase()}">${lever.impact}</span>
                                        <p class="item-title">${lever.title}</p>
                                    </div>
                                    <div class="action-pills">
                                        <button title="Include in Financial Model" data-action="include-in-model" data-id="${lever.id}">💰</button>
                                        <button title="Include in Value Creation Plan" data-action="include-in-vcp" data-id="${lever.id}">📈</button>
                                        <button title="Include in IC Report" data-action="include-in-ic" data-id="${lever.id}">📄</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="input-card">
                        <h4 class="input-title">Flagged Diligence Items</h4>
                        <div class="input-list">
                            ${flaggedItems.length > 0 ? flaggedItems.map(item => `
                                <div class="input-item">
                                    <div class="item-content">
                                        <p class="item-title">${item.title.split(': ')[1]}</p>
                                        <p class="item-description">${item.impact}</p>
                                    </div>
                                    <div class="action-pills">
                                        <button title="Include in Financial Model" data-action="include-in-model" data-id="${item.id}">💰</button>
                                        <button title="Include in Value Creation Plan" data-action="include-in-vcp" data-id="${item.id}">📈</button>
                                        <button title="Include in IC Report" data-action="include-in-ic" data-id="${item.id}">📄</button>
                                    </div>
                                </div>
                            `).join('') : '<p class="empty-state-text">No items flagged from Aria.</p>'}
                        </div>
                    </div>
                    <div class="input-card">
                        <h4 class="input-title">Other Observations</h4>
                        <div class="input-list">
                            ${otherObservations.map(obs => `
                                <div class="input-item">
                                    <div class="item-content">
                                        <p class="item-description">${obs.text}</p>
                                    </div>
                                    <div class="action-pills">
                                        <button title="Include in IC Report" data-action="include-in-ic" data-id="${obs.id}">📄</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Synthesis -->
                <div class="synthesis-column">
                    <div class="output-actions-card">
                        <h4 class="input-title">Outputs</h4>
                        <div class="output-buttons">
                            <button class="output-button primary">Investment Committee Report</button>
                            <button class="output-button">100-Day Plan</button>
                            <button class="output-button">Value Creation Plan</button>
                        </div>
                    </div>
                    <div class="synthesis-card">
                        <h4 class="input-title">Strategic Narrative</h4>
                        <div class="strategic-narrative" contenteditable="true">Start typing or select items from the left to build the narrative...</div>
                    </div>
                    <div class="synthesis-card">
                        <h4 class="input-title">100-Day Workplan</h4>
                        <div class="work-plan"><p class="empty-state-text">Select items to include in the VCP to generate a workplan.</p></div>
                    </div>
                    <div class="synthesis-card">
                        <h4 class="input-title">Deep Research Simulation Lab</h4>
                        <div class="simulation-lab">
                            <div class="simulation-table-v2">
                                <!-- Table will be here -->
                            </div>
                            <div class="simulation-graph">
                                <canvas id="ev-projection-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectionChart() {
    const ctx = document.getElementById('ev-projection-chart');
    if (!ctx) return;

    const labels = ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    const baseCaseData = [150, 188, 235, 293, 367, 458];
    const sensitivityUpper = baseCaseData.map(d => d * 1.15);
    const sensitivityLower = baseCaseData.map(d => d * 0.85);

    if (projectionChart) {
        projectionChart.destroy();
    }

    projectionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Upper Band',
                    data: sensitivityUpper,
                    borderColor: 'rgba(74, 222, 128, 0.2)',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    fill: '+1',
                    pointRadius: 0,
                    tension: 0.4,
                },
                {
                    label: 'Projected EV',
                    data: baseCaseData,
                    borderColor: '#2563EB', // blue-600
                    backgroundColor: '#2563EB',
                    fill: false,
                    tension: 0.4,
                },
                {
                    label: 'Lower Band',
                    data: sensitivityLower,
                    borderColor: 'rgba(74, 222, 128, 0.2)',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    fill: '-1',
                    pointRadius: 0,
                    tension: 0.4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'M';
                        }
                    }
                }
            }
        }
    });
}

function initializeWorkspaceListeners(state) {
    const mainContent = document.getElementById('main-content');
    
    mainContent.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        if (target.dataset.action === 'run-simulation') {
            // Mock simulation logic
            const outputDiv = document.getElementById('simulation-output');
            if (outputDiv) { // Check if the element exists before modifying
                outputDiv.innerHTML = `
                    <div class="output-content">
                        <p class="output-label">Projected Exit Value (Year 5)</p>
                        <p class="output-value">$450.7M</p>
                        <p class="output-detail">Based on a 12.0x Revenue multiple on projected Year 5 revenue of $37.6M.</p>
                        <div class="output-narrative">
                            <h4 class="narrative-title">Key Drivers:</h4>
                            <p>The projection is primarily driven by strong ARR growth assumptions and sustained high Net Revenue Retention, leading to significant revenue compounding over the 5-year holding period. Maintaining the target EBITDA margin will be critical to achieving this valuation.</p>
                        </div>
                    </div>
                `;
            }
        }
    });
}