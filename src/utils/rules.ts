type BaseRuleOptions = { message?: string; lang?: string; }
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

function getMessage(error: Errors, lang?: string) {
  const message = REACT_HOOK_UTILS_DEFAULTS.messages[error]

  if (message) {
    return typeof message == 'string' ? message : message[lang || REACT_HOOK_UTILS_DEFAULTS.lang]
  }

  return 'error';
}

function requiredRule(message?: string): { required: string | undefined }
function requiredRule(options?: BaseRuleOptions): { required: string | undefined }
function requiredRule(param?: string | BaseRuleOptions) {
  let message: string;

  if (typeof param === 'string') {
    message = param;
  } else {
    const lang = param?.lang;
    message = param?.message || getMessage('required', lang);
  }

  return {
    required: message
  }
}

function minLengthRule(value: number): { minLength: { value: number; message: string; } }
function minLengthRule(options: MinMaxRuleOptions): { minLength: { value: number; message: string; } }
function minLengthRule(param: number | MinMaxRuleOptions) {
  let message: string;
  let value: number;

  if (typeof param === 'number') {
    value = param;
    message = replaceAll(getMessage('minLength'), '{{value}}', param.toString());
  } else {
    const lang = param.lang;
    value = param.value;
    message = param.message || getMessage('minLength', lang);
  }

  return {
    minLength: { value, message }
  }
}

function maxLengthRule(value: number): { maxLength: { value: number; message: string; } }
function maxLengthRule(options: MinMaxRuleOptions): { maxLength: { value: number; message: string; } }
function maxLengthRule(param: number | MinMaxRuleOptions) {
  let message: string;
  let value: number;

  if (typeof param === 'number') {
    value = param;
    message = replaceAll(getMessage('maxLength'), '{{value}}', param.toString());
  } else {
    const lang = param.lang;
    value = param.value;
    message = param.message || getMessage('maxLength', lang);
  }

  return {
    maxLength: { value, message }
  }
}

function patternRule(value: RegExp): { pattern: { value: RegExp; message: string; } }
function patternRule(options: PatternOptions): { pattern: { value: RegExp; message: string; } }
function patternRule(param: RegExp | PatternOptions) {
  let message: string;
  let value: RegExp;

  if (param instanceof RegExp) {
    value = param;
    message = getMessage('pattern');
  } else {
    const lang = param.lang;
    value = param.value;
    message = param.message || getMessage('pattern', lang);
  }

  return {
    pattern: { value, message }
  }
}

function overrideRuleMessages({ lang, messages }: { lang: string, messages: Partial<ErrorMessages> }) {
  REACT_HOOK_UTILS_DEFAULTS.lang = lang;
  REACT_HOOK_UTILS_DEFAULTS.messages = { ...REACT_HOOK_UTILS_DEFAULTS.messages, ...messages };
}

export { maxLengthRule, minLengthRule, overrideRuleMessages, patternRule, requiredRule };

