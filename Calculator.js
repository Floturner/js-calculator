export default class Calculator {
  constructor(currentOperandDisplay, previousOperandDisplay, operationDisplay) {
    this.#currentOperandDisplay = currentOperandDisplay;
    this.#previousOperandDisplay = previousOperandDisplay;
    this.#operationDisplay = operationDisplay;
    this.clear();
  }

  #currentOperandDisplay;
  #previousOperandDisplay;
  #operationDisplay;

  get currentOperand() {
    return parseFloat(this.#currentOperandDisplay.dataset.value);
  }

  set currentOperand(value) {
    this.#currentOperandDisplay.dataset.value = value ?? '';
    this.#currentOperandDisplay.textContent = displayNumber(value);
  }

  get previousOperand() {
    return parseFloat(this.#previousOperandDisplay.dataset.value);
  }

  set previousOperand(value) {
    this.#previousOperandDisplay.dataset.value = value ?? '';
    this.#previousOperandDisplay.textContent = displayNumber(value);
  }

  get operation() {
    return this.#operationDisplay.textContent;
  }

  set operation(value) {
    this.#operationDisplay.textContent = value ?? '';
  }

  addDigit(digit) {
    const currentDatasetValue = this.#currentOperandDisplay.dataset.value;
    if (digit === '.' && currentDatasetValue.includes('.')) return;
    if (this.currentOperand === 0) {
      this.currentOperand = digit;
      return;
    }
    this.currentOperand = currentDatasetValue + digit;
  }

  removeDigit() {
    const numberString = this.#currentOperandDisplay.dataset.value;
    if (numberString.length <= 1) {
      this.currentOperand = 0;
      return;
    }
    this.currentOperand = numberString.substring(0, numberString.length - 1);
  }

  chooseOperation(operation) {
    if (this.operation !== '') return;
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = 0;
  }

  evaluate() {
    let result;
    switch (this.operation) {
      case '*':
        result = this.previousOperand * this.currentOperand;
        break;
      case '÷':
        result = this.previousOperand / this.currentOperand;
        break;
      case '+':
        result = this.previousOperand + this.currentOperand;
        break;
      case '-':
        result = this.previousOperand - this.currentOperand;
        break;
      default:
        return;
    }

    this.clear();
    this.currentOperand = result;

    return result;
  }

  clear() {
    this.currentOperand = 0;
    this.previousOperand = null;
    this.operation = null;
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en', {
  maximumFractionDigits: 20,
});

function displayNumber(number) {
  const stringNumber = number?.toString() || '';
  if (stringNumber === '') return '';
  const [integer, decimal] = stringNumber.split('.');
  const formattedInteger = NUMBER_FORMATTER.format(integer);
  if (decimal == null) return formattedInteger;
  return `${formattedInteger}.${decimal}`;
}
