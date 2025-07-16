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

    ariaView.innerHTML = `<div id="aria-conversation-container" class="space-y-6"></div>`;
    const conversationContainer = document.getElementById('aria-conversation-container');

    // If a trigger is passed from another page, start the sequence directly
    if (trigger && triggerToPromptMap[trigger]) {
        runAriaSequence(triggerToPromptMap[trigger]);
    } else {
        // Otherwise, show the standard workstream selection view
        conversationContainer.innerHTML = renderInitialWorkstreamCards(companyId);
    }
}

// --- CORE RENDERING FUNCTIONS ---

function renderInitialWorkstreamCards(companyId) {
    const data = companyDataMap[companyId]?.workstreamData || [];
    return `<div id="workstream-cards-container" class="aria-workstream-grid">
        ${data.map(ws => `
            <div class="aria-workstream-card" data-workstream-id="${ws.id}">
                <div class="card-content">
                    <div class="card-header">
                        <div class="card-icon">${ws.icon}</div>
                        <h2 class="card-title">${ws.title}</h2>
                    </div>
                    <div class="card-stats">
                        ${ws.cards.map(card => `<div class="stat-item"><span class="stat-label">${card.label}</span><span class="stat-value">${card.value}</span></div>`).join('')}
                    </div>
                </div>
                <div class="card-button-wrapper">
                    <button data-action="set-aria-workstream" data-workstream-id="${ws.id}" class="card-button">Dive Deeper</button>
                </div>
            </div>
        `).join('')}
    </div>`;
}

function renderSuggestedPrompts(questions) {
    if (!questions || questions.length === 0) return '';
    const promptsHTML = questions.map(q => `<button data-action="run-suggested-prompt" data-question="${q}" class="suggested-prompt-button">${q}</button>`).join('');
    return `
        <div class="suggested-prompts-list">
            <h4 class="list-header">Suggested Questions</h4>
            ${promptsHTML}
        </div>
    `;
}

