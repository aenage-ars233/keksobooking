const adForm = document.querySelector('.ad-form');
const roomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const typeHomeSelect = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const checkinSelect = adForm.querySelector('#timein');
const checkoutSelect = adForm.querySelector('#timeout');
const sliderElement = adForm.querySelector('.ad-form__slider');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error'
});

/* Количество комнат и мест */
const roomsGuestsRuleset = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function validateRooms(value) {
  return roomsGuestsRuleset[value].includes(capacitySelect.value);
}

function validateCapacity(value) {
  return value <= roomsSelect.value;
}

function getRoomsCapacityMessage() {
  if (roomsSelect.value === '100' && capacitySelect.value !== '0') {
    return '100 комнат не предназначены для гостей!';
  }

  return `Невозможно разместить ${capacitySelect.value} гостей в ${roomsSelect.value} комнатах`;
}

pristine.addValidator(roomsSelect, validateRooms, getRoomsCapacityMessage);
pristine.addValidator(capacitySelect, validateCapacity, getRoomsCapacityMessage);

/* Тип жилья */

let minPrice = 1000;

typeHomeSelect.addEventListener('change', () => {
  switch (typeHomeSelect.value) {
    case 'bungalow':
      priceField.min = 0;
      priceField.placeholder = '0';
      minPrice = 0;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minPrice,
          max: 100000,
        },
      });
      break;
    case 'flat':
      priceField.min = 1000;
      priceField.placeholder = '1000';
      minPrice = 1000;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minPrice,
          max: 100000,
        },
      });
      break;
    case 'hotel':
      priceField.min = 3000;
      priceField.placeholder = '3000';
      minPrice = 3000;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minPrice,
          max: 100000,
        },
      });
      break;
    case 'house':
      priceField.min = 5000;
      priceField.placeholder = '5000';
      minPrice = 5000;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minPrice,
          max: 100000,
        },
      });
      break;
    case 'palace':
      priceField.min = 10000;
      priceField.placeholder = '10000';
      minPrice = 10000;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minPrice,
          max: 100000,
        },
      });
      break;
  }
});

function validatePrice(value) {
  return Number(value) >= Number(minPrice);
}

function getMinPriceMessage() {
  return `Минимум ${minPrice} рублей!`;
}

pristine.addValidator(priceField, validatePrice, getMinPriceMessage);

/* Время заезда и выезда */

checkinSelect.addEventListener('change', () => {
  const similarOption = checkoutSelect.querySelector(`[value="${checkinSelect.value}"]`);
  similarOption.selected = true;
});

checkoutSelect.addEventListener('change', () => {
  const similarOption = checkinSelect.querySelector(`[value="${checkoutSelect.value}"]`);
  similarOption.selected = true;
});

/* Слайдер и цена */

priceField.value = 1000;

noUiSlider.create(sliderElement, {
  range: {
    min: 1000,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function(value) {
      return value.toFixed(0);
    },
    from: function(value) {
      return Number(value);
    }
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
