import React from "react"

import ArticleCard from "./ArticleCard"
import Loader from "./Loader"

class Article extends React.Component {

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
      console.log("FILLED")
      this.props.fillBookmark(false)
    }

    let url = ""
    if(this.props.match.params.source === "guardian") {
      url = "https://pranav-newsapp-backend.appspot.com/guardian/article/?id=" + this.props.match.params[0]
    }
    else {
      url = "https://pranav-newsapp-backend.appspot.com/nytimes/article/?id=" + this.props.match.params[0]
    }

     fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            results: this.props.match.params.source === "guardian" ? result.response.content : result.response.docs[0],
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
              return "https://static01.nyt.com/" + record.multimedia[i].url
            }
          }
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
      }
    }

    getKey(record) {
      if(this.props.match.params.source === "guardian") {
        return record.id
      }
      else {
        return record.web_url
      }
    }

    getURL(record) {
      if(this.props.match.params.source === "guardian") {
        return record.webUrl
      }
      else {
        return record.web_url
      }
    }

    getTitle(record) {
      if(this.props.match.params.source === "guardian") {
        return record.webTitle
      }
      else {
        //debugger;
        return record.headline.main
      }
    }

    getDescription(record) {
      if(this.props.match.params.source === "guardian") {
        return record.blocks.body[0].bodyTextSummary
      }
      else {
        return record.abstract
      }
    }

    getSection(record) {
      if(this.props.match.params.source === "guardian") {
        return record.sectionId
      }
      else {
        return record.section_name
      }
    }

    getPubDate(record) {
      if(this.props.match.params.source === "guardian") {
        return record.webPublicationDate.slice(0,10)
      }
      else {
        return record.pub_date.slice(0,10)
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
              <ArticleCard
                key={this.getKey(results)}
                title={this.getTitle(results)}
                image= {this.getImage(results)}
                description= {this.getDescription(results)}
                section= {this.getSection(results)}
                date= {this.getPubDate(results)}
                id = {this.getKey(results)}
                url = {this.getURL(results)}
                source = {this.props.match.params.source === "guardian" ? "guardian" : "nytimes"}
              />


        )
      }
    }
  // render() {return(
  //   <p>{this.props.match.params[0]}</p>
  // )}
}

export default Article
