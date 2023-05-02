import { teams } from "./matches.js";
import { players } from "./players.js";

const daysTime = document.querySelector(".counter__days");
const hoursTime = document.querySelector(".counter__hours");
const minutesTime = document.querySelector(".counter__minutes");
const secondsTime = document.querySelector(".counter__seconds");
const mainButtons = document.querySelectorAll(".btn");
const table = document.querySelector(".table");
const timetable = document.querySelector(".timetable");
const stats = document.querySelector(".stats");

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

const logTimetable = () => {
	const timetable = document.querySelector(".timetable");
	let homeMatch, awayMatch;

	for (const team of teams) {
		if (team.place === "home") {
			homeMatch = "Amfibolit Leszczyniec";
			awayMatch = team.teamName;
		} else {
			awayMatch = "Amfibolit Leszczyniec";
			homeMatch = team.teamName;
		}

		const button = document.createElement("button");
		button.classList.add("timetable__box");
		button.innerHTML = ` 
		<p class="timetable__date">${team.date}</p>
	    <div class="timetable__match">
			<div class="timetable__match-home">${homeMatch}</div>
			<div class="timetable__match-result">
				<p class="timetable__match-result-home">${team.home}</p>
				<p class="timetable__match-result-vs">-</p>
				<p class="timetable__match-result-away">${team.away}</p>
		    </div>
	        <div class="timetable__match-away"> ${awayMatch}</div>
		</div>
	     <div class="timetable__goals-box ">
		
		 </div>
	`;

		timetable.append(button);
	}
};
logTimetable();

const logGoalScorers = () => {
	const btns = document.getElementsByClassName("timetable__goals-box");
	for (let i = 0; i < teams.length; i++) {
		const scorers = teams[i].scorers;
		for (const scorer of scorers) {
			const p = document.createElement("p");
			p.classList.add("timetable__goals-info");
			p.textContent = scorer;
			btns[i].append(p);
		}
	}
};
logGoalScorers();

const colorWinDrawLose = () => {
	const matchresults = [
		...document.getElementsByClassName("timetable__match-result"),
	];
	for (let i = 0; i < matchresults.length; i++) {
		const match = matchresults[i];
		if (match.firstElementChild.textContent === "") {
			match.style.backgroundColor = "gray";
		}
	}
};
colorWinDrawLose();

const hideContent = () => {
	const allContent = document.querySelectorAll(".content");
	allContent.forEach(content => (content.style.display = "none"));
};
const showContent = e => {
	if (e.target.classList.contains("btn__table")) {
		hideContent();
		table.style.display = "flex";
	} else if (e.target.classList.contains("btn__timetable")) {
		hideContent();
		timetable.style.display = "flex";
	} else {
		hideContent();
		stats.style.display = "flex";
	}
};

const timetableBtns = [...document.getElementsByClassName("timetable__box")];

const closeScorersAccordion = () => {
	timetableBtns.forEach(btn => btn.lastElementChild.classList.remove("active"));
};

const openScorersAccordion = e => {
	const currentButton = e.target.closest(".timetable__box");
	if (currentButton.lastElementChild.classList.contains("active")) {
		currentButton.lastElementChild.classList.remove("active");
	} else {
		closeScorersAccordion();
		currentButton.lastElementChild.classList.toggle("active");
	}
};
const clickOutsideAccordion = e => {
	if (
		e.target.classList.contains("timetable__box") ||
		e.target.parentElement.parentElement.classList.contains("timetable__box") ||
		e.target.parentElement.parentElement.classList.contains(
			"timetable__match"
		) ||
		e.target.parentElement.parentElement.classList.contains("timetable")
	)
		return;
	closeScorersAccordion();
};

const startAllFunctions = () => {
	logMatchInfo();
	checkTime();
};
mainButtons.forEach(btn => btn.addEventListener("click", showContent));
timetableBtns.forEach(btn =>
	btn.addEventListener("click", openScorersAccordion)
);
window.addEventListener("click", clickOutsideAccordion);
window.addEventListener("load", startAllFunctions);
