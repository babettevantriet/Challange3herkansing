function getData() {
	
	//initialisatie van de API
	
	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="ec4d4e5f4d7f0abbe175e9edde69a791";
	var city = document.getElementById("Landsingsplaats").value;

	// Hier wordt het verzoek ingediend op API op te halen
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;

	// Hier worden de gegevens opgehaald
	fetch(request).then(function(response) {

		return response.json();

	})

	.then(function(response) {

		onSuccess(response);

	})


	.catch(function (error) {

		onError(error);

	});
	
}

function onSuccess(response) {

	var wind = Math.round(response.wind.speed * 3.6); // Haalt de initiele waarden van de windsnelheid op
	var celsius = Math.floor(response.main.temp - 273.15); // Hier worden de initiele waarde van de temperatuur opgehaald

	var clouds = response.clouds.all;
	var location = response.name;

	var weatherDOM = document.getElementById('graden');
	var windDOM = document.getElementById('snelheid');
	var cloudsDOM = document.getElementById('wolken');
	var locationDOM = document.getElementById('plaatsnaam');

	locationDOM.innerHTML = location;
	cloudsDOM.innerHTML = clouds + "&#37";
	weatherDOM.innerHTML = celsius + "&#176;C"; // Geeft de temperatuur aan in geselecteerde locatie in celsius aann
	windDOM.innerHTML = wind + " km/uur"; // Geeft de de snelheid aan in kilometer per uur aan

		if (wind >= 40 || clouds >= 60) {

		document.getElementById("veiligheid").innerHTML = "Onveilig om te landen"; // Bij windsnelheden boven de 40km/h en bewolkingspercentage boven de 60% is het onveilig om te landen.
		document.getElementById("veiligheid").style.color = 'red'; // de teskt wordt rood gekleurd wanneer het onveilig is om te landen
		// document.getElementById('changeveiligheid').src = 'onveilig.png'; Wanneer het onveilig is om te landen moet er een kruis komen (werkt helaas niet)

		}

		else {

		document.getElementById("veiligheid").innerHTML = "Veilig om te landen"; // Wanneer de waarde erbinnen vallen is het veilig om te landen
		document.getElementById("veiligheid").style.color = 'green'; // de tekst wordt groen gemarkeerd wanneer het veilig is om te landen
		// document.getElementById('changeveiligheid').src = 'veilig.png'; wanneer het veilig is moet er een vinkje komen (werkt helaas niet)

		}

}

function onError(error) {
	
	console.error('Kan zoekresultaat niet vinden', error); // Print een error in de console
	alert('Locatie niet gevonden. Controleer of u de locatie goed heeft gespeld en probeer het nogmaals.'); // Foutmelding alert bij invalide locatie

}

document.getElementById("zoeken").onsubmit = function(e){ // Dit activiteert de optie die zoekt naar de opgegeven stad bij klik op item met het id "Zoeken"

	e.preventDefault();
	getData();

};








