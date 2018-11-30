var app=new Vue({
  el: '#app',
  data() {
  	return {
      schools:  '',
      school: '',
      newSchool: '',
      authenticated: true,
      status: '',
      username: '',
      password: '',
      token: '',
  		output: {
  		response: ''
  		}
  	}
  },

  methods:{

    signUpPost : function (userName, password, email){
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
          axios.post('http://info3103.cs.unb.ca:' + location.port + '/signup', postData, axiosConfig)
          .then((res) => {
            app.addedSch=res.data;
          })
          .catch((err) => {
            app.addedSch= err;
          });
    },//signUpPost

    signInPost : function (userName, password){
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
      axios.post('http://info3103.cs.unb.ca:' + location.port + '/signin', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//signInPost

    signInGet : function (){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('http://info3103.cs.unb.ca:' + location.port + '/signin', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//signInGet

    signInDelete : function (){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.delete('http://info3103.cs.unb.ca:' + location.port + '/signin', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//signInDelete

    usersGet : function (){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };

      axios.get('http://info3103.cs.unb.ca:' + location.port + '/users', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//usersGet

    userGet : function (userID){
      var postData = {
        userID: userID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;user
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//userGet

    userDelete : function (userID){
      var postData = {
        userID: userID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.delete('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//userDelete

    listsGet : function (userID){
      var postData = {
        userID: userID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listsGet

    listsPost : function (userID){
      var postData = {
        userID: userID,
        title: title,
        descr: descr
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listsPost

    listGet : function (userID, listID){
      var postData = {
        userID: userID,
        listID: listID
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listGet

    listPut : function (userID, listID, lstName, description){
      var postData = {
        userID: userID,
        listID: listID,
        lstName: lstName,
        description: description
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.put('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listPut

    listDelete : function (userID, listID){
      var postData = {
        userID: userID,
        listID: listID
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.delete('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listDelete

    tasksPost : function (userID, listID, task){
      var postData = {
        userID: userID,
        listID: listID,
        task: task
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//tasksPost

    tasksGet : function (userID, listID){
      var postData = {
        userID: userID,
        listID: listID
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks', postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//tasksGet

    taskGet : function (userID, listID, taskID){
      var postData = {
        userID: userID,
        listID: listID,
        taskID: taskID
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//taskGet

    taskPut : function (userID, listID, taskID, taskIn, bool){
      var postData = {
        userID: userID,
        listID: listID,
        taskID: taskID,
        taskIn: taskIn,
        bool: bool
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.put('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//taskPut

    taskDelete : function (userID, listID, taskID){
      var postData = {
        userID: userID,
        listID: listID,
        taskID: taskID,
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.delete('http://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//taskDelete

  }//end methods

})//end Vue
