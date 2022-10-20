// const input = document.getElementById("location-input");
// const options = {
//   bounds: defaultBounds,
//   componentRestrictions: { country: "us" },
//   fields: ["address_components", "geometry", "icon", "name"],
//   strictBounds: false,
//   types: ["establishment"],
// };
// const autocomplete = new google.maps.places.Autocomplete(input, options);



function initMap() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('location-input'), 
        {
            componentRestrictions: { country: "us" },
            fields: [],
            types: ['address'],
    
        })
        const lngLat = {
            lng: -95.358421,
            lat: 29.749907
        }
        autocomplete.addListener('place_changed', () => {

            const location = autocomplete.getPlace();
            const lng = location.geometry.location.lng()
            const lat = location.geometry.location.lat()
            
            setMarker({lng , lat})
            

        })

        const setMarker = function(lngLat){
            var options = {
            center: lngLat ,
            zoom: 9
            }
            var marker = new google.maps.Marker({
                position: lngLat,
                map,
                title: "Hello World!",
            });
        }

        const map = new google.maps.Map(document.getElementById('map'), {
            center: lngLat,
            zoom: 9
        })


    
}
initMap()