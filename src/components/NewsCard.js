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


class NewsCard extends React.Component {

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
  }




  render(){


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

    return (
      <div className="p-3">
        <LinkContainer className="link" to={link}>
          <Card className="shadow">
            <div className="row p-3">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <Card.Img variant="top" className="img-thumbnail" src={this.state.image} />
              </div>
              <Card.Body className="col=lg-9 col-md-9 col-sm-12 py-0 pr-4 ">
                <Card.Title>
                  <i>{this.state.title}</i><Example url={this.state.url} title={this.state.title} />
                </Card.Title>
                <Card.Text>
                  <div className="smallDescription">
                    {this.state.description}
                  </div>
                  <br/>
                  <div className="float-left">
                    <i>{this.state.date}</i>
                  </div>
                  <div className={section_class}>
                    {this.state.section.toUpperCase()}
                  </div>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        </LinkContainer>
      </div>
  )
}
}


export default NewsCard
