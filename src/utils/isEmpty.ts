export default function isEmpty<T>(value: T): boolean {
  let result = true;
  if (value instanceof Object) {
    if (value !== undefined && Object.keys(value).length > 0) {
      result = false;
    }
  } else if (value instanceof Array) {
    if (value !== undefined && value.length > 0) {
      result = false;
    }
  } else {
    if (value) {
      result = false;
    }
  }

  return result;
}
