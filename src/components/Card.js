export default class Card {
  constructor(cardData, cardTemplate, handleOpenImagePopup) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._templateSelector = cardTemplate;
    this._handleOpenImagePopup = handleOpenImagePopup;
  }

  //get html-template and clone
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    //like
    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle('element__btn_active');
    });

    //delete card
    this._buttonDeleteCard.addEventListener('click', () => {
      const currentCard = this._buttonDeleteCard.closest('.element');
      currentCard.remove();
    });

    //open image popup
    this._image.addEventListener('click', () => {
      this._handleOpenImagePopup(this._image, this._name)
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = `Фотография ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;

    //like btn
    this._buttonLike = this._element.querySelector('.element__btn');

    //delete card btn
    this._buttonDeleteCard = this._element.querySelector('.element__btn-delete');

    this._setEventListeners();
    return this._element;
  }
}
