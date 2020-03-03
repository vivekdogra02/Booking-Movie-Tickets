const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;


// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    // update total and count
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    // copy selected seats into an array
    // map through arr
    // return a new array indexes
    const seatsIndex = [...selectedSeats].map((seat)=> {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice; 
}

// Get Data from localstorage and populate UI
function populateUI() {
   const selectedSeats =  JSON.parse(localStorage.getItem('selectedSeats'));
   if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
        if(selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
        }
    })
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
   }
}

//movie clicked event
movieSelect.addEventListener('change', (e) => {
     ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
     updateSelectedCount(); 
})

// Seat clicked event
container.addEventListener('click', (e)=> {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//update count and price
updateSelectedCount();
