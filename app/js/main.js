const setPaddingLeftFromContainerToElem = elem => {
    if (!elem) return
    const container = document.querySelector('.container')
    elem.style.paddingLeft = `${container.getBoundingClientRect().left + 20}px`
}

window.addEventListener('resize', () => {
    setPaddingLeftFromContainerToElem(document.querySelector('aside.header-sidebar'))
})

setPaddingLeftFromContainerToElem(document.querySelector('aside.header-sidebar'))

document.addEventListener('click', e => {
    // Toggle dropdowns
    const dropdownElem = e.target.closest('.menu-item-dropdown')
    if (dropdownElem) {
        const dropdownTargetValue = dropdownElem.getAttribute('data-dropdown-target')
        const dropdownTargetList = document.querySelector(`[data-dropdown-list="${dropdownTargetValue}"]`)

        dropdownElem.classList.toggle('menu-item-dropdown--active')
        dropdownTargetList?.classList.toggle(dropdownTargetValue === 'header-sidebar' ? 'header-sidebar--visible' : 'menu-dropdown-list--visible')
    }

    // Close header-sidebar if clicked outside
    if (!e.target.closest('[data-dropdown-target="header-sidebar"], .header-sidebar')) {
        const headerSidebarLinkDropdown = document.querySelector('[data-dropdown-target="header-sidebar"]')
        const headerSidebar = document.querySelector('.header-sidebar')
        headerSidebarLinkDropdown?.classList.remove('menu-item-dropdown--active')
        headerSidebar?.classList.remove('header-sidebar--visible')
    }

    // Close dropdowns with data-dropdown-close attribute
    const dropdownClose = e.target.closest('[data-dropdown-close]')
    if (dropdownClose) {
        const dropdownCloseValue = dropdownClose.getAttribute('data-dropdown-close')
        const dropdownTarget = document.querySelector(`[data-dropdown-target="${dropdownCloseValue}"]`)
        const dropdownList = document.querySelector(`[data-dropdown-list="${dropdownCloseValue}"]`)

        dropdownTarget?.classList.remove('menu-item-dropdown--active')
        dropdownList?.classList.remove(dropdownCloseValue === 'header-sidebar' ? 'header-sidebar--visible' : 'menu-dropdown-list--visible')
    }

    // Opening / Closing search-overlay in the header
    const header = document.querySelector('header.header')
    const searchOverlay = document.querySelector('.search-overlay')
    const searchBtn = document.querySelector('.header-links__search')
    if (searchOverlay.classList.contains('search-overlay--visible')) {
        if (!e.target.closest('.search-overlay') || e.target.closest('.search__close')) {
            header.classList.remove('header-search')
            searchOverlay.classList.remove('search-overlay--visible')
            searchBtn.classList.remove('header-links__search--active')
        }
    } else if (e.target.closest('.header-links__search')) {
        header.classList.add('header-search')
        searchOverlay.classList.add('search-overlay--visible')
        searchBtn.classList.add('header-links__search--active')
    }
})