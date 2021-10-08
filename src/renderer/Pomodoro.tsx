import React, { Component } from 'react';

export interface PomodoroState {
  studyTime: number;
  breakTime: number;
  time: number;
  playingStatus: boolean;
  pomodoroStatus: string;
}

class Pomodoro extends Component<{}, PomodoroState> {
  private timerId: any;

  constructor({}) {
    super({});
    this.state = {
      studyTime: 25,
      breakTime: 15,
      time: 25 * 60,
      playingStatus: false,
      pomodoroStatus: 'work',
    };
    this.formatTime = this.formatTime.bind(this);
    this.timer = this.timer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setWorkTime = this.setWorkTime.bind(this);
    this.setBreakTime = this.setBreakTime.bind(this);


  }

  timer() {
    let time = this.state.time;
    if (time === 0) {
      this.setState({ playingStatus: false})
    } else {
      this.setState({playingStatus: true});
      this.timerId = setInterval(() => {
        this.setState({time: this.state.time - 1});
        if(this.state.time == 0) clearInterval(this.timerId);

    }, 1000);
    }
  }

  startTimer(time: number) {
    this.setState({time: time}, () => this.timer());
  }

  stopTimer() {
    this.setState({playingStatus: false});
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }


  formatTime(seconds:number): string{
    let m: number = Math.floor(seconds % 3600 / 60);
    let s: number = Math.floor(seconds % 3600 % 60);

    return m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');
  }

  toggle(){
    let playingStatus = this.state.playingStatus;
    if (playingStatus === true) {
      this.stopTimer();
    } else {
      this.startTimer(this.state.time);
    }
  }

  setWorkTime(){
    this.stopTimer();
    this.setState({time: this.state.studyTime*60});
  }

  setBreakTime(){
    this.stopTimer();
    this.setState({time: this.state.breakTime*60});
  }

  render() {
    return (
      <div>
        <button onClick={this.setWorkTime}>Study</button>
        <button onClick={this.setBreakTime}>Break</button>
        <div className="time">
          <a>{this.formatTime(this.state.time)}</a>
        </div>
        <button onClick={this.toggle}>{this.state.playingStatus==true ? 'Stop' : 'Play'}</button>
      </div>
    );
  }
}

export default Pomodoro;
