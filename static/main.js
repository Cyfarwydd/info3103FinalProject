//import ../settings.py
//var x = "Port: " + location.port;

var app=new Vue({
  el: '#app',
  data: {
    // status: '',
    schs:  '',
    sch: '',
    addedSch: '',
    delSch: ''
  },

  created: function () {

  },

  methods:{

    signUpPost : function (port, userName, password, email){
      var postData = {
        Username: userName,
        Password: password,
        email: email
          };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          axios.post('http://info3103.cs.unb.ca:' + port + '/signup', postData, axiosConfig)
          .then((res) => {
            app.addedSch=res.data;
          })
          .catch((err) => {
            app.addedSch= err;
          });
    },//signUpPost

    signInPost : function (port, userName, password){
      var postData = {
        Username: userName,
        Password: password
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('http://info3103.cs.unb.ca:' + port + '/signin', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//signInPost

    signInGet : function (port){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('http://info3103.cs.unb.ca:' + port + '/signin', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//signInGet

    signInDelete : function (port){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.delete('http://info3103.cs.unb.ca:' + port + '/signin', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//signInDelete

    usersGet : function (port){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };

      axios.get('http://info3103.cs.unb.ca:' + port + '/users', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//usersGet

    userGet : function (port, userID){
      var postData = {
        userID: userID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('http://info3103.cs.unb.ca:' + port + '/users/' + userID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;user
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//userGet

    userDelete : function (port, userID){
      var postData = {
        userID: userID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.delete('http://info3103.cs.unb.ca:' + port + '/users/' + userID, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//userDelete

    listsGet : function (port, userID){
      var postData = {
        userID: userID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('http://info3103.cs.unb.ca:' + port + '/users/' + userID + '/lists', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//userGet






    addSchool : function (){

        var postData = {
          Name: "sch2",
          Province: "NB",
          Language: "EN",
          Level: "simple"

            };
          let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
              }
            };

            axios.post('http://info3103.cs.unb.ca:23487/schools', postData, axiosConfig)
            .then((res) => {
              app.addedSch=res.data;
            })
            .catch((err) => {
              app.addedSch= err;
            });
    },//end addSchool

        schoolIDget: function (schid) {
          // this.status='loading';
          var app=this;
          axios.get('http://info3103.cs.unb.ca:23487/schools/'+schid)
          .then(function (response){
            app.sch=response.data;
          })
          .catch(function(error){
            app.sch='An error ocurred: '+error;

          });

        },//end schoolIDget


	delSchool: function (schid) {
          // this.status='loading';
          var app=this;
          axios.delete('http://info3103.cs.unb.ca:23487/schools/'+schid)
          .then(function (response){
            app.delSch=response.data;
          })
          .catch(function(error){
            app.delSch='An error ocurred: '+error;

          });

        },//end delSchool


        schoolsget: function (port) {
          // this.status='loading';
          var app=this;
          axios.get('http://info3103.cs.unb.ca:' + port + '/schools')
          .then(function (response){
            app.schs=response.data.schools;
          })
          .catch(function(error){
            app.schs='An error ocurred: '+error;

          });

        },//end schoolsget

      }//end methods

    })//end Vue
