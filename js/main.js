import { matches } from "./matches.js";
import { players } from "./players.js";

const daysTime = document.querySelector(".counter__days");
const hoursTime = document.querySelector(".counter__hours");
const minutesTime = document.querySelector(".counter__minutes");
const secondsTime = document.querySelector(".counter__seconds");
const mainButtons = document.querySelectorAll(".btn");
const table = document.querySelector(".table");
const timetable = document.querySelector(".timetable");
const stats = document.querySelector(".stats");
const yellowCardBtn = document.querySelector(".yellow");
const tableContent = document.querySelector(".stats-table__content");
const statsTableBtns = document.querySelectorAll(".stats-table__btn");


let presentDate = new Date();
const closestMatch = matches.find(match => new Date(match.date) > presentDate);

const checkTime = () => {
	let presentDate = new Date();
	const closestMatch = matches.find(
		match => new Date(match.date) > presentDate
	);
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

	for (const match of matches) {
		if (match.place === "home") {
			homeMatch = "Amfibolit Leszczyniec";
			awayMatch = match.teamName;
		} else {
			awayMatch = "Amfibolit Leszczyniec";
			homeMatch = match.teamName;
		}

		const button = document.createElement("button");
		button.classList.add("timetable__box");
		button.innerHTML = ` 
		<p class="timetable__date">${match.date}</p>
	    <div class="timetable__match">
			<div class="timetable__match-home">${homeMatch}</div>
			<div class="timetable__match-result">
				<p class="timetable__match-result-home">${match.home}</p>
				<p class="timetable__match-result-vs">-</p>
				<p class="timetable__match-result-away">${match.away}</p>
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
	for (let i = 0; i < matches.length; i++) {
		const scorers = matches[i].scorers;
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
		if (
			match.previousElementSibling.textContent == "Amfibolit Leszczyniec" &&
			match.firstElementChild.textContent > match.lastElementChild.textContent
		) {
			match.style.backgroundColor = "#37fe00";
		} else if (
			match.nextElementSibling.textContent == " Amfibolit Leszczyniec" &&
			match.firstElementChild.textContent < match.lastElementChild.textContent
		) {
			match.style.backgroundColor = "#37fe00";
		} else if (
			match.nextElementSibling.textContent == " Amfibolit Leszczyniec" &&
			match.firstElementChild.textContent > match.lastElementChild.textContent
		) {
			match.style.backgroundColor = "#e40000";
		} else if (
			match.previousElementSibling.textContent == "Amfibolit Leszczyniec" &&
			match.firstElementChild.textContent < match.lastElementChild.textContent
		) {
			match.style.backgroundColor = "#e40000";
		} else if (!match.firstElementChild.textContent == "") {
			match.style.backgroundColor = "#ced118";
		} else {
			match.style.backgroundColor = "#827b7b";
		}
	}
};
colorWinDrawLose();

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
// ======================================

const createTableStatsRow = obj => {
	const row = document.createElement("tr");
	const objKeys = Object.keys(obj);
	objKeys.map(key => {
		const cell = document.createElement("td");
		cell.setAttribute("data-attr", key);
		cell.innerHTML = obj[key];
		row.appendChild(cell);
	});

	return row;
};
const getTableStatsContent = data => {
	data.map(obj => {
		const row = createTableStatsRow(obj);
		tableContent.appendChild(row);
	});
};
const sortData = (data, param, direction = "asc") => {
	tableContent.innerHTML = "";

	const sortedData =
		direction == "desc"
			? [...data].sort(function (a, b) {
					if (a[param] < b[param]) {
						return -1;
					}
					if (a[param] > b[param]) {
						return 1;
					}
					return 0;
			  })
			: [...data].sort(function (a, b) {
					if (b[param] < a[param]) {
						return -1;
					}
					if (b[param] > a[param]) {
						return 1;
					}
					return 0;
			  });

	getTableStatsContent(sortedData);
};
const resetButtons = event => {
	[...statsTableBtns].map(button => {
		if (button !== event.target) {
			button.removeAttribute("data-dir");
		}
	});
};

// ===============================================

const startMainFunctions = () => {
	logMatchInfo();
	checkTime();
	getTableStatsContent(players);
};
[...statsTableBtns].map(button => {
	button.addEventListener("click", e => {
		resetButtons(e);
		if (e.target.getAttribute("data-dir") == "desc") {
			sortData(players, e.target.id, "desc");
			e.target.setAttribute("data-dir", "asc");
		} else {
			sortData(players, e.target.id, "asc");
			e.target.setAttribute("data-dir", "desc");
		}
	});
});
mainButtons.forEach(btn => btn.addEventListener("click", showContent));
timetableBtns.forEach(btn =>
	btn.addEventListener("click", openScorersAccordion)
);
window.addEventListener("click", clickOutsideAccordion);
window.addEventListener("load", startMainFunctions);
