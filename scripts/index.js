// import { calculatePercentageComplete } from './util';

/**
 * Applies input logic to a set of input elements for time duration.
 * @param {string[]} inputIds - An array of input element IDs.
 */
function applyInputLogic(inputIds) {
  console.log('applyInputLogic', inputIds);
  const timeInputs = inputIds.map((id) => document.getElementById(id));

  timeInputs.forEach((input, index) => {
    // input.value = '00'; // Set initial value to 00
    input.addEventListener('focus', () => {
      input.select(); // Select all text when focused
    });

    input.addEventListener('keydown', (event) => {
      // if input is not selected, select it
      if (!input.selected && input.value === '00') {
        input.select();
      }
      if (event.key === 'Tab' || event.key === 'Shift') {
        return;
      }
      if (event.key !== 'Backspace' && isNaN(Number(event.key))) {
        event.preventDefault();
      }
    });

    input.addEventListener('input', (event) => {
      const enteredValue = event.target.value;
      const formattedValue = enteredValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters

      // If formatted value is empty, keep placeholder 00
      event.target.value =
        formattedValue.length > 0 ? formattedValue.slice(0, 2) : '00';

      // Focus management logic (unchanged from previous response)
      if (formattedValue.length === 2 && index < timeInputs.length - 1) {
        timeInputs[index + 1].focus();
      }

      // Limit minutes and seconds to 59
      if (index > 0 && formattedValue > 59) {
        event.target.value = 59; // Set to maximum value
        if (index < timeInputs.length - 1) {
          timeInputs[index + 1].focus(); // Advance focus to the next input
        }
      }
    });

    input.addEventListener('blur', (event) => {
      // If value is empty, set to 00
      if (event.target.value === '') {
        event.target.value = '00';
      } else {
        // Insert leading 0 for the first digit
        if (event.target.value.length === 1) {
          event.target.value = '0' + event.target.value;
        }
      }
    });
  });
}

function formatNumberInput(inputId) {
  const number = document.getElementById(inputId);

  number.addEventListener('input', (e) => {
    const enteredValue = e.target.value;
    const formattedValue = enteredValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    // Enforce both maximum length and numeric format
    e.target.value = formattedValue.slice(0, 4);
  });
}

// apply to Current Time inputs
applyInputLogic([
  'duration-complete-hours',
  'duration-complete-minutes',
  'duration-complete-seconds',
]);
// apply to Remaining Time inputs
applyInputLogic([
  'duration-remain-hours',
  'duration-remain-minutes',
  'duration-remain-seconds',
]);
// apply to Total Time inputs
applyInputLogic([
  'duration-total-hours',
  'duration-total-minutes',
  'duration-total-seconds',
]);

// apply to Number inputs
formatNumberInput('pages-read');
formatNumberInput('pages-left');
formatNumberInput('total-pages');
