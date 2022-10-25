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
        this.javier = this.physics.add.image(50, 100, 'ninja').setScale(0.2);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        this.javier.body.setMass(1);

        this.barraArriba = this.add.image(160, 170, 'barraArriba1');
        this.barraArriba.setScale(0.3)
        this.barraArriba2 = this.add.image(430, 170, 'barraArriba2');
        this.barraArriba2.setScale(0.3)
        this.barraArriba3 = this.add.image(740, 170, 'barraArriba3');
        this.barraArriba3.setScale(0.3)
        this.barraArriba4 = this.add.image(1000, 170, 'barraArriba4');
        this.barraArriba4.setScale(0.3)
        this.barraArriba5 = this.add.image(1230, 170, 'barraArriba1');
        this.barraArriba5.setScale(0.3)
        this.barraPuerta = this.add.image(1460, 230, 'barraPuerta');
        this.barraPuerta.setScale(0.3)
        this.puerta = this.add.image(1460, 135, 'puerta');
        this.puerta.setScale(0.4)
        this.barraCF1 = this.add.image(260, 320, 'barraCF2');
        this.barraCF1.setScale(0.3)
        this.barraCF2 = this.add.image(865, 320, 'barraCF1');
        this.barraCF2.setScale(0.3)
        this.cuerda = this.add.image(575, 320, 'cuerda');
        this.cuerda.setScale(0.3);

        var torres = this.physics.add.staticGroup();
        var barraTiempo = this.physics.add.staticGroup();
        // this.torre1 = this.add.image(150, 675, 'torre1');
        // this.torre1.setScale(0.3)
        // this.torre2 = this.add.image(300, 675, 'torre2');
        // this.torre2.setScale(0.3)
        // this.torre3 = this.add.image(450, 675, 'torre3');
        // this.torre3.setScale(0.3)
        // this.torre4 = this.add.image(600, 675, 'torre4');
        // this.torre4.setScale(0.3)
        // this.torre5 = this.add.image(780, 675, 'torre5');
        // this.torre5.setScale(0.3);
        // this.barraTiempo1 = this.add.image(980, 650, 'barraTiempo');
        // this.barraTiempo1.setScale(0.3);
        // this.barraTiempo2 = this.add.image(1120, 600, 'barraTiempo');
        // this.barraTiempo2.setScale(0.3);
        // this.barraTiempo3 = this.add.image(1260, 550, 'barraTiempo');
        // this.barraTiempo3.setScale(0.3);
        // this.barraTiempo4 = this.add.image(1400, 500, 'barraTiempo');
        // this.barraTiempo4.setScale(0.3);

        torres.create(150, 715, 'torre1').setScale(0.2).refreshBody();
        torres.create(300, 715, 'torre2').setScale(0.2).refreshBody();
        torres.create(450, 715, 'torre3').setScale(0.2).refreshBody();
        torres.create(600, 715, 'torre4').setScale(0.2).refreshBody();
        torres.create(780, 715, 'torre5').setScale(0.2).refreshBody();

        barraTiempo.create(980, 650, 'barraTiempo').setScale(0.3).refreshBody();
        barraTiempo.create(1120, 600, 'barraTiempo').setScale(0.3).refreshBody();
        barraTiempo.create(1260, 550, 'barraTiempo').setScale(0.3).refreshBody();
        barraTiempo.create(1400, 500, 'barraTiempo').setScale(0.3).refreshBody();


        // this.physics.add.existing(this.torre1, true );
        // this.physics.add.existing(this.torre2, true );
        // this.physics.add.existing(this.torre3, true );
        // this.physics.add.existing(this.torre4, true );
        // this.physics.add.existing(this.torre5, true );
        // this.physics.add.existing(this.barraTiempo1, true );
        // this.physics.add.existing(this.barraTiempo2, true );
        // this.physics.add.existing(this.barraTiempo3, true );
        // this.physics.add.existing(this.barraTiempo4, true );

        this.barraTorre = this.add.image(880, 480, 'barraElevador');
        this.barraTorre.setScale(0.3);
        this.picos = this.add.image(1200, 735, 'picos');
        this.picos.setScale(0.3);
        
        this.escalar = this.add.image(1120, 365, 'escalar');
        this.escalar.setScale(0.3);
        this.barraDiagonal = this.add.image(1510, 430, 'barraDiagonal');
        this.barraDiagonal.setScale(0.3);
        this.escalera = this.add.image(262, 230, 'escalera');
        this.escalera.setScale(0.3);

        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        // this.obstaculo1.body.setCollideWorldBounds(true);

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.barraArriba, true );
        this.physics.add.existing(this.barraArriba2, true );
        this.physics.add.existing(this.barraArriba3, true );
        this.physics.add.existing(this.barraArriba4, true );
        this.physics.add.existing(this.barraArriba5, true );
        this.physics.add.existing(this.escalera, true );
        this.physics.add.existing(this.barraCF1, true );
        this.physics.add.existing(this.barraCF2, true );
        this.physics.add.existing(this.cuerda, true );
        this.physics.add.existing(this.picos, true );
        this.physics.add.existing(this.barraTorre, true );
        this.physics.add.existing(this.barraDiagonal, true );
        this.physics.add.existing(this.puerta, true );
        this.physics.add.existing(this.barraPuerta, true );

        //Choque con Plataforma
        // this.physics.add.collider(this.javier, this.obstaculo1, () => {
        //     this.javier.setVelocity(0);
        //     this.javier.setAcceleration(0);
        // });
        this.physics.add.collider(this.javier, torres, () => {
                this.javier.setVelocity(0);
                this.javier.setAcceleration(0);
                // this.javier.body.onFloor()=true;
            });
        this.physics.add.collider(this.javier, barraTiempo, () => {
                this.javier.setVelocity(0);
                this.javier.setAcceleration(0);
                // this.javier.body.onFloor()=true;
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
    }
}

export default Bootloader;