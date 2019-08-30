import React, { Component } from 'react';

import Room from './components/Room';
import classes from './App.module.css';

class App extends Component {
  state = {
    rooms: [false, false, false]
  };

  componentDidMount() {
    let dataTwoString = sessionStorage.getItem('room 2');
    let dataThreeString = sessionStorage.getItem('room 3');
    let dataFourString = sessionStorage.getItem('room 4');

    let dataTwo = JSON.parse(dataTwoString);
    let dataThree = JSON.parse(dataThreeString);
    let dataFour = JSON.parse(dataFourString);

    this.setState({
      rooms: [
        dataTwo && (dataTwo.adults !== '' || dataTwo.children),
        dataThree && (dataThree.adults !== '' || dataThree.children),
        dataFour && (dataFour.adults !== '' || dataFour.children)
      ]
    });
  }

  childRefOne = React.createRef();
  childRefTwo = React.createRef();
  childRefThree = React.createRef();

  onRoomCheck = number => {
    let updatedRooms = this.state.rooms.slice();
    for (let i = 0; i < parseInt(number) - 1; i++) {
      updatedRooms[i] = true;
    }
    this.setState({
      rooms: updatedRooms
    });
  };

  onRoomUncheck = number => {
    let updatedRooms = this.state.rooms.slice().reverse();
    for (let i = 0; i <= updatedRooms.length - parseInt(number) + 1; i++) {
      updatedRooms[i] = false;
    }

    this.setState({
      rooms: updatedRooms.reverse()
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.childRefOne.current.onDataSubmitted();
    this.childRefTwo.current.onDataSubmitted();
    this.childRefThree.current.onDataSubmitted();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <div className={classes.Presentations}>
            <Room number={'1'} />
            <Room
              number={'2'}
              checked={this.state.rooms[0]}
              roomChecked={this.onRoomCheck}
              roomUnchecked={this.onRoomUncheck}
              ref={this.childRefOne}
            />
            <Room
              number={'3'}
              checked={this.state.rooms[1]}
              roomChecked={this.onRoomCheck}
              roomUnchecked={this.onRoomUncheck}
              ref={this.childRefTwo}
            />
            <Room
              number={'4'}
              checked={this.state.rooms[2]}
              roomChecked={this.onRoomCheck}
              roomUnchecked={this.onRoomUncheck}
              ref={this.childRefThree}
            />
          </div>
          <button type='submit' className={classes.Submit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
