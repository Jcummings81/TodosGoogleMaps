import React, { Component, Fragment } from 'react';
import './App.css'
import {Form} from 'semantic-ui-react'

class Location extends Component {

  state = {lists: [] }
  
renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ0MpvjEqSwWodG4vyHC63aNjJ3Cl8dBQ&libraries=places,geometry&callback=initMap")
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
  
  var infowindow = new window.google.maps.InfoWindow();
  var inwindow = new window.google.maps.InfoWindow();
  var markers = [];
  var counter = 0;
  var marker


  window.google.maps.event.addListener(map, 'click', function (event) {

    addMarker(event.latLng);
    });

window.google.maps.event.addListener(inwindow, 'domready', function () {
    var button = document.getElementById('inputButton');
    var input = document.getElementById('nameinput').value;
    button.onsubmit = function() {
    marker.title = input;
    inwindow.close();
    };
    });
window.google.maps.event.addListener(infowindow, 'domready', function () {
    var button = document.getElementById('deleteButton');
    var id = parseInt(button.getAttribute('data-id'));  
    button.onclick = function() {
    deleteMarker(id);
    };
    });

function addMarker(location) {
  var marker = new window.google.maps.Marker({
    position: location,
    map: map,
    id: counter
    });

    counter++;

 var inputForm = 'Name:  <input type="text" id="nameinput" size="31" maxlength="31" tabindex="1"/>' + '<input type="button" id="inputButton" value="Submit">';

inwindow.setContent(inputForm);
inwindow.open(map, marker);

markers.push(marker);

var deleteButton = '<button id="deleteButton" data-id="' + counter + '">Delete</button>';

window.google.maps.event.addListener(marker, 'rightclick', function () {
    infowindow.setContent(deleteButton);
    infowindow.open(map, marker);
    });
}

function deleteMarker(markerId) {
    for (var i=0; i<markers.length; i++) {
    if (markers[i].id === markerId) {
        markers[i].setMap(null);
    }
    }
}  
  }

  render() {
    return (
      
      <Fragment>
        <div id="map" hidden={this.props.hidemap}/>
      </Fragment>
    )
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

