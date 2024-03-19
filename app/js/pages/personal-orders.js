const personalOrdersDelivery = document.querySelector('.personal-orders-delivery')
const personalOrdersPurchase = document.querySelector('.personal-orders-purchase')

if (personalOrdersDelivery.querySelector('.personal-orders__items').children.length === 0) {
    const isProductsInCart = false

    let template;

    if (isProductsInCart) {
        // Если товары в корзине есть
        template = document.importNode(document.getElementById('personal-orders-delivery--in-cart').content, true)
    } else {
        // Если нету товаров в корзине
        template = document.importNode(document.getElementById('personal-orders-delivery--no-orders').content, true)
    }

    personalOrdersDelivery.innerHTML = ''
    personalOrdersDelivery.insertAdjacentElement('beforeend', template.querySelector('.personal-orders-no-orders'))
}

if (personalOrdersPurchase.querySelector('.personal-orders__items').children.length === 0) {
    const template = document.importNode(document.getElementById('personal-orders-delivery--no-purchases').content, true)
    personalOrdersPurchase.innerHTML = ''
    personalOrdersPurchase.append(template.querySelector('.personal-orders-no-orders'))
}

// Показываем заказы при нажатии на кнопку
const personalOrdersDecorationsBtns = document.querySelectorAll('.personal-orders-decorations__btn')

personalOrdersDecorationsBtns?.forEach(btn => btn.addEventListener('click', () => {
    btn.classList.toggle('personal-orders-decorations__btn--active')
}))