import React, { Component, Fragment } from 'react';
import './App.css'


var inmarkers = [];
var counter = 0;
var addMarker = null
var deleteMarker = null
var setMarkerTitle = null
class Location extends Component {

  state = {lists: [] }
  
renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=&libraries=places,geometry&callback=initMap")
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

      let infowindow = new window.google.maps.InfoWindow();

      window.google.maps.event.addListener(map, 'click', function (event) {

        addMarker(event.latLng);
    });

    if(navigator.geolocation) {
    
          navigator.geolocation.getCurrentPosition((position) => {
          let pos = new window.google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);

                                
                            
                                      let yourloc = new window.google.maps.InfoWindow({
                                          map: map,
                                          position: pos,
                                          content: 'Current Location'
                                              });
                            
                                      let homemarker = new window.google.maps.Marker({
                                        position: pos,
                                        map: map,
                                        draggable: true
                                              });
                                            homemarker.addListener('dragend', () => {
                                        console.log(homemarker.getPosition().lat(), homemarker.getPosition().lng())
                                      })
                                      homemarker.addListener('click', () => {
                                        yourloc.open(map, homemarker )
                                        console.log(homemarker.getPosition().lat(), homemarker.getPosition().lng())
                            
                                      })



/////////////////////////////////////////////
          window.google.maps.event.addListener(infowindow, 'domready', function () {

            var button, markerId, inputValue;
    
            // Switch scenarii depending on infowindow contents
            if (document.getElementById('deleteButton')) {
    
                // Bind action for delete button
                button = document.getElementById('deleteButton');
                button.focus();
                markerId = parseInt(button.getAttribute('data-id'));
                button.onclick = function () {
                    
                    // Call deleteMarker function
                    deleteMarker(markerId);
                };
    
            } else {
    
                // Bind action for set title button
                button = document.getElementById('inputButton');
                markerId = parseInt(button.getAttribute('data-id'));
                button.onclick = function () {
                    
                    // Get input value and call setMarkerTitle function
                    inputValue = document.getElementById('nameinput').value;
                    setMarkerTitle(markerId, inputValue);
                };
                
                document.getElementById('nameinput').focus();
            }
        });
// Function to set a marker title
setMarkerTitle = (markerId, title) => {
  inmarkers[markerId].setTitle(title);
  infowindow.close();
}


// Function to add a marker
addMarker = (location) => {

  var inputForm;
  counter++;

  // Create marker
  var marker = new window.google.maps.Marker({
      position: location,
      map: map,
      id: counter
  });

         marker.addListener('dragend', () => {
            console.log(marker.getPosition().lat(), marker.getPosition().lng())
          })
          marker.addListener('click', () => {
            infowindow.open(map, marker )
            console.log(marker.getPosition().lat(), marker.getPosition().lng())

          })

  // Create title field and submit button
  inputForm = 'Name:  <input type="text" id="nameinput" size="31" maxlength="31" value=""/>' + '<button id="inputButton" data-id="' + counter + '">Submit</button>';

  // Set infowindow content
  infowindow.setContent(inputForm);
  infowindow.open(map, marker);

  // Add marker to markers array
  inmarkers[counter] = marker;

  var deleteButton = '<button id="deleteButton" data-id="' + counter + '">Delete</button>';

  // Right click event (to present delete marker button)
  window.google.maps.event.addListener(marker, 'rightclick', function () {
      infowindow.setContent(deleteButton);
      infowindow.open(map, marker);
  });

  // Left click event (to present fields to set title)
  window.google.maps.event.addListener(marker, 'click', function () {

      var markerTitle;
      
      // Check if marker has title to prevent adding "undefined" to input field
      if (this.getTitle()) {
          
          markerTitle = this.getTitle();
          
      } else {
          
          markerTitle = '';
      }

      // Create title field and submit button
      inputForm = 'Name:  <input type="text" id="nameinput" size="31" maxlength="31" tabindex="1" value="' + markerTitle + '"/>' + '<input type="button" id="inputButton" data-id="' + this.id + '" value="Submit">';

      // Set infowindow content
      infowindow.setContent(inputForm);
      infowindow.open(map, marker);

  });
}

// Function to delete a marker
deleteMarker = (markerId) => {

  markers[markerId].setMap(null);
}


        ///////////////////////////////////////////////////////////////////

        

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
        <div id="map" hidden={this.props.hidemap}/>
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

