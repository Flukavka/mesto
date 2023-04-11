export default class Card {
  constructor(cardData, cardTemplate, handleOpenPopup) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._templateSelector = cardTemplate;
    this._handleOpenPopup = handleOpenPopup;
  }

  //get html-template and clone
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    //like
    this.buttonLike.addEventListener('click', () => {
      this.buttonLike.classList.toggle('element__btn_active');
    });

    //delete card
    this.buttonDeleteCard.addEventListener('click', () => {
      const currentCard = this.buttonDeleteCard.closest('.element');
      currentCard.remove();
    });

    //open image popup
    this._image.addEventListener('click', () => {
      this._handleOpenPopup(this._image, this._name)
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = `Фотография ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;

    //like btn
    this.buttonLike = this._element.querySelector('.element__btn');

    //delete card btn
    this.buttonDeleteCard = this._element.querySelector('.element__btn-delete');

    this._setEventListeners();
    return this._element;
  }
}
