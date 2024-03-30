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

const toggleBackgroundBlackout = action => {
    const currentBlackout = document.querySelector('.background-blackout')

    if (currentBlackout) {
        currentBlackout.classList[action]('background-blackout--active')
    } else if (action !== 'remove') {
        const newBlur = document.createElement('div')
        newBlur.classList.add('background-blackout', 'background-blackout--active')
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

const inputHandler = input => {
    const inputWrapper = input.closest('.input__wrapper')
    const dataType = input.getAttribute('data-type')
    const isRequired = input.getAttribute('required') ?? false

    const phoneMaskOptions = { mask: '+{7} (000) 000-00-00' }
    const dateMaskOptions = {
        mask: Date,
        pattern: 'd{.}d{.}Y',
        blocks: {
            d: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 31,
                maxLength: 2
            },
            m: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2
            },
            Y: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 9999
            }
        },
        format(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return [day, month, year].map(this.addLeadingZero).join('.');
        },
        parse(str) {
            const parts = str.split('.');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);

            return new Date(year, month, day);
        },
        autofix: true
    }

    let phoneMask;

    if (dataType === 'name' || dataType === 'lastname') {
        input.addEventListener('blur', () => {
            if ((isRequired && input.value.trim() === '') || input.value === 'Обязательное поле') {
                input.classList.add('input--error', 'input--active')
                input.value = 'Обязательное поле'
            } else {
                input.classList.remove('input--error')
            }
        })
    }

    if (dataType === 'email') {
        input.addEventListener('blur', () => {
            const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if ((isRequired && input.value.trim() === '') || input.value === 'Обязательное поле') {
                input.classList.add('input--error', 'input--active')
                input.value = 'Обязательное поле'
            }
            if (regExp.test(input.value)) {
                input.classList.remove('input--error')
            } else {
                input.classList.add('input--error', 'input--active')
            }
        })
    }

    if (dataType === 'password') {
        const hiddenIcon = inputWrapper.querySelector('.input__icon-hidden')
        const showIcon = inputWrapper.querySelector('.input__icon-show')
        hiddenIcon.addEventListener('click', () => {
            inputWrapper.classList.add('input__wrapper--password--visible')
            input.setAttribute('type', 'text')
        })
        showIcon.addEventListener('click', () => {
            inputWrapper.classList.remove('input__wrapper--password--visible')
            input.setAttribute('type', 'password')
        })

        input.addEventListener('blur', () => {
            if ((isRequired && input.value.trim() === '') || input.value.trim() === 'Обязательное поле') {
                input.classList.add('input--error', 'input--active')
                inputWrapper.classList.add('input__wrapper--password--visible')
                input.value = 'Обязательное поле'
                input.setAttribute('type', 'text')
            } else {
                input.classList.remove('input--error')
            }
        })
    }

    if (dataType === 'phone') {
        phoneMask = IMask(input, phoneMaskOptions)

        input.addEventListener('blur', () => {
            if (input.value === '+7 (000) 000-00-00') {
                console.log(input.value)
                input.classList.add('input--error', 'input--active')
                phoneMask.destroy()
                input.value += ' (Некорректный ввод данных)'
            } else {
                input.classList.remove('input--error')
            }

            if (input.value === '') {
                input.classList.remove('input--error', 'input--active')
            }
        })
    }

    if (dataType === 'date') {
        input.classList.add('input--active')
        IMask(input, dateMaskOptions)
        input.addEventListener('blur', () => {
            if (input.value.split('.').join('').length !== 8) {
                input.classList.add('input--error')
            } else {
                input.classList.remove('input--error')
            }
        })
    }

    input.addEventListener('input', () => {
        if (input.value.trim() === '' && dataType !== 'date') {
            input.classList.remove('input--active')
        } else {
            input.classList.add('input--active')
        }
    })

    // Если инпут имеет класс input--error при фокусе на нём, то удаляем этот класс и очищаем value
    input.addEventListener('focus', () => {
        if (input.classList.contains('input--error')) {
            input.classList.remove('input--error')
            input.value = ''

            phoneMask = (dataType === 'phone' ? IMask(input, phoneMaskOptions) : undefined)

            if (dataType === 'password') {
                inputWrapper.classList.remove('input__wrapper--password--visible')
                input.setAttribute('type', 'password')
            }
        }
    })
}

