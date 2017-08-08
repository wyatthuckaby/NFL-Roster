
function NflController() {
	/**
	 * NFL service instance
	 * @type {NflService}
	 */
	var service = new NflService();

	
	function renderPlayers(foundPlayers){

		var selectableTemplate = ``;



		//it would be a horrible idea to just plain print these out onto the render context.
		//just the computing power it would take to push that is reason enough not too.
		//so instead, we will only get the filtered players. 
		foundPlayers.forEach(player =>{
			console.log (player.firstname, player.lastname, player.pro_team)
		});
		document.getElementById("selectable-players").innerHTML = selectableTemplate;

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

}

