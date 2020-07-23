import React, { useState } from "react";
import "./listbox.css";
import Card from "react-bootstrap/Card";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
function ListBox() {
  const [liked, setLiked] = useState(false);
  function likeHandler() {
    setLiked(!liked);
  }
  return (
    <div id="listbox">
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img
          className="cardimage"
          variant="top"
          src="https://s3-ap-southeast-1.amazonaws.com/qisahn-upgrade-production/public/spree/products/28918/large/whatsapp_image_2020-01-29_at_4.46.02_pm.jpeg?1580354675"
        />
        <Card.Body>
          <Card.Title>Animal Crossing</Card.Title>
          <Card.Text>
            Normal surrender now or prepare to fight Snorunt Amoonguss Combusken
            Feraligatr Larvitar. Pallet Town Glalie Pidove Sonic Boom Rotom
            Minun Numel. Fog Badge Chandelure Charmeleon Durant Bellsprout
            Quilava Earth Badge. Mirror Move Phione Wurmple Vanillite Mienfoo
            Storm Badge Magby.
          </Card.Text>
          {!liked ? (
            <BsHeart className="likebutton" size={23} onClick={likeHandler} />
          ) : (
            <BsFillHeartFill
              className="likedbutton"
              size={23}
              onClick={likeHandler}
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListBox;
