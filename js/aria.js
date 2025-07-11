// js/aria.js - Complete logic for the Aria AI Assistant page

document.addEventListener('DOMContentLoaded', async () => {
    await loadSharedComponents();
    initializeAriaPage();
});

function initializeAriaPage() {
    const params = new URLSearchParams(window.location.search);
    const company = params.get('company') || loadState().selectedCompanyId;
    const trigger = params.get('trigger');

    let state = loadState();
    state.selectedCompanyId = company;
    
    // =================================================================
    // THIS FAULTY BLOCK HAS BEEN REMOVED.
    // The page should not reset its own state on navigation.
    // =================================================================
    // if (!trigger) {
    //     state.techflowAria.state = 'idle';
    //     state.techflowAria.activeWorkstream = null;
    //     state.cloudvantageAria.state = 'idle';
    //     state.cloudvantageAria.conversation = [];
    // }
    
    saveState(state);
    Navigation.updateCompanySelector();

    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<div id="aria-main-view" class="max-w-6xl mx-auto"></div>`;

    if (trigger) {
        let promptText = trigger === 'anomaly-report' 
            ? "Provide an overview of the current registered anomalies."
            : "Process the renewals for the NewCo acquisition customers.";
        
        state.techflowAria.currentPrompt = promptText;
        saveState(state);
        
        const mainView = document.getElementById('aria-main-view');
        if(mainView) mainView.innerHTML = `<div id="aria-conversation-container" class="space-y-6"></div>`;
        
        runAriaSequence(state, promptText);
    } else {
        renderAriaWorkstreamView(state);
    }
    
    initializeAriaEventListeners();
}

function renderSettingsModal(settings) {
    const { ddDataRoom, externalSources, internalSources } = settings;
    const renderSubSources = (parent, sources) => {
        return Object.keys(sources).filter(k => k !== 'main').map(key => `
            <div class="flex items-center justify-between pl-8 py-1">
                <label for="setting-${parent}-${key}" class="text-sm text-gray-600">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <label class="toggle-switch"><input type="checkbox" id="setting-${parent}-${key}" data-action="update-setting" data-parent="${parent}" data-key="${key}" ${sources[key] ? 'checked' : ''}><span class="toggle-slider"></span></label>
            </div>
        `).join('');
    };

    return `
        <div id="settings-modal" class="settings-modal ${settings.isModalOpen ? 'visible' : ''}">
            <div class="p-4 space-y-3">
                <div class="flex items-center justify-between">
                    <label for="setting-ddDataRoom" class="font-semibold text-gray-700">DD Data Room</label>
                    <label class="toggle-switch"><input type="checkbox" id="setting-ddDataRoom" data-action="update-setting" data-key="ddDataRoom" ${ddDataRoom ? 'checked' : ''}><span class="toggle-slider"></span></label>
                </div>
                <div class="border-t pt-3">
                    <div class="flex items-center justify-between">
                        <label for="setting-externalSources-main" class="font-semibold text-gray-700">External Sources</label>
                        <label class="toggle-switch"><input type="checkbox" id="setting-externalSources-main" data-action="update-setting" data-parent="externalSources" data-key="main" ${externalSources.main ? 'checked' : ''}><span class="toggle-slider"></span></label>
                    </div>
                    ${externalSources.main ? `<div class="space-y-1 mt-2">${renderSubSources('externalSources', externalSources)}</div>` : ''}
                </div>
                <div class="border-t pt-3">
                    <div class="flex items-center justify-between">
                        <label for="setting-internalSources-main" class="font-semibold text-gray-700">Internal Data Sources</label>
                        <label class="toggle-switch"><input type="checkbox" id="setting-internalSources-main" data-action="update-setting" data-parent="internalSources" data-key="main" ${internalSources.main ? 'checked' : ''}><span class="toggle-slider"></span></label>
                    </div>
                    ${internalSources.main ? `<div class="space-y-1 mt-2">${renderSubSources('internalSources', internalSources)}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function getNewPromptBoxHTML(suggestedQuestions = []) {
    const state = loadState();
    return `
        <div id="aria-prompt-wrapper" class="mt-6">
            <div class="flex flex-wrap gap-2 mb-2 justify-center">
                ${suggestedQuestions.map(q => `<button data-action="run-suggested-prompt" data-question="${q}" class="text-sm bg-sky-100 text-sky-800 px-3 py-1 rounded-full hover:bg-sky-200">${q}</button>`).join('')}
            </div>
            <div class="prompt-box-container flex items-start gap-2 p-2 relative">
                <textarea id="aria-prompt-input" class="w-full p-2 border-none focus:ring-0 resize-none bg-transparent" rows="2" placeholder="Reply to Aria..."></textarea>
                <div class="flex items-end gap-2 self-end">
                    <button data-action="attach-file" class="prompt-action-button p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <button data-action="toggle-settings-modal" class="prompt-action-button p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                    </button>
                    <button class="prompt-send-button flex-shrink-0" data-action="ask-aria">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
                    </button>
                </div>
                ${renderSettingsModal(state.ariaSettings)}
            </div>
        </div>
    `;
}

function renderAriaWorkstreamView(currentState) {
    const mainView = document.getElementById('aria-main-view');
    if (!mainView) return;

    const { selectedCompanyId, techflowAria } = currentState;
    const { activeWorkstream } = techflowAria;
    const workstreamDataSource = selectedCompanyId === 'techflow-solutions' ? techflow_workstreamData : cloudvantage_workstreamData;
    
    const workstreamCardsHTML = workstreamDataSource.map(ws => `
        <div class="bg-white p-6 rounded-lg shadow-md border ${ws.id === activeWorkstream ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'} flex flex-col">
            <div class="flex-grow">
                <div class="flex items-center gap-3"><div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg">${ws.icon}</div><h2 class="text-lg font-bold text-gray-800">${ws.title}</h2></div>
                <div class="space-y-2 mt-4">${ws.cards.map(card => `<div class="flex justify-between items-baseline text-sm"><span class="text-gray-500">${card.label}</span><span class="font-semibold text-gray-800">${card.value}</span></div>`).join('')}</div>
            </div>
            <button data-action="set-aria-workstream" data-workstream-id="${ws.id}" class="w-full text-sm font-semibold py-2 px-4 rounded-md mt-6 ${ws.id === activeWorkstream ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Dive Deeper</button>
        </div>
    `).join('');

    let suggestedQuestions = [];
    if (activeWorkstream) {
        const activeWorkstreamData = workstreamDataSource.find(w => w.id === activeWorkstream);
        suggestedQuestions = activeWorkstreamData ? activeWorkstreamData.suggestedQuestions : [];
    }

    const fullHTML = `
        <div id="aria-conversation-container" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">${workstreamCardsHTML}</div>
            ${getNewPromptBoxHTML(suggestedQuestions)}
        </div>
    `;
    
    mainView.innerHTML = fullHTML;

    const textarea = document.getElementById('aria-prompt-input');
    if (textarea) {
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
        });
    }
}

async function runAriaBuildingSequence(responseElement) {
    const buildItems = responseElement.querySelectorAll('.build-item');
    for (const item of buildItems) {
        item.classList.add('visible');
        const analysisTextEl = item.querySelector('.anomaly-analysis-text');
        if (analysisTextEl && analysisTextEl.dataset.text) {
            // THIS IS THE FIX: Calling the new word-by-word function
            await new Promise(resolve => Utils.typeWords(analysisTextEl, analysisTextEl.dataset.text, resolve));
        } else {
            await new Promise(r => setTimeout(r, 50));
        }
    }
}

function runAriaSequence(state, promptText) {
    if (!promptText) return;

    const conversationContainer = document.getElementById('aria-conversation-container');
    if (!conversationContainer) return;

    const oldPromptWrapper = document.getElementById('aria-prompt-wrapper');
    if (oldPromptWrapper) oldPromptWrapper.remove();

    const workstreamGrid = conversationContainer.querySelector('.grid');
    if (workstreamGrid) workstreamGrid.remove();

    conversationContainer.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow-sm"><p class="font-semibold text-gray-500">You</p><p class="text-gray-800">${promptText}</p></div>`;

    const reasoningId = `reasoning-${Date.now()}`;
    conversationContainer.innerHTML += `
        <div id="${reasoningId}" class="aria-response-bubble">
            <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria is thinking</p><div class="flex gap-1"><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot1"></div><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot2"></div><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot3"></div></div></div>
            <div class="mt-4 pl-11 space-y-2 text-sm text-gray-500" id="reasoning-steps"></div>
        </div>`;
    
    conversationContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    const reasoningStepsEl = document.getElementById('reasoning-steps');

    const reasoningSteps = [
        "Parsing request and identifying intent...",
        `Querying data lake for '${state.selectedCompanyId}'...`,
        "Synthesizing findings and identifying key insights..."
    ];

    let reasoningDelay = 500;
    reasoningSteps.forEach(step => {
        setTimeout(() => {
            if(reasoningStepsEl) reasoningStepsEl.innerHTML += `<p class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>${step}</p>`;
        }, reasoningDelay);
        reasoningDelay += 800;
    });

    setTimeout(() => {
        const companyResponses = state.selectedCompanyId === 'techflow-solutions' ? techflow_ariaResponses : cloudvantage_ariaResponses;
        const response = companyResponses[promptText] || { id: 'unknown', title: 'Unknown Query', renderFunc: () => `<div>I am still learning about "${promptText}". Please try another question.</div>`, followUpQuestions: [] };
        
        document.getElementById(reasoningId)?.remove();

        const responseId = `response-${response.id}`;
        
        conversationContainer.innerHTML += `
            <div id="${responseId}" class="aria-response-bubble">
                <div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria</p></div>
                <div class="pl-11">${response.renderFunc(state)}</div>
            </div>`;
        
        setTimeout(async () => {
            const responseElement = document.getElementById(responseId);
            if (responseElement) {
                await runAriaBuildingSequence(responseElement);
            }
            conversationContainer.insertAdjacentHTML('beforeend', getNewPromptBoxHTML(response.followUpQuestions));
            document.getElementById('aria-prompt-wrapper')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);

    }, reasoningDelay);
}

function initializeAriaEventListeners() {
    const mainContent = document.getElementById('main-content');
    
    document.body.addEventListener('click', (e) => {
        const settingsModal = document.getElementById('settings-modal');
        const settingsButton = e.target.closest('[data-action="toggle-settings-modal"]');
        if (settingsModal && !settingsModal.contains(e.target) && !settingsButton) {
            let state = loadState();
            if (state.ariaSettings.isModalOpen) {
                state.ariaSettings.isModalOpen = false;
                saveState(state);
                const promptWrapper = document.getElementById('aria-prompt-wrapper');
                if (promptWrapper) promptWrapper.outerHTML = getNewPromptBoxHTML();
            }
        }
    });

    mainContent.addEventListener('click', e => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        
        let state = loadState();
        const action = target.dataset.action;

        switch (action) {
            case 'set-aria-workstream':
                state.techflowAria.activeWorkstream = target.dataset.workstreamId;
                saveState(state);
                renderAriaWorkstreamView(state);
                break;

            case 'run-suggested-prompt':
                const question = target.dataset.question;
                if (question) {
                    state.techflowAria.currentPrompt = question;
                    saveState(state);
                    runAriaSequence(state, question);
                }
                break;

            case 'ask-aria':
                const askInput = document.getElementById('aria-prompt-input');
                if (askInput && askInput.value.trim()) {
                    const promptText = askInput.value.trim();
                    state.techflowAria.currentPrompt = promptText;
                    saveState(state);
                    runAriaSequence(state, promptText);
                }
                break;
            
            case 'toggle-settings-modal':
                state.ariaSettings.isModalOpen = !state.ariaSettings.isModalOpen;
                saveState(state);
                const promptWrapper = document.getElementById('aria-prompt-wrapper');
                if (promptWrapper) promptWrapper.outerHTML = getNewPromptBoxHTML();
                break;

            case 'flag-response':
                const responseId = target.dataset.responseId;
                const allSources = [techflow_ariaResponses, cloudvantage_ariaResponses, techflow_anomalies, techflow_minorObservations];
                let responseToFlag = null;

                for (const source of allSources) {
                    const items = Array.isArray(source) ? source : Object.values(source);
                    const found = items.find(item => item.id === responseId);
                    if (found) {
                        responseToFlag = found;
                        break;
                    }
                }

                if (responseToFlag && !state.diligenceWorkspace.keyRisks[responseId]) {
                    state.diligenceWorkspace.keyRisks[responseId] = {
                        id: responseId,
                        title: responseToFlag.title || responseToFlag.category,
                        impact: responseToFlag.impact || responseToFlag.text,
                        source: 'Aria Assistant'
                    };
                    saveState(state);
                    target.classList.add('flagged');
                }
                break;
            
            case 'toggle-observations':
                state.techflowAria.minorObservationsExpanded = !state.techflowAria.minorObservationsExpanded;
                saveState(state);
                const container = document.querySelector('#response-anomaly-overview .pl-11');
                if(container) container.innerHTML = techflow_ariaResponses["Provide an overview of the current registered anomalies."].renderFunc(state);
                break;
        }
    });

    mainContent.addEventListener('change', e => {
        const target = e.target.closest('[data-action="update-setting"]');
        if (!target) return;

        let state = loadState();
        const { parent, key } = target.dataset;
        
        if (parent) {
            state.ariaSettings[parent][key] = target.checked;
        } else {
            state.ariaSettings[key] = target.checked;
        }
        
        saveState(state);
        const promptWrapper = document.getElementById('aria-prompt-wrapper');
        if (promptWrapper) promptWrapper.outerHTML = getNewPromptBoxHTML();
    });
}