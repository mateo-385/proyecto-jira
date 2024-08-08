const map = L.map('map').setView([-26.1849, -58.1731], 13);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
// Intenta obtener la ubicación del usuario
navigator.geolocation.getCurrentPosition(position => {
    mostrarEstacionesCercanas(position.coords);
}, () => {
    mostrarTodasLasEstaciones();
});

function mostrarEstacionesCercanas(coords) {
    const { latitude: latUsuario, longitude: lonUsuario } = coords;
    // Crea un marcador en la ubicación del usuario
    const ubicacionUsuario = L.marker([latUsuario, lonUsuario]).addTo(map);
    // Agrega un popup al marcador
    ubicacionUsuario.bindPopup("Tu ubicación actual").openPopup();

    fetch('/src/assets/json/estaciones.json')
    .then(response => response.json())
    .then(estaciones => {
        estaciones.forEach(estacion => {
            const distancia = L.latLng(latUsuario, lonUsuario).distanceTo(L.latLng(estacion.latitude, estacion.longitude));
            if (distancia <= 10000) { // Ajusta este valor según necesites
                agregarEstacionAlMapa(estacion);
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

function mostrarTodasLasEstaciones() {
    fetch('/src/assets/json/estaciones.json')
    .then(response => response.json())
    .then(estaciones => {
        estaciones.forEach(estacion => {
            agregarEstacionAlMapa(estacion);
        });
    })
    .catch(error => console.error('Error:', error));
}

function agregarEstacionAlMapa(estacion) {
    const targetGroup = {
        'YPF': ypfLayerGroup,
        'AXION': axionLayerGroup,
        'Shell': shellLayerGroup
    }[estacion.marca];

    const icono = {
        'YPF': ypfIcon,
        'AXION': axionIcon,
        'Shell': shellIcon
    }[estacion.marca];

    if (!icono || !targetGroup) {
        console.error('Marca no reconocida:', estacion.marca);
        return;
    }

    let popupContent = `
    <div class="popup">
    <h2>${estacion.name}</h2>
    <p class="address">${estacion.full_address}</p>
    <div class="prices">`;

    if (estacion.precios && typeof estacion.precios === 'object') {
        for (const [tipoCombustible, precio] of Object.entries(estacion.precios)) {
            popupContent += `<div class="price"><span class="fuel">${tipoCombustible}:</span> $${precio}</div>`;
        }
    } else {
        popupContent += `<p class="no-prices">Precios no disponibles</p>`;
    }

    popupContent += `</div></div>`;

    L.marker([estacion.latitude, estacion.longitude], { icon: icono })
        .bindPopup(popupContent)
        .addTo(targetGroup);
}

// Control de Capas
const baseMaps = {
    "OpenStreetMap": osm,
};
const overlayMaps = {
    "YPF": ypfLayerGroup,
    "Shell": shellLayerGroup,
    "AXION": axionLayerGroup
};


L.control.layers({}, overlayMaps).addTo(map);