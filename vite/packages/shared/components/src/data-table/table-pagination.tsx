import clsx from 'clsx';

export type TablePaginationProps = {
  isLoading: boolean;
  pageIndex: number;
  pageSize: number;

  pageSizeOptions: number[];

  totalItems: number | bigint;
  pageCount: number;

  onPageIndexChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
};

const TablePagination = ({
  isLoading,
  pageIndex,
  pageSize,
  totalItems,
  pageCount,
  pageSizeOptions,

  onPageIndexChange,
  onPageSizeChange,
  nextPage,
  previousPage,
}: TablePaginationProps) => {
  const pageNumber = pageIndex + 1;

  const itemCount = Number(totalItems);

  const fromRow = pageIndex * pageSize + (itemCount === 0 ? 0 : 1);
  const toRow = Math.min(pageNumber * pageSize, itemCount);

  const hasNextPage = () => pageNumber < pageCount;
  const hasPreviousPage = () => pageNumber > 1;

  return (
    <div className="row mt-4">
      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
      <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
        <div>
          <ul className="pagination">
            <li
              className={clsx('page-item', {
                disabled: !hasPreviousPage() || isLoading,
              })}
            >
              <a
                onClick={() => onPageIndexChange(0)}
                style={{ cursor: 'pointer' }}
                className="page-link"
              >
                <i
                  className={clsx('bi bi-chevron-double-left fs-6', {
                    'text-primary': hasPreviousPage() && !isLoading,
                  })}
                ></i>
              </a>
            </li>
            <li
              className={clsx('page-item', {
                disabled: !hasPreviousPage() || isLoading,
              })}
            >
              <a onClick={() => previousPage()} style={{ cursor: 'pointer' }} className="page-link">
                <i
                  className={clsx('bi bi-chevron-left fs-6', {
                    'text-primary': hasPreviousPage() && !isLoading,
                  })}
                ></i>
              </a>
            </li>

            <li className="page-item active">
              <a className="page-link" style={{ cursor: 'pointer' }}>
                {pageNumber}
              </a>
            </li>

            <li
              className={clsx('page-item', {
                disabled: !hasNextPage() || isLoading,
              })}
            >
              <a onClick={() => nextPage()} style={{ cursor: 'pointer' }} className="page-link">
                <i
                  className={clsx('bi bi-chevron-right fs-6', {
                    'text-primary': hasNextPage() && !isLoading,
                  })}
                ></i>
              </a>
            </li>
            <li
              className={clsx('page-item', {
                disabled: !hasNextPage() || isLoading,
              })}
            >
              <a
                onClick={() => onPageIndexChange(pageCount - 1)}
                style={{ cursor: 'pointer' }}
                className="page-link"
              >
                <i
                  className={clsx('bi bi-chevron-double-right fs-6', {
                    'text-primary': hasNextPage() && !isLoading,
                  })}
                ></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
