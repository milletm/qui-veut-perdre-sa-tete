import React, { Component } from 'react';
import _ from 'lodash';
import './container.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Keyboard from "../keyboard/Keyboard";
import SearchedWord from "../searchedWord/SearchedWord";
import Buzzer from "../buzzer/Buzzer";

export default class Container extends Component {
  static initAnimation() {
    const bouncerElem = document.getElementById('bouncer').classList;
    const travelerElem = document.getElementById('traveler').classList;
    bouncerElem.add('move');
    setTimeout(() => {
      bouncerElem.remove('move');
      travelerElem.add('position-center');
      //bouncerElem.add('iddle');
    }, 3500);
  }

  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
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
      dialogs: {
        win: [
          {
            text: 'C\'est très bien continu comme ça ',
            active: false,
            winStrike: 1
          },
          {
            text: 'Encore trouvé tu ne serais pas en train de tricher par hasard',
            active: false,
            winStrike: 2
          },
          {
            text: 'Bon ça suffit ferme moi ce débuggeur',
            active: false,
            winStrike: 3
          }
        ],
        lose: [
          {
            text: 'Ça peut arriver à tout le monde j’ai confiance en toi',
            active: false,
            loseStrike: 1
          },
          {
            text: 'Attention ça fait deux erreurs d`\'affilée',
            active: false,
            loseStrike: 2
          },
          {
            text: 'Ah mince j’ai dû oublier de te dire les règles... le but du jeu est de trouver un mot, ne pas saisir des lettres au hasard',
            active: false,
            loseStrike: 3
          }
        ],
        winAfterLose: {
          text: 'Ah ben tu vois quand tu veux',
          active: false
        },
        loseAfterWin: {
          text: 'Huuum laisse-moi regarder... non pas cette fois',
          active: false
        },
        lastChance: {
          text: 'Bon je ne voudrais te stresser ou quoi que ce soit mais il ne te reste qu\'une chance',
          active: false
        }
      },
      currentDialog:'',
      winStrike: 0,
      loseStrike: 0,
      inputFailed: 0,
      currentWord: null,
      openPopup: false,
      endGameTitle: '',
      endGameContent: ''
    };
    this.handleKeyboardTrigger = this.handleKeyboardTrigger.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.generateBuzzer = this.generateBuzzer.bind(this);
    this.displayDialog = this.displayDialog.bind(this); 
    this.handleUpdateKeyboard = this.handleUpdateKeyboard.bind(this); 
    this.handleUpdateSearchedWord = this.handleUpdateSearchedWord.bind(this);
    this.displayFinalPopup = this.displayFinalPopup.bind(this); 
  }

  componentDidMount() {
    Container.initAnimation();

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
    this.setState({ wordList, currentWord: wordList[_.random(0, wordList.length - 1)] });

  }

  handleKeyboardTrigger(key) {
    const { currentWord, inputFailed } = this.state;
    if (!key.activated) {
      const inputError = typeof _.find(currentWord.letters, { letter: key.letter }) === 'undefined';
      // test if game is lost
      if (inputError && inputFailed === 5) {
        this.displayFinalPopup('lose');
      } else {
        this.handleUpdateKeyboard(inputError, key);
        this.handleUpdateSearchedWord(inputError, key);
      }
    } else {
      // tu as déja cliquer sur cette lettre      
    }
  }

  handleUpdateKeyboard (inputError, key) {
    const { keyboard } = this.state;
    const keyClass = inputError ? 'error' : 'success';
    const keyboardUpdated = _.map(keyboard, keyboardKey => {
      if (keyboardKey.letter === key.letter) {
        return {
          letter: key.letter,
          class: keyClass,
          activated: true
        }
      }
      return keyboardKey;
    });
    this.setState({keyboard: keyboardUpdated});
  }

  handleUpdateSearchedWord (inputError, key) {
    const { currentWord } = this.state;
    if (inputError) {
      this.setState(prevState => (
        {
          inputFailed: prevState.inputFailed + 1
        }
      ),() => this.displayDialog(inputError));
    } else {
      const currentWordUpdated = _.assign({}, currentWord);
      currentWordUpdated.letters = _.map(currentWord.letters, item => {
        if (item.letter === key.letter) {
          return {
            ...item,
            isActive: true
          }
        }
        return item;
      });
      this.setState({
        currentWord: currentWordUpdated
      }, () => {
        if (typeof _.countBy(currentWordUpdated.letters, 'isActive').false === 'undefined') {
          this.displayFinalPopup('win');
        } else {
          this.displayDialog(inputError);
        }
      });
    }
  }

  displayFinalPopup(type) {
    const { currentWord, wordList } = this.state;
    if (type === 'win') {
      const wordListUpdate = _.reject(wordList, { word: currentWord.word });
      this.setState({
        wordList: wordListUpdate
      });
    }
    this.setState({
      openPopup: true,
      endGameTitle: type === 'win' ? 'Bravo tu as gagné' : 'Désolé ça sera pour une prochaine fois',
      endGameContent: type === 'win' ? `Le mot était effectivement ${currentWord.word}` : `Le mot que tu devais trouver était ${currentWord.word}`
    });  
  }

  restartGame() {
    const { wordList } = this.state;
    this.setState({
      currentWord: wordList[_.random(0, wordList.length -1)],
      inputFailed: 0,
      winStrike: 0,
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
      dialogs: {
        win: [
          {
            text: 'C\'est très bien continu comme ça ',
            active: false,
            winStrike: 1
          },
          {
            text: 'Encore trouvé tu ne serais pas en train de tricher par hasard',
            active: false,
            winStrike: 2
          },
          {
            text: 'Bon ça suffit ferme moi ce débuggeur',
            active: false,
            winStrike: 3
          }
        ],
        lose: [
          {
            text: 'Ça peut arriver à tout le monde j’ai confiance en toi',
            active: false,
            loseStrike: 1
          },
          {
            text: 'Attention ça fait deux erreurs d`\'affilée',
            active: false,
            loseStrike: 2
          },
          {
            text: 'Ah mince j’ai dû oublier de te dire les règles... le but du jeu est de trouver un mot, ne pas saisir des lettres au hasard',
            active: false,
            loseStrike: 3
          }
        ],
        winAfterLose: {
          text: 'Ah ben tu vois quand tu veux',
          active: false
        },
        loseAfterWin: {
          text: 'Huuum laisse-moi regarder... non pas cette fois',
          active: false
        },
        lastChance: {
          text: 'Bon je ne voudrais te stresser ou quoi que ce soit mais il ne te reste qu\'une chance',
          active: false
        }
      },
      openPopup: false,
      currentDialog: ''
    });
  }

  generateBuzzer() {
    const { inputFailed } = this.state;
    const buzzerArray = []
    for (let i = 0; i < 6; i+=1) {
      buzzerArray.push(<Buzzer isActive={i< inputFailed} key={`buzzer-key-${i}`} />);
    }
    return buzzerArray;
  }

  displayDialog(inputError) {
    const { dialogs, winStrike, loseStrike, inputFailed } = this.state;
    const dialogsUpdated = _.assign({}, dialogs);
    const winStrikeUpdated = inputError ? 0 : winStrike +1;
    const loseStrikeUpdated = inputError ? loseStrike +1 : 0;
    let currentDialog = '';
    this.setState({ currentDialog }, () => {
      if (inputError) {
        if (inputFailed === 5 && !dialogsUpdated.lastChance.active) {
          currentDialog = dialogsUpdated.lastChance.text;
          dialogsUpdated.lastChance.active = true;
        } else {
          const loseDialog = dialogsUpdated.lose[loseStrike];
          if (loseStrike === 0 && winStrike !== 0 && !dialogsUpdated.loseAfterWin.active) {
            currentDialog = dialogsUpdated.loseAfterWin.text;
            dialogsUpdated.loseAfterWin.active = true;
          } else if (typeof loseDialog !== 'undefined' &&  !loseDialog.active) {
            dialogsUpdated.lose[loseStrike].active = true;
            currentDialog = loseDialog.text;
          }
        }
      } else {
        const winDialog = dialogsUpdated.win[winStrike];
        if (winStrike === 0 && loseStrike !== 0 && !dialogsUpdated.winAfterLose.active) {
          currentDialog = dialogsUpdated.winAfterLose.text;
          dialogsUpdated.winAfterLose.active = true;
        } else if (typeof winDialog !== 'undefined' && !winDialog.active) {
          dialogsUpdated.win[winStrike].active = true;
          currentDialog = winDialog.text;
        }
      }
      this.setState({
        currentDialog,
        dialogs: dialogsUpdated,
        winStrike: winStrikeUpdated,
        loseStrike: loseStrikeUpdated
      }, () => {
        const dialogBox = document.getElementsByClassName('game-dialog')[0];
        if (currentDialog !== '') {
          dialogBox.classList.add('open');
        }
      });
    });
  }

  render() {
    const {
      keyboard,
      currentWord,
      openPopup,
      endGameTitle,
      endGameContent,
      currentDialog
    } = this.state;
    const buzzerArray = this.generateBuzzer();
    return (
      <div>
        <h1 className="game-title">Qui veut perdre sa tête</h1>
        <Button onClick={this.restartGame} variant="contained" color="primary" className="restart-game-button">
            Recommencer
          </Button>

        <div className="animation">
          <div id="stage">
            <div id="traveler">
              <div id="bouncer" />
            </div>
          </div>
          {currentDialog !== "" && (
            <div className="game-dialog">{currentDialog}</div>
          )}
        </div>
        {currentWord !== null &&(
          <Dialog
            open={openPopup}
            onClose={this.restartGame}
            aria-labelledby="end-game-status"
          >
            <DialogTitle id="end-game-status">
            {endGameTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <>
                  {endGameContent}
                  {typeof currentWord.image !== 'undefined' && currentWord.image !== "" && (
                    <img className="dialog-image" src={currentWord.image} alt="word"
                      onError={() => {
                        document.getElementsByClassName('dialog-image')[0].classList.add('hide');
                    }} />
                  )}
                </>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.restartGame} color="primary">
                Nouvelle partie
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <div className="buzzer-container">
          {buzzerArray}
        </div>
        {currentWord !== null &&(
          <SearchedWord letters={currentWord.letters} />
        )}
        <Keyboard keyboard={keyboard} handleKeyboardTrigger={this.handleKeyboardTrigger}/>
      </div>
    );
  }
}
