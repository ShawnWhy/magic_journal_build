//import jquery

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
// import $ from "jquery";
import "./spreadReadPage.css";
import { MyContext } from "../../contexts/myContext";
import API from "../../utils/API";
import ace_of_swords from "../../public/images/cards/ace of swords.jpg";
import two_of_swords from "../../public/images/cards/2 of swords.jpg";
import three_of_swords from "../../public/images/cards/3 of swords.jpg";
import four_of_swords from "../../public/images/cards/4 of swords.jpg";
import five_of_swords from "../../public/images/cards/5 of swords.jpg";
import six_of_swords from "../../public/images/cards/6 of swords.jpg";
import seven_of_swords from "../../public/images/cards/7 of swords.jpg";
import eight_of_swords from "../../public/images/cards/8 of swords.jpg";
import nine_of_swords from "../../public/images/cards/9 of swords.jpg";
import ten_of_swords from "../../public/images/cards/10 of swords.jpg";
import page_of_swords from "../../public/images/cards/page of swords.jpg";
import knight_of_swords from "../../public/images/cards/knight of swords.jpg";
import queen_of_swords from "../../public/images/cards/queen of swords.jpg";
import king_of_swords from "../../public/images/cards/king of swords.jpg";
import ace_of_wands from "../../public/images/cards/ace of wands.jpg";
import two_of_wands from "../../public/images/cards/2 of wands.jpg";
import three_of_wands from "../../public/images/cards/3 of wands.jpg";
import four_of_wands from "../../public/images/cards/4 of wands.jpg";
import five_of_wands from "../../public/images/cards/5 of wands.jpg";
import six_of_wands from "../../public/images/cards/6 of wands.jpg";
import seven_of_wands from "../../public/images/cards/7 of wands.jpg";
import eight_of_wands from "../../public/images/cards/8 of wands.jpg";
import nine_of_wands from "../../public/images/cards/9 of wands.jpg";
import ten_of_wands from "../../public/images/cards/10 of wands.jpg";
import page_of_wands from "../../public/images/cards/page of wands.jpg";
import knight_of_wands from "../../public/images/cards/knight of wands.jpg";
import queen_of_wands from "../../public/images/cards/queen of wands.jpg";
import king_of_wands from "../../public/images/cards/king of wands.jpg";
import ace_of_pentacle from "../../public/images/cards/ace of pentacle.jpg";
import two_of_pentacle from "../../public/images/cards/2 of pentacle.jpg";
import three_of_pentacle from "../../public/images/cards/3 of pentacle.jpg";
import four_of_pentacle from "../../public/images/cards/4 of pentacle.jpg";
import five_of_pentacle from "../../public/images/cards/5 of pentacle.jpg";
import six_of_pentacle from "../../public/images/cards/6 of pentacle.jpg";
import seven_of_pentacle from "../../public/images/cards/7 of pentacle.jpg";
import eight_of_pentacle from "../../public/images/cards/8 of pentacle.jpg";
import nine_of_pentacle from "../../public/images/cards/9 of pentacle.jpg";
import ten_of_pentacle from "../../public/images/cards/10 of pentacle.jpg";
import page_of_pentacle from "../../public/images/cards/page of pentacle.jpg";
import knight_of_pentacle from "../../public/images/cards/knight of pentacle.jpg";
import queen_of_pentacle from "../../public/images/cards/queen of pentacle.jpg";
import king_of_pentacle from "../../public/images/cards/king of pentacle.jpg";
import ace_of_cups from "../../public/images/cards/ace of cups.jpg";
import two_of_cups from "../../public/images/cards/2 of cups.jpg";
import three_of_cups from "../../public/images/cards/3 of cups.jpg";
import four_of_cups from "../../public/images/cards/4 of cups.jpg";
import five_of_cups from "../../public/images/cards/5 of cups.jpg";
import six_of_cups from "../../public/images/cards/6 of cups.jpg";
import seven_of_cups from "../../public/images/cards/7 of cups.jpg";
import eight_of_cups from "../../public/images/cards/8 of cups.jpg";
import nine_of_cups from "../../public/images/cards/9 of cups.jpg";
import ten_of_cups from "../../public/images/cards/10 of cups.jpg";
import page_of_cups from "../../public/images/cards/page of cups.jpg";
import knight_of_cups from "../../public/images/cards/knight of cups.jpg";
import queen_of_cups from "../../public/images/cards/queen of cups.jpg";
import king_of_cups from "../../public/images/cards/king of cups.jpg";
import card_back from "../../public/images/cards/card-back.jpg";
import The_Fool from "../../public/images/cards/The Fool.jpg";
import The_Empress from "../../public/images/cards/The Empress.jpg";
import The_Emperor from "../../public/images/cards/The Emperor.jpg";
import The_Hierophant from "../../public/images/cards/The Hierophant.jpg";
import The_Magician from "../../public/images/cards/The Magician.jpg";
import The_High_Priestess from "../../public/images/cards/The High Priestess.jpg";
import The_World from "../../public/images/cards/The World.jpg";
import The_Lovers from "../../public/images/cards/The Lovers.jpg";
import The_Hermit from "../../public/images/cards/The Hermit.jpg";
import The_Wheel_of_Fortune from "../../public/images/cards/The Wheel of Fortune.jpg";
import Death from "../../public/images/cards/Death.jpg";
import The_Devil from "../../public/images/cards/The Devil.jpg";
import The_Tower from "../../public/images/cards/The Tower.jpg";
import Justice from "../../public/images/cards/Justice.jpg";
import Temperance from "../../public/images/cards/Temperance.jpg";
import The_Sun from "../../public/images/cards/The Sun.jpg";
import The_Moon from "../../public/images/cards/The Moon.jpg";
import The_Star from "../../public/images/cards/The Star.jpg";
import Judgement from "../../public/images/cards/Judgement.jpg";
import The_Chariot from "../../public/images/cards/The Chariot.jpg";
import Strength from "../../public/images/cards/Strength.jpg";
import The_Hanged_Man from "../../public/images/cards/The Hanged Man.jpg";
import { spread } from "axios";


