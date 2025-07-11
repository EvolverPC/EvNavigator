// js/workspace.js - Logic for the workspace and final report page

// This is the main entry point for the page.
document.addEventListener('DOMContentLoaded', async () => {
    // First, load shared components like header and sidebar
    await loadSharedComponents();
    
    // Now that components are loaded, get the current state
    let state = loadState();
    
    // Render the page based on the current state
    renderWorkspacePage(state);
    
    // Attach event listeners for this page
    initializeWorkspaceListeners();
});


function renderWorkspacePage(currentState) {
    const mainContent = document.getElementById('main-content');
    
    if (currentState.isReportFinalized) {
        // Hide sidebar and show the final report
        document.getElementById('sidebar-container').style.display = 'none';
        mainContent.innerHTML = renderFinalReport(currentState);
    } else {
        // Ensure sidebar is visible and show the workspace
        document.getElementById('sidebar-container').style.display = 'flex';
        mainContent.innerHTML = renderWorkspace(currentState);
    }
}

function renderWorkspace(currentState) {
    const { keyRisks, valueLevers, strategicNotes } = currentState.diligenceWorkspace;
    const flaggedItems = Object.values(keyRisks);
    const vcpItems = valueLevers.filter(l => l.type === 'capability');
    let summary = 'Aria has synthesized the current workspace...'; // Full summary logic here
    const isWorkspaceActive = flaggedItems.length > 0 || vcpItems.length > 0 || strategicNotes.length > 0;

    // Return the complete HTML string for the workspace
    return `<div id="workspace-content" class="space-y-8">...</div>`; // Full HTML from previous response
}

function renderFinalReport(currentState) {
    // Return the complete HTML string for the final report
    return `<div id="final-report-content" class="mx-auto bg-white p-12 shadow-2xl rounded-lg">...</div>`; // Full HTML
}

function initializeWorkspaceListeners() {
    const mainContent = document.getElementById('main-content');

    mainContent.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        let state = loadState();

        switch (target.dataset.action) {
            case 'finalize-analysis':
                state.isReportFinalized = true;
                saveState(state);
                renderWorkspacePage(state); // Re-render the whole page
                break;
            case 'export-report':
                Utils.generatePDF('final-report-content');
                break;
            case 'back-to-workspace':
                state.isReportFinalized = false;
                saveState(state);
                renderWorkspacePage(state); // Re-render the whole page
                break;
        }
    });

    mainContent.addEventListener('change', (e) => {
        const target = e.target.closest('[data-action="select-note"]');
        if (!target) return;
        
        let state = loadState();
        const note = selectableNotes.find(n => n.id === target.dataset.noteId);
        
        if (target.checked) {
            state.diligenceWorkspace.strategicNotes.push(note);
        } else {
            state.diligenceWorkspace.strategicNotes = state.diligenceWorkspace.strategicNotes.filter(n => n.id !== target.dataset.noteId);
        }
        
        saveState(state);
        renderWorkspacePage(state); // Re-render to update summary and button
    });
}