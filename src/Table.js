import { createContext, useState } from "react";
import Input from "./Input";
import TableHeader from "./TableHeader";

export const TableContext = createContext({
  sorting: { column: "", direction: "asc" },
  setSorting: () => {},
});

function Table({ data }) {
  const [sorting, setSorting] = useState({ column: "id", direction: "asc" });
  const [filter, setFilter] = useState("");

  let sortedData = data;
  sortedData.sort((a, b) => {
    const aColumn = a[sorting.column];
    const bColumn = b[sorting.column];
    let result = 0;

    if (typeof aColumn !== typeof bColumn) {
      console.warn(
        `Unable to sort values from column ${sorting.column}: Inconsistent data types`,
        a,
        b
      );
    } else if (typeof aColumn === "number") {
      result = aColumn - bColumn;
    } else if (typeof aColumn === "string") {
      result = aColumn.localeCompare(bColumn);
    } else {
      console.warn(
        `Unable to sort values from column ${
          sorting.column
        }: No sorting function for type ${typeof aColumn}`,
        a,
        b
      );
    }

    if (sorting.direction === "desc") result *= -1;
    return result;
  });

  if (filter)
    sortedData = sortedData.filter((row) =>
      Object.values(row).some((value) => {
        const stringValue = value.toString().toLowerCase(); // normalize our data
        return stringValue.includes(filter.toLowerCase());
      })
    );

  return (
    <>
      <Input value={filter} setValue={setFilter}>
        Filter
      </Input>
      <table>
        <thead>
          <tr>
            <TableContext.Provider value={{ sorting, setSorting }}>
              <TableHeader column={"id"}>ID</TableHeader>
              <TableHeader column={"type"}>Type</TableHeader>
              <TableHeader column={"name"}>Name</TableHeader>
              <TableHeader column={"topping"}>Topping</TableHeader>
            </TableContext.Provider>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.type}</td>
              <td>{row.name}</td>
              <td>{row.topping}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
