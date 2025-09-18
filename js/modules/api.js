function getData(onSuccess, onError) {
  fetch('https://25.javascript.htmlacademy.pro/keksobooking/data')
    .then((responce) => {
      if (responce.ok) {
        return responce;
      }
      onError('Не удалось загрузить объявления! Попробуйте перезагрузить!');
    })
    .then((responce) => responce.json())
    .then(((offers) => {
      onSuccess(offers);
    }))
    .catch(() => {
      onError('Не удалось загрузить объявления! Попробуйте перезагрузить!');
    });
}

function sendData(onSuccess, onError, data) {
  fetch('https://25.javascript.htmlacademy.pro/keksobooking', {
    method: 'POST',
    body: data
  }).then((responce) => {
    if (responce.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => {
    onError();
  });
}

export {getData, sendData};
