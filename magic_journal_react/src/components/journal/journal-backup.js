//import jquery

import React, { useState, useContext, useEffect } from "react";
// import $ from "jquery";
import { MyContext } from "../../contexts/myContext";
import "./journal.css";
import API from "../../utils/API";

export class Vector {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  pos;
  vel;
  radius;
  fillStyle;
  constructor(x, y, fillStyle) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(
      (Math.random() * 2 - 1) * 0.1,
      (Math.random() * 2 - 1) * 0.5
    );

    this.radius = Math.floor(Math.random() * 10 + 5);
    this.fillStyle = fillStyle;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.fillStyle = this.fillStyle;

    const outerRadius = this.radius;
    const innerRadius = this.radius / 2;
    const spikes = 5; // Number of spikes for the star

    let rotation = (Math.PI / 2) * 3;
    let x = 0;
    let y = 0;

    const step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = this.pos.x + Math.cos(rotation) * outerRadius;
      y = this.pos.y + Math.sin(rotation) * outerRadius;
      context.lineTo(x, y);
      rotation += step;

      x = this.pos.x + Math.cos(rotation) * innerRadius;
      y = this.pos.y + Math.sin(rotation) * innerRadius;
      context.lineTo(x, y);
      rotation += step;
    }

    context.lineTo(this.pos.x, this.pos.y - outerRadius);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
    context.fill();

    context.restore();
  }
}

const Journal = () => {
  const getJournalorDreams = function () {
    var formattedDate = new Date().toISOString().slice(0, 10);
    console.log(formattedDate);
    if (journalMode === "dreams") {
      API.getDreamsbyDate({
        userId: userProfile.id,
        date: formattedDate,
      })
        .then((response) => {
          console.log("dreams gotten");
          console.log(response.data);
          setAllMyJournals(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (journalMode === "journal") {
      API.getJournalsByDate({
        userId: userProfile.id,
        date: formattedDate,
      })
        .then((response) => {
          console.log("journals gotten" + response);
          console.log(response.data);
          setAllMyJournals(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    // createJournalAnimation();
    getJournalorDreams();
  }, []);

  function setDreamSymbolsFunction(e) {
    e.stopPropagation();
    e.preventDefault();
    var journalSymbol = document.getElementById("journalSymbolInput").value;

    setDreamSymbols([...dreamSymbols, journalSymbol]);
    console.log(dreamSymbols);
  }
  const [dreamSymbols, setDreamSymbols] = useState([]);
  var agents = [];

  function onWindowResize(e) {
    console.log(e.target);
    console.log(e.target.innerWidth);
    canvasHeight = e.target.innerHeight + 300;
    canvasWidth = e.target.innerWidth;
  }

  function sketch(canvasWidth, canvasHeight) {
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * canvasWidth);
      const y = Math.floor(Math.random() * canvasHeight);
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      agents.push(new Agent(x, y, color));
    }
  }

  let dotsmove = "on";

  let canvasHeight;
  let canvasWidth;
  let elapsed;
  let now;
  function tick() {
    if (agents.length > 0 && dotsmove == "on") {
      // console.log(waterColor)
      // this.context.fillStyle = this.waterColor;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
      for (let i = 0; i < agents.length; i++) {
        agents[i].update();
        agents[i].draw(context);
        agents[i].bounce(
          canvasWidth / 2,

          canvasHeight / 2
        );
      }
    }
    window.requestAnimationFrame(tick);

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
    }
  }
  let canvas;
  let context;
  let fpsInterval;
  let then;
  let startTime;
  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    tick();
  }

  function createJournalAnimation() {
    canvas = document.getElementById("journalCanvas");
    context = canvas.getContext("2d");
    canvasHeight = canvas.height;
    canvasWidth = canvas.width;
    console.log("height ", canvasHeight);
    console.log("width", canvasWidth);

    sketch(canvasWidth / 2, canvasHeight / 2);
    startAnimating(60);
  }

  function submitJournalOrDream(e) {
    e.preventDefault();
    e.stopPropagation();
    var journalEntry = document.getElementById("journalInput").value;
    

    setAllMyJournals([...allMyJournals, newEntry])
    if (journalMode === "dreams") {
          var newEntry = {
            userId: userProfile.id,
            dream: journalEntry,
            symbols: dreamSymbols.toString(),
          };
      API.submitDreams({
     newEntry
      })
        .then((response) => {
          // If the API call is successful, fire another function
          if (response.status === 200) {
            // Call your other function here
            // functionName();
            console.log("calling the new function");
            

            //route to spread page using the reacr router with props.parameters
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      API.submitJournal({
        userId: userProfile.id,
        writing: journalEntry,
        symbols: dreamSymbols.toString(),
      })
        .then((response) => {
          // If the API call is successful, fire another function
          if (response.status === 200) {
            // Call your other function here
            // functionName();
            console.log("calling the new function");

            //route to spread page using the reacr router with props.parameters
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const contextValues = useContext(MyContext);
  const { userProfile, setUserProfile } = contextValues || {};

  const [allMyJournals, setAllMyJournals] = useState([]);
  const [newJournal, setNewJournal] = useState({
    title: "",
    entry: "",
    date: "",
  });
  const journalModes = ["dreams", "journal"];

  const [journalMode, setJournalMode] = useState("journal");

  useEffect(() => {
    // createJournalAnimation();
    getJournalorDreams();
  }, [journalMode]);

  return (
    <div className={"row table " + journalMode}>
      {/* <canvas id="journalCanvas" /> */}
      <div className={"col-12 " + journalMode + " topRow"}>
        <div className="modeSelectJournal">
          {journalModes.map((mode) => (
            <button onClick={() => setJournalMode(mode)}>{mode}</button>
          ))}
        </div>
        <div id="recordLabel">record your {journalMode}</div>
        <form
          className="journalForm"
          onSubmit={(e) => {
            submitJournalOrDream(e);
          }}
        >
          <textarea id="journalInput"></textarea>
          <label name="symbolsLable" id="symbolLable">
            symbols
          </label>

          <input type="submit"></input>
        </form>
        <form
          id="symbolsForm"
          onSubmit={(e) => {
            setDreamSymbolsFunction(e);
          }}
        >
          <input id="journalSymbolInput" name="symbols" type="text"></input>
          <div className="selectedSymbolsDiv">
            {dreamSymbols.length > 0
              ? dreamSymbols.map((symbol) => {
                  return <div>{symbol}</div>;
                })
              : null}
          </div>
        </form>
      </div>
      <div className="listOfEntries">
        {/* if journalmode is journal display all journals*/}

        {allMyJournals.map((journal) =>
          journalMode === "dreams" ? (
            <div style={{ color: "white" }}>{journal.dream}</div>
          ) : (
            <div>{journal.writing}</div>
          )
        )}
      </div>
    </div>
  );
};

export default Journal;
