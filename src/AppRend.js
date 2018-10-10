import React, { Component, Fragment } from 'react';
import List from './List'
import Form from './Form'

class App extends Component {
  state = {
    todos: []
  }
  addItem = (entry) => {
    const id = Math.floor(( 1 + Math.random()) * 0x1000 )
    const { todos } = this.state
    const todo  = { entry, id, complete: false}
    this.setState({todos: [todo, ...todos]})
  }

  handleClick = (id) => {
    const { todos } = this.state
    this.setState({
      todos: todos.map( todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          }
        }

        return todo
      })
    })

  }
  
  render() {
    return (
      <Fragment>
        <Form addTodo={this.addItem} />
        <List
        name="Hitlist"
        todos={this.state.todos}
        todoClick={this.handleClick}
         />
      </Fragment>
    );
  }
}

export default App;
