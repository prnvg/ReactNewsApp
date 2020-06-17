import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
//import { colourOptions } from '../data';
import { Redirect, withRouter } from 'react-router-dom'

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null
    };
    this.searchPath = this.searchPath.bind(this)
    this.updateCurrent = this.updateCurrent.bind(this)
    this.loadOptions = this.loadOptions.bind(this)
  }

  searchPath() {
    if (this.state.current && this.state.current.label) {
      return (<Redirect to={"/search/" + this.props.source + "/" + this.state.current.label} />)
    }
  }

  updateCurrent(currentKeyWord) {
    this.setState({current: currentKeyWord})
  }

  loadOptions(input, callback) {
    try {
      fetch("https://csci571webapp.cognitiveservices.azure.com/bing/v7.0/suggestions?q=" + input ,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "a8518b03ffbb41f686379adbd2a1ac0d"
          }
        }
      ).then(data => {
            return data.json();
        }).then(data => {
            if(data.hasOwnProperty("suggestionGroups") && data.suggestionGroups !== null && data.suggestionGroups !== "undefined"){
                if(data.suggestionGroups[0].hasOwnProperty("searchSuggestions")
                && data.suggestionGroups[0].searchSuggestions !== null && data.suggestionGroups[0].searchSuggestions !== "undefined"){
                    const resultsRaw = data.suggestionGroups[0].searchSuggestions;
                    const results = resultsRaw.map(result => ({ value: result.displayText, label: result.displayText }));
                    callback(results);
                }
            }
        });
    }

    catch(error) {

    }

  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if(location.pathname.slice(1,7) !== 'search') {
        this.setState({current: null})
      }
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }

  render() {
    return (
      <div>
      {this.searchPath()}
        <AsyncSelect
          className="react-select"
          cacheOptions={false}
          defaultOptions={false}
          loadOptions={this.loadOptions}
          placeholder="Enter keyword .."
          onChange={this.updateCurrent}
          value={this.state.current}
        />
      </div>
    );
  }


}

export default withRouter(Select);
