import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Table, Button} from 'semantic-ui-react'
import UsersTableRow from '/imports/components/accounts/UsersTableRow'

export default class UsersTable extends TrackerReact(Component){

  /*
    required props:
      - users: [Object]
  */

  state = {

    }
  



  render(){
    const {users} = this.props
      return(
        <div>
          <p>{users.length} utilisateurs trouvés</p>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nom prénom</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Société</Table.HeaderCell>
                <Table.HeaderCell>Poste</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { users.map((user, index) => {
                return(
                  <UsersTableRow key={index + user._id} user={user} />
                )
              })}
            </Table.Body>
          </Table>
        </div>
      )
  }
}
