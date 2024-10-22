import { useState, useEffect } from "react";

function Component1(props) {
  const [region, setRegion] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/location/${props.pokeId}`)
      .then((res) => res.json())
      .then((data) => {
        setRegion(data.region.name);
      })
      .catch(
        (err) => {
          console.err(err);
        },
        [props.pokeId]
      );
  }, [props.pokeId]);

  return (
    <div style={{}}>
      <h2># {props.pokeId}</h2>
      <h1> {props.pokeName.toUpperCase()} </h1>
      <div style={{ display: "flex" }}>
        <h2 className="region">Region :{region}</h2>
        <div>
          <h4>
            Height :{props.pokeHeightWeight && props.pokeHeightWeight.height}
          </h4>
          <h4>
            Weight :{props.pokeHeightWeight && props.pokeHeightWeight.weight}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Component1;
