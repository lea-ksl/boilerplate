import {Meteor} from 'meteor/meteor'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/fr'

Meteor.methods({
    // "admin.get_all_users_csv"(){
    //   if(Roles.userIsInRole(this.userId, 'admin')){
    //     const users = Meteor.users.find({}).fetch()
    //     let result = []
    //     _.each(users, function(user){
    //       let flush = {}
    //       flush.email = user.emails[0].address
    //       flush["Prénom"] = user.profile.firstname
    //       flush["Nom"] = user.profile.lastname
    //       flush["Entreprise"] = user.profile.company || " "
    //       flush["Poste"] = user.profile.job_title || " "
    //       flush["Secteur d'activité"] = user.profile.company_market || " "
    //       flush["Créé le"] = moment(user.createdAt).format('DD.MM.YYYY - HH:mm')
    //       result.push(flush)
    //     });

    //     return Papa.unparse(result, {
    //       delimiter: ";",
    //       header: true,
    //       encoding: "UTF-8",
    //       skipEmptyLines: true
    //     })
    //   }

    // },
    'admin.toggle_moderator'(user_id){
        if(!Roles.userIsInRole(this.userId, 'admin')){
          throw new Meteor.Error('403', "Vous devez être administrateur")
        }else{
          let user = Meteor.users.findOne({_id: user_id})
          if(Roles.userIsInRole(user_id, 'moderator')){
            const index_role = user.roles.indexOf('moderator')
            user.roles.splice(index_role, 1)
            Meteor.users.update({_id: user_id}, {$set: {roles: user.roles}})
          }else{
            Roles.addUsersToRoles(user_id, 'moderator')
          }
        }
      }
    
})
