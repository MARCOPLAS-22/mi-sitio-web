document.getElementById('showMessage').addEventListener('click', function() {
    document.getElementById('hiddenMessage').classList.toggle('show');
});

document.getElementById('showExtraMessages').addEventListener('click', function() {
    document.getElementById('extraMessages').classList.toggle('show');
});

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); // Cambiar imagen cada 2 segundos
}

function createFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle(x, y) {
        const count = Math.floor(random(20, 100));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                vx: random(-3, 3),
                vy: random(-3, 3),
                life: random(20, 60),
                color: `hsl(${random(0, 360)}, 100%, 50%)`
            });
        }
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });
        if (particles.length === 0) {
            createParticle(random(0, canvas.width), random(0, canvas.height));
        }
        requestAnimationFrame(drawFireworks);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawFireworks();
}

createFireworks();

