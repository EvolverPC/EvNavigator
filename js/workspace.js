// js/workspace.js - Logic for the workspace and final report page

document.addEventListener('DOMContentLoaded', async () => {
    await loadSharedComponents();
    let state = loadState();
    renderWorkspacePage(state);
    initializeWorkspaceListeners();
});

function renderWorkspacePage(currentState) {
    const mainContent = document.getElementById('main-content');
    
    if (currentState.isReportFinalized) {
        document.getElementById('sidebar-container').style.display = 'none';
        mainContent.innerHTML = renderFinalReport(currentState);
    } else {
        document.getElementById('sidebar-container').style.display = 'flex';
        mainContent.innerHTML = renderWorkspace(currentState);
    }
}

function renderWorkspace(currentState) {
    const { keyRisks, valueLevers, strategicNotes } = currentState.diligenceWorkspace;
    const flaggedItems = Object.values(keyRisks);
    
    let summary = 'ARIA has synthesized the current workspace. ';
    if (flaggedItems.length === 0 && valueLevers.length === 0) {
        summary += 'The workspace is clean. Begin by flagging critical insights or anomalies from the "Aria" tab to activate ARIA\'s synthesis.';
    } else {
        if (flaggedItems.length > 0) {
            summary += `The primary risks identified are related to ${flaggedItems.map(item => `"${item.title}"`).join(' and ')}. These issues could materially impact revenue quality, predictability, and innovation capacity. `;
        }
        // Add more summary logic here as VCPs and notes are added
    }

    const flaggedRisksHtml = flaggedItems.length > 0 
        ? `<ul class="space-y-3">${flaggedItems.map(item => `
            <li class="p-3 bg-amber-50 rounded-md border border-amber-200">
                <p class="font-semibold text-amber-800">${item.title}</p>
                <p class="text-sm text-gray-600">${item.impact}</p>
            </li>`).join('')}</ul>` 
        : `<p class="text-sm text-gray-500">No items have been flagged. Review the 'Aria' tab to flag insights for the workspace.</p>`;

    return `
        <div id="workspace-content" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Flagged Diligence Risks</h2>
                    <div class="workspace-section p-6">${flaggedRisksHtml}</div>
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">ARIA's Actionable Recommendations</h2>
                    <div class="workspace-section p-6">
                        <p class="text-sm text-gray-500">No recommendations yet. Flag an item to get started.</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Select Key Strategic Observations</h2>
                    <div class="workspace-section p-6">
                        <!-- Strategic notes selection can be added here -->
                    </div>
                </div>
            </div>
            <div class="space-y-6">
                <div>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">AI Strategic Narrative</h2>
                    <div class="workspace-section p-6">
                        <div class="p-4 bg-gray-50 border-l-4 border-gray-500">
                            <p class="text-sm text-gray-800">${summary}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Proposed 100-Day Plan Workstreams</h2>
                    <div class="workspace-section p-6">
                        <p class="text-sm text-gray-500">No workstreams proposed. Accept ARIA's recommendations to generate them.</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Deep Research Simulation Lab</h2>
                    <div class="workspace-section p-6">
                        <!-- Simulation lab can be added here -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFinalReport(currentState) {
    // This function can be built out later based on the finalized workspace state
    return `<div id="final-report-content" class="mx-auto bg-white p-12 shadow-2xl rounded-lg">
                <h1 class="text-center text-3xl font-bold">Final Report (Under Construction)</h1>
            </div>`;
}

function initializeWorkspaceListeners() {
    // Event listeners for the workspace page can be added here as functionality grows
}