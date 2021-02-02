'use strict';

import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  image: document.createElement('img'),
  lightbox: document.querySelector('.lightbox'),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector('.lightbox__content'),
  lightbox__image: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('div.lightbox__overlay'),
};

const createGalleryElem = ({ preview, original, description }) =>
  `<li class="gallery__item"><a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}/>
  </a>
  </li>`;
const galleryMarkup = images.reduce(
  (acc, elem) => acc + createGalleryElem(elem),
  '',
);

refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

refs.image.classList.add('gallery__image');

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  refs.overlay.addEventListener('click', closeOverlay);
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    refs.lightbox.classList.add('is-open');
    refs.lightbox__image.src = event.target.getAttribute('data-source');
    refs.lightbox__image.alt = event.target.alt;
  }
  window.addEventListener('keyup', clickKey);
}

function closeLightBoxBtn() {
  refs.btn.addEventListener('click', closeLightBoxBtn);
  refs.lightbox.classList.remove('is-open');
  refs.lightbox__image.src = '';
  refs.lightbox__image.alt = '';
  window.removeEventListener('keyup', clickKey);
  refs.overlay.removeEventListener('click', closeOverlay);
}

//Закрытие модального окна по нажатию клавиши ESC.

function clickKey(event) {
  if (event.code === 'Escape') {
    closeLightBoxBtn();
  }
}

//Закрытие модального окна по клику на div.lightbox__overlay.

function closeOverlay(event) {
  if (event.target === event.currentTarget) {
    closeLightBoxBtn();
  }
}
