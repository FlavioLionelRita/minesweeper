
const PIXEL_SIZE =64
const speed = 3;

const WIDTH=10
const HIGH = 10
let w=0;
let h=0;
let pos_x = 0;
let pos_y = 0;
let cont=0;
let cell_count = 0;
let start_count = 7;
let postStart = [];


function setup() {
  // put setup code here
  w = WIDTH * PIXEL_SIZE;
  h = HIGH * PIXEL_SIZE;
  cell_count  = WIDTH * HIGH;
  postStart = getRandomValues(cell_count-1,0,start_count);
  const canvas = createCanvas(w, h);
  canvas.parent('#canvasHolder');
}

function draw() {
    background(0); 

   
    fill('#2364AA');
    for(let y=0;y<HIGH;y++){
      for(let x=0;x<HIGH;x++){
        rect(PIXEL_SIZE*x,PIXEL_SIZE*y,PIXEL_SIZE,PIXEL_SIZE);
      }
    } 
    
    for(let i=0;i<postStart.length;i++){
        let n =  postStart[i];
        let x = Math.floor(n/10);
        let y = n%10;
        fill('#bcda18');
        star((PIXEL_SIZE/2)*(1+(2*x)), (PIXEL_SIZE/2)*(1+(2*y)), PIXEL_SIZE/4, PIXEL_SIZE/2, 5);        
    }
}


function getRandomValues(max,min,count){
  let list = []; 
  for(let i=0;i<count;i++){
    list.push(Math.floor(Math.random() * (max - min)) + min);
  }
  return list;
}


function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
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

