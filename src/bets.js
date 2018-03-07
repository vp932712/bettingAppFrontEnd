class Bets{
  constructor(json, user_id){

    this.bets = json
    this.betsInTable = document.getElementById("betsAvail")
    this.createBetForm = document.getElementById("createBet")
    this.currentUserId = user_id
    this.addEventListener();
  }


  fetchUsersInfo(){
    fetch(`http://localhost:3000/users`)
      .then(res=>res.json())
      .then(json=>this.renderBetsAvail(json))
  }

  postToDB(category, bet, bet_amount, expires_on){
    console.log(category, bet, bet_amount, expires_on)
    let options = {

      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "category": category,
        "description": bet,
        "bet_amount": bet_amount,
        "bookie_id": this.currentUserId
      })
    }

    fetch(`http://localhost:3000/bets`, options)
      .then(res=>res.json())
      .then(json=>fetchUsersInfo())
  }

  addEventListener(){
    this.createBetForm.addEventListener('submit', (event)=>{
      event.preventDefault()
      let category = event.target.elements[0].value
      let bet = event.target.elements[1].value
      let bet_amount = event.target.elements[2].value
      let expires_on = event.target.elements[3].value


      this.postToDB(category, bet, bet_amount, expires_on)
    })
  }


  renderBetsAvail(users){
    let bets = this.bets

    for(let i = 0; i < bets.length; i++){

      let bookie = users.find(function(object){return object.id === bets[i].bookie_id})
      let bookieName = bookie.name
      let bet = bets[i].description
      let bet_amount = bets[i].bet_amount
      let bet_identifier = `bet${bets[i].id}`
      let bet_identifierModal = bet_identifier + "modal"

      let betRow =
        `<tr>
          <td>${bookieName}</td>
          <td>${bet}</td>
          <td>$${bet_amount}</td>
          <td>
            <p>
              <button class="btn btn-primary bet-detail" type="button" data-toggle="collapse" data-target="#${bet_identifier}" aria-expanded="false" aria-controls="${bet_identifier}">
                See Details
              </button>
            </p>
          </td>
        </tr>
        <tr>
          <div class="collapse" id="${bet_identifier}">
            <div class="card card-body">
              <p><strong>${bookieName} is betting $${bet_amount} that:</strong></p>
              <h6>${bet}</h6>
              <hr>
              <p>Would you like to bet <strong>$${bet_amount}</strong> against that?</p>
              <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#${bet_identifierModal}">Enter Bet</button>
              <div class="modal fade" id="${bet_identifierModal}" tabindex="-1" role="dialog" aria-labelledby="${bet_identifierModal}Label" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="${bet_identifierModal}Label">Commit to bet?</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      Would you like to bet $${bet_amount}?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Go Back</button>
                      <button type="button" class="btn btn-primary">Bet $${bet_amount}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tr>`

        this.betsInTable.innerHTML += betRow
      }
    }













  // consoleBets(){
  //   console.log(this.bets)
  //   console.log(this.betsInTable)
  // }



}
