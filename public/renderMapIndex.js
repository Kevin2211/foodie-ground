


 async function  initMap() {

    //get Lat and Lng from geocoding and stores 
    const getLatLng = async function (location){
        const trimmedLocation = location.replace(/ /g, '%20')
        const geocoding = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${trimmedLocation}&key=${apiKey}`)
        const data = await geocoding.json()

        return data.results[0].geometry.location
    }

    const locations = stores.map(async (store) => {
        const latLng = await getLatLng(store.location)

            return {
                lat: latLng.lat,
                lng: latLng.lng,
                url: `https://foodie-ground.onrender.com/stores/${store._id}`,
                label: store.title
            }
    })



    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {lat: 37, lng: -95.7 },
    });


    //marker clusters
    await Promise.all(locations).then(async locationsArray => {

    const markers = await locationsArray.map( (position, i) => {
      const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
      });

      const marker = new google.maps.Marker({
        position: {
            lat: position.lat,
            lng: position.lng
        },
        icon: '/icons/marker.png',
        title: position.label
      });

      marker.addListener("click", () => {
        window.location.href = position.url;
      });
      infoWindow.setContent(position.label);
      infoWindow.open(map, marker);

      return marker;
    })


    // Add a marker clusterer to manage the markers.
    new markerClusterer.MarkerClusterer({ markers, map })

    });

    
    var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
   google.maps.event.addListener(searchBox, 'places_changed', function() {
     searchBox.set('map', null);

    var places = searchBox.getPlaces();

    var bounds = new google.maps.LatLngBounds();
    var i, place;
    for (i = 0; place = places[i]; i++) {
      (function(place) {
        var marker = new google.maps.Marker({

          position: place.geometry.location
        });
        marker.bindTo('map', searchBox, 'map');
        google.maps.event.addListener(marker, 'map_changed', function() {
          if (!this.getMap()) {
            this.unbindAll();
          }
        });
        bounds.extend(place.geometry.location);


      }(place));

    }
    map.fitBounds(bounds);
    searchBox.set('map', map);
    map.setZoom(Math.min(map.getZoom(), 10));
    })

 }

  window.initMap = initMap;

