// import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import { useSortBy, useTable } from 'react-table';

const ArrowDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.99992 1.33331V10.6666M5.99992 10.6666L10.6666 5.99998M5.99992 10.6666L1.33325 5.99998"
      stroke="#667085"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowUp = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.99992 10.6666V1.33331M5.99992 1L1 5.99998M5.99992 1.33325L10.6666 5.99998"
      stroke="#667085"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CustomTable = ({
  columns,
  data,
  minWidth = '812px',
  isSortable = false,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        autoResetSelectedRows: false,
        autoResetSelectedCell: false,
        autoResetSelectedColumn: false,
      },
      useSortBy,
    );

  // Render the UI for your table
  return (
    <BTable size="sm" {...getTableProps()} style={{ minWidth: minWidth }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              return (
                <th
                  {...column.getHeaderProps(
                    // {
                    //   style: {
                    //     minWidth: column.minWidth,
                    //     maxWidth: column.maxWidth,
                    //     width: column.width,
                    //   },
                    // },
                    isSortable ? column.getSortByToggleProps() : '',
                  )}
                >
                  {column.render('Header')}
                  <span className="ps-2">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDown />
                      ) : (
                        <ArrowUp />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        maxWidth: cell.column.maxWidth,
                        width: cell.column.width,
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
};

export default CustomTable;
