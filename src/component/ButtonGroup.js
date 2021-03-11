import React from "react";
import PropTypes from "prop-types";
import "./ButtonGroup.css";

export default class ButtonGroup extends React.Component {
  static propTypes = {
    selected: PropTypes.number,
    buttons: PropTypes.number,
    handleClick: PropTypes.func,
    labelText: PropTypes.string
  };

  handleClick = (e) => {
    this.props.handleClick(e.target.innerText);
  };

  render() {
    const buttons = [];
    for (let i = 0; i < this.props.buttons; ++i) {
      const buttonClass = [
        "group-button",
        this.props.selected === i ? "selected" : ""
      ];
      buttons.push(<button className={buttonClass.join(" ").trim()} onClick={this.handleClick}>{i+1}</button>);

      if (i !== this.props.buttons - 1) {
        buttons.push(<div className="divider"></div>);
      }
    }

    return (
      <div className="component-button-group">
        <label>{this.props.labelText}</label>
        <div className="buttons">
          {buttons}
        </div>
      </div>
    );
  }
}