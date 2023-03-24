"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClickNumber = exports.changePlusMinus = exports.isMinus = exports.onClickOperator = exports.initialize = exports.updateDisplay = exports.calculate = exports.handleOperator = exports.inputDecimal = exports.inputDigit = exports.clear = exports.operator = exports.waitingForSecondOperand = exports.firstOperand = exports.displayValue = exports.Operator = void 0;
var Operator;
(function (Operator) {
    Operator["ADD"] = "+";
    Operator["SUBTRACT"] = "-";
    Operator["MULTIPLY"] = "x";
    Operator["DIVIDE"] = "\u00F7";
    Operator["REMAINDER"] = "%";
})(Operator = exports.Operator || (exports.Operator = {}));
exports.displayValue = "0";
exports.firstOperand = null;
exports.waitingForSecondOperand = false;
exports.operator = null;
function clear() {
    exports.displayValue = "0";
    exports.firstOperand = null;
    exports.waitingForSecondOperand = false;
    exports.operator = null;
}
exports.clear = clear;
function inputDigit(digit) {
    if (exports.waitingForSecondOperand) {
        exports.displayValue = digit;
        exports.waitingForSecondOperand = false;
    }
    else {
        exports.firstOperand = Number(exports.displayValue + digit);
        exports.displayValue = exports.displayValue === "0" ? digit : exports.displayValue + digit;
    }
}
exports.inputDigit = inputDigit;
function inputDecimal() {
    if (exports.waitingForSecondOperand) {
        exports.displayValue = "0.";
        exports.waitingForSecondOperand = false;
    }
    else if (exports.displayValue.indexOf(".") === -1) {
        exports.displayValue += ".";
    }
}
exports.inputDecimal = inputDecimal;
function handleOperator(nextOperator) {
    const inputValue = parseFloat(exports.displayValue);
    if (exports.operator && exports.waitingForSecondOperand) {
        exports.operator = nextOperator;
        exports.waitingForSecondOperand = false;
        return;
    }
    if (exports.firstOperand === null) {
        exports.firstOperand = inputValue;
    }
    else if (exports.operator) {
        const result = calculate();
        exports.displayValue = `${result}`;
        exports.firstOperand = result;
    }
    exports.waitingForSecondOperand = true;
    exports.operator = nextOperator;
}
exports.handleOperator = handleOperator;
function calculate() {
    const inputValue = parseFloat(exports.displayValue);
    if (exports.firstOperand === null || exports.operator === null) {
        return inputValue;
    }
    switch (exports.operator) {
        case Operator.ADD:
            return exports.firstOperand + inputValue;
        case Operator.SUBTRACT:
            return exports.firstOperand - inputValue;
        case Operator.MULTIPLY:
            return exports.firstOperand * inputValue;
        case Operator.DIVIDE:
            return exports.firstOperand / inputValue;
        case Operator.REMAINDER:
            return exports.firstOperand % inputValue;
        default:
            throw new Error(`Invalid operator: ${exports.operator}`);
    }
}
exports.calculate = calculate;
function updateDisplay() {
    const calculatorDisplay = document.querySelector(".calculator-display");
    if (calculatorDisplay) {
        calculatorDisplay.textContent = exports.displayValue;
    }
}
exports.updateDisplay = updateDisplay;
function initialize() {
    clear();
    updateDisplay();
}
exports.initialize = initialize;
function onClickOperator(_operator) {
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
            handleOperator(_operator);
            break;
        case "=":
            if (exports.operator && !exports.waitingForSecondOperand) {
                const result = calculate();
                exports.displayValue = `${result}`;
                exports.firstOperand = result;
                exports.operator = null;
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
exports.onClickOperator = onClickOperator;
function isMinus(number) {
    return String(number).includes("-");
}
exports.isMinus = isMinus;
function changePlusMinus() {
    if (exports.firstOperand === null)
        return;
    if (isMinus(exports.firstOperand)) {
        const changeNumber = String(exports.firstOperand).replace("-", "");
        exports.displayValue = changeNumber;
        exports.firstOperand = Number(changeNumber);
    }
    else {
        exports.displayValue = `-${exports.firstOperand}`;
        exports.firstOperand = Number(`-${exports.firstOperand}`);
    }
}
exports.changePlusMinus = changePlusMinus;
function onClickNumber(number) {
    inputDigit(String(number));
    updateDisplay();
}
exports.onClickNumber = onClickNumber;
