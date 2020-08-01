import React, { useState, useEffect } from "react";
import Header from "../components/Shared/Header";
import "./styles/userPage.css";
import { useAPI } from "../utils/useAPI";
import { BsStarFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import ListBox from "../components/User/userListBox";

const UserPage = () => {
  const [sendRequest, isLoading] = useAPI();
  const [following, setFollowing] = useState(false);

  function clickedfollow() {
    setFollowing(!following);
  }

  const [userdetails, setUserDetails] = useState();
  useEffect(() => {
    const getListing = async () => {
      const responseData = await sendRequest(
        `/api/user/id/5f1c22e88ee3f6157ad84e41`
      );
      if (responseData) {
        setUserDetails(responseData.matchedUser);
      }
    };
    getListing();
  }, ["5f1c22e88ee3f6157ad84e41"]);
  return (
    <div>
      <Header />
      {!isLoading && userdetails && (
        <div>
          <div className="user">
            <img
              className="profilepicture"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kermit-the-frog-attends-the-2017-drama-league-benefit-gala-news-photo-1568466133.jpg"
            />
            <div className="userdetails">
              <h2 className="name">
                {userdetails.username}
                <span className="verification">
                  {" "}
                  <GoVerified size={25} />
                </span>
              </h2>
              <p className="username">
                @supercoolseller
                <span> </span>
                <span>
                  {!following ? (
                    <button className="follow" onClick={clickedfollow}>
                      Follow!
                    </button>
                  ) : (
                    <button className="followed" onClick={clickedfollow}>
                      Followed!
                    </button>
                  )}
                </span>
              </p>
              <p>
                <span className="rating">5.0</span>
                <span> </span>
                <span className="stars">
                  <BsStarFill size={27} />
                  <span> </span>
                  <BsStarFill size={27} />
                  <span> </span>
                  <BsStarFill size={27} />
                  <span> </span>
                  <BsStarFill size={27} />
                  <span> </span>
                  <BsStarFill size={27} />
                </span>
              </p>
              <p>
                <GrLocation /> <span> </span> {userdetails.location}
              </p>
              <p>Responsiveness</p>
              <p className="userbody">
                Charity hugs cats hugs yiff furry cats, foxes uwu steampunk
                charity. Charity yiff cats yiff dogs owo hugs, furry furry uwu
                yiff cats. Uwu fluff foxes uwu dogs fluff cats furry. Foxes
                fluff cats fluff hugs, charity uwu foxes hugs cats. Dogs
                steampunk furry, dogs steampunk fluff charity dogs hugs charity
                foxes charity charity charity. Steampunk uwu cats fluff yiff
                steampunk steampunk, dogs foxes steampunk steampunk. Steampunk
                charity cats foxes steampunk fluff yiff cats. Yiff owo dogs
                steampunk fluff uwu, uwu fluff steampunk uwu owo. Fluff uwu
                cats, uwu steampunk yiff fluff steampunk hugs hugs yiff.
              </p>
              <p className="followerfollowing">
                <span className="followers">5k followers</span>
                <span>2k following</span>
              </p>
            </div>
          </div>
          <div className="inventory">
            <h3>{userdetails.username}'s Inventory</h3>
            <div className="scrollMenu">
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
              <img
                className="inventoryImg"
                src="https://www.imore.com/sites/imore.com/files/styles/medium/public/field/image/2019/05/smash-bros-ult-rjd.jpg"
              />
            </div>
          </div>
          <div className="userlistings">
            <h3 style={{ marginBottom: "2%" }}>
              {userdetails.username}'s Listings
            </h3>
            <ListBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
