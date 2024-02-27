/*
• Вешаем обработчик события клика на Menu-item-dropdown
• и при клике получаем значение data-dropdown-target
• ищем список по этому значению
• и добавляем специальный класс этому списку и активный класс на сам dropdownElem
*/

const menuItemDropdowns = document.querySelectorAll('.menu-item-dropdown')

menuItemDropdowns.forEach(dropdownElem => {
    dropdownElem.addEventListener('click', e => {
        const dropdownTargetValue = e.target.getAttribute('data-dropdown-target')
        const dropdownTargetList = document.querySelector(`[data-dropdown-list="${dropdownTargetValue}"]`)
        if (!dropdownTargetList) return
        dropdownElem.classList.toggle('menu-item-dropdown--active')
        dropdownTargetList.classList.toggle('menu-dropdown-list--visible')
    })
})