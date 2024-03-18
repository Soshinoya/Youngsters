const form = document.querySelector('[name="change-password-form"]')

form.addEventListener('submit', e => {
    e.preventDefault()
    const passwordFirst = document.querySelector('[name="change-password-form-password-1"]')
    const passwordSecond = document.querySelector('[name="change-password-form-password-2"]')
    if (passwordFirst.value !== passwordSecond.value) {
        if (!document.querySelector('.change-password-form-field__text--error')) {
            const rootElem = document.querySelector('.change-password-form-field:last-child')
            const errorText = document.createElement('p')
            errorText.classList.add('change-password-form-field__text', 'change-password-form-field__text--error')
            errorText.textContent = 'Пароли не совпадают'
            rootElem?.insertAdjacentElement('beforeend', errorText)
        }

        if (passwordFirst.classList.contains('input--error') || passwordSecond.classList.contains('input--error')) {
            toggleModal('add', 'modal-incorrect-password')
        }
    } else {
        const categoriesHeaderWrapper = document.querySelector('.categories-header__wrapper')
        const mainInnerChangePassword = document.querySelector('.main__inner--change-password')
        const changePasswordThanksTemplate = document.importNode(document.getElementById('change-password-thanks').content, true)
        mainInnerChangePassword.remove()
        categoriesHeaderWrapper.insertAdjacentElement('afterend', changePasswordThanksTemplate.querySelector('.change-password-thanks__title'))
    }
})