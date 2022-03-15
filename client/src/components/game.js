import React, { useState } from "react";

const Game = () => {
  const gameName = localStorage.getItem("gameName");
  return <iframe src={`games/${gameName}.html`} title="game" />;
};

export default Game;
