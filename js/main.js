import { getOffers } from './modules/data.js';
import { renderOffers } from './modules/map.js';
import './modules/form.js';

renderOffers(getOffers());
