

 async function initMap() {
        const address = document.getElementById('location').getAttribute("value").replace(/ /g, '%20')
        const geocoding = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        const data = await geocoding.json()
        const latLng = data.results[0].geometry.location


        const setMarker = function(lngLat){
            var options = {
            center: latLng ,
            zoom: 9
            }
            var marker = new google.maps.Marker({
                position: lngLat,
                map,
                title: "Hello World!",
                icon: '/icons/marker.png'
            });
        }
        window.addEventListener('DOMContentLoaded', (e) => {
            
        })
        
        const map = new google.maps.Map(document.getElementById('map'), {
        center: latLng,
        zoom: 13
        })
        setMarker(latLng)
}

initMap()

