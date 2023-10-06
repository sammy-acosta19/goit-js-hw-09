import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import * as Notiflix from 'notiflix'; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      document.getElementById("datetime-picker").disabled = true;
    } else {
      document.getElementById("datetime-picker").disabled = false;
      document.querySelector('[data-start]').disabled = false; 
    }
  },
};

flatpickr("#datetime-picker", options);

let countdownInterval;

document.querySelector('[data-start]').addEventListener("click", () => {
  const selectedDate = new Date(document.getElementById("datetime-picker").value);
  const now = new Date();

  if (selectedDate <= now) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }

  countdownInterval = setInterval(() => {
    const timeLeft = selectedDate - now;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      Notiflix.Notify.success("Countdown completed!");
      document.querySelector('[data-start]').disabled = false; // Habilita el botón "Start" nuevamente
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer(days, hours, minutes, seconds);
    }
    now.setSeconds(now.getSeconds() + 1);
  }, 1000);

  document.querySelector('[data-start]').disabled = true; // Deshabilita el botón "Start" después de hacer clic
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}



