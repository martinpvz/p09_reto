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
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal', 'escalera', 'ninja']);
    }

    create() {
        this.javier = this.physics.add.image(50, 700, 'ninja').setScale(0.17);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        this.javier.body.setMass(1);

        // this.barraArriba5 = this.add.image(1230, 170, 'barraArriba1');
        // this.barraArriba5.setScale(0.3)
        // this.barraPuerta = this.add.image(1460, 230, 'barraPuerta');
        // this.barraPuerta.setScale(0.3)
        this.puerta = this.add.image(1460, 135, 'puerta');
        this.puerta.setScale(0.4)
        // this.barraCF1 = this.add.image(260, 320, 'barraCF2');
        // this.barraCF1.setScale(0.3)
        // this.barraCF2 = this.add.image(865, 320, 'barraCF1');
        // this.barraCF2.setScale(0.3)
        this.cuerda = this.add.image(575, 320, 'cuerda');
        this.cuerda.setScale(0.3);

        var torres = this.physics.add.staticGroup();
        var barraTiempo = this.physics.add.staticGroup();
        var barraTorre = this.physics.add.group();
        var barrasArriba = this.physics.add.staticGroup();
        var barrasHielo = this.physics.add.staticGroup();
        var barrasCuerda = this.physics.add.staticGroup();
        var picos = this.physics.add.staticGroup();

        torres.create(150, 715, 'torre1').setScale(0.2).refreshBody();
        torres.create(300, 715, 'torre2').setScale(0.2).refreshBody();
        torres.create(450, 715, 'torre3').setScale(0.2).refreshBody();
        torres.create(600, 715, 'torre4').setScale(0.2).refreshBody();
        torres.create(780, 715, 'torre5').setScale(0.2).refreshBody();

        barraTiempo.create(980, 670, 'barraTiempo').setScale(0.3).refreshBody();
        barraTiempo.create(1120, 620, 'barraTiempo').setScale(0.3).refreshBody();
        barraTiempo.create(1260, 570, 'barraTiempo').setScale(0.3).refreshBody();
        barraTiempo.create(1400, 520, 'barraTiempo').setScale(0.3).refreshBody();

        barraTorre.create(840, 585, 'barraElevador').setDepth(-1).setScale(0.2).refreshBody();

        barrasArriba.create(160,170, 'barraArriba1').setScale(0.3).refreshBody()
        barrasArriba.create(430,170, 'barraArriba2').setScale(0.3).refreshBody()
        barrasArriba.create(1460,230, 'barraPuerta').setScale(0.3).refreshBody()
        barrasArriba.create(1230,170, 'barraArriba1').setScale(0.3).refreshBody()

        barrasHielo.create(740,170, 'barraArriba3').setScale(0.3).refreshBody()
        barrasHielo.create(1000,170, 'barraArriba4').setScale(0.3).refreshBody();

        barrasCuerda.create(865,320, 'barraCF1').setScale(0.3).refreshBody()
        barrasCuerda.create(260,320, 'barraCF2').setScale(0.3).refreshBody()

        picos.create(1200, 735, 'picos').setScale(0.3).refreshBody();
        picos.create(480, 820, 'picos').setScale(0.3).refreshBody();

        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        barraTorre.children.iterate( (torreT) => {
            torreT.setCollideWorldBounds(true);
            torreT.body.setAllowGravity(false);
        } );
        // barraTorre.group.setCollideWorldBounds(true);
        // barraTorre.onWorldBounds = true;
        
        this.escalar = this.add.image(1120, 365, 'escalar');
        this.escalar.setScale(0.28);
        this.barraDiagonal = this.add.image(1510, 430, 'barraDiagonal');
        this.barraDiagonal.setScale(0.3);
        this.escalera = this.add.image(262, 230, 'escalera');
        this.escalera.setScale(0.3);

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
        this.physics.add.collider(this.javier, barraTorre, () => {
            //algo
        });
        this.physics.add.collider(this.javier, this.barraDiagonal);
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            // if (this.cursors.up.isDown && this.escalar.body.touching.right)
            // {
            //     this.javier.y -= 3;
            // }
        });
        this.physics.add.collider(this.javier, barrasArriba);
        this.physics.add.collider(this.javier, barrasHielo, () => {
            this.javier.setVelocityX(0);
            this.javier.setAccelerationX(0);
        });
        this.physics.add.collider(this.javier, this.barraPuerta);
        this.physics.add.collider(this.javier, barrasCuerda);
        this.physics.add.collider(this.javier, this.cuerda, () => {
            this.javier.setVelocityX(0);
            this.javier.setAccelerationX(0);
        });
        //Choque con picos
        this.physics.add.collider(this.javier, picos, () => {
            this.scene.restart();
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

        //(this.cursors.up.isDown&& this.javier.body.onWall()) Este es para salto en la pared PROBABLE  
        if (this.cursors.up.isDown && this.javier.body.onFloor())
        {
            this.javier.setVelocityY(-500);
        }

        if (this.cursors.up.isDown && this.escalar.body.touching.right && this.javier.body.touching.left)
        {
            this.javier.y -= 3;
        }
    }
}

export default Bootloader;