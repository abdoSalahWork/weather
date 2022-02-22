(async function () {
    var searchInput = document.getElementById('searchInput')
    var searchBtn = document.getElementById('searchBtn')
    var d = new Date();
    var hours = d.getHours();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[d.getDay()];
    tomoro = days[d.getDay()+1];
    AfterTo = days[d.getDay()+2];
    console.log();
    if (d.getDay() == 5){
        AfterTo = days[0];
    }
    else if(d.getDay() == 6){
        tomoro = days[0];
        AfterTo = days[1];
    }
    document.getElementById("dateDay").innerHTML = d.getDate() + " " + months[d.getMonth()];
    document.getElementById("nameDay").innerHTML = days[d.getDay()];

    document.getElementById("nameTomor").innerHTML = tomoro;

    document.getElementById("nameAfterTo").innerHTML = AfterTo;

 

    let response = await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=$cai&days=3`)).json();
    
    display()


    searchInput.addEventListener('keyup', async function () {
        response = await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=$${searchInput.value}&days=3`)).json();
        display()

    });

    async function display() {
        console.log(response.forecast.forecastday[0].date);
        let http = "https:"
        let todayWeather = `
        <div div class="info-days">
            <h5 class="font-weight-light">${response.location.name}</h5>
            <div class="degree d-flex overflow-hidden" >
                <div class="d-flex info-degree text-white" style="font-size:80px;font-weight:700 ">
                    ${response.current.temp_c}
                    <small style="font-size:60px">o</small>
                    C
                </div>
                <img class="w-25 h-25 mt-5 ml-5" src=${http+response.current.condition.icon}>
            </div>
            <p class="text-info mt-4">${response.current.condition.text}</p>
            <div class="icon py-3">
                <span>
                    <i class="fas fa-umbrella"></i>
                    <small>18km/h</small>
                </span>
                <span>
                    <i class="fas fa-wind"></i>
                    <small>20%</small>

                </span>
                <span>
                    <i class="far fa-compass"></i>
                    <small>East</small>

                </span>
            </div>
        </div >`;

        let tomorWeather = `
        <div div class="info-days text-center mt-5">
            <img src=${http+response.forecast.forecastday[1].day.condition.icon}>
            <h3>${response.forecast.forecastday[1].day.maxtemp_c}</h3>
            <p>${response.forecast.forecastday[1].day.mintemp_c}</p>
            <p class="text-info">${response.forecast.forecastday[1].day.condition.text}</p>
        </div >`;

        let afterTomorWeather = `
        <div div class="info-days text-center mt-5">
            <img src=${http+response.forecast.forecastday[2].day.condition.icon}>
            <h3>${response.forecast.forecastday[2].day.maxtemp_c}</h3>
            <p>${response.forecast.forecastday[2].day.mintemp_c}</p>
            <p class="text-info">${response.forecast.forecastday[2].day.condition.text}</p>
        </div >`;

        document.getElementById('todayWeather').innerHTML = todayWeather;
        document.getElementById('tomorWeather').innerHTML = tomorWeather;
        document.getElementById('afterTomorWeather').innerHTML = afterTomorWeather;

    }

})();
