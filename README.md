# react-hook-form-utils

A collection of utility functions to simplify setting up validation rules for react-hook-form.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [requiredRule](#requiredrule)
  - [minLengthRule](#minlengthrule)
  - [maxLengthRule](#maxlengthrule)
  - [patternRule](#patternrule)
  - [overrideRuleMessages](#overriderulemessages)

## Installation

```bash
npm @axlotl-lab/react-hook-form-utils
```

## Usage

```javascript
import { useForm } from 'react-hook-form';
import { requiredRule, minLengthRule, maxLengthRule, patternRule } from '@axlotl-lab/react-hook-form-utils';

function MyForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", {
        ...requiredRule(),
        ...minLengthRule(3),
        ...maxLengthRule(20)
      })} />
      <input {...register("email", {
        ...requiredRule(),
        ...patternRule(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
      })} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API Reference

### requiredRule

Creates a required validation rule.

```javascript
requiredRule(message?: string): { required: string | undefined }
requiredRule(options?: BaseRuleOptions): { required: string | undefined }
```

### minLengthRule

Creates a minimum length validation rule.

```javascript
minLengthRule(value: number): { minLength: { value: number; message: string; } }
minLengthRule(options: MinMaxRuleOptions): { minLength: { value: number; message: string; } }
```

### maxLengthRule

Creates a maximum length validation rule.

```javascript
maxLengthRule(value: number): { maxLength: { value: number; message: string; } }
maxLengthRule(options: MinMaxRuleOptions): { maxLength: { value: number; message: string; } }
```

### patternRule

Creates a pattern (regex) validation rule.

```javascript
patternRule(value: RegExp): { pattern: { value: RegExp; message: string; } }
patternRule(options: PatternOptions): { pattern: { value: RegExp; message: string; } }
```

### overrideRuleMessages

Overrides default error messages for validation rules.

```javascript
overrideRuleMessages({ lang, messages }: RulesMessageConfig): void
```