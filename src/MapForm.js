import React from 'react'

class MapForm extends React.Component {
  state = { items: [], name: 'walmart' }

componentDidMount() {
}


  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {this.enter()}, 1000); 
    const {name } = this.state
    if (prevState.name !== name ) {
      this.setState({ name: name })  
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  preload = (e) => {
    const {name } = this.state
    this.setState({ name})
  }

  enter = (e) => {
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
        const { name, items } = this.state
    return (

      <div >
        <form onSubmit={this.handleSubmit}>
          <button>
          <input id="pac-input" className="controls" type="text"  style={{height: "35px", fontSize: "12px"}}
            name="name"
            value={name}
            onFocus={this.preload}
            onChange={this.handleChange}
            placeholder="Search Item"
          />
         Clear Map </button>
          <ul>
            { items.map( (item, i) => <li key={i}>{item}</li> ) }
          </ul>
        </form>
      </div>
    )
  }
}

export default MapForm