// js/shared.js - Shared utilities, state, component loading, and navigation

// =================================================================
// COMPONENT LOADER
// =================================================================
const ComponentLoader = {
    async loadComponent(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            return await response.text();
        } catch (error) {
            console.error('Error loading component:', error);
            return `<div class="text-red-500">Error: ${path} could not be loaded.</div>`;
        }
    },
    async loadHeader() { return this.loadComponent('components/header.html'); },
    async loadSidebar() { return this.loadComponent('components/sidebar.html'); }
};

// A helper to load all shared components and initialize navigation
async function loadSharedComponents() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const headerContainer = document.getElementById('header-container');
    
    if (sidebarContainer) {
        sidebarContainer.innerHTML = await ComponentLoader.loadSidebar();
    }
    if (headerContainer) {
        headerContainer.innerHTML = await ComponentLoader.loadHeader();
    }
    // Once loaded, initialize navigation elements
    Navigation.updateAll();
}


// =================================================================
// NAVIGATION
// =================================================================
const Navigation = {
    getCurrentPage() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '');
        return pageName === '' ? 'index' : pageName;
    },

    updateHeaderTitle() {
        const titleElement = document.getElementById('header-title');
        if (!titleElement) return;
        const page = this.getCurrentPage();
        const state = loadState(); // Assumes state.js is loaded
        
        let title = 'Dashboard';
        if (page === 'index') title = 'Portfolio Overview';
        if (page === 'portco') title = state.selectedCompanyId === 'techflow-solutions' ? 'TechFlow Solutions' : 'CloudVantage';
        if (page === 'aria') title = 'Aria AI Assistant';
        if (page === 'workspace') title = 'Diligence Workspace';
        if (page === 'modeling') title = 'Capability Modeling';
        
        titleElement.textContent = title;
    },

    updateCompanySelector() {
        const selector = document.getElementById('company-selector');
        if (!selector) return;
        selector.value = loadState().selectedCompanyId;
        
        // This event listener should only be added once.
        // A better approach is to add it in each page's JS file.
        selector.onchange = (e) => {
            let state = loadState();
            state.selectedCompanyId = e.target.value;
            saveState(state);
            
            if (e.target.value === 'all') {
                window.location.href = 'index.html';
            } else {
                window.location.href = `portco.html?company=${e.target.value}`;
            }
        };
    },

    updateActiveNavigation() {
        const currentPage = this.getCurrentPage().replace('index', 'home');
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    },
    
    updateAll() {
        this.updateHeaderTitle();
        this.updateCompanySelector();
        this.updateActiveNavigation();
    }
};

// =================================================================
// UTILITIES (Functions from original file)
// =================================================================
const Utils = {
    typewriter(element, text, callback) {
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
    },

    generateScenario(capabilityId, state, capabilities, capabilityScenarios) {
        const capability = capabilities.find(c => c.id === capabilityId);
        const { current, target } = state.modeling.assessmentData[capabilityId];
        if (target <= current) return { id: capabilityId, name: capability.name, from: current, to: target, actions: [], insight: "Target state is not higher than current state." };
        
        let combinedActions = [], combinedInsights = [];
        for (let level = current; level < target; level++) {
            const step = capabilityScenarios[capabilityId]?.[level]?.[level + 1];
            if (step) { 
                combinedActions.push(...step.actions); 
                combinedInsights.push(step.insight); 
            }
        }
        return { id: capabilityId, name: capability.name, from: current, to: target, actions: combinedActions, insight: combinedInsights.join(' ') };
    },

    async generatePDF(elementId) {
        const { jsPDF } = window.jspdf;
        const reportElement = document.getElementById(elementId);
        if (!reportElement) { 
            console.error("PDF export element not found!"); 
            return; 
        }
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        
        const canvas = await html2canvas(reportElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save(`Diligence_Report_${new Date().toISOString().slice(0,10)}.pdf`);
    }
};