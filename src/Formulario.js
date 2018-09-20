import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap'
import './App.css'

class Formulario extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      alerta: '',
      shown: true
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    if (this.state.username === '' && this.state.password === '') {
      this.setState({ alerta: 'Error campos vacios', shown: false })
    } else if (this.state.username === '' && this.state.password !== '') {
      this.setState({ alerta: 'Error ingrese username', shown: false })
    } else if (this.state.username !== '' && this.state.password === '') {
      this.setState({ alerta: 'Error ingrese password', shown: false })
    } else {
      this.props.onSubmit(this.state)

      this.setState(
        {
          username: '',
          password: '',
          alerta: '',
          shown: true
        }
      )
    }
  }

  render() {
    var hidden = {
      display: this.state.shown ? 'none' : 'block'
    }

    return (
      <Form>
        <FormGroup>
          <Input
            autoComplete="off"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </FormGroup>

        <Alert color="danger" style={hidden}>
          {this.state.alerta}
        </Alert>

        <Button color="info" className="enviar" onClick={this.onSubmit}>
          Ingresar
        </Button>
      </Form>
    )
  }
}

Formulario.defaultProps = {}

Formulario.propTypes = {
  onSubmit: PropTypes.func
}

export default Formulario
