window.onload = function() {
    const items = document.querySelectorAll('.animate-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`; // Stagger animations by 0.2 seconds
    });
};
