const transitionDuration = 400;

const setPaddingFromContainerToElem = (elem, property) => {
    if (!elem) return
    const container = document.querySelector('.container')
    elem.style[property] = `${container.getBoundingClientRect().left + 20}px`
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

    // Close dropdowns with data-dropdown-close attribute
    const dropdownClose = e.target.closest('[data-dropdown-close]')
    if (dropdownClose) {
        const dropdownCloseValue = dropdownClose.getAttribute('data-dropdown-close')
        const dropdownTarget = document.querySelector(`[data-dropdown-target="${dropdownCloseValue}"]`)
        const dropdownList = document.querySelector(`[data-dropdown-list="${dropdownCloseValue}"]`)

        dropdownTarget?.classList.remove('menu-item-dropdown--active')
        dropdownList?.classList.remove(dropdownCloseValue === 'header-sidebar' ? 'header-sidebar--visible' : 'menu-dropdown-list--visible')

        // If an internal page is open - close it too
        if (document.querySelector('.header-sidebar-top__inner-page')) toggleHeaderSidebarInnerPage('close')
    }

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
})