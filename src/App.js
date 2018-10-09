import React, { Component } from 'react';
import './App.css'


class App extends Component {

  createMarker = (place) => {

    new window.google.maps.Marker({
        position: place.geometry.location,
        map: this.map
    });
}

  callback = (results, status) => {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        this.createMarker(results[i]);
      }
    }
  }

componentDidMount() {
  this.renderMap()
}
  

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC3GTxiL1yACghG2d7q_h2Jagj2MfajXdw&libraries=places&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    let pyrmont = new window.google.maps.LatLng(40.7610,-111.8829);

   const map = new window.google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
      });
  
    var request = {
      location: pyrmont,
      radius: '500',
      type: ['pizza']
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);


///////////////////////////////////////////////////

    // const map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -34.397, lng: 150.644},
    //   zoom: 8,
    // });


  }

  

  render() {
    return (
      <main>
        <div id="map"/>
      </main>
    );
  }
}

/*
<script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3GTxiL1yACghG2d7q_h2Jagj2MfajXdw&callback=initMap">
    </script>
*/

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3GTxiL1yACghG2d7q_h2Jagj2MfajXdw&callback=initMap" async defer> </script>

export default App