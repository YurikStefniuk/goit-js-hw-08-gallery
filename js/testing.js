// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
//     пока грузится изображение, мы не видели предыдущее.



import itemsDefault from './gallery-items.js';

const refs = {
    galeryList = document.querySelector('js-gallery')
    
}

const createGalleryMarkup = (elenemt) => {
    return elenemt.map(({ preview, original, description })=>
    {
    return`  <li class="gallery__item">
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
  </li> `
  }  
    )
}
    console.log(createGalleryMarkup);