import { useContext } from "react";
import { TableContext } from "./Table";

function TableHeader({ column, children }) {
  const { sorting, setSorting } = useContext(TableContext);
  const changeSorting = () =>
    setSorting({
      column,
      // When a column is first selected always sort ascending
      // Toggle between Ascending and Descending on subsequent clicks
      direction:
        sorting.column === column && sorting.direction === "asc"
          ? "desc"
          : "asc",
    });

  return (
    <th onClick={changeSorting}>
      {children}
      <div
        className={
          "sort" + (sorting.column === column ? " " + sorting.direction : "")
        }
      />
    </th>
  );
}

export default TableHeader;
