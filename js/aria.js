document.addEventListener('DOMContentLoaded', () => {
    // NOTE: In a real multi-page setup, the 'state' and 'data' would be managed globally,
    // possibly through a shared script, session storage, or a state management library.
    // For this standalone example, we'll include simplified versions of necessary data and state.

    // =================================================================
    // SIMPLIFIED STATE & DATA (for standalone aria.html)
    // =================================================================
    let state = {
        selectedCompanyId: 'techflow-solutions', // Default for demonstration
        cloudvantageAria: { state: 'idle', context: null, conversation: [] },
        techflowAria: { state: 'idle', currentPrompt: '', activeWorkstream: null, minorObservationsExpanded: false }
    };

    // You would import this from data.js
    const suggestedPrompts = {
        'default': [ { id: 'summarize-techflow', text: "Summarize the key risks for TechFlow Solutions" }, /* ... */ ],
        'sales-renewals': [ { id: 'run-renewal-analysis', text: 'Process the renewals for the NewCo acquisition customers.' }, /* ... */ ],
        'renewal-part2': [ { id: 'generate-convo-guides', text: 'Generate the conversation guides for the sellers per customer.' }, /* ... */ ],
        'renewal-part3': [ { id: 'draft-email', text: 'Draft a renewal kick-off email for James Brown to send to Global Enterprises.' }, /* ... */ ]
    };
    const renewalOpportunities = [
        { account: 'Global Enterprises Inc.', segment: 'Gold', value: 3245000, date: 'July 15, 2025', circumstance: 'Business Success' },
        { account: 'Apex Solutions', segment: 'Gold', value: 2780000, date: 'August 3, 2025', circumstance: 'Technical Success' },
        // ... other opportunities
    ];
    const techflow_workstreamData = [
        { id: 'business', title: 'Business & Strategy', icon: `<svg>...</svg>`, cards: [/*...*/], suggestedQuestions: ["Summarize the competitive landscape and TechFlow's position.", "What are the key market trends impacting the company?", "Analyze the credibility of the 5-year strategic plan."] },
        { id: 'commercial', title: 'Commercial & Customer', icon: `<svg>...</svg>`, cards: [/*...*/], suggestedQuestions: ["Show the Quality of Revenue report.", "Analyze the efficiency of the sales and marketing funnel.", "Identify the top 10 customers by revenue and any concentration risks."] },
        // ... other workstreams
    ];
    const techflow_ariaResponses = {
        "Provide an overview of the current registered anomalies.": {
            renderFunc: () => renderTechFlowFullAnomalyReport(true),
            followUpQuestions: ["How should we adjust the valuation model based on these anomalies?", "What is the true recurring revenue quality?", "Draft an email to management asking about these issues."]
        },
        // ... other pre-canned Aria responses
    };


    // =================================================================
    // ARIA-SPECIFIC UI RENDERING FUNCTIONS
    // =================================================================

    function renderAriaScreen() {
        const mainContent = document.getElementById('main-content');
        // Determine which Aria experience to show based on URL parameters or session state
        const params = new URLSearchParams(window.location.search);
        const company = params.get('company') || state.selectedCompanyId;
        const trigger = params.get('trigger');

        state.selectedCompanyId = company;

        if (company === 'techflow-solutions') {
            mainContent.innerHTML = renderTechFlowAriaExperience();
            if (trigger === 'anomaly-report') {
                // Directly trigger the anomaly detection routine
                state.techflowAria.currentPrompt = "Provide an overview of the current registered anomalies.";
                state.techflowAria.state = 'typingPrompt';
                runTechFlowAriaSequence(renderAriaScreen);
            }
        } else if (company === 'cloudvantage') {
            mainContent.innerHTML = renderCloudVantageAriaExperience();
            if (trigger === 'sales-renewals') {
                // Directly trigger the sales renewal sequence
                state.cloudvantageAria.conversation.push({ speaker: 'user', text: 'Process the renewals for the NewCo acquisition customers.' });
                runAriaRenewalSequence(renderAriaScreen);
            }
        } else {
            mainContent.innerHTML = `<div class="text-center py-16"><h3 class="text-lg font-medium text-gray-900">No Company Selected</h3><p class="mt-1 text-sm text-gray-500">Please select a portfolio company to interact with Aria.</p></div>`;
        }
    }

    function renderCloudVantageAriaExperience() {
        const { state: ariaState, context: ariaContext, conversation: ariaConversation } = state.cloudvantageAria;

        const renderPromptArea = () => {
            const currentContext = ariaState === 'pausedForInput' ? ariaContext : (ariaContext || 'default');
            const prompts = suggestedPrompts[currentContext] || [];
            return `<div class="mt-8"><div class="flex flex-wrap gap-2 mb-4">${prompts.map(p => `<button data-action="run-aria-prompt" data-prompt-id="${p.id}" class="text-sm bg-sky-100 text-sky-800 px-3 py-1 rounded-full hover:bg-sky-200 transition-colors">${p.text}</button>`).join('')}</div><div class="relative"><textarea id="aria-prompt" class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows="3" placeholder="Ask a follow-up question or select a prompt above..."></textarea><div class="absolute bottom-2 right-2 flex gap-2"><button data-action="reset-aria" class="bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded-md hover:bg-gray-300 transition-colors text-sm">Reset</button><button class="bg-blue-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm">Ask</button></div></div></div>`;
        };

        let conversationHtml = ariaConversation.map(msg => {
            if (msg.speaker === 'user') {
                return `<div class="bg-white p-4 rounded-lg shadow-sm mb-4"><p class="font-semibold text-gray-500">You</p><p class="text-gray-800">${msg.text}</p></div>`;
            } else { // speaker === 'aria'
                return `<div class="bg-white p-4 rounded-lg shadow-sm mb-4"><div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">A</div><p class="font-semibold text-gray-800">Aria</p></div><div class="pl-11">${msg.html}</div></div>`;
            }
        }).join('');

        if (ariaState === 'thinking') {
            conversationHtml += `<div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">A</div><p class="font-semibold text-gray-800">Aria is thinking</p><div class="flex gap-1"><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot1"></div><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot2"></div><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot3"></div></div></div></div>`;
        }

        return `<div class="max-w-4xl mx-auto">
            <div id="aria-conversation-container">${conversationHtml}</div>
            ${(ariaState === 'idle' || ariaState === 'pausedForInput') ? renderPromptArea() : ''}
        </div>`;
    }

    function renderTechFlowAriaExperience() {
        const { state: ariaState, activeWorkstream } = state.techflowAria;
        if (ariaState === 'idle') {
            const currentWorkstream = techflow_workstreamData.find(w => w.id === activeWorkstream);
            const suggestedQuestions = currentWorkstream ? currentWorkstream.suggestedQuestions : ["Summarize the competitive landscape and TechFlow's position.", "What are the primary drivers of customer churn?", "Provide an overview of the current registered anomalies."];

            return `
                <div class="space-y-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        ${techflow_workstreamData.map(ws => `
                            <div class="bg-white p-6 rounded-lg shadow-md border ${ws.id === activeWorkstream ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'} space-y-4">
                                <div class="flex items-center gap-3"><div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg">${ws.icon}</div><h2 class="text-lg font-bold text-gray-800">${ws.title}</h2></div>
                                <div class="space-y-2">${ws.cards.map(card => `<div class="flex justify-between items-baseline text-sm"><span class="text-gray-500">${card.label}</span><span class="font-semibold text-gray-800">${card.value}</span></div>`).join('')}</div>
                                <button data-action="set-aria-workstream" data-workstream-id="${ws.id}" class="w-full text-sm font-semibold py-2 px-4 rounded-md ${ws.id === activeWorkstream ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Dive Deeper</button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-gray-600 mb-2">Suggested Questions:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${suggestedQuestions.map(q => `<button data-action="ask-aria" data-question="${q}" class="text-sm bg-sky-100 text-sky-800 px-3 py-1 rounded-full hover:bg-sky-200">${q}</button>`).join('')}
                            </div>
                        </div>
                        <textarea id="aria-prompt" class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg" rows="3" placeholder="Ask Aria anything..."></textarea>
                        <div class="mt-3 flex justify-end items-center gap-2">
                            <button data-action="ask-aria" data-question="Reset" class="p-2 rounded-md hover:bg-gray-100" title="Reset"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/></svg></button>
                            <button data-action="ask-aria" class="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">Ask</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `<div class="max-w-4xl mx-auto"><div class="bg-white p-4 rounded-lg shadow-sm mb-4"><p class="font-semibold text-gray-500">You</p><p class="text-gray-800" id="aria-typed-prompt"></p></div><div id="aria-response-container"></div></div>`;
        }
    }

    // Placeholder for anomaly report rendering function
    function renderTechFlowFullAnomalyReport(forAnimation = false) {
        // This function's full code would be here, copied from the original file.
        // It renders the detailed anomaly report for TechFlow.
        return `<div id="anomaly-discovery-content" class="text-center p-8">
            <h2 class="text-2xl font-bold">Anomaly Report Would Be Displayed Here</h2>
            <p>(This is a placeholder for the full anomaly report UI)</p>
        </div>`;
    }


    // =================================================================
    // ARIA SEQUENCE & LOGIC FUNCTIONS
    // =================================================================

    function runAriaRenewalSequence(render) {
        state.cloudvantageAria.state = 'thinking';
        render();

        setTimeout(() => {
            const reasoningHtml = `<p class="text-gray-700 mb-4">Let's process the renewals for the NewCo acquisition. First, I'll segment the acquired customers and analyze their current contracts to identify uplift opportunities based on best practices.</p>`;
            state.cloudvantageAria.conversation.push({ speaker: 'aria', html: reasoningHtml });
            state.cloudvantageAria.state = 'building';
            render();
        }, 1500);

        setTimeout(() => {
            const segmentColors = { Gold: 'bg-yellow-400', Silver: 'bg-gray-300', Bronze: 'bg-yellow-600' };
            const tableHtml = `<h4 class="font-semibold text-gray-800 mb-2">NewCo Acquisition - Renewal Opportunities</h4>
            <div class="overflow-x-auto border rounded-lg"><table class="w-full text-left text-sm">
                <thead class="bg-gray-50"><tr class="border-b"><th class="p-3 font-semibold text-gray-600">Account</th><th class="p-3 font-semibold text-gray-600">Segment</th><th class="p-3 font-semibold text-gray-600">Contract Value</th><th class="p-3 font-semibold text-gray-600">Renewal Date</th><th class="p-3 font-semibold text-gray-600">Circumstance</th></tr></thead>
                <tbody>${renewalOpportunities.map(c => `<tr class="border-t"><td class="p-3 font-medium text-gray-800">${c.account}</td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium text-gray-800 ${segmentColors[c.segment]}">${c.segment}</span></td><td class="p-3 text-gray-700">$${c.value.toLocaleString()}</td><td class="p-3 text-gray-700">${c.date}</td><td class="p-3 text-gray-700">${c.circumstance}</td></tr>`).join('')}</tbody>
            </table></div>`;
            state.cloudvantageAria.conversation[state.cloudvantageAria.conversation.length - 1].html += tableHtml;
            render();
        }, 2500);

        setTimeout(() => {
            const upliftHtml = `<div class="mt-6 p-4 bg-sky-50 border-l-4 border-sky-400 rounded-r-lg">
                <h4 class="font-semibold text-sky-800 mb-2">Playbook best practice:</h4>
                <ul class="list-disc list-outside pl-5 space-y-1 text-gray-700">
                    <li><strong>20% uplift</strong> for Gold customer segment that are under-priced and currently in the Business Success circumstance.</li>
                    <li><strong>10% uplift</strong> for all others in Gold.</li>
                    <li><strong>10% uplift</strong> for Silver segment customers that have at least achieved Technical Success circumstance.</li>
                    <li><strong>25% for all</strong> in the Bronze segment.</li>
                </ul>
                <p class="font-semibold mt-4">Shall I move forward?</p>
            </div>`;
            state.cloudvantageAria.conversation[state.cloudvantageAria.conversation.length - 1].html += upliftHtml;
            state.cloudvantageAria.state = 'pausedForInput';
            state.cloudvantageAria.context = 'renewal-part2';
            render();
        }, 4000);
    }

    function runAriaConversationGuideSequence(render) {
        state.cloudvantageAria.state = 'thinking';
        render();

        setTimeout(() => {
            const guideHtml = `
                <p class="text-gray-700 mb-4">I'm generating tailored conversation guides based on the uplift strategy. Here are the key talking points for two distinct customer segments:</p>
                <div class="border rounded-lg p-4 mb-4">
                    <h5 class="font-semibold text-gray-800">Guide for: Global Enterprises Inc. (Gold, Business Success)</h5>
                    <p class="text-sm text-gray-500 mb-2">Objective: Secure 20% uplift by highlighting value and introducing new premium features.</p>
                    <ul class="list-disc list-outside pl-5 space-y-1 text-sm text-gray-700">
                        <li><strong>Acknowledge Success:</strong> Start by referencing their specific business success metrics achieved with our platform.</li>
                        <li><strong>Introduce Platinum Support:</strong> Frame the uplift as an upgrade to a new "Platinum" tier, which includes dedicated support and early access to the upcoming AI features.</li>
                        <li><strong>Justify Value:</strong> Connect the price increase directly to the enhanced service level and new capabilities that will further accelerate their success.</li>
                    </ul>
                </div>
                <div class="border rounded-lg p-4">
                    <h5 class="font-semibold text-gray-800">Guide for: Horizon Solutions (Bronze, Struggler)</h5>
                    <p class="text-sm text-gray-500 mb-2">Objective: Secure 25% uplift by re-engaging and demonstrating a path to success.</p>
                    <ul class="list-disc list-outside pl-5 space-y-1 text-sm text-gray-700">
                        <li><strong>Re-engage & Listen:</strong> Begin by understanding their challenges. Do not lead with the price increase.</li>
                        <li><strong>Offer Solutions:</strong> Propose a "Success Plan" with 2-3 concrete steps they can take to get more value, leveraging existing features they may not be using.</li>
                        <li><strong>Frame Renewal:</strong> Position the renewal as a joint commitment to their success, with the modest price increase funding the additional resources for their success plan.</li>
                    </ul>
                </div>
                <p class="text-gray-700 mt-4 font-semibold">The full guides have been attached to each account in Salesforce and emailed to the account owners. What's next?</p>
            `;

            state.cloudvantageAria.conversation.push({ speaker: 'aria', html: guideHtml });
            state.cloudvantageAria.state = 'pausedForInput';
            state.cloudvantageAria.context = 'renewal-part3';
            render();
        }, 3000);
    }

    function runTechFlowAriaSequence(render) {
        const promptEl = document.getElementById('aria-typed-prompt');
        const responseContainer = document.getElementById('aria-response-container');
        if (!promptEl || !responseContainer) return;

        const promptText = state.techflowAria.currentPrompt;

        typewriter(promptEl, promptText, () => {
            state.techflowAria.state = 'thinking';
            responseContainer.innerHTML = `<div class="bg-white p-4 rounded-lg shadow-sm" id="aria-thinking-box"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">A</div><p class="font-semibold text-gray-800">Aria is thinking</p><div class="flex gap-1"><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot1"></div><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot2"></div><div class="w-2 h-2 rounded-full bg-gray-400 thinking-dot dot3"></div></div></div><div id="aria-reasoning-steps" class="mt-4 pl-11 space-y-2 text-sm text-gray-500"></div></div>`;
            const reasoningStepsEl = document.getElementById('aria-reasoning-steps');

            setTimeout(() => { reasoningStepsEl.innerHTML += `<p class="flex items-center gap-2"><svg>...</svg>Parsing request...</p>`; }, 500);
            setTimeout(() => { reasoningStepsEl.innerHTML += `<p class="flex items-center gap-2"><svg>...</svg>Querying data lake for 'TechFlow Solutions'...</p>`; }, 1200);
            setTimeout(() => { reasoningStepsEl.innerHTML += `<p class="flex items-center gap-2"><svg>...</svg>Synthesizing findings and identifying anomalies...</p>`; }, 2000);

            setTimeout(() => {
                state.techflowAria.state = 'building';
                const response = techflow_ariaResponses[promptText] || { renderFunc: () => renderTechFlowFullAnomalyReport(true), followUpQuestions: ["What are the key risks?", "Summarize the value creation plan.", "Draft an investment memo."] };
                responseContainer.innerHTML = response.renderFunc();
                // In a real app, you'd call a function to animate the response build-out.
                // For simplicity, we'll just show it.
                state.techflowAria.state = 'displayingResults';
            }, 2800);
        });
    }

    function typewriter(element, text, callback) {
        let i = 0;
        element.innerHTML = "";
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, 10);
    };


    // =================================================================
    // EVENT LISTENERS
    // =================================================================
    document.getElementById('main-content').addEventListener('click', e => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        const { action, promptId, workstreamId, question } = target.dataset;

        switch(action) {
            case 'run-aria-prompt':
                if (state.selectedCompanyId === 'cloudvantage') {
                    const prompt = (suggestedPrompts[state.cloudvantageAria.context] || []).find(p => p.id === promptId);
                    if (prompt) {
                        state.cloudvantageAria.conversation.push({ speaker: 'user', text: prompt.text });
                        if (promptId === 'run-renewal-analysis') {
                            runAriaRenewalSequence(renderAriaScreen);
                        } else if (promptId === 'generate-convo-guides') {
                            runAriaConversationGuideSequence(renderAriaScreen);
                        }
                    }
                }
                break;
            case 'reset-aria':
                if (state.selectedCompanyId === 'cloudvantage') {
                    state.cloudvantageAria.state = 'idle';
                    state.cloudvantageAria.conversation = [];
                    renderAriaScreen();
                }
                break;
            case 'set-aria-workstream':
                state.techflowAria.activeWorkstream = workstreamId;
                renderAriaScreen();
                break;
            case 'ask-aria':
                if (state.selectedCompanyId === 'techflow-solutions') {
                    const promptText = question || document.getElementById('aria-prompt')?.value;
                    if (promptText && promptText.trim().toLowerCase() === 'reset') {
                        state.techflowAria.state = 'idle';
                        state.techflowAria.activeWorkstream = null;
                    } else if (promptText) {
                        state.techflowAria.currentPrompt = promptText;
                        state.techflowAria.state = 'typingPrompt';
                    }
                    renderAriaScreen();
                }
                break;
        }
    });


    // --- INITIALIZATION ---
    renderAriaScreen();
});