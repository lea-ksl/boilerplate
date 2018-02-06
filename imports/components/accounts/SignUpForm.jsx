import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Form, Input, Button, Select, Checkbox, Label, Message } from 'semantic-ui-react'
import {Redirect, withRouter} from 'react-router-dom'

export class SignUpForm extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  handleChange(attr, e){
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  handleActivityChange(e, data) {
    e.preventDefault()
    const { user } = this.state
    user.company_market = data.value
    this.setState({ user })
  }

  signup(e){
    e.preventDefault()
    const {email, password} = this.state
    Meteor.call('accounts.signup', this.state , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de votre inscription",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Votre compte a bien été créé",
          message: "success",
          type: 'success',
          style: 'growl-bottom-left',
        })
        Meteor.loginWithPassword(email, password, () => {
          this.props.history.push("/")
        })
      }
    });
  }

  render(){
    const { label_class } = this.props
    const { user } = this.state
    const { company, job_title, company_market, firstname, lastname, email, password, password_confirmation} = user

    const activities_list = [
      { key: 'tic', value: 'tic', text: 'TIC' },
      { key: 'aero', value: 'aero', text: 'Aéronautique' },
      { key: 'defense_space', value: 'defense_space', text: 'Industrie défense et spatial' },
      { key: 'bank', value: 'bank', text: 'Banque / Finance' },
      { key: 'pharma', value: 'pharma', text: 'Chimie / Pharma et Biotechno' },
      { key: 'communication', value: 'communication', text: 'Communications-Médias' },
      { key: 'btp', value: 'btp', text: 'BTP' },
      { key: 'education', value: 'education', text: 'Education' },
      { key: 'electronic', value: 'electronic', text: 'Electronique' },
      { key: 'energy', value: 'energy', text: 'Energie' },
      { key: 'enginering', value: 'enginering', text: 'Ingénierie' },
      { key: 'entertainment', value: 'entertainment', text: 'Divertissement' },
      { key: 'environment', value: 'environment', text: 'Environnement' },
      { key: 'agro', value: 'agro', text: 'AgroAlimentaire' },
      { key: 'public', value: 'public', text: 'Secteur public' },
      { key: 'health', value: 'health', text: 'Santé / Hopitaux' },
      { key: 'insurances', value: 'insurances', text: 'Assurances' },
      { key: 'products', value: 'products', text: 'Fabrication Produits' },
      { key: 'association', value: 'association', text: 'Associatif' },
      { key: 'retail', value: 'retail', text: 'Distribution' },
      { key: 'technology', value: 'technology', text: 'Technologie' },
      { key: 'logistic', value: 'logistic', text: 'Transport et Logistique' },
      { key: 'business_services', value: 'business_services', text: 'Services aux entreprises' },
      { key: 'human_services', value: 'human_services', text: 'Services à la personne' },
      { key: 'rh', value: 'rh', text: 'RH' },
      { key: 'rd', value: 'rd', text: 'R&D' },
      { key: 'other', value: 'other', text: 'Autre' }
    ]

    return(
      <Form onSubmit={(e) => {this.signup(e)}}>
        <Form.Group>
          <Form.Field width={8}>
            <label>Prénom</label>
            <Input value={firstname} type="text" onChange={(e) => {this.handleChange('firstname', e)}} />
          </Form.Field>
          <Form.Field width={8}>
            <label>Nom</label>
            <Input value={lastname} type="text" onChange={(e) => {this.handleChange('lastname', e)}} />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={16}>
            <label>Email</label>
            <Input value={email} type="email" onChange={(e) => {this.handleChange('email', e)}} />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={8}>
            <label>Mot de passe</label>
            <Input value={password} type="password" onChange={(e) => {this.handleChange('password', e)}} />
          </Form.Field>
          <Form.Field width={8}>
            <label>Confirmation du mot de passe</label>
            <Input value={password_confirmation} type="password" onChange={(e) => {this.handleChange('password_confirmation', e)}} />
            {password && password != password_confirmation ?
              <label>Le mot de passe et la confirmation ne correspondent pas</label>
            : ''}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={8} className="">
            <label>Société</label>
            <Input value={company} type="text" onChange={(e) => { this.handleChange('company', e) }} />
          </Form.Field>
          <Form.Field width={8} className="">
            <label>Poste au sein de la société</label>
            <Input value={job_title} type="text" onChange={(e) => { this.handleChange('job_title', e) }} />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field className="">
            <label>Secteur d'activité de la société</label>
            <Select onChange={this.handleActivityChange.bind(this)} placeholder="Choisissez le secteur d'activité de votre société" options={activities_list} value={company_market} />
          </Form.Field>
        </Form.Group>
        <Button color="green">Sign Up</Button>
      </Form>
    )
  }
}

export default withRouter(SignUpForm)
