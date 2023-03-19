/**
 * Функция отвечает за включение валидаций у всех форм на странице
 * @param {object} param принимает дестрктуризированный объект
 */
const enableValidation = ({ formSelector, ...config }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    setEventListeners(formElement, inputList, config);
  })
};

//слушатель событий для всех полей форм
/**
 * Функция слушает события на изменения всех полей ввода в переданной
 * форме
 * @param {object} formElement текущая проверяемая форма
 * @param {array} inputList массив полей ввода
 * @param {object} config объект
 */
const setEventListeners = (formElement, inputList, config) => {

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, inputList, config);
    });
  });
};

/**
 * Функция проверяет валидность поля ввода формы
 * @param {object} formElement текущая проверяемая форма
 * @param {object} inputElement текущее проверяемое поле ввода
 */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/**
 * Функция, которая добавляет класс со стилизацией ошибки и показывает сообщение
 * с ошибкой для текущего поля ввода формы
 * @param {object} formElement текущая форма
 * @param {object} inputElement текущее поле ввода
 */
const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__input_field_${inputElement.name}`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.nextElementSibling.textContent = inputElement.validationMessage;
  errorElement.nextElementSibling.classList.add('popup__error_visible');
};

/**
 * Функция, которая удаляет класс со стилизацией ошибки и показывает сообщение
 * с ошибкой для текущего поля ввода формы
 * @param {object} formElement текущая форма
 * @param {object} inputElement текущее поле ввода
 */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__input_field_${inputElement.name}`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.nextElementSibling.classList.remove('popup__error_visible');
  errorElement.nextElementSibling.textContent = '';
};

/**
 * Функция делает активной и не активной кнопку формы
 * @param {object} formElement текущая форма
 * @param {array} inputList массив полей ввода текущей формы
 * @param {object} config объект
 */
const toggleButtonState = (formElement, inputList, config) => {
  const popupButton = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    popupButton.classList.add(config.inactiveButtonClass);
  } else {
    popupButton.classList.remove(config.inactiveButtonClass);
  }
};

/**
 * Функция проверяет есть ли среди переданных полей ввода не валидные
 * @param {array} inputList массив полей ввода текущей формы
 * @returns возвращает true в случае наличия хоть одного невалидного поля,
 * иначе false
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
