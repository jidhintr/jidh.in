
// ===================================
// Skills Data
// ===================================
const skillsData = {
    "Languages & Frameworks": {
        "icon": "💻",
        "color": "#ab3209ff",
        "items": [
            { "name": "C#", "icon": "🔷" },
            { "name": "F#", "icon": "🔶" },
            { "name": "Java", "icon": "☕" },
            { "name": ".NET Core", "icon": "⚡" },
            { "name": "ASP.NET", "icon": "🌐" },
            { "name": "JavaScript", "icon": "🟨" },
            { "name": "Blazor", "icon": "🔥" },
            { "name": "Xamarin", "icon": "📱" }
        ]
    },
    "Development Practices": {
        "icon": "🏗️",
        "color": "#6ddc0dff",
        "items": [
            { "name": "SOLID", "icon": "💎" },
            { "name": "Event-Driven", "icon": "📡" },
            { "name": "TDD", "icon": "🧪" },
            { "name": "BDD", "icon": "🎭" },
            { "name": "OOP", "icon": "🧱" },
            { "name": "Functional Programming", "icon": "λ" },
            { "name": "Peer Code Reviews", "icon": "👥" }
        ]
    },
    "Testing": {
        "icon": "✅",
        "color": "#0f1894ff",
        "Methodologies": [
            { "name": "Unit Test", "icon": "🧪" },
            { "name": "Integration Test", "icon": "🔗" },
            { "name": "Regression Test", "icon": "🔄" },
            { "name": "Mock Test", "icon": "🎭" },
            { "name": "Soak & Performance Test", "icon": "⚡" }
        ],
        "Frameworks & Tools": [
            { "name": "nUnit", "icon": "🔧" },
            { "name": "xUnit", "icon": "✖️" },
            { "name": "Moq", "icon": "🎭" },
            { "name": "K6", "icon": "📊" },
            { "name": "JMeter", "icon": "⚙️" }
        ]
    },
    "Databases & Storage": {
        "icon": "🗄️",
        "color": "#87106aff",
        "Relational DB": [
            { "name": "Oracle", "icon": "🔴" },
            { "name": "SQL Server", "icon": "🔵" },
            { "name": "PostgreSQL", "icon": "🐘" },
            { "name": "MySQL", "icon": "🐬" },
            { "name": "SQLite", "icon": "🗃️" },
            { "name": "Entity Framework (EF)", "icon": "⚙️" },
            { "name": "Migration", "icon": "🔄" }
        ],
        "Non-Relational DB": [
            { "name": "Redis", "icon": "🔴" },
            { "name": "MongoDB", "icon": "🍃" },
            { "name": "Cassandra", "icon": "💫" }
        ]
    },
    "Project Management": {
        "icon": "📋",
        "color": "#dd0707ff",
        "items": [
            { "name": "Agile", "icon": "🔄" },
            { "name": "Scrum", "icon": "🔄" },
            { "name": "Kanban", "icon": "📊" },
            { "name": "Documentation", "icon": "📝" },
            { "name": "JIRA & Confluence", "icon": "📝" },
            { "name": "Release Sign-Off", "icon": "✅" }
        ]
    },
    "Architecture Styles": {
        "icon": "🏗️",
        "color": "#4c1d62ff",
        "items": [
            { "name": "Microservices", "icon": "🔗" },
            { "name": "Distributed System", "icon": "🌐" },
            { "name": "RESTful APIs", "icon": "🔌" },
            { "name": "SOAP", "icon": "🧼" },
            { "name": "MVVM", "icon": "📐" },
            { "name": "WPF", "icon": "🖼️" },
            { "name": "WCF", "icon": "🔧" },
            { "name": "MVC", "icon": "🎯" },
            { "name": "CQRS", "icon": "📋" },
            { "name": "Saga Pattern", "icon": "📖" }
        ]
    },
    "Messaging & Containerization": {
        "icon": "📦",
        "color": "#1b3b35ff",
        "items": [
            { "name": "RabbitMQ", "icon": "🐰" },
            { "name": "Kafka", "icon": "📨" },
            { "name": "Docker", "icon": "🐳" },
            { "name": "Podman", "icon": "🦭" }
        ]
    },
    "Cloud, DevOps & Infrastructure": {
        "icon": "☁️",
        "color": "#ceea5fff",
        "items": [
            { "name": "Azure Functions", "icon": "🔷" },
            { "name": "Serverless IaaS, PaaS", "icon": "🔷" },
            { "name": "IaaS, PaaS", "icon": "🔷" },
            { "name": "PaaS", "icon": "🔷" },
            { "name": "Kubernetes (in house)", "icon": "⎈" }
        ]
    },
    "DevOps & Version Control": {
        "icon": "🔄",
        "color": "#7a160bff",
        "items": [
            { "name": "Git", "icon": "📦" },
            { "name": "CI/CD Pipelines", "icon": "🔁" },
            { "name": "Azure DevOps", "icon": "🔷" },
            { "name": "Jenkins", "icon": "🔧" },
            { "name": "GitHub Actions", "icon": "🐙" },
            { "name": "GitLab", "icon": "🦊" },
            { "name": "Bitbucket", "icon": "🪣" },
            { "name": "TeamCity", "icon": "🏙️" },
            { "name": "Starfish", "icon": "⭐" }
        ]
    },
    "Observability & Scripting": {
        "icon": "📊",
        "color": "#4b2871e4",
        "items": [
            { "name": "Grafana", "icon": "📈" },
            { "name": "Prometheus", "icon": "🔥" },
            { "name": "ELK Stack", "icon": "🦌" },
            { "name": "Telemetry", "icon": "📡" },
            { "name": "DB Profiler", "icon": "🔍" },
            { "name": "Splunk", "icon": "💧" },
            { "name": "PowerShell", "icon": "💻" }
        ]
    },
    "Code Quality & Security": {
        "icon": "🔒",
        "color": "#5d404aff",
        "items": [
            { "name": "Sonar", "icon": "🔍" },
            { "name": "NDepend", "icon": "📊" },
            { "name": "Static code analyser", "icon": "🔬" },
            { "name": "OWIN", "icon": "🌐" },
            { "name": "OpenID Authentications", "icon": "🔐" },
            { "name": "API Gateway", "icon": "🚪" },
            { "name": "OWASP", "icon": "🛡️" }
        ]
    },
    "Learn & Try - Rarely": {
        "icon": "🔬",
        "color": "#234d49ff",
        "items": [
            { "name": "Go", "icon": "🐹" },
            { "name": "C++", "icon": "➕" },
            { "name": "Python", "icon": "🐍" },
            { "name": "Redis", "icon": "🔴" },
            { "name": "Nginx", "icon": "🟢" }
        ]
    }
};

