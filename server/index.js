import { Meteor } from 'meteor/meteor'
import "/imports/startup/server"
import "/imports/api/accounts/server/methods"
import "/imports/api/accounts/server/publication"
import "/imports/api/admin/server/methods"

Meteor.startup(() => {

  Migrations.migrateTo('latest')
  const users = Meteor.users.find().fetch()
  if (!users || users.length == 0) {
    console.log("CREATION FIRST USER")

    const user = Accounts.createUser({
      email: Meteor.settings.private.ADMIN_EMAIL,
      password: Meteor.settings.private.ADMIN_PASSWORD,
      username: Meteor.settings.private.ADMIN_USERNAME,
      profile: {}
    })
    Roles.addUsersToRoles(user, 'admin')
  } 

})
