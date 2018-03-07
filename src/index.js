document.addEventListener("DOMContentLoaded", function() {

  let user_id = 56

  function fetchUser(user_id){
    fetch(`http://localhost:3000/users/${user_id}`)
      .then(res=>res.json())
      .then(json=>createUser(json))
  }

  function fetchBets(){
    fetch('http://localhost:3000/bets/')
      .then(res=>res.json())
      .then(json=>createBets(json))
  }


  function createUser(json){
    let user = new User(json)
    user.renderUserInfo();
    user.fetchUsersInfo();
  }

  function createBets(json){
    let bets = new Bets(json, user_id)
    bets.fetchUsersInfo();


  }

  fetchUser(user_id)
  fetchBets()




});
