const yearDiv = document.querySelector('#wc-year');
const emblemDiv = document.querySelector('#emblem');
let myTable = document.querySelector('#table2022');
let table = null;
let image = document.createElement('img');
image.style.width = 50 + 'px';
image.style.height = 50 + 'px';
let elements = null;

async function queryApi() {
  const url =
    'https://api.football-data.org/v4/competitions/WC/matches/?season=2022';
  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Token': '28cf1b7583664e37a813c8455327ed07',
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    elements = data.matches;

    for (let element in elements) {
      image.src = elements[element].homeTeam['crest'];
      //console.log(element, elements[element]);
      divTable = document.createElement('div');
      divTable.className = `row mb-4`;

      divTable.id = element;

      table = `
              <table class= 'bg-white' border-collapse: separate;>
                <tr>
              <td></td>
              <td></td>
              <td class = 'table-primary text-center bg-success rounded'>${elements[
                element
              ].utcDate.slice(0, 10)}-(${elements[element].utcDate.slice(
        11,
        16
      )})</td>
              <td></td>
              <td></td>
              </tr >
                <tr>
               <td class="col-1"><img src= ${
                 elements[element].homeTeam['crest']
               } alt="" border=3 height=30 width=30></img></td>
               <td class="col-4 text-center">${
                 elements[element].homeTeam['name']
               }</td>
               <td onClick = "tdClick('${element}')" id='tdDetail' class="col-1 text-center bg-primary rounded">Details</td>
               <td class="col-4 text-center">${
                 elements[element].awayTeam['name']
               }</td>
               <td class="col-1"><img src= ${
                 elements[element].awayTeam['crest']
               } alt="team flag"  height=30 width=30></img></td>
               </tr>
               <tr>
              <td class="col-1"></td>
              <td class="col-4"></td>
              <td class = 'col-2 text-center  bg-warning rounded '>${
                elements[element].venue
              }</td>
              <td class="col-4"></td>
              <td class="col-1"></td>

              </tr>
                </table>
             `;

      divTable.innerHTML = table;
      myTable.appendChild(divTable);
    }
  } catch (e) {
    let localJson = await fetch('wc2022.json');
    let localData = await localJson.json();
    elements = localData;
    fetchJson(localData);
  }
}

function fetchJson(elements) {
  for (let element in elements) {
    image.src = elements[element].homeTeam['crest'];

    divTable = document.createElement('div');
    divTable.className = `row mb-4`;

    divTable.id = element;

    table = `
              <table class= 'bg-white' border-collapse: separate;>
                <tr>
              <td></td>
              <td></td>
              <td class = 'table-primary text-center bg-success rounded'>${elements[
                element
              ].utcDate.slice(0, 10)}-(${elements[element].utcDate.slice(
      11,
      16
    )})</td>
              <td></td>
              <td></td>
              </tr >
                <tr>
               <td class="col-1"><img src= ${
                 elements[element].homeTeam['crest']
               } alt="" border=3 height=30 width=30></img></td>
               <td class="col-4 text-center">${
                 elements[element].homeTeam['name']
               }</td>
               <td onClick = "tdClick('${element}')" id='tdDetail' class="col-1 text-center bg-primary rounded">Details</td>
               <td class="col-4 text-center">${
                 elements[element].awayTeam['name']
               }</td>
               <td class="col-1"><img src= ${
                 elements[element].awayTeam['crest']
               } alt="team flag"  height=30 width=30></img></td>
               </tr>
               <tr>
              <td class="col-1"></td>
              <td class="col-4"></td>
              <td class = 'col-2 text-center  bg-warning rounded '>${
                elements[element].venue
              }</td>
              <td class="col-4"></td>
              <td class="col-1"></td>

              </tr>
                </table>
             `;

    divTable.innerHTML = table;
    myTable.appendChild(divTable);
  }
}

function tdClick(index) {
  const object = elements[index];

  let popup = document.querySelector('.popup');
  popup.classList.add('open-popup');
  let tableDiv = document.querySelector('#tableDiv');

  let = table = `
              <table class= 'bg-white' border-collapse: separate;>
                <tbody>
              <tr >
                <td border-spacing: 10px;><img src= ${object.awayTeam['crest']} alt="team flag"  height=60 width=60></img></td>
                <td border-spacing: 10px; >${object.awayTeam['name']}</td>
                <td >(${object.score.fullTime['away']})</td>
                </tr>
               <tr >
                <td><img src= ${object.homeTeam['crest']} alt="team flag"  height=60 width=60></img></td>
                <td>${object.homeTeam['name']}</td>
                <td>(${object.score.fullTime['home']})</td>
                </tr>
                </tbody>
                </table>
                `;
  tableDiv.innerHTML = table;
  popup.appendChild(tableDiv);
}

function closeDiv() {
  let tableDiv = document.querySelector('#tableDiv');
  let popup = document.querySelector('.popup');

  while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild);
  popup.classList.remove('open-popup');
}

queryApi();
