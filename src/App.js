// App.js
import React, { Component } from "react";
import Snake from "./Components/Snake";
import Food from "./Components/Food";
import Button from "./Components/Button";
import Menu from "./Components/Menu";
import { playEatSound, playGameOverSound } from "./sounds";
import "./App.css";

const getRandomFood = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
};

const getInitialState = () => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    return {
        food: getRandomFood(),
        direction: "RIGHT",
        speed: 100,
        route: "menu",
        snakeDots: [
            [0, 0],
            [0, 2],
        ],
        score: 0,
        highScore: savedHighScore ? parseInt(savedHighScore) : 0,
    };
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            ...getInitialState(),
            scoreAnimation: false
        };
    }

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate() {
        this.onSnakeOutOfBounds();
        this.onSnakeCollapsed();
        this.onSnakeEats();
    }

    onKeyDown = (e) => {
        e.preventDefault();
        e = e || window.event;
        
        // Prevenir movimento na direção oposta
        const currentDirection = this.state.direction;
        switch (e.keyCode) {
            case 37: // LEFT
                if (currentDirection !== "RIGHT") {
                    this.setState({ direction: "LEFT" });
                }
                break;
            case 38: // UP
                if (currentDirection !== "DOWN") {
                    this.setState({ direction: "UP" });
                }
                break;
            case 39: // RIGHT
                if (currentDirection !== "LEFT") {
                    this.setState({ direction: "RIGHT" });
                }
                break;
            case 40: // DOWN
                if (currentDirection !== "UP") {
                    this.setState({ direction: "DOWN" });
                }
                break;
        }
    };

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];
        if (this.state.route === "game") {
            switch (this.state.direction) {
                case "RIGHT":
                    head = [head[0] + 2, head[1]];
                    break;
                case "LEFT":
                    head = [head[0] - 2, head[1]];
                    break;
                case "DOWN":
                    head = [head[0], head[1] + 2];
                    break;
                case "UP":
                    head = [head[0], head[1] - 2];
                    break;
            }
            dots.push(head);
            dots.shift();
            this.setState({
                snakeDots: dots,
            });
        }
    };

    onSnakeOutOfBounds() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (this.state.route === "game") {
            if (
                head[0] >= 100 ||
                head[1] >= 100 ||
                head[0] < 0 ||
                head[1] < 0
            ) {
                this.gameOver();
            }
        }
    }

    onSnakeCollapsed() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach((dot) => {
            if (head[0] == dot[0] && head[1] == dot[1]) {
                this.gameOver();
            }
        });
    }

    onSnakeEats() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] == food[0] && head[1] == food[1]) {
            playEatSound();
            this.setState({
                food: getRandomFood(),
                score: this.state.score + 10,
                scoreAnimation: true
            });
            this.increaseSnake();
            this.increaseSpeed();

            // Remove a animação após ela terminar
            setTimeout(() => {
                this.setState({ scoreAnimation: false });
            }, 300);
        }
    }

    increaseSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots: newSnake,
        });
    }

    increaseSpeed() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 20,
            });
        }
    }

    onRouteChange = () => {
        this.setState({
            ...getInitialState(),
            route: "game",
            scoreAnimation: false
        });
    };

    gameOver() {
        playGameOverSound();
        const currentScore = this.state.score;
        const highScore = this.state.highScore;
        
        if (currentScore > highScore) {
            localStorage.setItem('snakeHighScore', currentScore.toString());
            this.setState({ highScore: currentScore });
        }
        
        alert(`GAME OVER!\nPontuação: ${currentScore}\nRecorde: ${highScore}`);
        this.setState({
            ...getInitialState(),
            route: "menu",
            scoreAnimation: false
        });
    }

    onDown = () => {
        if (this.state.direction !== "UP") {
            let dots = [...this.state.snakeDots];
            let head = dots[dots.length - 1];
            head = [head[0], head[1] + 2];
            dots.push(head);
            dots.shift();
            this.setState({
                direction: "DOWN",
                snakeDots: dots,
            });
        }
    };

    onUp = () => {
        if (this.state.direction !== "DOWN") {
            let dots = [...this.state.snakeDots];
            let head = dots[dots.length - 1];
            head = [head[0], head[1] - 2];
            dots.push(head);
            dots.shift();
            this.setState({
                direction: "UP",
                snakeDots: dots,
            });
        }
    };

    onRight = () => {
        if (this.state.direction !== "LEFT") {
            let dots = [...this.state.snakeDots];
            let head = dots[dots.length - 1];
            head = [head[0] + 2, head[1]];
            dots.push(head);
            dots.shift();
            this.setState({
                direction: "RIGHT",
                snakeDots: dots,
            });
        }
    };

    onLeft = () => {
        if (this.state.direction !== "RIGHT") {
            let dots = [...this.state.snakeDots];
            let head = dots[dots.length - 1];
            head = [head[0] - 2, head[1]];
            dots.push(head);
            dots.shift();
            this.setState({
                direction: "LEFT",
                snakeDots: dots,
            });
        }
    };

    render() {
        return (
            <div className="game-container">
                {this.state.route === "menu" ? (
                    <Menu onRouteChange={this.onRouteChange} />
                ) : (
                    <div className="game-area">
                        <div className="score-container">
                            <div className="score-box">
                                <div className="score-label">Pontuação</div>
                                <div className={`score-value ${this.state.scoreAnimation ? 'pop' : ''}`}>
                                    {this.state.score}
                                </div>
                            </div>
                            <div className="score-box">
                                <div className="score-label">Recorde</div>
                                <div className="score-value high-score">
                                    {this.state.highScore}
                                </div>
                            </div>
                        </div>
                        <div className="game-board">
                            <Snake snakeDots={this.state.snakeDots} />
                            <Food dot={this.state.food} />
                        </div>
                        <div className="controls">
                            <Button onClick={this.onUp}>↑</Button>
                            <div className="horizontal-controls">
                                <Button onClick={this.onLeft}>←</Button>
                                <Button onClick={this.onRight}>→</Button>
                            </div>
                            <Button onClick={this.onDown}>↓</Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
