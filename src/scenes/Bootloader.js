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
        // this.load.image('huesito', 'bone.png');
    }

    create() {
        this.javier = this.physics.add.image(100, 100, 'yoshi');
        this.javier.body.setMass(1);
        this.obstaculo1 = this.physics.add.image(300, 100, 'yoshif');

        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        this.obstaculo1.body.setCollideWorldBounds(true);

        //Movimientos
        //Derecha
        this.cursors = this.input.keyboard.createCursorKeys();
        // this.cursor.right.on('down', () => {
        // this.javier.body.setAccelerationX(50);
        // });
        // //Izq
        // this.cursor = this.input.keyboard.createCursorKeys();
        // this.cursor.left.on('down', () => {
        // this.javier.body.setAccelerationX(-50);
        // });
        // //Salto
        // this.cursor.up.on('down', () => {
        //     this.javier.body.setVelocityY(-500);
        // });

        //Choque con Plataforma
        this.physics.add.collider(this.javier, this.obstaculo1, () => {
            this.javier.setVelocity(0);
            this.javier.setAcceleration(0);
        });

    }

    update(time, delta) {
        // console.log(this.javier.body.onFloor());
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
            this.javier.setVelocityY(-330);
        }
        }
}

export default Bootloader;