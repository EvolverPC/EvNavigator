// js/modeling.js

document.addEventListener('DOMContentLoaded', async () => {
    let state = loadState();
    await loadSharedComponents();
    
    renderModelingScreen(state);
    initializeEventListeners();

    function renderModelingScreen(currentState) {
        const getLevelLabel = (level) => ({ 1: 'Reactive', 2: 'Organized', 3: 'Automated', 4: 'Platform-led', 5: 'Intelligent' })[level];
        const content = capabilities.map(capability => {
            const assessment = currentState.modeling.assessmentData[capability.id];
            const scenario = Utils.generateScenario(capability.id, currentState, capabilities, capabilityScenarios); // Use shared util
            const isAdded = currentState.diligenceWorkspace.valueLevers.some(l => l.id === capability.id);
            const gap = assessment.target - assessment.current;
            const gapClass = gap <= 0 ? 'bg-gray-100 text-gray-800' : gap <= 1 ? 'bg-green-100 text-green-800' : gap <= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
            
            return `<div class="bg-white rounded-lg shadow-sm border border-gray-100">
                <div class="p-6">
                    <!-- Header -->
                    <div class="flex justify-between items-start flex-wrap gap-4">
                        <div><span class="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-700">${capability.discipline}</span><h3 class="text-xl font-semibold text-gray-800 mt-2">${capability.name}</h3></div>
                        ${isAdded ? `<button class="text-sm font-semibold py-2 px-4 rounded-md bg-green-200 text-green-800 cursor-default">Added to VCP ✓</button>` : `<button data-action="add-capability-to-vcp" data-capability-id="${capability.id}" class="text-sm font-semibold py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700">Add to VCP</button>`}
                    </div>
                    <!-- Sliders -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
                        <div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium">Current State</span><span class="text-sm px-2 py-1 rounded bg-gray-100 text-gray-800">${getLevelLabel(assessment.current)}</span></div><div class="flex items-center gap-3"><input type="range" min="1" max="5" value="${assessment.current}" data-action="update-assessment" data-capability-id="${capability.id}" data-type="current" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /><span class="text-sm font-bold w-8 text-center">${assessment.current}</span></div></div>
                        <div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium">Target State</span><span class="text-sm px-2 py-1 rounded bg-teal-100/60 text-teal-800">${getLevelLabel(assessment.target)}</span></div><div class="flex items-center gap-3"><input type="range" min="1" max="5" value="${assessment.target}" data-action="update-assessment" data-capability-id="${capability.id}" data-type="target" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /><span class="text-sm font-bold w-8 text-center">${assessment.target}</span></div></div>
                    </div>
                    <div class="mt-4 flex items-center justify-between"><span class="px-3 py-1 rounded-full text-sm font-medium ${gapClass}">Gap: ${gap > 0 ? gap : 0} level${gap !== 1 ? 's' : ''}</span></div>
                </div>
                <!-- Uplift Plan -->
                ${gap > 0 ? `<div class="border-t border-gray-100 px-6 py-4 bg-gray-50/50"><h4 class="font-semibold mb-2 text-base text-gray-800">Generated Uplift Plan (Level ${assessment.current} → ${assessment.target})</h4><ul class="text-sm space-y-2 text-gray-700">${scenario.actions.map(action => `<li class="flex items-start gap-2"><svg>...</svg><span>${action}</span></li>`).join('')}</ul></div>` : ''}
            </div>`;
        }).join('');
        document.getElementById('main-content').innerHTML = `<div class="space-y-4">${content}</div>`;
    }

    function initializeEventListeners() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.addEventListener('input', (e) => {
            const target = e.target;
            if (target.dataset.action === 'update-assessment') {
                const { capabilityId, type } = target.dataset;
                state.modeling.assessmentData[capabilityId][type] = parseInt(target.value);
                saveState(state);
                renderModelingScreen(state); // Re-render to update labels and plans
            }
        });

        mainContent.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.action === 'add-capability-to-vcp') {
                const { capabilityId } = target.dataset;
                const scenario = Utils.generateScenario(capabilityId, state, capabilities, capabilityScenarios);
                if (!state.diligenceWorkspace.valueLevers.some(l => l.id === capabilityId)) {
                    state.diligenceWorkspace.valueLevers.push({ ...scenario, type: 'capability' });
                    saveState(state);
                    renderModelingScreen(state); // Re-render to show "Added" status
                }
            }
        });
    }
});