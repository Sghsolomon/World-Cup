let roundSelector = document.querySelector('#roundDropdown');

roundSelector.addEventListener('click', showSection);

function showSection(e) {
  let round = e.target.id;
  let table = document.querySelector(`#${round}Table`);
  table.style.display = 'block';
}

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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
