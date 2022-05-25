import { useState } from "react";
import Table from "./Table";
import Data from "./Data.json";
import Input from "./Input";

function App() {
  const [tableData, setTableData] = useState(Data);
  const [id, setId] = useState(0);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [topping, setTopping] = useState("");

  const setIdSafe = (value) => {
    const newValue = Number(value);
    if (!isNaN(newValue)) setId(newValue);
  };

  const addPastry = () => {
    setTableData([...tableData, { id, type, name, topping }]);
    setId(0);
    setType("");
    setName("");
    setTopping("");
  };

  return (
    <main className="app">
      <h1>Menu</h1>
      <Table data={tableData} />
      <h2>Add Pastry</h2>
      <Input value={id} setValue={setIdSafe} type="number">
        ID
      </Input>
      <Input value={type} setValue={setType}>
        Type
      </Input>
      <Input value={name} setValue={setName}>
        Name
      </Input>
      <Input value={topping} setValue={setTopping}>
        Topping
      </Input>
      <button onClick={addPastry}>Add</button>
    </main>
  );
}

export default App;
