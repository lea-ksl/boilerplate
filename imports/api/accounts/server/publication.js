import {Meteor} from 'meteor/meteor'

Meteor.publish('users.all', function(){
  if(!Roles.userIsInRole(this.userId, 'admin')){
    throw new Meteor.Error('403', "Vous devez être administrateur")
  }else{
    return Meteor.users.find({})
  }
})


Meteor.publish('users.stats', function(){
  if(!Roles.userIsInRole(this.userId, 'admin')){
    throw new Meteor.Error('403', "Vous devez être administrateur")
  }else{
    return Meteor.users.find({}, {fields: {createdAt: 1}})
  }
})

Meteor.publish("users.in_ids", function(users_ids){
  if(!Roles.userIsInRole(this.userId, 'admin')){
    throw new Meteor.Error('403', "Vous devez être administrateur")
  }else{
    return Meteor.users.find({_id: {$in: users_ids}})
  }
})

Meteor.publish("users.by_id", function(user_id){
  if(!Roles.userIsInRole(this.userId, 'admin')){
    throw new Meteor.Error('403', "Vous devez être administrateur")
  }else{
    return Meteor.users.find({_id: user_id})
  }
})
