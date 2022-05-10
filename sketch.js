var player, solo, playerimg,flecha;
var zumbi,zumbiimg, grupozumbis;
var bullet, bulletgroup;
var bullets=70;
var heart1,heart2,heart3;
var heart1img,heart2img,heart3img;
var gameState="Start";
var score=96;
var life=3;
var bg1, bg2, winsound, losesound, explosionsound, button;


function preload(){
   playerimg=loadImage("assets/shooter_1.webp");
   flecha=loadImage("assets/arrow.png");
   zumbiimg=loadImage("assets/zumbi.webp");
   heart1img=loadImage("assets/heart_1.png");
   heart2img=loadImage("assets/heart_2.png");;
   heart3img=loadImage("assets/heart_3.png");
   bg1=loadImage("assets/floresta.jpg");
   bg2=loadImage("assets/reino.jpg");
   winsound=loadSound("assets/win.mp3");
   losesound=loadSound("assets/lose.mp3");
   explosionsound=loadSound("assets/explosion.mp3");
}



function setup(){
   createCanvas(windowWidth-100,windowHeight-100);

   player=createSprite(100,height-100,20,100);
   player.addImage("Guerreiro",playerimg);
   player.scale=0.3;
   player.debug=true;
   player.setCollider("rectangle",0,0,300,300);

   heart1=createSprite(width-100,40);
   heart1.addImage(heart1img);
   heart1.scale=0.3;
   heart1.visible=false;
   
   heart2=createSprite(width-100,40);
   heart2.addImage(heart2img);
   heart2.scale=0.3;
   heart2.visible=false;

   heart3=createSprite(width-100,40);
   heart3.addImage(heart3img);
   heart3.scale=0.3;
  


   grupozumbis= new Group();

   bulletgroup= new Group();

   solo=createSprite(width/2,height,width,10);

   button=createButton("COMEÇAR");
   button.position(width/2,300);
   button.size(100,50);
   button.mousePressed(()=>{
       gameState="fight"
   });


}
function draw(){
    console.log(gameState);

    if(gameState==="Start"){
        background(bg1);

        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=false;
        player.visible=false;

       textSize(100);
       fill("red");
       text("Empty",450,80)


        textSize(50);
    fill("white");
    text("Destrua os monstros e conquiste o reino.",200,230);

      
       
    }




if(gameState==="fight"){
    background(bg1);

        player.visible=true;
        button.hide();

    if(life===3){
        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=true;
    }

    if(life===2){
        heart1.visible=false;
        heart2.visible=true;
        heart3.visible=false;
    }

    if(life===1){
        heart1.visible=true;
        heart2.visible=false;
        heart3.visible=false;
    }

    if(life===0){
        gameState="lost";
        heart1.visible=false;
    }

    if(score===100){
        gameState="won";
        winsound.play();
    }
    
    if(keyDown("UP_ARROW")&&player.y>height/2){
        player.y=player.y-5;
    }

    if(keyDown("DOWN_ARROW")){
        player.y=player.y+5;
    }

    if(keyDown("LEFT_ARROW")&&player.x>0){
        player.x=player.x-5;
    }

    if(keyDown("RIGHT_ARROW")){
        player.x=player.x+5;
    
    }

    if(keyDown("SPACE")){
        bullet=createSprite(player.x+20,player.y-28,20,10);
        bullet.velocityX=20;
        bullets=bullets-1;
        bullet.addImage(flecha);
        bullet.scale=0.05;
        player.depth=bullet.depth;
        player.depth+=2;

        bulletgroup.add(bullet);
    }

    if(grupozumbis.isTouching(player)){
        for(var i=0; i<grupozumbis.length;i=i+1){
            if(grupozumbis[i].isTouching(player)){
                grupozumbis[i].destroy();
                life=life-1;
                losesound.play();

            }
        }
    }

    if(grupozumbis.isTouching(bulletgroup)){
        for(var i=0;i<grupozumbis.length;i=i+1){
            if(grupozumbis[i].isTouching(bulletgroup)){
                grupozumbis[i].destroy();
                bulletgroup.destroyEach();
                explosionsound.play();
                score=score+2;
                
            }
        }
    }


    if(bullets===0){
        gameState="bullet";
        losesound.play();
    }
    
    //camera.position.x=player.position.x+width/2-100;

    /*heart1.x=player.x;
    heart2.x=player.x;
    heart3.x=player.x;*/

    player.collide(solo);

    gerarzumbi();

    textSize(20);
 fill("white");
 text("Balas:"+bullets, width-280,height/2-220);
 text("Pontos:"+score,width-280,height/2-250);
 text("Vidas:"+life,width-280,height/2-190);
}

 

if(gameState==="bullet"){
    textSize(50);
    fill("white");
    text("Você não tem mais balas",400,340);
    grupozumbis.destroyEach();
    player.destroy();
    bulletgroup.destroyEach();
}

if(gameState==="lost"){
    textSize(100);
    fill("red");
    text("você perdeu",380,340);
    grupozumbis.destroyEach();
    player.destroy();
    bulletgroup.destroyEach();
}

if(gameState==="won"){
    background(bg2);
    textSize(50);
    fill("blue");
    text("você conquistou o castelo",400,50);
    //textAlign(CENTER);
    grupozumbis.destroyEach();
    player.destroy();
    bulletgroup.destroyEach();
}

    drawSprites();
}
 
 

function gerarzumbi(){
    

    if(frameCount%50===0){
        zumbi=createSprite(random(width/2,width+100),random(height/2,height));
        zumbi.velocityX=-5;
        zumbi.addImage("zombie",zumbiimg);
        zumbi.scale=0.4;
        zumbi.debug=true;

        grupozumbis.add(zumbi);

        zumbi.lifetime=150;
    }
}
