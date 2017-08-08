function NflService() {

    /**
     * Players Object
     * @type {Array}
     */
    var players = [];

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


    /**
     * @return {value based player object}
     */
    this.getPlayers = function() {
        return JSON.parse(JSON.stringify(players)); 
    }


    loadPlayerData();
}