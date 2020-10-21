
const PIXEL_SIZE =64
const WIDTH = 12
const HIGH = 10
// let w=0;
// let h=0;
// let cell_count = 0;
let STAR_COUNT = 12;
let game;




function setup() {
  
  let w = WIDTH * PIXEL_SIZE;
  let h = HIGH * PIXEL_SIZE;  
  const canvas = createCanvas(w, h);
  canvas.parent('#canvasHolder');
  game = new Game();

}
function draw() {
    background(0); 
    game.draw();
}
function mouseClicked() {   
  
  let x = parseInt(mouseX/PIXEL_SIZE); 
  let y = parseInt(mouseY/PIXEL_SIZE);
  game.check(x,y);
  
} 









class Helper{
  
  static getRandomValues(max,min,count){
    let list = []; 
    for(let i=0;i<count;i++){
      list.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return list;
  }

  static drawStar(x, y, radius1, radius2, npoints) {
    let 
    angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}


class Game
{
  constructor(){
    this._map;
    this.cellCount  = WIDTH * HIGH;
    this.visibles = 0;
    this.init();
   
  }


  get map(){return this._map;}
  set map(value){this._map=value;}

  init(){

     //se crea el array de dos dimensiones 
      this.map =  new Array(WIDTH);
      for(let i=0;i<WIDTH;i++){ 
        this.map[i] = new Array(HIGH);
      }      
      //crea las celdas dentro del mapa
      for(let y=0;y<HIGH;y++){
        for(let x=0;x<WIDTH;x++){
          this.map[x][y] =new Cell('',false,x,y);
        }
      }
      //se posicionan las estrellas al azar
      let stars = this.getStars();
      for(let i=0;i<stars.length;i++){
        let star =  stars[i];
        this.map[star.x][star.y].value  = 's';
      }
      //asigna el valor numerico segun las estrellas a su alrededor
      for(let y=0;y<HIGH;y++){
        for(let x=0;x<WIDTH;x++){
          if(this.map[x][y].value!='s')
            this.map[x][y].value = this.nearbyStars(x,y); 
        }
      }
  }  
  nearbyStars(x,y){
    // | x-1,y-1   | x, y-1  | x+1,y-1  |
    // | x-1,y     | ?       | x+1,y    |  
    // | x-1,y+1   | x,y+1   | x+1,y+1  | 
    let count=0;
    try{
      if(x>0 && y > 0 && this.map[x-1][y-1].value =='s')count++
      if(y>0 &&  this.map[x][y-1].value  =='s')count++
      if(y>0 && x <WIDTH-1 && this.map[x+1][y-1].value  =='s')count++
      if(x>0 &&  this.map[x-1][y].value  =='s')count++
      if(x<WIDTH-1 &&  this.map[x+1][y].value  =='s')count++
      if(x> 0 &&  y<HIGH-1 &&   this.map[x-1][y+1].value  =='s')count++
      if(y<HIGH-1 &&  this.map[x][y+1].value  =='s')count++
      if(x<WIDTH-1 &&  y<HIGH-1 &&  this.map[x+1][y+1].value  =='s')count++

      if(count>0)
        return count;
      else 
        return '';   
    }
    catch(error){
      console.log(error);
    }   
  }
  getStars(){
    let list = [];
    let postStart = Helper.getRandomValues(this.cellCount-1,0,STAR_COUNT);
    for(let i=0;i<postStart.length;i++){
      let n =  postStart[i];
      let x = Math.floor(n/10);
      let y = n%10;
      list.push({x:x,y:y});
    }
    return list;
  }
  draw(){
    for(let y=0;y<HIGH;y++){
      for(let x=0;x<WIDTH;x++){
        this.map[x][y].draw();
      }
    }
  }
  check(x,y){

    if(this.map[x][y].visible==false){ 
      this.map[x][y].visible=true;
      this.visibles++;
      if(this.map[x][y].value == 's'){
        this.showAll();
        this.status = 'game overt';
      }else if(this.map[x][y].value == ''){
         this.showNear(x,y)

      }
    }
  }

  showAll(){
    for(let y=0;y<HIGH;y++){
      for(let x=0;x<WIDTH;x++){
        this.map[x][y].visible=true
      }
    }
  }
  showNear(x,y){

    if(x>0 && y > 0 )this.showNearCell(x-1,y-1);
    if(y>0 )this.showNearCell(x,y-1);
    if(y>0 && x <WIDTH-1 )this.showNearCell(x+1,y-1);
    if(x>0 )this.showNearCell(x-1,y);
    if(x<WIDTH-1)this.showNearCell(x+1,y);
    if(x> 0 &&  y<HIGH-1)this.showNearCell(x-1,y+1);
    if(y<HIGH-1 )this.showNearCell(x,y+1);
    if(x<WIDTH-1 &&  y<HIGH-1)this.showNearCell(x+1,y+1);
  }
  showNearCell(x,y){
    if(!this.map[x][y].visible && this.map[x][y].value ==''){
      this.map[x][y].visible =true;
      this.showNear(x,y);
    }
  }
}




class Cell
{
    constructor(value,visible,x,y){
      this._value = value;
      this._visible = visible;
      this._x = x;
      this._y = y;
    }  
  
    get value(){return this._value;}
    set value(value){this._value=value;}
    get visible(){return this._visible;}
    set visible(value){ this._visible=value;}
    get x(){return this._x;}
    set x(value){ this._x=value;}
    get y(){return this._y;}
    set y(value){ this._y=value;}

    check(){
      if(this.visible==false) 
        this.visible=true;

    }

    draw(){

      if(this._visible){ 
        
        fill('#222222');
          rect(PIXEL_SIZE*this.x,PIXEL_SIZE*this.y,PIXEL_SIZE,PIXEL_SIZE);        
        
        if(this._value=='s'){
          fill('#bcda18');
          Helper.drawStar((PIXEL_SIZE/2)*(1+(2*this.x)), (PIXEL_SIZE/2)*(1+(2*this.y)), PIXEL_SIZE/4, PIXEL_SIZE/2, 5);   
        }
        else if(this._value!=''){
          fill('#888888');
          text(this._value, (PIXEL_SIZE/2)*(1+(2*this.x)), (PIXEL_SIZE/2)*(1+(2*this.y)), 300, 350);
        }
      }else{
        fill('#2364AA');
        rect(PIXEL_SIZE*this.x,PIXEL_SIZE*this.y,PIXEL_SIZE,PIXEL_SIZE);
      }
    }



}

