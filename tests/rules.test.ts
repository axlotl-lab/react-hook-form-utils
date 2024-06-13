
import { RulesMessageConfig, maxLengthRule, minLengthRule, overrideRuleMessages, patternRule, requiredRule } from "./../src/utils/rules";

describe('rules utils: default global configuration', () => {
  it('should return correct objects with its attributes', () => {
    expect(requiredRule()).toStrictEqual({ required: "This field is required" });
    expect(minLengthRule(2)).toStrictEqual({ minLength: { value: 2, message: "Minimum 2 characters required" } });
    expect(maxLengthRule(2)).toStrictEqual({ maxLength: { message: "Up to 2 characters allowed", value: 2 } });
    expect(patternRule(/d/)).toStrictEqual({ pattern: { message: "Invalid value", value: /d/ } });
  });
});

describe('rules utils: custom messages', () => {
  const customErrorMessage = "Custom message";

  it('should return correct objects with its custom message', () => {
    expect(requiredRule(customErrorMessage)).toStrictEqual({ required: customErrorMessage });
    expect(minLengthRule({ value: 2, message: customErrorMessage })).toStrictEqual({ minLength: { value: 2, message: customErrorMessage } });
    expect(maxLengthRule({ value: 2, message: customErrorMessage })).toStrictEqual({ maxLength: { message: customErrorMessage, value: 2 } });
    expect(patternRule({ value: /d/, message: customErrorMessage })).toStrictEqual({ pattern: { message: customErrorMessage, value: /d/ } });
  });
});

describe('rules utils: passing lang attribute', () => {
  it('should return correct objects with default messages', () => {
    expect(requiredRule({ lang: 'en' })).toStrictEqual({ required: "This field is required" });
    expect(minLengthRule({ value: 2, lang: 'en' })).toStrictEqual({ minLength: { value: 2, message: "Minimum 2 characters required" } });
    expect(maxLengthRule({ value: 2, lang: 'en' })).toStrictEqual({ maxLength: { message: "Up to 2 characters allowed", value: 2 } });
    expect(patternRule({ value: /d/, lang: 'en' })).toStrictEqual({ pattern: { message: "Invalid value", value: /d/ } });
  });
});

describe('rules utils: custom global configuration', () => {
  const customErrorMessageEn = "Custom message";
  const customErrorMessageEs = "Mensaje custom";

  const customMessages: RulesMessageConfig = {
    messages: {
      required: { en: customErrorMessageEn, es: customErrorMessageEs },
      minLength: { en: customErrorMessageEn, es: customErrorMessageEs },
      maxLength: { en: customErrorMessageEn, es: customErrorMessageEs },
      pattern: { en: customErrorMessageEn, es: customErrorMessageEs }
    }
  }

  it('should return correct objects with its attributes using default lang (en)', () => {
    overrideRuleMessages(customMessages);

    expect(requiredRule()).toStrictEqual({ required: customErrorMessageEn });
    expect(minLengthRule(2)).toStrictEqual({ minLength: { value: 2, message: customErrorMessageEn } });
    expect(maxLengthRule(2)).toStrictEqual({ maxLength: { message: customErrorMessageEn, value: 2 } });
    expect(patternRule(/d/)).toStrictEqual({ pattern: { message: customErrorMessageEn, value: /d/ } });
  });

  it('should return correct objects with its attributes changing default lang to "es"', () => {
    overrideRuleMessages({ lang: "es", messages: customMessages.messages });

    expect(requiredRule()).toStrictEqual({ required: customErrorMessageEs });
    expect(minLengthRule(2)).toStrictEqual({ minLength: { value: 2, message: customErrorMessageEs } });
    expect(maxLengthRule(2)).toStrictEqual({ maxLength: { message: customErrorMessageEs, value: 2 } });
    expect(patternRule(/d/)).toStrictEqual({ pattern: { message: customErrorMessageEs, value: /d/ } });
  });
});