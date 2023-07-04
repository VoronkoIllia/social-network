export type ValidatorType<T> = (value:T)=>string|undefined


export const required:ValidatorType<string> = (value) =>
  value || typeof value === "number" ? undefined : "This field is required";
export const maxLength = (max:number):ValidatorType<string> => (value) => {
  return value && value.length > max
    ? `Count of symbols must be less of ${max}`
    : undefined;
};
export const minLength = (min:number):ValidatorType<string> => (value) =>
  value && value.length < min ? `Must be ${min} symbols or more` : undefined;

export const minValue = (minValue:number):ValidatorType<number> => (value) =>
  value && value < minValue ? `Value must be ${minValue} or more` : undefined;

export const maxValue = (maxValue:number):ValidatorType<number> => (value) =>
  value && value > maxValue ? `Value must be less than ${maxValue}` : undefined;
export const email = (value:string):string|undefined =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
