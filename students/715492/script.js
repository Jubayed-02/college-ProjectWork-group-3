(function () {
      const fadeEls = document.querySelectorAll('.fade-up');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

      fadeEls.forEach(el => observer.observe(el));

      // reveal already-visible items on load
      window.addEventListener('load', () => {
        fadeEls.forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight - 60) {
            el.classList.add('appear');
            observer.unobserve(el);
          }
        });
      });

      // smooth nav
      document.querySelectorAll('.navbar a').forEach(a => {
        a.addEventListener('click', function (e) {
          const id = this.getAttribute('href');
          if (id && id.startsWith('#') && id !== '#') {
            e.preventDefault();
            const el = document.querySelector(id);
            if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, null, id); }
          }
        });
      });

      // sparkle trail on mouse
      document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.85) {
          const spark = document.createElement('span');
          spark.textContent = ['✿','✦','❀','🌸','⭐', '🩶'][Math.floor(Math.random()*6)];
          spark.style.cssText = `
            position:fixed; left:${e.clientX}px; top:${e.clientY}px;
            pointer-events:none; font-size:${10+Math.random()*10}px;
            opacity:0.9; z-index:9999;
            transform:translate(-50%,-50%);
            animation: sparkFade 0.8s ease forwards;
          `;
          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 800);
        }
      });

      const style = document.createElement('style');
      style.textContent = `
        @keyframes sparkFade {
          0%   { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0;   transform: translate(-50%,-120%) scale(0.3); }
        }
      `;
      document.head.appendChild(style);
    })();