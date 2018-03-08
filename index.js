let url = "http://localhost:3000/users/4"
let betUrl = "http://localhost:3000/bets"

let user_name = document.getElementById("user_name")
let user_money = document.getElementById("user_money")
let created_bets = document.getElementById("create_bets")
let accepted_bets = document.getElementById("accepted_bets")
let show_bets = document.getElementById("show_bets")


document.addEventListener("DOMContentLoaded", () => {

  fetched(url)
  fetchBets(betUrl)

})


function fetched(url) {
  fetch(url)
    .then(res => res.json())
    .then(json => render(json))
}

function fetchBets(betUrl) {
  fetch(betUrl)
    .then(res => res.json())
    .then(json => renderbets(json))
}

function render(userData) {
  // console.log(userData.bookie_bets.length)
  user_name.innerHTML = `Welcome! ${userData.name}`
  user_money.innerHTML = `$${userData.money}`
  create_bets.innerHTML = userData.bookie_bets.length
  accepted_bets.innerHTML = userData.better_bets.length
}


function renderbets(betsData) {
  console.log(betsData)
  for (let i = 0; i < betsData.length; i++) {
    let category = betsData[i].category
    let bookie = betsData[i].bookie.name
    let bet_amount = betsData[i].bet_amount
    let bet_id = betsData[i].id
    let description = betsData[i].description

    let string = `<tr>
      <td>${category}</td>
      <td>${bookie}</td>
      <td>$${bet_amount}</td>
      <td>48hours</td>
      <td>
        <p>
          <button class="btn btn-primary bet-detail" type="button" data-toggle="collapse" data-target="#${bet_id}" aria-expanded="false" aria-controls="${bet_id}">
            See Details
          </button>
        </p>
      </td>
    </tr>

    <tr>
      <div class="collapse" id="${bet_id}">
        <div class="card card-body">
          <p>${description}</p>
          <p>${bookie} is willing to accept a bet of ${bet_amount}</p>
          <hr>
          <p>Would you like to bet ${bet_amount}?</p>
          <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal">Enter Bet</button>

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </tr>`
    show_bets.innerHTML += string
  }

}
