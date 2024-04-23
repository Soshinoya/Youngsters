const resultPriceFormatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 })

const priceSlider = document.getElementById('range-slider--filter-price')

const testSlider = noUiSlider.create(priceSlider, {
    start: [10000, 100000], // Начальные значения для трех ползунков
    connect: true, // Подключение между ползунками
    range: {
        'min': 10000,
        'max': 100000
    },
    step: 1000,
    behaviour: 'drag'
})

priceSlider.noUiSlider.on('update', values => {
    $('#filter-price--from').text(resultPriceFormatter.format(values[0]))
    $('#filter-price--to').text(resultPriceFormatter.format(values[1]))
})

// Инициализация переменных
let allProducts = 70;
let renderedProducts = 0;
let stepRenderProducts;

let catalogItemsBannersCount = 0;

// Условия выбора отображаемых товаров товаров в зависимости от размера окна
let nextElems = window.matchMedia('(min-width: 1025px)').matches ? 4 : window.matchMedia('(min-width: 769px)').matches ? 2 : 1;
let currentElems = window.matchMedia('(min-width: 1025px)').matches ? 4 : window.matchMedia('(min-width: 769px)').matches ? 2 : 1;

// Константы для классов
const CLASS_CATALOG_ITEMS_HOLDER = 'catalog__items-holder'
const CLASS_CATALOG_ITEMS_HOLDER_STROKE = 'catalog__items-holder--stroke'
const CLASS_CATALOG_ITEMS_HOLDER_SQUARE = 'catalog__items-holder--square'
const CLASS_CATALOG_ITEMS_BANNER = 'catalog__items-banner'

// Условия выбора количества отображаемых товаров в зависимости от размера окна
if (window.matchMedia('(max-width: 768px)').matches) {
    stepRenderProducts = 12
} else if (window.matchMedia('(max-width: 1024px)').matches) {
    stepRenderProducts = 14
} else {
    stepRenderProducts = 16
}

// Объект с данными для одного товара
const singleProductData = {
    imgSrc: "./images/content/products/mas-ring.png",
    imgSrcset: "./images/content/products/mas-ring.png 1x, ./images/content/products/mas-ring@2x.png 2x",
    imgAlt: "Кольцо",
    title: "Кольцо YOUNGSTERS",
    price: "35 000,00",
    href: "/youngsters/product.html",
    isFavorite: false,
    type: "ring",
    isPlaque: true,
    plaqueTopText: "Бестселлер",
    plaqueBottomText: "-10%"
}

