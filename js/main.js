const map = L.map('map', {  center: [-19.151801, -46.007759],  zoom: 10});

  
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  maxZoom: 20,
  minZoom: 2,
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);
  
let iconOption = {
  iconUrl: "img/local.svg",
  iconSize: [30, 30],
};
let ourCustomIcon = L.icon(iconOption);
  
fetch("data/equipmentPositionHistory.json")
  .then((response) => response.json())
  .then((data) => {

    for (let i = 0; i < data.length; i++) {

		var last = (data[i].positions.length - 1);
		var latActual = data[i].positions[last].lat;
		var lonActual = data[i].positions[last].lon;
		L.marker([latActual,lonActual], {
        icon: ourCustomIcon,
    	})
        .bindPopup(
          `<p> ${latActual} </p> <p> ${lonActual} </p>`
        )
        .on("click", () => {
          map.flyTo([latActual, lonActual]);
        })
        .addTo(map);
    }
  })
  .catch((error) => alert(error));
  