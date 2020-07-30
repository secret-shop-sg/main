import React, { useState, useEffect } from "react";
import { BACKEND_ADDRESS, PLATFORMS_SUPPORTED } from "../../constants/Details";
import { useAPI } from "../../utils/useAPI";
import "./AddGames.css";

const AddGames = (props) => {
  const initialPath = "/api/game";
  const [sendRequest, isLoading] = useAPI();
  const [matchedGames, setMatchedGames] = useState();
  const [apiPath, setApiPath] = useState();
  const [dropDownOptions] = useState(["All"].concat(PLATFORMS_SUPPORTED));
  const [query, setQuery] = useState({ title: null, platform: null });
  const selectedGamesID = props.selectedGame.map((game) => game.id);

  // get games from mongodb
  useEffect(() => {
    const getListing = async () => {
      const responseData = await sendRequest(apiPath);

      if (responseData) {
        setMatchedGames(responseData.matchedGames);
      }
    };

    if (apiPath) {
      getListing();
    }
  }, [sendRequest, apiPath]);

  // contructs the api path when user types in search bar and/or clicks on the dorp down option
  useEffect(() => {
    if (query.title && query.platform) {
      setApiPath(
        initialPath + "?title=" + query.title + "&platform=" + query.platform
      );
    } else if (query.title) {
      setApiPath(initialPath + "?title=" + query.title);
    } else if (query.platform) {
      setApiPath(initialPath + "?platform=" + query.platform);
    } else {
      setApiPath(initialPath);
    }
  }, [query]);

  // triggers whenever user types something in the search bar
  const searchBarHandler = (event) => {
    if (event.target.value) {
      setQuery({ ...query, title: event.target.value });
    } else {
      setQuery({ ...query, title: null });
    }
  };

  // triggers when user changes the dropdown option
  const dropDownHandler = (event) => {
    if (event.target.value !== "All") {
      setQuery({ ...query, platform: event.target.value });
    } else {
      setQuery({ ...query, platform: null });
    }
  };

  // changes the state of its parent component so selected image is displayed
  const onClickGame = (event) => {
    props.setSelectedGame([
      {
        id: event.target.id,
        imageURL: event.target.src,
      },
    ]);
  };

  return (
    <div className="add-games-component">
      <div className="add-games-header">
        <div>
          <select onChange={dropDownHandler}>
            {dropDownOptions.map((platform, index) => (
              <option key={index} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        <input type="text" onChange={searchBarHandler} />
      </div>

      {!isLoading &&
        matchedGames &&
        matchedGames.map(
          (matchedGame, index) =>
            !selectedGamesID.includes(matchedGame._id) && (
              <div className="matched-game-div" key={index}>
                <img
                  src={BACKEND_ADDRESS + matchedGame.imageURL}
                  alt={matchedGame.title + " on" + matchedGame.platform}
                  className="matched-game-images"
                  onClick={onClickGame}
                  id={matchedGame._id}
                />
              </div>
            )
        )}
    </div>
  );
};

export default AddGames;
