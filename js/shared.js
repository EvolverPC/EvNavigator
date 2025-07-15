// js/shared.js - Shared utilities, state, component loading, and navigation

// =================================================================
// THEME MANAGEMENT (FINAL)
// =================================================================
function updateLogoForTheme(theme) {
    const logo = document.getElementById('sidebar-logo');
    if (logo) {
        if (theme === 'dark') {
            logo.src = 'Navigator lock up_white_25.png';
        } else {
            logo.src = 'Navigator lock up_Veridian_25.png';
        }
    }
}

function updateToggleIcon(theme) {
    const handleIcon = document.querySelector('.toggle-handle-icon');
    if (handleIcon) {
        const iconSVG = theme === 'dark' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12"x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        handleIcon.innerHTML = iconSVG;
    }
}

function initializeTheme() {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    if (!themeToggleButton) return;

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.body.setAttribute('data-theme', savedTheme);
    updateLogoForTheme(savedTheme);
    updateToggleIcon(savedTheme);
    if (savedTheme === 'dark') {
        themeToggleButton.classList.add('active');
    }

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggleButton.classList.toggle('active');
        updateLogoForTheme(newTheme);
        updateToggleIcon(newTheme);
    });
}


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
    
    initializeTheme();
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
        const state = loadState(); 
        
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
        
        selector.onchange = (e) => {
            const newCompanyId = e.target.value;
            const currentPage = Navigation.getCurrentPage();

            let state = loadState();
            state.selectedCompanyId = newCompanyId;
            saveState(state);
            
            if (newCompanyId === 'all') {
                window.location.href = 'index.html';
            } 
            else if (currentPage === 'index') {
                window.location.href = `portco.html?company=${newCompanyId}`;
            }
            else {
                window.location.href = `${currentPage}.html?company=${newCompanyId}`;
            }
        };
    },

    updateActiveNavigation() {
        const currentPage = this.getCurrentPage().replace('index', 'home');
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('data-page');
            if (linkPage === currentPage || (currentPage === 'home' && (linkPage === 'index'))) {
                 link.classList.add('active');
            }
        });
    },
    
    updateNavigationLinks() {
        const { selectedCompanyId } = loadState();
        const navLinks = document.querySelectorAll('#sidebar-menu .nav-link');

        navLinks.forEach(link => {
            const page = link.dataset.page;
            if (page === 'index' || page === 'home') {
                link.href = 'index.html';
                return; 
            }
            if (selectedCompanyId && selectedCompanyId !== 'all') {
                link.href = `${page}.html?company=${selectedCompanyId}`;
            } else {
                link.href = `${page}.html`;
            }
        });
    },

    updateAll() {
        this.updateHeaderTitle();
        this.updateCompanySelector();
        this.updateActiveNavigation();
        this.updateNavigationLinks();
    }
};

// =================================================================
// UTILITIES
// =================================================================
const Utils = {
    typeWords(element, text, callback) {
        let i = 0;
        const words = text.split(' ');
        element.innerHTML = "";
        const timer = setInterval(() => {
            if (i < words.length) {
                element.innerHTML += words[i] + ' ';
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, 25);
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