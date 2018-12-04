var app=new Vue({
  el: '#app',
  data() {
  	return {
      url: window.location.href,
      users:  '',
      lists: '',
      tasks: '',
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
          url = 'https://info3103.cs.unb.ca:' + location.port + '/signup'
          axios.post(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/signin'
      axios.post(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca' + location.port + '/signin'
      axios.get(url, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      })
    },//signInGet

    signInDelete : function (){
      url = 'https://info3103.cs.unb.ca:' + location.port + '/signin'
      axios.delete(url)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users'
      axios.get(url)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID
      axios.post(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID
      axios.delete(url, axiosConfig)
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

      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + postData.userID + '/lists'
      axios.get(url, postData, axiosConfig)
        .then((res) => {
          console.log(res.data.lists)
          this.lists=res.data.lists;
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + postData.userID + '/lists'
      axios.post(url, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listsPost

    listGet : function (userID, listID){
      var postData = {
        'userID': userID,
        'listID': listID
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID
      axios.get(url, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listGet

    listPut : function (){
      var postData = {
        'userID': document.getElementById('listUID').value,
        'listID': document.getElementById('listLID').value,
        'lstName': document.getElementById('listNewName').value,
        'description': document.getElementById('listNewDesc').value
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      console.log(postData)
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + postData.userID + '/lists/' + postData.listID
      console.log(url)
      axios.put(url, postData, axiosConfig)
        .then((res) => {
          app.addedSch=res.data;
        })
        .catch((err) => {
          app.addedSch= err;
      });
    },//listPut

    listDelete : function (userID, listID){
      var postData = {
        'userID': document.getElementById('listUID').value,
        'listID': document.getElementById('listLID').value
        };
      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      };
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + postData.userID + '/lists/' + postData.listID
      axios.delete(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks'
      axios.post(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks'
      axios.get(url, postData, axiosConfig)
        .then((res) => {
          console.log(res.data)
          this.tasks = res.data.Tasks;
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks' + taskID
      axios.get(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks' + taskID
      axios.put(url, postData, axiosConfig)
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
      url = 'https://info3103.cs.unb.ca:' + location.port + '/users/' + userID + '/lists/' + listID + '/tasks/' + taskID
      axios.delete(url, postData, axiosConfig)
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
