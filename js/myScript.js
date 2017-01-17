//Gamemode selection function, alters between quickplay and competitive
var gamemode = function() {
	$("#gamemode").click(function(){
		var $gamemode = $("#gamemode").text();

		if($gamemode === "Quickplay") {
			$("#gamemode").text("Competitive");
		} else if($gamemode === "Competitive") {
			$("#gamemode").text("Quickplay");
		}
	});
};

//Fetches a users profile through battletag, platform and region. Then displays data from your account
var fetchprofile = function() {
	$("#fetchprofile").click(function(){
		var $btag = $("#btag").val().replace("#", "-");
		var $platform = $('input[name="platform"]:checked').val();
		var $region = $('input[name="region"]:checked').val();
		var $mainrow = $("#mainrow");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/profile",
			dataType: "json",
			success: function(d){
				$mainrow.empty();
				var $profileImg = d.data.avatar;
				var $username = d.data.username;
				var $level = d.data.level;
				var $quickPlaytime = d.data.playtime.quick;
				var $compPlaytime = d.data.playtime.competitive;
				var $quickWins = d.data.games.quick.wins;
				var $compWins = d.data.games.competitive.wins;
				var $compLoss = d.data.games.competitive.lost;
				var $compPlayed = d.data.games.competitive.played;
				var $compRank = d.data.competitive.rank;
				var $compRankImg = d.data.competitive.rank_img;

				if($compWins === undefined || null){
					var $compWins = "-";
				}
				if($compLoss === null || undefined){
					var $compLoss = "-";
				}
				if($compRank === null || undefined){
					var $compRank = "-";
				}

				$("<img>").attr("src", $profileImg).appendTo($mainrow);
				$("<h2>" + $username + "</h2>").addClass("center").appendTo($mainrow);
				$("<h3>Level: " + $level + "</h3>").addClass("center").appendTo($mainrow);
				$("<h3>Playtime</h3>").addClass("center").appendTo($mainrow);
				$("<h4>Quickplay: " + $quickPlaytime + "</h4>").addClass("col-xs-6 center").appendTo($mainrow);
				$("<h4>Competitive: " + $compPlaytime + "</h4>").addClass("col-xs-6 center").appendTo($mainrow);
				$("<h3>Wins/Losses</h3>").addClass("center").appendTo($mainrow);
				$("<h3>Quickplay</h3>").addClass("center").appendTo($mainrow);
				$("<h4>" + $quickWins + " Won</h4>").addClass("center").appendTo($mainrow);
				$("<h3>Competitive</h3>").addClass("center").appendTo($mainrow);
				$("<h4>" + $compWins + " Won</h4>").addClass("center").appendTo($mainrow);
				$("<h4>" + $compLoss + " Lost</h4>").addClass("center").appendTo($mainrow);
				$("<h4>" + $compPlayed + " Played</h4>").addClass("center").appendTo($mainrow);
				$("<img>").attr("src", $compRankImg).appendTo($mainrow);
				$("<h3>" + $compRank + " Rating</h3>").addClass("center").appendTo($mainrow);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus, errorThrown);
			}
		});
	});
};

//Fetches a users total statistics in either quickplay or competitive and displays that data
var fetchtotal = function() {
	$("#fetchtotal").click(function(){
		var $btag = $("#btag").val().replace("#", "-");
		var $platform = $('input[name="platform"]:checked').val();
		var $region = $('input[name="region"]:checked').val();
		var $gamemode = $("#gamemode").text().toLowerCase();
		var $mainrow = $("#mainrow");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/allHeroes/",
			dataType: "json",
			success: function(d){
				$mainrow.empty();
				var $meeleFinalBlows = d.MeleeFinalBlows;
				var $soloKills = d.SoloKills;
				var $objectiveKills = d.ObjectiveKills;
				var $finalBlows = d.FinalBlows;
				var $damageDone = d.DamageDone;
				//
				var $eliminations = d.Eliminations;
				var $environmentalKills = d.EnvironmentalKills;
				var $multiKills = d.Multikills;
				var $reconAssists = d.ReconAssists;
				var $healingDone = d.HealingDone;
				//
				var $teleporterPadsDestroyed = d.TeleporterPadsDestroyed;
				var $mostElimInGame = d["Eliminations-MostinGame"];
				var $mostFinalBlowsInGame = d["FinalBlows-MostinGame"];
				var $mostDamageInGame = d["DamageDone-MostinGame"];
				var $mostHealingInGame = d["HealingDone-MostinGame"];
				//
				var $mostDefAssInGame = d["DefensiveAssists-MostinGame"];
				var $mostOffAssInGame = d["OffensiveAssists-MostinGame"];
				var $mostObjKillsInGame = d["ObjectiveKills-MostinGame"];
				var $mostObjTimeInGame = d["ObjectiveTime-MostinGame"];
				var $multiKillBest = d["Multikill-Best"];
				//
				var $soloKillsInGame = d["SoloKills-MostinGame"];
				var $onFireInGame = d["TimeSpentonFire-MostinGame"];
				var $meeleFinalAvg = d["MeleeFinalBlows-Average"];
				var $onFireAvg = d["TimeSpentonFire-Average"];
				var $soloKillsAvg = d["SoloKills-Average"];
				//
				var $objTimeAvg = d["ObjectiveTime-Average"];
				var $objKillsAvg = d["ObjectiveKills-Average"];
				var $healingDoneAvg = d["HealingDone-Average"];
				var $finalBlowsAvg = d["FinalBlows-Average"];
				var $deathAvg = d["Deaths-Average"];
				//
				var $dmgDoneAvg = d["DamageDone-Average"];
				var $elimAvg = d["Eliminations-Average"];
				var $deaths = d.Deaths;
				var $environmentalDeaths = d.EnvironmentalDeaths;
				var $cards = d.Cards;
				//
				var $medals = d.Medals;
				var $goldMedals = d["Medals-Gold"];
				var $silverMedals = d["Medals-Silver"];
				var $bronzeMedals = d["Medals-Bronze"];
				var $gamesWon = d.GamesWon;
				//
				var $onFire = d.TimeSpentonFire;
				var $objTime = d.ObjectiveTime;
				var $timePlayed = d.TimePlayed;
				var $mostMeeleFinalInGame = d["MeleeFinalBlows-MostinGame"];
				var $reconAssAvg = d["ReconAssists-Average"];
				//
				var $defensiveAss = d.DefensiveAssists;
				var $defensiveAssAvg = d["DefensiveAssists-Average"];
				var $offensiveAss = d.OffensiveAssists;
				var $offensiveAssAvg = d["OffensiveAssists-Average"];

				console.log($defensiveAss);
				console.log($defensiveAssAvg);
				console.log($offensiveAss);
				console.log($offensiveAssAvg);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus, errorThrown);
			}
		});
	});
};

//Fetches a users hero playtime in either quickplay or competitive and displays that data
var fetchplaytime = function() {
	$("#fetchplaytime").click(function(){
		var $btag = $("#btag").val().replace("#", "-");
		var $platform = $('input[name="platform"]:checked').val();
		var $region = $('input[name="region"]:checked').val();
		var $gamemode = $("#gamemode").text().toLowerCase();
		var $mainrow = $("#mainrow");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/heroes",
			dataType: "json",
			success: function(d) {
				$mainrow.empty();
				console.log(d[0].name);
				console.log(d[1].name);
				console.log(d[2].name);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus, errorThrown);
			}
		});
	});
};

$(document).ready(gamemode);
$(document).ready(fetchprofile);
$(document).ready(fetchtotal);
$(document).ready(fetchplaytime);