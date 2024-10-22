import { Input, Button } from "antd";
import { useEffect, useState } from "react";
import logo from "../img/logo.png";

const listStyle = {
  borderRadius: "20px",
  margin: ".5em 0 0 -1.5em",
  cursor: "pointer",
  display: "block",
  width: "100%",
  overflow: "auto",
  zIndex: "100",
};

const TopBar = (props) => {
  const [count, setCount] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      });
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
      });
  }, [count]);

  return (
    <div style={{ position: "relative", top: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={logo} alt="pokemon logo" height="80" width="80" />
          <h1 className="title">Pokedex</h1>
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <div>
            <Input
              style={{ width: "20em" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Pokemon"
            />
          </div>

          <div
            style={{
              position: "absolute",
              backgroundColor: search && "rgba(255, 255, 255, 0.5)",
              borderRadius: "10px",
              right: ".1em",
              height: "20em",
              width: "16.9em",
              overflow: "auto",
              zIndex: "100",
            }}
          >
            <ul>
              {search &&
                pokemon
                  .filter((poke) => {
                    return poke.name.startsWith(search, 0);
                  })
                  .map((poke, index) => (
                    <Button
                      size="large"
                      block="true"
                      style={listStyle}
                      key={index}
                      onClick={() => props.searchBar(poke.name)}
                    >
                      {poke.name}
                    </Button>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
