import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';
import { startFilters } from './modules/map-filters.js';
import './modules/form.js';

getData((offers) => {
  startFilters(offers);
}, (errorMessage) => {
  showAlert(errorMessage);
});
