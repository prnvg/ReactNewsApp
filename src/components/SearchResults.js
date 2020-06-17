import React from "react"

import SearchCard from "./SearchCard"
import Loader from "./Loader"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SearchResults extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoaded: false,
      error: null
    };

    this.getImage= this.getImage.bind(this)
    this.getKey= this.getKey.bind(this)
    this.getTitle= this.getTitle.bind(this)
    this.getDescription= this.getDescription.bind(this)
    this.getSection= this.getSection.bind(this)
    this.getPubDate= this.getPubDate.bind(this)

  }



  componentDidMount() {

    if(!this.props.hidden) {
      this.props.changeHidden(true);
    }

    if(this.props.bookmarkFilled) {
      this.props.fillBookmark(false)
    }

    let url = ""
    if(this.props.match.params.source === "guardian") {
      url = "https://pranav-newsapp-backend.appspot.com/guardian/search/?q=" + this.props.match.params[0]
    }
    else {
      url = "https://pranav-newsapp-backend.appspot.com/nytimes/search/?q=" + this.props.match.params[0]

    }

     fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            results: this.props.match.params.source === "guardian" ? result.response.results : result.response.docs,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }


    getImage(record) {
      if(this.props.match.params.source === "guardian") {
        if("blocks" in record && "main" in record.blocks && "elements" in record.blocks.main && "assets" in record.blocks.main.elements[0] && record.blocks.main.elements[0].assets.length > 0) {
          let l = record.blocks.main.elements[0].assets.length
          return (record.blocks.main.elements[0].assets[l - 1].file)
        }
        else {
          return ("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png")
        }
      }
      else {
        if("multimedia" in record && record.multimedia !== null && record.multimedia !== "undefined"){
          for(let i = 0; i < record.multimedia.length; i++) {
            if(record.multimedia[i].width > 2000) {
              return "https://www.nytimes.com/" + record.multimedia[i].url
            }
          }
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
      }
    }

    getKey(record) {
      if(this.props.match.params.source === "guardian") {
        if("id" in record && record.id.length > 0) {
          return record.id
        }
        else {
          return "no-key"
        }
      }
      else {
        if("web_url" in record && record.web_url.length > 0) {
          return record.web_url
        }
        else {
          return "no-key"
        }
      }
    }

    getURL(record) {
      if(this.props.match.params.source === "guardian") {
        if("webUrl" in record && record.webUrl.length > 0) {
          return record.webUrl
        }
        else {
          return "undefined"
        }
      }
      else {
        if("web_url" in record && record.web_url.length > 0) {
          return record.web_url
        }
        else {
          return "undefined"
        }
      }
    }

    getTitle(record) {
      if(this.props.match.params.source === "guardian") {
        if("webTitle" in record && record.webTitle.length > 0) {
          return record.webTitle
        }
        else {
          return "Title"
        }
      }
      else {
        if("headline" in record && "main" in record.headline && record.headline.main.length > 0) {
          return record.headline.main
        }
        else {
          return "Title"
        }
      }
    }

    getDescription(record) {
      if(this.props.match.params.source === "guardian") {
        if("blocks" in record && "body" in record.blocks && record.blocks.body.length > 0 && "bodyTextSummary" in record.blocks.body[0]) {
          return record.blocks.body[0].bodyTextSummary
        }
        else {
          return "description"
        }
      }
      else {
        if("abstract" in record && record.abstract.length > 0) {
          return record.abstract
        }
        else {
          return "description"
        }
      }
    }

    getSection(record) {
      if(this.props.match.params.source === "guardian") {
        if("sectionId" in record && record.sectionId.length > 0) {
          return record.sectionId
        }
        else {
          return "section"
        }
      }
      else {
        if("news_desk" in record && record.news_desk.length > 0) {
          return record.news_desk
        }
        else {
          return "section"
        }
      }
    }

    getPubDate(record) {
      if(this.props.match.params.source === "guardian") {
        if("webPublicationDate" in record && record.webPublicationDate.length > 0) {
          return record.webPublicationDate.slice(0,10)
        }
        else {
          return "01/01/01"
        }
      }
      else {
        if("pub_date" in record && record.pub_date.length > 0) {
          return record.pub_date.slice(0,10)
        }
        else {
          return "01/01/01"
        }
      }
    }



  render() {

    const { results, isLoaded, error } = this.state;
    //console.log(this.props.guardian)
    //console.log(results);
    //this.componentDidMount()

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return (<Loader />)
    }
    else {
      return (
        <div className="px-4 py-2">
        <h4>Results</h4>
          <div className="row">
              {results.slice(0,10).map(
                r => (
                  <SearchCard
                    className="search-card"
                    key={this.getKey(r)}
                    title={this.getTitle(r)}
                    image= {this.getImage(r)}
                    description= {this.getDescription(r)}
                    section= {this.getSection(r)}
                    date= {this.getPubDate(r)}
                    url= {this.getURL(r)}
                    id = {this.getKey(r)}
                    source = {this.props.match.params.source === "guardian" ? "guardian" : "nytimes"}
                  />
                )
              )}
            </div>
          </div>
      )
    }
  }
}

export default SearchResults
