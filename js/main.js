import { teams } from "./matches.js";
import { players } from "./players.js";

const daysTime = document.querySelector(".counter__days");
const hoursTime = document.querySelector(".counter__hours");
const minutesTime = document.querySelector(".counter__minutes");
const secondsTime = document.querySelector(".counter__seconds");

let day;
const checkTime = () => {
	let currentDate = new Date();
	let nextDate = new Date("04/16/2023 17:37");
	let result = nextDate - currentDate;

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
window.addEventListener("load", checkTime);
