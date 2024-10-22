import { Button, Input, Flex } from "antd";
import { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Footer(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Flex justify="center">
        <div style={{padding: '1em'}}>
        <Button shape="circle" onClick={() => props.prevCount(props.pokeId)}>
          <BiLeftArrow></BiLeftArrow>
        </Button>
        </div>
        <div style={{  display: "flex", padding: '1em' }}>
          <Input
            type="number"
            value={props.pokeId}
            onChange={(e) => props.paging(e.target.value)}
            style={{ height: 30, width: 50, borderRadius: "50px" }}
            min="1"
            maxLength="1"
          />
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div>/</div>
            <div>{count}</div>
          </div>
        </div>
        <div style={{padding: '1em'}}>

        <Button shape="circle" onClick={() => props.forwardCount(props.pokeId)}>
          <BiRightArrow></BiRightArrow>
        </Button>
        </div>
      </Flex>
    </div>
  );
}

export default Footer;
