// js/shared.js - Shared utilities and state management

// Global state management
const NavigatorState = {
    // Get current selected company from localStorage or URL params
    getSelectedCompany() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCompany = urlParams.get('company');
        if (urlCompany) {
            localStorage.setItem('selectedCompany', urlCompany);
            return urlCompany;
        }
        return localStorage.getItem('selectedCompany') || 'all';
    },

    // Set selected company and update localStorage
    setSelectedCompany(companyId) {
        localStorage.setItem('selectedCompany', companyId);
        // Update URL without page reload
        const url = new URL(window.location);
        if (companyId === 'all') {
            url.searchParams.delete('company');
        } else {
            url.searchParams.set('company', companyId);
        }
        window.history.pushState({}, '', url);
    },

    // Get current page from URL
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page === 'index' ? 'home' : page;
    }
};

// Component loader utility
const ComponentLoader = {
    async loadComponent(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            return await response.text();
        } catch (error) {
            console.error('Error loading component:', error);
            return `<div class="text-red-500">Error loading component: ${path}</div>`;
        }
    },

    async loadHeader() {
        const headerHTML = await this.loadComponent('components/header.html');
        return headerHTML;
    },

    async loadSidebar() {
        const sidebarHTML = await this.loadComponent('components/sidebar.html');
        return sidebarHTML;
    }
};

// Navigation utilities
const Navigation = {
    // Update header title based on current page and company
    updateHeaderTitle() {
        const titleElement = document.getElementById('header-title');
        if (!titleElement) return;

        const currentPage = NavigatorState.getCurrentPage();
        const selectedCompany = NavigatorState.getSelectedCompany();
        
        let title = 'Dashboard';
        switch(currentPage) {
            case 'home': title = 'Portfolio Overview'; break;
            case 'portco': 
                title = selectedCompany === 'techflow-solutions' ? 'TechFlow Solutions' :
                        selectedCompany === 'cloudvantage' ? 'CloudVantage' : 'Portfolio Company';
                break;
            case 'aria': title = 'Aria AI Assistant'; break;
            case 'workspace': title = 'Due Diligence Workspace'; break;
            case 'modeling': title = 'Financial Modeling'; break;
        }
        
        titleElement.textContent = title;
    },

    // Update company selector
    updateCompanySelector() {
        const selector = document.getElementById('company-selector');
        if (!selector) return;

        const selectedCompany = NavigatorState.getSelectedCompany();
        selector.value = selectedCompany;

        // Add change event listener
        selector.addEventListener('change', (e) => {
            NavigatorState.setSelectedCompany(e.target.value);
            
            // Redirect to appropriate page based on selection
            if (e.target.value === 'all') {
                window.location.href = 'index.html';
            } else {
                window.location.href = `portco.html?company=${e.target.value}`;
            }
        });
    },

    // Highlight active navigation item
    updateActiveNavigation() {
        const currentPage = NavigatorState.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('data-page');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
};

// Common utility functions
const Utils = {
    // Typewriter effect for text animation
    typewriter(element, text, callback, speed = 10) {
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
        }, speed);
    },

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Format large numbers (e.g., 1000000 -> 1M)
    formatLargeNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Show loading state
    showLoading(element, message = 'Loading...') {
        element.innerHTML = `
            <div class="flex items-center justify-center py-8">
                <div class="loading-spinner mr-3"></div>
                <span class="text-gray-600">${message}</span>
            </div>
        `;
    }
};

// Tab management
const TabManager = {
    // Initialize tab functionality for a container
    initTabs(container) {
        const tabButtons = container.querySelectorAll('[data-tab-group] .tab-button');
        const tabContents = container.querySelectorAll('[data-tab-group] .tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabGroup = button.getAttribute('data-tab-group');
                const tabName = button.getAttribute('data-tab-name');

                // Remove active class from all buttons and contents in this group
                container.querySelectorAll(`[data-tab-group="${tabGroup}"].tab-button`).forEach(btn => {
                    btn.classList.remove('active');
                });
                container.querySelectorAll(`[data-tab-group="${tabGroup}"].tab-content`).forEach(content => {
                    content.classList.remove('active');
                });

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = container.querySelector(`[data-tab-group="${tabGroup}"][data-tab-name="${tabName}"].tab-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
};

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation state
    Navigation.updateHeaderTitle();
    Navigation.updateCompanySelector();
    Navigation.updateActiveNavigation();

    // Initialize tabs on the page
    TabManager.initTabs(document);
});