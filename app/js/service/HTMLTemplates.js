class HTMLTemplates {
    static getProductCardTemplate = data => `
        <a href="${data.href}" class="card card--${data.type} ${data.isFavorite ? 'card--favorite' : ''}">
            <div class="card__icon">
                <svg>
                    <use xlink:href="./images/sprite.svg#${data.isFavorite ? 'close' : 'heart-black'}"></use>
                </svg>
            </div>
            ${data.isPlaque
            ? `
            <div class="plaque">
                <div class="plaque-top">
                    <p class="plaque-top__text">${data.plaqueTopText}</p>
                </div>
                <div class="plaque-bottom">
                    <p class="plaque-bottom__text">${data.plaqueBottomText}</p>
                </div>
            </div>
            ` : ''}
            <div class="card__img" style="background-image: url(${data.imgSrc});"></div>
            <div class="card__info">
                <p class="card__info-title">${data.title}</p>
                <p class="card__info-price">${data.price}</p>
            </div>
        </a>
    `
}