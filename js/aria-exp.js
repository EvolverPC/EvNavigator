// js/aria-exp.js - Logic for the Experimental Aria AI Assistant page

// --- DATA SCOPED FOR THIS EXPERIMENT ---
const techflow_workstreamData_exp = [
    { 
        id: 'business', 
        title: 'Business & Strategy', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`, 
        cards: [{label: "Market Size (TAM)", value: "$5.2B"}, {label: "Market CAGR", value: "18%"}, {label: "Competitive Moat", value: "Medium"}],
        suggestedPrompts: ["Summarize the competitive landscape and TechFlow's position.", "What are the key market trends impacting the company?", "Analyze the credibility of the 5-year strategic plan."],
        suggestedActions: [
            { text: "Draft a 'Go-to-Market' slide for the IC memo.", description: "Generate a pre-formatted slide summarizing the GTM strategy for your Investment Committee memo." },
            { text: "Prioritize 'Platform Consolidation' risk in the 100-day plan.", description: "Add this key risk to the 100-day plan to ensure it is addressed post-close." },
            { text: "Generate key questions for the CEO regarding the strategic plan.", description: "Create a list of targeted questions to challenge the assumptions in the management's plan." }
        ]
    },
    { 
        id: 'commercial', 
        title: 'Commercial & Customer', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-teal-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, 
        cards: [{label: "LTV:CAC Ratio", value: "3.1x"}, {label: "Net Revenue Retention", value: "105%"}, {label: "Logo Churn", value: "18%"}],
        suggestedPrompts: ["Show the Quality of Revenue report.", "Analyze the efficiency of the sales and marketing funnel.", "Identify the top 10 customers by revenue and any concentration risks."],
        suggestedActions: [
            { text: "Generate a pricing model with 'Good-Better-Best' tiers.", description: "Create a draft pricing model to improve monetization and expansion revenue." },
            { text: "Draft an email to the Head of Sales about the MQL-to-SQL drop-off.", description: "Generate a pre-written email to kick off a conversation about funnel efficiency." },
            { text: "Add 'Customer Concentration' as a key risk to the workspace.", description: "Flag this critical issue in your workspace to track it as part of the diligence process." }
        ]
    },
    { 
        id: 'tech', 
        title: 'Technology & Operations', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-indigo-600"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" x2="12" y1="2" y2="22"/></svg>`, 
        cards: [{label: "Technical Debt Score", value: "High"}, {label: "Core App Uptime", value: "99.8%"}, {label: "Dev Velocity", value: "Low"}],
        suggestedPrompts: ["Summarize the key architectural risks and their potential cost to remediate.", "How does the R&D team's velocity compare to industry benchmarks?", "What is the plan for migrating off the legacy monolithic architecture?"],
        suggestedActions: [
            { text: "Estimate the cost and timeline for a monolith-to-microservices migration.", description: "Generate a high-level estimate for the cost and timeline of this critical project." },
            { text: "Generate a job description for a 'Lead DevOps Engineer'.", description: "Create a job description to hire the talent needed to improve developer velocity." },
            { text: "Draft an IC memo slide on technical debt.", description: "Summarize the technical debt issue and mitigation plan for the Investment Committee." }
        ]
    },
    { 
        id: 'financial', 
        title: 'Financial & Risk', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-red-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`, 
        cards: [{label: "Gross Margin", value: "72%"}, {label: "Monthly Burn Rate", value: "$450K"}, {label: "Cash Runway", value: "11 mos"}],
        suggestedPrompts: ["Provide an overview of the current registered anomalies.", "What are the key risks to achieving the 2025 forecast?", "Analyze the quality of earnings and identify any one-time adjustments."],
        suggestedActions: [
            { text: "Draft an email to the CFO requesting clarification on revenue recognition policies.", description: "Generate a pre-written email to the CFO to get clarity on a key accounting policy." },
            { text: "Request all contracts with non-standard terms be uploaded to the data room.", description: "Log a formal request to the deal team to gather critical legal documents." },
            { text: "Build the 'Base Case' financial model.", description: "Create a more realistic financial model based on diligence findings, not just management's view." }
        ]
    }
];

// --- PAGE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadSharedComponents();
    initializeAriaExpPage();
    initializeAriaExpEventListeners();
});

function initializeAriaExpPage() {
    let state = loadState();
    state.selectedCompanyId = 'techflow-solutions';
    state.techflowAria.activeWorkstream = null;
    state.techflowAria.minorObservationsExpanded = false;
    saveState(state);
    Navigation.updateCompanySelector();

    const ariaView = document.getElementById('aria-main-view');
    if (ariaView) {
        ariaView.innerHTML = `
            <div id="aria-conversation-container" class="space-y-6">
                ${renderInitialWorkstreamCards()}
                ${getSimplePromptBoxHTML()}
            </div>
        `;
    }
}

// --- CORE RENDERING FUNCTIONS ---

function renderInitialWorkstreamCards() {
    return `<div id="workstream-cards-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${techflow_workstreamData_exp.map(ws => `
            <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
                <div class="flex-grow">
                    <div class="flex items-center gap-3"><div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg">${ws.icon}</div><h2 class="text-lg font-bold text-gray-800">${ws.title}</h2></div>
                    <div class="space-y-2 mt-4">${ws.cards.map(card => `<div class="flex justify-between items-baseline text-sm"><span class="text-gray-500">${card.label}</span><span class="font-semibold text-gray-800">${card.value}</span></div>`).join('')}</div>
                </div>
                <button data-action="set-aria-workstream" data-workstream-id="${ws.id}" class="w-full text-sm font-semibold py-2 px-4 rounded-md mt-6 bg-gray-100 text-gray-700 hover:bg-gray-200">Dive Deeper</button>
            </div>
        `).join('')}
    </div>`;
}

function getSimplePromptBoxHTML() {
    const state = loadState();
    return `
        <div id="aria-prompt-container" class="mt-6">
            <div class="prompt-box-container p-2">
                <div class="flex items-end gap-2">
                    <div class="relative">
                        <button data-action="toggle-settings-modal" class="prompt-action-button p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                        </button>
                        ${renderSettingsModal(state.ariaSettings)}
                    </div>
                    <textarea id="aria-prompt-input" class="w-full p-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50" rows="1" placeholder="Select a workstream above to begin..." disabled></textarea>
                </div>
            </div>
        </div>
    `;
}

function getAdvancedPromptBoxHTML(followUpQuestions = []) {
    const state = loadState();
    const promptsHTML = followUpQuestions.map(q => `<button data-action="run-suggested-prompt" data-question="${q}" class="flex items-center w-full text-left gap-2 text-sm bg-sky-100 text-sky-800 px-3 py-2 rounded-lg hover:bg-sky-200 transition-colors"><span>${q}</span></button>`).join('');

    return `
        <div id="aria-prompt-container" class="mt-6">
            <div class="prompt-box-container">
                ${promptsHTML.length > 0 ? `
                <div class="p-4">
                    <div class="space-y-2">
                        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Suggested Questions</h4>
                        ${promptsHTML}
                    </div>
                </div>
                ` : ''}
                <div class="border-t p-2">
                    <div class="flex items-end gap-2">
                        <div class="relative">
                            <button data-action="toggle-settings-modal" class="prompt-action-button p-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg></button>
                            ${renderSettingsModal(state.ariaSettings)}
                        </div>
                        <textarea id="aria-prompt-input" class="w-full p-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none" rows="1" placeholder="Ask a follow-up..."></textarea>
                        <button data-action="restart-conversation" class="prompt-action-button p-2" title="Restart Conversation"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg></button>
                        <button class="prompt-send-button flex-shrink-0" data-action="ask-aria"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- UPDATED SETTINGS MODAL ---
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
                    <span class="toggle-slider"></span>
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
                        <span class="toggle-slider"></span>
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

    const conversationContainer = document.getElementById('aria-conversation-container');
    if (!conversationContainer) return;

    document.getElementById('aria-prompt-container')?.remove();

    const userPromptHTML = `<div class="bg-white p-4 rounded-lg shadow-sm border"><p class="font-semibold text-gray-500">You</p><p class="text-gray-800">${promptText}</p></div>`;
    conversationContainer.insertAdjacentHTML('beforeend', userPromptHTML);

    const reasoningId = `reasoning-${Date.now()}`;
    const reasoningHTML = `<div id="${reasoningId}" class="aria-response-bubble"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria is thinking...</p></div></div>`;
    conversationContainer.insertAdjacentHTML('beforeend', reasoningHTML);
    document.getElementById(reasoningId).scrollIntoView({ behavior: 'smooth', block: 'end' });

    setTimeout(() => {
        const responseData = techflow_ariaResponses[promptText] || { id: 'unknown', title: 'Unknown Query', renderFunc: () => `<div class="build-item"><p data-typing-text='I am still learning about "${promptText}". Please try another question.'></p></div>`, followUpQuestions: [] };
        
        document.getElementById(reasoningId)?.remove();
        const responseId = `response-${responseData.id || Date.now()}`;
        const isFlagged = responseData.id ? !!state.diligenceWorkspace.keyRisks[responseData.id] : false;

        let suggestedActionsHTML = '';
        if (responseData.id !== 'unknown' && state.techflowAria.activeWorkstream) {
            const workstreamData = techflow_workstreamData_exp.find(w => w.id === state.techflowAria.activeWorkstream);
            if (workstreamData?.suggestedActions?.length > 0) {
                const actionsCardsHTML = workstreamData.suggestedActions.map(action => `
                    <button data-action="run-suggested-prompt" data-question="${action.text}" class="build-item w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                        <div class="flex items-start gap-3">
                            <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></span>
                            <div><p class="font-semibold text-sm text-gray-800">${action.text}</p><p class="text-xs text-gray-500 mt-1">${action.description}</p></div>
                        </div>
                    </button>`).join('');
                suggestedActionsHTML = `<div class="build-item mt-4 pt-4 border-t"><h4 class="text-sm font-semibold text-gray-600 mb-3">Recommended Actions</h4><div class="space-y-2">${actionsCardsHTML}</div></div>`;
            }
        }

        const responseHTML = `
            <div id="${responseId}" class="aria-response-bubble">
                <div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria</p></div>
                <div class="pl-11">${responseData.renderFunc(state)}${suggestedActionsHTML}</div>
                <div class="response-footer mt-4 pt-3 border-t flex justify-between items-center">
                    <div class="footer-left"><button data-action="flag-response" data-response-id="${responseData.id}" class="feedback-icon ${isFlagged ? 'filled' : ''} flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg><span>Add to Workspace</span></button></div>
                    <div class="footer-right flex items-center gap-4">
                        <button data-action="feedback" class="feedback-icon flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Feedback</span></button>
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

function initializeAriaExpEventListeners() {
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
                
                document.getElementById('workstream-cards-container')?.remove();
                document.getElementById('aria-prompt-container')?.remove();

                const workstreamData = techflow_workstreamData_exp.find(w => w.id === workstreamId);
                if (workstreamData?.suggestedPrompts.length > 0) {
                    runAriaSequence(workstreamData.suggestedPrompts[0]);
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
                initializeAriaExpPage();
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

                const allSources = [techflow_anomalies, techflow_minorObservations, ...Object.values(techflow_ariaResponses)];
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
}

function updatePromptContainer(state) {
    const promptContainer = document.getElementById('aria-prompt-container');
    if (promptContainer) {
        const lastResponseBubble = [...document.querySelectorAll('.aria-response-bubble')].pop();
        if (lastResponseBubble) {
            const responseId = lastResponseBubble.id;
            const responseKey = Object.keys(techflow_ariaResponses).find(key => `response-${techflow_ariaResponses[key].id}` === responseId);
            const followUpQuestions = responseKey ? techflow_ariaResponses[responseKey].followUpQuestions : [];
            promptContainer.outerHTML = getAdvancedPromptBoxHTML(followUpQuestions);
        } else {
             promptContainer.outerHTML = getAdvancedPromptBoxHTML([]);
        }
    }
}