import React, { Component } from 'react';
import _ from 'lodash';
import './container.scss';
import Keyboard from "../keyboard/Keyboard";
import SearchedWord from "../searchedWord/SearchedWord";
import Buzzer from "../buzzer/Buzzer";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      initKeyboard: [
        {
          letter: 'A',
          activated: false,
          class: 'default'
        },
        {
          letter: 'Z',
          activated: false,
          class: 'default'
        },
        {
          letter: 'E',
          activated: false,
          class: 'default'
        },
        {
          letter: 'R',
          activated: false,
          class: 'default'
        },
        {
          letter: 'T',
          activated: false,
          class: 'default'
        },
        {
          letter: 'Y',
          activated: false,
          class: 'default'
        },
        {
          letter: 'U',
          activated: false,
          class: 'default'
        },
        {
          letter: 'I',
          activated: false,
          class: 'default'
        },
        {
          letter: 'O',
          activated: false,
          class: 'default'
        },
        {
          letter: 'P',
          activated: false,
          class: 'default'
        },
        {
          letter: 'Q',
          activated: false,
          class: 'default'
        },
        {
          letter: 'S',
          activated: false,
          class: 'default'
        },
        {
          letter: 'D',
          activated: false,
          class: 'default'
        },
        {
          letter: 'F',
          activated: false,
          class: 'default'
        },
        {
          letter: 'G',
          activated: false,
          class: 'default'
        },
        {
          letter: 'H',
          activated: false,
          class: 'default'
        },
        {
          letter: 'J',
          activated: false,
          class: 'default'
        },
        {
          letter: 'K',
          activated: false,
          class: 'default'
        },
        {
          letter: 'L',
          activated: false,
          class: 'default'
        },
        {
          letter: 'M',
          activated: false,
          class: 'default'
        },
        {
          letter: 'W',
          activated: false,
          class: 'default'
        },
        {
          letter: 'X',
          activated: false,
          class: 'default'
        },
        {
          letter: 'C',
          activated: false,
          class: 'default'
        },
        {
          letter: 'V',
          activated: false,
          class: 'default'
        },
        {
          letter: 'B',
          activated: false,
          class: 'default'
        },
        {
          letter: 'N',
          activated: false,
          class: 'default'
        }
      ],
      keyboard: [
        {
          letter: 'A',
          activated: false,
          class: 'default'
        },
        {
          letter: 'Z',
          activated: false,
          class: 'default'
        },
        {
          letter: 'E',
          activated: false,
          class: 'default'
        },
        {
          letter: 'R',
          activated: false,
          class: 'default'
        },
        {
          letter: 'T',
          activated: false,
          class: 'default'
        },
        {
          letter: 'Y',
          activated: false,
          class: 'default'
        },
        {
          letter: 'U',
          activated: false,
          class: 'default'
        },
        {
          letter: 'I',
          activated: false,
          class: 'default'
        },
        {
          letter: 'O',
          activated: false,
          class: 'default'
        },
        {
          letter: 'P',
          activated: false,
          class: 'default'
        },
        {
          letter: 'Q',
          activated: false,
          class: 'default'
        },
        {
          letter: 'S',
          activated: false,
          class: 'default'
        },
        {
          letter: 'D',
          activated: false,
          class: 'default'
        },
        {
          letter: 'F',
          activated: false,
          class: 'default'
        },
        {
          letter: 'G',
          activated: false,
          class: 'default'
        },
        {
          letter: 'H',
          activated: false,
          class: 'default'
        },
        {
          letter: 'J',
          activated: false,
          class: 'default'
        },
        {
          letter: 'K',
          activated: false,
          class: 'default'
        },
        {
          letter: 'L',
          activated: false,
          class: 'default'
        },
        {
          letter: 'M',
          activated: false,
          class: 'default'
        },
        {
          letter: 'W',
          activated: false,
          class: 'default'
        },
        {
          letter: 'X',
          activated: false,
          class: 'default'
        },
        {
          letter: 'C',
          activated: false,
          class: 'default'
        },
        {
          letter: 'V',
          activated: false,
          class: 'default'
        },
        {
          letter: 'B',
          activated: false,
          class: 'default'
        },
        {
          letter: 'N',
          activated: false,
          class: 'default'
        }
      ],
      winStrike: 0,
      loseStrike: 0,
      currentWord: null,
      openDialog: false,
      endGameTitle: '',
      endGameContent: ''
    };
    this.handleKeyboardTrigger = this.handleKeyboardTrigger.bind(this);
    this.gameWin = this.gameWin.bind(this);
    this.gameLose = this.gameLose.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.generateBuzzer = this.generateBuzzer.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.initAnimation = this.initAnimation.bind(this);
  }

  componentDidMount() {
    const response = [
      {
        word: 'Big Data',
        image: ''
      },
      {
        word: 'Flutter',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/flutter.png'
      },
      {
        word: 'Serverless',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/serverless.png'
      },
      {
        word: 'Angular',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/angular.png'
      },
      {
        word: 'VueJs',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/vuejs.png'
      },
      {
        word: 'React',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/react.png'
      },
      {
        word: 'Hadoop',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/hadoop.png'
      },
      {
        word: 'Google Cloud',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/google_cloud.png'
      },
      {
        word: 'AWS',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/aws.png'
      },
      {
        word: 'Azure',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/azure.png'
      },
      {
        word: 'Data Science'
      },
      {
        word: 'Artificial Intelligence'
      },
      {
        word: 'Agility'
      },
      {
        word: 'Kubernetes',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/kubernetes.png'
      },
      {
        word: 'Spark',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/spark.png'
      },
      {
        word: 'Gitlab',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/gitlab.png'
      },
      {
        word: 'Spring Boot',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/spring_boot.png'
      },
      {
        word: 'Kotlin',
        image:
          'https://technical-exercice-stack-labs.s3.eu-west-3.amazonaws.com/hangman/technos/img/kotlin.png'
      }
    ];
    const wordList = _.map(response, item => ({
      ...item,
      word: item.word.toUpperCase(),
      letters: _.map(item.word.toUpperCase().split(''), letter => ({
        letter,
        isActive: letter === ' '
      }))
    }));
    this.setState({ wordList, currentWord: wordList[1] });

    this.initAnimation();
  }

  handleKeyboardTrigger(key) {
    const { currentWord, loseStrike, keyboard } = this.state;
    let keyClass = 'default';
    if (!key.activated) {
      const inputError = typeof _.find(currentWord.letters, {letter: key.letter}) === 'undefined';
      if (inputError && loseStrike === 5) {
        this.gameLose();
      } else {
        // Assign error or success class to keyboard
        keyClass = inputError ? 'error' : 'success';
        const keyboardUpdated = _.map(keyboard, keyboardKey => {
          if (keyboardKey.letter === key.letter) {
            return {
              letter: key.letter,
              class: keyClass,
              activated: true
            }
          }
          return keyboardKey;
        })
        this.setState({keyboard: keyboardUpdated});
        if (inputError) {
          this.setState({ loseStrike: loseStrike + 1 });
        } else {
          const currentWordUpdated = _.assign({}, currentWord);
          currentWordUpdated.letters = _.map(currentWord.letters, letter => {
            if (letter.letter === key.letter) {
              return {
                ...letter,
                isActive: true
              }
            }
            return letter;
          });
          this.setState({
            currentWord: currentWordUpdated
          }, () => {
            if (typeof _.countBy(currentWordUpdated.letters, 'isActive').false === 'undefined') {
              this.gameWin();
            }
          });
          // display letter
        }
      }
    } else {
      // tu as déja cliquer sur cette lettre      
    }
  }

  gameWin() {
    const { currentWord, wordList } = this.state;
    const wordListUpdate = _.reject(wordList, { word: currentWord.word });
    this.setState({
      wordList: wordListUpdate,
      openDialog: true,
      endGameTitle: 'Bravo tu a gagné',
      endGameContent: `Le mot était effectivement ${currentWord.word}`
    });
  }

  gameLose() {
    const { currentWord } = this.state;
    this.setState({
      openDialog: true,
      endGameTitle: 'Dommage ce sera pour une prochaine fois',
      endGameContent: `Le mot était ${currentWord.word}`
    });
  }

  restartGame() {
    const { wordList,initKeyboard } = this.state;
    this.setState({
      currentWord: wordList[_.random(0, wordList.length -1)],
      loseStrike: 0,
      winStrike: 0,
      keyboard: initKeyboard,
      openDialog: false
    });
  }

  generateBuzzer() {
    const { loseStrike } = this.state;
    const buzzerArray = []
    for (let i = 0; i < 6; i++) {
      buzzerArray.push(<Buzzer isActive={i< loseStrike} key={`buzzer-key-${i}`} />);
    }
    return buzzerArray;
  }

  handleCloseDialog() {
    this.setState({ openDialog: false });
  }

  initAnimation() {
    const bouncerElem = document.getElementById('bouncer').classList;
    const travelerElem = document.getElementById('traveler').classList;
    bouncerElem.add('move');
    setTimeout(() => {
      bouncerElem.remove('move');
      travelerElem.add('iddle');
      bouncerElem.add('iddle');
    }, 3500);
  }

  render() {
    const {
      keyboard,
      winStrike,
      currentWord,
      openDialog,
      endGameTitle,
      endGameContent
    } = this.state;
    const buzzerArray = this.generateBuzzer();
    return (
      <div>
        <div className="animation">
          <div id="stage">
            <div id="traveler">
              <div id="bouncer" />
            </div>
          </div>
        </div>
        {/* <h1>Qui veut perdre sa tête</h1>
        <Button onClick={this.restartGame} variant="contained" color="primary">
          Recommencer
        </Button>
        {currentWord !== null &&(
          <Dialog
          open={openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="end-game-status"
          >
            <DialogTitle id="end-game-status">
            {endGameTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <React.Fragment>
                  {endGameContent}
                  {typeof currentWord.image !== 'undefined' && currentWord.image !== "" && (
                    <img className="dialog-image" src={currentWord.image} alt="word" />
                  )}
                </React.Fragment>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                Fermer
              </Button>
              <Button onClick={this.restartGame} color="primary">
                Nouvelle partie
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <h3>{winStrike}</h3>
        <div className="buzzer-container">
          {buzzerArray}
        </div>
        {currentWord !== null &&(
          <SearchedWord letters={currentWord.letters} />
        )}
        <Keyboard keyboard={keyboard} handleKeyboardTrigger={this.handleKeyboardTrigger}/> */}
      </div>
    );
  }
}
