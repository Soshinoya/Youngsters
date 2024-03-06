const transitionDuration = 400;

const setPaddingFromContainerToElem = (elem, property) => {
    if (!elem) return
    const container = document.querySelector('.container')
    elem.style[property] = `${container.getBoundingClientRect().left + 20}px`
}

const toggleBackgroundBlur = action => {
    const currentBlur = document.querySelector('.background-blur')

    if (currentBlur) {
        currentBlur.classList[action]('background-blur--active')
    } else if (action !== 'remove') {
        const newBlur = document.createElement('div')
        newBlur.classList.add('background-blur', 'background-blur--active')
        document.body.insertAdjacentElement('afterbegin', newBlur)
    }
}

const closeDropdown = dropdownValue => {
    const dropdownTarget = document.querySelector(`[data-dropdown-target="${dropdownValue}"]`)
    const dropdownList = document.querySelector(`[data-dropdown-list="${dropdownValue}"]`)

    dropdownTarget?.classList.remove('menu-item-dropdown--active')
    dropdownList?.classList.remove(dropdownValue === 'header-sidebar' ? 'header-sidebar--visible' : 'menu-dropdown-list--visible')

    toggleBackgroundBlur('remove')

    // If an internal page is open - close it too
    if (document.querySelector('.header-sidebar-top__inner-page')) toggleHeaderSidebarInnerPage('close')
}

window.addEventListener('resize', () => {
    !window.matchMedia('(max-width: 320px)').matches && setPaddingFromContainerToElem(document.querySelector('aside.header-sidebar'), 'paddingLeft')
    setPaddingFromContainerToElem(document.querySelector('.hero-slider__pagination'), 'right')
})

!window.matchMedia('(max-width: 320px)').matches && setPaddingFromContainerToElem(document.querySelector('aside.header-sidebar'), 'paddingLeft')

setPaddingFromContainerToElem(document.querySelector('.hero-slider__pagination'), 'right')

const toggleHeaderSidebarInnerPage = action => {
    const headerSidebarTop = document.querySelector('.header-sidebar-top')
    const headerSidebarMainPage = document.querySelector('.header-sidebar-main-page')
    const headerSidebarInnerPage = document.querySelector('.header-sidebar-inner-page')

    headerSidebarTop.classList.toggle('header-sidebar-top__inner-page')
    if (action === 'close') {
        headerSidebarInnerPage.classList.remove('header-sidebar-inner-page--visible')
        setTimeout(() => {
            headerSidebarMainPage.classList.remove('d-none')
            headerSidebarMainPage.classList.remove('header-sidebar-main-page--hidden')
        }, transitionDuration)
    } else {
        headerSidebarMainPage.classList.add('header-sidebar-main-page--hidden')
        setTimeout(() => {
            headerSidebarMainPage.classList.add('d-none')
            headerSidebarInnerPage.classList.add('header-sidebar-inner-page--visible')
        }, transitionDuration)

    }
}

const toggleSidebar = (action, value) => {
    if (!document.querySelector('.sidebar--visible')) {
        toggleBackgroundBlur(action)
    }
    const sidebar = document.querySelector(`[data-sidebar-page="${value}"]`)
    sidebar.classList[action]('sidebar--visible')
}

const toggleProductImagesSliderZoom = action => {
    const productImagesSlider = document.querySelector('.product-images-slider')
    productImagesSlider.classList[action]('product-images-slider--fullscreen')
    document.body.classList[action]('no-scroll')
}

