import kaboom from "kaboom"

// initialize context
kaboom({
  background: [252, 186, 3]
})

// load assets
loadSprite("bean", "sprites/bean.png");

let score = 0;



scene("lose", () => {
	add([
		text("Game Over"),
    pos(center()),
    origin("center")
	]);

  	add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
		origin("center"),
	]);

	// go back to game with space is pressed
	onKeyPress("space", () =>{
    score = 0;
    go("game")
  });
	onClick(() => go("game"));
})

scene("game", () => {
  const scoreLabel = add([
     text(score),
    pos(24, 24)
  ]);
  // add a character to screen
  onUpdate(() => {
	  score++;
	  scoreLabel.text = score;
  });
  
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

  onKeyPress("space", () => {
    //jump e grounded vengono forniti da body()
    if(bean.grounded()){
      bean.jump(); 
    }
  })

  // onClick(() => {
	 //  addKaboom(mousePos())
  // })

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

  bean.onCollide("tree", () => {
    addKaboom(bean.pos);
    shake();
    go("lose")
  })
})


go("game")



//onCollide viene dato da area()
