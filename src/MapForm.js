import React, {Fragment} from 'react'
import {Input, Icon } from 'semantic-ui-react';
import axios from 'axios'

class MapForm extends React.Component {
  state = { name: '', lists: [], names: [], len: 0}

componentDidMount() {
  setTimeout(() => {this.getLists()},  1000); 
    }

getLists = () => {
    axios.get('/api/lists')
    .then( res => {
        this.setState({lists: res.data})
      })
    }
    

           enter = async () => {
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
             await txtbox.dispatchEvent(ev)
             }


      getName = async () => {
        await document.getElementById('pac-input')
         this.setState({ name: this.props.setName()})
         await document.getElementById('pac-input').focus()
         this.enter()
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
