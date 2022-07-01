class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    // If there is only one .
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    const previousValue = parseFloat(this.previousOperand);
    const currentValue = parseFloat(this.currentOperand);
    if (isNaN(previousValue) || isNaN(currentValue)) return;
    let answer;
    switch (this.operation) {
      case '÷':
        answer = previousValue / currentValue;
        break;
      case '*':
        answer = previousValue * currentValue;
        break;
      case '+':
        answer = previousValue + currentValue;
        break;
      case '-':
        answer = previousValue - currentValue;
        break;
      default:
        break;
    }
    this.currentOperand = answer;
    this.previousOperand = '';
    this.operation = undefined;
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerPart = parseFloat(stringNumber.split('.')[0]);
    const decimalPart = stringNumber.split('.')[1];
    let integerDisplay;
    // when user hits .
    if (isNaN(integerPart)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerPart.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    // this means user clicked on a .
    if (decimalPart != null) {
      return `${integerDisplay}.${decimalPart}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equal]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const previousOperandTextElemnet = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElemnet = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElemnet,
  currentOperandTextElemnet
);

// For clear button
clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

// For delete button
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

// For equals button
equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

// For all the number buttons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// For all the operation buttons
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
