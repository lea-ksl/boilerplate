import React, { Component } from "react"
import {Sidebar, Grid, Button, Menu, Image, Icon, Header, Segment} from 'semantic-ui-react'


//packages
import { Switch, Link }           from 'react-router-dom'
import { Helmet }           from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'

// Components
import UsersTableRow from '/imports/components/accounts/UsersTableRow'
import UsersTable from '/imports/components/accounts/UsersTable'


// routes
import Public from '/imports/components/routes/Public'
import Admin from '/imports/components/routes/Admin'

// Pages
import AdminUsersPage from '/imports/pages/accounts/AdminUsersPage'
import NotFound from '/imports/pages/general/NotFound'






export default class AdminLayout extends Component {
    constructor(props){
      super(props)
      this.state = {
        loading: true,
        visible: false
      }
    }
  
    componentDidMount(){
        this.setState({ loading: false })
    }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render(){
    const { loading, visible } = this.state
    const links = [
      {path: "/", label: "Accueil"},
      {path: "/admin/users", label: "Utilisateurs"},
    
    ]
    
    return(
      <div id="admin-layout" >

        <Helmet>
          <title>BoilerPlate</title>
          <meta name="robots" content="noindex"/>
        </Helmet>
        <Button circular style={{position: "fixed"}} className="sidebar-button" size="huge" color="grey" icon="content" onClick={this.toggleVisibility} />

        <Sidebar.Pushable fluid style={{marginTop: "0px !important"}}>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted >
          {links.map((link, index) => {
            return (
              <Link key={index} to={link.path}>
                <Menu.Item name={link.label} />
              </Link>
            )
          })}
          </Sidebar>
          <Sidebar.Pusher>
            <main className="main-container">
              <Switch>
                <Admin component={ AdminUsersPage } exact path="/admin/users" { ...this.props } /> 
                <Public component={ NotFound } path="*"  { ...this.props } />
              </Switch>
             </main>
            </Sidebar.Pusher>
          </Sidebar.Pushable>



      </div>
    )
  }
}


