import { getOffers } from './modules/data.js';
import { renderOffers } from './modules/map.js';

renderOffers(getOffers());