// Функция для отображения одного товара
const renderProduct = data => {
    const root = document.querySelector('.catalog__items')
    const lastElem = root.lastElementChild
    const catalogItemsHolderSquares = root.querySelectorAll(`.${CLASS_CATALOG_ITEMS_HOLDER_SQUARE}`)
    const catalogItemsHolderStrokes = root.querySelectorAll(`.${CLASS_CATALOG_ITEMS_HOLDER_STROKE}`)
    const catalogItemsHolders = root.querySelectorAll(`.${CLASS_CATALOG_ITEMS_HOLDER}`)

    // Функция для создания и добавления нового элемента
    const createAndAppendCatalogItemsHolder = (htmlContent, classModificator) => {
        const catalogItemsHolder = document.createElement('div')
        catalogItemsHolder.classList.add(CLASS_CATALOG_ITEMS_HOLDER, classModificator)
        catalogItemsHolder.insertAdjacentHTML('beforeend', htmlContent)
        root.appendChild(catalogItemsHolder)
    }

    // Функция для создания и добавления баннера
    const createAndAppendBanner = () => {
        const banner = document.createElement('div')
        const bannerImg = document.createElement('img')
        banner.appendChild(bannerImg)
        banner.classList.add('catalog__items-banner')
        bannerImg.src = `./images/content/banners/catalog/${catalogItemsBannersCount % 2 === 0 ? 1 : 2}.jpg`
        bannerImg.alt = 'Мужчина позирует в украшениях Youngsters'
        root.appendChild(banner)
        catalogItemsBannersCount++
    }

    // Проверка условий для добавления баннера
    if (window.matchMedia('(min-width: 769px)').matches) {
        if (!lastElem) {
            createAndAppendBanner()
        } else {
            if (window.matchMedia('(min-width: 1025px)').matches) {
                if (
                    (catalogItemsHolderSquares.length > 0 && catalogItemsHolderSquares.length % 2 === 0 && catalogItemsHolderSquares[catalogItemsHolderSquares.length - 1].childElementCount === 4 && catalogItemsHolders[catalogItemsHolders.length - 1].classList.contains('catalog__items-holder--square'))
                    ||
                    (catalogItemsHolderStrokes.length > 0 && catalogItemsHolderStrokes.length % 4 === 0 && catalogItemsHolderStrokes[catalogItemsHolderStrokes.length - 1].childElementCount === 2 && catalogItemsHolders[catalogItemsHolders.length - 1].classList.contains('catalog__items-holder--stroke'))
                ) createAndAppendBanner()
            } else {
                if (
                    (catalogItemsHolderSquares.length > 0 && catalogItemsHolderSquares.length % 4 === 0 && catalogItemsHolderSquares[catalogItemsHolderSquares.length - 1].childElementCount === 2 && catalogItemsHolders[catalogItemsHolders.length - 1].classList.contains('catalog__items-holder--square'))
                    ||
                    (catalogItemsHolderStrokes.length > 0 && catalogItemsHolderStrokes.length % 6 === 0 && catalogItemsHolderStrokes[catalogItemsHolderStrokes.length - 1].childElementCount === 1 && catalogItemsHolders[catalogItemsHolders.length - 1].classList.contains('catalog__items-holder--stroke'))
                ) createAndAppendBanner()
            }
        }
    }

    const productCardTemplate = HTMLTemplates.getProductCardTemplate(data)

    // Десктопная версия (сетка из 4 столбцов)
    if (window.matchMedia('(min-width: 1025px)').matches) {
        if (nextElems === 2 || (currentElems === 2 && root.lastElementChild.childElementCount === 1)) {
            if (!(root.lastElementChild.classList.contains(CLASS_CATALOG_ITEMS_BANNER) && root.children[root.children.length - 2].classList.contains(CLASS_CATALOG_ITEMS_HOLDER_STROKE))) {
                if (root.lastElementChild.childElementCount === 4 || root.lastElementChild.classList.contains(CLASS_CATALOG_ITEMS_BANNER)) {
                    createAndAppendCatalogItemsHolder(productCardTemplate, CLASS_CATALOG_ITEMS_HOLDER_STROKE)
                    currentElems = 2
                    renderedProducts++
                } else if (root.lastElementChild.childElementCount === 1) {
                    root.lastElementChild.insertAdjacentHTML('beforeend', productCardTemplate)
                    currentElems = 2
                    renderedProducts++
                } else if (root.lastElementChild.childElementCount === 2) {
                    createAndAppendCatalogItemsHolder(productCardTemplate, CLASS_CATALOG_ITEMS_HOLDER_STROKE)
                    nextElems = 4
                    currentElems = 2
                    renderedProducts++
                }
                return
            }
        }

        if (nextElems === 4) {
            if (root.lastElementChild.classList.contains(CLASS_CATALOG_ITEMS_HOLDER_SQUARE)) {
                root.lastElementChild.insertAdjacentHTML('beforeend', productCardTemplate)
                currentElems = 4
                renderedProducts++
            } else {
                createAndAppendCatalogItemsHolder(productCardTemplate, CLASS_CATALOG_ITEMS_HOLDER_SQUARE)
                currentElems = 4
                renderedProducts++
            }

            if (root.lastElementChild.childElementCount === 4) {
                nextElems = 2
                return
            }
            return
        }
    } else if (window.matchMedia('(min-width: 769px)').matches) {
        if (nextElems === 1 || currentElems === 1) {
            if (!(root.children[root.children.length - 3].classList.contains(CLASS_CATALOG_ITEMS_HOLDER_STROKE))) {
                if (root.lastElementChild.childElementCount === 2 || root.lastElementChild.childElementCount === 1 || root.lastElementChild.classList.contains(CLASS_CATALOG_ITEMS_BANNER)) {
                    createAndAppendCatalogItemsHolder(productCardTemplate, CLASS_CATALOG_ITEMS_HOLDER_STROKE)
                    currentElems = 1
                    renderedProducts++
                }
                return
            }
            nextElems = 2
            currentElems = 1
        }

        if (nextElems === 2) {
            if (root.lastElementChild.classList.contains(CLASS_CATALOG_ITEMS_HOLDER_SQUARE) && root.lastElementChild.childElementCount === 1) {
                root.lastElementChild.insertAdjacentHTML('beforeend', productCardTemplate)
                currentElems = 2
                renderedProducts++
            } else {
                createAndAppendCatalogItemsHolder(productCardTemplate, CLASS_CATALOG_ITEMS_HOLDER_SQUARE)
                currentElems = 2
                renderedProducts++
            }

            if (root.lastElementChild.childElementCount === 2 && root.children[root.children.length - 2].classList.contains(CLASS_CATALOG_ITEMS_HOLDER_SQUARE)) {
                nextElems = 1
                return
            }
            return
        }
    } else {
        root.insertAdjacentHTML('beforeend', productCardTemplate)
        renderedProducts++
    }
}

const loadMore = document.querySelector('.load-more')

const setLoadMoreData = () => {
    document.querySelector('.load-more .menu-item-dropdown').classList.remove('menu-item-dropdown--active')
    loadMore.querySelector('.load-more__smalltext').textContent = `Показано ${renderedProducts} из ${allProducts} изделий`
    loadMore.querySelector('.load-more__loaded').style.width = `${renderedProducts * 100 / allProducts}%`
}

const renderProducts = () => {
    const productsToRender = (stepRenderProducts + renderedProducts) > allProducts ? allProducts - renderedProducts : stepRenderProducts

    for (let i = 0; i < productsToRender; i++) {
        renderProduct(singleProductData)
    }

    if (renderedProducts >= allProducts) {
        loadMore.classList.add('d-none')
        return
    }

    setLoadMoreData()
}

loadMore.addEventListener('click', renderProducts)

document.addEventListener('click', () => {
    document.querySelector('.load-more .menu-item-dropdown').classList.remove('menu-item-dropdown--active')
})

renderProducts()