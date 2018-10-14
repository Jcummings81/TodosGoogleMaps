import React from 'react'

class MapForm extends React.Component {



  componentDidUpdate(prevProps, prevState) {
    const {name } = this.state
    if (prevState.name !== name ) {
      this.setState({ name: name })
      console.log(this.state)
      
    }
  }
  state = { items: [], name: '' }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    e.target.click()
  }

  handleClick = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { items, name } = this.state
    this.setState({ items: [name, ...items], name: '' })
  }

  render() {
    const { name, items } = this.state
    return (
      <div >
        <form >
          <input id="pac-input" class="controls" type="text" autoFocus style={{height: "35px", fontSize: "12px"}}
            name="name"
            value={name}
            required
            onClick={this.handleClick}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            placeholder="Add Item"
          />
          <ul>
            { items.map( (item, i) => <li key={i}>{item}</li> ) }
          </ul>
        </form>
      </div>
    )
  }
}

export default MapForm