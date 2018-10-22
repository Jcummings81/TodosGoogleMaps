import React, {Fragment} from 'react'
import {Input, Icon } from 'semantic-ui-react';
import axios from 'axios'

class MapForm extends React.Component {
  state = { name: '', lists: [], clicked: false, names: [], len: 0}


componentDidMount() {
  setTimeout(() => {this.getLists()},  1000); 
    }

getLists = () => {
    axios.get('/api/lists')
    .then( res => {
        this.setState({lists: res.data})
      })
    }
    
getNames = async () => {
  const{ len, lists, names } = this.state
  await this.getLists()
  this.setState({len: lists.length})
    for (let i = 0; i < len; i++) {
        if (names.length < lists.length ) {
        names.push(lists[i].name)
  } else {
    names
  }
}

  return names
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
      const {clicked } = this.state
        this.setState({clicked: !clicked})
    }


  getName = () => {
    document.getElementById('pac-input')
      this.setState({ name: this.props.setName()})
      console.log(this.state.name)
    }

    handleChange = (e) => {
      const { target:{name, value}} = e
      this.setState({ [name]: value});
    }
    
  render() {
        const { name } = this.state
 
      return (
        <Fragment> 
        <Input id="pac-input" className="controls" type="text"  style={{height: "65px", fontSize: "12px"}}
        name="name"
        value={name}
        onFocus={() => this.getName()}
        onChange={this.handleChange}
        placeholder="Search Item"
      />
      <Icon size='small' name='map marker alternate' style={{cursor:'pointer', marginLeft:'5px'}} onClick={() => this.getName()} />   
      </Fragment>

      )

  }

}

export default MapForm

