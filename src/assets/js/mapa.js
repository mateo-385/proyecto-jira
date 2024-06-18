const map = L.map('map').setView([-26.1849, -58.1731], 13); // Coordenadas para Formosa, Argentina

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const shell = L.icon({
    iconUrl: '/src/assets/img/shell.png',
    iconSize:     [38, 95], // tamaño del icono
    iconAnchor:   [22, 94], // punto del icono que corresponderá a la ubicación del marcador
    popupAnchor:  [-3, -76] // punto desde el cual el popup debe abrirse en relación con iconAnchor
});

fetch("/src/assets/json/estaciones.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(estacion => {
            L.marker([estacion.latitude, estacion.longitude], { icon: shell })
                .addTo(map)
                .bindPopup(estacion.name);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));