let productImagesSlider;

const setProductImagesSlider = () => {
    productImagesSlider?.destroy()
    if (window.matchMedia('(min-width: 769px)').matches) {
        productImagesSlider = new Swiper('.product-images-slider .swiper', {
            slidesPerView: 1,
            autoplay: true,
            pagination: {
                el: '.product-images-slider__pagination.swiper-pagination',
                clickable: true,
            }
        })
    } else {
        productImagesSlider = new Swiper('.product-images-slider .swiper', {
            direction: "vertical",
            slidesPerView: 1,
            autoplay: true,
            pagination: {
                el: '.product-images-slider__pagination.swiper-pagination',
                clickable: true,
            }
        })
    }
}

window.addEventListener('resize', setProductImagesSlider)
setProductImagesSlider()