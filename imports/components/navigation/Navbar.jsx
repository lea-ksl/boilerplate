import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'
import {Menu, Dropdown, DropdownMenu, DropdownItem} from 'semantic-ui-react'
import Public                   from "/imports/components/routes/Public"
import MainLayout           from "/imports/layouts/MainLayout"
import Admin                   from "/imports/components/routes/Admin"
import AdminLayout           from "/imports/layouts/AdminLayout"


export class Navbar extends Component{

  /*
    required props:
  */

  constructor(props){
    super(props);
    this.state = {
    }
  }

  logout(e){
    e.preventDefault()
    Meteor.logout()
  }

  render(){

    const {authenticated, isMobile} = this.props

    const links = [
      {path: "/", label: "Accueil"}
    ]
    const right_links = [
      {path: "/sign_up", label: "Inscription"},
      {path: "/sign_in", label: "Connexion"}
    ]

    

    return(
      <Menu fixed={isMobile ? 'left' : 'top'} vertical={isMobile} borderless={true} size="huge">
        {links.map((link, index) => {
          return (
            <Link key={index} to={link.path}>
              <Menu.Item name={link.label} />
            </Link>

          )
        })}
        
        {authenticated ?
            <Menu.Menu position='right'>

              <Dropdown item text={Meteor.user() ? Meteor.user().username : ''} floating>
                <Dropdown.Menu>
                  {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                   <Link to='/admin/users'>
                  <Dropdown.Item className="pointer">admin</Dropdown.Item>
                 </Link>
                : ''}
                <Dropdown.Item className="pointer" onClick={(e) => {this.logout(e)}}>Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
          : 
            <Menu.Menu position='right'>
              <Link to='/sign_up'>
                <Menu.Item className="pointer">Inscription</Menu.Item>
              </Link>
              <Link to='/sign_in'>
                <Menu.Item className="pointer">Connexion</Menu.Item>
              </Link>
            </Menu.Menu>
          } 

      </Menu>
    )
  }
}

export default NavbarContainer = createContainer(({ }) => {
  return {}
}, withRouter (Navbar))