const cardLibrary = { 
  "ace of swords": ace_of_swords,
  "2 of swords": two_of_swords,
  "3 of swords": three_of_swords,
  "4 of swords": four_of_swords,
  "5 of swords": five_of_swords,
  "6 of swords": six_of_swords,
  "7 of swords": seven_of_swords,
  "8 of swords": eight_of_swords,
  "9 of swords": nine_of_swords,
  "10 of swords": ten_of_swords,
  "page of swords": page_of_swords,
  "knight of swords": knight_of_swords,
  "queen of swords": queen_of_swords,
  "king of swords": king_of_swords,
  "ace of wands": ace_of_wands,
  "2 of wands": two_of_wands,
  "3 of wands": three_of_wands,
  "4 of wands": four_of_wands,
  "5 of wands": five_of_wands,
  "6 of wands": six_of_wands,

  "7 of wands": seven_of_wands,
  "8 of wands": eight_of_wands,
  "9 of wands": nine_of_wands,
  "10 of wands": ten_of_wands,
  "page of wands": page_of_wands,
  "knight of wands": knight_of_wands,
  "queen of wands": queen_of_wands,
  "king of wands": king_of_wands,
  "ace of pentacle": ace_of_pentacle,
  "2 of pentacle": two_of_pentacle,
  "3 of pentacle": three_of_pentacle,
  "4 of pentacle": four_of_pentacle,
  "5 of pentacle": five_of_pentacle,
  "6 of pentacle": six_of_pentacle,
  "7 of pentacle": seven_of_pentacle,
  "8 of pentacle": eight_of_pentacle,
  "9 of pentacle": nine_of_pentacle,
  "10 of pentacle": ten_of_pentacle,
  "page of pentacle": page_of_pentacle,
  "knight of pentacle": knight_of_pentacle,
  "queen of pentacle": queen_of_pentacle,
  "king of pentacle": king_of_pentacle,
  "ace of cups": ace_of_cups,
  "2 of cups": two_of_cups,
  "3 of cups": three_of_cups,
  "4 of cups": four_of_cups,
  "5 of cups": five_of_cups,
  "6 of cups": six_of_cups,
  "7 of cups": seven_of_cups,
  "8 of cups": eight_of_cups,
  "9 of cups": nine_of_cups,
  "10 of cups": ten_of_cups,
  "page of cups": page_of_cups,
  "knight of cups": knight_of_cups,
  "queen of cups": queen_of_cups,
  "king of cups": king_of_cups,
  "The Fool": The_Fool,
  "The Empress": The_Empress,
  "The Emperor": The_Emperor,
  "The Hierophant": The_Hierophant,
  "The Magician": The_Magician,
  "The High Priestess": The_High_Priestess,
  "The World": The_World,
  "The Lovers": The_Lovers,
  "The Hermit": The_Hermit,
  "The Wheel of Fortune": The_Wheel_of_Fortune,
  "Death": Death,
  "The Devil": The_Devil,
  "The Tower": The_Tower,
  "Justice": Justice,
  "Temperance": Temperance,
  "The Sun": The_Sun,
  "The Moon": The_Moon,
  "The Star": The_Star,
  "Judgement": Judgement,
  "The Chariot": The_Chariot,
  "Strength": Strength,
  "The Hanged Man": The_Hanged_Man,
};



