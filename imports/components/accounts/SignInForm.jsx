import React, {Component} from 'react'
import {Form, Button, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class SignInForm extends Component{

  /*
    required props:
      - none

    facultative props:
      - onSignIn: Function
  */

  state = {
    user: {}
  }
  

  handleChange = (e) => this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })

  connect(e){
    e.preventDefault()
    const user = this.state.user
    const {onSignIn} = this.props
    Meteor.loginWithPassword(user.email, user.password, (error, result) => {
      if(error){
        Bert.alert({
          title: "Erreur de connexion",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else {
        Bert.alert({
          title: "Vous êtes connecté",
          type: 'success',
          style: 'growl-bottom-left',
        })
        if(onSignIn){
          onSignIn()
        }
      }
    })
  }

  render(){
    const {user} = this.state

    return(
      <Form onSubmit={this.connect.bind(this)}>
        <Form.Group>
          <Form.Field width={8}>
          <label>Email</label>
          <Input type="email" value={user.email} onChange={this.handleChange} name="email" />
          </Form.Field>
          <Form.Field width={8}>
            <label>Mot de passe</label>
            <Input value={user.password} type="password" onChange={this.handleChange} name="password" />
          </Form.Field>
        </Form.Group>
        <Button color="blue">Connexion</Button>
        <Link to='/sign_up'>
          <Button>Register</Button>
        </Link>
      </Form>
    )
  }
}
