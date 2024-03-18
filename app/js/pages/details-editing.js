// Handle form submit
const form = document.querySelector('[name="details-editing-form"]')

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('Изменение данных...')
    // const formData = new FormData(form)
    // for (const pair of formData.entries()) {
    //     console.log(`Name: ${pair[0]}`, `Value: ${pair[1]}`)
    // }
})

// Подтверждение пароля
const confirmPasswordForm = document.querySelector('[name="confirm-password-form"]')

confirmPasswordForm.addEventListener('submit', e => {
    e.preventDefault()
    const password = document.querySelector('[name="confirm-password"]')
    if (!password.classList.contains('input--error')) {
        toggleModal('add', 'modal-change-password')
    }
})

// Смена пароля
const changePasswordForm = document.querySelector('[name="change-password-form"]')

changePasswordForm.addEventListener('submit', e => {
    e.preventDefault()
    const passwordFirst = document.querySelector('[name="change-password-1"]')
    const passwordSecond = document.querySelector('[name="change-password-2"]')
    if (passwordFirst.value !== passwordSecond.value) {
        const rootElems = document.querySelectorAll('.modal-change-password-form-field')
        const rootElem = rootElems[rootElems.length - 1]
        const errorText = document.createElement('p')
        errorText.classList.add('modal__text', 'modal__text--error')
        errorText.textContent = 'Пароли не совпадают'
        rootElem?.insertAdjacentElement('beforeend', errorText)
    } else {
        toggleBackgroundBlackout('remove')
        
        const footer = document.querySelector('footer.footer')
        const content = document.querySelector('.main__inner--personal')
        const changePasswordThanksTemplate = document.importNode(document.getElementById('change-password-thanks').content, true)

        footer.remove()
        content.innerHTML = ''
        content.append(changePasswordThanksTemplate.querySelector('.change-password-thanks__title'))
    }
})