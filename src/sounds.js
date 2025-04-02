const eatSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
const gameOverSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2658/2658-preview.mp3');

export const playEatSound = () => {
    eatSound.currentTime = 0;
    eatSound.play();
};

export const playGameOverSound = () => {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}; 