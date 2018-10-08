import React, { Component } from 'react';
import Gmap from './Gmap'
import MapForm from './MapForm'



class App extends Component {
  render() {
    return (
      <div className="App">
       <MapForm />
       
       <Gmap />
     
      </div>
    );
  }
}

export default App