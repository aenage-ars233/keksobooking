const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

function toInActiveStatus() {
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  mapFiltersForm.classList.add('map__filters--disabled');
  const inputs = mapFiltersForm.querySelectorAll('input, select');
  inputs.forEach((input) => {
    input.disabled = true;
  });
}
toInActiveStatus();

function toActiveStatus() {
  adForm.classList.remove('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  mapFiltersForm.classList.remove('map__filters--disabled');
  const inputs = mapFiltersForm.querySelectorAll('input, select');
  inputs.forEach((input) => {
    input.disabled = false;
  });
}
toActiveStatus();

export {toActiveStatus};
