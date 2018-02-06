import React, { Component } from 'react'
import { Meteor }           from 'meteor/meteor'

import {
  BrowserRouter as Router,
  Switch
}                           from 'react-router-dom'

import Public               from "/imports/components/routes/Public"
import Admin                   from "/imports/components/routes/Admin"


import DynamicImporter     from "/imports/components/dynamic_importer/DynamicImporter"

import MainLayout           from "/imports/layouts/MainLayout"
const AdminLayout          = DynamicImporter(() => import("/imports/layouts/AdminLayout"));
import { authenticated }    from "/imports/containers/authenticated"

const App = appProps => (
  <Router>
    <Switch>
      <Admin component={AdminLayout} path="/admin" {...appProps} />
      <Public component={ MainLayout } path="/" {...appProps} />
    </Switch>
  </Router>
)


export default authenticated(App)
