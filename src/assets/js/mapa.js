const map = L.map('map').setView([-26.1849, -58.1731], 13);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

// Función para crear iconos
function crearIcono(url, size, anchor, popupAnchor) {
    return L.icon({
        iconUrl: url,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: popupAnchor
    });
}

// Iconos de cada Estación de Servicio
const ypfIcon = crearIcono('/src/assets/img/ypf.png', [45, 47.5], [9.5, 47.5], [-1.5, -38]);
const axionIcon = crearIcono('/src/assets/img/axion.png', [80, 47.5], [9.5, 47.5], [-1.5, -38]);
const shellIcon = crearIcono('/src/assets/img/shell.png', [55, 47.5], [9.5, 47.5], [-1.5, -38]);

// Layer Group de cada Estación de Servicio
const ypfLayerGroup = new L.LayerGroup().addTo(map);
const axionLayerGroup = new L.LayerGroup().addTo(map);
const shellLayerGroup = new L.LayerGroup().addTo(map);

// Fetch de JSON con las Estaciones de Servicio
fetch("/src/assets/json/estaciones.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('No respondió el servidor');
        }
        return response.json();
    })

    .then(data => {
        data.forEach(estacion => {
            const icono = {
                'YPF': ypfIcon,
                'AXION': axionIcon,
                'Shell': shellIcon
            }
            [estacion.marca];
            const targetGroup = {
                'YPF': ypfLayerGroup,
                'AXION': axionLayerGroup,
                'Shell': shellLayerGroup
            }
            [estacion.marca];

            if (!icono || !targetGroup) {
                console.error('Marca no reconocida:', estacion.marca);
                return;
            }

            L.marker([estacion.latitude, estacion.longitude], { icon: icono })
                .bindPopup(estacion.name)
                .addTo(targetGroup);
        });
    })
    .catch(error => console.error('Error:', error));

// Control de Capas
const baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT
};
const overlayMaps = {
    "YPF": ypfLayerGroup,
    "Shell": shellLayerGroup,
    "AXION": axionLayerGroup
};


L.control.layers({}, overlayMaps).addTo(map);