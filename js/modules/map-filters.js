import { renderOffers } from './map.js';

let allOffers = [];
let filterOffers = [];

function startFilters(offers) {
  allOffers = offers;
  renderOffers(offers.slice(0, 10));
}

const housingTypeSelect = document.querySelector('#housing-type');
const housingPriceSelect = document.querySelector('#housing-price');
const housingRoomsSelect = document.querySelector('#housing-rooms');
const housingGuestsSelect = document.querySelector('#housing-guests');
const housingFeaturesFieldset = document.querySelector('#housing-features');
const housingFeatures = housingFeaturesFieldset.querySelectorAll('input[type="checkbox"]');

function updateOffers() {
  filterOffers = allOffers;

  if (housingTypeSelect.value !== 'any') {
    filterOffers = filterOffers.filter((offer) => offer.offer.type === housingTypeSelect.value);
  }

  if (housingPriceSelect.value !== 'any') {
    switch (housingPriceSelect.value) {
      case 'low':
        filterOffers = filterOffers.filter((offer) => offer.offer.price < 10000);
        break;
      case 'middle':
        filterOffers = filterOffers.filter((offer) => offer.offer.price >= 10000 && offer.offer.price < 50000);
        break;
      case 'high':
        filterOffers = filterOffers.filter((offer) => offer.offer.price >= 50000);
        break;
    }
  }

  if (housingRoomsSelect.value !== 'any') {
    filterOffers = filterOffers.filter((offer) => offer.offer.rooms === Number(housingRoomsSelect.value));
  }

  if (housingGuestsSelect.value !== 'any') {
    filterOffers = filterOffers.filter((offer) => offer.offer.guests === Number(housingGuestsSelect.value));
  }

  housingFeatures.forEach((housingFeature) => {
    if (housingFeature.checked) {
      filterOffers = filterOffers.filter((offer) => {
        if (Object.hasOwn(offer.offer, 'features')) {
          return offer.offer.features.includes(housingFeature.value);
        }
        return false;
      });
    }
  });

  renderOffers(filterOffers.slice(0, 10));
}


housingTypeSelect.addEventListener('change', updateOffers);
housingPriceSelect.addEventListener('change', updateOffers);
housingRoomsSelect.addEventListener('change', updateOffers);
housingGuestsSelect.addEventListener('change', updateOffers);
housingFeaturesFieldset.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'INPUT') {
    updateOffers();
  }
});

export {startFilters};
