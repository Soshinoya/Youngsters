const form = document.querySelector('[name="change-password-form"]')

form.addEventListener('submit', e => {
    e.preventDefault()
    const passwordFirst = document.querySelector('[name="change-password-form-password-1"]')
    const passwordSecond = document.querySelector('[name="change-password-form-password-2"]')
    if (
        passwordFirst.classList.contains('input--error')
        || passwordSecond.classList.contains('input--error')
        || passwordFirst.value !== passwordSecond.value
    ) {
        toggleModal('add', 'modal-incorrect-password')
    } else {
        const categoriesHeaderWrapper = document.querySelector('.categories-header__wrapper')
        const mainInnerChangePassword = document.querySelector('.main__inner--change-password')
        const changePasswordThanksTemplate = document.importNode(document.getElementById('change-password-thanks').content, true)
        mainInnerChangePassword.remove()
        categoriesHeaderWrapper.insertAdjacentElement('afterend', changePasswordThanksTemplate.querySelector('.change-password-thanks__title'))
    }
})