const apiKey = "ce85af040d563e8dfec708907027d03a";


window.addEventListener('load', () => {
    registerWorker();
})

const registerWorker = () => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('./sw.js');
            console.log('Service Worker Registration Successful');
        } catch (e) {
            console.log('Service Worker Registration Failed');
        }
    } else {
        console.warn('Service Worker is not supported');
    } 
}


const btnClick = () => {
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
    
    city.innerHTML = "";
    main.innerHTML = "";
    temp.innerHTML = "Temp: ";
    pressure.innerHTML = 'Pressure: ';
    humid.innerHTML = 'Humidity: ';
    visible.innerHTML = 'Visibility: ';
    sunrise.innerHTML = 'Sunrise: ';
    sunset.innerHTML = 'Sunset: ';
    wind.innerHTML = 'Wind: ';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(resp => {
        localStorage.setItem("Weda-v1", JSON.stringify(resp));
        review.classList.add('show');
        icon.src = `https://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`;
        city.innerHTML = resp.name + ", " + resp.sys.country;
        main.innerHTML = resp.weather[0].main;
        temp.innerHTML += resp.main.temp + '&#8451;';
        pressure.innerHTML += (resp.main.pressure * 0.0145038).toFixed(2) + " psi";
        humid.innerHTML += resp.main.humidity + '&percnt;';
        visible.innerHTML += `${resp.visibility / 1000}KM` ;
        sunrise.innerHTML += utcTimeConv(parseInt(resp.sys.sunrise+"000"));
        sunset.innerHTML += utcTimeConv(parseInt(resp.sys.sunset+"000"));
        wind.innerHTML += `${resp.wind.speed}KM ${windDetr(resp.wind.deg)}`;
        
    });
}
const windDetr = (value) => {
    let dir = '';
    if (value === 0){
        dir = 'North';
    } else if (value < 90){
        dir = 'NE';
    } else if (value === 90){
        dir = 'East';
    } else if (value < 180){
        dir = 'SE';
    } else if (value === 180){
        dir = 'South';
    } else if (value < 270){
        dir = 'SW';
    } else if (value === 270){
        dir = 'West';
    } else {
        dir = "NW"
    }
   
    return dir;    
}

// To convert the fetched UTC time.
const utcTimeConv = UTC => {
    if(new Date(UTC).getHours() > 12) {
        return `${new Date(UTC).getHours() - 12}:${new Date(UTC).getMinutes()} PM`;
    } else if(new Date(UTC).getHours() === 12) {
        return `${new Date(UTC).getHours()}:${new Date(UTC).getMinutes()} PM`;
    } else if(new Date(UTC).getHours() <= 12) {
        return `${new Date(UTC).getHours()}:${new Date(UTC).getMinutes()} AM`;
    }
}
