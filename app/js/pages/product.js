new Swiper('.product-images-slider .swiper', {
    slidesPerView: 1,
    autoplay: true,
    pagination: {
        el: '.product-images-slider__pagination.swiper-pagination',
        clickable: true,
    }
})

new Swiper('.goods-slider .swiper', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 6,
    pagination: {
        el: '.goods-slider .swiper-pagination',
        type: 'fraction'
    },
    navigation: {
        nextEl: '.goods-slider .swiper-button-next',
        prevEl: '.goods-slider .swiper-button-prev'
    }
})