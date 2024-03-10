// Other recipient
const otherRecipientFields = document.querySelector('.ordering-form-section--other-recipient__fields')
const otherRecipientCheckbox = document.querySelector('.ordering-form-section--other-recipient__wrapper .checkbox__input')

otherRecipientCheckbox.addEventListener('click', () => {
    otherRecipientFields.classList.toggle('ordering-form-section--other-recipient__fields--active')
})

// Receipt city
const cityPickBtn = document.getElementById('city-pick-btn')
const currentCity = document.querySelector('.ordering-form-section__toggle-sidebar__title')

cityPickBtn.addEventListener('click', () => {
    const cities = document.querySelectorAll('.sidebar-city__items .checkbox__input')
    const selectedCity = [...cities].filter(city => city.checked)[0]

    if (selectedCity) {
        currentCity.textContent = selectedCity.closest('.checkbox').querySelector('.checkbox__text').textContent
        currentCity.setAttribute('data-city-value', selectedCity.value)
        toggleSidebar('remove', 'city-pick')
        toggleBackgroundBlur('remove')
    }
})

// Receipt radio buttons
const receiptMethodSection = document.querySelector('.ordering-form-section--receipt-method')

const toggleReceiptMethod = value => {
    // Templates
    const deliveryDescTemplate = document.importNode(document.getElementById('ordering-form-delivery__desc').content, true)
    const deliveryFormAddressTemplate = document.importNode(document.getElementById('ordering-form-address').content, true)

    const deliveryPointDescTemplate = document.importNode(document.getElementById('ordering-form-delivery-point__desc').content, true)

    const shopDescTemplate = document.importNode(document.getElementById('ordering-form-shop__desc').content, true)

    // Current elems
    const deliveryDesc = receiptMethodSection.querySelectorAll('.ordering-form-section__desc');
    const deliveryFormAddress = receiptMethodSection.querySelectorAll('.ordering-form-section__address');

    // Removing all imported elements
    [...deliveryDesc, ...deliveryFormAddress].forEach(elem => elem?.remove())

    document.querySelector('.ordering-form-section__radio-btns__btn--active')?.classList?.remove('ordering-form-section__radio-btns__btn--active')

    document.querySelector(`.ordering-form-section__radio-btns__btn--${value}`).classList.add('ordering-form-section__radio-btns__btn--active')

    switch (value) {
        case 'delivery':
            document.querySelector('.ordering-form-section__radio-btns').insertAdjacentElement('afterend', deliveryDescTemplate.querySelector('.ordering-form-section__desc'))
            document.querySelector('.ordering-form-section__radio-btns__wrapper').insertAdjacentElement('afterend', deliveryFormAddressTemplate.querySelector('.ordering-form-section__address'))
            break;
        case 'delivery-point':
            document.querySelector('.ordering-form-section__radio-btns').insertAdjacentElement('afterend', deliveryPointDescTemplate.querySelector('.ordering-form-section__desc'))
            break;
        case 'shop':
            document.querySelector('.ordering-form-section__radio-btns').insertAdjacentElement('afterend', shopDescTemplate.querySelector('.ordering-form-section__desc'))
            break;
        default:
            break;
    }
}

const receiptMethodsRadioBtns = document.querySelectorAll('.ordering-form-section__radio-btns [name="receipt-method"]')

receiptMethodsRadioBtns.forEach(radio => {
    radio.addEventListener('click', () => toggleReceiptMethod(radio.getAttribute('value')))
})