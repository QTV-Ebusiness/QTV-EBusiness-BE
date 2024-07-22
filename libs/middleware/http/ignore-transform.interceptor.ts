export function IgnoreTransform() {
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.value['IGNORE_TRANSFORM'] = true;
  };
}
