import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const valueDaysEl = document.querySelector('span[data-days]');
const valueHoursEl = document.querySelector('span[data-hours]');
const valueMinutesEl = document.querySelector('span[data-minutes]');
const valueSecondsEl = document.querySelector('span[data-seconds]');

btnStartEl.disabled = true;
btnStartEl.style.borderColor = 'currentcolor';

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = Date.now();
    if (selectedDates[0].getTime() <= date) {
      btnStartEl.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }
    btnStartEl.disabled = false;
    btnStartEl.style.borderColor = 'red';

    btnStartEl.addEventListener('click', () => {
      timerId = setInterval(() => {
        const date = Date.now();
        const ms = selectedDates[0].getTime() - date;
        if (ms <= 0) {
          clearInterval(timerId);

          return;
        }

        const convert = convertMs(ms);
        btnStartEl.disabled = true;
        btnStartEl.style.borderColor = 'currentcolor';
        valueDaysEl.textContent = convert.days;
        valueHoursEl.textContent = convert.hours;
        valueMinutesEl.textContent = convert.minutes;
        valueSecondsEl.textContent = convert.seconds;
      }, 1000);
    });
  },
};
flatpickr(inputEl, options);

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));

  const hours = pad(Math.floor((ms % day) / hour));

  const minutes = pad(Math.floor(((ms % day) % hour) / minute));

  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