// ===================================
// Render Skills
// ===================================
function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = ''; // Clear existing content

    for (const [categoryName, categoryData] of Object.entries(skillsData)) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';

        // Apply custom color to the category border/accent
        categoryElement.style.setProperty('--category-color', categoryData.color);
        categoryElement.style.borderTop = `3px solid ${categoryData.color}`;

        const header = document.createElement('div');
        header.className = 'skill-category-header';
        header.innerHTML = `
            <span class="skill-icon-large">${categoryData.icon}</span>
            <h3>${categoryName}</h3>
        `;
        categoryElement.appendChild(header);

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'skill-tags';

        // Helper function to render items
        const renderItems = (items) => {
            items.forEach(item => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.innerHTML = `<span class="skill-item-icon">${item.icon}</span> ${item.name}`;
                tag.style.borderColor = `${categoryData.color}40`; // 25% opacity

                // Hover effect logic
                tag.addEventListener('mouseenter', () => {
                    tag.style.backgroundColor = `${categoryData.color}20`; // 12% opacity
                    tag.style.borderColor = categoryData.color;
                    tag.style.transform = 'translateY(-2px)';
                });

                tag.addEventListener('mouseleave', () => {
                    tag.style.backgroundColor = 'transparent';
                    tag.style.borderColor = `${categoryData.color}40`;
                    tag.style.transform = 'translateY(0)';
                });

                tagsContainer.appendChild(tag);
            });
        };

        // Check if items is a direct array or nested categories
        if (categoryData.items) {
            renderItems(categoryData.items);
        } else {
            // Handle nested categories (e.g., Testing, Databases)
            for (const [subCategoryName, subCategoryItems] of Object.entries(categoryData)) {
                if (subCategoryName === 'icon' || subCategoryName === 'color') continue;

                // Add a sub-header if needed, or just separator
                if (tagsContainer.children.length > 0) {
                    const separator = document.createElement('div');
                    separator.className = 'skill-separator';
                    separator.textContent = subCategoryName;
                    separator.style.color = categoryData.color;
                    tagsContainer.appendChild(separator);
                } else {
                    // First group, maybe add a label too if it's a mixed bag? 
                    // For now, let's just add the label for clarity
                    const separator = document.createElement('div');
                    separator.className = 'skill-separator';
                    separator.textContent = subCategoryName;
                    separator.style.color = categoryData.color;
                    tagsContainer.appendChild(separator);
                }

                renderItems(subCategoryItems);
            }
        }

        categoryElement.appendChild(tagsContainer);
        skillsContainer.appendChild(categoryElement);

        // Observe for animation
        if (typeof animateOnScroll !== 'undefined') {
            animateOnScroll.observe(categoryElement);
        }
    }
}

// Call renderSkills on load
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
});
