const addImageURL = (games) => {
  // appends image url to games
  let newGamesArray;
  for (game of games) {
    let [gameName, gamePlatform] = game;
    gameName = gameName.replace(" ", "-").toLowerCase();
    gamePlatform = gamePlatform.replace(" ", "-").toLowerCase();
    game.push[`/images/${gamePlatform}/${gameName}`];
  }
  return newGamesArray;
};

exports.addImageURL = addImageURL;
