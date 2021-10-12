import React, { useState, useEffect } from "react";
import "./App.scss";
import TodosList from "./TodosList";
import Filters from "./Filters";
import { StylesProvider } from "@material-ui/core/styles";
const axios = require("axios").default;

function App() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [params, setParams] = useState({});

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then((response) => {
        // handle success
        setRows(response.data);
        setFilteredRows(response.data);
      })
      .catch((error) => {
        // handle error
      }, console.error);
  }, []);

  useEffect(() => {
    let entries = rows;
    if (params.input) {
      entries = entries.filter((row) => row.title.includes(params.input));
    }
    if (params.completed) {
      entries = entries.filter((row) => row.completed === params.completed);
    }
    if (params.selected?.length > 0) {
      entries = entries.filter((row) => params.selected.includes("" + row.id));
    }
    setFilteredRows(entries);
  }, [params]);

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Filters
          rows={rows}
          paramsCallback={(e) => {
            setParams({ ...params, ...e });
          }}
          reset={(e) => {
            if (e) {
              setParams({});
            }
          }}
        />
        <TodosList rows={filteredRows} />
      </div>
    </StylesProvider>
  );
}

export default App;
