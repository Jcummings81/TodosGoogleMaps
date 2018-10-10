import React from 'react'
class Form extends React.Component {

    state = { entry: '', }

    handleSubmit = (e) => {
        e.preventDefault()
        const { entry } = this.state
        this.props.addTodo(entry)
        this.setState({ entry: '' })
    }

    handleChange = (e) => {
        this.setState({ entry: e.target.value })

    }
    render() {
        const  { entry } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                 value={entry}
                 onChange={this.handleChange}
                 required
                 placeholder="Add Mission"
                 />

            </form>
        )
    }
}

export default Form