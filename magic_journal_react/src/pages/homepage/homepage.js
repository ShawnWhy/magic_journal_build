import React, {useEffect, useState, useContext } from "react";
import { MyContext } from "../../contexts/myContext";
import API from "../../utils/API"
import Style from "./homepage.css"
import Cards from "../../components/cards/cards"
import Journal from "../../components/journal";

function Homepage(props) {
  const gameOptions = [
    { value: "journal", label: "Journal" },
    { value: "cards", label: "Cards" },
  ];
  //switch journal or cards
  const [gameMode, setGameMode] = useState("cards");

  useEffect(() => {
    console.log("home page use effect");
    API.getMockData()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [warnMessageItem, setWarnMessageItem] = useState({
    status: "off",
    message: "",
  });

  const contextValues = useContext(MyContext);
  const { userProfile, setUserProfile } = contextValues || {};
  console.log("home profile");
  console.log(userProfile);
  //useState my journals
  const [allMyJournals, setAllMyJournals] = useState([]);

  return (
    <div class="homePage">
      <h1>Homepage</h1>
      <div className="gameOptions">
        <label htmlFor="gameMode">Choose a game mode:</label>
        <input
          type="radio"
          id="journal"
          name="gameMode"
          value="journal"
          checked={gameMode === "journal"}
          onChange={(e) => setGameMode(e.target.value)}
        />
        <label htmlFor="journal">Journal</label>
        <input
          type="radio"
          id="cards"
          name="gameMode"
          value="cards"
          checked={gameMode === "cards"}
          onChange={(e) => setGameMode(e.target.value)}
        />
        <label htmlFor="cards">Cards</label>
      </div>
      <div
        className="JournalComponent gameComponent"
        style={{ display: gameMode === "journal" ? "block" : "none" }}
      >
        <Journal />
      </div>
      <div
        className="cardComponent gameComponent"
        style={{ display: gameMode === "cards" ? "block" : "none" }}
      >
        <Cards />
      </div>
    </div>
  );
}


export default Homepage;
