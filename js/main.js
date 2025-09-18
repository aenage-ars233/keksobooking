import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';
import { renderOffers } from './modules/map.js';
import './modules/form.js';

getData((offers) => {
  renderOffers(offers);
}, (errorMessage) => {
  showAlert(errorMessage);
});