function renderSuggestedActions(actions) {
    if (!actions || actions.length === 0) return '';
    const actionsHTML = actions.map(a => `
        <button data-action="run-suggested-prompt" data-question="${a.text}" class="suggested-action-card">
            <p class="font-semibold text-sm text-primary">${a.text}</p>
            <p class="text-xs text-secondary">${a.description}</p>
        </button>
    `).join('');
    return `
        <div class="suggested-actions-list">
            <h4 class="list-header">Recommended Actions</h4>
            ${actionsHTML}
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
                        <h4 class="list-header">Follow-up Questions</h4>
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

    // Clear any existing suggestions or prompt boxes
    document.getElementById('suggestions-container')?.remove();
    document.getElementById('aria-prompt-container')?.remove();
    document.getElementById('aria-intro-bubble')?.remove();


    const userPromptHTML = `<div class="user-prompt-bubble"><p class="font-semibold">You</p><p>${promptText}</p></div>`;
    conversationContainer.insertAdjacentHTML('beforeend', userPromptHTML);
    conversationContainer.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });


    const reasoningId = `reasoning-${Date.now()}`;
    const reasoningHTML = `<div id="${reasoningId}" class="aria-response-bubble"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria is thinking...</p></div></div>`;
    conversationContainer.insertAdjacentHTML('beforeend', reasoningHTML);
    document.getElementById(reasoningId).scrollIntoView({ behavior: 'smooth', block: 'end' });

    setTimeout(() => {
        const responseData = companyResponses[promptText];
        
        document.getElementById(reasoningId)?.remove();

        if (!responseData) {
            const errorHTML = `<div class="aria-response-bubble"><p>Sorry, I don't have a response for that yet.</p></div>`;
            conversationContainer.insertAdjacentHTML('beforeend', errorHTML);
            conversationContainer.insertAdjacentHTML('beforeend', getAdvancedPromptBoxHTML([]));
            conversationContainer.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
            return;
        }

        const responseId = `response-${responseData.id || Date.now()}`;
        const isFlagged = responseData.id ? !!state.diligenceWorkspace.keyRisks[responseData.id] : false;

        const responseHTML = `
            <div id="${responseId}" class="aria-response-bubble">
                <div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold">Aria</p></div>
                <div class="pl-11">
                    ${responseData.renderFunc(state)}
                    <div class="mt-6 build-item">
                        ${renderSuggestedActions(responseData.suggestedActions)}
                    </div>
                </div>
                <div class="response-footer mt-4 pt-3 border-t flex justify-between items-center">
                    <div class="footer-left">
                        <button data-action="flag-response" data-response-id="${responseData.id}" class="feedback-icon ${isFlagged ? 'filled' : ''}">
                            <span class="tooltip-text tooltip-right">Add to Workspace</span>
                            <span class="icon-unfilled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"/></svg></span>
                            <span class="icon-filled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/></svg></span>
                        </button>
                    </div>
                    <div class="footer-right flex items-center gap-4">
                        <button data-action="feedback" class="feedback-icon">
                            <span class="tooltip-text tooltip-left">Feedback</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                        <button data-action="thumb-down" class="feedback-icon">
                            <span class="tooltip-text tooltip-bottom">Not a great response</span>
                            <span class="icon-unfilled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16"><path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/></svg></span>
                            <span class="icon-filled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16"><path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068-.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/></svg></span>
                        </button>
                        <button data-action="thumb-up" class="feedback-icon">
                            <span class="tooltip-text tooltip-bottom">Great Response</span>
                            <span class="icon-unfilled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111-.273-.154-.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/></svg></span>
                            <span class="icon-filled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16"><path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.638.199-.575.356-1.539.428-2.59z"/></svg></span>
                        </button>
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
                const allWorkstreamCards = document.querySelectorAll('.aria-workstream-card');
                allWorkstreamCards.forEach(card => card.classList.remove('active'));
                target.closest('.aria-workstream-card').classList.add('active');

                state.techflowAria.activeWorkstream = workstreamId;
                saveState(state);
                
                const conversationContainer = document.getElementById('aria-conversation-container');
                
                // Remove any previous chat bubbles, but not the workstream cards
                const chatBubbles = conversationContainer.querySelectorAll('.aria-response-bubble, .user-prompt-bubble, #aria-prompt-container');
                chatBubbles.forEach(bubble => bubble.remove());

                const companyWorkstreamData = companyDataMap[state.selectedCompanyId]?.workstreamData || [];
                const workstreamData = companyWorkstreamData.find(w => w.id === workstreamId);
                
                if (workstreamData) {
                    const introId = `aria-intro-bubble`;
                    // Remove previous intro bubble if it exists
                    document.getElementById(introId)?.remove();

                    const introHTML = `
                        <div id="${introId}" class="aria-response-bubble">
                            <div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold">Aria</p></div>
                            <div class="pl-11">
                                <p class="response-text">Ok, let's dive into ${workstreamData.title}. What would you like to know? Here are some starting points:</p>
                                <div class="mt-4">${renderSuggestedPrompts(workstreamData.suggestedQuestions)}</div>
                            </div>
                        </div>`;
                    conversationContainer.insertAdjacentHTML('beforeend', introHTML);
                    document.getElementById(introId).scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
                break;

            case 'run-suggested-prompt':
                const question = target.dataset.question;
                if (question) runAriaSequence(question);
                break;
            
            case 'ask-aria':
                const input = document.getElementById('aria-prompt-input');
                const promptText = input ? input.value.trim() : '';
                if (promptText) {
                    input.value = '';
                    runAriaSequence(promptText);
                }
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
                const feedbackModalHTML = `
                    <div id="feedback-modal-overlay" class="feedback-modal-overlay">
                        <div class="feedback-modal-content">
                            <h4 class="feedback-modal-title">Provide Feedback</h4>
                            <p class="feedback-modal-text">Your feedback helps improve Aria's responses.</p>
                            <textarea id="feedback-textarea" class="feedback-textarea" rows="4" placeholder="Enter your comments..."></textarea>
                            <div class="feedback-modal-actions">
                                <button id="close-feedback-modal" class="secondary-button">Cancel</button>
                                <button id="submit-feedback" class="primary-button">Submit to Aria</button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', feedbackModalHTML);

                document.getElementById('submit-feedback').addEventListener('click', () => {
                    const text = document.getElementById('feedback-textarea').value;
                    console.log('Feedback submitted:', text);
                    document.getElementById('feedback-modal-overlay').remove();
                });
                document.getElementById('close-feedback-modal').addEventListener('click', () => {
                    document.getElementById('feedback-modal-overlay').remove();
                });
                document.getElementById('feedback-modal-overlay').addEventListener('click', (e) => {
                    if (e.target.id === 'feedback-modal-overlay') {
                        e.target.remove();
                    }
                });
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