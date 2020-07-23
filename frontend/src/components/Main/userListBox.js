import React, { useState } from "react";
import "./listbox.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { BsFillHeartFill, BsHeart } from "react-icons/bs"
function ListBox() {
    const [liked, setLiked] = useState(false);
    function likeHandler() {
        setLiked(!liked);
    }
    return (
        <div id="listbox">
            <Card className="card" style={{ width: '18rem' }}>
                <Card.Img className="cardimage" variant="top" src="https://s3-ap-southeast-1.amazonaws.com/qisahn-upgrade-production/public/spree/products/28918/large/whatsapp_image_2020-01-29_at_4.46.02_pm.jpeg?1580354675" />
                <Card.Body>
                    <Card.Title>Animal Crossing</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.
                    </Card.Text>
                    {!liked ? <BsHeart className="likebutton" size={23} onClick={likeHandler} /> : <BsFillHeartFill className="likedbutton" size={23} onClick={likeHandler} />}
                </Card.Body>
            </Card>
        </div>
    )
}

export default ListBox