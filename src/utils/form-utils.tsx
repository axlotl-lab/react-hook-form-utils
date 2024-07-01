import { Asterisk, Check, X } from "lucide-react";
import React from "react";
import { ControllerFieldState } from "react-hook-form";
import { FieldContainerProps } from "../components/field-container";
import { FormFieldRules } from "../types/form-types";

type FromStates = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
}

const isFieldPristine = (states: FromStates) => {
  return !states.isDirty && !states.isTouched;
}

const isFieldValid = (states: FromStates) => {
  return !states.invalid && !isFieldPristine(states) && states.isDirty;
}

const calculateFieldStateDecorator = (states: FromStates, value: string | undefined, required?: boolean): Partial<FieldContainerProps> => {
  const fieldState = {
    isValid: isFieldValid(states),
    isInvalid: states.invalid,
    isPristine: isFieldPristine(states),
    isDirty: states.isDirty,
    isUntouched: !states.isTouched,
    isTouched: states.isTouched,
  };

  let endDecorator = undefined;

  if (required && !fieldState.isValid && !fieldState.isInvalid) {
    endDecorator = <Asterisk aria-hidden />;
  } else if (fieldState.isValid || fieldState.isInvalid) {
    endDecorator = fieldState.isValid ? <Check aria-hidden /> : <X aria-hidden />;
  }

  if (!required && (value == undefined || value == '')) {
    endDecorator = undefined;
  }

  return { endDecorator: <span className="state-decorator">{endDecorator}</span> }
}

const isFieldRequired = (rules?: FormFieldRules): boolean => {
  if (rules?.required == undefined) return false;

  if (typeof rules.required == 'string') {
    return true;
  } else {
    return (rules.required as any).value;
  }
};

const getFormFieldEndDecorator = (
  endDecorator: React.ReactElement | undefined,
  useFormStateDecorator: boolean | undefined,
  rules: FormFieldRules | undefined,
  fieldState: ControllerFieldState,
  value: string | undefined,
  requiredInEl: boolean | undefined
) => {
  if (useFormStateDecorator) {
    const isRequired = isFieldRequired(rules) || requiredInEl;
    return calculateFieldStateDecorator(fieldState, value, isRequired);
  }

  return { endDecorator };
};

export { getFormFieldEndDecorator, isFieldPristine, isFieldRequired, isFieldValid };

