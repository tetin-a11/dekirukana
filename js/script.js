document.addEventListener('DOMContentLoaded', () => {
    // ヘッダーのスクロール追従
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // if not top section, minus header height
                if(targetId !== '#header'){
                    targetPosition -= headerHeight;
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observerを利用したスクロールアニメーション (フェードイン)
    const fadeElements = document.querySelectorAll('.card, .section-title');
    
    // 初期状態として少し下にずらして透明にする
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 要素が画面に入ったら直接スタイル変更
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '-50px', // 少し画面内に入ってから発火
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
