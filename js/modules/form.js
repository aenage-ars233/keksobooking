const adForm = document.querySelector('.ad-form');
const roomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

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

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
