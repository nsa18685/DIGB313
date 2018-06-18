

function initAutocomplete() {
  var locations = {lat: 36.6107518, lng: 127.28863249999995};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: locations,
    zoom: 15,
  });

  var marker = new google.maps.Marker({
    position: locations,
    map: map
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      getAddress(place.name);
    });
    map.fitBounds(bounds);
  });
  // google.maps.event.addListener(infowindow,'domready',function(){
  //   $('#div-main-infoWindow')//the root of the content
  //    .closest('.gm-style-iw')
  //     .parent().addClass('custom-iw');
  // });
}

function getAddress(address) {
  $.ajax({
    data: 'address=' + address + '&key=AIzaSyCPV5a1M-e9KxubCo-cGqQeZ4iIyQDcx5M',
    type: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    success: function(data) {
      var infowindow = new google.maps.InfoWindow;
      var geocoder = new google.maps.Geocoder();
      var address = data.results[0].formatted_address;
      var latlng = new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      var options = {
        zoom: 17,
        center: latlng
      };
      var map = new google.maps.Map(document.getElementById('map'), options);
      geocoder.geocode( {'address': address}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: data.results[0].geometry.location
          });
          var addressDetail = '';
          addressDetail += '주소 : ' + data.results[0].formatted_address + '<br>';
          addressDetail += 'lat  : ' + data.results[0].geometry.location.lat + '<br>';
          addressDetail += 'lng  : ' + data.results[0].geometry.location.lng;
          infowindow.setContent(addressDetail);
          infowindow.open(map, marker);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    },
    error: function(err) {
      console.log('err');
      console.log(err);
    }
  });
}
