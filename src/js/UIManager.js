

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
        this.nextLevelButton = document.querySelector('#NextLevelButton');
        this.currentLevel = 1

        this.nextLevelButton.addEventListener('click', () => {
            // Get the game instance from the window object
            const game = window.game;
            if (this.currentLevel <= 2) {
                this.LevelCompletedUI.style.display = 'none';
                this.levelCutOff.style.display = 'none';
                this.LevelUI.style.display = 'block';
                this.hide()
                game.goToScene('level2');
                this.currentLevel = 2
            }
            else if (this.currentLevel == 2) {
                game.goToScene('level3');
                this.currentLevel = 3
            }
            else if (this.currentLevel == 3) {
                game.goToScene('level4');
                this.currentLevel = 4
            }
        });
        // this.levelCutOff.style.display = 'none';

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


    updateCollectibles(collectibles) {
        if (collectibles == 0) {
            if (this.collectibleElement1) this.collectibleElement1.src = 'public/images/UIArtifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = 'public/images/UIArtifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = 'public/images/UIArtifact.png';
        }
        else if (collectibles == 1) {
            if (this.collectibleElement1) this.collectibleElement1.src = 'public/images/Artifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = 'public/images/UIArtifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = 'public/images/UIArtifact.png';
        }
        else if (collectibles == 2) {
            if (this.collectibleElement1) this.collectibleElement1.src = 'public/images/Artifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = 'public/images/Artifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = 'public/images/UIArtifact.png';
        }
        else if (collectibles == 3) {
            if (this.collectibleElement1) this.collectibleElement1.src = 'public/images/Artifact.png';
            if (this.collectibleElement2) this.collectibleElement2.src = 'public/images/Artifact.png';
            if (this.collectibleElement3) this.collectibleElement3.src = 'public/images/Artifact.png';
        }
    }

    updateKeyStatus(hasKey) {
        if (hasKey) {
            if (this.keyElement) this.keyElement.src = 'public/images/Key.png';
        }
        else {
            if (this.keyElement) this.keyElement.src = 'public/images/UIKey.png';
        }
    }

    hideLevelUI() {
        this.LevelUI.style.display = 'none';
    }

    showLevelCompletedUI() {
        this.LevelCompletedUI.style.display = 'block';
        if (this.completedCollectible1) this.completedCollectible1.src = this.collectibleElement1.src;
        if (this.completedCollectible2) this.completedCollectible2.src = this.collectibleElement2.src;
        if (this.completedCollectible3) this.completedCollectible3.src = this.collectibleElement3.src;
    }


}
