const map = L.map('map').setView([-26.1849, -58.1731], 13); // Coordenadas para Formosa, Argentina

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const ypfIcon = L.icon({
    iconUrl: '/src/assets/img/ypf.png',
    iconSize: [45, 47.5],
    iconAnchor: [9.5, 47.5],
    popupAnchor: [-1.5, -38]
});

const axionIcon = L.icon({
    iconUrl: '/src/assets/img/axion.png',
    iconSize: [80, 47.5],
    iconAnchor: [9.5, 47.5],
    popupAnchor: [-1.5, -38]
});

const shellIcon = L.icon({
    iconUrl: '/src/assets/img/shell.png',
    iconSize: [55, 47.5],
    iconAnchor: [9.5, 47.5],
    popupAnchor: [-1.5, -38]
});

fetch("/src/assets/json/estaciones.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(estacion => {
            let icono;
            switch (estacion.marca) {
                case 'YPF':
                    icono = ypfIcon;
                    break;
                case 'AXION':
                    icono = axionIcon;
                    break;
                case 'Shell':
                    icono = shellIcon;
                    break;
                default:
                    console.error('Marca no reconocida:', estacion.marca);
                    return;
            }

            L.marker([estacion.latitude, estacion.longitude], { icon: icono })
                .addTo(map)
                .bindPopup(estacion.name);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));