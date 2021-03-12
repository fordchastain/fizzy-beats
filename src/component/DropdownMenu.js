import React from "react";
import PropTypes from "prop-types";
import "./DropdownMenu.css";

export default class DropdownMenu extends React.Component {
  static propTypes = {
    names: PropTypes.array,
    value: PropTypes.string,
    label: PropTypes.string,

  };

  handleChange = () => {

  };

  render() {
    const options = [];
    for (let i = 0; i < this.props.names.length; i++) {
      options.push(<option value={this.props.names[i]}>{this.props.names[i]}</option>);
    }

    return (
      <div className="component-dropdown-menu">
        <label>{this.props.label}</label>
        <select>
          {options}
        </select>
      </div>
    );
  }
}