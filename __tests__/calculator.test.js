"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caclulator_1 = require("./caclulator");
describe("Calculator functions", () => {
    beforeEach(() => {
        (0, caclulator_1.clear)();
    });
    test("숫자 입력 후 디스플레이에 숫자 노출", () => {
        (0, caclulator_1.inputDigit)("5");
        expect(caclulator_1.displayValue).toEqual("5");
        (0, caclulator_1.inputDigit)("6");
        expect(caclulator_1.displayValue).toEqual("56");
    });
    test("소수점 숫자 입력 후 디스플레이 숫자 노출", () => {
        (0, caclulator_1.inputDecimal)();
        expect(caclulator_1.displayValue).toEqual("0.");
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.inputDecimal)();
        expect(caclulator_1.displayValue).toEqual("0.5");
    });
    test("연산자가 바뀌었을 경우 마지막에 입력받은 연산자로 입력되게끔 변경", () => {
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.ADD);
        expect(caclulator_1.firstOperand).toEqual(5);
        expect(caclulator_1.operator).toEqual(caclulator_1.Operator.ADD);
        (0, caclulator_1.inputDigit)("3");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.MULTIPLY);
        expect(caclulator_1.firstOperand).toEqual(8);
        expect(caclulator_1.operator).toEqual(caclulator_1.Operator.MULTIPLY);
    });
    test("양수라면 음수 음수라면 양수로 변경", () => {
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.onClickOperator)("+/-");
        expect(caclulator_1.firstOperand).toEqual(-5);
        expect(caclulator_1.displayValue).toEqual("-5");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.MULTIPLY);
        (0, caclulator_1.inputDigit)("3");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.firstOperand).toEqual(-15);
        expect(caclulator_1.displayValue).toEqual("-15");
    });
    test("연산자별 결과값 노출", () => {
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.ADD);
        (0, caclulator_1.inputDigit)("3");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.displayValue).toEqual("8");
        (0, caclulator_1.inputDigit)("2");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.MULTIPLY);
        (0, caclulator_1.inputDigit)("3");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.displayValue).toEqual("246");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.SUBTRACT);
        (0, caclulator_1.inputDigit)("7");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.displayValue).toEqual("239");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.DIVIDE);
        (0, caclulator_1.inputDigit)("2");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.displayValue).toEqual("119.5");
        (0, caclulator_1.inputDigit)("2");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.MULTIPLY);
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.displayValue).toEqual("597.6");
        (0, caclulator_1.clear)();
        expect(caclulator_1.displayValue).toEqual("0");
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.ADD);
        (0, caclulator_1.inputDigit)("55");
        (0, caclulator_1.onClickOperator)("=");
        expect(caclulator_1.displayValue).toEqual("60");
    });
    test("C 누를경우 전부 초기화", () => {
        (0, caclulator_1.inputDigit)("5");
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.SUBTRACT);
        (0, caclulator_1.onClickOperator)(caclulator_1.Operator.ADD);
        (0, caclulator_1.clear)();
        expect(caclulator_1.displayValue).toEqual("0");
        expect(caclulator_1.firstOperand).toEqual(null);
        expect(caclulator_1.operator).toEqual(null);
    });
});
