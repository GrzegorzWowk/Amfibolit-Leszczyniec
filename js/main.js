import { teams } from "./matches.js";
import { players } from "./players.js";

const daysTime = document.querySelector(".counter__days");
const hoursTime = document.querySelector(".counter__hours");
const minutesTime = document.querySelector(".counter__minutes");
const secondsTime = document.querySelector(".counter__seconds");

let presentDate = new Date();
const closestMatch = teams.find(team => new Date(team.date) > presentDate);

const checkTime = () => {
	let presentDate = new Date();
	const closestMatch = teams.find(team => new Date(team.date) > presentDate);
	let result = new Date(closestMatch.date) - presentDate;
	let seconds = Math.floor(result / 1000) % 60;
	let minutes = Math.floor(result / 1000 / 60) % 60;
	let hours = Math.floor(result / 1000 / 60 / 60) % 24;
	let days = Math.floor(result / 1000 / 60 / 60 / 24);

	daysTime.textContent = days;
	hoursTime.textContent = hours;
	minutesTime.textContent = minutes;
	secondsTime.textContent = seconds;
};

setInterval(checkTime, 1000);

const logMatchInfo = () => {
	const home = document.querySelector(".home");
	const away = document.querySelector(".away");

	if (closestMatch.place === "home") {
		home.textContent = "Amfibolit Leszczyniec";
		away.textContent = closestMatch.teamName;
	} else {
		away.textContent = "Amfibolit Leszczyniec";
		home.textContent = closestMatch.teamName;
	}
};
const startAllFunctions = () => {
	logMatchInfo();
	checkTime();
};

window.addEventListener("load", startAllFunctions);


