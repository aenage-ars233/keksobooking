const mapContainer = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

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

function createOffer(offer) {
  cardTemplate.querySelector('.popup__title').textContent = offer.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  cardTemplate.querySelector('.popup__type').textContent = translateHomeType(offer.offer.type);
  cardTemplate.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  cardTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  cardTemplate.querySelector('.popup__description').textContent = offer.offer.description;
  cardTemplate.querySelector('.popup__avatar').src = offer.author.avatar;

  const featureItems = cardTemplate.querySelectorAll('.popup__feature');
  featureItems.forEach((featureItem) => {
    const classString = featureItem.classList[1].slice(16);
    if (!offer.offer.features.includes(classString)) {
      featureItem.remove();
    }
  });

  const photosContainer = cardTemplate.querySelector('.popup__photos');
  photosContainer.textContent = '';
  for (let i = 0; i < offer.offer.photos.length; i++) {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = offer.offer.photos[i];
    photoElement.width = 45;
    photoElement.height = 40;
    photosContainer.append(photoElement);
  }

  return cardTemplate;
}

function renderOffers(offers) {
  const offerElement = createOffer(offers[0]);
  mapContainer.append(offerElement);
}

export {renderOffers};
