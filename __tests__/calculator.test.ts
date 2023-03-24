import {
  clear,
  inputDigit,
  inputDecimal,
  Operator,
  onClickOperator,
  displayValue,
  firstOperand,
  operator
} from "./caclulator";

describe("Calculator functions", () => {
  beforeEach(() => {
    clear();
  });

  test("숫자 입력 후 디스플레이에 숫자 노출", () => {
    inputDigit("5");
    expect(displayValue).toEqual("5");

    inputDigit("6");
    expect(displayValue).toEqual("56");
  });

  test("소수점 숫자 입력 후 디스플레이 숫자 노출", () => {
    inputDecimal();
    expect(displayValue).toEqual("0.");

    inputDigit("5");
    inputDecimal();
    expect(displayValue).toEqual("0.5");
  });

  test("연산자가 바뀌었을 경우 마지막에 입력받은 연산자로 입력되게끔 변경", () => {
    inputDigit("5");
    onClickOperator(Operator.ADD);
    expect(firstOperand).toEqual(5);
    expect(operator).toEqual(Operator.ADD);

    inputDigit("3");
    onClickOperator(Operator.MULTIPLY);
    expect(firstOperand).toEqual(8);
    expect(operator).toEqual(Operator.MULTIPLY);
  });

  test("양수라면 음수 음수라면 양수로 변경", () => {
    inputDigit("5");
    onClickOperator("+/-");
    expect(firstOperand).toEqual(-5);
    expect(displayValue).toEqual("-5");

    onClickOperator(Operator.MULTIPLY);
    inputDigit("3");
    
    onClickOperator("=");
    expect(firstOperand).toEqual(-15);
    expect(displayValue).toEqual("-15");
  });

  test("연산자별 결과값 노출", () => {
    inputDigit("5");
    onClickOperator(Operator.ADD);
    inputDigit("3");
    onClickOperator("=");
    expect(displayValue).toEqual("8");
    

    inputDigit("2");
    onClickOperator(Operator.MULTIPLY);
    inputDigit("3");
    onClickOperator("=");
    expect(displayValue).toEqual("246");
    

    onClickOperator(Operator.SUBTRACT);
    inputDigit("7");
    onClickOperator("=");
    expect(displayValue).toEqual("239");

    onClickOperator(Operator.DIVIDE);
    inputDigit("2");
    onClickOperator("=");
    expect(displayValue).toEqual("119.5");

    inputDigit("2");
    onClickOperator(Operator.MULTIPLY);
    inputDigit("5");
    onClickOperator("=");

    expect(displayValue).toEqual("597.6");

    clear();
    expect(displayValue).toEqual("0");
    inputDigit("5");
    onClickOperator(Operator.ADD);
    inputDigit("55");
    onClickOperator("=");
    expect(displayValue).toEqual("60");

  });

  test("C 누를경우 전부 초기화", () => {
    inputDigit("5");
    onClickOperator(Operator.SUBTRACT);
    onClickOperator(Operator.ADD);
    clear();
    expect(displayValue).toEqual("0");
    expect(firstOperand).toEqual(null);
    expect(operator).toEqual(null);
  });
});
