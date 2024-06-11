
const map = L.map('map').setView([-26.1849, -58.1731], 13); // Coordenadas para Formosa, Argentina

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



fetch("/src/assets/json/estaciones.json").then(datos => datos.json()).then(res => res.forEach(data => {
    L.marker([data.latitude, data.longitude]).addTo(map)
        .bindPopup(data.name)
        .openPopup();

    console.log(data);
}))
