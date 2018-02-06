import React, { Component } from 'react'
import { Meteor }           from 'meteor/meteor'

import { Route, Redirect } from 'react-router-dom'

const user_id = Meteor.isclient ? Meteor.userId() : this.userId
const Admin = ({ loggingIn, authenticated, isAdmin, isMobile, component, ...rest }) => {

  if(loggingIn){ return <div>Loading</div>}

  return(
    isAdmin ?
      <Route {...rest} render={(props) => React.createElement(component, { ...props, isAdmin, isMobile, loggingIn, authenticated })} />
    :
      <Redirect to="/" />
  )
}

export default Admin
