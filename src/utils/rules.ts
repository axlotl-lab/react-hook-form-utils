type BaseRuleOptions = { message: string; lang?: string; }
type MinMaxRuleOptions = BaseRuleOptions & { value: number }
type PatternOptions = BaseRuleOptions & { value: RegExp }

type Errors = 'required' | 'minLength' | 'maxLength' | 'pattern'
type ErrorMessages = { [key in Errors]: string | Dictionary<string> }

function replaceAll(input: string, search: string | RegExp, replacement: string): string {
  if (typeof search === 'string') {
    search = new RegExp(search, 'g');
  }
  return input.replace(search, replacement);
}

const REACT_HOOK_UTILS_DEFAULTS: { lang: string, messages: Partial<ErrorMessages> } = {
  lang: 'en',
  messages: {
    required: { en: 'This field is required', es: 'Este campo es requerido' },
    minLength: { en: 'Minimum {{value}} characters required', es: 'Se requiere un mínimo de {{value}} caracteres' },
    maxLength: { en: 'Up to {{value}} characters allowed', es: 'Hasta {{value}} caracteres permitidos' },
    pattern: { en: 'Invalid value', es: 'Valor inválido' }
  }
}

function getMessage(error: Errors) {
  const message = REACT_HOOK_UTILS_DEFAULTS.messages[error]

  if (message) {
    return typeof message == 'string' ? message : message[REACT_HOOK_UTILS_DEFAULTS.lang]
  }

  return 'error';
}

function requiredRule(message?: string): void;
function requiredRule(options?: BaseRuleOptions): void;
function requiredRule(param?: string | BaseRuleOptions) {
  let message = getMessage('required')

  if (typeof param === 'string') {
    message = param;
  } else if (typeof param === 'object') {
    message = param.message;
  }

  return {
    required: message
  }
}

function minLengthRule(value: number): void;
function minLengthRule(options?: MinMaxRuleOptions): void;
function minLengthRule(param?: number | MinMaxRuleOptions) {
  let message = getMessage('minLength')
  let value: number | undefined;

  if (typeof param === 'number') {
    value = param;
    message = replaceAll(message, '{{value}}', param.toString());
  } else if (typeof param === 'object') {
    value = param.value
    message = param.message;
  }

  return {
    minLength: { value: value!, message }
  }
}

function maxLengthRule(value: number): void;
function maxLengthRule(options?: MinMaxRuleOptions): void;
function maxLengthRule(param?: number | MinMaxRuleOptions) {
  let message = getMessage('maxLength')
  let value: number | undefined;

  if (typeof param === 'number') {
    value = param;
    message = replaceAll(message, '{{value}}', param.toString());
  } else if (typeof param === 'object') {
    value = param.value
    message = param.message;
  }

  return {
    maxLength: { value: value!, message }
  }
}

function patternRule(value: RegExp): void;
function patternRule(options?: PatternOptions): void;
function patternRule(param?: RegExp | PatternOptions) {
  let message = getMessage('pattern')
  let value: RegExp | undefined;

  if (param instanceof RegExp) {
    value = param;
  } else if (typeof param === 'object') {
    value = param.value
    message = param.message;
  }

  return {
    pattern: { value: value!, message }
  }
}

function overrideRuleMessages({ lang, messages }: { lang: string, messages: Partial<ErrorMessages> }) {
  REACT_HOOK_UTILS_DEFAULTS.lang = lang;
  REACT_HOOK_UTILS_DEFAULTS.messages = { ...REACT_HOOK_UTILS_DEFAULTS.messages, ...messages };
}

export { maxLengthRule, minLengthRule, overrideRuleMessages, patternRule, requiredRule };

