const guestFavoritesCards = document.querySelector('.guest-favorites__cards')

const setGuestFavoritesEmptyBlock = () => {
    const template = document.importNode(document.getElementById('guest-favorites-empty').content, true)
    const guestFavoritesEmpty = template.querySelector('.guest-favorites-empty')
    guestFavoritesCards.insertAdjacentElement('afterend', guestFavoritesEmpty)
}

if (guestFavoritesCards.children.length === 0) setGuestFavoritesEmptyBlock()