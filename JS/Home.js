window.addEventListener('scroll', function() {
    var productContainer = document.querySelector('.productContainer');
    if (!productContainer) {
        console.warn('productContainer not found in the DOM');
        return;
    }
    var sectionPosition = productContainer.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        productContainer.classList.add('visible');
    } else {
        productContainer.classList.remove('visible');
    }
});

