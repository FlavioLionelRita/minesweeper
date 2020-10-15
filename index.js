
const PIXEL_SIZE =64
const speed = 3;

const WIDTH=10
const HIGH = 10
let w=0;
let h=0;
let pos_x = 0;
let pos_y = 0;
let cont=0;
let cell_count=0;



function setup() {
  // put setup code here
  w = WIDTH * PIXEL_SIZE;
  h = HIGH * PIXEL_SIZE;
  cell_count  = WIDTH * HIGH;
  const canvas = createCanvas(w, h);
  canvas.parent('#canvasHolder');

 
}

function draw() {
    background(0);    
    //fill('#2364AA');
    stroke(153);
    line(0, h/2, w, h/2);
    line(w/2, 0, w/2, h);

    for(let x=(w/2)*-1;x<w/2;x++){      
      let y = Math.sqrt(x)+10;// x+10;
     

      let coord =  getCoordinate(x,y);
      point(coord.x,coord.y);
    }
  }

  function getCoordinate(x,y){
    return {x: x+(w/2),y:(h/2)-y };

  }
    

  //Ejercicio 1 : dibujar 10 lineas  horizontales (usando for)
  //Ejercicio 2 : dibujar 10 lineas  horizontales y 10 lineas verticales  (usando for)




