export default class Card {
  constructor(cardData, cardTemplate, handleOpenImagePopup, setLikeCard, checkLikes,
    unlikeCard, userId, getCard) {
    this.cardObject = cardData;
    this.cardId = cardData._id;
    this.cardOwnerId = cardData.owner._id;
    this._link = cardData.link;
    this._name = cardData.name;
    this._likes = cardData.likes;
    this.userId = userId;
    this._templateSelector = cardTemplate;
    this._handleOpenImagePopup = handleOpenImagePopup;
    this._setLikeCard = setLikeCard;
    this._checkLikes = checkLikes;
    this._unlikeCard = unlikeCard;
    this._getCard = getCard;
    this.likeCardEvent = this.likeCardEvent.bind(this);
    this.unlikeCardEvent = this.unlikeCardEvent.bind(this);
    this.toggleLikeActiveClass = this.toggleLikeActiveClass.bind(this);
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

    //удаление карточки
    if (this.userId === this.cardOwnerId) {
      this._buttonDeleteCard = this._element.querySelector('.element__btn-delete');
      this._buttonDeleteCard.addEventListener('click', () => {
        this.cardElement = this._buttonDeleteCard.closest('.element');
        this._getCard(this);
      })
    };

    //лайк карточки
    if (this._resultCheckLikes) {
      this._buttonLikeActive.addEventListener('click', this.unlikeCardEvent);
    } else {
      this.buttonLike.addEventListener('click', this.likeCardEvent);
    }
  }

  toggleLikeActiveClass() {
    this.buttonLike.classList.toggle('element__btn_active');
  }

  likeCardEvent() {
    this._setLikeCard(this);
  }

  unlikeCardEvent() {
    this._unlikeCard(this);
  }

  addLike(res) {
    this.toggleLikeActiveClass();
    this.buttonLike.addEventListener('click', this.unlikeCardEvent);
    this.buttonLike.removeEventListener('click', this.likeCardEvent);
    this.getLikeCard(res);
  }

  removeLike(res) {
    this.toggleLikeActiveClass();
    this.buttonLike.addEventListener('click', this.likeCardEvent);
    this.buttonLike.removeEventListener('click', this.unlikeCardEvent);
    this.getLikeCard(res);
  }

  getLikeCard(card) {
    this.likeCount = card.likes.length
    this._likeCountElement.textContent = this.likeCount;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = `Фотография ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likeCountElement = this._element.querySelector('.element__like-count');
    this._likeCountElement.textContent = this._likes.length;

    //like btn
    this.buttonLike = this._element.querySelector('.element__btn');
    this.cardElement = this.buttonLike.closest('.element');

    //делает лайк активным
    this._resultCheckLikes = this._checkLikes(this.cardObject, this.cardElement);
    if (this._resultCheckLikes) {
      this.buttonLike.classList.add('element__btn_active');
      this._buttonLikeActive = this._element.querySelector('.element__btn_active');
    };

    this.getLikeCard(this.cardObject);

    this._setEventListeners();

    return this._element;
  }
}
