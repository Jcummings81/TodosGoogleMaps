import React from 'react'
import Lists from './Lists'
import axios from 'axios'

class MapForm extends React.Component {
  state = { name: 'walmart', lists: [], clicked: true }

componentDidMount() {
  setTimeout(() => {this.getLists()}, 1000); 
    }

 getLists = () => {
    axios.get('/api/lists')
    .then( res => {
        this.setState({lists: res.data})
          })
    }

  toggleClicked = () => {
    const {clicked} = this.state
    this.setState({clicked: !clicked})
  }
  componentDidUpdate(prevProps, prevState) {
    const {name} = this.state
      setTimeout(() => {this.enter()}, 1000); 

          if (prevState.name !== name ) {
            this.setState({ name: name })  
                }
       }

  handleChange = (e) => {
    const {clicked, lists } = this.state

    const { name, value } = e.target
    if (clicked) {
       this.setState({ [name]: lists[0].name})
    } else {
      this.setState({ [name]: value })
          }
      }

  preload = () => {
    const {clicked, lists, name } = this.state
    if (clicked ) {
    this.setState({ name: lists[0].name})
    } else {
      this.setState({ name: name })
    }
  }

  enter = (e) => {
    () => {
      axios.get('/api/lists')
      .then( res => {
          this.setState({lists: res.data})
      } )
    }

    var txtbox = document.getElementById('pac-input');
  
    var ev = new KeyboardEvent('keydown', {altKey:false,
      bubbles: true,
      cancelBubble: false, 
      cancelable: true,
      charCode: 0,
      code: "Enter",
      composed: true,
      ctrlKey: false,
      currentTarget: null,
      defaultPrevented: true,
      detail: 0,
      eventPhase: 0,
      isComposing: false,
      isTrusted: true,
      key: "Enter",
      keyCode: 13,
      location: 0,
      metaKey: false,
      repeat: false,
      returnValue: false,
      shiftKey: false,
      type: "keydown",
      which: 13});  
      txtbox.dispatchEvent(ev)

    console.log('enter')
     }

    
  render() {
        const { name, lists } = this.state
    return (

      <div >
        <form onSubmit={this.handleSubmit}>
          <input id="pac-input" className="controls" type="text"  style={{height: "35px", fontSize: "12px"}}
            name="name"
            value={name}
            onFocus={this.preload}
            onChange={this.handleChange}
            placeholder="Search Item"
          />
          <button
          onClick={this.toggleClicked}>Search By List</button>
        </form>
      </div>
    )
  }
}

export default MapForm