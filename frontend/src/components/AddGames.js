import React, { useState, useEffect } from "react";
import { BACKEND_ADDRESS, PLATFORMS_SUPPORTED } from "../constants/Details";
import { useAPI } from "../utils/useAPI";
import "./AddGames.css";

const AddGames = (props) => {
  // todo: add image onclick event that setstate using function passed to it as props. then tracks image so it wont appear in search area
  const initialPath = "/api/game";
  const [sendRequest, isLoading] = useAPI();
  const [matchedGames, setMatchedGames] = useState();
  const [apiPath, setApiPath] = useState();
  const [dropDownOptions] = useState(["All"].concat(PLATFORMS_SUPPORTED));
  const [query, setQuery] = useState({ title: null, platform: null });
  const [selectedGames, setSelectedGames] = useState([]);

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

  const onClickGame = (event) => {
    setSelectedGames(selectedGames.concat(event.target.id));
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
            !selectedGames.includes(matchedGame._id) && (
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
