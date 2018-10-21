import React, {Fragment} from 'react';
import axios from 'axios';
import { Container, Header, Card, Segment, Divider, Icon } from 'semantic-ui-react';
import List from './List';
import ListForm from './ListForm'
import Location from './Location'


class Lists extends React.Component {
  state = { lists: [], }
  
  componentDidMount() {
    axios.get('/api/lists')
      .then( ({ data: lists }) => this.setState({ lists }) )
  }


  lists = () => {
    return this.state.lists.map( (list) => (
      <List  updateList={this.updateList} deleteList={this.deleteList} list={list}/>   
      
      )
    )}
    
  addList = (name) => {
    const { lists } = this.state;
    axios.post('/api/lists', { name })
      .then( ({ data }) => {
        this.setState({ lists: [data, ...lists], name: '' })
      })
    }
  
    updateList = (name, id) => {
      axios.put(`/api/lists/${id}`, { name })
        .then( ({ data }) => {
          const lists = this.state.lists.map( list => {
            if (list.id === id) {
              return data
            } else {
              return list
            }
          })
          this.setState({ lists, name: '' })
        })
      }

  deleteList = (id) => {
    axios.delete(`/api/lists/${id}`)
      .then(res => {
        const lists = this.state.lists.filter( list => {
          if (list.id !== id)
            return list
          return null
        })
        this.setState({ lists })
      })
  }

  render() {
    return (
      <Fragment>
        <Location/>
        <Container>
          <h1>{this.props.x}</h1>
          <Segment textAlign="center">
            <Header as="h2" textAlign="center">Lists</Header>
              <Divider />
              <Card.Group itemsPerRow={4}>
                {this.lists()}   
                <ListForm addList={this.addList}/>           
              </Card.Group>                     
          </Segment>   
        </Container>    
      </Fragment>
      )
    }
}

export default Lists;
