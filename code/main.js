import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("bean", "sprites/bean.png")

// add a character to screen
const bean = add([
	// list of components
	sprite("bean"),
  //posizione x y
	pos(80, 0),
  //scala
  scale(1),
  rotate(0),
  // color(0, 0, 255),
  //collider
	area(),
  body(),
])
//jump on space
onKeyPress("space", () => {
  //jump e grounded vengono forniti da body()
  if(bean.grounded()){
    bean.jump(); 
  }
})

// add a kaboom on mouse click
onClick(() => {
	addKaboom(mousePos())
})

// burp on "b"
onKeyPress("b", burp)

//pavimento

add([
  rect(width(), 48),
  pos(0, height() - 48),
  outline(4),
  //collider
  area(),
  //rende l'oggetto inattraversabile
  solid(),
  color(127, 200, 255)
])

//ostacoli

function spawnTree(){
  add([
    rect(48, rand(24, 64)),
    area(),
    outline(4),
    pos(width(), height() - 48),
    origin("botleft"),
    color(255, 180, 255),
    move(LEFT, 240),
    "tree"
  ])

  wait(rand(0.8, 1.5), () => {
    spawnTree();
  });
}

spawnTree();

//onCollide viene dato da area()
bean.onCollide("tree", () => {
  addKaboom(bean.pos);
  shake();
})