import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { clear } from "@testing-library/user-event/dist/clear";

function SearchBar({ placeholder, data, onSearch }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleFilter = (event) => {
    if (isDone) setIsDone(false);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.nom.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
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
    <div className="search">
      <div className="searchInputs">
        <TextField
          id="username"
          label="Structure"
          variant="outlined"
          style={{ margin: 24, width: "80%" }}
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          InputProps={{
            startAdornment: (
              <div className="searchIcon">
                {filteredData.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon id="clearBtn" onClick={clearInput} />
                )}
              </div>
            ),
          }}
        />
      </div>
      {filteredData.length != 0 && !isDone && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                className="dataItem"
                onClick={() => {
                  setWordEntered(value.nom);
                  setIsDone(true);
                }}
                key={key}
              >
                <p>{value.nom} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
