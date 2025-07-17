import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, createAvatar } from './util.js';

const titles = ['Однокомнатная квартира в центре', 'Двухкомнатная квартира в центре', 'Загородный дом', 'Трехкомнатная квартира в центре', 'Однокомнатная квартира на окраине Токио'];
const addresses = ['ул. Хвойтенко 21', 'ул Московская 2/1', 'переулок Си 38', 'мкр Камаз ул Рыскулова 5', 'пр Абая, дом 2', 'ул Шевченко 22'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const descriptions = ['Жильё - превосходное!', 'Замечательная, уютная квартира.', 'Хорошая квартира со всеми удобствами', 'Лучший дом района!', 'Выбирай - не задумываясь'];

function createFeatures (_, currentFeatureIndex) {
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  return features[currentFeatureIndex];
}

function createPhotos (_, currentPhotoIndex) {
  const photos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];
  return photos[currentPhotoIndex];
}

function createOffer () {
  return {
    author: {
      avatar: `img/avatars/user${createAvatar()}.png`
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: getRandomArrayElement(addresses),
      price: getRandomPositiveInteger(5000, 100000),
      type: getRandomArrayElement(types),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 8),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      features: Array.from({length: getRandomPositiveInteger(1, 6)}, createFeatures),
      description: getRandomArrayElement(descriptions),
      photos: Array.from({length: getRandomPositiveInteger(1, 3)}, createPhotos)
    },
    location: {
      lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
      lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
    }
  };
}

function getOffers() {
  return Array.from({length: 10}, createOffer);
}

export { getOffers };
