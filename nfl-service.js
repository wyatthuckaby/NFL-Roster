function NflService() {

    /**
     * Players Object
     * @type {Array}
     */
    var players = [];
    var roster = {};
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



    /**
     * adds player to roster and runs callback with roster array
     * @param {String????}   id the NFL ID thing... K
     * @param {Function} cb 
     */
    this.addPlayerToRoster = function (id, cb){
        if (Object.keys(roster).length >= 5){
            //no more.
            swal ('No more room!', 'Only 5 players can be rostered!', 'error');
            return;
        }
        players.forEach(player => {
            if (player.elias_id == id){
                roster[player.elias_id] = player;
                return;
            }
        });

        localStorage.setItem("BCWLocalNFLRoster", JSON.stringify(roster));
        cb (roster);

    }


    this.removePlayerFromRoster = function(id, cb){
        var playerKeys = Object.keys(roster);
        for (var i = playerKeys.length - 1; i >= 0; i--) {
            if (roster[playerKeys[i]].elias_id == id){
                delete roster[playerKeys[i]];
            }
        }
        localStorage.setItem("BCWLocalNFLRoster", JSON.stringify(roster));
        cb (roster);
    }


    this.initRoster = function(cb){
        var toCheck = localStorage.getItem("BCWLocalNFLRoster");
        //catches both null and undef in case something is REALLY wrong.
        if (!toCheck){
            console.log ("Roster data missing... Skipping pre-render");
        } else {
            console.log ("Roster data is present. Pulling in old data..");
            roster = JSON.parse(toCheck);
        }
        cb(roster);
    }
    loadPlayerData();
}