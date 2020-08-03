import React, { useState, useEffect } from "react";
import { BACKEND_ADDRESS } from "../constants/Details";
import Header from "../components/Shared/Header";
import "./styles/UserPage.css";
import { useAPI } from "../utils/useAPI";
import { BsStarFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import ListBox from "../components/User/userListBox";

const UserPage = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [following, setFollowing] = useState(false);
  const username = props.location.pathname.substring(1);
  const [userDetails, setUserDetails] = useState();

  function clickedfollow() {
    setFollowing(!following);
  }

  useEffect(() => {
    const getListing = async () => {
      const responseData = await sendRequest(`/api/user/username/${username}`);
      if (responseData) {
        setUserDetails(responseData.matchedUser);
      }
    };
    getListing();
  }, [username]);
  /*
  useEffect(()=> {
    if(userDetails){

    }
  },[userDetails])
  */

  return (
    <div>
      <Header />
      {!isLoading && userDetails && (
        <div>
          <div className="user-profile-sidebar">
            <img
              className="user-profile-image"
              src={BACKEND_ADDRESS + userDetails.profilePicURL}
              alt="Profile picture"
            />
            <div className="userdetails">
              <h2 className="name">
                {userDetails.username}
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
                {userDetails.location && (
                  <div>
                    <GrLocation /> <span /> {userDetails.location}
                  </div>
                )}
              </p>
              <p>Responsiveness</p>
              <p className="userbody">{userDetails.description}</p>
              <p className="followerfollowing">
                <span className="followers">5k followers</span>
                <span>2k following</span>
              </p>
            </div>
          </div>
          <div className="user-profile-inventory">
            <h3>{userDetails.username}'s Inventory</h3>
            <div className="scrollMenu">
              {userDetails.inventory &&
                userDetails.inventory.map((game) => (
                  <img
                    className="inventoryImg"
                    src={game.imageURL}
                    key={game._id}
                  />
                ))}
            </div>
          </div>
          <div className="user-profile-listings-container">
            <h3 style={{ marginBottom: "2%" }}>
              {userDetails.username}'s Listings
            </h3>
            <ListBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
