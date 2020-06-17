import React from "react"
import {Navbar, Nav, NavItem, NavDropdown, Form, FormControl} from 'react-bootstrap';
import Routes  from "./Routes"

import Switch from "react-switch"

//import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';

//import SwitchExample from "./Switch"
import Select from "./Select"



import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'




class MyNavbar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      checked: "checked" in localStorage ? JSON.parse(localStorage.getItem("checked")) : true,
      hidden: false,
      bookmarkFilled: false,
      cleaned: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.fillBookmark = this.fillBookmark.bind(this);
  }

  setVisibility(value) {
    this.setState({hidden:value})
  }

  fillBookmark(value) {
    this.setState({bookmarkFilled: value})
  }


  handleChange(checked) {
    this.setState({ checked });
    localStorage.setItem("checked", JSON.stringify(checked))
  }

  render() {
    return (
      <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mynavbar">

        <Select source={this.state.checked ? "guardian" : "nytimes"} />

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <LinkContainer className="link" to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer className="link" to="/world"><Nav.Link>World</Nav.Link></LinkContainer>
            <LinkContainer className="link" to="/politics"><Nav.Link>Politics</Nav.Link></LinkContainer>
            <LinkContainer className="link" to="/business"><Nav.Link>Business</Nav.Link></LinkContainer>
            <LinkContainer className="link" to="/technology"><Nav.Link>Technology</Nav.Link></LinkContainer>
            <LinkContainer className="link" to="/sports"><Nav.Link>Sports</Nav.Link></LinkContainer>

          </Nav>
          <Nav>
            <LinkContainer className="mr-2" to="/favorites">
              <div>
                <FaRegBookmark
                  hidden={this.state.bookmarkFilled}
                  className="bookmark"
                  fill="white"
                  data-tip="Bookmark"
                  data-for='book1'
                />
                <ReactTooltip place="bottom" type="dark" effect="solid" id="book1" />

                <FaBookmark
                  className="mr-5"
                  hidden={!this.state.bookmarkFilled}
                  className="bookmark"
                  fill="white"
                  data-tip="Bookmark"
                  data-for='book2'
                />
                <ReactTooltip place="bottom" type="dark" effect="solid" id="book2" />

              </div>
            </LinkContainer>





            <span hidden={this.state.hidden} classname="col-lg-5 col-md-4 col-sm-12 mt-1" style={{color: "white"}}>NYTimes</span>
            <div hidden={this.state.hidden} classname="col-lg-2 col-md-4 col-sm-12 mt-1">
              <Switch
                onChange={this.handleChange}
                checked={this.state.checked}
                onColor="#2693e6"
                onHandleColor="#FFFFFF"
                handleDiameter={18}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                className="react-switch"
              />
            </div>
            <span hidden={this.state.hidden} classname="col-lg-5 col-md-4 col-sm-12 mt-1" style={{color: "white"}}>Guardian</span>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes
        checked={this.state.checked}
        changeHidden={this.setVisibility}
        hidden={this.state.hidden}
        bookmarkFilled={this.state.bookmarkFilled}
        fillBookmark={this.fillBookmark}
        cleanup={this.cleanup}
      />
      </div>
      )
    }
  }


export default MyNavbar
