export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector, userAvatar) {
    this._nameElement = document.querySelector(userNameSelector);
    this._professionElement = document.querySelector(userProfessionSelector);
    this._userAvatarElement = document.querySelector(userAvatar);
    this.userId;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._professionElement.textContent,
      _id: this.userId
    }
  }

  setUserInfo({ name, about, _id }) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = about;
    this.userId = _id;
  }

  setUserAvatar(userData) {
    this._userAvatarElement.src = userData.avatar;
    return userData;
  }
}
