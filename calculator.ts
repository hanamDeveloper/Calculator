enum Operator {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "x",
  DIVIDE = "÷",
  REMAINDER = "%",
}

let displayValue = "0";
let firstOperand: number | null = null;
let waitingForSecondOperand = false;
let operator: Operator | null = null;

function clear() {
  displayValue = "0";
  firstOperand = null;
  waitingForSecondOperand = false;
  operator = null;
}

function inputDigit(digit: string) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    displayValue = "0.";
    waitingForSecondOperand = false;
  } else if (displayValue.indexOf(".") === -1) {
    displayValue += ".";
  }
}

function handleOperator(nextOperator: Operator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else {
    const result = calculate();
    displayValue = `${result}`;
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate() {
  const inputValue = parseFloat(displayValue);

  if (firstOperand === null || operator === null) {
    return inputValue;
  }

  let result: number;
  switch (operator) {
    case Operator.ADD:
      result = firstOperand + inputValue;
      break;
    case Operator.SUBTRACT:
      result = firstOperand - inputValue;
      break;
    case Operator.MULTIPLY:
      result = firstOperand * inputValue;
      break;
    case Operator.DIVIDE:
      result = firstOperand / inputValue;
      break;
    case Operator.REMAINDER:
      result = firstOperand % inputValue;
      break;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }

  return result;
}

function updateDisplay() {
  const calculatorDisplay = document.querySelector(".calculator-display");
  if (calculatorDisplay) {
    calculatorDisplay.textContent = displayValue;
  }
}

function initialize() {
  clear();
  updateDisplay();
}

function onClickOperator(_operator: string) {
  switch (_operator) {
    case "C":
      clear();
      break;
    case ".":
      inputDecimal();
      break;
    case "+":
    case "-":
    case "x":
    case "÷":
    case "%":
      handleOperator(_operator as Operator);
      break;
    case "=":
      if (operator && !waitingForSecondOperand) {
        const result = calculate();
        displayValue = `${result}`;
        firstOperand = result;
        operator = null;
      } else if (operator && waitingForSecondOperand) {
        const result = calculate();
        displayValue = `${result}`;
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = false;
      }
      break;
    case "+/-":
      changePlusMinus();
      break;
    default:
      break;
  }
  updateDisplay();
}

function isMinus(number: number | string) {
  return String(number).includes("-");
}

function changePlusMinus() {
  if (firstOperand === null) return;
  if (isMinus(firstOperand)) {
    const changeNumber = String(firstOperand).replace("-", "");
    displayValue = changeNumber;
    firstOperand = Number(changeNumber);
  } else {
    displayValue = `-${firstOperand}`;
    firstOperand = Number(`-${firstOperand}`);
  }
}

function onClickNumber(number: number) {
  inputDigit(String(number));

  updateDisplay();
}

document.addEventListener("DOMContentLoaded", initialize);
