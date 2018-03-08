document.addEventListener("DOMContentLoaded", function(){
  let login = document.getElementById("loginForm")

  $('#loginModal').modal('show');

  login.addEventListener('submit', (event)=>{
    event.preventDefault()

    let userName = event.target.elements[0].value
    renderUser(userName);

  })

const renderUser = function(userName){
    fetch(`http://localhost:3000/users`)
      .then(res=>res.json())
      .then(json=>findUser(json, userName))
  }

  function fetchBets(){

  }

  function findUser(json, name){
    let userObj = json.find((object)=>{return object.name === name})

    if(userObj){
      $('#loginModal').modal('hide');

      let user = new User(userObj)

      fetch(`http://localhost:3000/bets`)
      .then(res=>res.json())
      .then(json=>user.renderBets(json))


      user.renderUserInfo();
      user.fetchUsersInfo();






      // fetch('http://localhost:3000/bets/')
      //   .then(res=>res.json())
      //   .then(json=>createBets(json, userObj.id))

    }else{
      alert("User Not Found")
      $('#loginModal').modal('show');
    }
  }
  //
  // function createBets(json, user_id){
  //   let bets = new Bets(json, user_id)
  //   bets.fetchUsersInfo();
  // }



})
