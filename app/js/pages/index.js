// 'Hero' Slider
const heroSliderConfig = new Swiper('.hero-slider .swiper', {
    slidesPerView: 1,
    autoplay: true,
    pagination: {
        el: '.hero-slider__pagination.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
})