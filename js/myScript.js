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
				//Quickplay
				//Meele
				var $meeleFinalBlows = d.MeleeFinalBlows;
				var $meeleFinalAvg = d["MeleeFinalBlows-Average"];
				var $mostMeeleFinalInGame = d["MeleeFinalBlows-MostinGame"];
				//Eliminations/Kills
				var $eliminations = d.Eliminations;
				var $elimAvg = d["Eliminations-Average"];
				var $mostElimInGame = d["Eliminations-MostinGame"];
				var $soloKills = d.SoloKills;
				var $soloKillsAvg = d["SoloKills-Average"];
				var $soloKillsInGame = d["SoloKills-MostinGame"];
				var $objKills = d.ObjectiveKills;
				var $objKillsAvg = d["ObjectiveKills-Average"];
				var $mostObjKillsInGame = d["ObjectiveKills-MostinGame"];
				var $finalBlows = d.FinalBlows;
				var $finalBlowsAvg = d["FinalBlows-Average"];
				var $mostFinalBlowsInGame = d["FinalBlows-MostinGame"];
				var $multiKills = d.Multikills;
				var $multiKillBest = d["Multikill-Best"];
				var $environmentalKills = d.EnvironmentalKills;
				//Damage done
				var $dmgDone = d.DamageDone;
				var $dmgDoneAvg = d["DamageDone-Average"];
				var $mostDmgInGame = d["DamageDone-MostinGame"];
				//Healing done
				var $healingDone = d.HealingDone;
				var $healingDoneAvg = d["HealingDone-Average"];
				var $mostHealingInGame = d["HealingDone-MostinGame"];
				//Assists
				var $offAss = d.OffensiveAssists;
				var $offAssAvg = d["OffensiveAssists-Average"];
				var $mostOffAssInGame = d["OffensiveAssists-MostinGame"];
				var $defAss = d.DefensiveAssists;
				var $defAssAvg = d["DefensiveAssists-Average"];
				var $mostDefAssInGame = d["DefensiveAssists-MostinGame"];
				var $reconAss = d.ReconAssists;
				var $reconAssAvg = d["ReconAssists-Average"];
				//Objective
				var $objTime = d.ObjectiveTime;
				var $objTimeAvg = d["ObjectiveTime-Average"];
				var $mostObjTimeInGame = d["ObjectiveTime-MostinGame"];
				//On fire
				var $onFire = d.TimeSpentonFire;
				var $onFireAvg = d["TimeSpentonFire-Average"];
				var $onFireInGame = d["TimeSpentonFire-MostinGame"];
				//Deaths
				var $deaths = d.Deaths;
				var $deathsAvg = d["Deaths-Average"];
				var $environmentalDeaths = d.EnvironmentalDeaths;
				//Medals
				var $medals = d.Medals;
				var $goldMedals = d["Medals-Gold"];
				var $silverMedals = d["Medals-Silver"];
				var $bronzeMedals = d["Medals-Bronze"];
				//Misc
				var $cards = d.Cards;
				var $gamesWon = d.GamesWon;
				var $timePlayed = d.TimePlayed;
				var $teleporterPadsDestroyed = d.TeleporterPadsDestroyed;

				//Competitive
				//No recon stats are logged in competitive(recon assists/recon assists average), but the variables below are logged in competitive mode only and not quickplay. Other than that the same
				//properties/variables are used.
				var $gamesPlayed = d.GamesPlayed;
				var $gamesTied = d.GamesTied;
				var $gamesLost = d.GamesLost;

				console.log($gamesPlayed);
				console.log($gamesTied);
				console.log($gamesLost);
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