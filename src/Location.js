import React, { Component, Fragment } from 'react';
import MapForm from './MapForm'
import './App.css'



class Location extends Component {

renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDWeUpWjIkNrehKaIw51lKoNwpmJPwDLtE&libraries=places,geometry&callback=initMap")
    window.initMap = this.initMap
  }

componentDidMount() {
  this.renderMap()
  }


initMap = () => {

    let DevPoint = new window.google.maps.LatLng(40.7610, -111.8829);
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: DevPoint,
        zoom: 15
      });

    if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
          let pos = new window.google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);

          let infowindow = new window.google.maps.InfoWindow({
              map: map,
              position: pos,
              content: 'Current Location'
                  });


          let marker = new window.google.maps.Marker({
            position: pos,
            map: map,
            draggable: true
                  });

          var input = document.getElementById('pac-input');
          var searchBox = new window.google.maps.places.SearchBox(input);

          map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(input);

          // Bias the SearchBox results towards current map's viewport.
          map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
                  });

          var markers = [];
          // Listen for the event fired when the user selects a prediction and retrieve
          // more details for that place.

          searchBox.addListener('places_changed', function() {
            var service = new window.google.maps.places.PlacesService(map);

            var places = searchBox.getPlaces();
        
            if (places.length == 0) {
              return;
            }
            
                  // Clear out the old markers.
                  markers.forEach( (marker) => {
                  marker.setMap(null);
                        });
                            markers = [];
                                      
                  // For each place, get the icon, name and location.
                  var bounds = new window.google.maps.LatLngBounds();
                  places.forEach( (place, i) => {
                    if (!place.geometry) {
                      console.log("Returned place contains no geometry");
                      return;
                            }
                  
                    var icon = {
                      url: place.icon,
                      size: new window.google.maps.Size(71, 71),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(17, 34),
                      scaledSize: new window.google.maps.Size(25, 25)
                            }
                    
                  // Create a marker for each place.
                      markers.push(new window.google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                              }));



                  //Add infowindow to each marker with link to webpage
                  service.getDetails({
                    placeId: place.place_id
                    }
                    , function(place, status) {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                          let cont = ('<div className="infoWindow"><strong>' + place.name + '</strong><br>' +
                          '<p>' + place.formatted_address + '</p>' +
                          '<a href="' + place.url + '" target="_blank">' +
                          "Get More Info" + '</a>' + '</div>')   

                          window.google.maps.event.addListener(markers[i], 'click', () => {
                            infowindow.setContent(cont);
                            infowindow.open(map, markers[i]); 
                                          
                          })    
                    }}
                  )

                  let cont = ('<div className="infoWindow"><strong>' + place.name + '</strong><br>' +
                          '<p>' + place.formatted_address + '</p>' + '</div>')  
                          window.google.maps.event.addListener(markers[i], 'click', () => {
                            infowindow.setContent(cont);
                            infowindow.open(map, markers[i]); 
                                  
                  })

                        if (place.geometry.viewport) {
                          // Only geocodes have viewport.
                          bounds.union(place.geometry.viewport);
                          } else {
                          bounds.extend(place.geometry.location);
                                  }
                                                            });
                            map.fitBounds(bounds);
                                    });
        
            map.setCenter(pos);

              }, () => {
                      this.handleNoGeolocation(true);
                    }); 
              } else {
                  // Browser doesn't support Geolocation
                  this.handleNoGeolocation(false);
              }
  }

  handleNoGeolocation = (errorFlag) => {
          if (errorFlag) {
            let content = 'Error: The Geolocation service failed.';
          } else {
            let content = 'Error: Your browser doesn\'t support geolocation.';
          }

          let options = {
            map: this.map,
            position: new window.google.maps.LatLng(40.7610, -111.8829),
            content: this.content
          };
    let infowindowLocation = new window.google.maps.InfoWindow(options);
    this.map.setCenter(options.position);
     
  }

  render() {
    return (
      <Fragment>
        <div id="map"/>
        <MapForm />
      </Fragment>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Location
