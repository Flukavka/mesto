import Card from "./Card";

export default class UserCard extends Card {
  constructor(cardData, cardTemplate, handleOpenImagePopup, getCard, setLikeCard, checkLikes, unlikeCard, getLikeCard) {
    super(cardData, cardTemplate, handleOpenImagePopup, setLikeCard);
    this._getCard = getCard;
    this.cardData = cardData;
    this._likes = cardData.likes;
    this._checkLikes = checkLikes;
    this._getLikeCard = getLikeCard;
    this._unlikeCard = unlikeCard;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._buttonDeleteCard = this._element.querySelector('.element__btn-delete');

    //open delete card popup
    this._buttonDeleteCard.addEventListener('click', () => {
      this.cardElement = this._buttonDeleteCard.closest('.element');
      this._getCard(this.cardData, this.cardElement);
    })
  }
}
