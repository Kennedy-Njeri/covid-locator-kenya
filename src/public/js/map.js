mapboxgl.accessToken = 'pk.eyJ1Ijoia2VubmVkeTI1NCIsImEiOiJjazU1azYyczIwYXpwM25wbTJlOG9rcndkIn0.UjLXXvYXcGK0cHY6I23Brw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 5.3,
    center: [37.40588083324894, 0.0250977358123379]

});




var size = 100;

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
    onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

// called once before every frame where the icon will be used
    render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

// draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

// draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
    }
};


// fetch data from API
async function getCovid() {
    const response = await fetch('/covid')
    const data = await response.json()

    const covid = data.data.map((cov) => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [cov.location.coordinates[0], cov.location.coordinates[1]]
            },
            properties: {
                countyCode: cov.countyCode

            }
        }
    })

    loadMap(covid)
    console.log(data)
}


// load map with points
function loadMap(covid) {

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    map.on('load', function() {
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: covid
                }
            },
            layout: {
                'icon-image': 'pulsing-dot',
                'text-field': '{countyCode}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}


getCovid()


// https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/