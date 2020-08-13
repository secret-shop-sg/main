import React, { useState, useEffect, useCallback } from "react";
import { BACKEND_ADDRESS, PLATFORMS_SUPPORTED } from "../../constants/Details";
import { useAPI } from "../../utils/useAPI";
import "./AddGames.css";

const AddGames = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [matchedGames, setMatchedGames] = useState();
  const [pageData, setPageData] = useState();
  const [dropDownOptions] = useState(["All"].concat(PLATFORMS_SUPPORTED));

  // list of all selectedGamesID so they would not be displayed

  const [query, setQuery] = useState({});

  // go to next/previous page of games
  const pageButtonHandler = (event) => {
    let value;
    if (event.target.id === "nextPage") {
      value = 1;
    } else if (event.target.id === "previousPage") {
      value = -1;
    }

    setQuery({ ...query, page: pageData.currentPage + value });
  };

  // get list of games from mongodb
  useEffect(() => {
    const selectedGamesID = props.selectedGames.map((game) => game._id);
    const getListing = async () => {
      const responseData = await sendRequest("/api/game", "PATCH", {
        title: query.title,
        platform: query.platform,
        gamesToHide: selectedGamesID,
        page: query.page,
      });

      if (responseData) {
        setMatchedGames(responseData.queryData.matchedData);
        setPageData(responseData.queryData.pageData);
      }
    };
    getListing();
  }, [sendRequest, query, props.selectedGames]);

  // triggers whenever user types something in the search bar
  const searchBarHandler = (event) => {
    if (event.target.value) {
      setQuery({ ...query, title: event.target.value });
    }
  };

  // triggers when user changes the dropdown option
  const dropDownHandler = (event) => {
    if (event.target.value !== "All") {
      setQuery({ ...query, platform: event.target.value });
    }
  };

  // selected images are passed to the state of the parent components
  const onClickGame = (matchedGame) => {
    if (props.maxSelectionSize === 1) {
      props.setSelectedGames([{ ...matchedGame }]);
    } else if (props.maxSelectionSize > props.selectedGames.length) {
      props.setSelectedGames(props.selectedGames.concat({ ...matchedGame }));
    }
  };

  return (
    <div>
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
        matchedGames.map((matchedGame) => (
          <div className="matched-game-div" key={matchedGame._id}>
            <img
              src={BACKEND_ADDRESS + matchedGame.imageURL}
              alt={matchedGame.title + " on" + matchedGame.platform}
              className="matched-game-images"
              onClick={() => onClickGame(matchedGame)}
            />
          </div>
        ))}

      {
        //Only renders if pageData.previousPage = true
        pageData && pageData.previousPage && (
          <div>
            <input
              type="button"
              value="Previous page"
              id="previousPage"
              onClick={pageButtonHandler}
            />
          </div>
        )
      }
      {
        //Only renders if pageData.nextPage = true
        pageData && pageData.nextPage && (
          <div>
            <input
              type="button"
              value="Next page"
              id="nextPage"
              onClick={pageButtonHandler}
            />
          </div>
        )
      }
    </div>
  );
};

export default AddGames;
