class Fisicas2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Fisicas2'
        });
    }

    init() {
        console.log('Escena Fisicas2');
    }
    
    preload() {
        this.load.path = './assets/';
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        'escalera', 'ninja','fondo_opc1','coleccionable','end']);
        this.load.audio('gong', ['./gong.mp3']);
        this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
    }

    create() {
        //MÚSICA
        this.gong = this.sound.add('gong',{loop:false});
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        //this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(0.8);
        this.end = this.add.image(250, 60, 'instrucciones').setDepth(4).setScale(0.15).setDepth(2);
        //this.instrucciones = this.add.image(800, 220, 'end').setDepth(4).setScale(0.3).setAlpha(0);
        this.javier = this.physics.add.image(50, 10, 'ninja').setScale(0.1);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        this.javier.body.setMass(1);
        
        // this.puerta = this.physics.add.image(1460, 135, 'puerta').setScale(0.7);
        // this.puerta.body.setAllowGravity(false);
        // this.puerta.body.setImmovable(true);

        //GRUPO BARRAS ARRIBA
        this.barrasArriba = this.physics.add.staticGroup();
        this.barrasArriba.create(45,150, 'barraArriba1').setScale(0.6).refreshBody()
        this.barrasArriba.create(200,200, 'barraArriba1').setScale(0.6).refreshBody();
        this.barrasArriba.create(810,255, 'barraArriba1').setScale(0.8).refreshBody();
        this.barrasArriba.create(1450,200, 'barraArriba1').setScale(0.6).refreshBody();

        //ESCALAR
        this.escalar = this.add.image(400, 300, 'escalar').setScale(0.27);
        this.escalar2 = this.add.image(1375, 247, 'escalar').setScale(0.27);

        //CUERDA
        this.cuerda = this.add.image(590, 246, 'cuerda').setScale(0.75);

        //COLECCIONABLE
        this.objeto = this.physics.add.image(1400,100,'coleccionable').setScale(.3);
        this.objeto.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto, collectObjeto, null, this);
        function collectObjeto (jugador, objeto)
        {
            objeto.disableBody(true, true);
            console.log("Entro a collectObjeto");
            console.log(this.barrasArriba);
            // this.barrasArriba.getChildren()[2].enableBody(false,0,0,true,true);
            // this.barrasArriba.getChildren()[3].enableBody(false,0,0,true,true);
            // this.barrasArriba.getChildren()[4].enableBody(false,0,0,true,true);   
        }
        
        var picos = this.physics.add.staticGroup();
        picos.create(1000, 760, 'picos').setScale(0.15).refreshBody();
        picos.create(310, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        picos.create(660, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        picos.create(1340, 760, 'picos').setScale(0.15).refreshBody();
        picos.create(1690, 760, 'picos').setScale(0.15).refreshBody();
        
        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        // this.barraTorre.children.iterate( (torreT) => {
        //     torreT.setCollideWorldBounds(true);
        //     torreT.body.setAllowGravity(false);
        // } );
        // barraTorre.group.setCollideWorldBounds(true);
        // barraTorre.onWorldBounds = true;

        // this.obstaculo1.body.setCollideWorldBounds(true);

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        //FÍSICAS Y COLISIONES
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.escalar2, true );
        this.physics.add.existing(this.cuerda, true );


        //Choque con Plataforma
        // this.physics.add.collider(this.javier, this.obstaculo1, () => {
        //     this.javier.setVelocity(0);
        //     this.javier.setAcceleration(0);
        // });
        // this.physics.add.collider(this.javier, torres);

        // this.physics.add.collider(this.javier, barraTiempo, () => {
        //     //algo
        // });
        // this.physics.add.collider(this.javier, this.barraTorre, () => {
        //     //algo
        // });
        // this.physics.add.collider(this.javier, this.barraDiagonal);
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.barrasArriba);
        this.physics.add.collider(this.javier, this.cuerda, () => {
            this.javier.setVelocityX(0);
            this.javier.setAccelerationX(0);
        });
        this.physics.add.collider(this.javier, this.escalar2);
        //Choque con picos
        this.physics.add.collider(this.javier, picos, () => {
            //this.musicaFondo.stop();
            this.scene.restart();
        });
        // //CHOQUE CON PUERTA / FINAL DE NIVEL
        // this.physics.add.collider(this.javier, this.puerta, () => {
        //     //console.log("Llegó a puerta");
        //     this.gong.play();
        //     //this.instrucciones.setAlpha(0);
        //     this.sound.pauseAll();
        //     this.scene.start("Fisicas2"); 
        //     //this.end.setAlpha(1);
        //     //this.fondo.setDepth(3).setAlpha(1);
        // });
    }


    update(time, delta) {
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

        if ((this.cursors.up.isDown && this.javier.body.onFloor())||(this.cursors.up.isDown /*&& this.barraTorre.getChildren()[0].body.touching.up*/))
        {
            this.javier.setVelocityY(-500);
        }
        if (this.cursors.up.isDown && this.escalar.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.y -= 3;
        }
        if (this.cursors.up.isDown && this.escalar2.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.y -= 3;
        }

        // if(this.barraTorre.getChildren()[0].y>769){
        //     this.barraTorre.getChildren()[0].disableBody(true, true);
        // }

    }


}

export default Fisicas2;