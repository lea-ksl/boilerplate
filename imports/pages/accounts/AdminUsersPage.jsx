import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Button, Table, Container, Select, Input, Form} from 'semantic-ui-react'
import UsersTable from '/imports/components/accounts/UsersTable'

export class AdminUsersPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  state = {
    downloading: false
  }
  

  handleChange(attr, e){
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  

    // download_csv(){
    //   this.setState({downloading: true})
    //   Meteor.call('admin.get_all_users_csv', (error, result) => {
    //     if(error){
    //       Bert.alert({
    //         title: "Erreur lors de la génération CSV",
    //         message: error.reason,
    //         type: 'danger',
    //         style: 'growl-bottom-left',
    //       })
    //       this.setState({downloading: false})
    //     }else{
    //       Bert.alert({
    //         title: "Téléchargement en cours",
    //         type: 'success',
    //         style: 'growl-bottom-left',
    //       })

    //       const blob = new Blob([result]);
    //         if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    //             window.navigator.msSaveBlob(blob, "MELEE_inscrits.csv");
    //         else
    //         {
    //             const a = window.document.createElement("a");
    //             a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    //             a.download = "MELEE_inscrits.csv";
    //             document.body.appendChild(a);
    //             a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    //             document.body.removeChild(a);
    //         }
    //         this.setState({downloading: false})
    //     }
    //   })
    // }

  render(){
    const {users,  loading} = this.props
    const {display_form} = this.state

    
    if(!loading){

      return(
        <Grid stackable>
          <Container>
            <Grid.Column width={16} className="center-align marged">
              <Header as="h1">Administration des utilisateurs</Header>
            </Grid.Column>
            <Grid.Column width={16} style={{margin: 'auto', textAlign: 'center'}}>
               {/* <Button loading={this.state.downloading} positive onClick={(e) => {this.download_csv()}}>Télécharger le CSV (Excel)</Button>   */}
            </Grid.Column>
              <Grid.Column width={16}>
                <UsersTable users={users} />
              </Grid.Column>
        
          </Container>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des utilisateurs</Loader>
    }
  }
}

export default AdminUsersPageContainer = createContainer(() => {
  const usersPublication = Meteor.subscribe('users.all')
  const loading = !usersPublication.ready()
  const users = Meteor.users.find({_id: {$ne: Meteor.userId()}}, {sort: {username: -1}}).fetch()
  return {
    loading,
    users
  }
}, AdminUsersPage)
