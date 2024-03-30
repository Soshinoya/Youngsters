const calcPrice = () => {
    const products = document.querySelectorAll('.card-small')
    let productsSum = 0;
    let discount = 0;
    let total = 0;
    products.forEach(product => {
        const id = +product.getAttribute('data-product-id')
        const actualPriceElem = product.querySelector('.card-small-main__price .card-small__price--actual')
        const priceWithoutDiscountElem = product.querySelector('.card-small__price--old')
        const count = product.querySelector('.counter__input').value

        const actualPrice = parseFloat(actualPriceElem.textContent.replace(/\s/g, '').replace(',', '.'))
        const priceWithoutDiscount = parseFloat(priceWithoutDiscountElem?.textContent?.replace(/\s/g, '')?.replace(',', '.'))

        if (priceWithoutDiscount) {
            productsSum += priceWithoutDiscount * count
            discount += (priceWithoutDiscount - actualPrice) * count
            total += actualPrice * count
        } else {
            productsSum += actualPrice * count
            total += actualPrice * count
        }
    })
    const productsPriceElem = document.querySelector('.cart-amount__item--products-sum .price')
    const discountPriceElem = document.querySelector('.cart-amount__item--discount .price')
    const totalPriceElem = document.querySelector('.cart-amount__item--total .price')
    productsPriceElem.textContent = `${productsSum},00`
    discountPriceElem.textContent = `${discount},00`
    totalPriceElem.textContent = `${total},00`
}

const cardSmallCounters = document.querySelectorAll('.card-small .counter')

if (cardSmallCounters.length > 0) {
    cardSmallCounters.forEach(counter => {
        const minusElem = counter.querySelector('.counter__icon--minus')
        const plusElem = counter.querySelector('.counter__icon--plus')
        const input = counter.querySelector('.counter__input')

        minusElem.addEventListener('click', calcPrice)
        plusElem.addEventListener('click', calcPrice)
        input.addEventListener('input', e => e.target.value.trim().length > 0 && calcPrice())
        input.addEventListener('blur', calcPrice)
    })
}

calcPrice()