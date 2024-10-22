import { useState, useEffect } from "react";
import Footer from "./Footer";
import Component2 from "./Component2";
import Component1 from "./Component1";
import Component3 from "./Component3";
import TopBar from "./TopBar";

function Root() {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [type, setType] = useState([]);
  const [stats, setStats] = useState([]);
  const [heightWeight, setHeightWeight] = useState({});
  const [abilities, setAbilites] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.abilities[0].ability.name);

        if (data.abilities.length == 1) {
          setAbilites([{ abilities: data.abilities[0].ability.name }]);
        } else if (data.abilities.length == 2) {
          setAbilites([
            { abilities: data.abilities[0].ability.name },
            { abilities: data.abilities[1].ability.name },
          ]);
        }
        setHeightWeight({ height: data.height, weight: data.weight });
        setStats(data.stats);
        setName(data.forms[0].name);
        if (data.types.length == 1) {
          setType([{ type: data.types[0].type.name }]);
        } else if (data.length == 2) {
          setType([
            { type: data.types[0].type.name },
            { type: data.types[1].type.name },
          ]);
        } else if (data.types.length == 2) {
          setType([
            { type: data.types[0].type.name },
            { type: data.types[1].type.name },
            // {type: data.types[2].type.name}
          ]);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        const body = document.body;
        body.style.backgroundColor = data.color.name;
        const rgb = window.getComputedStyle(body).backgroundColor;
        const col = rgb.replace(/rgb/i, "rgba");
        const new_col = col.replace(/\)/i, ",0.5)");
        body.style.backgroundColor = new_col;
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
      })
      .catch((err) => console.log(err));
  }, [name]);

  const page = (id) => {
    setId(id);
  };

  const prevCount = (id) => {
    setId(id - 1);
  };
  const forwardCount = (forward) => {
    setId(forward);
    setId((prevId) => ++prevId);
  };

  const searchBar = (search) => {
    setName(search);
  };

  return (
    
    <div className="wrapper">
      <div>
        <TopBar searchBar={searchBar} />
      </div>

      <div className="comp1and2and3">
        <div className="comp1">
          <Component1
            pokeId={id}
            pokeName={name}
            pokeHeightWeight={heightWeight}
          />
        </div>
        <div className="comp2">
          <Component2 pokeId={id} />
        </div>
        <div className="comp3">
          <Component3
            pokeType={type}
            pokeStats={stats}
            pokeAbilities={abilities}
          />
        </div>
      </div>
      <div className="footer">
        <Footer
          paging={page}
          pokeId={id}
          prevCount={prevCount}
          forwardCount={forwardCount}
        />
      </div>
    </div>
  );
}

export default Root;
