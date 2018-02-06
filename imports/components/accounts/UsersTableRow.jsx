import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Loader, Table, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class UsersTableRow extends TrackerReact(Component){

  /*
    required props:
      - user: Object

  */

  constructor(props){
    super(props)
    this.state = {
      removing: false
    }
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  remove(e){
    e.preventDefault()
    Meteor.call('accounts.remove', this.props.user._id , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la suppression de l'utilisateur",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Utilisateur supprimé",
          message: "Bye bye baby !",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    })
  }

   toggleModerator(user_id, e){
     e.preventDefault()
     Meteor.call('admin.toggle_moderator', user_id , (error, result) => {
       if(error){
         console.log(error)
         Bert.alert({
           title: "Erreur lors de la modification de l'utilisateur",
           message: error.reason,
           type: 'danger',
           style: 'growl-bottom-left',
         })
       }else{
         Bert.alert({
           title: "Utilisateur modifié",
           type: 'success',
           style: 'growl-bottom-left',
         })
       }
     });
   }

  render(){
    const {user = {}, loading} = this.props
    const {removing} = this.state
    const moderator = Roles.userIsInRole(user._id, 'moderator')
    return(
      <Table.Row>
        <Table.Cell>{user.profile.firstname} {user.profile.lastname}</Table.Cell>
        <Table.Cell>
          {user.emails[0].address}
          </Table.Cell>
          <Table.Cell>{user.profile.company}</Table.Cell>
          <Table.Cell>{user.profile.job_title}</Table.Cell>
          <Table.Cell>
          <Button color={moderator ? "green" : null} onClick={(e) => {this.toggleModerator(user._id, e)}} >{moderator ? "Modérateur" : "Utilisateur"}</Button>
            {!removing ?
              <Button onClick={(e) => {this.toggleState('removing', e)}} color="red" icon="remove" />
            :
              <div>
                <p>Confirmer la suppression ?</p>
                <Button onClick={(e) => {this.toggleState('removing', e)}} icon="arrow left" />
                <Button onClick={(e) => {this.remove(e)}} color="red" icon="remove" />
              </div>
            }
          </Table.Cell>
      </Table.Row>
    )
  
  }
}



