export default class Card {
  constructor(cardData, cardTemplate, handleOpenImagePopup, setLikeCard, checkLikes,
    unlikeCard, getLikeCard) {
    this.cardObject = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._likes = cardData.likes;
    this._templateSelector = cardTemplate;
    this._handleOpenImagePopup = handleOpenImagePopup;
    this._setLikeCard = setLikeCard;
    this._checkLikes = checkLikes;
    this._unlikeCard = unlikeCard;
    this._getLikeCard = getLikeCard;
    this.likeCardEvent = this.likeCardEvent.bind(this);
    this.unlikeCardEvent = this.unlikeCardEvent.bind(this);
  }

  //get html-template and clone
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    //open image popup
    this._image.addEventListener('click', () => {
      this._handleOpenImagePopup(this._image, this._name)
    });
  }

  toggleLikeActiveClass() {
    this._buttonLike.classList.toggle('element__btn_active');
  }

  likeCardEvent() {
    this.cardElement = this._buttonLike.closest('.element');
    this._setLikeCard(this.cardObject, this.cardElement);
    this.toggleLikeActiveClass();
    this._buttonLike.addEventListener('click', this.unlikeCardEvent);
    this._buttonLike.removeEventListener('click', this.likeCardEvent);
  }

  unlikeCardEvent() {
    this.cardElement = this._buttonLike.closest('.element');
    this._unlikeCard(this.cardObject, this.cardElement);
    this.toggleLikeActiveClass();
    this._buttonLike.addEventListener('click', this.likeCardEvent);
    this._buttonLike.removeEventListener('click', this.unlikeCardEvent);
  }


  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = `Фотография ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-count').textContent = this._likes.length;

    //like btn
    this._buttonLike = this._element.querySelector('.element__btn');
    this.cardElement = this._buttonLike.closest('.element');

    //делает лайк активным
    if (this._checkLikes(this.cardObject, this.cardElement)) {
      this._buttonLike.classList.add('element__btn_active');
      this._buttonLikeActive = this._element.querySelector('.element__btn_active');
      this._buttonLikeActive.addEventListener('click', this.unlikeCardEvent);

    } else {
      this._buttonLike.addEventListener('click', this.likeCardEvent);
    };
    this._getLikeCard(this.cardObject, this.cardElement);
    this._setEventListeners();

    return this._element;
  }
}
