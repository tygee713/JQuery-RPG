
var characterPicked;
var enemyPicked;
var enemyBattling = false;
var playerWon;
var enemies = [];

var ryu = {
	name: "ryu",
	display: "Ryu",
	health: 120,
	attack: 5,
	baseAttack: 5,
	counterAttack: 12,
	iconPath: "assets/images/RyuSelect.jpg",
	charSpritePath: "assets/images/sprites/Ryu.gif",
	enemySpritePath: "assets/images/sprites/Ryu2.gif"
}
var ken = {
	name: "ken",
	display: "Ken",
	health: 80,
	attack: 9,
	baseAttack: 9,
	counterAttack: 13,
	iconPath: "assets/images/KenSelect.jpg",
	charSpritePath: "assets/images/sprites/Ken.gif",
	enemySpritePath: "assets/images/sprites/Ken2.gif"
}
var chunli = {
	name: "chunli",
	display: "Chun Li",
	health: 54,
	attack: 16,
	baseAttack: 16,
	counterAttack: 20,
	iconPath: "assets/images/ChunSelect.jpg",
	charSpritePath: "assets/images/sprites/ChunLi.gif",
	enemySpritePath: "assets/images/sprites/ChunLi2.gif"
}
var mbison = {
	name: "mbison",
	display: "M. Bison",
	health: 200,
	attack: 2,
	baseAttack: 2,
	counterAttack: 11,
	iconPath: "assets/images/BisonSelect.jpg",
	charSpritePath: "assets/images/sprites/Bison.gif",
	enemySpritePath: "assets/images/sprites/Bison2.gif"
}

var characters = [ryu, ken, chunli, mbison];

$(".playerCharPick").on("click", function() {
	characterPicked = eval($(this).data("obj"));
	$("#playerCharArea").append('<img src="'+ characterPicked.charSpritePath + '" class="image" data-obj="' + characterPicked.name + '">');
	$("#playerCharArea").show();
	updatePlayerStats();
	$("#playerCharSelection").empty();
	for (i=0;i<characters.length;i++) {
		if (characters[i].name !== characterPicked.name) {
			$("#enemyCharSelection").append('<div class = "col-md-3 cont"><img src="' + characters[i].iconPath + '" class="enemyCharPick" data-obj="' + characters[i].name + '"></div>');
		}
	}

});

$("#enemyCharSelection").on("click", ".enemyCharPick", function() {
	if (!enemyBattling) {
		enemyPicked = eval($(this).data("obj"));
		$("#enemyCharArea").append('<img src="'+ enemyPicked.enemySpritePath + '" class="image" id="enemyChar" data-obj="' + enemyPicked.name + '">');
		$("#enemyCharArea").show();
		updateEnemyStats();
		$("#attack").show();
		$(this).hide();
		enemies.push(enemyPicked);
		enemyBattling = true;
	}
});

$(".attack").on("click", function() {
	// Player attacks enemy, enemy loses health equal to player attk
	// Player attack increases by base amount
	// If enemy is not dead, enemy counter attacks, player loses health equal to enemy counter attk
	if (enemyBattling == true) {

		enemyPicked.health -= characterPicked.attack;
		characterPicked.attack += characterPicked.baseAttack;
		updateEnemyStats();

		if (enemyPicked.health <= 0) { //Checks to see if enemy has been defeated
			$("#enemyChar").remove();
			$("#enemyHealth").html("");
			enemyBattling = false;
			if (enemies.length == 3) { //Once all 3 enemies have been fought
				var enemyLiving = false;
				for (i=0; i<enemies.length;i++) {
					if (enemies[i].health > 0) {
						enemyLiving = true;
					}
				}
				if (enemyLiving == false) { //Once all 3 enemies have 0 health
					playerWon = true;
					$("#result").html("Player 1 Wins!");
					$(".attack").hide();
				}
			}
		}

		else {
			characterPicked.health -= enemyPicked.counterAttack;
			updatePlayerStats();
				if (characterPicked.health <= 0) { //Checks to see if player has been defeated
					playerLoss = false;
					$("#result").html("CPU Wins");
					$(".attack").hide();
				}
		}
		
	}
	else {
		alert("Please select another enemy");
	}
});

$(".newGame").on("click", function() {
	location.reload();
})

function updatePlayerStats() {
	$("#playerHealth").html("HP: " + characterPicked.health + "<br />Attack: " + characterPicked.attack);
	$("#playerName").html(characterPicked.display);
}
function updateEnemyStats() {
	$("#enemyHealth").html("HP: " + enemyPicked.health + "<br />Attack: " + enemyPicked.attack);
	$("#enemyName").html(enemyPicked.display);
}