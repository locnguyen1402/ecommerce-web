import {
  type ColumnHelper as ColumnHelperBase,
  type RowData,
  createColumnHelper as createColumnHelperBase,
} from '@tanstack/react-table';
import { SELECTION_COLUMN_ID } from './constants';

type ColumnHelper<TData extends RowData> = ColumnHelperBase<TData> & {
  selection: (
    accessor: Parameters<ColumnHelperBase<TData>['accessor']>[0],
    column?: Parameters<ColumnHelperBase<TData>['accessor']>[1]
  ) => ReturnType<ColumnHelperBase<TData>['accessor']>;
};

const createColumnHelper: <TData extends RowData>() => ColumnHelper<TData> = <
  TData extends RowData,
>() => {
  const helper = createColumnHelperBase<TData>();

  type accessorArgs = Parameters<(typeof helper)['accessor']>;
  type accessorArg = accessorArgs[0];
  type columnArg = accessorArgs[1];

  const selection = (accessor: accessorArg, column?: columnArg) =>
    helper.accessor(accessor, {
      id: SELECTION_COLUMN_ID,
      header: ({ table }) => (
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          <input
            className="form-check-input"
            type="checkbox"
            data-kt-check={table.getIsAllRowsSelected()}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </div>
      ),
      cell: ({ row, getValue }) => (
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          <input
            value={getValue() as any}
            className="form-check-input"
            type="checkbox"
            data-kt-check={row.getIsSelected()}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
          />
        </div>
      ),
      enableColumnFilter: false,
      enableResizing: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableMultiSort: false,
      enableGrouping: false,
      enableHiding: false,
      enablePinning: false,
      //   size: 52,
      //   minSize: 52,
      //   maxSize: 52,
      ...column,
    });

  return { ...helper, selection };
};

export default createColumnHelper;
