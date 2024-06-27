import { HTMLProps, ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';

import {
  useReactTable,
  TableOptions as BaseTableOptions,
  getCoreRowModel,
  flexRender,
  PaginationState,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { tableUtils } from './utils';
import { PAGE_SIZE_OPTIONS } from './constants';

import TablePagination from './table-pagination';
import TableEmpty from './table-empty';
import TableLoading from './table-loading';
import TableBodySkeleton from './table-body-skeleton';
import TableRow from './table-row';

type ClassName = HTMLProps<HTMLElement>['className'];

type TableOptions<T> = Pick<
  BaseTableOptions<T>,
  'data' | 'columns' | 'enableRowSelection' | 'onRowSelectionChange' | 'state'
>;

export type TableProps<T> = TableOptions<T> &
  PaginationState & {
    hidePagination?: boolean;

    pageSizeOptions?: number[];
    pageCount: number | bigint;
    itemCount: number | bigint;

    // loading props
    isLoading?: boolean;
    isRefetching?: boolean;
    // loadingProps?: {
    //   component?: ReactNode;
    //   className?: ClassName;
    // };
    emptyComponent?: ReactNode;

    onPaginationStateChange?: (state: { pageIndex: number; pageSize: number }) => void;
    classNames?: {
      header?: ClassName;
      body?: ClassName;
    };
  };

const Table = <T extends {}>({
  data,
  columns,
  state,
  onRowSelectionChange,
  isLoading,
  isRefetching,
  classNames,
  pageSize,
  pageIndex,
  pageCount = 0,
  itemCount: totalItems,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  onPaginationStateChange,
  hidePagination = false,
  emptyComponent,
}: TableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationState>(() => ({
    pageIndex: pageIndex || 0,
    pageSize: pageSize || 10,
  }));

  const table = useReactTable({
    manualPagination: true,
    data,
    columns,
    state: {
      ...state,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange,
    onPaginationChange: setPagination,
  });

  const onPageIndexChange = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= pageCount) return;

    setPagination({ ...pagination, pageIndex });
  };

  const onPageSizeChange = (pageSize: number) => {
    if (!pageSizeOptions?.includes(pageSize)) return;

    setPagination({ ...pagination, pageSize });
  };

  useEffect(() => {
    !!onPaginationStateChange &&
      onPaginationStateChange({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
  }, [pagination.pageIndex, pagination.pageSize]);

  const tableContent = isLoading ? (
    <TableBodySkeleton rowCount={pageSize} columnCount={table.getVisibleLeafColumns().length} />
  ) : (
    <>
      {!data.length ? (
        <TableEmpty columnCount={table.getVisibleLeafColumns().length}>{emptyComponent}</TableEmpty>
      ) : (
        <>
          {table.getRowModel().rows.map((row) => {
            return <TableRow key={row.id} row={row} />;
          })}
        </>
      )}
    </>
  );

  const { header: headerClassName, body: bodyClassName } = classNames || {};

  return (
    <>
      <div
        style={{
          position: 'relative',
        }}
      >
        <div className="table-responsive">
          <table className="table table-rounded border table-row-bordered align-middle gs-3">
            <thead className={headerClassName}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={clsx(
                          'text-muted text-uppercase fw-bolder fs-7 border-end',
                          tableUtils.getHeaderCellClassName(header)
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className={bodyClassName}>{tableContent}</tbody>
          </table>
        </div>
        {!hidePagination && data.length > 0 && !isLoading && (
          <TablePagination
            isLoading={!!isLoading}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            pageCount={Number(pageCount)}
            totalItems={totalItems}
            pageSizeOptions={pageSizeOptions}
            onPageIndexChange={onPageIndexChange}
            onPageSizeChange={onPageSizeChange}
            nextPage={() => onPageIndexChange(pagination.pageIndex + 1)}
            previousPage={() => onPageIndexChange(pagination.pageIndex - 1)}
          />
        )}
        {isRefetching && <TableLoading />}
      </div>
    </>
  );
};

export default Table;
