// Other recipient
const otherRecipientFields = document.querySelector('.personal-add-address-form--other-recipient__fields')
const otherRecipientCheckbox = document.querySelector('.personal-add-address-form--other-recipient__wrapper .checkbox__input')

otherRecipientCheckbox.addEventListener('click', () => {
    otherRecipientFields.classList.toggle('personal-add-address-form--other-recipient__fields--active')
})

// Receipt city
const cityPickBtn = document.getElementById('city-pick-btn')
const currentCity = document.querySelector('.personal-add-address-form__toggle-sidebar__title')

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