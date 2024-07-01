import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import React, { ComponentPropsWithoutRef, ElementRef } from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  FormProviderProps,
  useFormContext
} from "react-hook-form"
import { isFieldValid } from "../utils/form-utils"

type FormProps = {
  id?: string, autoComplete?: string, noValidate?: boolean
} & Pick<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'style' | 'className'>

const Form = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>({ children, autoComplete = "off", noValidate, onSubmit, ...props }: FormProviderProps<TFieldValues, TContext, TTransformedValues> & FormProps) => {
  return (
    <FormProvider {...props}>
      <form autoComplete={autoComplete} noValidate={noValidate} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = { name: TName }

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const [hasItemDescription, setHasItemDescription] = React.useState(false)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: hasItemDescription ? `${id}-form-item-description` : undefined,
    formMessageId: `${id}-form-item-message`,
    setHasItemDescription,
    ...fieldState,
  }
}

type FormItemContextValue = { id: string }

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()
  const { invalid, isDirty, isTouched } = useFormField()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref}
        className={classNames(
          "axtl-form-item",
          className,
          {
            "invalid": invalid,
            "valid": isFieldValid({ invalid, isDirty, isTouched }),
          })}
        {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  ElementRef<'label'>,
  ComponentPropsWithoutRef<'label'> & { changeColorOnError?: boolean }
>(({ className, changeColorOnError, ...props }, ref) => {
  const { invalid, formItemId } = useFormField()

  return (
    <label
      ref={ref}
      className={classNames(changeColorOnError && invalid && "with-error", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, invalid, isDirty, isTouched, formItemId, formDescriptionId, formMessageId } = useFormField()

  const ariaDescribedby = formDescriptionId || error
    ? {
      "aria-describedby": !error
        ? `${formDescriptionId || ''}`
        : `${formDescriptionId || ''} ${formMessageId}`
    } : undefined

  return (
    <Slot
      ref={ref}
      id={formItemId}
      {...ariaDescribedby}
      aria-invalid={!!error}
      className={classNames({
        "invalid": invalid,
        "valid": isFieldValid({ invalid, isDirty, isTouched }),
      })}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId, setHasItemDescription } = useFormField()

  setHasItemDescription(true);

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={classNames(className, "form-description")}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={classNames(className, 'error-message')}
      {...props}
    >
      {body}
    </p>
  )
})
FormErrorMessage.displayName = "FormErrorMessage"

export {
  Form, FormControl,
  FormDescription, FormErrorMessage, FormField, FormItem,
  FormLabel, useFormContext
}

