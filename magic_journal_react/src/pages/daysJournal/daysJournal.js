import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./daysJournal.module.css";
import { useState, useContext } from "react";
import API from "../../utils/API";
import { MyContext } from "../../contexts/myContext";
import { useParams } from "react-router-dom";

const DaysJournal = function (props) {



  let { date } = useParams();
  console.log("params:", date);

  const [journallist, setJournalList] = useState([]);
  const { userProfile, setUserProfile } = useContext(MyContext);
  function getJournalList() {
    console.log("getting journal list", date);
    API.getJournalsByDate({
      date: date,
      userId: userProfile.id,
    }).then((res) => {
      console.log(res.data);
      setJournalList(res.data);
    });
  }

  useEffect(() => {
    getJournalList();
  }, []);

  console.log("params:", date);
  console.log("userid", userProfile.id);
  return (
    <div className={styles.daysJournal}>
      {journallist.map((journal) => {
        // if (journal.symbols) {
        //   //turn the symbols into an array
        //   journal.symbols = journal.symbols.split(",");
        // }
        if (!journal.writing) {
          journal.writing = "did not write anything";
        }

        return (
          <div>
            <p className="journalWriting">
             {journal.date} : {journal.writing}
              </p>
              <div className="symbolsList">
            {journal.symbols.length>0
              ? journal.symbols.split(',').map((symbol) => {
                  return (
                    <a href={'/symbolsJournal/'+symbol + '/journal' }>
                      <p className="journalSymbol">{symbol}</p>
                    </a>
                  );
                })
              : journal.symbols}
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default DaysJournal;
