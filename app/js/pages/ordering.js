let deliveryPointAddress = localStorage.getItem('delivery-point-address') || ''
let shopAddress = localStorage.getItem('shop-address') || ''

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

// Selecting a pick-up point or store
const setTextAndBtnTextContentToReceiptMethod = () => {
    // Search active radio
    const activeRadio = [...document.querySelectorAll('.ordering-form-section__radio-btns__btn .radio__input')].filter(input => input.checked)[0]

    // Buttons
    const deliveryPointBtn = document.getElementById('ordering-form-choose-delivery-point')
    const shopBtn = document.getElementById('ordering-form-choose-shop')

    deliveryPointBtn.addEventListener('click', () => {
        localStorage.setItem('ordering-map-type', 'delivery-point')
        location.href = 'ordering-map.html'
    })

    shopBtn.addEventListener('click', () => {
        localStorage.setItem('ordering-map-type', 'shop')
        location.href = 'ordering-map.html'
    })

    // Delete the current address if it exists
    const currentAddress = document.querySelector('.ordering-form-section__text--address')
    if (currentAddress) currentAddress.remove()

    // Current elems
    const root = receiptMethodSection.querySelector('#ordering-form-section-additional')

    const rootSmDeliveryPointAddress = document.getElementById('ordering-form-section-additional--sm-delivery-point-address')
    const rootSmShopAddress = document.getElementById('ordering-form-section-additional--sm-shop-address')

    // Create paragraph element
    const paragraph = document.createElement('p')
    paragraph.classList.add('ordering-form-section__text', 'ordering-form-section__text--address')

    // Set content
    if (deliveryPointAddress && activeRadio.value === 'delivery-point') {
        if (window.matchMedia('(max-width: 650px)').matches) {
            paragraph.textContent = deliveryPointAddress
            deliveryPointBtn.querySelector('p').textContent = 'Изменить ПВЗ'
            rootSmDeliveryPointAddress.insertAdjacentElement('beforeend', paragraph)
        } else {
            paragraph.textContent = `ПУНКТ ВЫДАЧИ: ${deliveryPointAddress}`
            deliveryPointBtn.querySelector('p').textContent = 'Изменить ПВЗ'
            root.insertAdjacentElement('beforeend', paragraph)
        }
    } else if (!deliveryPointAddress) {
        deliveryPointBtn.querySelector('p').textContent = 'Выбрать ПВЗ'
    }

    if (shopAddress && activeRadio.value === 'shop') {
        if (window.matchMedia('(max-width: 650px)').matches) {
            paragraph.textContent = shopAddress
            shopBtn.querySelector('p').textContent = 'Изменить магазин'
            rootSmShopAddress.insertAdjacentElement('beforeend', paragraph)
        } else {
            paragraph.textContent = `МАГАЗИН: ${shopAddress}`
            shopBtn.querySelector('p').textContent = 'Изменить магазин'
            root.insertAdjacentElement('beforeend', paragraph)
        }
    } else if (!shopAddress) {
        shopBtn.querySelector('p').textContent = 'Выбрать магазин'
    }
}

const toggleReceiptMethodContent = value => {
    // Templates
    const deliveryDescTemplate = document.importNode(document.getElementById('ordering-form-delivery__desc').content, true)
    const deliveryFormAddressTemplate = document.importNode(document.getElementById('ordering-form-address').content, true)
    const deliveryPointDescTemplate = document.importNode(document.getElementById('ordering-form-delivery-point__desc').content, true)
    const shopDescTemplate = document.importNode(document.getElementById('ordering-form-shop__desc').content, true)

    // Current elems
    const root = receiptMethodSection.querySelector('#ordering-form-section-additional')

    const rootSmDeliveryDesc = document.getElementById('ordering-form-section-additional--sm-delivery-desc')
    const rootSmDeliveryPointDesc = document.getElementById('ordering-form-section-additional--sm-delivery-point-desc')
    const rootSmShopDesc = document.getElementById('ordering-form-section-additional--sm-shop-desc')

    // Removing all imported elements
    root.innerHTML = ''
    rootSmDeliveryDesc.innerHTML = ''
    rootSmDeliveryPointDesc.innerHTML = ''
    rootSmShopDesc.innerHTML = ''

    // Deleting active classes
    receiptMethodSection.querySelectorAll('.ordering-form-section__radio-btns__btn').forEach(btn => {
        btn.classList.remove('ordering-form-section__radio-btns__btn--active')

        // Added active class to button
        if (btn.classList.contains(`ordering-form-section__radio-btns__btn--${value}`)) {
            btn.classList.add('ordering-form-section__radio-btns__btn--active')
        }
    })

    switch (value) {
        case 'delivery':
            (window.matchMedia('(max-width: 650px)').matches ? rootSmDeliveryDesc : root).insertAdjacentElement('beforeend', deliveryDescTemplate.querySelector('.ordering-form-section__desc'))
            root.insertAdjacentElement('beforeend', deliveryFormAddressTemplate.querySelector('.ordering-form-section__address'))
            break;
        case 'delivery-point':
            (window.matchMedia('(max-width: 650px)').matches ? rootSmDeliveryPointDesc : root).insertAdjacentElement('beforeend', deliveryPointDescTemplate.querySelector('.ordering-form-section__desc'))
            break;
        case 'shop':
            (window.matchMedia('(max-width: 650px)').matches ? rootSmShopDesc : root).insertAdjacentElement('beforeend', shopDescTemplate.querySelector('.ordering-form-section__desc'))
            break;
        default:
            break;
    }
}

const receiptMethodsRadioBtns = document.querySelectorAll('.ordering-form-section__radio-btns__btn')

receiptMethodsRadioBtns.forEach(btn => {
    const radio = btn.querySelector('[name="receipt-method"]')
    if (radio.checked) {
        toggleReceiptMethodContent(radio.value)
        setTextAndBtnTextContentToReceiptMethod()
    }

    btn.addEventListener('click', () => {
        toggleReceiptMethodContent(radio.value)
        setTextAndBtnTextContentToReceiptMethod()
    })
})

// Submit button textContent
const submitBtn = document.querySelector('.ordering-form-amount .button-first[type="submit"]')

const paymentMethodsBtns = document.querySelectorAll('[name="payment-method"]')

const setSubmitBtnTextContent = () => {
    const paymentMethod = [...paymentMethodsBtns].filter(elem => elem.checked)[0]?.value

    if (paymentMethod === 'online') {
        submitBtn.textContent = 'Перейти к оплате'
    } else if (paymentMethod === 'upon') {
        submitBtn.textContent = 'Создать заказ'
    }
}

paymentMethodsBtns.forEach(btn => btn.addEventListener('click', setSubmitBtnTextContent))