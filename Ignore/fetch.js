class Fetch{
  constructor(){
    this.baseURL = 'http://localhost:3000'
    this.allUsersURL = 'http://localhost:3000/users'
    this.allBetsURL = 'http://localhost:3000/bets'
    this.userUrl = (user_id)=>{return `http://localhost:3000/users/${user_id}`}
    this.betUrl = (bet_id)=>{return `http://localhost:3000/bets/${bet_id}`}
  }


  fetch(url){
    fetch(`http://localhost:3000/users`)
      .then(res=>reutrn(res.json()))
  }


  post(type, bodyObject, url, callback){
    let options = {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(bodyObject)
    }

    fetch(url, options)
      .then(res=>res.json())
      .then(json=>callback(json))
  }


}