const toggleModal = (action, value) => {
    if (!document.querySelector('.modal--visible')) {
        toggleBackgroundBlackout(action)
    } else {
        document.querySelectorAll('.modal--visible').forEach(elem => elem.classList.remove('modal--visible'))
    }
    const modal = document.querySelector(`[data-modal-page="${value}"]`)
    modal && modal.classList[action]('modal--visible')
}

// Header user block
const headerLinksUser = document.querySelector('.header-links__user')

const togglePersonalHeaderAuth = () => {
    const headerWrapper = document.querySelector('.header__wrapper')

    // В переменной isAuth должно быть boolean значение авторизован ли пользователь или нет
    const isAuth = true

    headerLinksUser.classList.toggle('header-links__user--active')
    headerWrapper.classList.toggle('header__wrapper--active')

    if (isAuth) {
        const personalHeaderAuth = document.querySelector('.personal-header-auth')
        personalHeaderAuth.classList.toggle('personal-header-auth--active')
    } else {
        const personalHeaderUnauth = document.querySelector('.personal-header-unauth')
        personalHeaderUnauth.classList.toggle('personal-header-unauth--active')
    }
}

headerLinksUser?.addEventListener('click', togglePersonalHeaderAuth)

window.addEventListener('resize', () => {
    !window.matchMedia('(max-width: 320px)').matches && setPaddingFromContainerToElem(document.querySelector('aside.header-sidebar'), 'paddingLeft')
    !window.matchMedia('(max-width: 768px)').matches && setPaddingFromContainerToElem(document.querySelector('.personal-header-auth'), 'right')
    !window.matchMedia('(max-width: 768px)').matches && setPaddingFromContainerToElem(document.querySelector('.personal-header-unauth'), 'right')
    setPaddingFromContainerToElem(document.querySelector('.hero-slider__pagination'), 'right')
})

!window.matchMedia('(max-width: 320px)').matches && setPaddingFromContainerToElem(document.querySelector('aside.header-sidebar'), 'paddingLeft')

!window.matchMedia('(max-width: 768px)').matches && setPaddingFromContainerToElem(document.querySelector('.personal-header-auth'), 'right')
!window.matchMedia('(max-width: 768px)').matches && setPaddingFromContainerToElem(document.querySelector('.personal-header-unauth'), 'right')

