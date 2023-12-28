import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

function AdressSearchBar({
  placeholder,
  data,
  onSearch,
  isDone,
  setIsDone,
  error,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    if (isDone) setIsDone(false);
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(data);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setIsDone(false);
  };

  useEffect(() => {
    onSearch(wordEntered);
  }, [wordEntered]);

  return (
    <>
      <div className="searchInputs">
        <TextField
          id="username"
          label={placeholder}
          variant="outlined"
          style={{ margin: 24, width: "90%" }}
          type="text"
          value={wordEntered}
          onChange={handleFilter}
          error={error}
        />
      </div>
      {filteredData.length != 0 && !isDone && (
        <div className="dataResult">
          <div
            className="dataItem"
            onClick={() => {
              setWordEntered(data);
              setIsDone(true);
            }}
          >
            <p>{data} </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdressSearchBar;
