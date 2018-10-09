import React, { Component } from 'react';
import './App.css'


class App extends Component {
componentDidMount() {
  this.renderMap()
}
  

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC3GTxiL1yACghG2d7q_h2Jagj2MfajXdw&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
    });
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