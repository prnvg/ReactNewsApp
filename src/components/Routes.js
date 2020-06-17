import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from "./NewsSections/Home"

import Article from "./Article"
import SearchResults from "./SearchResults"
import Favorites from "./Favorites"

class Routes extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <main>
        <Redirect from="/" to="/home" />
        <Switch>
            //<Route path="/" component={() => <Home guardian={this.props.checked} section="home" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} exact />
            <Route path="/home" component={() => <Home guardian={this.props.checked} section="home" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} exact />
            <Route path="/world" component={() => <Home guardian={this.props.checked} section="world" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route path="/politics" component={() => <Home guardian={this.props.checked} section="politics" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route path="/business" component={() => <Home guardian={this.props.checked} section="business" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route path="/technology" component={() => <Home guardian={this.props.checked} section="technology" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route path="/sports" component={() => <Home guardian={this.props.checked} section="sport" hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route path="/article/:source/*" component={(props) => <Article match={props.match} hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route path="/search/:source/*" component={(props) => <SearchResults match={props.match} hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark} />} />
            <Route path="/favorites" component={(props) => <Favorites match={props.match} hidden={this.props.hidden} changeHidden={this.props.changeHidden} bookmarkFilled={this.props.bookmarkFilled} fillBookmark={this.props.fillBookmark}/>} />
            <Route component={Error} />
        </Switch>
      </main>
    );
  }
}

export default Routes;
