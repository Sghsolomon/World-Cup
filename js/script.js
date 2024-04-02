// Madison's tables
const listItems = document.querySelectorAll(".listItem")
for (let item of listItems){
    item.addEventListener('click', handleItemClick)
}

function handleItemClick(e){
    let round = e.target.id 
    showSection(round)
    queryApi(round)
}      
function showSection (round) {
    let table = document.querySelector(`#${round}Table`)
    console.log('round '+ round)
    table.style.display = 'block';

}

function test(){
    console.log('hi')
}

function updateTable (data, round){
   
    let matches = data.matches;
    // loop through matches and assign values to html classes

        for (let i = 0; i < matches.length; i++){
            let homeName = document.querySelector(`.${round}homeName${i}` )
            homeName.textContent =  matches[i].homeTeam.name;
            console.log('homeName: ' + homeName)

            let homeScore = document.querySelector(`.${round}homeScore${i}` )
            homeScore.textContent = matches[i].score.fullTime.home

            let awayName = document.querySelector(`.${round}awayName${i}`)
            awayName.textContent =  matches[i].awayTeam.name

            let awayScore = document.querySelector(`.${round}awayScore${i}` )
            awayScore.textContent = matches[i].score.fullTime.away

            let awayFlag = document.querySelector(`.${round}AwayFlag${i}`)
            console.log('awayFlag parent' + awayFlag)
            console.log('away flag: ' + `${matches[i].awayTeam.crest}`)
            awayFlag.innerHTML = `<img class='countryFlags' src='${matches[i].awayTeam.crest}' alt='${matches[i].awayTeam.name}'s flag'/>`;


            let homeFlag = document.querySelector(`.${round}HomeFlag${i}`)
            homeFlag.innerHTML = `<img class='countryFlags' src='${matches[i].homeTeam.crest}' alt='${matches[i].homeTeam.name}'s flag'/>`
            
            }
}

let local;
async function queryApi (round){

    let url; 
    
    if (round === "finals") {
        url = 'https://api.football-data.org/v4/competitions/WC/matches/?stage=FINALS';
        
        local = '../finalsObject.json'
    }
    else if (round === "semis") {
        url = 'https://api.football-data.org/v4/competitions/WC/matches/?stage=SEMI_FINALS';
        local = '../semiFinalsObj.json'
       
    }
    else {
        url = 'https://api.football-data.org/v4/competitions/WC/matches/?stage=QUARTER_FINALS';
        local = '../quarterFinalsObj.json'
    }
    console.log('url ' + url)
    const options = {
        method: "GET",
        withCredentials: true,    
        crossorigin: true,    
        mode: "no-cors",
        headers: {
            "X-Auth-Token": "e3d1eebdeae5487e9c0ae7e7db5afaa1",
            "Content-Type": "application/json"
        }
    }
    try {
        let fetched = await fetch(url, options)
            
        let data = await fetched.json();
            console.log(data)

    } catch(e){
        console.log(e)
        console.log('catch block round: '+ round)
        let localFetched = await fetch(local) 
        let localData = await localFetched.json();
        console.log('Local Data: ' + localData)
        updateTable(localData, round)

    }
}

// Solomon's tables
async function buildTable() {
  const url = 'https://fifa-data.p.rapidapi.com/FifaWorldCupFinals';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6e02c900a5mshc0506a40ea670bbp156b17jsn3411a2d02051',
      'X-RapidAPI-Host': 'fifa-data.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const table = document.querySelector('#myTable');
    console.log(result);
    for (let element of result) {
      let row = `<tr>
      <td>${element['event_year']}</td>
      <td>${element['event_locaiton']}</td>
      <td>${element['event_venue']}</td>
      <td>${element['losing_team']} ${element['final_score'].charAt(4)} - ${
        element['winning_team']
      } ${element['final_score'].charAt(0)}</td>
      <td>${element['winning_team']}</td>
      </tr>`;
      table.innerHTML += row;
    }
  } catch (error) {
    console.error(error);
  }
}

buildTable();
