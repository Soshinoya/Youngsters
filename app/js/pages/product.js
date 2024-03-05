new Swiper('.product-images-slider .swiper', {
    slidesPerView: 1,
    autoplay: true,
    pagination: {
        el: '.product-images-slider__pagination.swiper-pagination',
        clickable: true,
    }
})

const setGoodsSlider = () => {
    if (window.matchMedia('(min-width: 1025px)').matches) {
        new Swiper('.goods-slider .swiper', {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 6,
            navigation: { nextEl: '.goods-slider .swiper-button-next', prevEl: '.goods-slider .swiper-button-prev' },
            pagination: { el: '.goods-slider-pagination--md.swiper-pagination', type: 'fraction' }
        })
    } else if (window.matchMedia('(min-width: 769px)').matches) {
        new Swiper('.goods-slider .swiper', {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 6,
            navigation: { nextEl: '.goods-slider .swiper-button-next', prevEl: '.goods-slider .swiper-button-prev' },
            pagination: { el: '.goods-slider-pagination--md.swiper-pagination', type: 'fraction' }
        })
    } else if (window.matchMedia('(min-width: 415px)').matches) {
        new Swiper('.goods-slider .swiper', {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 6,
            navigation: { nextEl: '.goods-slider .swiper-button-next', prevEl: '.goods-slider .swiper-button-prev' },
            pagination: { el: '.goods-slider-pagination--md.swiper-pagination', type: 'fraction' }
        })
    } else {
        new Swiper('.goods-slider .swiper', {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 6,
            pagination: { el: '.goods-slider-pagination--sm.swiper-pagination', clickable: true }
        })
    }
}

window.addEventListener('resize', setGoodsSlider)

setGoodsSlider()