type Attribute = {
  id: string;
  name: string;
  value: string[];
};

export const retrieveAttributeValues = (valueString: string): string[] => {
  return valueString.split('--').map((value) => value.trim());
};

export const areVariantsEqual = (
  variant1: CreateProductVariantRequest,
  variant2: CreateProductVariantRequest
): boolean => {
  if (variant1.values.length !== variant2.values.length) {
    return false;
  }
  for (let i = 0; i < variant1.values.length; i++) {
    if (
      variant1.values[i].id !== variant2.values[i].id ||
      variant1.values[i].value !== variant2.values[i].value
    ) {
      return false;
    }
  }

  return true;
};

export const generateVariants = (
  attributes: AttributeInCreateProduct[],
  addedVariants: CreateProductVariantRequest[] = []
): CreateProductVariantRequest[] => {
  if (attributes.length === 0) {
    return [];
  }

  function combine(
    index: number,
    current: CreateProductVariantAttributeRequest[]
  ): CreateProductVariantRequest[] {
    if (index === attributes.length) {
      return [{ values: current, price: 0, stock: 0 }];
    }

    const attribute = attributes[index];
    const attributeValues = retrieveAttributeValues(attribute.values);
    const variants: CreateProductVariantRequest[] = [];

    for (const value of attributeValues) {
      variants.push(
        ...combine(index + 1, [
          ...current,
          { id: attribute.attributeId, name: attribute.name, value },
        ])
      );
    }

    return variants;
  }

  const allVariants = combine(0, []);

  const remainingVariants = allVariants.filter((variant) => {
    return !addedVariants.some((addedVariant) => areVariantsEqual(variant, addedVariant));
  });

  return remainingVariants;
};
