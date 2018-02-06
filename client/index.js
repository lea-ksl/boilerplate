import React from 'react'
import { render } from 'react-dom'
import { onPageLoad } from 'meteor/server-render'
import App from '/imports/startup/router'
import { ReactiveVar } from 'meteor/reactive-var'


Meteor.startup(() => {
  Tracker.autorun((computation) => {
    if(Roles.subscription.ready()){
      new WOW().init()
      render(
        <App />,
        document.getElementById('root')
      )
      computation.stop()
    }
  })
})