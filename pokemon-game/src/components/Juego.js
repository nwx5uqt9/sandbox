import React, { useEffect } from 'react';
import Phaser from 'phaser';

function App() {
    useEffect(() => {
        let coins;
        let obstacles;
        let score = 0;
        let scoreText;
        let game;

        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#2d2d2d',
            parent: 'game-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            }
        };

        function preload() {
            this.load.image('coin', 'https://cdn-icons-png.freepik.com/512/17152/17152173.png?ga=GA1.1.716255013.1763523080');
            this.load.image('obstacle', 'https://cdn-icons-png.freepik.com/512/5500/5500350.png');
            this.load.image('space', 'https://wallpapers.com/images/featured-full/fondo-de-espacio-htygkta8z6o3mcx2.jpg');
        }

        function create() {
            // Agregar fondo primero para que esté detrás de todo
            this.add.image(400, 300, 'space').setOrigin(0.5, 0.5).setDisplaySize(800, 600);

            // Crear grupo de monedas
            coins = this.physics.add.group({
                key: 'coin',
                repeat: 5,
                setXY: { x: 12, y: 0, stepX: 70 },
            });

            coins.children.iterate((coin) => {
                coin.setBounce(1);
                coin.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
                coin.setCollideWorldBounds(true);
                coin.setInteractive();
                coin.setScale(0.15);
            });

            // Crear grupo de obstáculos
            obstacles = this.physics.add.group({
                key: 'obstacle',
                repeat: 5, 
                setXY: { x: 12, y: 100, stepX: 150 },
            });

            obstacles.children.iterate((obstacle) => { // CORRECCIÓN: obstacles, no coins
                obstacle.setBounce(1);
                obstacle.setVelocity(Phaser.Math.Between(-150, 150), Phaser.Math.Between(-150, 150));
                obstacle.setCollideWorldBounds(true); // CORRECCIÓN: WorldBounds
                obstacle.setInteractive();
                obstacle.setScale(0.3); // Escala ajustada
            });

            // CORRECCIÓN: Colisionador correcto
            this.physics.add.collider(coins, obstacles);
            this.physics.add.collider(coins, coins);
            this.physics.add.collider(obstacles, obstacles);

            // Texto de puntuación
            scoreText = this.add.text(16, 16, 'Score: 0', {
                fontSize: '32px',
                fill: '#fff',
            });

            // Evento de clic CORREGIDO
            this.input.on('gameobjectdown', (pointer, gameObject) => {
                if (gameObject.texture.key === 'coin') {
                    gameObject.destroy();
                    score += 10;
                    scoreText.setText(`Score: ${score}`);
                } else if (gameObject.texture.key === 'obstacle') { // CORRECCIÓN: texture.key, no text.key
                    gameObject.destroy();
                    score -= 5;
                    scoreText.setText(`Score: ${score}`);
                }
            });

            // Evento de fin de juego CORREGIDO
            this.time.addEvent({
                delay: 30000, // 30 segundos
                callback: () => {
                    this.add.text(400, 300, '¡Tiempo terminado!', {
                        fontSize: '48px',
                        fill: '#fff'
                    }).setOrigin(0.5);
                    this.physics.pause();
                },
                callbackScope: this
            });
        }

        function update() {
            // Lógica de actualización si es necesaria
        }

        // Inicializar el juego
        game = new Phaser.Game(config);

        // Cleanup al desmontar el componente
        return () => {
            if (game) {
                game.destroy(true);
            }
        };
    }, []);

    return (
        <div id="game-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* El juego se renderizará aquí */}
        </div>
    );
}

export default App;