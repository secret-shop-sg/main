import React from "react";
import Header from "../components/Shared/Header";
import { GrGallery } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import "./styles/CreateListing.css";
function CreateListing() {
    return (
        <div>
            <Header />
            <div className="imageUploader">
                <div><GrGallery id="galleryimage" size={100} /></div>
                <div><button id="uploadButton">Click here to upload an image!</button></div>
            </div>
            <div className="uploadDetails">
                <form>
                    <p className="inputHeader">Title</p>
                    <input
                        type="text"
                        id="title"
                        className="listinginput"
                        name="title"
                        placeholder="eg. SSBU for Trade; Animal Crossing for Rent; Kirby Star Allies for sale"
                    />
                    <p className="inputHeader2">Description</p>
                    <textarea placeholder="eg. Near Mint, date bought etc." className="listinginput" name="description" rows="4" cols="50">

                    </textarea>
                    <hr></hr>
                    <div className="conditions" >
                        <h2> Your Conditions</h2>
                        <input type="checkbox" id="sell" name="sell" value="Sell" />
                        <label for="sell">Sell for: $ <span>  </span><input type="text"></input></label><br />
                        <hr></hr>
                        <input type="checkbox" id="rent" name="rent" value="Rent" />
                        <label for="rent">Rent for: $ <span> </span><input type="text"></input> /day</label><br />
                        <hr></hr>
                        <input type="checkbox" id="trade" name="trade" value="Trade" />
                        <label for="trade">Trade for: <input type="text"></input><GoPlus /></label><br /><br />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateListing