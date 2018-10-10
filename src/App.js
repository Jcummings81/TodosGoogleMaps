import React, { Component } from 'react';
import './App.css'


class App extends Component {

  state = {
    places: 'supermarket'
  }


  callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let places = results[i];
        this.createMarker(places);
        console.log(places.name)
      }
    }
  }


  createMarker = (place) => {
    let placeLoc = place.geometry.location;
    let image = 'img/flag.png';
    let marker = new window.google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        title: place.name,
        animation: window.google.maps.Animation.DROP,
        icon: image
    });

    window.google.maps.event.addListener(marker, 'click', () => {
        this.infowindow.setContent(place.name);
        this.infowindow.open(this.map,marker);
    });
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

componentDidMount() {
  this.renderMap()
}

componentDidUpdate(prevProps, prevState) {
  if (prevState !== this.state) {
    this.renderMap()
  }
}
  

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB9bhaXpONrqDGJtDfdLQQOxn2qdKwGxvg&libraries=places,geometry&callback=initMap")
    window.initMap = this.initMap
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
              content: 'Found You!'
          });

          let marker = new window.google.maps.Marker({
            position: pos,
            map: map,
            title: 'Hello World!'
          });

          let request = {
              location: pos,
              radius: 50000,
              types: [this.state.places]
          };

          let infowindow = new window.google.maps.InfoWindow();
          let service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(request, this.callback);


          console.log(this.state)

          map.setCenter(pos);

          marker = new window.google.maps.Marker({
            position: pos,
            title:"Hello World!",
            visible: true
        });
        marker.setMap(map);

      }, () => {
          this.handleNoGeolocation(true);
      });
  } else {
      // Browser doesn't support Geolocation
      this.handleNoGeolocation(false);
  }

  }

  handleChange = (e) => {
    this.setState({ places: e.target.value })
  }

  
  render() {
    return (
      <>
        <div id="map"/>
        <input onChange={this.handleChange}></input>
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