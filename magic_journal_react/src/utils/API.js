import axios from "axios";

export default {
  getMockData: function () {
    console.log("getting mock data");
    return axios.get("/api/mockusers");
  },

  createSpread: function (body) {
    console.log(body);
    return axios.post("/api/createSpread", body);
  },
  getSpreadbyID: function (id) {
    console.log("getting spreads");
    // console.log(id)
    return axios.get("/api/getSpreadbyID/" + id);
  },
  getMonthSpreads: function (body) {
    console.log("getting spreads by month");
    return axios.post("/api/getMonthSpreads",body);
  },
  createReading: function (body) {
    console.log("creating reading");
    return axios.post("/api/createReading", body);
  },
  getReadingsBySpread: function (id) {
    console.log("getting readings by spread");
    console.log(id);
    return axios.get("/api/getReadingsBySpread/" + id);
  },

  signUp: function (body) {
    console.log("signingup");
    return axios.post("/api/signUp", body);
  },

  logIn: function (body) {
    console.log("logginin");
    console.log(body);
    return axios.post("/api/login", body);
  },

  logOut: function () {
    console.log("logout");
    return axios.post("/logout");
  },

  getUserData: function () {
    console.log("getting your data");
    return axios.get("/api/user_data");
  },

  getOtherUser: function (id) {
    console.log("getting other user's data");
    return axios.get("/api/otherUserData/" + id);
  },

  getOtherUserItems: function (id) {
    console.log("getting other user's data");
    return axios.get("/api/otherUserItems/" + id);
  },

  getOtherUserData: function (id) {
    console.log("getting other user's data");
    return axios.get("/api/otherUserData/" + id);
  },
  submitJournal: function (body) {
    console.log("submitting journal");
    return axios.post("/api/createJournal", body);
  },

  submitDreams: function (body) {
    console.log("submitting dream");
    return axios.post("/api/createDream", body);
  },

  getDreamsbyDate: function (body) {
    console.log("getting today's dreams by you");
    return axios.post("/api/getDaysDreams", body);
  },

  getJournalsByDate: function (body) {
    console.log("getting today's journals");
    console.log(body);
    return axios.post("/api/getDaysJournals", body);
  },

  getJournalsByMonth: function (body) {
    console.log("getting this month's journals");
    console.log(body);
    return axios.post("/api/getMonthJournals", body);
  },

  getDreamsByMonth: function (body) {
    console.log("getting this month's dreams");
    console.log(body);
    return axios.post("/api/getMonthDreams", body);
  },

  getDreamsBySymbol: function (body) {
    console.log("getting dreams by symbol");
    console.log(body);
    return axios.post("/api/getDreamsBySymbol", body);
  },

  getDreamsByUser: function (id) {
    console.log("getting dreams by user");
    return axios.get("/api/getDreamsByUser/" + id);
  },

  getJournalsByUser: function (id) {
    console.log("getting journals by user");
    return axios.get("/api/getJournalsByUser/" + id);
  },

  getReadingsByUser: function (id) {
    console.log("getting readings by user");
    return axios.get("/api/getReadingsByUser/" + id);
  },

  getSpreadsByUser:function(id){
    console.log("getting user spreads")
    console.log(id)
    return axios.get("/api/getSpreadsByUser/"+id)
  }
};

// getAllEmployees: function() {
//   return axios.get("/api/employees");
// },

// getAllEmployeesPositionSort:function(){
//   return axios.get("/api/employeesPosition")
// },
// getAllEmployeesDateSort:function(){
//   return axios.get("/api/employeesDate")
// },

// getEmployee:function(newbody){
//   console.log("lls")
//   console.log(newbody)
//   return axios.post("/api/login", newbody);

// },
// getAllManagers: function() {
//   return axios.get("/api/managers/");
// },

// componentDidMount() {
//   axios.get('/auth/user').then(response => {
//     console.log(response.data)
//     if (!!response.data.user) {
//       console.log('THERE IS A USER')
//       this.setState({
//         loggedIn: true,
//         user: response.data.user
//       })
//     } else {
//       this.setState({
//         loggedIn: false,
//         user: null
//       })
//     }
//   })
// }

// _logout(event) {
//   event.preventDefault()
//   console.log('logging out')
//   axios.post('/auth/logout').then(response => {
//     console.log(response.data)
//     if (response.status === 200) {
//       this.setState({
//         loggedIn: false,
//         user: null
//       })
//     }
//   })
// }

// _login(username, password) {
//   axios
//     .post('/auth/login', {
//       username,
//       password
//     })
//     .then(response => {
//       console.log(response)
//       if (response.status === 200) {
//         // update the state
//         this.setState({
//           loggedIn: true,
//           user: response.data.user
//         })
//       }
//     })
// }
