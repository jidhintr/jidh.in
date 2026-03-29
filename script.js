// ===================================
// Navigation Toggle
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// ===================================
// Scroll Progress Indicator
// ===================================
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = `${scrolled}%`;
    }
}



// ===================================
// Animated Counter for Hero Metrics
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation for metrics
            if (entry.target.classList.contains('metric')) {
                const valueElement = entry.target.querySelector('.metric-value');
                const target = parseInt(valueElement.getAttribute('data-target'));
                animateCounter(valueElement, target);
            }
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    animateOnScroll.observe(item);
});



// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe philosophy cards
document.querySelectorAll('.philosophy-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe metrics (for counter animation)
document.querySelectorAll('.metric').forEach(metric => {
    animateOnScroll.observe(metric);
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}



// ===================================
// Parallax Effect for Hero Background
// ===================================
function parallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    const scrolled = window.scrollY;

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// ===================================
// LinkedIn Feed Scroll Buttons
// ===================================
function initScrollButtons() {
    const wrappers = document.querySelectorAll('.feed-wrapper');

    wrappers.forEach(wrapper => {
        const scrollContainer = wrapper.querySelector('.linkedin-scroll-container');
        const scrollLeftBtn = wrapper.querySelector('.scroll-btn.scroll-left');
        const scrollRightBtn = wrapper.querySelector('.scroll-btn.scroll-right');

        if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: -550,
                    behavior: 'smooth'
                });
            });

            scrollRightBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: 550,
                    behavior: 'smooth'
                });
            });
            console.log('Scroll buttons initialized for wrapper');
        } else {
            console.warn('Scroll elements missing in wrapper');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initScrollButtons);

// ===================================
// Add Hover Effect to Skill Tags
// ===================================
document.querySelectorAll('.skill-tag, .tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Update scroll progress on load
    updateScrollProgress();

    // Update active nav link on load
    updateActiveNavLink();
});

// ===================================
// Performance Optimization
// ===================================
let ticking = false;

function requestTick(callback) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

// Optimize scroll events
window.addEventListener('scroll', () => {
    requestTick(() => {
        updateScrollProgress();
        updateActiveNavLink();
        parallaxEffect();
    });
});

// ===================================
// Add Loading State
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Skills Data & Rendering
// ===================================

// ===================================
// Dynamic SEO Date Update
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    try {
        const script = document.querySelector('script[type="application/ld+json"]');
        if (script) {
            const data = JSON.parse(script.textContent);
            if (data['@graph']) {
                const webPage = data['@graph'].find(item => item['@type'] === 'ProfilePage');
                if (webPage) {
                    webPage.dateModified = new Date().toISOString();
                    script.textContent = JSON.stringify(data, null, 2);
                    console.log('SEO: dateModified updated to ' + webPage.dateModified);
                }
            }
        }
    } catch (e) {
        console.error('Error updating SEO date:', e);
    }
});

