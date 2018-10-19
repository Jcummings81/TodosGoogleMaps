import React, {Fragment} from 'react'
import { Form, Input, Button } from 'semantic-ui-react';
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

 
  componentDidUpdate(prevProps, prevState) {
    const {name} = this.state

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

  enter = () => {
  
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

     toggleClicked = () => {
      const {clicked} = this.state
      this.setState({clicked: !clicked})
      this.setState({ active: !this.state.active })
      console.log(clicked)
    }

    
  render() {
        const { name, active } = this.state

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
        <Button toggle active={active} onClick={() => this.toggleClicked()}>By List Name </Button>
          <Input id="pac-input" className="controls" type="text"  style={{height: "65px", fontSize: "12px"}}
            name="name"
            value={name}
            onFocus={this.preload}
            onChange={this.handleChange}
            placeholder="Search Item"
          />
        </Form>
      </Fragment>
    )
  }
}

export default MapForm