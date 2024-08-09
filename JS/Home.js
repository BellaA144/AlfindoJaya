function scrollToAboutMe() {
    document.getElementById('aboutMe').scrollIntoView({ behavior: 'smooth' });
}
window.addEventListener('scroll', function() {
    var productContainer = document.querySelector('.productContainer');
    var sectionPosition = productContainer.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        productContainer.classList.add('visible');
    } else {
        productContainer.classList.remove('visible');
    }
});
