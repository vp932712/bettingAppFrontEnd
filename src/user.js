class User{
  constructor({name, id, money, better_bets, bookie_bets}){
    // JSON elements
    this.name = name
    this.id = id
    this.money = money
    this.better_bets = better_bets
    this.bookie_bets = bookie_bets

    // Document elements
    this.userWelcomeField = document.getElementById("welcomeUser")
    this.availMoneyField = document.getElementById("moneyAvail")
    this.betsCreatedField = document.getElementById("betsCreateCount")
    this.betsAcceptedField = document.getElementById("betsAccCount")
    this.betsInTable = document.getElementById("betsIn")
    this.createBetForm = document.getElementById("createBet")
    this.addMoneyForm = document.getElementById("addMoney")
    this.betsAvailTable = document.getElementById("betsAvail")

    // Paths
    this.allUsersURL = 'http://localhost:3000/users'
    this.allBetsURL = 'http://localhost:3000/bets'
    this.userUrl = (user_id)=>{return `http://localhost:3000/users/${user_id}`}
    this.betUrl = (bet_id)=>{return `http://localhost:3000/bets/${bet_id}`}
  }


// Fetch User and Bets data
  fetchUserData(){
    fetch(`http://localhost:3000/users`)
      .then(res=>res.json())
      .then(json=>this.parseAndPopulateUser(json))
  }

  fetchBetsData(){
    fetch(`http://localhost:3000/bets`)
      .then(res=>res.json())
      .then(json=>this.renderBetsAvail(json))
  }
// End

  parseAndPopulateUser(json){
    // Fills in user info box
    this.renderUserInfo();

    // Fills in Bets Engaged in table
    this.renderBetsEngage();
  }

  renderUserInfo(){
    this.userWelcomeField.innerText = `Welcome, ${this.name}!`
    this.availMoneyField.innerText = `$${this.money}`
    this.betsCreatedField.innerText = `${this.bookie_bets.length}`
    this.betsAcceptedField.innerText = `${this.better_bets.length}`

    this.addUserFormListeners();
  }

  addUserFormListeners(){
    // Adds the Create Bet listener
    this.createBetForm.addEventListener('submit', (event)=>{
      event.preventDefault();

      let respObj = {"category": event.target.elements[0].value,
                 "bet": event.target.elements[1].value,
                 "bet_amount": event.target.elements[2].value}

      // let category = event.target.elements[0].value
      // let bet = event.target.elements[1].value
      // let bet_amount = event.target.elements[2].value

      this.postBetToDB(respObj)
    })

    // Adds the Add Money listener
    this.addMoneyForm.addEventListener('submit', (event)=>{
      event.preventDefault();

      let respObj = {"addAmount": event.target.elements[0].value}
      // let addAmount = event.target.elements[0].value
      this.patchAddMoneyToDb(respObj)
    })

  }


  renderBetsAvail(allBets) {
    this.betsAvailTable.innerHTML = ""

      for (let i = 0; i < betsData.length; i++) {
        let bet = allBets[i]

        if (bet.better == null && bet.bookie_id != this.id) {
          let bookie = bet.bookie.name
          let bet_amount = bet.bet_amount
          let bet_id = bet.id
          let description = bet.description

          let string =
          `<tr>
            <td>${bookie}</td>
            <td>${description}</td>
            <td>$${bet_amount}</td>
            <td>
              <p>
                <button class="btn btn-primary bet-detail" type="button" data-toggle="collapse" data-target="#${bet_id}a" aria-expanded="false" aria-controls="${bet_id}a">
                  See Details
                </button>
              </p>
            </td>
          </tr>
          <tr>
            <div class="collapse" id="${bet_id}a">
              <div class="card card-body">
                <p>${description}</p>
                <p>${bookie} is willing to accept a bet of ${bet_amount}</p>
                <hr>
                <p>Would you like to bet $${bet_amount}?</p>
                <button class="btn btn-primary enter-bet"  value= "${bet_id},${bet_amount}"type="button" data-toggle="modal" data-target="#${bet_id}b">Enter Bet</button>
              </div>
            </div>
          </tr>`

          this.betsAvailTable.innerHTML += string
        }
    this.addEnterBetListener()
    }
  }

  addEnterBetListener() {
    let enterBetButton = document.querySelectorAll("button.btn.btn-primary.enter-bet");

    for (var i = 0; i < enterBetButton.length; i++) {
      let item = betButton[i]
      item.addEventListener("click", (e) => {
        let bet_number = e.target.value.split(",")
        this.enterBet(bet_number)
      })
    }
  }

  enterBet(bet_number) {
    let bet_amount = bet_number[1]
    let bet_id = bet_number[0]
    let amount;
    if(bet_amount < this.money) {
      amount = this.money - bet_amount
      let options = {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "bet": {
            "better_id": this.id // have to get thge user id
          }
        })
      }
      let userOption = {

        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "user": {
            "money": amount
          }
        })
      }
      fetch(`http://localhost:3000/bets/${bet_id}`, options)
      fetch(`http://localhost:3000/users/${this.id}`, userOption)

    } else {
      alert("You don't have enough money to bet")
    }
  }



  renderBetsIn(json){
    console.log("RenderBetsIn")
  let arr = this.bookie_bets.concat(this.better_bets)

    for ( let i = 0 ; i < arr.length; i ++){
      let obj = arr[i];
      let bet = obj.description;
      let bookie;
      let better;
      let bookieName;
      let betterName;
      let winnerName;
      let bet_amount = obj.bet_amount;
      let bet_identifier = `bookie_bet${obj.id}`;
      let win_identifier = bet_identifier+",WIN";
      let lose_identifier = bet_identifier + ",LOSE";

      if (obj.better_id == null){
        bookieName = this.name;
        betterName = "No one accepted"
        winnerName = "--"

      }else if (obj.better_id && obj.loser == null && obj.winner == null){
        bookie = json.find(function(object){return object.id === obj.bookie_id})
        bookieName = bookie.name
        better = json.find(function(object){return object.id === obj.better_id})
        betterName = better.name
        winnerName = "--"

      }else if (obj.better_id && obj.loser == null && obj.winner){
        bookie = json.find(function(object){return object.id === obj.bookie_id})
        bookieName = bookie.name
        better = json.find(function(object){return object.id === obj.better_id})
        betterName = better.name
        winnerName = "Unresolved"

      }else if (obj.better_id && obj.loser  && obj.winner){
        bookie = json.find(function(object){return object.id === obj.bookie_id})
        bookieName = bookie.name
        better = json.find(function(object){return object.id === obj.better_id})
        betterName = better.name
        let winner = json.find(function(object){return object.id === obj.winner})
        winnerName = winner.name
      }

        let betRow =
        `<tr id="row_${bet_identifier}">
          <td>${bookieName}</td>
          <td>${betterName}</td>
          <td>${winnerName}</td>
          <td>${bet}</td>
          <td>$${bet_amount}</td>
          <td>
            <p>
            <button class="btn btn-primary bet-detail" type="button" data-toggle="collapse" data-target="#${bet_identifier}" aria-expanded="false" aria-controls="${bet_identifier}">
                Resolve Bet
              </button>
            </p>
          </td>
        </tr>

        <tr id="collapseUnit_${bet_identifier}">
          <div class="collapse" id="${bet_identifier}">
            <div class="card card-body">
              <p>You bet $${bet_amount} that:</p>
              <p>${bet}</p>
              <hr>
              <p>Who was right?</p>
              <button id="${win_identifier}" class="btn btn-primary winner" value= "${obj.id}" type="button">I was right. Now pay up.</button>
              <button id="${lose_identifier}" class="btn btn-danger looser" value= "${obj.id}" type="button">They were right....take my money.</button>
            </div>
          </div>
        </tr>`

        this.betsInTable.innerHTML += betRow
    }
    this.addWinnerListener()
    this.addLooserListener()
  }


  addWinnerListener() {

    let betButton = document.querySelectorAll("button.btn.btn-primary.winner")

    for (var i = 0; i < betButton.length; i++) {
      let item = betButton[i]
      item.addEventListener("click", (e) => {
        let bet_id = e.target.value
        this.unresolvedBet(bet_id)

      })
    }
  }


    addLooserListener() {

      let betButton = document.querySelectorAll("button.btn.btn-danger.looser")
      console.log(betButton)
      for (var i = 0; i < betButton.length; i++) {
        let item = betButton[i]
        item.addEventListener("click", (e) => {
          let bet_id = e.target.value
          this.resolvedBet(bet_id)

        })
      }
    }

    resolvedBet(bet_id){


      fetch(`http://localhost:3000/bets/${bet_id}`)
      .then(res=> res.json())
      .then(json=> this.resolve(json,bet_id))

    }


    resolve(json, bet_id){
      let final_winner;
      if (json.bookie_id == this.id){
        final_winner = json.better_id;
      }else{
        final_winner = json.bookie_id
      }

      let winningAmount = json.bet_amount*2*(0.9)*(0.9125)





      let options = {
        method:"PATCH",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify({"bet":{"loser": this.id, "winner": final_winner }})
      }
      fetch(`http://localhost:3000/bets/${bet_id}`, options)
      fetch(`http://localhost:3000/users/${final_winner}`)
      .then(res=>res.json())
      .then(json=> this.winner(json, winningAmount))
    }

winner(json, winningAmount){

  let totalAmount = json.money + winningAmount

  let userOption = {
    method:"PATCH",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body:JSON.stringify({"user":{"money": totalAmount }})
  }

  fetch(`http://localhost:3000/users/${json.id}`, userOption)


}

  unresolvedBet(bet_id){

    let options = {
      method:"PATCH",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },

      body:JSON.stringify({"bet":{"winner": this.id}})
    }
    fetch(`http://localhost:3000/bets/${bet_id}`, options)
  }




// POST AND PATCH METHODS

  postBetToDB({category, bet, bet_amount}){
    let options = {
      method: method,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "category": category,
        "description": bet,
        "bet_amount": bet_amount,
        "bookie_id": this.id
      })
    }

    fetch(`http://localhost:3000/bets`, options)
    // fetch(`http://localhost:3000/users`)
    //   .then(res=>res.json())
    //   .then(json=>findUser(json, this.name)) ask johan about this !!!
  }

  patchAddMoneyToDb({add_amount}){
    let new_amount = this.money + add_amount;

    let options = {
      method: method,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "money": new_amount
      })
    }

    fetch(`http://localhost:3000/users/${this.id}`, options)
  }

}
