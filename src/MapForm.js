import React, {Fragment} from 'react'
import { Form, Input, Button } from 'semantic-ui-react';
import axios from 'axios'

class MapForm extends React.Component {
  state = { name: 'walmart', lists: [], clicked: false, active: false, names: [], len: 0 , count: 0 }


componentDidMount() {
  setTimeout(() => {this.getLists()},  1000); 
    }


    componentDidUpdate(prevProps, prevState, e) {
      const {lists } = this.state
      if (prevState.lists !== lists ) {
         this.setState({ lists: lists})  
        this.enter()
      }
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

setName = async () => {
  const { names, name, len, count } = this.state

  if (count > len ) {
    await this.setState({count: 0})
  }

    await this.setState({name: names[count]})
    await this.setState({count: (count + 1)})
  
   await name
}


  handleChange = (e) => {
    const { name, value } = e.target
      this.setState({ [name]: value })
      }


    loadName = async  () => {
       await this.getNames()
     await  this.setName()
     await console.log(this.state.name)
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
      
      const {clicked, active} = this.state

      this.setState({clicked: !clicked})
      this.setState({ active: !active })
    }

    
  render() {
        const { name, active } = this.state

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
        <Button toggle active={active} onClick={() => this.loadName()}>Next List</Button>
        <Button toggle active={active} onClick={() => this.toggleClicked()}>By List Name </Button>
          <Input id="pac-input" className="controls" type="text"  style={{height: "65px", fontSize: "12px"}}
            name="name"
            value={name}
           
            placeholder="Search Item"
          />

        </Form>
      </Fragment>
    )
  }
}

export default MapForm