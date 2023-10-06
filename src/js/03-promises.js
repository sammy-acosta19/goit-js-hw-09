import * as Notiflix from 'notiflix'; 

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.querySelector('[name="delay"]').value);
  const delayStep = parseInt(this.querySelector('[name="step"]').value);
  const amount = parseInt(this.querySelector('[name="amount"]').value);

  createPromises(firstDelay, delayStep, amount);
});

function createPromises(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}



