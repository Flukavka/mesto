export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector, userAvatar) {
    this._nameElement = document.querySelector(userNameSelector);
    this._professionElement = document.querySelector(userProfessionSelector);
    this._userAvatarElement = document.querySelector(userAvatar);
  }

  getUserInfo(data) {
    const userData = {};
    userData.name = data.name;
    userData.about = data.about;
    userData.avatar = data.avatar;
    userData._id = data._id;

    return userData;
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._professionElement.textContent = userData.about;
    return userData;
  }

  setUserAvatar(userData) {
    this._userAvatarElement.src = userData.avatar;

    return userData;
  }
}