const SpreadReadPage = function(props) {
  //using the main context


  //take variable from the parameters and use the id to call the api
  //take variable from the parameters and use the id to call the api
  console.log("props", props);
  let { id } = useParams();

  console.log("params:", id);
  //useState to store the data from the api
  //use the id to call the api for the spread data
  const [spreadData, setSpreadData] = useState({});
  const [cardsData, setCardsData] = useState([
    "ace of swords",
    "2 of swords",
    "3 of swords",
  ]);
  //useState to store the data from the api
  //use the id to call the api for the spread data
  const callAPI = function () {
    API.getSpreadbyID(id)

      .then((res) => {
        console.log(res.data);
        setSpreadData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    callAPI();
  }, []);
  useEffect(() => {
    console.log(spreadData);
    //parse string into array
    if (spreadData.Cards) {
      setCardsData(spreadData.Cards.split(","));
      getReadings();
    }
  }, [spreadData]);

  useEffect(() => {
    console.log("cardsData", cardsData);
    createCards();
  }, [cardsData]);

 
  const { userProfile, setUserProfile } = useContext(MyContext);
  const [readings, setReadings] = useState([]);

  function getReadings(){
    if(spreadData.SeekerName===userProfile.name){
      API.getReadingsBySpread(spreadData.id).then((res)=>{
        setReadings(res.data);

          }).catch((err)=>{console.log(err)}
          )
  }
}
  var majorArcana = [
    "The Fool",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Magician",
    "The High Priestess",
    "The World",
    "The Lovers",
    "The Hermit",
    "The Wheel of Fortune",
    "Death",
    "The Devil",
    "The Tower",
    "Justice",
    "Temperance",
    "The Sun",
    "The Moon",
    "The Star",
    "Judgement",
    "The Chariot",
    "Strength",
    "The Hanged Man",
  ];

  var swords = [
    "ace of swords",
    "2 of swords",
    "3 of swords",
    "4 of swords",
    "5 of swords",
    "6 of swords",
    "7 of swords",
    "8 of swords",
    "9 of swords",
    "10 of swords",
    "page of swords",
    "knight of swords",
    "queen of swords",
    "king of swords",
  ];

  var wands = [
    "ace of wands",
    "2 of wands",
    "3 of wands",
    "4 of wands",
    "5 of wands",
    "6 of wands",
    "7 of wands",
    "8 of wands",
    "9 of wands",
    "10 of wands",
    "page of wands",
    "knight of wands",
    "queen of wands",
    "king of wands",
  ];

  var pentacle = [
    "ace of pentacle",
    "2 of pentacle",
    "3 of pentacle",
    "4 of pentacle",
    "5 of pentacle",
    "6 of pentacle",
    "7 of pentacle",
    "8 of pentacle",
    "9 of pentacle",
    "10 of pentacle",
    "page of pentacle",
    "knight of pentacle",
    "queen of pentacle",
    "king of pentacle",
  ];

  var cups = [
    "ace of cups",
    "2 of cups",
    "3 of cups",
    "4 of cups",
    "5 of cups",
    "6 of cups",
    "7 of cups",
    "8 of cups",
    "9 of cups",
    "10 of cups",
    "page of cups",
    "knight of cups",
    "queen of cups",
    "king of cups",
  ];

  const [cardSymbols, setCardSymbols] = useState([
    
  ]); 

  function addSymbol(e) {
    e.preventDefault();
    e.stopPropagation();
    var symbol = document.getElementById("symbol").value;
    var symbolText = symbol;
    console.log(symbolText);
    setCardSymbols([...cardSymbols, symbolText]);
  }


  function submitReading(e){
         e.preventDefault();
        e.stopPropagation();
        console.log("submitting reading");
        var reading = document.getElementsByClassName("readingRecord")[0].value;
        console.log(reading);

    //         SpreadId: req.body.spreadId,
    // SpreadType: req.body.spreadType,
    // SeekerId: req.body.seekerId,
    // SeekerName: req.body.seekerName,
    // Question: req.body.question,
    // ReaderId: req.body.readerId,
    // ReaderName: req.body.readerName,
    // Symbols: req.body.symbols,
    // ReadingText: req.body.readingText
        var body = {
          spreadId: spreadData.id,
          spreadType: spreadData.SpreadType,
          seekerId: spreadData.SeekerId,
          seekerName: spreadData.SeekerName,
          question: spreadData.Question,
          readerId: parseInt(userProfile.id),
          readerName: userProfile.name,
          symbols: cardSymbols.toString(),
          readingText: reading,
        };
        console.log(body);
        API.createReading(body).then((res)=>{
          console.log(res);
          getReadings();
        }).catch((err)=>{console.log(err)});
      }

  function createCards() {
    console.log("create cards");
    console.log(cardsData);
    var table = document.getElementsByClassName("cardContainer")[0];
    if (spreadData.SpreadType && spreadData.SpreadType === "3_card_spread") {
      spreadData.SpreadType = "three_card_spread";
    }
    table.classList.add(spreadData.SpreadType);

    table.innerHTML = "";
    table.classList = "cardContainer" + " " + spreadData.SpreadType;

    var cardList = [];
    if (spreadData.SpreadType == "celtic_cross") {
      var leftHand = document.createElement("div");
      leftHand.classList.add("leftHand");
      var topRow = document.createElement("div");
      topRow.classList.add("cardRow");
      topRow.classList.add("topRow");
      leftHand.appendChild(topRow);
      var middleRow = document.createElement("div");
      middleRow.classList.add("cardRow");
      middleRow.classList.add("middleRow");
      leftHand.appendChild(middleRow);
      var bottomRow = document.createElement("div");
      bottomRow.classList.add("cardRow");
      bottomRow.classList.add("bottomRow");
      leftHand.appendChild(bottomRow);
      table.appendChild(leftHand);
      var rightHand = document.createElement("div");
      rightHand.classList.add("rightHand");
      table.appendChild(rightHand);

      for (var i = 0; i < 10; i++) {
        var card = cardsData[i];
        console.log(card);
        var cardImage = cardLibrary[card];
        console.log(cardImage);
        var cardElement = document.createElement("div");
        cardElement.classList.add("spreadCard");
        cardElement.classList.add(spreadData.SpreadType);
        var cardImageElement = document.createElement("img");
        cardImageElement.src = cardImage;
        cardImageElement.alt = card;
        cardElement.appendChild(cardImageElement);
        if (i === 2) {
          topRow.appendChild(cardElement);
        }
        if (i === 0 || i === 1 || i === 4 || i === 5) {
          cardElement.classList.add("spreadCard" + (i + 1));
          middleRow.appendChild(cardElement);
        }
        if (i === 3) {
          bottomRow.appendChild(cardElement);
        }

        if (i >= 6) {
          rightHand.prepend(cardElement);
        }
      }
    } else {
      for (var i = 0; i < cardsData.length; i++) {
        var card = cardsData[i];
        console.log(card);
        var cardImage = cardLibrary[card];
        console.log(cardImage);
        var cardElement = document.createElement("div");
        cardElement.classList.add("spreadCard");
        cardElement.classList.add(spreadData.SpreadType);
        var cardImageElement = document.createElement("img");
        cardImageElement.src = cardImage;
        cardImageElement.alt = card;
        cardElement.appendChild(cardImageElement);
        table.appendChild(cardElement);
      }
    }
  }

  return (
    <div
      className="table"
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        
      }}
    >
      <form
        onSubmit={(e) => {
          addSymbol(e);
        }}
      >
        <input
        type="text"
        id = "symbol"
        name = "symbol"
        ></input>
        </form>
      <div className="cardContainer"></div>
      <form onSubmit={(e)=>{
        submitReading(e);

      }}>
      
      <input type='text' className="readingRecord" />
      </form>
      <div className="symbolContainer">
      <ul>
        {cardSymbols.map((symbol, index) => {
          return <li key={index}>{symbol}</li>;
        })}
      </ul>
      </div>
      <div className="readingsContainer">
        <ul>
          {readings.map((reading, index) => {
            return <li key={index}>{reading.ReadingText}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

  


export default SpreadReadPage;