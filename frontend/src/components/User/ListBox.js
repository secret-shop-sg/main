import React, { useState } from "react";
import { BACKEND_ADDRESS } from "../../constants/Details";
import "./Listbox.css";
import Card from "react-bootstrap/Card";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

function ListBox(props) {
  const listings = props.listings;
  const [liked, setLiked] = useState(false);
  function likeHandler() {
    setLiked(!liked);
  }

  return (
    <div id="listbox">
      {listings &&
        listings.map((listing) => (
          <Card className="card" style={{ width: "18rem" }} key={listing._id}>
            <Card.Img
              className="cardimage"
              variant="top"
              src={BACKEND_ADDRESS + listing.hasItem.imageURL}
            />
            <Card.Body>
              <Card.Title>{listing.hasItem.title}</Card.Title>
              <Card.Text>{listing.hasItem.description}</Card.Text>
              {!liked ? (
                <BsHeart
                  className="likebutton"
                  size={23}
                  onClick={likeHandler}
                />
              ) : (
                  <BsFillHeartFill
                    className="likedbutton"
                    size={23}
                    onClick={likeHandler}
                  />
                )}
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default ListBox;
