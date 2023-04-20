import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let countdownIntervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
      return;
    }

    startButton.disabled = false;

    startButton.addEventListener("click", () => {
      countdownIntervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = selectedDate.getTime() - now;

        if (distance < 0) {
          clearInterval(countdownIntervalId);
          countdownIntervalId = null;
          startButton.disabled = true;
          daysElement.textContent = "00";
          hoursElement.textContent = "00";
          minutesElement.textContent = "00";
          secondsElement.textContent = "00";
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, "0");
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
            .toString()
            .padStart(2, "0");
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          )
            .toString()
            .padStart(2, "0");
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, "0");

          daysElement.textContent = days;
          hoursElement.textContent = hours;
          minutesElement.textContent = minutes;
          secondsElement.textContent = seconds;
        }
      }, 1000);
    });
  },
};

flatpickr(dateTimePicker, options);