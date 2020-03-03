class main extends Phaser.Scene {
    constructor() {
        super("Title");
    }

	preload(){
		this.load.image('fond','assets/maintitle.png')
		//this.load.image('zone', 'assets/zone.png')
	  }

	  create(){
		this.add.image(0,0,'fond').setOrigin(0,0);
		this.compteur = 0;
	
		this.zone = this.add.image(500  ,500, 'zone').setScale(4.5,1.5).setInteractive();
		this.zone = this.add.image(500  ,340, 'zone').setScale(4.5,1.5).setInteractive();
	
		this.zone.on("pointerdown", this.changeScene, this);
	  }
	
	  changeScene(pointer)
	  {
		this.compteur++;
		console.log(this.compteur);
		this.zone.off("pointerdown", this.changeScene, this);
		this.zone.on("pointerup", this.changeSceneStop, this);
	
	  }
	
	  changeSceneStop()
	  {
		this.zone.off("pointerup", this.changeSceneStop, this)
	  }
	  update(){
		if (this.compteur == 1) {
			this.scene.start('quatrieme_scene');
	
		}
	  }
	}