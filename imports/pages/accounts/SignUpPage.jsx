import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Container} from 'semantic-ui-react'
import SignUpForm from '/imports/components/accounts/SignUpForm'
import { Redirect } from 'react-router-dom'

export class SignUpPage extends Component{

  /*
    required props:
      - none
  */

  
    state = {

    }
  

  onSignUp(){
    const {email, password} = this.state
    Meteor.loginWithPassword(email, password, (error, result) => {
      if(error){
        console.log("error during loging", error)
      }else{
        return <Redirect to="/" exact />
      }
    })
  }

  render(){
    return(
      <Container>
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header className="main-title" as="h2">Inscription</Header>
            <SignUpForm onSignUp={this.onSignUp.bind(this)} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default SignUpPageContainer = createContainer(({}) => {
  return {}
}, SignUpPage)
