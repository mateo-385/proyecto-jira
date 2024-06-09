document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([-26.1849, -58.1731], 13); // Coordenadas para Formosa, Argentina

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
});

