import React, { Component } from "react"

//packages
import { Switch } from 'react-router-dom'
import { Helmet } from "react-helmet"

import { createContainer } from 'meteor/react-meteor-data'

import {Dimmer, Loader} from 'semantic-ui-react'

//components
import Public from "/imports/components/routes/Public"
import SideMenu from '/imports/components/navigation/SideMenu'

//pages
import Landing from '/imports/pages/general/Landing'
import Conditions from '/imports/pages/general/Conditions'
import SignInPage from '/imports/pages/accounts/SignInPage'
import SignUpPage from '/imports/pages/accounts/SignUpPage'
import NotFound from '/imports/pages/general/NotFound'

export default class MainLayoutServer extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  render(){
    const { loading } = this.state

    return(
      <div id="main-layout">

        <Helmet>
          <title>BoilerPlate</title>
          <meta name="robots" content="noindex"/>
        </Helmet>

        <main>
        <Dimmer active>
            <Loader>Chargement de la page</Loader>
          </Dimmer>
          <Switch>
            <Public component={ Landing }  exact path="/"       { ...this.props } />
            <Public component={ Conditions }  exact path="/conditions" { ...this.props } />
            <Public component={ SignUpPage }  exact path="/sign_up" { ...this.props } />
            <Public component={ SignInPage }  exact path="/sign_in" { ...this.props } />
            <Public component={ NotFound } path="*"  { ...this.props } />
          </Switch>
        </main>
      </div>
    )
  }
}
