import React from "react"

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import { MdShare } from "react-icons/md";
import Modal from 'react-bootstrap/Modal'
import { FaBookmark, FaRegBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import commentBox from 'commentbox.io';
import { toast } from 'react-toastify';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailIcon } from "react-share"



var Scroll = require('react-scroll');
var Element = Scroll.Element;
var scroller = Scroll.scroller;


class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef()

    this.state = {
      id: this.props.id,
      title: this.props.title,
      image: this.props.image,
      description: this.props.description,
      section: this.props.section,
      date: this.props.date,
      url: this.props.url,
      source: this.props.source,
      bookmarks: {},
      bookmarked: null,
      up: false,
      down: null,
    };
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
  }

  componentDidMount() {
      this.removeCommentBox = commentBox("5740152504713216-proj");
      this.setState({bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || {} });

    }

  componentWillUnmount() {
      this.removeCommentBox();
    }

  handleBookmark() {
    let currentBookmarks = this.state.bookmarks;

    if (!(this.state.id in currentBookmarks)) {
      currentBookmarks[this.state.id] = {
        'title': this.state.title,
        'image': this.state.image,
        'description': this.state.description,
        'section': this.state.section,
        'date': this.state.date,
        'url': this.state.url,
        'id': this.state.id,
        'source': this.state.source,
      }

      this.setState({bookmarked: true})
      toast("Saving " + this.state.title,
            {className: "my-toast"}
          );

      localStorage.setItem("bookmarks", JSON.stringify(currentBookmarks))

    }
  }

  handleRemoveBookmark() {

    let currentBookmarks = this.state.bookmarks;

    if (this.state.id in currentBookmarks) {

      delete currentBookmarks[this.state.id]

      this.setState({bookmarked: false})
      toast("Removing " + this.state.title,
            {className: "my-toast"}
          );
      localStorage.setItem("bookmarks", JSON.stringify(currentBookmarks))

    }
  }

  handleDownClick(ref) {
    if (!this.state.up) {
      this.setState({up: true})
      this.setState({down: false})
    }
    scroller.scrollTo('scrollToRemaining', {
      duration: 1500,
      delay: 0,
      smooth: true,
      offset: 0,
    })
  }

  handleUpClick() {
    Scroll.animateScroll.scrollToTop({behavior: "smooth", duration: 750})
    if (!this.state.down) {
      this.setState({down: true})
      this.setState({up: false})
    }

  }


  render(){

    let bigText = this.state.description
    let smallText = ""
    let smallLength = 0
    let remainingText = null
    //console.log('Big Text: ' + bigText)
    const re = /[.!?]/
    const textArray = bigText.split(re)
    if (textArray.length > 4) {
      smallLength = textArray[0].length + textArray[1].length + textArray[2].length + textArray[3].length + 4
      smallText = bigText.slice(0, smallLength)
      remainingText = bigText.slice(smallLength+1, )
    }
    else {
      smallText = bigText
    }

    if (this.state.down === null) {
      this.setState({down: remainingText !== null ? true : false})
    }
    //console.log(smallText)

    return (
      <div>
      <Card className="shadow m-3">
        <Card.Body>
          <Card.Title><h3><i>{this.state.title}</i></h3></Card.Title>
          <Card.Text>

                <div className="float-left">
                  <i>{this.state.date}</i>
                </div>

                <div className="float-right mr-4">
                  <a data-tip="Facebook">
                  <FacebookShareButton
                    url={this.props.url}
                    hashtag="#CSCI_571_NewsApp">
                    <FacebookIcon size={25} round={true} />
                  </FacebookShareButton>
                  </a>

                  <a data-tip="Twitter">
                  <TwitterShareButton
                    url={this.props.url}
                    hashtags={["CSCI_571_NewsApp"]}>
                    <TwitterIcon size={25} round={true} />
                  </TwitterShareButton>
                  </a>

                  <a data-tip="Email">
                  <EmailShareButton
                    subject="#CSCI_571_NewsApp"
                    url={this.props.url}>
                    <EmailIcon size={25} round={true} />
                  </EmailShareButton>
                  </a>

                  <ReactTooltip className='react-tooltip' place="top" type="dark" effect="solid"/>

                    <FaRegBookmark className="ml-5"
                      hidden={this.state.id in this.state.bookmarks ? true : false}
                      onClick={() => (this.handleBookmark())}
                      color="red"
                      size="24"
                      data-tip="Bookmark"
                      data-for='global'
                    />
                    <FaBookmark className="ml-5"
                      hidden={this.state.id in this.state.bookmarks ? false : true}
                      onClick={() => (this.handleRemoveBookmark())}
                      color="red"
                      size="24"
                      data-tip="Bookmark"
                      data-for='global'
                    />
                </div>
                <ReactTooltip place="top" type="dark" effect="solid" id="global"/>
            <Card.Img variant="top" src={this.state.image} className="mt-2"/>
            <Element name="scrollToSmall"><p>{smallText}</p></Element>
            <Element name="scrollToRemaining"><p hidden={!this.state.up}>{remainingText}</p></Element>
            <br />
            <FaChevronDown
              hidden={!this.state.down}
              onClick={() => (this.handleDownClick(this.Red))}
              style={{float: "right", fontSize: "1.5em", marginRight: "1em"}}
            />
            <FaChevronUp
              hidden={!this.state.up}
              onClick={() => (this.handleUpClick())}
              style={{float: "right", fontSize: "1.5em", marginRight: "1em"}}
            />
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="commentbox" />
      </div>
  )
}
}


export default ArticleCard
