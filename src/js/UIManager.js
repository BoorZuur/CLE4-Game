

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

        this.RestartGameButton.addEventListener('click', (event) => this.RestartGameButtonPressed(event));
        this.nextLevelButton.addEventListener('click', (event) => this.nextLevelButtonPressed(event));
        this.nextButtonWelcome.addEventListener('click', (event) => this.WelcomeButtonPressed(event));
        this.nextButtonControls.addEventListener('click', (event) => this.ControlsButtonPressed(event));
        this.nextButtonMechanics.addEventListener('click', (event) => this.MechanicsButtonPressed(event));
        this.nextButtonGoal.addEventListener('click', (event) => this.GoalButtonPressed(event));
        this.nextButtonLevel2Mechanics.addEventListener('click', (event) => this.Level2MechanicsButtonPressed(event));
        this.nextButtonLevel2Mechanics2.addEventListener('click', (event) => this.Level2Mechanics2ButtonPressed(event));
        this.nextButtonLevel3Mechanics.addEventListener('click', (event) => this.Level3MechanicsButtonPressed(event));
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
    }

    ControlsButtonPressed() {
        this.ControlsUI.style.display = 'none';
        this.MechanicsUI.style.display = 'block';
    }

    MechanicsButtonPressed() {
        this.MechanicsUI.style.display = 'none';
        this.goalUI.style.display = 'block';
    }

    GoalButtonPressed() {
        this.goalUI.style.display = 'none';
        this.TutorialUI.style.display = 'none';
    }

    Level2MechanicsButtonPressed() {
        this.Level2Mechanics.style.display = 'none';
        this.Level2Mechanics2.style.display = 'block';
    }

    Level2Mechanics2ButtonPressed() {
        this.Level2Mechanics2.style.display = 'none';
        this.TutorialUI.style.display = 'none';
    }

    Level3MechanicsButtonPressed() {
        this.Level3Mechanics.style.display = 'none';
        this.TutorialUI.style.display = 'none';
    }

    showGameCompletedUI() {
        this.gameUI.style.display = 'none';
        this.TutorialUI.style.display = 'none';
        this.LevelCompletedUI.style.display = 'none';
        this.LevelUI.style.display = 'none';
        this.levelCutOff.style.display = 'none';
        this.GameCompletedUI.style.display = 'block';
    }

    RestartGameButtonPressed() {
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

    nextLevelButtonPressed() {
        // Get the game instance from the window object
        const game = window.game;
        if (this.currentLevel < 2) {
            this.LevelCompletedUI.style.display = 'none';
            this.levelCutOff.style.display = 'none';
            this.LevelUI.style.display = 'block';
            this.hide()
            this.currentLevel = 2
            game.goToScene('level2');
        }
        else if (this.currentLevel == 2) {
            this.LevelCompletedUI.style.display = 'none';
            this.levelCutOff.style.display = 'none';
            this.LevelUI.style.display = 'block';
            this.hide()
            this.currentLevel = 3
            game.goToScene('level3');
        }
        else if (this.currentLevel == 3) {
            this.LevelCompletedUI.style.display = 'none';
            this.showGameCompletedUI();
        }
    }
}
