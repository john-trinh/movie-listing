import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Sorting extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      actions: [
        {key: 'a-to-z', value: 'A-Z'},
        {key: 'release-day', value: 'Release Day'},
        {key: 'popularity', value: 'Popularity'}
      ],
      dropdownOpen: false,
      dropdownValue: 'Sorting'
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue(e) {
    this.setState({
      dropdownValue: e.target.innerText
    });
    this.props.sortBy(e.target.value);
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu>
        {this.state.actions.map(action =>
           (<DropdownItem key={action.key} onClick={e => this.changeValue(e)} value={action.key}>{action.value}</DropdownItem>)
        )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
