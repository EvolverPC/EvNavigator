// js/aria.js - Logic for the main Aria AI Assistant page

// --- DATA MAPPING ---
const companyDataMap = {
    'techflow-solutions': {
        workstreamData: techflow_workstreamData,
        ariaResponses: techflow_ariaResponses
    },
    'cloudvantage': {
        workstreamData: cloudvantage_workstreamData,
        ariaResponses: cloudvantage_ariaResponses
    }
};

// Maps URL triggers from portco.js to specific prompts
const triggerToPromptMap = {
    'anomaly-report': "Provide an overview of the current registered anomalies.",
    'sales-renewals': "Process the renewals for the NewCo acquisition customers."
    // Add other triggers here as needed
};


// --- PAGE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadSharedComponents();
    initializeAriaPage();
    initializeAriaEventListeners();
});

function initializeAriaPage() {
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('company') || 'techflow-solutions';
    const trigger = params.get('trigger');

    let state = loadState();
    state.selectedCompanyId = companyId;
    state.techflowAria.activeWorkstream = null;
    state.techflowAria.minorObservationsExpanded = false;
    saveState(state);
    Navigation.updateCompanySelector();

    const ariaView = document.getElementById('aria-main-view');
    if (!ariaView) return;

    // If a trigger is passed from another page, start the sequence directly
    if (trigger && triggerToPromptMap[trigger]) {
        ariaView.innerHTML = `<div id="aria-conversation-container" class="space-y-6"></div>`;
        runAriaSequence(triggerToPromptMap[trigger]);
    } else {
        // Otherwise, show the standard workstream selection view
        ariaView.innerHTML = `
            <div id="aria-conversation-container" class="space-y-6">
                ${renderInitialWorkstreamCards(companyId)}
            </div>
        `;
    }
}

// --- CORE RENDERING FUNCTIONS ---

function renderInitialWorkstreamCards(companyId) {
    const data = companyDataMap[companyId]?.workstreamData || [];
    return `<div id="workstream-cards-container" class="aria-workstream-grid">
        ${data.map(ws => `
            <div class="aria-workstream-card">
                <div class="card-content">
                    <div class="card-header">
                        <div class="card-icon" style="color: ${ws.id === 'financial' ? 'var(--status-error)' : 'var(--accent-blue)'}">${ws.icon}</div>
                        <h2 class="card-title">${ws.title}</h2>
                    </div>
                    <div class="card-stats">
                        ${ws.cards.map(card => `<div class="stat-item"><span class="stat-label">${card.label}</span><span class="stat-value">${card.value}</span></div>`).join('')}
                    </div>
                </div>
                <button data-action="set-aria-workstream" data-workstream-id="${ws.id}" class="card-button">Dive Deeper</button>
            </div>
        `).join('')}
    </div>`;
}

function renderSuggestedPrompts(questions) {
    const promptsHTML = questions.map(q => `<button data-action="run-suggested-prompt" data-question="${q}" class="suggested-prompt-button">${q}</button>`).join('');
    return `
        <div id="suggested-prompts-container" class="mt-6">
            <div class="card-base">
                <div class="suggested-prompts-list">
                    <h4 class="list-header">Suggested Questions</h4>
                    ${promptsHTML}
                </div>
            </div>
        </div>
    `;
}

