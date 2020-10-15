const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width  / scale;
const game=false;



function gameOver(){
    
    ctx.font = "50px Arial";
    ctx.textAlign="center"
    ctx.fillStyle="white"
    ctx.fillText("Game over",canvas.width/2,canvas.height/2);
}

function Snake(){
    this.x =0;
    this.y=0;
    this.xSpeed = scale*1;
    this.ySpeed = 0;
    this.acceleration;
    this.total= 0;
    this.tail= [];

    this.gameSpeed=200;

    this.draw = function(){
        ctx.fillStyle = 'red';


        for(let i = 0; i< this.tail.length; i++){
            ctx.fillRect(this.tail[i].x,this.tail[i].y,scale,scale);
    
        }


        ctx.fillRect(this.x,this.y,scale,scale);
    }

    this.update = function() {

        //Grow snake
        for(let i = 0 ; i < this.tail.length -1 ; i++){
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total -1] = {x:this.x,y:this.y};


        this.x += this.xSpeed;
        this.y += this.ySpeed;


    //Don't let colide
        if(this.x + scale> canvas.width){
            this.x=0;
        }if(this.x < 0){
            this.x=canvas.width;
        }
        if(this.y + scale > canvas.height){
            this.y=0;   
        }if(this.y < 0){
            this.y =canvas.height;
        }
         
    //If snake touch it self

        this.checkCollision = function (){
            for(let i = 0; i < this.tail.length -1; i++){
                if(this.x === this.tail[i].x && this.y === this.tail[i].y){
                    return true
                }
            }
        }
        

        
    }

    this.changeDirection = function(direction){
        switch(direction){
            case 'Up':
                this.xSpeed=0;
                this.ySpeed= scale * -1;
            break;
            case 'Down':
                this.xSpeed=0;
                this.ySpeed= scale * 1;
            break;
            case 'Left':
                this.xSpeed= scale * -1;
                this.ySpeed= 0;
            break;
            case 'Right':
                this.xSpeed= scale * 1;
                this.ySpeed= 0;
            break;

        }
    }

    this.eat = function(fruit) {
        if(this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }

        return false
    }
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function (){
        this.x = (Math.floor(Math.random()* rows - 1) +1) * scale;
        this.y = (Math.floor(Math.random()* columns - 1) +1) * scale;
    }
    this.draw = function(){
        ctx.fillStyle= "green";
        ctx.fillRect(this.x,this.y,scale,scale);
    }
}

window.addEventListener('keydown',function(e){
    const direction = e.key.replace('Arrow','');
    snake.changeDirection(direction);
});

let snake = new Snake();
let fruit = new Fruit();
fruit.pickLocation();


    


    window.setInterval(()=>{

        
       ctx.clearRect(0,0,canvas.width,canvas.height);
        
       if(game){
        gameOver();
       }
        
        fruit.draw();
        snake.update();
        snake.draw();
    
        if(snake.eat(fruit)) {
            fruit.pickLocation();
        }
        if(snake.checkCollision()){
            gameOver=true;
        }
    
    
    },100);


