

async function initMap() {
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
                icon: '/icons/marker.png'
            });
        }

        const map = new google.maps.Map(document.getElementById('map'), {
            center: lngLat,
            zoom: 9
        })

        const addBtn = document.getElementById('addMenuItem')
        let itemContainer = document.getElementById('container')

        let i = 1
        addBtn.addEventListener('click', () => {
            let lastInputFields = itemContainer.lastElementChild.querySelectorAll(['input', 'select'])
            if(lastInputFields[0].value === '' || lastInputFields[1].value === '' || lastInputFields[2].value === ''){
                alert("Please fill out all input fields before adding more item!")

                return
            }else{
            const html = `<div class="d-flex  mb-2 >
                    <label class="me-1" for="">Item: </label>
                    <input type="text" class="form-control me-1" name="menu[${i}][dishName]" required>
                    <label class="me-1" for="">Price: </label>
                    <input type="number" class="form-control me-1" name="menu[${i}][price]" required>
                    <label class="me-1" for="">Category: </label>
                    <select class="form-select me-1" aria-label="Default select example" name="menu[${i}][category]" required>
                        <option selected>Open this select menu</option>
                        <option value="main dish">Main dish</option>
                        <option value="appetizers">Appetizer</option>
                        <option value="desserts">Dessert</option>
                        <option value="drinks">Drink</option>
                    </select>
                    <img class="my-auto" onclick="return this.parentNode.remove();"
                    src="/icons/cancelButton.png" alt="" style="height: 20px; width: 20px;">
                </div>`
            itemContainer.lastElementChild.insertAdjacentHTML('afterend', html)
            i++
            lastInputFields = itemContainer.lastElementChild.querySelectorAll(['input', 'select'])
        }
        })

}