function getAdvancedPromptBoxHTML(followUpQuestions = []) {
    const state = loadState();
    const promptsHTML = followUpQuestions.map(q => `<button data-action="run-suggested-prompt" data-question="${q}" class="suggested-prompt-button">${q}</button>`).join('');

    return `
        <div id="aria-prompt-container" class="mt-6">
            <div class="prompt-box-container">
                ${promptsHTML.length > 0 ? `
                <div class="p-4">
                    <div class="suggested-prompts-list">
                        <h4 class="list-header">Suggested Questions</h4>
                        ${promptsHTML}
                    </div>
                </div>
                ` : ''}
                <div class="prompt-input-area">
                    <div class="prompt-actions-left">
                        <button data-action="attach-file" class="prompt-action-button" title="Attach File"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                        <div class="relative">
                            <button data-action="toggle-settings-modal" class="prompt-action-button" title="Settings"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg></button>
                            ${renderSettingsModal(state.ariaSettings)}
                        </div>
                    </div>
                    <textarea id="aria-prompt-input" class="prompt-input" rows="1" placeholder="Ask a follow-up..."></textarea>
                    <div class="prompt-actions-right">
                        <button data-action="restart-conversation" class="prompt-action-button" title="Restart Conversation"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg></button>
                        <button class="prompt-send-button" data-action="ask-aria" title="Send"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSettingsModal(settings) {
    const { isModalOpen, expandedCategories = {} } = settings;
    
    const settingsStructure = {
        context: {
            label: 'Context',
            main: settings.context?.main ?? true,
            items: {
                ddDataRoom: { label: 'DD Data Room', value: settings.context?.ddDataRoom ?? true },
                investmentThesis: { label: 'Investment Thesis', value: settings.context?.investmentThesis ?? true },
                financialModel: { label: 'Financial Model', value: settings.context?.financialModel ?? true },
                meetingTranscripts: { label: 'Meeting Transcripts', value: settings.context?.meetingTranscripts ?? false }
            }
        },
        domainKnowledge: {
            label: 'Domain Knowledge',
            main: settings.domainKnowledge?.main ?? true,
            items: {
                playbooks: { label: 'Playbooks', value: settings.domainKnowledge?.playbooks ?? true },
                kpiLibrary: { label: 'KPI Library', value: settings.domainKnowledge?.kpiLibrary ?? true },
                maturityModel: { label: 'Maturity Model', value: settings.domainKnowledge?.maturityModel ?? true },
                industryBenchmarks: { label: 'Industry Benchmarks', value: settings.domainKnowledge?.industryBenchmarks ?? true },
                bestPractices: { label: 'Best Practices', value: settings.domainKnowledge?.bestPractices ?? false }
            }
        },
        externalData: {
            label: 'External Data',
            main: settings.externalData?.main ?? true,
            items: {
                linkedin: { label: 'LinkedIn', value: settings.externalData?.linkedin ?? true },
                pitchbook: { label: 'PitchBook', value: settings.externalData?.pitchbook ?? false },
                glassdoor: { label: 'Glassdoor', value: settings.externalData?.glassdoor ?? true },
                web: { label: 'Web Research', value: settings.externalData?.web ?? true },
                newsFeeds: { label: 'News Feeds', value: settings.externalData?.newsFeeds ?? true }
            }
        },
        internalData: {
            label: 'Internal Data',
            main: settings.internalData?.main ?? true,
            items: {
                erp: { label: 'ERP Systems', value: settings.internalData?.erp ?? true },
                crm: { label: 'CRM Data', value: settings.internalData?.crm ?? true },
                hcm: { label: 'HCM Systems', value: settings.internalData?.hcm ?? false },
                devops: { label: 'DevOps Metrics', value: settings.internalData?.devops ?? true },
                csm: { label: 'Customer Success', value: settings.internalData?.csm ?? true },
                financialReports: { label: 'Financial Reports', value: settings.internalData?.financialReports ?? true }
            }
        }
    };

    const renderCategory = (categoryKey, category) => {
        const isExpanded = expandedCategories[categoryKey] || false;
        const subItemsHTML = Object.entries(category.items).map(([itemKey, item]) => `
            <div class="flex items-center justify-between pl-6 py-1">
                <label for="setting-${categoryKey}-${itemKey}" class="text-xs text-gray-600">${item.label}</label>
                <label class="toggle-switch toggle-switch-sm">
                    <input type="checkbox" id="setting-${categoryKey}-${itemKey}" 
                           data-action="update-setting" 
                           data-parent="${categoryKey}" 
                           data-key="${itemKey}" 
                           ${item.value ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </div>
        `).join('');

        return `
            <div class="border-b border-gray-100 last:border-b-0">
                <div class="flex items-center justify-between py-2 cursor-pointer settings-category-header" 
                     data-action="toggle-category" data-category="${categoryKey}">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}" 
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                        <span class="text-sm font-bold text-gray-700">${category.label}</span>
                    </div>
                    <label class="toggle-switch" onclick="event.stopPropagation();">
                        <input type="checkbox" id="setting-${categoryKey}-main" 
                               data-action="update-setting" 
                               data-parent="${categoryKey}" 
                               data-key="main" 
                               ${category.main ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="category-content ${isExpanded ? 'expanded' : 'collapsed'}">
                    <div class="pb-2 space-y-1">${subItemsHTML}</div>
                </div>
            </div>
        `;
    };

    return `
        <div id="settings-modal" class="settings-modal ${isModalOpen ? 'visible' : ''}">
            <div class="p-3 space-y-1 text-sm">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 pb-1 border-b">
                    Data Sources
                </div>
                ${Object.entries(settingsStructure).map(([key, category]) => 
                    renderCategory(key, category)
                ).join('')}
            </div>
        </div>
    `;
}

// --- SIMULATION & EVENT HANDLING ---

async function typeWords(element, text, callback) {
    element.innerHTML = "";
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    let i = 0;
    const words = text.split(' ');
    const timer = setInterval(() => {
        if (i < words.length) {
            element.innerHTML += words[i] + ' ';
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, 30);
}

async function runAriaBuildingSequence(responseElement) {
    const buildItems = responseElement.querySelectorAll('.build-item');
    for (const item of buildItems) {
        item.classList.add('visible');
        
        const typingElements = item.querySelectorAll('[data-typing-text]');
        for (const el of typingElements) {
            await new Promise(resolve => typeWords(el, el.dataset.typingText, resolve));
        }

        const listElements = item.querySelectorAll('[data-animate-list]');
        for (const list of listElements) {
            const listItems = Array.from(list.children);
            list.innerHTML = '';
            for (const li of listItems) {
                list.appendChild(li);
                await new Promise(r => setTimeout(r, 150));
            }
        }
        await new Promise(r => setTimeout(r, 200));
    }
}

function runAriaSequence(promptText) {
    if (!promptText) return;
    let state = loadState();
    const companyId = state.selectedCompanyId;
    const companyResponses = companyDataMap[companyId]?.ariaResponses || {};

    const conversationContainer = document.getElementById('aria-conversation-container');
    if (!conversationContainer) return;

    document.getElementById('suggested-prompts-container')?.remove();
    document.getElementById('aria-prompt-container')?.remove();

    const userPromptHTML = `<div class="user-prompt-bubble"><p class="font-semibold">You</p><p>${promptText}</p></div>`;
    conversationContainer.insertAdjacentHTML('beforeend', userPromptHTML);

    const reasoningId = `reasoning-${Date.now()}`;
    const reasoningHTML = `<div id="${reasoningId}" class="aria-response-bubble"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria is thinking...</p></div></div>`;
    conversationContainer.insertAdjacentHTML('beforeend', reasoningHTML);
    document.getElementById(reasoningId).scrollIntoView({ behavior: 'smooth', block: 'end' });

    setTimeout(() => {
        const responseData = companyResponses[promptText] || companyResponses["default"];
        
        document.getElementById(reasoningId)?.remove();
        const responseId = `response-${responseData.id || Date.now()}`;
        const isFlagged = responseData.id ? !!state.diligenceWorkspace.keyRisks[responseData.id] : false;

        const responseHTML = `
            <div id="${responseId}" class="aria-response-bubble">
                <div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold">Aria</p></div>
                <div class="pl-11">${responseData.renderFunc(state)}</div>
                <div class="response-footer mt-4 pt-3 border-t flex justify-between items-center">
                    <div class="footer-left"><button data-action="flag-response" data-response-id="${responseData.id}" class="feedback-icon ${isFlagged ? 'filled' : ''} flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg><span>Add to Workspace</span></button></div>
                    <div class="footer-right flex items-center gap-4">
                        <button data-action="feedback" class="feedback-icon flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Feedback</span></button>
                        <button data-action="thumb-up" class="feedback-icon" title="Good response"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h3.73a2 2 0 0 1 1.92 2.56Z"/></svg></button>
                        <button data-action="thumb-down" class="feedback-icon" title="Poor response"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h-3.73a2 2 0 0 1-1.92-2.56Z"/></svg></button>
                    </div>
                </div>
            </div>`;
        
        conversationContainer.insertAdjacentHTML('beforeend', responseHTML);
        
        setTimeout(async () => {
            const responseElement = document.getElementById(responseId);
            if (responseElement) {
                const innerContent = responseElement.querySelector('.pl-11');
                await runAriaBuildingSequence(innerContent);
            }
            conversationContainer.insertAdjacentHTML('beforeend', getAdvancedPromptBoxHTML(responseData.followUpQuestions));
            document.getElementById('aria-prompt-container')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 50);

    }, 1000);
}

function initializeAriaEventListeners() {
    const mainContent = document.getElementById('main-content');
    
    if (mainContent.dataset.listenerAttached) return;
    mainContent.dataset.listenerAttached = 'true';
    
    mainContent.addEventListener('click', e => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        
        let state = loadState();
        const action = target.dataset.action;

        switch (action) {
            case 'set-aria-workstream':
                const workstreamId = target.dataset.workstreamId;
                state.techflowAria.activeWorkstream = workstreamId;
                saveState(state);
                
                document.getElementById('suggested-prompts-container')?.remove();
                
                const companyWorkstreamData = companyDataMap[state.selectedCompanyId]?.workstreamData || [];
                const workstreamData = companyWorkstreamData.find(w => w.id === workstreamId);
                
                if (workstreamData?.suggestedQuestions.length > 0) {
                    const conversationContainer = document.getElementById('aria-conversation-container');
                    conversationContainer.insertAdjacentHTML('beforeend', renderSuggestedPrompts(workstreamData.suggestedQuestions));
                    document.getElementById('suggested-prompts-container').scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
                break;

            case 'run-suggested-prompt':
                const question = target.dataset.question;
                if (question) runAriaSequence(question);
                break;
            
            case 'ask-aria':
                const input = document.getElementById('aria-prompt-input');
                const promptText = input ? input.value.trim() : '';
                if (promptText) runAriaSequence(promptText);
                break;
            
            case 'restart-conversation':
                initializeAriaPage();
                break;
            
            case 'toggle-settings-modal':
                state.ariaSettings.isModalOpen = !state.ariaSettings.isModalOpen;
                saveState(state);
                updatePromptContainer(state);
                break;
            
            case 'toggle-category':
                const categoryKey = target.dataset.category;
                if (!state.ariaSettings.expandedCategories) state.ariaSettings.expandedCategories = {};
                state.ariaSettings.expandedCategories[categoryKey] = !state.ariaSettings.expandedCategories[categoryKey];
                saveState(state);
                updatePromptContainer(state);
                break;

            case 'flag-response':
                const responseId = target.dataset.responseId;
                if (!responseId) break;

                const allSources = [techflow_anomalies, techflow_minorObservations, ...Object.values(techflow_ariaResponses), ...Object.values(cloudvantage_ariaResponses)];
                const responseData = allSources.flat().find(item => item.id === responseId);

                if (responseData) {
                    const flagButton = target.closest('button');
                    if (state.diligenceWorkspace.keyRisks[responseId]) {
                        delete state.diligenceWorkspace.keyRisks[responseId];
                        flagButton.classList.remove('filled');
                    } else {
                        state.diligenceWorkspace.keyRisks[responseId] = { id: responseId, title: responseData.title || responseData.category, impact: responseData.impact || responseData.text, source: 'Aria Assistant (Exp)' };
                        flagButton.classList.add('filled');
                    }
                    saveState(state);
                }
                break;
            
            case 'thumb-up':
            case 'thumb-down':
                const btn = target.closest('button');
                const isFilled = btn.classList.contains('filled');
                if (action === 'thumb-up') btn.parentElement.querySelector('[data-action="thumb-down"]').classList.remove('filled');
                if (action === 'thumb-down') btn.parentElement.querySelector('[data-action="thumb-up"]').classList.remove('filled');
                btn.classList.toggle('filled', !isFilled);
                break;
            
            case 'feedback':
                console.log('Feedback button clicked');
                break;
            
            case 'toggle-observations':
                state.techflowAria.minorObservationsExpanded = !state.techflowAria.minorObservationsExpanded;
                saveState(state);
                const container = target.closest('#anomaly-discovery-content');
                if(container) {
                    const contentDiv = container.querySelector('.minor-observations-content');
                    const icon = target.querySelector('svg');
                    contentDiv.classList.toggle('expanded', state.techflowAria.minorObservationsExpanded);
                    contentDiv.classList.toggle('collapsed', !state.techflowAria.minorObservationsExpanded);
                    icon.classList.toggle('rotate-180', state.techflowAria.minorObservationsExpanded);
                }
                break;
        }
    });

    mainContent.addEventListener('change', e => {
        const target = e.target.closest('[data-action="update-setting"]');
        if (!target) return;

        let state = loadState();
        const { parent, key } = target.dataset;
        
        if (parent) {
            if (!state.ariaSettings[parent]) state.ariaSettings[parent] = {};
            state.ariaSettings[parent][key] = target.checked;
        } else {
            state.ariaSettings[key] = target.checked;
        }
        
        saveState(state);
        updatePromptContainer(state);
    });

    mainContent.addEventListener('input', e => {
        const target = e.target;
        if (target.id === 'aria-prompt-input') {
            target.style.height = 'auto';
            target.style.height = (target.scrollHeight) + 'px';
        }
    });
}

function updatePromptContainer(state) {
    const promptContainer = document.getElementById('aria-prompt-container');
    if (promptContainer) {
        const lastResponseBubble = [...document.querySelectorAll('.aria-response-bubble')].pop();
        if (lastResponseBubble) {
            const responseId = lastResponseBubble.id;
            const companyResponses = companyDataMap[state.selectedCompanyId]?.ariaResponses || {};
            const responseKey = Object.keys(companyResponses).find(key => `response-${companyResponses[key].id}` === responseId);
            const followUpQuestions = responseKey ? companyResponses[responseKey].followUpQuestions : [];
            promptContainer.outerHTML = getAdvancedPromptBoxHTML(followUpQuestions);
        } else {
             promptContainer.outerHTML = getAdvancedPromptBoxHTML([]);
        }
    }
}