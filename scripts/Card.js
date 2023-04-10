import {
  popupImageWrapper, popupImage, popupTitle, cardTemplate
} from './constants.js';

import { closeByEscape } from './index.js';

export default class Card {
  constructor(cardData, cardTemplate) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._templateSelector = cardTemplate;
  }

  //get html-template and clone
  _getTemplate() {
    const cardElement = cardTemplate.content.cloneNode(true);

    return cardElement;
  }

  //open image popup
  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = `Фотография ${this._name}`;
    popupTitle.textContent = this._name;
    popupImageWrapper.classList.add('popup_opened');
  }

  _setEventListeners() {
    //like
    this.buttonLike.addEventListener('click', () => {
      this.buttonLike.classList.toggle('element__btn_active');
    });

    //delete card
    this.buttonDeleteCard.addEventListener('click', () => {
      this.currentCard = this.buttonDeleteCard.closest('.element');
      this.currentCard.remove();
    });

    this.image.addEventListener('click', () => {
      this._handleOpenPopup();

      document.addEventListener('keydown', closeByEscape);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this.image = this._element.querySelector('.element__image');
    this.image.src = this._link;
    this.image.alt = `Фотография ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;

    //like btn
    this.buttonLike = this._element.querySelector('.element__btn');

    //delete card btn
    this.buttonDeleteCard = this._element.querySelector('.element__btn-delete');

    this._setEventListeners();
    return this._element;
  }
}
