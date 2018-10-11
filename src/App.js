import React, { Component } from 'react';
import './App.css'


class App extends Component {

  state = {
    searches: '',
    fire: false,
    markers: []
  }

renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=&libraries=places,geometry&callback=initMap")
    window.initMap = this.initMap
  }

componentDidMount() {
  this.renderMap()
}

componentDidUpdate(prevProps, prevState) {
  if (prevState !== this.state) {
    if (this.state.fire === true) {
    this.renderMap()
    this.setState({fire: false})
    }
  }
}
  

  createMarker = (place) => {
    let marker = new window.google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        title: place.name,
        draggable: true
        //animation: window.google.maps.Animation.DROP,

    });

    window.google.maps.event.addListener(marker, 'click', () => {
        this.infowindow.setContent(this.place.name);
        this.infowindow.open(this.map, marker);
       
    });
        return marker;
  }

//  clearResults = (markers) => {
//   for (var m in markers) {

//     markers[m].setMap(null)
//   }
//   markers = []

// }

  callback = (results, status) => {
    const { markers } = this.state
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let places = results[i];
        markers.push(this.createMarker(places))
        markers[i].setMap(this.map)
        console.log(places.name)
        
      }
    }
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

          let infowindowLocation = new window.google.maps.InfoWindow({
              map: map,
              position: pos,
              content: 'Your Location!'
          });

          let markers = []


          let marker = new window.google.maps.Marker({
            position: pos,
            map: map,
            title: 'Hello World!',
            draggable: true
          });

          let request = {
              location: pos,
              radius: 50000,
              types: [this.state.searches]
          };

          let infowindow = new window.google.maps.InfoWindow();
          let service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(request, this.callback);

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

 

handleChange = (e) => {
    this.setState({ searches: e.target.value })

}

handleClick = (e) => {
  this.setState({ fire: true })

}
  
  render() {
    return (
      <>
        <div id="map"/>
        <input onChange={this.handleChange} />
        <button onClick={this.handleClick}>
          Search
        </button>
      </>
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

export default App