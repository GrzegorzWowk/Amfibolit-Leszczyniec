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
	     <div class="timetable__goals-box active ">
		
		 </div>
	`;

		timetable.append(button);
	}
};
logTimetable();

const goals = () => {
	const btns = document.getElementsByClassName("timetable__goals-box");
	let matchesNumber = 0;
	for (let i = 0; i < teams.length; i++) {
		const p = document.createElement("p");
		p.classList.add("timetable__goals-info");
		p.textContent = teams[matchesNumber].scorers;
		btns[matchesNumber].append(p)
		matchesNumber++;

		// to wyzej to paragraf na wszystkie gole a ma byc na kzdy osobno
		// console.log(
		// 	(btns[matchesNumber].textContent = teams[matchesNumber].scorers)
		// );
	}
};
goals();

// console.log(teams[0].scorers);

// const buttons = document.querySelectorAll(".timetable__box");

// const click = e => {
// 	const goals = document.querySelectorAll('.timetable-goals__box')
// 	goals.forEach(btn => btn.classList.remove("active"));
// 	const currentButton = e.target.closest(".timetable__box");
// 	currentButton.lastElementChild.classList.toggle("active");
// };

// buttons.forEach(btn => btn.addEventListener("click", click));

const startAllFunctions = () => {
	logMatchInfo();
	checkTime();
};

window.addEventListener("load", startAllFunctions);
