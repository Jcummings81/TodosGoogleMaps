import React, { Component, Fragment } from 'react';
import './App.css'

var map = null;
var markers = [];
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

  


  //////////////////////////////////////////

// Function to set a marker title
setMarkerTitle = (markerId, title) => {
  markers[markerId].setTitle(title);
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

  // Create title field and submit button
  inputForm = 'Name:  <input type="text" id="nameinput" size="31" maxlength="31" value=""/>' + '<button id="inputButton" data-id="' + counter + '">Submit</button>';

  // Set infowindow content
  infowindow.setContent(inputForm);
  infowindow.open(map, marker);

  // Add marker to markers array
  markers[counter] = marker;

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

