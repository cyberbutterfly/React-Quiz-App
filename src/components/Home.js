import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import QuizApp from '../containers/QuizApp';
import 'react-dropdown/style.css'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountOptions: [
				"5", "10", "15", "20"
			],
      selectedAmountOption: "5",

      typeOptions: [
				"boolean", "multiple"
			],
      selectedTypeOption: "boolean",

      difficultyOptions: [
				"easy", "medium", "hard"
			],
      selectedDifficultyOption: "easy",

      quizStarted: false
    };
  }

  beginQuiz = () => {
    this.setState({
      quizStarted: true
    });
  };

  onAmountChange = (value) => {
    this.setState({
      selectedAmountOption: value.value
    });
	};

  onTypeChange = (value) => {
    this.setState({
      selectedTypeOption: value.value
    });
	};

  onDifficultyChange = (value) => {
    this.setState({
      selectedDifficultyOption: value.value
    });
	};

  render() {
    return(
      <div className="wrapper">
        { this.state.quizStarted ? (
            <QuizApp
              amount={parseInt(this.state.selectedAmountOption)}
              difficulty={this.state.selectedDifficultyOption}
              type={this.state.selectedTypeOption} />
          ) : (
            <div className="home-container">
              <h2>Welcome to the Trivia Challenge</h2>
              { this.state.selectedTypeOption === "boolean" ? (
                  <div className="quiz-brief">You will be presented with {this.state.selectedAmountOption} True or False questions</div>
                ) : (
                  <div className="quiz-brief">You will be presented with {this.state.selectedAmountOption} Multiple questions</div>
                )
              }
              <div className="dropdown" >
                <label>Amount: </label>
                <Dropdown
                  onChange={this.onAmountChange}
                  options={this.state.amountOptions}
                  value={this.state.selectedAmountOption} />
              </div>
              <div className="dropdown" >
                <label>Type: </label>
                <Dropdown
                  onChange={this.onTypeChange}
                  options={this.state.typeOptions}
                  value={this.state.selectedTypeOption} />
              </div>
              <div className="dropdown" >
                <label>Level: </label>
                <Dropdown
                  onChange={this.onDifficutyChange}
                  options={this.state.difficultyOptions}
                  value={this.state.selectedDifficultyOption} />
              </div>
              <div className="can_you_score">Can you score 100%?</div>
              <a onClick={this.beginQuiz}>BEGIN</a>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
