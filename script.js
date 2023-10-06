import Calculator from './Calculator.js';

const currentOperandDisplay = document.querySelector('[data-current-operand]');
const previousOperandDisplay = document.querySelector(
  '[data-previous-operand]'
);
const operationDisplay = document.querySelector('[data-operation]');

const calculator = new Calculator(
  currentOperandDisplay,
  previousOperandDisplay,
  operationDisplay
);

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-all-clear]')) {
    calculator.clear();
  }

  if (e.target.matches('[data-number]')) {
    calculator.addDigit(e.target.textContent);
  }

  if (e.target.matches('[data-delete]')) {
    calculator.removeDigit();
  }

  if (e.target.matches('[data-operation]')) {
    calculator.chooseOperation(e.target.textContent);
  }

  if (e.target.matches('[data-equals]')) {
    calculator.evaluate();
  }
});
