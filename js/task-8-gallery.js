import DefaultGallery from './gallery-items.js'

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
    modalImage: document.querySelector('.lightbox__image'),
    modalOverlay: document.querySelector('.lightbox__overlay')
};

let currentIndex;
function createMarkup (elements) {
    return elements.map(({original, preview, desc}, currentIndex) => {
      return  `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${desc}"
      data-index="${currentIndex}"
    />
  </a>
</li>
    `;
    }).join('');

};
refs.galleryList.insertAdjacentHTML('beforeend', createMarkup(DefaultGallery));


refs.galleryList.addEventListener('click', onOpenModal);

refs.modalOverlay.addEventListener('click', onCloseModal);

function onOpenModal(ev) {
    ev.preventDefault();

    if (ev.target.nodeName !== "IMG") {
        return;
    }

    refs.modal.classList.add('is-open');

    document.addEventListener('keydown', onPressHandler);

        refs.modalImage.src = ev.target.dataset.source;
    refs.modalImage.alt = ev.target.alt;

    currentIndex = Number(ev.target.dataset.index);

        refs.modalCloseBtn.addEventListener('click', onCloseModal, ({ once: true }))

}

function onCloseModal() {

    refs.modal.classList.remove('is-open');
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
}



function moveImageLeft(ev) {

    if (currentIndex === 0) { currentIndex = DefaultGallery.length; }

    currentIndex -= 1;

    const previousPic = DefaultGallery[currentIndex].original;

    refs.modalImage.setAttribute("src", previousPic);

    refs.modalImage.setAttribute("alt", previousPic);

}

function moveImageRight(ev) {

      if (currentIndex === DefaultGallery.length - 1) {
        currentIndex = -1;
        }
        currentIndex += 1;
    const nextPic = DefaultGallery[currentIndex].original;

    refs.modalImage.setAttribute("src", nextPic);
    refs.modalImage.setAttribute("alt", nextPic);

    }

function onPressHandler(ev) {
    if (ev.code === "Escape" || ev.currentTarget === refs.modalOverlay) onCloseModal();
    if (ev.code === 'ArrowLeft') moveImageLeft();
    if (ev.code === 'ArrowRight') moveImageRight();
    }