class User{
  constructor({id, name, money, better_bets, bookie_bets}){
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

  }

  renderUserInfo(){
    this.userWelcomeField.innerText = `Welcome, ${this.name}!`
    this.availMoneyField.innerText = `$${this.money}`
    this.betsCreatedField.innerText = `${this.bookie_bets.length}`
    this.betsAcceptedField.innerText = `${this.better_bets.length}`
  }

  fetchUsersInfo(){
    fetch(`http://localhost:3000/users`)
      .then(res=>res.json())
      .then(json=>this.renderBetsIn(json))
  }


  renderBetsIn(json){
    let bookie_bets = this.bookie_bets
    let better_bets = this.better_bets

    for(let i = 0; i < bookie_bets.length; i++){
      let engagedIn = json.find(function(object){return object.id === bookie_bets[i].better_id})
      let engagedInName = engagedIn.name
      let bet = bookie_bets[i].description
      let bet_amount = bookie_bets[i].bet_amount
      let bet_identifier = `bookie_bet${bookie_bets[i].id}`
      let win_identifier = bet_identifier + "WIN"
      let lose_identifier = bet_identifier + "LOSE"

      let betRow =
      `<tr id="row_${bet_identifier}">
        <td>${engagedInName}</td>
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
            <button id="${win_identifier}" class="btn btn-primary" type="button">I was right. Now pay up.</button>
            <button id="${lose_identifier}" class="btn btn-danger" type="button">They were right....take my money.</button>
          </div>
        </div>
      </tr>`


      this.betsInTable.innerHTML += betRow
    }

    for(let i = 0; i < better_bets.length; i++){
      let engagedIn = json.find(function(object){return object.id === better_bets[i].bookie_id})
      let engagedInName = engagedIn.name
      let bet = better_bets[i].description
      let bet_amount = better_bets[i].bet_amount
      let bet_identifier = `better_bet${better_bets[i].id}`
      let win_identifier = bet_identifier + "WIN"
      let lose_identifier = bet_identifier + "LOSE"

      let betRow =
      `<tr id="row_${bet_identifier}">
        <td>${engagedInName}</td>
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
            <p>${engagedInName} bet $${bet_amount} that:</p>
            <p>${bet}</p>
            <hr>
            <p>Who was right?</p>
            <button id="${win_identifier}" class="btn btn-primary" type="button">I was right. Now pay up.</button>
            <button id="${lose_identifier}" class="btn btn-danger" type="button">They were right....take my money.</button>
          </div>
        </div>
      </tr>`


      this.betsInTable.innerHTML += betRow
    }
  }










  // consoleUser(){
  //   console.log(this.name);
  //   console.log(this.id);
  //   console.log(this.money);
  //   console.log(this.better_bets);
  //   console.log(this.bookie_bets);
  //   console.log(this.userWelcomeField);
  //
  //   console.log(this.availMoneyField);
  //   console.log(this.betsCreatedField);
  //   console.log(this.betsAcceptedField);
  //
  //   console.log(this.betsInTable);
  //   this.renderUserInfo()
  //   this.renderBetsIn()
  // }









}
