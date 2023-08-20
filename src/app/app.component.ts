import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenuLevels: boolean = false;
  showModal: boolean = false;

  isGameStarting: boolean = false;

  selectedLevel: string = 'debutant';
  urlImageRule: string = './assets/image-rules.svg';
  urlImageLogo: string = './assets/logo.svg';

  windowSize!: number;

  choicesDebutant: Array<string> = ['rock', 'paper', 'scissors'];
  choicesLegend: Array<string> = [
    'rock',
    'paper',
    'scissors',
    'lizard',
    'spock'
  ];
  choices!: Array<string>;

  playerChoice!: string;
  computerChoice!: string;
  imgUrlCPlayerChoice!: string;
  imgUrlComputerChoice!: string;

  messageResult!: string;
  score!: number;
  isLoading: boolean = false;

  ngOnInit() {
    this.windowSize = window.innerWidth;
    this.getWindowSize();
    this.choices = this.choicesDebutant;
    this.initializeScore();
  }

  initializeScore() {
    localStorage.setItem('scoreRockPaperScissors', '0');
    this.score = +JSON.parse(
      localStorage.getItem('scoreRockPaperScissors') || '0'
    );
  }

  getWindowSize() {
    window.addEventListener('resize', () => {
      this.windowSize = window.innerWidth;
    });
  }

  computerPlay() {
    // Afficher l'animation de chargement
    this.isLoading = !this.isLoading;
    setTimeout(() => {
      this.isLoading = !this.isLoading;
      const randomIndex = Math.floor(Math.random() * this.choices.length);
      this.computerChoice = this.choices[randomIndex];
    }, 2000);

    // Attendre 2 seconde avant de cacher l'animation et de retourner le choix de l'ordinateur
  }

  playerPlay(choix: string) {
    this.isGameStarting = !this.isGameStarting;
    this.playerChoice = choix;
    this.imgUrlCPlayerChoice = `./assets/icon-${this.playerChoice}.svg`;

    this.computerPlay();

    setTimeout(() => {
      this.playRound();
      this.imgUrlComputerChoice = `./assets/icon-${this.computerChoice}.svg`;
    }, 2000);
  }

  playAgain() {
    this.isGameStarting = !this.isGameStarting;
  }

  playRound() {
    const playerSelection = this.playerChoice;
    const computerSelection = this.computerChoice;

    if (playerSelection === computerSelection) {
      this.messageResult = 'Tie';
    } else if (
      (playerSelection === 'rock' &&
        (computerSelection === 'scissors' || computerSelection === 'lizard')) ||
      (playerSelection === 'paper' &&
        (computerSelection === 'rock' || computerSelection === 'spock')) ||
      (playerSelection === 'scissors' &&
        (computerSelection === 'paper' || computerSelection === 'lizard')) ||
      (playerSelection === 'lizard' &&
        (computerSelection === 'paper' || computerSelection === 'spock')) ||
      (playerSelection === 'spock' &&
        (computerSelection === 'rock' || computerSelection === 'scissors'))
    ) {
      this.messageResult = 'You win';
      this.score = this.score + 1;
      localStorage.setItem('scoreRockPaperScissors', `${this.score}`);
    } else {
      this.messageResult = 'You lose';
      this.score = this.score - 1;
      localStorage.setItem('scoreRockPaperScissors', `${this.score}`);
    }
  }

  handleToggleMenuLevels() {
    this.showMenuLevels = !this.showMenuLevels;
  }

  handleToggleModal() {
    this.showModal = !this.showModal;
  }

  hndleSelectedLevel(level: string) {
    this.selectedLevel = level;
    if (this.selectedLevel === 'debutant') {
      this.urlImageRule = './assets/image-rules.svg';
      this.urlImageLogo = './assets/logo.svg';
      this.choices = this.choicesDebutant;
    } else {
      this.urlImageRule = './assets/image-rules-bonus.svg';
      this.urlImageLogo = './assets/logo-bonus.svg';
      this.choices = this.choicesLegend;
    }
    this.showMenuLevels = !this.showMenuLevels;
  }
}
