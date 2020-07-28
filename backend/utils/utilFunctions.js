const addImageURL = (games) => {
  // appends image url to games
  for (game of games) {
    let [gameName, gamePlatform] = game;
    gameName = gameName
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
    gamePlatform = gamePlatform
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
    game[game.length] = `/images/${gamePlatform}/${gameName}.jpg`;
  }
  return games;
};

exports.addImageURL = addImageURL;
