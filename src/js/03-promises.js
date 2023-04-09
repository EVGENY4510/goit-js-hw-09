import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let delayNumb = Number(delay.value);
  const stepNumb = Number(step.value);
  for (let i = 1; i <= amount.value; i++) {
    delayNumb += stepNumb;
    let x = delayNumb - stepNumb;

    createPromise(i, x)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const promisObject = {};
    setTimeout(() => {
      promisObject.position = position;
      promisObject.delay = delay;
      if (shouldResolve) {
        resolve(promisObject);
      } else {
        reject(promisObject);
      }
    }, delay);
  });
}
