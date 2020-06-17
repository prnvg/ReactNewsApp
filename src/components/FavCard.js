import React from "react"

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import { MdShare } from "react-icons/md";
import Modal from 'react-bootstrap/Modal'
import { MdDelete } from "react-icons/md";

import FavShareButton from './FavShareButton'
import { toast } from 'react-toastify';

class FavCard extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this)
  }


  handleDelete(event) {
    event.preventDefault();
    //console.log("delete clicked");
    let currentBookmarks = this.props.bookmarks;
    if (this.props.id in currentBookmarks) {
      delete currentBookmarks[this.props.id];
      //console.log(currentBookmarks)
      toast("Removing " + this.props.title,
            {className: "my-toast"}
          );
      localStorage.setItem("bookmarks", JSON.stringify(currentBookmarks))
      //console.log("bookmark updated!")
      //this.render()
    }
    this.props.getBookmarks();
  }




  render(){

    const section_mapper = {
      'world': 'section-world',
      'politics': 'section-politics',
      'business': 'section-business',
      'technology': 'section-technology',
      'sport': 'section-sport',
      'sports': 'section-sport',
      'guardian': 'section-guardian',
      'nytimes': 'section-nytimes',
    }

    let section_class
    if(this.props.section.toLowerCase() in section_mapper){
      section_class = section_mapper[this.props.section.toLowerCase()]
    }
    else {
      section_class = "section-other"
    }
    let fav_class = section_mapper[this.props.source.toLowerCase()]
    const link = "/article/" + this.props.source + "/" + this.props.id

    return (
      <div className="link col-lg-3 col-md-6 col-sm-12">
      <LinkContainer to={link}>
      <div className="p-2">
        <Card className="shadow" >
          <Card.Body>
            <Card.Title style={{fontStyle: "italic"}}>{this.props.title}
                <FavShareButton url={this.props.url} text={"CSCI_571_NewsApp"} title={this.props.title} source={this.props.source}/>
                <MdDelete style={{marginTop: "-7px"}} onClick={this.handleDelete}/>
            </Card.Title>
            <Card.Text>
                <Card.Img variant="top" src={this.props.image} className="img-thumbnail" />
              <br/> <br/>
                <div className="float-left"><p><i>{this.props.date}</i></p></div>
                <div className="float-right">
                  <span className={fav_class}>{this.props.source.toUpperCase()}</span>
                  <span className={section_class}>{this.props.section.toUpperCase()}</span>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
        </div>

      </LinkContainer>

      </div>
  )
}
}


export default FavCard
