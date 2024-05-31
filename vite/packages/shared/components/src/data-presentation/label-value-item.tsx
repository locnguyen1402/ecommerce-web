import { LabelValueItemDef } from './type';
import { getObjectValue } from './utils';

export type LabelValueItemProps<TData extends Record<string, any>> = {
  t?: (key: string) => string;
  data: TData;
  def: LabelValueItemDef<TData>;
};

const LabelValueItem = <TData extends Record<string, any>>({
  data,
  def,
  t,
}: LabelValueItemProps<TData>) => {
  const renderLabel = () => {
    const label = def.label;

    if (typeof def.renderLabel === 'function') {
      return def.renderLabel(data);
    } else if (typeof label === 'string' || typeof label === 'number') {
      return typeof t === 'function' ? t(label as string) : label;
    }

    return <>{label}</>;
  };

  const renderValue = () => {
    const value = getObjectValue(data, {
      accessorKey: typeof def.value === 'string' ? def.value : undefined,
      ...(typeof def.value === 'object' ? def.value : {}),
    });

    if (typeof def.renderValue === 'function') {
      return def.renderValue(data, value);
    }

    return <>{value}</>;
  };

  return (
    <div className="row mb-7">
      {typeof def.render === 'function' ? (
        def.render(data)
      ) : (
        <>
          <div className="col-lg-4 fw-bold text-muted">{renderLabel()}</div>
          <div className="col-lg-8 fw-semibold fs-6 text-gray-900">{renderValue()}</div>
        </>
      )}
    </div>
  );
};

export { LabelValueItem };