// ===================================
// Skills Data
// ===================================
const skillsData = {
    "Languages & Frameworks": {
        "icon": "https://img.icons8.com/?size=100&id=9osswxZzfXd7&format=png&color=000000",
        "color": "#ab3209ff",
        "items": [
            { "name": "C#", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
            { "name": "F#", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fsharp/fsharp-original.svg" },
            { "name": "Java", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
            { "name": ".NET Core", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" },
            { "name": "ASP.NET", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" },
            { "name": "JavaScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
            { "name": "Blazor", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blazor/blazor-original.svg" },
            { "name": "Xamarin", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xamarin/xamarin-original.svg" },
            { "name": "Go", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
            { "name": "C++", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
            { "name": "Python", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
            { "name": "Angular", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
            { "name": "Spring Boot", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" }
        ]
    },
    "Databases & Storage": {
        "icon": "https://img.icons8.com/fluency/48/database.png",
        "color": "#87106aff",
        "items": [
            { "name": "Oracle", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
            { "name": "SQL Server", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
            { "name": "PostgreSQL", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
            { "name": "MySQL", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
            { "name": "SQLite", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" },
            { "name": "Entity Framework (EF)", "icon": "https://img.icons8.com/color/48/settings.png" },
            { "name": "Migration", "icon": "https://img.icons8.com/color/48/replace.png" },
            { "name": "Redis", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
            { "name": "MongoDB", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
            { "name": "Cassandra", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg" }
        ]
    },
    "Testing": {
        "icon": "https://img.icons8.com/fluency/48/checkmark.png",
        "color": "#0f1894ff",
        "items": [
            { "name": "Unit Test", "icon": "https://img.icons8.com/color/48/test-tube.png" },
            { "name": "Mock Test", "icon": "https://img.icons8.com/color/48/comedy.png" },
            { "name": "Integration Test", "icon": "https://img.icons8.com/color/48/link.png" },
            { "name": "Regression Test", "icon": "https://img.icons8.com/color/48/repeat.png" },
            { "name": "Soak & Performance Test", "icon": "https://img.icons8.com/color/48/lightning-bolt.png" },
            { "name": "nUnit", "icon": "https://img.icons8.com/color/48/wrench.png" },
            { "name": "xUnit", "icon": "https://img.icons8.com/color/48/multiply.png" },
            { "name": "Moq", "icon": "https://img.icons8.com/color/48/comedy.png" },
            { "name": "K6", "icon": "https://img.icons8.com/color/48/graph.png" },
            { "name": "JMeter", "icon": "https://img.icons8.com/color/48/settings.png" }

        ]
    },

    "Cloud, DevOps & Infrastructure": {
        "icon": "https://img.icons8.com/fluency/48/cloud.png",
        "color": "#ceea5fff",
        "items": [
            { "name": "Azure Functions", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
            { "name": "Serverless", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
            { "name": "IaaS", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
            { "name": "PaaS", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
            { "name": "Kubernetes (in house)", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" }
        ]
    },
    "DevOps & Version Control": {
        "icon": "https://img.icons8.com/fluency/48/git.png",
        "color": "#7a160bff",
        "items": [
            { "name": "Git", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
            { "name": "CI/CD Pipelines", "icon": "https://img.icons8.com/color/48/repeat.png" },
            { "name": "Azure DevOps", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg" },
            { "name": "Jenkins", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
            { "name": "GitHub Actions", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" },
            { "name": "GitLab", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
            { "name": "Bitbucket", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg" },
            { "name": "TeamCity", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jetbrains/jetbrains-original.svg" },
            { "name": "Starfish", "icon": "https://img.icons8.com/color/48/star.png" }
        ]
    },
    "Project Management": {
        "icon": "https://img.icons8.com/fluency/48/task.png",
        "color": "#dd0707ff",
        "items": [
            { "name": "Agile", "icon": "https://img.icons8.com/color/48/recycle-sign.png" },
            { "name": "Scrum", "icon": "https://img.icons8.com/color/48/recycle-sign.png" },
            { "name": "Kanban", "icon": "https://img.icons8.com/color/48/kanban-chart.png" },
            { "name": "Documentation", "icon": "https://img.icons8.com/color/48/document.png" },
            { "name": "JIRA & Confluence", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
            { "name": "Release Sign-Off", "icon": "https://img.icons8.com/color/48/checked.png" }
        ]
    },
    "Development Practices": {
        "icon": "https://img.icons8.com/fluency/48/source-code.png",
        "color": "#6ddc0dff",
        "items": [
            { "name": "SOLID", "icon": "https://img.icons8.com/color/48/diamond.png" },
            { "name": "TDD", "icon": "https://img.icons8.com/color/48/test-tube.png" },
            { "name": "BDD", "icon": "https://img.icons8.com/color/48/comedy.png" },
            { "name": "OOP", "icon": "https://img.icons8.com/color/48/module.png" },
            { "name": "Functional Programming", "icon": "https://img.icons8.com/color/48/lambda.png" },
            { "name": "Peer Code Reviews", "icon": "https://img.icons8.com/color/48/conference-call.png" },
            { "name": "Serverless Architecture", "icon": "https://img.icons8.com/color/48/cloud-computing.png" },
            { "name": "Monolithic Architecture", "icon": "https://img.icons8.com/color/48/sugar-cubes.png" },
            { "name": "Layered Architecture", "icon": "https://img.icons8.com/color/48/layers.png" }
        ]
    },
    "Architecture Styles": {
        "icon": "https://img.icons8.com/fluency/48/structure.png",
        "color": "#4c1d62ff",
        "items": [
            { "name": "Microservices", "icon": "https://img.icons8.com/color/48/link.png" },
            { "name": "Distributed System", "icon": "https://img.icons8.com/color/48/internet.png" },
            { "name": "Event-Driven", "icon": "https://img.icons8.com/color/48/satellite-sending-signal.png" },
            { "name": "RESTful APIs", "icon": "https://img.icons8.com/color/48/electrical.png" },
            { "name": "SOAP", "icon": "https://img.icons8.com/color/48/soap.png" },
            { "name": "MVVM", "icon": "https://img.icons8.com/color/48/ruler.png" },
            { "name": "WPF", "icon": "https://img.icons8.com/color/48/picture.png" },
            { "name": "WCF", "icon": "https://img.icons8.com/color/48/wrench.png" },
            { "name": "MVC", "icon": "https://img.icons8.com/color/48/target.png" },
            { "name": "CQRS", "icon": "https://img.icons8.com/color/48/list.png" },
            { "name": "Saga Pattern", "icon": "https://img.icons8.com/color/48/open-book.png" }
        ]
    },
    "Tools & Security": {
        "icon": "https://img.icons8.com/fluency/48/security-checked.png",
        "color": "#5d404aff",
        "items": [
            { "name": "Sonar", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg" },
            { "name": "NDepend", "icon": "https://img.icons8.com/color/48/graph.png" },
            { "name": "OWIN", "icon": "https://img.icons8.com/color/48/internet.png" },
            { "name": "Nginx", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
            { "name": "Static code analyser", "icon": "https://img.icons8.com/color/48/microscope.png" },
            { "name": "OpenID Authentications", "icon": "https://img.icons8.com/color/48/lock.png" },
            { "name": "API Gateway", "icon": "https://img.icons8.com/color/48/door.png" },
            { "name": "OWASP", "icon": "https://img.icons8.com/color/48/shield.png" },
            { "name": "OAuth2", "icon": "https://img.icons8.com/color/48/key.png" },
            { "name": "SAML", "icon": "https://img.icons8.com/color/48/access.png" },
            { "name": "SOAP", "icon": "https://img.icons8.com/color/48/soap.png" },
            { "name": "JWT", "icon": "https://img.icons8.com/color/48/json.png" },
            { "name": "TLS/SSL", "icon": "https://img.icons8.com/color/48/ssl.png" }
        ]
    },
    "Messaging & Containerization": {
        "icon": "https://img.icons8.com/fluency/48/box.png",
        "color": "#1b3b35ff",
        "items": [
            { "name": "RabbitMQ", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" },
            { "name": "Kafka", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
            { "name": "Docker", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
            { "name": "Podman", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/podman/podman-original.svg" }
        ]
    },
    "Observability & Scripting": {
        "icon": "https://img.icons8.com/fluency/48/graph.png",
        "color": "#4b2871e4",
        "items": [
            { "name": "Grafana", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
            { "name": "Prometheus", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
            { "name": "ELK Stack", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" },
            { "name": "Telemetry", "icon": "https://img.icons8.com/color/48/satellite-sending-signal.png" },
            { "name": "DB Profiler", "icon": "https://img.icons8.com/color/48/search.png" },
            { "name": "Splunk", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/splunk/splunk-original.svg" },
            { "name": "PowerShell", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg" },
            { "name": "Bash", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
            { "name": "Python", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
            { "name": "Ansible", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" }
        ]
    }
};

// ===================================
// Icon Error Handler
// ===================================
function handleSkillIconError(img, name) {
    img.onerror = null; // Prevent infinite loop
    // Generate a meaningful avatar based on the name (initials) with a random background
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
}

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

        // Handle category icon (image or emoji)
        let iconHtml;
        if (categoryData.icon.startsWith('http') || categoryData.icon.includes('/')) {
            iconHtml = `<img src="${categoryData.icon}" alt="${categoryName}" class="skill-icon-img-large" onerror="handleSkillIconError(this, '${categoryName}')">`;
        } else {
            iconHtml = `<span class="skill-icon-large">${categoryData.icon}</span>`;
        }

        header.innerHTML = `
            ${iconHtml}
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

                // Handle item icon (image or emoji)
                let itemIconHtml;
                if (item.icon.startsWith('http') || item.icon.includes('/')) {
                    itemIconHtml = `<img src="${item.icon}" alt="${item.name}" class="skill-icon-img" onerror="handleSkillIconError(this, '${item.name}')">`;
                } else {
                    itemIconHtml = `<span class="skill-item-icon">${item.icon}</span>`;
                }

                tag.innerHTML = `${itemIconHtml} ${item.name}`;
                tag.style.borderColor = `${categoryData.color}40`; // 25% opacity

                // Hover effect logic
                tag.addEventListener('mouseenter', () => {
                    tag.style.backgroundColor = `${categoryData.color}20`; // 12% opacity
                    tag.style.borderColor = categoryData.color;
                    tag.style.transform = 'translateY(-2px) scale(1.05)';
                });

                tag.addEventListener('mouseleave', () => {
                    tag.style.backgroundColor = 'transparent';
                    tag.style.borderColor = `${categoryData.color}40`;
                    tag.style.transform = 'translateY(0) scale(1)';
                });

                tagsContainer.appendChild(tag);
            });
        };

        // Render items
        if (categoryData.items) {
            renderItems(categoryData.items);
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
