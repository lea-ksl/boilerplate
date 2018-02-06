import React, { Component } from "react"

//packages
import { Switch } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'

import {Dimmer, Loader} from 'semantic-ui-react'

// Components
import Public from "/imports/components/routes/Public"
import Admin from "/imports/components/routes/Admin"
import UsersTableRow from '/imports/components/accounts/UsersTableRow'
import UsersTable from '/imports/components/accounts/UsersTable'

// Pages
import AdminUsersPage from '/imports/pages/accounts/AdminUsersPage'
import NotFound from '/imports/pages/general/NotFound'

export default class AdminLayoutServer extends Component {
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
      <div id="admin-layout">

        <Helmet>
          <title>BoilerPlate</title>
          <meta name="robots" content="noindex"/>
        </Helmet>

        <main>
          <AdminNavbar />
          <Dimmer active>
            <Loader>Chargement de la page</Loader>
          </Dimmer>
          <Switch>
            <Admin component={ AdminUsersPage } exact path="/admin/users" { ...this.props } />
            <Public component={ NotFound } path="*"  { ...this.props } />
          </Switch>
        </main>
      </div>
    )
  }
}


