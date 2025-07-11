// js/workspace.js

document.addEventListener('DOMContentLoaded', async () => {
    // Load state and components
    let state = loadState();
    await loadSharedComponents();
    
    // Initial render
    renderPage(state);

    function renderPage(currentState) {
        if (currentState.isReportFinalized) {
            document.getElementById('sidebar-container').style.display = 'none';
            document.getElementById('main-content').innerHTML = renderFinalReport(currentState);
        } else {
            document.getElementById('sidebar-container').style.display = 'flex';
            document.getElementById('main-content').innerHTML = renderWorkspace(currentState);
        }
        initializeEventListeners();
    }

    function renderWorkspace(currentState) {
        const { keyRisks, valueLevers, strategicNotes } = currentState.diligenceWorkspace;
        const flaggedItems = Object.values(keyRisks);
        const vcpItems = valueLevers.filter(l => l.type === 'capability');
        // ... (rest of the summary logic from original file)
        const summary = '...'; 
        const isWorkspaceActive = flaggedItems.length > 0 || vcpItems.length > 0 || strategicNotes.length > 0;

        return `<div id="workspace-content" class="space-y-8">
            <!-- AI Strategic Narrative -->
            <div class="bg-white p-6 rounded-lg shadow-md border"><h2 class="text-xl font-semibold text-gray-700 mb-4">AI Strategic Narrative</h2><div class="p-4 bg-gray-50 border-l-4 border-gray-500"><p class="text-sm text-gray-800">${summary}</p></div></div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Key Risks -->
                <div class="space-y-6"><h2 class="text-xl font-semibold text-gray-700">Key Risks & Mitigations</h2><div class="bg-white p-6 rounded-lg shadow-md border">${flaggedItems.length > 0 ? `<ul class="space-y-4">${flaggedItems.map(item => `<li class="p-3 bg-amber-50 rounded-md border border-amber-200"><p class="font-semibold text-amber-800">${item.title}</p><p class="text-sm text-gray-600">${item.impact}</p></li>`).join('')}</ul>` : `<p class="text-sm text-gray-500">No anomalies have been flagged. Review the 'Aria' tab to flag items for the workspace.</p>`}</div></div>
                <!-- VCP -->
                <div class="space-y-6"><h2 class="text-xl font-semibold text-gray-700">Value Creation Plan (VCP)</h2><div class="bg-white p-6 rounded-lg shadow-md border">${vcpItems.length > 0 ? `<div class="space-y-4">${vcpItems.map(vcp => `<div class="p-4 bg-blue-50 rounded-lg border border-blue-200"><h4 class="font-bold text-blue-800">${vcp.name} (Level ${vcp.from} → ${vcp.to})</h4><ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">${vcp.actions.map(action => `<li>${action}</li>`).join('')}</ul></div>`).join('')}</div>` : `<p class="text-sm text-gray-500">No VCPs added. Go to the 'Modeling' tab to build and add uplift plans.</p>`}</div></div>
            </div>
            <!-- Strategic Observations -->
            <div><h2 class="text-xl font-semibold text-gray-700 mb-4">Select Key Strategic Observations</h2><div class="bg-white p-6 rounded-lg shadow-md border"><div class="space-y-3">${selectableNotes.map(note => `<label class="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"><input type="checkbox" data-action="select-note" data-note-id="${note.id}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${currentState.diligenceWorkspace.strategicNotes.find(n => n.id === note.id) ? 'checked' : ''}><span class="ml-3 text-sm text-gray-700">${note.text}</span></label>`).join('')}</div></div></div>
            ${isWorkspaceActive ? `<div class="mt-4"><button data-action="finalize-analysis" class="w-full text-lg font-semibold py-3 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">Finalize Analysis & View Report</button></div>` : ''}
        </div>`;
    }

    function renderFinalReport(currentState) {
        // ... (Full renderFinalReport function from original file)
        return `<div id="final-report-content" class="mx-auto bg-white p-12 shadow-2xl rounded-lg">...</div>`;
    }

    function initializeEventListeners() {
        document.getElementById('main-content').addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.dataset.action;
            if (action === 'finalize-analysis') {
                state.isReportFinalized = true;
                saveState(state);
                renderPage(state);
            }
            if (action === 'export-report') {
                Utils.generatePDF('final-report-content');
            }
            // ... other actions
        });

        document.getElementById('main-content').addEventListener('change', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target || target.dataset.action !== 'select-note') return;
            
            const note = selectableNotes.find(n => n.id === target.dataset.noteId);
            if (target.checked) {
                state.diligenceWorkspace.strategicNotes.push(note);
            } else {
                state.diligenceWorkspace.strategicNotes = state.diligenceWorkspace.strategicNotes.filter(n => n.id !== note.id);
            }
            saveState(state);
            renderPage(state);
        });
    }
});