document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([-26.1849, -58.1731], 13); // Coordenadas para Formosa, Argentina

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const stationData = [
        {name: 'Estación 1', lat: -26.1843, lng: -58.1731, price: 'ARS 100'},
        // Agrega aquí más estaciones de servicio...
      ];
      
      for (var i = 0; i < stationData.length; i++) {
        const station = stationData[i];
        const marker = new google.maps.Marker({
        position: {lat: station.lat, lng: station.lng},
        map: map,
        title: station.name + ' - Precio: ' + station.price
        });
    }
});

