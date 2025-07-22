import { getOffers } from './modules/data.js';
import { renderOffers } from './modules/offers.js';
import './modules/ad-form.js';

renderOffers(getOffers());
