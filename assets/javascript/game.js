

			console.log("Game has started");

		var characterPicked;
		var enemyPicked;
		var enemyBattling = false;

		$(".attack").hide();
		$("#playerCharArea").hide();
		$("#enemyCharArea").hide();

		var ryu = {
			name: "ryu",
			health: 150,
			attack: 10,
			counterAttack: 10,
			iconPath: "assets/images/RyuSelect.jpg",
			charSpritePath: "assets/images/sprites/Ryu.gif",
			enemySpritePath: "assets/images/sprites/Ryu2.gif"
		}
		var ken = {
			name: "ken",
			health: 100,
			attack: 15,
			counterAttack: 15,
			iconPath: "assets/images/KenSelect.jpg",
			charSpritePath: "assets/images/sprites/Ken.gif",
			enemySpritePath: "assets/images/sprites/Ken2.gif"
		}
		var chunli = {
			name: "chunli",
			health: 50,
			attack: 5,
			counterAttack: 20,
			iconPath: "assets/images/ChunSelect.jpg",
			charSpritePath: "assets/images/sprites/ChunLi.gif",
			enemySpritePath: "assets/images/sprites/ChunLi2.gif"
		}
		var mbison = {
			name: "mbison",
			health: 200,
			attack: 5,
			counterAttack: 5,
			iconPath: "assets/images/BisonSelect.jpg",
			charSpritePath: "assets/images/sprites/Bison.gif",
			enemySpritePath: "assets/images/sprites/Bison2.gif"
		}

		var characters = [ryu, ken, chunli, mbison];

		$(".playerCharPick").on("click", function() {
			characterPicked = $(this).data("obj");
			$("#playerCharArea").append('<img src="'+ eval(characterPicked).charSpritePath + '" class="image" data-obj="' + characterPicked + '">');
			$("#playerCharArea").show();
			$("#playerCharSelection").empty();
			for (i=0;i<characters.length;i++) {
				if (characters[i].name !== eval(characterPicked).name) {
					$("#enemyCharSelection").append('<div class = "col-md-3 cont"><img src="' + characters[i].iconPath + '" class="enemyCharPick" data-obj="' + characters[i].name + '"></div>');
				}
				console.log("iteration" + i);
			}

		});

		$("#enemyCharSelection").on("click", ".enemyCharPick", function() {
			if (!enemyBattling) {
				enemyPicked = $(this).data("obj");
				$("#enemyCharArea").append('<img src="'+ eval(enemyPicked).enemySpritePath + '" class="image" data-obj="' + enemyPicked + '">');
				$("#enemyCharArea").show();
				$(".attack").show();
				$(this).hide();
				enemyBattling = true;
			}
		});

$(".newGame").on("click", function() {
	location.reload();
})