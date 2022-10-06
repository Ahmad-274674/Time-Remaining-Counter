const form = document.querySelector('form');

const uHour = document.getElementById('uHour'),
    uMint = document.getElementById('uMint'),
    uSec = document.getElementById('uSec'),
    uMonth = document.getElementById('uMonth'),
    uYear = document.getElementById('uYear'),
    wrongYear = document.getElementById('wrongYear'),
    uDay = document.getElementById('uDay');

const sub = document.getElementById('sub');
const clrTimeRm = document.getElementById('clrTimeRm');

const timeShowArea = document.getElementById('timeShowArea');

const subScreen = document.querySelector('.subScreen');
const timeShow = document.querySelector('.timeShow');

const dayR = document.getElementById('day-out'),
    hourR = document.getElementById('hr-out'),
    minuteR = document.getElementById('min-out'),
    secondR = document.getElementById('sec-out');

var months = ['jan', 'feb', 'mar', 'apl', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
var months31days = [0, 2, 4, 6, 7, 9, 11]

const remianingTimeTeller = () => {
    const myInterval = setInterval(() => {
        const userTimeDate = `${(uMonth.value).toLowerCase()} ${uDay.value}, ${uYear.value} ${uHour.value}:${uMint.value}:${uSec.value}`;
            finalTime = new Date(userTimeDate).getTime(),
            nowTime = new Date().getTime(),
            difference = finalTime - nowTime;
        if(difference <= 0){
            wrongYear.style.visibility = "visible";
            wrongYear.innerHTML = `Your event is now begin! click to clear button to clear and set another Event! <br> Thank You!`;
            clearInterval(myInterval);
        }
        else{
            let days = Math.floor((difference / (1000 * 60 * 60 * 24)));
            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / (1000));
    
            days = days <= 9 ? "0" + days : days;
            hours = hours <= 9 ? "0" + hours : hours;
            minutes = minutes <= 9 ? "0" + minutes : minutes;
            seconds = seconds <= 9 ? "0" + seconds : seconds;
    
            dayR.innerText = days;
            hourR.innerText = hours;
            minuteR.innerText = minutes;
            secondR.innerText = seconds;
        }
    }, 1000);

}

const clearTimeRemaining = () => {
    [dayR, hourR, minuteR, secondR].forEach((item) => {
        item.innerText = '00';
    })
}

const notLeapYear = (uDay) => {
    uDay.innerHTML = `<option value="date" selected disabled>Date</option>`;
    for (let i = 1; i <= 28; i++) {
        let option = i <= 9 ? "0" + i : i;
        i = i == 0 ? "0" + i : i;
        uDay.insertAdjacentHTML('beforeend', `<option value="${i}">${option}</option>`)
    }
}

const leapYear = (uDay) => {
    uDay.innerHTML = `<option value="date" selected disabled>Date</option>`;
    for (let i = 1; i <= 29; i++) {
        let option = i <= 9 ? "0" + i : i;
        i = i == 0 ? "0" + i : i;
        uDay.insertAdjacentHTML('beforeend', `<option value="${i}">${option}</option>`)
    }
}

const loaderDate = (uYear) => {
    uYear.addEventListener('change', () => {
        if (uYear.value < 1900 || uYear.value > 2100) {
            wrongYear.classList.add('visible');
            setTimeout(() => {
                wrongYear.classList.remove('visible');
            }, 3000);
        }
    })
}

for (let i = 0; i <= 59; i++) {
    let option = i <= 9 ? "0" + i : i;
    i = i == 0 ? "0" + i : i;
    uMint.insertAdjacentHTML("beforeend", `<option value="${i}">${option}</option>`);
    uSec.insertAdjacentHTML("beforeend", `<option value="${i}">${option}</option>`);
    if (i <= 23) {
        uHour.insertAdjacentHTML("beforeend", `<option value="${i}">${option}</option>`);
    }
}

months.forEach(element => {
    uMonth.insertAdjacentHTML("beforeend", `<option value="${element}">${element}</option>`);
});

uMonth.addEventListener('change', () => {
    ind = months.indexOf(uMonth.value);
    if (months31days.includes(ind)) {
        uDay.innerHTML = `<option value="date" selected disabled>Date</option>`;
        for (let i = 1; i <= 31; i++) {
            let option = i <= 9 ? "0" + i : i;
            i = i == 0 ? "0" + i : i;
            uDay.insertAdjacentHTML('beforeend', `<option value="${i}">${option}</option>`)
        }
    }
    else if (ind == 1) {
        uYear.addEventListener('change', () => {
            let year = Number.parseInt(uYear.value);
            if (year > 1900 && year < 2100) {
                if (year % 4 == 0) {
                    if (year % 100 == 0) {
                        if (year % 400 == 0) {
                            leapYear(uDay);
                        }
                        else {
                            notLeapYear(uDay);
                        }
                    }
                    else {
                        leapYear(uDay);
                    }
                }
                else {
                    notLeapYear(uDay);
                }
            }
            else {
                wrongYear.style.visibility = "visible";
                setTimeout(() => {
                    wrongYear.style.visibility = "hidden";
                }, 3000);
            }
        })
    }
    else {
        uDay.innerHTML = `<option value="date" selected disabled>Date</option>`;
        for (let i = 1; i <= 30; i++) {
            let option = i <= 9 ? "0" + i : i;
            i = i == 0 ? "0" + i : i;
            uDay.insertAdjacentHTML('beforeend', `<option value="${i}">${option}</option>`)
        }
    }
})

uYear.addEventListener('change', () => {
    if (!(uYear.value > 1900 && uYear.value < 2100)) {
        wrongYear.style.visibility = "visible";
        uDay.innerHTML = `<option value="invalid">Invalid Year</option>`
        setTimeout(() => {
            uDay.innerHTML = `<option value="date" selected disabled>Date</option>`
            wrongYear.style.visibility = "hidden";
        }, 3000);
    }
})

sub.addEventListener('click', () => {
    const userTimeDate = `${(uMonth.value).toLowerCase()} ${uDay.value}, ${uYear.value} ${uHour.value}:${uMint.value}:${uSec.value}`,
        a = new Date(userTimeDate).getTime(),
        b = new Date().getTime();
    if((a - b) <= 0){
        wrongYear.innerText = 'This Event is now Ended! Try different one!';
        form.reset();
        wrongYear.style.visibility = 'visible';
        setTimeout(() => {
            wrongYear.style.visibility = 'hidden';
            wrongYear.innerText = 'Please enter a valid year!'
        }, 10000);
    }
    else if (uMonth.value == 'month' || uYear.value == '' || uDay.value == 'date' || uHour.value == 'hours' || uMint.value == 'minutes' || uSec.value == 'seconds') {
        wrongYear.style.visibility = 'visible';
        wrongYear.innerText = 'Please fill all the fields.'
        setTimeout(() => {
            wrongYear.style.visibility = 'hidden';
            wrongYear.innerText = 'Please enter a valid year!'
        }, 3000)
    }
    else {
        remianingTimeTeller();
        subScreen.style.display = 'none';
        timeShowArea.style.display = 'block';
    }
})

clrTimeRm.addEventListener('click', () => {
    clearTimeRemaining();
    timeShowArea.style.display = 'none';
    subScreen.style.display = 'block';
    wrongYear.innerHTML = `Please enter a valid year!`;
})