document.addEventListener('click', e => {
    // Toggle dropdowns
    const dropdownElem = e.target.closest('[data-dropdown-target]')
    if (dropdownElem) {
        const dropdownTargetValue = dropdownElem.getAttribute('data-dropdown-target')
        const dropdownTargetList = document.querySelector(`[data-dropdown-list="${dropdownTargetValue}"]`)

        if (window.matchMedia('(max-width: 480px)').matches) {
            if (dropdownTargetValue === 'header-sidebar-catalog') {
                toggleHeaderSidebarInnerPage('open')
                return
            }

        }

        dropdownTargetValue === 'catalog-filter' && toggleBackgroundBlur('add')

        dropdownElem.classList.toggle('menu-item-dropdown--active')
        dropdownTargetList?.classList.toggle(dropdownTargetValue === 'header-sidebar' ? 'header-sidebar--visible' : 'menu-dropdown-list--visible')
    }

    // Close header-sidebar if clicked outside
    if (!e.target.closest('[data-dropdown-target="header-sidebar"], .header-sidebar')) {
        const headerSidebarLinkDropdown = document.querySelector('[data-dropdown-target="header-sidebar"]')
        const headerSidebar = document.querySelector('.header-sidebar')
        headerSidebarLinkDropdown?.classList.remove('menu-item-dropdown--active')
        headerSidebar?.classList.remove('header-sidebar--visible')

        // If an internal page is open - close it too
        if (document.querySelector('.header-sidebar-top__inner-page')) toggleHeaderSidebarInnerPage('close')
    }

    if (!e.target.closest('[data-dropdown-target="catalog-filter"], [data-dropdown-list="catalog-filter"]')) {
        const catalogFilter = document.querySelector('[data-dropdown-list="catalog-filter"]')
        if (catalogFilter?.classList.contains('menu-dropdown-list--visible')) {
            closeDropdown('catalog-filter')
        }
    }

    // Close dropdowns with data-dropdown-close attribute
    const dropdownClose = e.target.closest('[data-dropdown-close]')
    if (dropdownClose) closeDropdown(dropdownClose.getAttribute('data-dropdown-close'))

    // Opening / Closing search-overlay in the header
    const headerWrapper = document.querySelector('.header__wrapper')
    const searchOverlay = document.querySelector('.search-overlay')
    const searchBtn = document.querySelector('.header-links__search')
    if (searchOverlay.classList.contains('search-overlay--visible')) {
        if (!e.target.closest('.search-overlay') || e.target.closest('.search__close')) {
            headerWrapper.classList.remove('header-search__wrapper')
            searchOverlay.classList.remove('search-overlay--visible')
            searchBtn.classList.remove('header-links__search--active')
        }
    } else if (
        e.target.closest('.header-links__search')
        || e.target.closest('.header-nav__search')
    ) {
        headerWrapper.classList.add('header-search__wrapper')
        searchOverlay.classList.add('search-overlay--visible')
        searchBtn.classList.add('header-links__search--active')
    }

    // Size Button
    const sizeButton = e.target.closest('.size-button')
    if (sizeButton && !sizeButton?.classList?.contains('size-button--disabled')) {
        document.querySelectorAll('.size-button').forEach(elem => elem.classList.remove('size-button--active'))
        sizeButton.classList.add('size-button--active')
    }

    // Color pick
    const colorPick = e.target.closest('.color-pick')
    if (colorPick && !colorPick?.classList?.contains('color-pick--disabled')) {
        document.querySelectorAll('.color-pick').forEach(elem => elem.classList.remove('color-pick--active'))
        colorPick.classList.add('color-pick--active')
    }

    // Sidebar
    const sidebarClose = e.target.closest('[data-sidebar-close]')
    const sidebarPage = e.target.closest('[data-sidebar-page]')
    const visibleSidebar = document.querySelector('.sidebar--visible')
    if (sidebarClose || (!sidebarPage && visibleSidebar)) {
        const visibleSidebars = document.querySelectorAll('.sidebar--visible')
        visibleSidebars.forEach(sidebar => sidebar.classList.remove('sidebar--visible'))
        toggleBackgroundBlur('remove')
    }

    const sidebarTarget = e.target.closest('[data-sidebar-target]')
    if (sidebarTarget) toggleSidebar('add', sidebarTarget.getAttribute('data-sidebar-target'))

    const sidebarBack = e.target.closest('[data-sidebar-back]')
    if (sidebarBack) toggleSidebar('remove', sidebarBack.getAttribute('data-sidebar-back'))

    // Product Images Slider
    const productImagesSliderZoomIcon = e.target.closest('.product-images-slider-slide__icon')
    if (productImagesSliderZoomIcon) toggleProductImagesSliderZoom('add')

    const productImagesSliderClose = e.target.closest('.product-images-slider__close')
    if (productImagesSliderClose) toggleProductImagesSliderZoom('remove')

    // Like Buttons
    const likeBtn = e.target.closest('.like-button')
    if (likeBtn) likeBtn.classList.toggle('like-button--active')
})

