var app=new Vue({
  el: '#app',
  data() {
  	return {
      url: window.location.href,
      users:  '',
      school: '',
      newSchool: '',
      authenticated: false,
      status: '',
      username: '',
      password: '',
      id: '',
      token: '',
  		output: {
  		    response: ''
  		}
  	}
  },



  mounted: function () {
    this.url = window.location.href
  },


  methods:{

    signUpPost : function (userName, password, email){
      var postData = {
        Username: userName,
        Password: password,
        Email: email
      };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allowhttps://info3103.cs.unb.ca:23487/-Origin": "*",
            }
          };
          axios.post('https://info3103.cs.unb.ca:' + location.port + '/signup', postData, axiosConfig)
          .then((res) => {
            this.authenticated = true;
            this.url = res.data;
            console.log("Logged In");
            console.log(this.url);
          })
          .catch((err) => {
            console.log(err);
          });
    },//signUpPost

    signInPost : function (username, password){
      var postData = {
        Username: username,
        Password: password
      };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('https://info3103.cs.unb.ca:' + location.port + '/signin', postData, axiosConfig)
        .then((res) => {
          this.authenticated = true;
          console.log(res.data)
          this.url = res.data;
          console.log("Logged In");
          console.log(this.url);
        })
        .catch((err) => {
          console.log(err);
      });
    },//signInPost

    signInGet : function (){
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('https://info3103.cs.unb.ca:' + location.port + '/signin', axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      })
    },//signInGet

    signInDelete : function (){
      axios.delete('https://info3103.cs.unb.ca:' + location.port + '/signin')
        .then((res) => {
		        console.log(res)
		        this.authenticated=false;
		        this.username=''
		        this.password=''
        })
        .catch((err) => {
            console.log(err);
      });
    },//signInDelete

    usersGet : function (){
      axios.get('https://info3103.cs.unb.ca:' + location.port + '/users')
        .then((res) => {
          console.log(res)
          this.users = res.data.users;
          this.status = 'Users obtained'
        })
        .catch(error => {
          this.status= error.message
      })
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
      axios.post('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;user
        })
        .catch((err) => {
          console.log(error);
          this.status= error.message;
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
      axios.delete('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//userDelete    console.log(res.data)

    listsGet : function (usID){
      var postData = {
        userID: usID,
        };
        console.log(postData)
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.get('https://info3103.cs.unb.ca:' + location.port + '/users/' + postData.userID + '/lists', postData, axiosConfig)
        .then((res) => {
          this.users=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listsGet

    listsPost : function (userIDIn, titleIn, descrIn){
      var postData = {
        userID: userIDIn,
        title: titleIn,
        descr: descrIn
        };
      console.log(postData);
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      axios.post('https://info3103.cs.unb.ca:' + location.port + '/users/' + postData.userID + '/lists', postData, axiosConfig)
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
      axios.get('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID, postData, axiosConfig)
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
      axios.put('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID, postData, axiosConfig)
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
      axios.delete('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID, postData, axiosConfig)
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
      axios.post('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks', postData, axiosConfig)
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
      axios.get('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks', postData, axiosConfig)
        .then((res) => {
          this.user=res.data;
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
      axios.get('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID, postData, axiosConfig)
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
      axios.put('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID, postData, axiosConfig)
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
      axios.delete('https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//taskDelete

    endpoint : function (){
      if(window.location.href.indexOf("signup") > -1)
        return 1;
      if(window.location.href.indexOf("signin") > -1)
        return 2;
      if(window.location.href.indexOf("tasks/") > -1)
        return 3;
      if(window.location.href.indexOf("tasks") > -1)
        return 4;
      if(window.location.href.indexOf("users/") > -1)
        return 5;
      if(window.location.href.indexOf("users") > -1)
        return 6;
      if(window.location.href.indexOf("/"))
        return 7;
    },//taskDelete

  }//end methods

})//end Vue
