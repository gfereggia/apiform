import React, { Component } from 'react'
import { Alert, Button } from 'reactstrap'
import axios from 'axios'
import './App.css'
import Form from './Formulario'
import Load from './Load'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '',
      alerta: '',
      titulo: 'Login Form',
      login: false,
      loading: false,
      shown: true
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onPressed = this.onPressed.bind(this)
  }


  onSubmit(fields) {

    this.setState({ loading: true })

    let self = this
    axios({
      method: 'POST',
      url: 'https://quadminds-test-login.getsandbox.com/login',
      headers: { 'Content-type': 'application/json' },
      data: {
        username: fields.username,
        password: fields.password
      }
    })
      .then(function (response) {

        self.setState({ loading: false })

        if (response.data.isValidUser === true) {
          self.setState({
            login: true,
            titulo: 'Bienvenido ' + fields.username
          }, function () {
            setTimeout(
              function () {
                self.setState({ shown: true });
              }, 1000
            );
          })
        } else {
          self.setState({
            alerta: 'El usuario o la clave ingresados son incorrectas! ',
            color: 'warning',
            shown: false,
            titulo: 'Login Form'
          }, function () {
            setTimeout(
              function () {
                self.setState({ shown: true });
              }, 2000
            );
          });
        }

      })
      .catch(function (error) {
        self.setState({
          alerta: 'Error en la conexion! ',
          color: 'danger',
          shown: false,
          titulo: 'Login Form'
        })
      })
  }

  onPressed() {
    this.setState({
      titulo: 'Login Form',
      login: false
    })
  }

  render() {
    var hidden = {
      display: this.state.shown ? 'none' : 'block'
    }

    return (
      <div className="App">
        <Alert color={this.state.color} style={hidden}>
          {this.state.alerta}
        </Alert>
        <h1 id="titulo">{this.state.titulo}</h1>
        {!this.state.login && (
          <Form onSubmit={this.onSubmit} />
        )}
        {this.state.login && (
          <Button color="info" className="enviar" onClick={this.onPressed}>
            Salir
          </Button>
        )}
        {this.state.loading && (
          <Load />
        )}



      </div>
    )
  }
}

App.defaultProps = {}

App.propTypes = {}

export default App
