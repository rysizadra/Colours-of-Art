var h, s, l, id, title, artist;
var connected = false;
var colours = [];

var input;

const axi = new axidraw.AxiDraw();

function setup() {
  // create a canvas with waiting text
  createCanvas(400, 500);
  background(240);
  text("Waiting for user input... \nPick a number between 0 and 17", 10, 20);

  // load the JSON artwork data
  loadJSON('https://api.artic.edu/api/v1/artworks?page=4&limit=20', gotData);


  // create user interface elements
  input = createInput();
  input.position(100, 365);

  button = createButton('work');
  button.position(input.x + input.width, 365);
  button.mousePressed(pp);

}


// handle the data from loadJSON
function gotData(maindata) {
  for(var i=0;i<maindata.data.length;i++) {
    if(!maindata.data[i].color)
      continue;

    colours.push([
      maindata.data[i].color.h, // h
      maindata.data[i].color.s, // s
      maindata.data[i].color.l, // l
      maindata.data[i].image_id, // image id
      maindata.data[i].artist_title, // artist title
      maindata.data[i].title // artwork title
    ]);
  }
  console.log(colours)
}

// when we click the "work" button
function pp() {
  if(!connected) {
  // Note: connect() must be called from a user gesture (e.g. a mouse click) due to
   // browser security restrictions
    axi.connect()
     .then(() => {
        connected = true;
      });
  }

  background(220);

  let userinput = input.value();
  let colour = colours[userinput];

  loadImage('https://www.artic.edu/iiif/2/'+colour[3]+'/full/843,/0/default.jpg', img => {
    image(img, 10, 90, 380, 300, 0, 0, image.width, image.height);
  });

  // update h, s, and l values ready for axidraw
  h = colour[0];
  s = colour[1];
  l = colour[2];

  window.document.body.style.backgroundColor = 'hsl('+h+', '+s+'%, '+l+'%)';

  text("User input: " + userinput, 10, 20);
  text("H value: " + colour[0], 10, 40);
  text("S value: " + colour[1], 10, 60);
  text("L value: " + colour[2], 10, 80);

  text("Image ID: " + colour[3], 110, 40);
  text("Artist Title: " + colour[4], 110, 60);
  text("Artwork Title: " + colour[5], 110, 80);
  text(" This project uses the Art Institute of Chicago API to display the\n "+
  "dominant color in various artworks. In conjunction with the pen\n "
  +"plotter the data can be sonified using my custom conductive \n"+ 
  " painting and brush! ",20,420)


  if (h<=30){
    axi.moveTo(40, 40);}
      else if (h>30 && h<100){
        axi.moveTo(40, 80);}
        else if (h>=100){
          axi.moveTo(40, 120);}
        
    axi.penDown();
      axi.penUp();
  
      if (s<=30){
    axi.moveTo(80, 40);}
      else if (s>30 && s<58){
        axi.moveTo(80, 80);}
        else if (s>=58){
          axi.moveTo(80, 120);}
        
    axi.penDown();
      axi.penUp();
  
      if (l<=38){
    axi.moveTo(120, 40);}
      else if (l>38 && l<56){
        axi.moveTo(120, 80);}
        else if (l>=56){
          axi.moveTo(120, 120);}
        
    axi.penDown();
      axi.penUp();  
      axi.moveTo(0,0);
}


function draw() {

}

