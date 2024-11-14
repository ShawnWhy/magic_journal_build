// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection = require("./connection");
const spread = require("../models/spread");
const { or } = require("sequelize");
const reading = require("../models/reading");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;


const mockUsers = {
  "jim@joesrobotshop.com": {
    firstName: "Jim",
    lastName: "Cooper",
    email: "jim@joesrobotshop.com",
    password: "very-secret",
  },
  "joe@joesrobotshop.com": {
    firstName: "Joe",
    lastName: "Eames",
    email: "joe@joesrobotshop.com",
    password: "super-secret",
  },
};

// var mysql = require("mysql");
// const { ConnectionError } = require("sequelize");
module.exports = function (app) {
  //sign up a new user
  app.post("/api/signup", function (req, res) {
    console.log("signing up");
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    })

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
      });
  });
  //login a user
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("logging in");
    res.json(req.user);
  });

  //delete user
  app.delete("/api/deleteUser/:id", function (req, res) {
    console.log("deleting user");
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  app.get("/api/mockusers", (req, res) => {
    res.send(mockUsers);
  });

  app.post("/api/getDaysJournals", function (req, res) {
        console.log(req.body);

    console.log("getting days journals");
    db.Journal.findAll({
      where: Sequelize.and(
        Sequelize.where(
          Sequelize.fn("date_format", Sequelize.col("date"), "%Y-%m-%d"),
          "=",
          req.body.date
        ),
        { userId: parseInt(req.body.userId) }
      ),
    }).then(function (result) {
      res.json(result);
    });
    //catching errors
  });

  //get the days spreads
  app.get("/api/getDaysSpreads", function (req, res) {
    console.log("getting spreads");
    db.Spread.findAll({
      where: {
        userId: req.params.id,
        date: req.params.date,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  //get the days dreams
  app.post("/api/getDaysDreams", function (req, res) {
    console.log("getting dreams");
 db.Dream.findAll({
   where: Sequelize.and(
     Sequelize.where(
       Sequelize.fn("date_format", Sequelize.col("date"), "%Y-%m-%d"),
       "=",
       req.body.date
     ),
     { userId: parseInt(req.body.userId) }
   ),
 }).then(function (result) {
   res.json(result);
 });
  });
  //get the readings for each spread
  app.get("/api/getSpreadReadings", function (req, res) {
    console.log("getting readings");
    db.Reading.findAll({
      where: {
        userId: req.params.id,
        spreadId: req.params.spreadId,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  //get all journals for the month
  app.post("/api/getMonthJournals", function (req, res) {
    console.log("getting Months journals");
    console.log(req.body);
    if (req.body.month == null) {
      console.log("month is null")
      //get the first and last day of the month based on the date passed in
      var firstDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      var lastDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      );
    } else {

      console.log("month is not null")
      var firstDay = new Date(req.body.year, req.body.month, 1);
      //get the last day of the month
      var lastDay = new Date(req.body.year, req.body.month + 1, 0);
    }
    console.log("firstday "+ firstDay);
    console.log("lastday "+ lastDay); 
    db.Journal.findAll({
      where: {
        userId: req.body.id,
        //date is larger or equal to the first day of the month
        //date is lesser or equal to the last day of the month
        date: {
          [Op.between]: [firstDay, lastDay],
        },
      },
      order: [
        ["date", "DESC"],
        ["id", "ASC"],
      ],
    }).then(function (result) {
      res.json(result);
    });
  });

  //get spread by id
  app.get("/api/getSpreadById/:id", function (req, res) {
    console.log("getting spread");
    db.Spread.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  //get all spreads for the month
  app.post("/api/getMonthSpreads", function (req, res) {
    console.log("getting spreads");
    if (req.body.month == null) {
      //get the first and last day of the month based on the date passed in
      var firstDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      var lastDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      );
    } else {
      var firstDay = new Date(new Date().getFullYear(), req.body.month, 1);
      var lastDay = new Date(new Date().getFullYear(), req.body.month + 1, 0);
    }
    db.Spread.findAll({
      where: {
        SeekerId: req.body.id,
        //date is larger or equal to the first day of the month
        //date is lesser or equal to the last day of the month
        date: {
          [Op.between]: [firstDay, lastDay],
        },
      },
      order: [
        ["date", "DESC"],
        ["id", "ASC"],
      ],
    }).then(function (result) {
      res.json(result);
    });
  });

  app.get("/api/getJournalsByUser/:id", function (req, res) {
    console.log("getting journals");
    db.Journal.findAll({
      where: {
        userId: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    }).catch(function(err){
      res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
    });
  }
);

app.get("/api/getDreamsByUser/:id", function (req, res) {
  console.log("getting dreams");
  db.Dream.findAll({
    where: {
      userId: req.params.id,
    },
  }).then(function (result) {
    res.json(result);
  }).catch(function(err){
    res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
  });
});

app.get("/api/getReadingsByUser/:id", function (req, res) {
  console.log("getting readings");
  db.Reading.findAll({
    where: {
      SeekerId: req.params.id,
    },
  }).then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
  }
  );
  
});



  app.get('/api/getSpreadsByUser/:id', function(req, res){
    console.log("getting the user's spreads")
    console.log(req.params.id)
    db.Spread.findAll({
      where: {
        SeekerId : req.params.id
      }

    }).then(function(result){
      res.json(result)
    }

  ).catch(function(err){
    res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
  });
  });

  //get all dreams for the month

  app.post("/api/getMonthDreams", function (req, res) {
    console.log("getting months dreams");
    console.log(req.body);
    if (req.body.month == null) {
      //get the first and last day of the month based on the date passed in
      var firstDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      var lastDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      );
    } else {
      var firstDay = new Date(new Date().getFullYear(), req.body.month, 1);
      var lastDay = new Date(new Date().getFullYear(), req.body.month + 1, 0);
    }
    db.Dream.findAll({
      where: {
        userId: req.body.id,
        //date is larger or equal to the first day of the month
        //date is lesser or equal to the last day of the month
        date: {
          [Op.between]: [firstDay, lastDay],
        },
      },
      order: [
        ["date", "DESC"],
        ["id", "ASC"],
      ],
    }).then(function (result) {
      res.json(result);
    });
  });

  //get all readings for the month
  app.get("/api/getMonthReadings", function (req, res) {
    console.log("getting readings");
    if (req.params.month == null) {
      //get the first and last day of the month based on the date passed in
      var firstDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      var lastDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      );
    } else {
      var firstDay = new Date(new Date().getFullYear(), req.params.month, 1);
      var lastDay = new Date(new Date().getFullYear(), req.params.month + 1, 0);
    }
    db.Reading.findAll({
      where: {
        userId: req.params.id,
        //date is larger or equal to the first day of the month
        //date is lesser or equal to the last day of the month
        date: {
          [Op.between]: [firstDay, lastDay],
        },
      },
      order: [
        ["date", "DESC"],
        ["SpreadId", "ASC"],
        ["ReaderName", "ASC"],
      ],
    }).then(function (result) {
      res.json(result);
    });
  });


  //get all of my readings
  app.get("/api/getReadingsByReader/:id", function (req, res) {
    console.log("getting readings");
    db.Reading.findAll({
      where: {
        ReaderId: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  //get all of readings for a spread
  app.get("/api/getReadingsBySpread/:id", function (req, res) {
    console.log("getting readings");
    db.Reading.findAll({
      where: {
        SpreadId: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  //create a journal entry
  app.post("/api/createJournal", function (req, res) {
    console.log("creating journal");
    console.log(req.body);
    db.Journal.create({
      userId: req.body.userId,
      writing: req.body.writing,
      symbols: req.body.symbols,
    })

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
      });
  });

  //create a spread entry
  app.post("/api/createSpread", function (req, res) {
    console.log("creating spread");
    console.log(req.body);
    db.Spread.create({
      SeekerId: req.body.userId,
      SeekerName: req.body.userName,
      Question: req.body.question,
      SpreadType: req.body.spreadType,
      Cards: req.body.cards,
    })

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res
          .status(500)
          .send("Oops! Something went wrong. Please try again." + err); // Dominance level increased!
      });
  });

  //create a dream entry
  app.post("/api/createDream", function (req, res) {
    console.log("creating dream");
    console.log(req.body);
    var symbols;
    if(req.body.symbols){
      symbols = req.body.symbols
    }
    else{
      symbols = 'something, something, something'
    }
    db.Dream.create({
      userId: parseInt(req.body.userId),
      dream: req.body.dream,
      symbols: symbols,
    })

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send("Oops! Something went wrong. Please try again.", err); // Dominance level increased!
      });
  });

  //create a reading entry
  app.post("/api/createReading", function (req, res) {
    console.log("creating reading");
    console.log(req.body);
    db.Reading.create({
      SpreadId: req.body.spreadId,
      SpreadType: req.body.spreadType,
      SeekerId: req.body.seekerId,
      SeekerName: req.body.seekerName,
      Question: req.body.question,
      ReaderId: req.body.readerId,
      ReaderName: req.body.ReaderName,
      Symbols: req.body.Symbols,
      ReadingText: req.body.ReadingText,
    })

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err); // Dominance level increased!
      });
  });

  //update a journal entry
  app.put("/api/updateJournal/:id", function (req, res) {
    console.log("updating journal");
    console.log(req.body);
    db.Journal.update(
      {
        writing: req.body.writing,
        symbols: req.body.symbols,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
      });
  });

  //update a reading entry
  app.put("/api/updateReading/:id", function (req, res) {
    console.log("updating reading");
    console.log(req.body);
    db.Reading.update(
      {
        ReadingText: req.body.readingText,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
      });
  });

  app.post("/api/editJournal", function (req, res) {  
    console.log("editing journal");
    console.log(req.body);
    db.Journal.update(
      {
        writing: req.body.writing,
        symbols: req.body.symbols,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  } );
  //delete a journal entry
  app.delete("/api/deleteJournal/:id", function (req, res) {
    console.log("deleting journal");
    db.Journal.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });
  //delete a spread entry
  app.delete("/api/deleteSpread/:id", function (req, res) {
    console.log("deleting spread");
    db.Spread.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });
  app.post("/api/editDream", function (req, res) {
    console.log("editing dream");
    console.log(req.body);
    db.Dream.update(
      {
        dream: req.body.dream,
        symbols: req.body.symbols,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
  })
  });
  //delete a dream entry
  app.delete("/api/deleteDream/:id", function (req, res) {
    console.log("deleting dream");
    db.Dream.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  app.post("/api/editReading", function (req, res) {
    console.log("editing reading");
    console.log(req.body);
    db.Reading.update(
      {
        ReadingText: req.body.readingText,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  app.get("/api/getReadingsByReader/:id", function (req, res) {
    console.log("getting readings");
    db.Reading.findAll({
      where: {
        ReaderId: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  }
  );
  //delete a reading entry
  app.delete("/api/deleteReading/:id", function (req, res) {
    console.log("deleting reading");
    db.Reading.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

 
  // get all dreams based on symbol
  app.get("/api/getSymbolDreams", function (req, res) {
    console.log("getting dreams");
    db.Dream.findAll({
      where: {
        userId: req.params.id,
        symbols: {
          [Op.in]: req.params.symbols,
        },
      },
    }).then(function (result) {
      res.json(result);
    });
  });
  //get all readings based on symbol
  app.get("/api/getSymbolReadings", function (req, res) {
    console.log("getting readings");
    db.Reading.findAll({
      where: {
        SeekerId: req.params.userid,
        //symbols in the list of symbols
      },
    }).then(function (result) {
      let symbolResult = []
      result.forEach(reading => {
        let symbols = reading.Symbols.split(", ");
        if (symbols.includes(req.params.symbol)) {
          symbolResult.push(reading)
        }
      })
      res.json(symbolResult);
    }).catch(function (err) {
      res.status(500).send("Oops! Something went wrong. Please try again."); // Dominance level increased!
    }
    );
  });

  
};



  
