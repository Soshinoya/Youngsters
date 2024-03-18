const setAddressSlider = () => {
    if (window.matchMedia('(min-width: 415px)').matches) {
        new Swiper('.personal-details-address-slider .swiper', {
            slidesPerView: 'auto',
            spaceBetween: 60,
            navigation: { nextEl: '.personal-details-address-slider__nav .swiper-button-next', prevEl: '.personal-details-address-slider__nav .swiper-button-prev' },
            pagination: { el: '.personal-details-address-slider-pagination--md.swiper-pagination', type: 'fraction' }
        })
    } else if (window.matchMedia('(min-width: 321px)').matches) {
        new Swiper('.personal-details-address-slider .swiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            pagination: { el: '.personal-details-address-slider-pagination--sm.swiper-pagination', clickable: true }
        })
    } else {
        new Swiper('.personal-details-address-slider .swiper', {
            slidesPerView: 1,
            pagination: { el: '.personal-details-address-slider-pagination--sm.swiper-pagination', clickable: true }
        })
    }
}

window.addEventListener('resize', setAddressSlider)

setAddressSlider()