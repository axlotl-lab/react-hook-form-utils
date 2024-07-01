import { CSSProperties } from 'react';
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { FieldContainer } from '../components/field-container';
import { FormField } from '../components/form';

type FormFieldClassnames = {
  label?: string
  container?: string
  field?: string
  error?: string
}

type FormFieldStyles = {
  label?: CSSProperties
  container?: CSSProperties
  field?: CSSProperties
  error?: CSSProperties
}

export type FormFieldRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;

export type FormFieldProps<TFieldValues extends FieldValues = FieldValues | any> = {
  label?: string | React.ReactElement;
  formStateDecorator?: boolean;
  changeLabelColorOnError?: boolean;
  classNames?: FormFieldClassnames;
  styles?: FormFieldStyles;
} & Pick<React.ComponentPropsWithoutRef<typeof FieldContainer>, 'startDecorator' | 'endDecorator'> &
  Omit<React.ComponentPropsWithoutRef<typeof FormField<TFieldValues>>, 'render' | 'shouldUnregister'>;