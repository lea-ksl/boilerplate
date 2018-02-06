import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'

export default class Conditions extends Component{

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <Grid stackable>
        <Grid.Column width={16}>
          <Header as="h3">Conditions</Header>
        </Grid.Column>
      </Grid>
    )
  }
}