const counters = document.querySelectorAll('.counter')

if (counters.length > 0) {
    counters.forEach(counter => {
        const minusElem = counter.querySelector('.counter__icon--minus')
        const plusElem = counter.querySelector('.counter__icon--plus')
        const input = counter.querySelector('.counter__input')

        const minValue = input.getAttribute('min')
        const maxValue = input.getAttribute('max')

        const updateButtonState = () => {
            if (input.value <= minValue) {
                minusElem.classList.add('counter__icon--disabled')
            } else {
                minusElem.classList.remove('counter__icon--disabled')
            }

            if (input.value >= maxValue) {
                plusElem.classList.add('counter__icon--disabled')
            } else {
                plusElem.classList.remove('counter__icon--disabled')
            }
        }

        // Обновление состояния кнопки минус при инициализации
        updateButtonState()

        minusElem.addEventListener('click', () => {
            const minValue = parseInt(input.getAttribute('min'), 10)
            if (input.value > minValue) {
                input.value -= 1
            }
            updateButtonState()
        })

        plusElem.addEventListener('click', () => {
            const maxValue = parseInt(input.getAttribute('max'), 10)
            if (input.value < maxValue) {
                input.value = parseInt(input.value, 10) + 1
            }
            updateButtonState()
        })

        input.addEventListener('blur', () => {
            if (input.value < minValue) {
                input.value = minValue
            } if (input.value > maxValue) {
                input.value = maxValue
            }
            updateButtonState()
        })
    })
}

const inputs = document.querySelectorAll('.input')

inputs.forEach(input => {
    const wrapper = input.closest('.input__wrapper')
    const type = input.getAttribute('data-type')
    const isRequired = input.getAttribute('required') ?? false

    const phoneMaskOptions = { mask: '+{7} (000) 000-00-00' }
    const dateMaskOptions = { mask: Date, lazy: false }

    switch (type) {
        case 'password':
            const hiddenIcon = wrapper.querySelector('.input__icon-hidden')
            const showIcon = wrapper.querySelector('.input__icon-show')
            hiddenIcon.addEventListener('click', () => input.classList.add('input-password--visible'))
            showIcon.addEventListener('click', () => input.classList.remove('input-password--visible'))
            break;
        case 'phone':
            IMask(input, phoneMaskOptions)
        default:
            break;
    }

    if (type === 'date') {
        IMask(input, dateMaskOptions)
    }

    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            input.classList.remove('input--active')
        } else {
            input.classList.add('input--active')
        }
    })

    input.addEventListener('blur', () => {
        console.log(input.value)
        if ((isRequired && input.value.trim() === '') || input.value === 'Обязательное поле' || input.value === '+7 (000) 000-00-00') {
            input.classList.add('input--error')

            switch (type) {
                case 'name':
                    input.value = 'Обязательное поле'
                    input.classList.add('input--active')
                    break;
                case 'phone':
                    input.value += ' (Некорректный ввод данных)'
                    input.classList.add('input--active')
                    break;

                default:
                    break;
            }
        } else {
            input.classList.remove('input--error')
        }
    })
})

// Footer links scroll with mouse
const categoriesHeaderNavList = document.querySelector('.categories-header-nav__list')
categoriesHeaderNavList.addEventListener('wheel', e => {
    e.preventDefault()
    categoriesHeaderNavList.scrollLeft += e.deltaY
})