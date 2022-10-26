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
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal', 'escalera', 'ninja','fondo_opc1x||']);
    }

    create() {
        this.javier = this.physics.add.image(50, 700, 'ninja').setScale(0.1);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        this.javier.body.setMass(1);

        this.puerta = this.add.image(1460, 135, 'puerta').setScale(0.7);
        this.cuerda = this.add.image(535, 285, 'cuerda').setScale(0.8);

        var torres = this.physics.add.staticGroup();
        var barraTiempo = this.physics.add.staticGroup();
        this.barraTorre = this.physics.add.group();
        var barrasArriba = this.physics.add.staticGroup();
        var barrasHielo = this.physics.add.staticGroup();
        var barrasCuerda = this.physics.add.staticGroup();
        var picos = this.physics.add.staticGroup();

        torres.create(150, 730, 'torre1').setScale(0.6).refreshBody();
        torres.create(300, 715, 'torre2').setScale(0.6).refreshBody();
        torres.create(450, 715, 'torre3').setScale(0.6).refreshBody();
        torres.create(600, 715, 'torre4').setScale(0.6).refreshBody();
        torres.create(760, 715, 'torre5').setScale(0.6).refreshBody();

        barraTiempo.create(980, 670, 'barraTiempo').refreshBody();
        barraTiempo.create(1120, 620, 'barraTiempo')//setScale(0.3).refreshBody();
        barraTiempo.create(1260, 570, 'barraTiempo')//.setScale(0.3).refreshBody();
        barraTiempo.create(1400, 520, 'barraTiempo')//.setScale(0.3).refreshBody();

        this.barraTorre.create(820, 575, 'barraElevador').setDepth(-1).setScale(0.5).refreshBody();

        barrasArriba.create(185,130, 'barraArriba1').setScale(0.8).refreshBody()
        barrasArriba.create(415,130, 'barraArriba2').setScale(0.8).refreshBody()
        barrasArriba.create(1460,200, 'barraPuerta').setScale(0.8).refreshBody()
        barrasArriba.create(1230,130, 'barraArriba1').setScale(0.8).refreshBody()

        barrasHielo.create(740,130, 'barraArriba3').setScale(0.8).refreshBody()
        barrasHielo.create(1000,130, 'barraArriba4').setScale(0.8).refreshBody();

        barrasCuerda.create(780,280, 'barraCF1').setScale(0.8).refreshBody()
        barrasCuerda.create(260,280, 'barraCF2').setScale(0.8).refreshBody()

        picos.create(1200, 745, 'picos').setScale(0.2).refreshBody();
        picos.create(480, 820, 'picos').setScale(0.3).refreshBody();

        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        this.barraTorre.children.iterate( (torreT) => {
            torreT.setCollideWorldBounds(true);
            torreT.body.setAllowGravity(false);
        } );
        // barraTorre.group.setCollideWorldBounds(true);
        // barraTorre.onWorldBounds = true;
        
        this.escalar = this.add.image(1000, 335, 'escalar');
        this.escalar.setScale(0.27);
        this.barraDiagonal = this.add.image(1250, 400, 'barraDiagonal').setScale(0.6);
        this.escalera = this.add.image(265, 190, 'escalera');

        // this.obstaculo1.body.setCollideWorldBounds(true);

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.physics.add.existing(this.escalar, true );
        // this.physics.add.existing(this.barraArriba5, true );
        this.physics.add.existing(this.escalera, true );
        // this.physics.add.existing(this.barraCF1, true );
        // this.physics.add.existing(this.barraCF2, true );
        this.physics.add.existing(this.cuerda, true );
        this.physics.add.existing(this.barraDiagonal, true );
        this.physics.add.existing(this.puerta, true );
        // this.physics.add.existing(this.barraPuerta, true );

        //Choque con Plataforma
        // this.physics.add.collider(this.javier, this.obstaculo1, () => {
        //     this.javier.setVelocity(0);
        //     this.javier.setAcceleration(0);
        // });
        this.physics.add.collider(this.javier, torres);
        this.physics.add.collider(this.javier, barraTiempo, () => {
            //algo
        });
        this.physics.add.collider(this.javier, this.barraTorre, () => {
            //algo
        });
        this.physics.add.collider(this.javier, this.barraDiagonal);
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.escalera, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, barrasArriba);
        this.physics.add.collider(this.javier, barrasHielo, () => {
            // this.javier.setVelocityX(0);
            // this.javier.setAccelerationX(0);
        });
        this.physics.add.collider(this.javier, this.barraPuerta);
        this.physics.add.collider(this.javier, barrasCuerda);
        this.physics.add.collider(this.javier, this.cuerda, () => {
            // this.javier.setVelocityX(0);
            // this.javier.setAccelerationX(0);
        });
        //Choque con picos
        this.physics.add.collider(this.javier, picos, () => {
            this.scene.restart();
        });
    }


    update(time, delta) {
        console.log(this.javier.body.onFloor());

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

        //(this.cursors.up.isDown&& this.javier.body.onWall()) Este es para salto en la pared PROBABLE  
        if ((this.cursors.up.isDown && this.javier.body.onFloor())||(this.cursors.up.isDown && this.barraTorre.getChildren()[0].body.touching.up))
        {
            this.javier.setVelocityY(-500);
        }
        // if(this.cursors.up.isDown && this.barraTorre.getChildren()[0].body.touching.up)
        // {
        //     this.javier.setVelocityY(-500);
        // }
        if (this.cursors.up.isDown && this.escalar.body.touching.right && this.javier.body.touching.left)
        {
            this.javier.y -= 3;
        }
        if (this.cursors.up.isDown && this.escalera.body.touching && this.javier.body.touching)
        {
            this.javier.y -= 3;
        }

        if(this.barraTorre.getChildren()[0].y>769){
            this.barraTorre.getChildren()[0].disableBody(true, true);
        }
    }
}

export default Bootloader;