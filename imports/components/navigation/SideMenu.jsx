import React, { Component } from 'react'

import {Button} from "semantic-ui-react";
import Navbar from './Navbar'
import Drawer from '/imports/components/drawer/Drawer';



class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillReceiveProps(nextProps){
    const { location } = nextProps;
    if(location.pathname !== this.props.location.pathname ){
      this.setState({ open: false });
    }
  }

  render(){
    const { open } = this.state;
    const { isMobile } = this.props;
    if(isMobile){
      return(
        <div>
          <Button circular icon="content" color="grey" onClick={ () => this.setState({ open: true }) } className="buttonMobile" />
          <Drawer
              width={ 281 }
              open={ open }
              onChange={ open => this.setState({ open }) }
          >
          <Navbar {...this.props }/>
          </Drawer>
        </div>
      )
    }

    return(
          <Navbar {...this.props } />
    )
  }
}



export default SideMenu
