class level extends Phaser.Scene {
    constructor() {
        super("Level");
    }

	preload ()
	{
	    this.load.image('space', 'assets/back.png');
	    this.load.image('bullet', 'assets/sprites/bullets/bullet8.png');
	    this.load.image('ninja', 'assets/ninja.png');

	    this.load.image('3vie', 'assets/3vies.png');
	    this.load.image('2vie', 'assets/2vies.png');
	    this.load.image('1vie', 'assets/1vies.png');

	    this.load.image('frog', 'assets/frog.png');
	}

	create ()
	{
		this.spacebar;
		this.player;
		this.nVies = 3;
		this.bullets;
		this.group;

		this.scoreText;
		this.score = 10;
	   /*Creation des projectiles*/
	         this.Bullet = new Phaser.Class({

	            Extends: Phaser.GameObjects.Image,

	            initialize:

	            function Bullet (scene)
	            {
	                Phaser.GameObjects.Image.call(this, scene, -100, 0, 'bullet');

	                this.speed = Phaser.Math.GetSpeed(600, 1);
	            },

	            fire: function (x, y)
	            {
	                this.setPosition(x, y);

	                this.setActive(true);
	                this.setVisible(true);
	            },

	            update: function (time, delta)
	            {
	                this.x += this.speed * delta;

	                if (this.x > 820)
	                {
	                    this.setActive(false);
	                    this.setVisible(false);
	                }
	            } 
	        });

	        this.bullets = this.add.group({
	            classType: this.Bullet,
	            maxSize: 30,
	            runChildUpdate: true
	        });

	    this.add.image(400, 300, 'space');

	    /*Joueur*/
	        player = this.physics.add.image(150, 300, 'ninja').setScale(1);
	        player.setCollideWorldBounds(true);
	        player.setVelocity(0);
	        /*Vie*/
	        vie3 = this.add.image(60,30,'3vie');
	        vie2 = this.add.image(60,30,'2vie');
	        vie1 = this.add.image(60,30,'1vie');
	        /*Balles*/
	        groupeBullets = this.physics.add.group();
	        
	    /*Controle */
	    cursors = this.input.keyboard.createCursorKeys();
	    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	    /*Textes*/
	    scoreText = this.add.text(650,30,'Score : ');

	    /*Ennemi*/
	    group = this.physics.add.group({
	        defaultKey: 'frog',
	        allowGravity: false,
	        maxSize: -1 ,
	        setX: {stepX: 500},
	        setY: {stepY: 500},
	        setScale: { x: 2, y: 2}
	    });
	    this.physics.add.overlap(group,groupeBullets, killEnnemi, null,this);

	    /*Balles*/
	        groupeBulletsFrog = this.physics.add.group();
	        this.physics.add.overlap(groupeBulletsFrog, player, playerTouch, null,this);

	    this.time.addEvent({
	        delay: 800,
	        loop: true,
	        callback: addFrog
	    });

	    function playerTouch(groupeBulletsFrog, player) {
		    nVies--;
		    groupeBulletsFrog.destroy(true);
		    player.setVelocity(0);
		    //timedEvent = this.time.delayedCall(100, reactivateCollider, [], this);
		}

		function reactivateCollider() {
		    console.log("Collider remis");
		    //this.physics.add.overlap(group, player, playerTouch, null,this);
		}

		function killEnnemi(frog, groupeBullets) {
			score += 10;
			scoreText.setText('Score : ' + score);
		    frog.destroy(true);
		    groupeBullets.destroy(true);
		}

		function addFrog () {
		    var frog = group.get(800, Phaser.Math.Between(100, 600));
		}
	}

	update ()
	{   
	    /*Déplacement*/
	        player.setVelocity(0);

	        if (cursors.left.isDown)
	        {
	            player.setVelocityX(-300);
	        }
	        else if (cursors.right.isDown)
	        {
	            player.setVelocityX(300);
	        }

	        if (cursors.up.isDown)
	        {
	            player.setVelocityY(-300);
	        }
	        else if (cursors.down.isDown)
	        {
	            player.setVelocityY(300);
	        }

	    /*Projectiles*/
	    if (Phaser.Input.Keyboard.JustDown(fire))
	    {
	        var bullet = groupeBullets.create(player.x, player.y, 'bullet');
	        bullet.body.allowGravity = false;
	        bullet.setVelocity(1000, 0); 
	    }

	    /*Actualisation de la vie*/
	        if(nVies == 2)
	        {
	            vie3.visible = false;
	        }
	        if(nVies == 1)
	        {
	            vie2.visible = false;
	        }
	        if(nVies == 0) 
	        {
	            vie1.visible = false;   
	            player.setVelocity(0);
	            player.setTint(0xff0000);
	        }

	    Phaser.Actions.IncX(group.getChildren(), -2);

	    group.children.iterate(function (frog) {
	        if (frog.x == 680 || frog.x == 600 || frog.x == 550 || frog.x == 500)
	        {
	            var bullet = groupeBulletsFrog.create(frog.x, frog.y, 'bullet');
	            bullet.body.allowGravity = false;
	            bullet.setVelocity(-260, 0);

	            if(bullet.x == 0)
	            {
	                groupeBulletsFrog.destroy(true);
	            }
	        }


	    });
	}
}