import React, { Component } from "react";
import Switch from "react-switch";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    //console.log("prev state: ", this.state.checked)
    this.setState({ checked });
    this.props.onChange(checked);
    //console.log("post state: ", this.state.checked)
  }

  render() {
    return (
      <label>
        <span style={{color: "white"}}>NYTimes</span>
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
        <span style={{color: "white"}}>Guardian</span>
      </label>
    );
  }
}

export default SwitchExample
