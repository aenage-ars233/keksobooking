const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('input, select');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormInputs = mapFiltersForm.querySelector('input, select');

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
