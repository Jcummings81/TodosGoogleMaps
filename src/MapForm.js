import React from 'react'

class MapForm extends React.Component {
  state = { items: [], name: '' }


  componentDidUpdate(prevProps, prevState) {
    const {name } = this.state
    if (prevState.name !== name ) {
      this.setState({ name: name })  
      console.log(this.state)
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleClick = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }


  preload = (e) => {
    const {name } = this.state
    this.setState({name: ['walmart', ...name]})
    
  }
 
  render() {
        const { name, items } = this.state
    return (
      <div >
        <form >
          <button>
          <input id="pac-input" class="controls" type="text" autoFocus style={{height: "35px", fontSize: "12px"}}
            name="name"
            value={name}
            required
            onClick={this.preload}
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