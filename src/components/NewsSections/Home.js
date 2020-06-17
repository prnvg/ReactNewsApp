import React from "react"

import NewsCard from "../NewsCard"
import Loader from "../Loader"

class Home extends React.Component{

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

    if(this.props.hidden) {
      this.props.changeHidden(false);
    }

    if(this.props.bookmarkFilled) {
      this.props.fillBookmark(false )
    }

    let url = ""
    if(this.props.guardian) {
      url = "https://pranav-newsapp-backend.appspot.com/guardian/" + this.props.section
    }
    else {
      url = "https://pranav-newsapp-backend.appspot.com/nytimes/" + this.props.section
    }

     fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            results: this.props.guardian ? result.response.results : result.results,
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
    if(this.props.guardian) {
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
            return record.multimedia[i].url
          }
        }
      }
      return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
    }
  }

  getKey(record) {
    if(this.props.guardian) {
      if("id" in record && record.id.length > 0) {
        return record.id
      }
      else {
        return null
      }
    }
    else {
      if("url" in record && record.url.length > 0) {
        return record.url
      }
      else {
        return null
      }
    }
  }

  getURL(record) {
    if(this.props.guardian) {
      if("webUrl" in record && record.webUrl.length > 0) {
        return record.webUrl
      }
      else {
        return null
      }
    }
    else {
      if("url" in record && record.url.length > 0) {
        return record.url
      }
      else {
        return null
      }
    }
  }

  getTitle(record) {
    if(this.props.guardian) {
      if("webTitle" in record && record.webTitle.length > 0) {
        return record.webTitle
      }
      else {
        return null
      }
    }
    else {
      if("title" in record && record.title.length > 0) {
        return record.title
      }
      else {
        return null
      }
    }
  }

  getDescription(record) {
    if(this.props.guardian) {
      if("blocks" in record && "body" in record.blocks && record.blocks.body.length > 0 && "bodyTextSummary" in record.blocks.body[0]) {
        return record.blocks.body[0].bodyTextSummary
      }
      else {
        return null
      }
    }
    else {
      if("abstract" in record && record.abstract.length > 0) {
        return record.abstract
      }
      else {
        return null
      }
    }
  }

  getSection(record) {
    if(this.props.guardian) {
      if("sectionId" in record && record.sectionId.length > 0) {
        return record.sectionId
      }
      else {
        return null
      }
    }
    else {
      if("section" in record && record.section.length > 0) {
        return record.section
      }
      else {
        return null
      }
    }
  }

  getPubDate(record) {
    if(this.props.guardian) {
      if("webPublicationDate" in record && record.webPublicationDate.length > 0) {
        return record.webPublicationDate.slice(0,10)
      }
      else {
        return null
      }
    }
    else {
      if("published_date" in record && record.published_date.length > 0) {
        return record.published_date.slice(0,10)
      }
      else {
        return null
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

      let final_results = []
      let i
      for(i=0; i<results.length; i++) {
        if(this.getKey(results[i]) && this.getTitle(results[i]) && this.getDescription(results[i]) && this.getSection(results[i]) && this.getPubDate(results[i]) && this.getURL(results[i])) {
          final_results.push(results[i])
        }
        if(final_results.length == 10) {
          break
        }
      }

      console.log(final_results)

      return (
        final_results.map(
          r => (
            <NewsCard
              key={this.getKey(r)}
              title={this.getTitle(r)}
              image= {this.getImage(r)}
              description= {this.getDescription(r)}
              section= {this.getSection(r)}
              date= {this.getPubDate(r)}
              url= {this.getURL(r)}
              id = {this.getKey(r)}
              source = {this.props.guardian ? "guardian" : "nytimes"}
            />
          )
        )
      )
    }
  }
}

export default Home
