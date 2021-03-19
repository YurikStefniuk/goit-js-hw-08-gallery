import elements from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('ul.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  modalImg: document.querySelector('.lightbox__image'),
  modalBtn: document.querySelector('[data-action="close-lightbox"]'),
};

const imagesCards = createImageCards(elements);

refs.galleryContainer.insertAdjacentHTML('beforeend', imagesCards);
// refs.galleryContainer.insertAdjacentHTML('beforeend', createImageCards);

refs.galleryContainer.addEventListener('click', onImageClick);
refs.galleryContainer.addEventListener('click', onOpenModal);
refs.modalOverlay.addEventListener('click', onCloseModal);
refs.modalBtn.addEventListener('click', onCloseModal);


console.log(createImageCards(elements));

// function createImageCards({preview, original, description}) {
//   const galleryItem = document.createElement('li');
//         galleryItem.classList.add('gallery__item');
        
//       const galleryLink = document.createElement('a');
//       galleryLink.classList.add('gallery__link');
//       galleryLink.href = original;

//       const galleryImg = document.createElement(img);
//       galleryImg.classList.add('gallery__image');
//       galleryImg.src = preview;
//       galleryImg.dataset.source = original;
//       galleryImg.alt = description;

//       galleryItem.append(galleryLink, galleryImg);
//       return galleryItem;
// }

function createImageCards(elements) {
    return elements
    .map(({preview, original, description}) => {
      return `
      <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    }).join('');
}


function onImageClick(event) {
  event.preventDefault();
  // return event.target.dataset.sourse;
}


function onOpenModal(evt) {
  const activeImg = document.querySelector('is-open');
  refs.modalImg.src = evt.target.dataset.source;
  refs.modalImg.alt = evt.target.alt;
  if(activeImg) {
    refs.modal.classList.remove('is-open');
  }
  refs.modal.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal(evt) {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modal.classList.remove("is-open");
  refs.modalImg.src = "";
  refs.modalImg.alt = "";
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if(isEscKey) {
    onCloseModal(evt);
  }
}

