import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let countdownIntervalId;

const countdown = (targetDate) => {
  countdownIntervalId = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(countdownIntervalId);
      Notify.failure("Please choose a date in the future");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;

    if (distance === 0) {
      clearInterval(countdownIntervalId);
    }
  }, 1000);
};

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() <= new Date().getTime()) {
      Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
      return;
    }

    startButton.disabled = false;
    startButton.addEventListener("click", () => {
      countdown(selectedDate);
      startButton.disabled = true;
    });
  },
});