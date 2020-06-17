import React from "react"

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import { MdShare } from "react-icons/md";
import Modal from 'react-bootstrap/Modal'

import Example from './ShareButton'


class SearchCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      image: this.props.image,
      description: this.props.description,
      section: this.props.section,
      date: this.props.date,
      url: this.props.url,
      source: this.props.source,
    };
    this.openShareModal = this.openShareModal.bind(this)
  }

  openShareModal() {
    console.log("Share button clicked!")
    console.log(this.state.title)
  }


  render(){

    //console.log(this.state)

    const section_mapper = {
      'world': 'section-world',
      'politics': 'section-politics',
      'business': 'section-business',
      'technology': 'section-technology',
      'sport': 'section-sport',
      'sports': 'section-sport',
    }

    let section_class
    if(this.state.section.toLowerCase() in section_mapper){
      section_class = section_mapper[this.state.section.toLowerCase()]
    }
    else {
      section_class = "section-other"
    }
    const link = "/article/" + this.state.source + "/" + this.state.id

    console.log(this.state.id)
    return (
      <LinkContainer className="link col-lg-3 col-md-4 col-sm-12" to={link}>
      <div className="p-2">
        <Card className="shadow search-card">
          <Card.Body>
            <Card.Title><i>{this.state.title} </i><Example url={this.state.url} text={"CSCI_571_NewsApp"} title={this.state.title} /></Card.Title>
            <Card.Text>
              <Card.Img variant="top" src={this.state.image} className="img-thumbnail"/>
              <br/><br />
                <div className="float-left"><p><i>{this.state.date}</i></p></div>
                <div className="float-right"><span className={section_class}>{this.state.section.toUpperCase()}</span></div>
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      </LinkContainer>
  )
}
}


export default SearchCard
