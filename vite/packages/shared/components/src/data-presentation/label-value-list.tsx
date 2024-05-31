import { LabelValueItem } from './label-value-item';
import { LabelValueListDef } from './type';

export type LabelValueListProps<TData extends Record<string, any>> = {
  t?: (key: string) => string;
  data: TData | null | undefined;
  def: LabelValueListDef<TData>;
};

const LabelValueList = <TData extends Record<string, any>>({
  t,
  data,
  def,
}: LabelValueListProps<TData>) => {
  if (!data) {
    return <></>;
  }

  return (
    <>
      {def.map((item, idx) => {
        return <LabelValueItem key={idx} t={t} data={data} def={item} />;
      })}
    </>
  );
};

export { LabelValueList };
