// js/state.js - Global State Management

function getInitialState() {
    return {
        activeTabId: 'home',
        selectedCompanyId: 'all',
        isReportFinalized: false,
        diligenceWorkspace: {
            keyRisks: {},
            valueLevers: [],
            strategicNotes: []
        },
        cloudvantageAria: {
            state: 'idle',
            context: null,
            conversation: [],
        },
        techflowAria: {
            state: 'idle',
            currentPrompt: '',
            activeWorkstream: null,
            minorObservationsExpanded: false,
        },
        ariaSettings: {
            isModalOpen: false,
            expandedCategories: {}, // All categories collapsed by default
            context: {
                main: true,
                ddDataRoom: true,
                investmentThesis: true,
                financialModel: true,
                meetingTranscripts: false,
            },
            domainKnowledge: {
                main: true,
                playbooks: true,
                kpiLibrary: true,
                maturityModel: true,
                industryBenchmarks: true,
                bestPractices: false,
            },
            externalData: {
                main: true,
                linkedin: true,
                pitchbook: false,
                glassdoor: true,
                web: true,
                newsFeeds: true,
            },
            internalData: {
                main: true,
                erp: true,
                crm: true,
                hcm: false,
                devops: true,
                csm: true,
                financialReports: true,
            }
        },
        modeling: {
            assessmentData: {
                'sales-strategy': { current: 2, target: 4 }, 'brand-awareness': { current: 1, target: 4 },
                'applications': { current: 2, target: 4 }, 'customer-success': { current: 2, target: 4 },
                'financial-reporting': { current: 2, target: 4 }, 'budgeting-forecasting': { current: 1, target: 4 },
                'cash-flow-management': { current: 2, target: 4 }, 'pricing-margin-analysis': { current: 1, target: 3 }
            },
            generatedScenarios: {}
        }
    };
}

function saveState(state) {
    localStorage.setItem('navigatorAppState', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('navigatorAppState');
    if (savedState) {
        return JSON.parse(savedState);
    }
    const initialState = getInitialState();
    saveState(initialState);
    return initialState;
}