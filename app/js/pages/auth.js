const setAuthContent = tabEvent => {
    // Удаляем текущие элементы
    [document.querySelector('.login-form'), document.querySelector('.register-form')]?.forEach(elem => elem?.remove())

    // Templates
    const loginTemplate = document.importNode(document.getElementById('login-form').content, true)
    const registerTemplate = document.importNode(document.getElementById('register-form').content, true)

    if (window.matchMedia('(max-width: 768px)').matches) {
        // Modile, Tablet
        tabEvent && document.querySelectorAll('.auth-tab--active').forEach(tab => tab?.classList?.remove('auth-tab--active'))

        const activeTab = tabEvent ? tabEvent.target.closest('.auth-tab') : document.querySelector('.auth-tab--active')

        tabEvent && activeTab.classList.add('auth-tab--active')

        const currentForm = activeTab.getAttribute('data-tab-target')

        const formRoot = document.querySelector('.auth-content')

        switch (currentForm) {
            case 'login-form':
                formRoot?.insertAdjacentElement('afterbegin', loginTemplate.querySelector('.login-form'))
                break;
            case 'register-form':
                formRoot?.insertAdjacentElement('afterbegin', registerTemplate.querySelector('.register-form'))
                break;

            default:
                break;
        }
    } else {
        // Desktop
        const loginRoot = document.querySelector('.login__title')
        const registerRoot = document.querySelector('.register__title')

        loginRoot.insertAdjacentElement('afterend', loginTemplate.querySelector('.login-form'))
        registerRoot.insertAdjacentElement('afterend', registerTemplate.querySelector('.register-form'))
    }
}

window.addEventListener('resize', () => setAuthContent())

const tabs = document.querySelectorAll('.auth-tab')

tabs.forEach(tab => tab.addEventListener('click', setAuthContent))

setAuthContent()

// Авторизация пользователя
const loginUser = () => console.log('Вход...')
const registerUser = () => console.log('Регистрация...')

if (window.matchMedia('(max-width: 768px)').matches) {
    document.addEventListener('click', e => {
        const submitBtn = e.target.closest('[type="submit"]')
        if (submitBtn) {
            const form = submitBtn.closest('form')
            const formName = form.getAttribute('name')

            switch (formName) {
                case 'login-form':
                    loginUser()
                    break;
                case 'register-form':
                    registerUser()
                    break;
                case 'forgot-password-form':
                    forgotPassword()
                    break;

                default:
                    break;
            }
        }
    })
} else {
    const loginSubmitBtn = document.getElementById('login-submit')
    const registerSubmitBtn = document.getElementById('register-submit')

    const forgotPasswordBtn = document.getElementById('forgot-password-btn')

    loginSubmitBtn.addEventListener('click', e => {
        e.preventDefault()
        loginUser()
    })

    registerSubmitBtn.addEventListener('click', e => {
        e.preventDefault()
        registerUser()
    })

    forgotPasswordBtn.addEventListener('click', e => {
        e.preventDefault()
        forgotPassword()
    })
}