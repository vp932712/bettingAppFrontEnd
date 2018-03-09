document.addEventListener("DOMContentLoaded", function(){
  let login = document.getElementById("loginForm")

  $('#loginModal').modal('show');

  login.addEventListener('submit', (event)=>{
    event.preventDefault();

    let username = event.target.elements[0].value
    renderUser(username);
  })

  function renderUser(username){
    fetch(`http://localhost:3000/users`)
      .then(res=>res.json())
      .then(json=>findUser(json, username))
  }

  function findUser(json, name){
    let userObj = json.find((object)=>{return object.name === name})

    if(userObj){
      $('#loginModal').modal('hide');

      let user = new User(userObj)

      user.fetchData();


    }else{
      alert("User Not Found")
      $('#loginModal').modal('show');
    }
  }

})
