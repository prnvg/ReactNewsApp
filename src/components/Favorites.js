import React from "react"

import FavCard from "./FavCard"
import Loader from "./Loader"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Favorites extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      results: {},
      isLoaded: false,
      error: null
    };
    this.getBookmarks = this.getBookmarks.bind(this);
  }

  getBookmarks(){
    this.setState({results: JSON.parse(localStorage.getItem('bookmarks')) || {},
                   isLoaded: true})
  }

  componentDidMount() {
    if(!this.props.hidden) {
      this.props.changeHidden(true);
    }

    if(!this.props.bookmarkFilled) {
      this.props.fillBookmark(true)
    }

    this.getBookmarks();
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
    else if (Object.keys(results).length === 0) {
      return(
        <center><h4>You have no saved articles</h4></center>
      )
    }
    else {
      return (
        <div className="px-4 py-2">
        <h4>Favorites</h4>
        <div className="row">
              {Object.keys(results).map(
                r => (
                  <FavCard
                    key={results[r].id}
                    title={results[r].title}
                    image= {results[r].image}
                    description= {results[r].description}
                    section= {results[r].section}
                    date= {results[r].date}
                    url= {results[r].url}
                    id = {results[r].id}
                    source = {results[r].source}
                    bookmarks= {this.state.results}
                    getBookmarks = {this.getBookmarks}
                  />
                )
              )}
          </div>
        </div>
      )
    }
  }
}

export default Favorites
