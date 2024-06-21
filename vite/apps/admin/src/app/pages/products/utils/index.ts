type Attribute = {
  id: string;
  name: string;
  value: string[];
};

export const retrieveAttributeValues = (valueString: string): string[] => {
  return valueString.split('--').map((value) => value.trim());
};

export const generateVariants = (
  attributes: AttributeInCreateProduct[]
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

  return combine(0, []);
};
