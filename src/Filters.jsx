import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Filters = ({ rows, paramsCallback, reset }) => {
  const [parameters, setParameters] = useState({});
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [selection, setSelection] = useState([]);

  const enterDetection = (e) => {
    if (e.keyCode === 13) {
      paramsCallback({ input: e.target.value.trim() });
    }
  };
  const selectedItems = (selection) => {
    const selectedOptions = [];
    for (const option of selection) {
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    }
    paramsCallback({ selected: selectedOptions });
    setSelection(selectedOptions);
  };

  return (
    <div id="filters">
      <h2>FILTERS</h2>
      <div id="search">
        <SearchIcon />
        <input
          value={input}
          type="text"
          placeholder="Search..."
          onInput={(e) => {
            setInput(e.target.value);
            if (e.target.value === "") {
              paramsCallback({ input: "" });
            }
          }}
          onKeyUp={(e) => {
            enterDetection(e);
          }}
        />
      </div>
      <label className="switch">
        COMPLETED
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            paramsCallback({ completed: e.target.checked });
            setChecked(e.target.checked);
          }}
        />
        <span className="slider round"></span>
      </label>
      <label htmlFor="select">SELECT USER ID</label>
      <select
        value={selection}
        multiple
        size="5"
        name="select"
        id="select"
        onChange={(selection) => {
          selectedItems(selection.target);
        }}
      >
        {rows.map((row) => (
          <option key={row.id} value={row.id}>
            {row.id}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          reset(true);
          setInput("");
          setChecked(false);
          setSelection("");
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
