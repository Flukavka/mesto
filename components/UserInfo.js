export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector) {
    this._nameElement = document.querySelector(userNameSelector);
    this._professionElement = document.querySelector(userProfessionSelector);
  }

  getUserInfo() {
    const userData = {};

    userData.name = this._nameElement.textContent;
    userData.profession = this._professionElement.textContent;
    return userData;
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._professionElement.textContent = userData.profession;
  }
}
