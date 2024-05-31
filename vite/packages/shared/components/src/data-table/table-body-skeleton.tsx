type Props = {
  rowCount: number;
  columnCount: number;
};

const TableBodySkeleton = ({ rowCount, columnCount }: Props) => {
  return (
    <>
      {[...Array(rowCount).keys()].map((_, index) => {
        return (
          <tr key={index}>
            {/* Skeleton in every columns */}
            {/* {[...Array(columnCount).keys()].map((col, idx) => {
                return (
                  <td key={idx}>
                    <p className="w-100 m-0 placeholder-glow">
                      <span className="w-100 placeholder"></span>
                    </p>
                  </td>
                );
              })} */}

            {/* Skeleton in 1 column */}
            <td colSpan={columnCount}>
              <p className="w-100 m-0 placeholder-glow">
                <span className="w-100 placeholder"></span>
              </p>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TableBodySkeleton;
