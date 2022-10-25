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
    }

    create() {
        this.yoshi = this.physics.add.image(100, 100, 'yoshi');
        this.yoshi.body.setMass(1);
        this.yoshi_malvado = this.add.image(300, 100, 'yoshif');
        // this.physics.add.existing(this.yoshi_malvado);
        this.physics.add.existing(this.yoshi_malvado, false );

        // this.yoshi.setMaxVelocity(100, 800);
        this.yoshi.body.maxVelocity.x = 100;

        //IMPORTANTE LEER ESTE
        console.log(this.yoshi_malvado.body);

        this.yoshi.body.setCollideWorldBounds(true);
        this.yoshi_malvado.body.setCollideWorldBounds(true);

        this.cursor = this.input.keyboard.createCursorKeys();
        this.cursor.right.on('down', () => {
        // this.yoshi.body.setAcceleration(800); //Progresivo
        // this.yoshi.body.setVelocity(800);   //Inmediato
        this.yoshi.body.setVelocityX(800);
        });
        // Tambien puedes usar
        // setAcelerationX()
        // setAcelerationY()
        // setVelocityX()
        // setVelocityY()

        this.cursor.up.on('down', () => {
            this.yoshi.body.setVelocityY(-800);
        });

        // this.physics.add.collider(this.yoshi, this.yoshi_malvado);
        this.physics.add.collider(this.yoshi, this.yoshi_malvado, () => {
            this.yoshi.setVelocity(0);
            this.yoshi.setAcceleration(0);
        });

        this.yoshi.body.setCircle(40);
        this.yoshi_malvado.body.setSize(30, 30);
        this.yoshi_malvado.body.setOffset(10, 50); //Donde se coloca el colisionador/body
        this.yoshi.body.setBounce(0.2);
    }

    update(time, delta) {
        
    }
}

export default Bootloader;