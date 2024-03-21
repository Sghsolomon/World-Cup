let roundSelector = document.querySelector('#roundDropdown');
      
roundSelector.addEventListener('click', showSection);
      
function showSection (e) {
    let round = e.target.id 
    let table = document.querySelector(`#${round}Table`)
    table.style.display = 'block';
}
