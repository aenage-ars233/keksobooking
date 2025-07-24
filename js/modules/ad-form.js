const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('input, select');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormInputs = mapFiltersForm.querySelector('input, select');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--wide'
});

function toInactiveStatus() {
  adForm.classList.add('ad-form--disabled');
  for (const adFormInput of adFormInputs) {
    adFormInput.disabled = true;
  }
  mapFiltersForm.classList.add('map__filters--disabled');
  for (const mapFiltersFormInput of mapFiltersFormInputs) {
    mapFiltersFormInput.disabled = true;
  }
}
toInactiveStatus();

function toActiveStatus() {
  adForm.classList.remove('ad-form--disabled');
  for (const adFormInput of adFormInputs) {
    adFormInput.disabled = false;
  }
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (const mapFiltersFormInput of mapFiltersFormInputs) {
    mapFiltersFormInput.disabled = false;
  }
}
toActiveStatus();

// Валидация

const roomsField = adForm.querySelector('[name="rooms"]');
const guestsField = adForm.querySelector('[name="capacity"]');
const guestsInRooms = {
  '1': ['0', '1'],
  '2': ['0', '1', '2'],
  '3':['0', '1', '2', '3'],
  '100': ['0']
};

function validateGuestsINRooms() {
  return guestsInRooms[roomsField.value].includes(guestsField.value);
}

function guestsInRoomsErrorMessage() {
  if (roomsField.value === '100' && guestsField.value !== '0') {
    return '100 комнат не предназначены для гостей';
  }
  return `Невозможно разместить ${guestsField.value} гостей в ${roomsField.value} комнатах.`;
}

pristine.addValidator(roomsField, validateGuestsINRooms, guestsInRoomsErrorMessage);
pristine.addValidator(guestsField, validateGuestsINRooms, guestsInRoomsErrorMessage);

const typeHomeSelect = adForm.querySelector('[name="type"]');
const priceField = adForm.querySelector('#price');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validatePrice(value) {
  return value.length && Number(value) >= minPrice[typeHomeSelect.value];
}

function priceErrorMessage() {
  return `Для ${typeHomeSelect.value}, минимальная цена - ${minPrice[typeHomeSelect.value]} руб.`;
}

pristine.addValidator(priceField, validatePrice, priceErrorMessage);

const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

timeinSelect.addEventListener('change', () => {
  const timeoutSelectOption = timeoutSelect.querySelector(`[value="${timeinSelect.value}"]`);
  timeoutSelectOption.selected = true;
});

timeoutSelect.addEventListener('change', () => {
  const timeinSelectOption = timeinSelect.querySelector(`[value="${timeoutSelect.value}"]`);
  timeinSelectOption.selected = true;
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
