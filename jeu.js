 var config = {
    width: 800,
    height: 600,
    scene: [main, level],
    physics: {                              //Paramètre du moteur physique
        default: 'arcade',                  //Type de moteur physics
        arcade: {                           //Paramètre du moteur physique 'arcade'
            gravity: { y: 0 },            //Paramètre de la gravité en x (gravité horizontale), y  (gravité verticale)
            debug: true
        }
    }
};
 
var game = new Phaser.Game(config);