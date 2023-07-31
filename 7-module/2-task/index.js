import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  constructor() {
    this.elem = this.#render();
  }

  #template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());

    document.body.append(this.elem);
  }

  open() {
    let body = document.body;

    body.classList.add('is-modal-open');

    let buttonClose = document.querySelector('.modal__close');
  
    buttonClose.addEventListener('click', this.close);

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close()
      }
    }, {once: true})

    return this.elem;
  }
  
  close = () => {
    let body = document.body;
    let modal = document.querySelector('.modal');

    body.classList.remove('is-modal-open');

    if (modal != null ) {
      modal.remove();
    }
  }

  setTitle(title) {
    let modalTitle = document.querySelector('.modal__title');

    modalTitle.textContent = title;
  }

  setBody(body) {
    let modalBody = document.querySelector('.modal__body');

    modalBody.appendChild(body);
  }
}
