const calendar = document.querySelector(".calendar"),
date = document.querySelector(".date"),
daysContainer = document.querySelector(".days"),
prev = document.querySelector(".prev"),
next = document.querySelector(".next"),
todayBtn = document.querySelector(".today-btn"),
gotoBtn = document.querySelector(".goto-btn"),
dateInput = document.querySelector(".date-input"),
roomsContainer = document.getElementById("roomsContainer");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const rooms = [
    //cuartos disponibles
    { date: 'any', name: 'Deluxe Queen Room', description: '2 Camas Queen. Maximo 4 personas', basePrice: 400, photo: 'https://casino.hardrock.com/hollywood/-/media/project/shrss/sga/casinos/hard-rock/hollywood/hotel/oasis-tower/deluxe-queen/oasis-tower-deluxe-queen-680x590.jpg?h=590&iar=0&w=680&rev=fd5dff3c73fc436bb090200b174718d8' },
    { date: 'any', name: 'Deluxe King Room', description: '1 Cama King. Maximo 2 personas', basePrice: 450, photo: 'https://casino.hardrock.com/hollywood/-/media/project/shrss/sga/casinos/hard-rock/hollywood/hotel/the-guitar-hotel/deluxe-king/the-guitar-hotel-deluxe-king-680x590.jpg?h=590&iar=0&w=680&rev=1c1c2ef082544eca95091c23df55372c' },
    { date: 'any', name: 'Platinum Suite', description: '1 Cama King. Maximo 2 personas', basePrice: 800, photo: 'https://casino.hardrock.com/hollywood/-/media/project/shrss/sga/casinos/hard-rock/hollywood/hotel/the-guitar-hotel/platinum-suite/the-guitar-hotel-platinum-suite-680x590.jpg?h=590&iar=0&w=680&rev=911e5aed3fe34eb9a25c55524b37961b' },
];

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const preDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${preDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    addDayClickEvent();
}

function addDayClickEvent() {
    const dayElements = document.querySelectorAll('.day:not(.prev-date):not(.next-date)');
    dayElements.forEach(day => {
        day.addEventListener('click', () => {
            const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.textContent).padStart(2, '0')}`;
            showRooms(selectedDate);
        });
    });
}

function generateRandomPrice(basePrice) {
    // Generar un número aleatorio entre 0.8 y 1.2, en este caso seleccionamos 1.2
    const randomFactor = 1.2 + Math.random() * 0.4;
    // Multiplicar el precio base por el factor aleatorio para obtener el precio ajustado
    const adjustedPrice = basePrice * randomFactor;
    // Redondear el precio a dos decimales
    return adjustedPrice.toFixed(2);
}


// Función para mostrar las habitaciones con precios aleatorios
function showRooms() {
    roomsContainer.innerHTML = '';
    rooms.forEach(room => {
        const adjustedPrice = generateRandomPrice(room.basePrice);
        const roomInfo = document.createElement('div');
        roomInfo.classList.add('room-info');
        roomInfo.innerHTML = `
            <h3>${room.name}</h3>
            <p>${room.description}</p>
            <p>Precio: $${adjustedPrice}</p>
            <img src="${room.photo}" alt="Foto de ${room.name}">
        `;
        roomsContainer.appendChild(roomInfo);
    });
}


initCalendar();

function prevMonth() {
    const tempDate = new Date(year, month - 1);
    if (tempDate >= new Date(today.getFullYear(), today.getMonth())) {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        initCalendar();
    }
}

function nextMonth() {
    const tempDate = new Date(year, month + 1);
    if (tempDate <= new Date(today.getFullYear() + 1, today.getMonth())) {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        initCalendar();
    }
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        const inputMonth = parseInt(dateArr[0]) - 1;
        const inputYear = parseInt(dateArr[1]);
        const tempDate = new Date(inputYear, inputMonth);

        const currentDate = new Date();
        const nextYear = currentDate.getFullYear() + 1;

        if (
            tempDate >= currentDate && 
            tempDate <= new Date(nextYear, currentDate.getMonth())
        ) {
            month = inputMonth;
            year = inputYear;
            initCalendar();
            return;
        }
    }
    alert("Por favor, ingrese una fecha dentro del rango permitido.");
}
