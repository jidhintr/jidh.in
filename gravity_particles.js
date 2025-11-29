/**
 * AntiGravity Particle Animation
 * Creates a canvas overlay with particles that react to gravity and mouse interaction.
 */

const canvas = document.getElementById('gravity-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 150;
const connectionDistance = 100;
const mouseDistance = 150;

// Mouse position
let mouse = {
    x: null,
    y: null
};

// Resize canvas
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        this.color = this.getRandomColor();
        this.gravity = 0.05;
        this.friction = 0.99;
    }

    getRandomColor() {
        const colors = [
            'rgba(0, 137, 123, 0.8)',   // Teal
            'rgba(142, 36, 170, 0.8)',  // Purple
            'rgba(233, 30, 99, 0.8)',   // Pink
            'rgba(50, 50, 50, 0.6)'     // Dark Grey (instead of White)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Apply gravity (AntiGravity effect: sometimes float up)
        // For "AntiGravity", let's make them float slightly upwards or have low gravity
        // Actually, let's make them float freely but react to mouse "gravity"

        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (Gravity/Attraction)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseDistance - distance) / mouseDistance;
                const directionX = forceDirectionX * force * 0.5; // Attraction strength
                const directionY = forceDirectionY * force * 0.5;

                this.vx += directionX;
                this.vy += directionY;
            }
        }

        // Friction to keep them from speeding up infinitely
        this.vx *= this.friction;
        this.vy *= this.friction;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize particles
function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 100, 100, ${0.5 * (1 - distance / connectionDistance)})`; // Darker lines
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();
