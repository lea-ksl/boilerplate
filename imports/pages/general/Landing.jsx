import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'

export default class Landing extends Component{

  /*
    required props:
      - none
  */

  state = {

  }
  

  render(){
    return(
      <Grid stackable centered>
        <Grid.Column width={16}>
          <Header className="main-title" as="h1">LANDING PAGE</Header>
        </Grid.Column>
      </Grid>
    )
  }
}
