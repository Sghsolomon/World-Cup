// let roundSelector = document.querySelector('#roundDropdown');

// roundSelector.addEventListener('click', showSection);

// function showSection(e) {
//   let round = e.target.id;
//   let table = document.querySelector(`#${round}Table`);
//   table.style.display = 'block';
// }

async function buildTable() {
  const url = 'https://fifa-data.p.rapidapi.com/FifaWorldCupFinals';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.WC_API_KEY,
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
        <td>${element['losing_team']} (${element['final_score'].charAt(4)}) - ${
        element['winning_team']
      } (${element['final_score'].charAt(0)})</td>
        <td>${element['winning_team']}</td>
        </tr>`;
      table.innerHTML += row;
    }
  } catch (error) {
    console.error(error);
  }
}

buildTable();
