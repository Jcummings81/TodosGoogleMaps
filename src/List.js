import React, { Fragment } from 'react';
import Items from './Items'
import { Link } from 'react-router-dom'
import { Card, Icon, Form, Input, Divider } from 'semantic-ui-react';
import Location from './Location'
import MapForm from './MapForm'

class List extends React.Component {
  state = { lists: [], showForm: false, hidemap: false }
  
 

  handleChange = (e) => {
    const { target:{name, value}} = e
    this.setState({ [name]: value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateList(this.state.name, this.state.id);
    this.setState({ name: '', showForm: false })
  }

  handleOpen = (id) => {
    this.setState({ showForm: !this.state.showForm, id })
  }

  handleClose = (id) => {
    this.setState({ showForm: false })
  }

  setName = () => {
    return this.props.list.name
    }

  handleForm = (id) => {
    if (this.state.showForm) {
      return(
      <Fragment>
        <Icon size='small' name='angle double up' style={{cursor:'pointer', marginLeft:'5px'}} onClick={() => this.handleClose(id)} />
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Input
            size="small"
            name="name"
            placeholder= {this.props.list.name}
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form>
        <Location hidemap={!this.state.hidemap} /> 
        <MapForm setName={this.setName} handleChange={this.handleChange}/>
        
        <Divider hidden />
        <Icon size='small' name='trash' style={{cursor:'pointer', marginLeft:'5px'}} onClick={() => this.props.deleteList(id)} />   
        <Link to={`/list/${id}/images`}><Icon size='small' color='black' name='paperclip' /></Link>        
      </Fragment>
      )
    } else {
      return (
        <a onClick={() => this.handleOpen(id)}>{this.props.list.name}</a>
      )
    } 
  }

  render() {
    const { id } =this.props.list
    return (
   <Fragment>
      <Card key={id}>
        <Card.Content>
            <Card.Header>
            {this.handleForm(id)}
          </Card.Header>
          <Divider />
          <Card.Content>
            <Items listId={id} />
          </Card.Content>
        </Card.Content>
      </Card>
  </Fragment>
    
    )
  }

}

export default List
