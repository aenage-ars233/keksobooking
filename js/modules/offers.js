const container = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function sayType (type) {
  switch (type) {
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

function createOffer (data) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = data.offer.title;
  card.querySelector('.popup__text--address').textContent = data.offer.address;
  card.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = sayType(data.offer.type);
  card.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = '';
  data.offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${feature}`);
    featuresList.append(featureElement);
  });
  card.querySelector('.popup__description').textContent = data.offer.description;
  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = '';
  data.offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.alt = '';
    photoElement.classList.add('popup__photo');
    photoElement.style.width = '45px';
    photoElement.style.height = '40px';
    photosList.append(photoElement);
  });
  card.querySelector('.popup__avatar').src = data.author.avatar;

  return card;
}

function renderOffers (offers) {
  const offerElement = createOffer(offers[0]);
  container.append(offerElement);
}

export {renderOffers};
