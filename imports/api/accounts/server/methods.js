import {Meteor} from 'meteor/meteor'

Meteor.methods({
  'accounts.signup'(account_data) {
    
    const user = Accounts.createUser({
      email: account_data.email,
      username: account_data.firstname + ' ' + account_data.lastname,
      password: account_data.password,
      profile: {
        firstname: account_data.firstname,
        lastname: account_data.lastname,
        company: account_data.company,
        job_title: account_data.job_title,
        company_market: account_data.company_market,
        looking_for: account_data.looking_for
      }
    })
    console.log("SERVER: Signup request for email " + account_data.email)
    return user

  }
})