setPaddingFromContainerToElem(document.querySelector('.hero-slider__pagination'), 'right')

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
        dropdownTargetList?.classList?.toggle(dropdownTargetValue === 'header-sidebar' ? 'header-sidebar--visible' : 'menu-dropdown-list--visible')
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
    if (searchOverlay?.classList?.contains('search-overlay--visible')) {
        if (!e.target.closest('.search-overlay') || e.target.closest('.search__close')) {
            headerWrapper.classList.remove('header-search__wrapper')
            searchOverlay.classList.remove('search-overlay--visible')
            searchBtn.classList.remove('header-links__search--active')
        }
    } else if (
        e.target.closest('.header-links__search')
        || e.target.closest('.header-nav__search')
    ) {
        headerWrapper?.classList?.add('header-search__wrapper')
        searchOverlay?.classList?.add('search-overlay--visible')
        searchBtn?.classList?.add('header-links__search--active')
    }

    // Clear search-input value
    const searchClear = e.target.closest('.search__clear')
    if (searchClear) {
        const input = searchClear.closest('.search')?.querySelector('.search__input')
        if (input) {
            input.value = ''
        }
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

    // Modal
    const modalClose = e.target.closest('[data-modal-close]')
    const modalPage = e.target.closest('[data-modal-page]')
    const visibleModal = document.querySelector('.modal--visible')
    if (modalClose || (!modalPage && visibleModal)) {
        const visibleModals = document.querySelectorAll('.modal--visible')
        visibleModals.forEach(modal => modal.classList.remove('modal--visible'))
        toggleBackgroundBlackout('remove')
    }

    const modalTarget = e.target.closest('[data-modal-target]')
    if (modalTarget) toggleModal('add', modalTarget.getAttribute('data-modal-target'))

    // Product Images Slider
    const productImagesSliderZoomIcon = e.target.closest('.product-images-slider-slide__icon')
    if (productImagesSliderZoomIcon) toggleProductImagesSliderZoom('add')

    const productImagesSliderClose = e.target.closest('.product-images-slider__close')
    if (productImagesSliderClose) toggleProductImagesSliderZoom('remove')

    // Like Buttons
    const likeBtn = e.target.closest('.like-button')
    if (likeBtn) likeBtn.classList.toggle('like-button--active')

    // inputs
    const input = e.target.closest('.input')
    if (input) inputHandler(input)

    // Удаляем активные классы у .personal-header-auth или .personal-header-unauth, если кликнули снаружи
    const personalHeaderAuth = e.target.closest('.personal-header-auth')
    const personalHeaderUnauth = e.target.closest('.personal-header-unauth')
    const headerLinksUserClosest = e.target.closest('.header-links__user')
    if (!(personalHeaderAuth || personalHeaderUnauth || headerLinksUserClosest)
        &&
        document.querySelector('.header-links__user--active')
    ) togglePersonalHeaderAuth()

    // Personal nav
    if (window.matchMedia('(max-width: 530px)').matches) {
        const personalNavListItem = e.target.closest('.personal-nav__list-item')

        if (personalNavListItem) {
            if (personalNavListItem.classList.contains('personal-nav__list-item--active')) {
                const personalNav = document.querySelector('.personal-nav');
                personalNav.classList.toggle('personal-nav--active')
            } else {
                // Удаляем активный класс и всех item
                [...document.querySelectorAll('.personal-nav__list-item')].forEach(item => item?.remove())

                // Добавляем активный класс item, по которому кликнул пользователь
                personalNavListItem.classList.add('personal-nav__list-item--active')
            }
        }
    }
})

const counters = document.querySelectorAll('.counter')

if (counters.length > 0) {
    counters.forEach(counter => {
        const minusElem = counter.querySelector('.counter__icon--minus')
        const plusElem = counter.querySelector('.counter__icon--plus')
        const input = counter.querySelector('.counter__input')

        const minValue = +input.getAttribute('min')
        const maxValue = +input.getAttribute('max')

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

        // Обновление состояния кнопок при инициализации
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

// Categories Header scroll with mouse
const categoriesHeaderNavList = document.querySelector('.categories-header-nav__list')
categoriesHeaderNavList?.addEventListener('wheel', e => {
    e.preventDefault()
    categoriesHeaderNavList.scrollLeft += e.deltaY
})

// Breadcrumbs scroll with mouse
const breadcrumbsInner = document.querySelector('.breadcrumbs__inner')
breadcrumbsInner?.addEventListener('wheel', e => {
    e.preventDefault()
    breadcrumbsInner.scrollLeft += e.deltaY
})

// Goods Slider
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

// Забыл пароль
const forgotPassword = () => {
    const input = document.querySelector('[name="forgot-password-email"]')
    const inputWrapper = input.closest('.input__wrapper')
    const inputValue = input.value
    const modalForgotPasswordText = document.querySelector('.modal-forgot-password-form__text')

    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputValue.trim() !== '' && regExp.test(inputValue)) {
        inputWrapper.classList.add('input__wrapper--done')
        modalForgotPasswordText.textContent = 'На ваш электронный адрес направлена ссылка для восстановления пароля'
    } else {
        input.classList.add('input--error', 'input--active')
        input.value = 'Обязательное поле'
    }
}

const forgotPasswordForms = document.querySelectorAll('[name="forgot-password-form"]')
forgotPasswordForms.forEach(form => form.addEventListener('submit', e => {
    e.preventDefault()
    forgotPassword()
}))

const favoritesCards = document.querySelector('.favorites__cards')

const setFavoritesEmptyBlock = () => {
    const template = document.importNode(document.getElementById('favorites-empty')?.content, true)
    const favoritesEmpty = template?.querySelector('.favorites-empty')
    favoritesCards?.insertAdjacentElement('afterend', favoritesEmpty)
}

if (favoritesCards?.children?.length === 0) setFavoritesEmptyBlock()

window.addEventListener('resize', () => {
    console.clear()
    console.log(window.innerWidth)
})