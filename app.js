const start = async (zip) => {
    let url = "http://open.mapquestapi.com/geocoding/v1/address?key=BNyvkvTxgp5WkmfXehAD4DJxmSOIY1aw&location=" + zip;

    try {
        let data = await $.get(url);
        await onSuccess1(data);
    } catch (e) {
        console.log(e);
    }
}

const onSuccess1 = async (data) => {
    let url;
    console.log(data);

    for(let place of data.results[0].locations) {
        if(place.adminArea1 === "US") {
            url = "https://api.weather.gov/points/" + place.latLng.lat + "," + place.latLng.lng;
            break;
        }
    }

    try{
        let location = await $.get(url);
        await onSuccess2(location);
    } catch (e) {
        console.log(e);
    }
}

const onSuccess2 = async (data) => {
    let url = data.properties.forecast;

    try {
        let weather = await $.get(url);
        await onSuccess3(weather);
    } catch(e) {
        console.log(e);
    }
}

const onSuccess3 = async (data) => {
    let forecast = data.properties.periods;
    let counter = 0;

    $("div#table").show();

    if(data.properties.periods[0].name === "Tonight") {
        counter ++;
    }

    forecast.forEach(weather => {
        let img = document.createElement('img')

        img.src = weather.icon;
        img.className = "center-block";

        $("td#" + counter).empty()
            .append($("<p class='center' style='margin-bottom: 0; margin-top: 0'></p>").text(weather.name))
            .append(img)
            .append($("<p class='center' style='margin-bottom: 0; margin-top: 0'></p>").text(weather.shortForecast))
            .append($("<p class='center' style='margin-bottom: 0; margin-top: 0'></p>").text(weather.temperature + " " + weather.temperatureUnit));

        counter++;
    })
}




