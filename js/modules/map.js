import { toActiveStatus } from './page-status.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const addressField = document.querySelector('#address');

/* Загрузка и инициализация карты */
const map = L.map('map-canvas');
map.setView({
  lat: 35.82,
  lng: 139.76,
}, 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/* Главный маркер */
addressField.value = '35.82, 139.76';
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainMarker = L.marker({
  lat: 35.70,
  lng: 139.76
}, {
  draggable: true,
  icon: mainPinIcon,
});
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const coordinats = evt.target.getLatLng();
  addressField.value = `${coordinats.lat.toFixed(5)}, ${coordinats.lng.toFixed(5)}`;
});

/* Рендер похожих объявлений */

function translateHomeType(homeType) {
  switch (homeType) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
}

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function createOffer({author, offer}) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = translateHomeType(offer.type);
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__description').textContent = offer.description;

  const featuresContainer = card.querySelector('.popup__features');
  featuresContainer.textContent = '';
  if (Object.hasOwn(offer, 'features')) {
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresContainer.append(featureElement);
    });
  }

  const photosContainer = cardTemplate.querySelector('.popup__photos');
  photosContainer.textContent = '';
  if (Object.hasOwn(offer, 'photos')) {
    for (let i = 0; i < offer.photos.length; i++) {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = offer.photos[i];
      photoElement.width = 45;
      photoElement.height = 40;
      photosContainer.append(photoElement);
    }
  }

  return card;
}

const markerGroup = L.layerGroup().addTo(map);

function renderOffers(offers) {
  markerGroup.clearLayers();
  offers.forEach((offer) => {
    const marker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    }, {
      icon
    });
    marker.addTo(markerGroup);
    const offerElement = createOffer(offer);
    marker.bindPopup(offerElement);
  });
  toActiveStatus();
}

/* Сброс */

function resetMap() {
  map.setView({
    lat: 35.82,
    lng: 139.76,
  }, 10);
  mainMarker.setLatLng({
    lat: 35.82,
    lng: 139.76
  });
  addressField.value = '35.82, 139.76';
}

export {renderOffers, resetMap};
