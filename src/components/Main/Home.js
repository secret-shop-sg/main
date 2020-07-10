import React from "react";
import Header from "./Header";
import "./Home.css";

function Home(){
    return(
        <div className= "body">
            <Header />
            <div>
                <p>This is the home page</p>
            </div>
        </div>
    );
}

export default Home;