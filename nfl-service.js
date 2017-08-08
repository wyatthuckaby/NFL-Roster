function NflService() {

    /**
     * Players Object
     * @type {Array}
     */
    var players = [];

    /**
     * Loads player data either from localStorage or nfl API.
     * @return {void} not applicable
     */
    function loadPlayerData(){
        var localst = localStorage.getItem("BCWLocalNFL");
        if (localst){
            players = JSON.parse(localst);
            return; //bail out to prevent re-getting the NFL database.
        }


        var api = "//bcw-getter.herokuapp.com/?url=" + 
        encodeURIComponent("https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json");


        console.log ("Please Wait... Retriving NFL Data into local storage");
        $.getJSON(api, function(data){
            playersData = data.body.players;
            localStorage.setItem("BCWLocalNFL", JSON.stringify(playersData));
            console.log("Success!");
        });
    }



    //NOTE: If running on ES5 syntax be sure to replace the filter
    //callbacks below with actuall functions. '=>' is only es6 compliant.
    /**
     * Filters through the player objects by team
     * @param  {string} team query
     * @return {array}  results
     */
    function getPlayersByTeam(team){
        var arr = [];
        arr = players.filter(player => {
            if (player.pro_team === team) 
                return true;
            
        });
        return arr;
    }


    /**
     * Filters through the player objects by field position
     * @param  {string} pos query
     * @return {array}   results
     */
    function getPlayersByPosition  (pos){
        var arr = [];
        arr = players.filter(player => {
            if (player.position === pos) 
                return true;
        });


        return arr;
    }


    /**
     * Filters players by name
     * @param  {string} name query
     * @return {array}      results
     */
    function getPlayersByName(name){
        var arr = [];
        //i want to parse both the first and last name at the same time
        //for the maximum chance for the user finding the result they want.
        arr = players.filter(player => {
            if (player.firstname === name || player.lastname === name)
                return true;
        });

        return arr;
    }


    /**
     * Returns value seperated player object.
     * @return {array} players 
     */
    this.getPlayers = function() {
        return JSON.parse(JSON.stringify(players)); 
    }

    this.searchPlayers = function (name,team,pos,cb){
        var foundPlayers = [];
        //check if anything isnt quite right.
        if (!name && !team && !pos) return; /*TODO Find better way to do this*/
        if (name){
            foundPlayers = foundPlayers.concat(getPlayersByName(name));
        }
        if (team) {
            foundPlayers = foundPlayers.concat(getPlayersByTeam(team));
        }
        if (pos) {
            foundPlayers = foundPlayers.concat(getPlayersByPosition(pos));
        }

        cb(foundPlayers);
    }


    loadPlayerData();
}