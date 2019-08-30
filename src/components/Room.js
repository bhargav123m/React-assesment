import React, { Component } from 'react';

import classes from './Room.module.css';

class Room extends Component {
  state = {
    enabled: false,
    adults: '',
    children: ''
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      enabled: props.checked
    };
  }

  componentDidMount() {
    let dataString = sessionStorage.getItem(`room ${this.props.number}`);
    let data = JSON.parse(dataString);
    if (data && (data.adults !== '' || data.children !== '')) {
      this.setState({
        enabled: true,
        adults: data.adults,
        children: data.children
      });
    }
  }

  onCheckboxChangeHandler = () => {
    this.setState({
      enabled: !this.state.enabled
    });
    if (!this.state.enabled) {
      this.props.roomChecked(this.props.number);
    } else {
      this.props.roomUnchecked(this.props.number);
      this.setState({
        adults: '',
        children: ''
      });
    }
  };

  onInputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onDataSubmitted = () => {
    if (
      this.state.enabled &&
      (this.state.adults === '' && this.state.children === '')
    ) {
      this.setState(
        {
          adults: 1,
          children: 0
        },
        () => {
          let data = {
            adults: this.state.adults,
            children: this.state.children
          };
          sessionStorage.setItem(
            `room ${this.props.number}`,
            JSON.stringify(data)
          );
        }
      );
    } else {
      let data = {
        adults: this.state.adults,
        children: this.state.children
      };
      sessionStorage.setItem(`room ${this.props.number}`, JSON.stringify(data));
    }
  };

  render() {
    let styles = classes.Room;
    if (this.state.enabled) {
      styles = classes.RoomSelected;
    }
    return (
      <div className={styles}>
        <div className={classes.Header}>
          {this.props.number === '1' ? null : (
            <input
              type='checkbox'
              onChange={this.onCheckboxChangeHandler}
              checked={this.state.enabled}
            />
          )}{' '}
          Room {this.props.number}
        </div>
        <div className={classes.Body}>
          <div className={classes.Content}>
            <p>Adults</p>
            <p>(18+)</p>
            <input
              type='number'
              min='1'
              max='2'
              value={this.state.adults}
              name='adults'
              onChange={this.onInputChangeHandler}
              placeholder='1'
              disabled={!this.state.enabled}
            />
          </div>
          <div className={classes.Content}>
            <p>Children</p>
            <p>(0-17)</p>
            <input
              type='number'
              min='0'
              max='2'
              value={this.state.children}
              name='children'
              onChange={this.onInputChangeHandler}
              placeholder='0'
              disabled={!this.state.enabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
