import React                    from "react"
import { onPageLoad }           from "meteor/server-render"
import { renderToString }       from "react-dom/server"
import { ServerStyleSheet }     from "styled-components"
import {
  StaticRouter as Router,
  Switch
}                               from 'react-router-dom'
import MainLayoutServer         from "/imports/layouts/MainLayoutServer"
import Public                   from "/imports/components/routes/Public"
import Admin                   from "/imports/components/routes/Admin"
import { Helmet }               from "react-helmet"
import { Dimmer, Loader } from 'semantic-ui-react'

onPageLoad(sink => {
  let browser = sink.request.browser.name
  browser = browser.toLowerCase()
  const isMobile = browser.indexOf("mobile") > -1

  const context = {}
  const sheet = new ServerStyleSheet()

  const path = sink.request.url.path

    let htmlString = renderToString(
      sheet.collectStyles(
        <Router
          location={ path }
          context={ context }>
          <Switch>
            <Admin component={Loading} path="/admin" />
            <Public component={ MainLayoutServer } path="/" isMobile={ isMobile } />
          </Switch>
        </Router>
      )
    )

    sink.renderIntoElementById("root", htmlString)
    sink.appendToHead(sheet.getStyleTags());
})

const Loading = () => (
  <Dimmer active><Loader content="chargement" /></Dimmer>
)
