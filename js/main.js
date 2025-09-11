function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayElement(array) {
  return array[getRandomPositiveInteger(0, array.length - 1)];
}

function getRandomId(min, max, isAvatarId = false) {
  const previousValues = [];
  return function() {
    let currentValue = getRandomPositiveInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    if (isAvatarId && currentValue < 10) {
      currentValue = `0${currentValue}`;
    }
    return currentValue;
  };
}

// DATA

const generateAvatarId = getRandomId(1, 10, true);
const titles = ['Милая, уютная квартира в Токио', 'Отель Дель Луна', 'Трехкомнатная квартира в центре Токио'];
const descriptions = ['Хорошая квартира со всеми удобствами.', 'Три комнаты, а в каждой по холодильнику', 'Тут есть все!'];
const homeTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const homeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const homePhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function getFeature(_, featureIndex) {
  return homeFeatures[featureIndex];
}

function getPhoto(_, photoIndex) {
  return homePhotos[photoIndex];
}

function createOffer() {
  const locationLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${generateAvatarId()}.png`
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomPositiveInteger(0, 100000),
      type: getRandomArrayElement(homeTypes),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(1, 3),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      description: getRandomArrayElement(descriptions),
      features: Array.from({ length: getRandomPositiveInteger(1, 6) }, getFeature),
      photos: Array.from({ length: getRandomPositiveInteger(1, 3) }, getPhoto)
    },
    location: {
      lat: locationLat,
      lng: locationLng
    }
  };
}

function getOffers() {
  return Array.from(
    { length: 9 },
    createOffer
  );
}
getOffers();
