import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '100%',
  height: 400
}

class Gmap extends Component {
  render() {
    return (
      <div className="App">
  
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 40.7610,
            lng: -111.8829
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
           
        </InfoWindow>
        

      </Map>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC3GTxiL1yACghG2d7q_h2Jagj2MfajXdw")
})(Gmap)