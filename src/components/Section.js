export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems() {
    this._items.forEach(item => {
      this._renderer(item)
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
