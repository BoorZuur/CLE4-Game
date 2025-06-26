export class UIManager {
    constructor(levelInstance) {
        this.levelInstance = levelInstance;
        this.gameUI = document.querySelector('.game-ui');
        this.levelElement = document.querySelector('.LevelName');
        this.collectibleElement1 = document.querySelector('.Collectible1');
        this.collectibleElement2 = document.querySelector('.Collectible2');
        this.collectibleElement3 = document.querySelector('.Collectible3');
        this.keyElement = document.querySelector('.UIKey');
        this.LevelUI = document.querySelector('.TopUI');
        this.levelCutOff = document.querySelector('.LevelCutOff');
        this.LevelCompletedUI = document.querySelector('.LevelCompletedUI');
        this.completedCollectible1 = document.querySelector('.CompletedCollectible1');
        this.completedCollectible2 = document.querySelector('.CompletedCollectible2');
        this.completedCollectible3 = document.querySelector('.CompletedCollectible3');
        this.TutorialUI = document.querySelector('.TutorialUI');
        this.nextLevelButton = document.querySelector('#NextLevelButton');
        this.currentLevel = 1
        this.TutorialUIOpened = false;
        this.nextScreen = '';
        this.nextButtonWelcome = document.querySelector('#NextButtonWelcome');
        this.WelcomeUI = document.querySelector('.Welcome');
        this.ControlsUI = document.querySelector('.Controls');
        this.nextButtonControls = document.querySelector('#NextButtonControls');
        this.nextButtonMechanics = document.querySelector('#NextButtonMechanics');
        this.MechanicsUI = document.querySelector('.Level1Mechanics');
        this.goalUI = document.querySelector('.goal');
        this.nextButtonGoal = document.querySelector('#NextButtonGoal');
        this.Level2Mechanics = document.querySelector('.Level2Mechanics');
        this.nextButtonLevel2Mechanics = document.querySelector('#NextButtonLevel2Mechanics');
        this.Level2Mechanics2 = document.querySelector('.Level2Mechanics2');
        this.nextButtonLevel2Mechanics2 = document.querySelector('#NextButtonLevel2Mechanics2');
        this.Level3Mechanics = document.querySelector('.Level3Mechanics');
        this.nextButtonLevel3Mechanics = document.querySelector('#NextButtonLevel3Mechanics');
        this.RestartGameButton = document.querySelector('#RestartGameButton');
        this.GameCompletedUI = document.querySelector('.GameCompleted');

        // Remove any existing event listeners before adding new ones
        if (this.RestartGameButton) {
            this.RestartGameButton.removeEventListener('click', this.RestartGameButtonPressed);
            this.RestartGameButton.addEventListener('click', (event) => this.RestartGameButtonPressed(event));
        }

        if (this.nextLevelButton) {
            // Remove any existing event listeners
            this.nextLevelButton.removeEventListener('click', this.nextLevelButtonPressed);
            this.nextLevelButton.addEventListener('click', (event) => this.nextLevelButtonPressed(event));
        }

        if (this.nextButtonWelcome) {
            this.nextButtonWelcome.removeEventListener('click', this.WelcomeButtonPressed);
            this.nextButtonWelcome.addEventListener('click', (event) => this.WelcomeButtonPressed(event));
        }

        if (this.nextButtonControls) {
            this.nextButtonControls.removeEventListener('click', this.ControlsButtonPressed);
            this.nextButtonControls.addEventListener('click', (event) => this.ControlsButtonPressed(event));
        }

        if (this.nextButtonMechanics) {
            this.nextButtonMechanics.removeEventListener('click', this.MechanicsButtonPressed);
            this.nextButtonMechanics.addEventListener('click', (event) => this.MechanicsButtonPressed(event));
        }

        if (this.nextButtonGoal) {
            this.nextButtonGoal.removeEventListener('click', this.GoalButtonPressed);
            this.nextButtonGoal.addEventListener('click', (event) => this.GoalButtonPressed(event));
        }

        if (this.nextButtonLevel2Mechanics) {
            this.nextButtonLevel2Mechanics.removeEventListener('click', this.Level2MechanicsButtonPressed);
            this.nextButtonLevel2Mechanics.addEventListener('click', (event) => this.Level2MechanicsButtonPressed(event));
        }

        if (this.nextButtonLevel2Mechanics2) {
            this.nextButtonLevel2Mechanics2.removeEventListener('click', this.Level2Mechanics2ButtonPressed);
            this.nextButtonLevel2Mechanics2.addEventListener('click', (event) => this.Level2Mechanics2ButtonPressed(event));
        }

        if (this.nextButtonLevel3Mechanics) {
            this.nextButtonLevel3Mechanics.removeEventListener('click', this.Level3MechanicsButtonPressed);
            this.nextButtonLevel3Mechanics.addEventListener('click', (event) => this.Level3MechanicsButtonPressed(event));
        }

        this.levelCutOff.style.display = 'none';

        // Hide UI by default
        this.hide();
        this.LevelCompletedUI.style.display = 'none';
    }

    show() {
        if (this.gameUI) {
            this.gameUI.style.display = 'block';
        }
    }

    hide() {
        if (this.gameUI) {
            this.gameUI.style.display = 'none';
        }
    }

    updateLevel(levelName) {
        if (this.levelElement) {
            this.levelElement.textContent = `${levelName}`;
        }
    }
    showTutorialUI() {
        this.TutorialUIOpened = true;
        this.TutorialUI.style.display = 'block';
        if (this.currentLevel >= 2) {
            this.WelcomeUI.style.display = 'none';
        }
        if (this.currentLevel == 2) {
            this.WelcomeUI.style.display = 'none';
            this.Level2Mechanics.style.display = 'block';
        }
        if (this.currentLevel == 3) {
            this.WelcomeUI.style.display = 'none';
            this.Level3Mechanics.style.display = 'block';
        }

    }

    WelcomeButtonPressed() {
        this.WelcomeUI.style.display = 'none';
        this.ControlsUI.style.display = 'block';
        this.nextScreen = 'Controls';
    }

    ControlsButtonPressed() {
        this.ControlsUI.style.display = 'none';
        this.MechanicsUI.style.display = 'block';
        this.nextScreen = 'Mechanics';
    }

    MechanicsButtonPressed() {
        this.MechanicsUI.style.display = 'none';
        this.goalUI.style.display = 'block';
        this.nextScreen = 'Goal';
    }

    GoalButtonPressed() {
        this.goalUI.style.display = 'none';
        this.TutorialUI.style.display = 'none';
        this.nextScreen = 'Level2Mechanics';
        this.TutorialUIOpened = false;
    }

    Level2MechanicsButtonPressed() {
        this.Level2Mechanics.style.display = 'none';
        this.Level2Mechanics2.style.display = 'block';
        this.nextScreen = 'Level2Mechanics2';
    }

    Level2Mechanics2ButtonPressed() {
        this.Level2Mechanics2.style.display = 'none';
        this.TutorialUI.style.display = 'none';
        this.nextScreen = 'Level3Mechanics';
        this.TutorialUIOpened = false;
    }

    Level3MechanicsButtonPressed() {
        this.Level3Mechanics.style.display = 'none';
        this.TutorialUI.style.display = 'none';
        this.nextScreen = 'GameCompleted';
        this.TutorialUIOpened = false;
    }

    showGameCompletedUI() {
        console.log('showGameCompletedUI called');
        this.TutorialUI.style.display = 'block';
        this.LevelCompletedUI.style.display = 'none';
        this.LevelUI.style.display = 'none';
        this.levelCutOff.style.display = 'none';
        this.GameCompletedUI.style.display = 'block';
    }

    RestartGameButtonPressed() {
        console.log('RestartGameButtonPressed called');
        this.gameUI.style.display = 'none';
        this.TutorialUI.style.display = 'none';
        this.LevelCompletedUI.style.display = 'none';
        this.LevelUI.style.display = 'none';
        this.levelCutOff.style.display = 'none';
        window.location.reload();
    }

    updateCollectibles(collectibles) {
        if (collectibles == 0) {
            if (this.collectibleElement1) this.collectibleElement1.src = './images/UIArtifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = './images/UIArtifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = './images/UIArtifact.png';
        }
        else if (collectibles == 1) {
            if (this.collectibleElement1) this.collectibleElement1.src = './images/Artifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = './images/UIArtifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = './images/UIArtifact.png';
        }
        else if (collectibles == 2) {
            if (this.collectibleElement1) this.collectibleElement1.src = './images/Artifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = './images/Artifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = './images/UIArtifact.png';
        }
        else if (collectibles == 3) {
            if (this.collectibleElement1) this.collectibleElement1.src = './images/Artifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = './images/Artifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = './images/Artifact.png';
        }
    }

    updateKeyStatus(hasKey) {
        if (hasKey) {
            if (this.keyElement) this.keyElement.src = './images/Key.png';
        }
        else {
            if (this.keyElement) this.keyElement.src = './images/UIKey.png';
        }
    }

    showLevelCutOff() {
        this.levelCutOff.style.display = 'block';
    }

    hideLevelUI() {
        this.LevelUI.style.display = 'none';
    }

    showLevelUI() {
        this.LevelUI.style.display = 'block';
    }

    showLevelCompletedUI() {
        this.LevelCompletedUI.style.display = 'block';
        if (this.completedCollectible1) this.completedCollectible1.src = this.collectibleElement1.src;
        if (this.completedCollectible2) this.completedCollectible2.src = this.collectibleElement2.src;
        if (this.completedCollectible3) this.completedCollectible3.src = this.collectibleElement3.src;
    }

    nextScreenButtonPressed() {
        if (this.nextScreen === 'Tutorial') {
            this.WelcomeButtonPressed();
        } else if (this.nextScreen === 'Controls') {
            this.ControlsButtonPressed();
        } else if (this.nextScreen === 'Mechanics') {
            this.MechanicsButtonPressed();
        } else if (this.nextScreen === 'Goal') {
            this.GoalButtonPressed();
        } else if (this.nextScreen === 'Level2Mechanics') {
            this.Level2MechanicsButtonPressed();
        } else if (this.nextScreen === 'Level2Mechanics2') {
            this.Level2Mechanics2ButtonPressed();
        } else if (this.nextScreen === 'Level3Mechanics') {
            this.Level3MechanicsButtonPressed();
        } else if (this.nextScreen === 'GameCompleted') {
            this.RestartGameButtonPressed();
        }
    }

    nextLevelButtonPressed() {
        console.log('nextLevelButtonPressed called, currentLevel:', this.currentLevel);
        const game = window.game;
        if (this.currentLevel < 2) {
            this.LevelCompletedUI.style.display = 'none';
            this.levelCutOff.style.display = 'none';
            this.LevelUI.style.display = 'block';
            this.hide()
            game.goToScene('level2');
            // this.currentLevel = 2
        }
        else if (this.currentLevel == 2) {
            console.log('Transitioning from Level 2 to Level 3');
            this.LevelCompletedUI.style.display = 'none';
            this.levelCutOff.style.display = 'none';
            this.LevelUI.style.display = 'block';
            this.hide()
            // this.currentLevel = 3
            console.log('Set currentLevel to 3, calling goToScene');
            game.goToScene('level3');
        }
        else if (this.currentLevel == 3) {
            this.LevelCompletedUI.style.display = 'none';
            this.showGameCompletedUI();
            this.TutorialUIOpened = true;
        }
    }
}
