import React, { useEffect } from 'react';
import styles from './daysJournal.module.css';
import { useState, useContext } from 'react';
import API from '../../utils/API';
import { MyContext } from "../../contexts/myContext";
import { useParams } from "react-router-dom";


const DaysJournal = function(props){
  let { date } = useParams();
  console.log("params:", date);

  const [journallist, setJournalList] = useState([]);
  const { userProfile, setUserProfile } = useContext(MyContext);
  function getJournalList(){
    console.log("getting journal list", date);
    API.getJournalsByDate({
      date:date,
    userId:userProfile.id}).then((res) => {
      console.log(res.data);
      setJournalList(res.data);

    });
  }

  function setSymbolistToArray(jornalList){
   
    journallist.forEach((index,journal) => {
      if(journal.symbols){
        journal.symbols = journal.symbols.split(",");
        setJournalList([...journallist[index].symbols, journal.symbols]);
      }
      else{
        journal.symbols = [];
      }
      
    })
  }

  useEffect(() => {
    getJournalList();
  }, []);

  console.log("params:", date);
  console.log("userid", userProfile.id);
  return (
  <div className={styles.daysJournal}>
    {journallist.map((journal) => {
              // console.log("symbols", journal.symbols);


      if(!journal.writing){
        journal.writing = "did not write anything";
      }

      return (
        <div>
          <p className="journalWriting">{journal.writing}</p>
          {journal.symbols.lenght>0? journal.symbols.map((symbol) => {
            return (
              <p className="journalSymbol">{symbol}</p>
            );
          }
          ):<div>no symbol</div>}
          

        </div>
      );
    }
    )}
  </div>
  );
}


export default DaysJournal;
