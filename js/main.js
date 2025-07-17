import { getOffers } from './modules/data.js';
import { renderOffers } from './modules/offers.js';

renderOffers(getOffers());
