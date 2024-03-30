// Массив с информацией о пунктах выдачи
const deliveryPoints = [
    {
        id: 0,
        name: 'г. Москва, м. Текстильщики, 8-я улица Текстильщиков, д. 10',
        description: 'Станция метро Текстильщики, 1 вагон из центра, из стеклянных дверей направо. Идти вдоль черного забора до входа на стадион (до шлагбаума), после повернуть налево и идти до светофора, далее прямо через дорогу. Через 20 метров справа расположен пункт выдачи заказов.',
        schedule: 'Ежедневно 10:00 - 20:00',
        lat: 55.7558,
        lng: 37.6176
    },
    {
        id: 1,
        name: 'г. Москва, м. Текстильщики, 8-я улица Текстильщиков, д. 10',
        description: 'Станция метро Текстильщики, 1 вагон из центра, из стеклянных дверей направо. Идти вдоль черного забора до входа на стадион (до шлагбаума), после повернуть налево и идти до светофора, далее прямо через дорогу. Через 20 метров справа расположен пункт выдачи заказов.',
        schedule: 'Ежедневно 10:00 - 20:00',
        lat: 55.7539,
        lng: 37.6208
    },
    {
        id: 2,
        name: 'г. Москва, м. Текстильщики, 8-я улица Текстильщиков, д. 10',
        description: 'Станция метро Текстильщики, 1 вагон из центра, из стеклянных дверей направо. Идти вдоль черного забора до входа на стадион (до шлагбаума), после повернуть налево и идти до светофора, далее прямо через дорогу. Через 20 метров справа расположен пункт выдачи заказов.',
        schedule: 'Ежедневно 10:00 - 20:00',
        lat: 55.7415,
        lng: 37.6202
    }
]

// Массив с информацией о магазинах
const shops = [
    {
        id: 0,
        name: 'г. Москва, м. Текстильщики, 8-я улица Текстильщиков, д. 10',
        description: 'Станция метро Текстильщики, 1 вагон из центра, из стеклянных дверей направо. Идти вдоль черного забора до входа на стадион (до шлагбаума), после повернуть налево и идти до светофора, далее прямо через дорогу. Через 20 метров справа расположен пункт выдачи заказов.',
        schedule: 'Ежедневно 10:00 - 20:00',
        lat: 55.7558,
        lng: 37.6176
    },
    {
        id: 1,
        name: 'г. Москва, м. Текстильщики, 8-я улица Текстильщиков, д. 10',
        description: 'Станция метро Текстильщики, 1 вагон из центра, из стеклянных дверей направо. Идти вдоль черного забора до входа на стадион (до шлагбаума), после повернуть налево и идти до светофора, далее прямо через дорогу. Через 20 метров справа расположен пункт выдачи заказов.',
        schedule: 'Ежедневно 10:00 - 20:00',
        lat: 55.7539,
        lng: 37.6208
    },
    {
        id: 2,
        name: 'г. Москва, м. Текстильщики, 8-я улица Текстильщиков, д. 10',
        description: 'Станция метро Текстильщики, 1 вагон из центра, из стеклянных дверей направо. Идти вдоль черного забора до входа на стадион (до шлагбаума), после повернуть налево и идти до светофора, далее прямо через дорогу. Через 20 метров справа расположен пункт выдачи заказов.',
        schedule: 'Ежедневно 10:00 - 20:00',
        lat: 55.7415,
        lng: 37.6202
    }
]

// Создание карты и установка центра в Москве
const map = L.map('map').setView([55.7558, 37.6176], 13)

// Добавление слоя с картой OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map)

const mapType = localStorage.getItem('ordering-map-type')

if (!mapType) localStorage.setItem('ordering-map-type', 'delivery-point')

// Поменять title страницы и title сайдбара в зависимости от mapType
const orderingMapPageTitle = document.querySelector('head title')
const sidebarTopText = document.querySelector('.sidebar-top__text')

switch (mapType) {
    case 'delivery-point':
        orderingMapPageTitle.textContent = 'Youngsters | Пункты выдачи'
        sidebarTopText.textContent = 'Выберите пункт выдачи'
        break;
    case 'shop':
        orderingMapPageTitle.textContent = 'Youngsters | Магазины'
        sidebarTopText.textContent = 'Выберите магазин'
        break;

    default:
        break;
}

const addAddressToSidebar = point => {
    // Добавление адреса в сайдбар
    const sidebar = document.querySelector('[data-sidebar-page="ordering-map"]')
    const checkbox = document.getElementById('sidebar-ordering-map-checkbox').content.querySelector('.checkbox').cloneNode(true)
    const checkboxInput = checkbox.querySelector('.checkbox__input')
    const checkboxText = checkbox.querySelector('.checkbox__text')

    checkboxInput.name = mapType
    checkboxInput.setAttribute('data-id', point.id)
    checkboxText.textContent = point.name

    const li = document.createElement('li')
    li.classList.add('sidebar-ordering-map__list-item')

    li.insertAdjacentElement('afterbegin', checkbox)
    sidebar.querySelector('ul.sidebar-ordering-map__list').insertAdjacentElement('beforeend', li)
}

const toggleAddressContent = point => {
    // Удаляем контент у уже выбранных адресов
    document.querySelectorAll('.sidebar-ordering-map__list-item__content')?.forEach(elem => elem.remove())
    const descriptionHTML = `
                <div class="sidebar-ordering-map__list-item__content">
                    <p>${point.schedule}</p>
                    <p>${point.description}</p>
                </div>
            `
    const selectedAddress = document.querySelector(`[data-id="${point.id}"]`)
    const selectedAddressLi = selectedAddress?.closest('.sidebar-ordering-map__list-item')

    selectedAddress.checked = true
    selectedAddressLi.insertAdjacentHTML('beforeend', descriptionHTML)
}

(mapType === 'delivery-point' ? deliveryPoints : shops).forEach(point => {
    addAddressToSidebar(point)
    // Добавление маркеров для каждого пункта выдачи на карту
    const marker = L.marker([point.lat, point.lng]).addTo(map)

    marker._icon.setAttribute('data-sidebar-target', 'ordering-map')
    marker._icon.setAttribute('src', './images/icons/map-marker.svg')

    // Обработчик клика на маркере
    marker.on('click', () => {
        // Открываем sidebar
        toggleSidebar('add', 'ordering-map')
        // Изменяем активный адрес
        toggleAddressContent(point)
    })
});

const orderingMapSidebarCheckboxes = document.querySelectorAll('.sidebar-ordering-map .checkbox')

orderingMapSidebarCheckboxes.forEach(checkbox => checkbox.addEventListener('click', () => {
    const checkboxId = checkbox.querySelector('[data-id]').getAttribute('data-id')
    const checkboxData = (mapType === 'delivery-point' ? deliveryPoints : shops).find(point => point.id === +checkboxId)
    toggleAddressContent(checkboxData)
}))

const orderingMapSubmitBtn = document.getElementById('sidebar-ordering-map-submit')

orderingMapSubmitBtn.addEventListener('click', () => {
    const id = +document.querySelector('.sidebar-ordering-map .checkbox__input:checked')?.getAttribute('data-id')
    const address = (mapType === 'delivery-point' ? deliveryPoints : shops).find(point => point.id === id)?.name
    if (address) {
        localStorage.setItem(`${mapType}-address`, address)
        window.location.href = 'ordering.html'
    }
})