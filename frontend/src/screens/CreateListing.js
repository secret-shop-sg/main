import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Shared/Header";
import { GrGallery } from "react-icons/gr";
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
                        className="input"
                        name="title"
                        placeholder="eg. SSBU for Trade; Animal Crossing for Rent; Kirby Star Allies for sale"
                    />
                    <p className="inputHeader2">Description</p>
                    <textarea placeholder="eg. Near Mint, date bought etc." className="input" name="description" rows="4" cols="50">

                    </textarea>
                    <hr></hr>
                    <h2> Your Conditions</h2>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    <label for="vehicle1"> I have a bike</label><br />
                    <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                    <label for="vehicle2"> I have a car</label><br />
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
                    <label for="vehicle3"> I have a boat</label><br /><br />
                </form>
            </div>
        </div>
    )
}

export default CreateListing