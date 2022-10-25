class Bootloader extends Phaser.Scene{
    constructor(){
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
    }
    
    preload() {
        this.load.path = './assets/';
        this.load.image(['yoshif', 'yoshi']);
        this.load.image('samurai', 'Samurai.png');
    }

    create() {
        this.javier = this.physics.add.image(100, 100, 'samurai').setScale(0.2);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        // this.javier.body.setMass(1);
        this.obstaculo1 = this.physics.add.image(300, 100, 'yoshif');
        // this.obstaculo1.body.setOffset(400);

        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        this.obstaculo1.body.setCollideWorldBounds(true);

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
     

        //Choque con Plataforma
        this.physics.add.collider(this.javier, this.obstaculo1, () => {
            this.javier.setVelocity(0);
            this.javier.setAcceleration(0);
        });

    }

    update(time, delta) {
        // console.log(this.javier.body.onFloor());

        //Movimientos
        if (this.cursors.left.isDown)
        {
            this.javier.setVelocityX(-160);

            this.javier.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.javier.setVelocityX(160);

            this.javier.flipX=0;
        }
        else
        {
            this.javier.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.javier.body.onFloor())
        {
            this.javier.setVelocityY(-400);
        }
        }
}

export default Bootloader;