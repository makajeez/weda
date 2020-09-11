 const apiKey = "ce85af040d563e8dfec708907027d03a";
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=

window.addEventListener('load', () => {
    registerWorker();
})
function registerWorker() {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('./sw.js')
        } catch (e) {
            console.log('Service Worker Registration Failed');
        }
    }
}

// function registerServiceWorker() {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('./sw.js').then(reg => {
//             console.log('Registration successful', reg);
//         })
//             .catch(e => console.error('Error during service worker registration:', e));
//     } else {
//         console.warn('Service Worker is not supported');
//     }
// }

function btnClick(){
    let review = document.getElementById('review');
    let q = document.getElementById("q").value;
    let city = document.getElementById("city");
    let icon = document.getElementById('icon');
    let temp = document.getElementById('temp');
    let pressure = document.getElementById('pressure');
    let main = document.getElementById('main');
    let humid = document.getElementById('humid');
    let wind = document.getElementById('wind');
    let visible = document.getElementById('visible');
    let sunrise = document.getElementById('sunrise');
    let sunset = document.getElementById('sunset');    
    console.log(q);
    
    city.innerHTML = "";
    main.innerHTML = "";
    temp.innerHTML = "Temp: ";
    pressure.innerHTML = 'Pressure: ';
    humid.innerHTML = 'Humidity: ';
    visible.innerHTML = 'Visibility: ';
    sunrise.innerHTML = 'Sunrise: ';
    sunset.innerHTML = 'Sunset: ';
    wind.innerHTML = 'Wind: ';

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + `${q}` + "&appid=" + `${apiKey}`)
    .then(res => res.json())
    .then(resp => {
        localStorage.setItem("Weda-v1", JSON.stringify(resp));
        review.classList.add('show');
        icon.src = "https://openweathermap.org/img/wn/" + `${resp.weather[0].icon}` + "@2x.png";
        // icon.style.width = '150px';
        // icon.style.height = '150px';

        city.innerHTML = resp.name + ", " + resp.sys.country;
        main.innerHTML = resp.weather[0].main;
        temp.innerHTML += resp.main.temp + '&deg;';
        pressure.innerHTML += resp.main.pressure + "Pa";
        humid.innerHTML += resp.main.humidity + '%';
        visible.innerHTML += resp.visibility;
        sunrise.innerHTML += resp.sys.sunrise;
        sunset.innerHTML += resp.sys.sunset;
        wind.innerHTML += windDetr(resp.wind.deg) +" " + resp.wind.speed + 'Km/h';

    });
}
function windDetr(value) {
    let dir = '';
    if (value < 360){
        dir = 'NW';
    }
    else if (value === 270){
        dir = 'W';
    }
    else if (value < 270){
        dir = 'SW';
    }
    else if (value === 180){
        dir = 'S';
    }
    else if (value < 180){
        dir = 'SE';
    }
    else if (value === 90){
        dir = 'E';
    }
    else if (value < 90){
        dir = 'NE';
    }
    else if (value === 0 || 360){
        dir = 'N';
    }
    return dir;    
}
//         const dIcon = document.createElement("img");
//         dIcon.src =  
//         
//         dIcon.style.float = 'left';

//        
//         
// }
