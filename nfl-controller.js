
function NflController() {
	/**
	 * NFL service instance
	 * @type {NflService}
	 */
	var service = new NflService();

	function renderRoster(players){
		var selectedTemplate = ``;
		var playerKeys = Object.keys(players);
		// players.forEach(player => {
			// selectedTemplate += `
			// 	<div class="col-xs-12 col-sm-6 card">
			// 		<img class="player-image img-responsive" src = "${players[playerKeys[i]].photo}" >
			// 		<h2> ${players[playerKeys[i]].firstname} ${players[playerKeys[i]].lastname} </h2>
			// 		<h3> ${players[playerKeys[i]].position} - ${players[playerKeys[i]].pro_team} </h3>
			// 		<button onclick="app.controllers.nflController.removeRoster('${players[playerKeys[i]].elias_id}')
			// 		" class="btn">Remove</button>
			// 	</div>
			// `;
		// });
		// 
		// 
		// 

		for (var i = playerKeys.length - 1; i >= 0; i--) {
			//console.log (players[playerKeys[i]]);


			selectedTemplate += `
				<div class="col-xs-12 col-sm-6 card">
					<img class="player-image img-responsive" src = "${players[playerKeys[i]].photo}" >
					<h2> ${players[playerKeys[i]].firstname} ${players[playerKeys[i]].lastname} </h2>
					<h3> ${players[playerKeys[i]].position} - ${players[playerKeys[i]].pro_team} </h3>
					<button onclick="app.controllers.nflController.removeRoster('${players[playerKeys[i]].elias_id}')
					" class="btn">Remove</button>
				</div>
			`;
		}

		document.getElementById("selected-players").innerHTML = selectedTemplate;
	}
	function renderPlayers(foundPlayers){

		var selectableTemplate = ``;



		//it would be a horrible idea to just plain print these out onto the render context.
		//just the computing power it would take to push that is reason enough not too.
		//so instead, we will only get the filtered players. 
		foundPlayers.forEach(player =>{
			// console.log (player.firstname, player.lastname, player.pro_team)
			// 
			// Object { bye_week: "8", firstname: "John", photo: 
			// "http://sports.cbsimg.net/images/foo…", position: "WR", icons: Object, lastname:
			//  "Brown", age: 27, elias_id: "BRO494712", pro_status: "A", jersey: "12", 3 more… }
			
			selectableTemplate += `
				<div class="col-xs-12 col-sm-6 card">
					<img class="player-image img-responsive" src = "${player.photo}" >
					<h2> ${player.firstname} ${player.lastname} </h2>
					<h3> ${player.position} - ${player.pro_team} </h3>
					<button onclick="app.controllers.nflController.addRoster('${player.elias_id}')
					" class="btn">Add to Roster</button>
				</div>
			`;
		});
		document.getElementById("selectable-players").innerHTML = selectableTemplate;

	}


	/**
	 * Only runs once; Checks for existing roster data
	 * @return {[type]} [description]
	 */
	function initRoster(){
		service.initRoster();
	}

	/**
	 * search players function
	 * @param  {"event"} e event
	 * 
	 */
	this.searchPlayers = function(e){
		e.preventDefault(); //stops default reload

		service.searchPlayers(
			e.target["name-search"].value,
			e.target["team-search"].value,
			e.target["pos-search"].value,
			renderPlayers);
		//console.log (e.target.name-search.value);

	}

	this.addRoster = function(id){
		service.addPlayerToRoster(id, renderRoster);
		//console.log(id);
	}


	this.removeRoster = function(id){
		service.removePlayerFromRoster(id, renderRoster);
		console.log(id);
	}


	service.initRoster(renderRoster);

}

