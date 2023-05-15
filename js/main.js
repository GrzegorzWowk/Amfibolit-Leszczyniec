import { matches } from "./matches.js";
import { players } from "./players.js";
import { teams } from "./teams.js";

const daysTime = document.querySelector(".counter__days");
const hoursTime = document.querySelector(".counter__hours");
const minutesTime = document.querySelector(".counter__minutes");
const secondsTime = document.querySelector(".counter__seconds");
const mainButtons = document.querySelectorAll(".btn");
const mainStatsBtn = document.querySelector(".btn__stats");
const mainTableBtn = document.querySelector(".btn__table");
const tableBtns = document.querySelectorAll(".table__info-btn");
const table = document.querySelector(".table");
const tableContent = document.querySelector(".table__content");
const timetable = document.querySelector(".timetable");
const stats = document.querySelector(".stats");
const statsTableContent = document.querySelector(".stats-table__content");
const statsTableBtns = document.querySelectorAll(
	".stats-table__btn:not(#playerName)"
);

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
	let homeMatch, awayMatch, dayMonthDate;

	for (const match of matches) {
		if (match.place === "home") {
			homeMatch = "Amfibolit Leszczyniec";
			awayMatch = match.teamName;
		} else {
			awayMatch = "Amfibolit Leszczyniec";
			homeMatch = match.teamName;
		}

		dayMonthDate =
			match.date.slice(3, 6) + match.date.slice(0, 3) + match.date.slice(6);

		const button = document.createElement("button");
		button.classList.add("timetable__box");
		button.innerHTML = ` 
		<p class="timetable__date">${dayMonthDate}</p>
	    <div class="timetable__match">
			<div class="timetable__match-home">${homeMatch}</div>
			<div class="timetable__match-result">
				<p class="timetable__match-result-home">${match.home}</p>
				<p class="timetable__match-result-vs">-</p>
				<p class="timetable__match-result-away">${match.away}</p>
		    </div>
	        <div class="timetable__match-away"> ${awayMatch}</div>
		</div>
		<p class="timetable__details">szczegóły</p>
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
		statsTableContent.appendChild(row);
	});
};
const sortStatsData = (data, param) => {
	statsTableContent.innerHTML = "";

	const sortedData = [...data].sort((a, b) => {
		if (a[param] < b[param]) {
			return 1;
		}
		if (a[param] > b[param]) {
			return -1;
		}
		return 0;
	});

	getTableStatsContent(sortedData);
};

// ====================================================

const getTableContent = data => {
	data.map(obj => {
		const row = createTableStatsRow(obj);
		tableContent.appendChild(row);
	});
};
const sortTableData = (data, param) => {
	tableContent.innerHTML = "";

	const sortedData = [...data].sort((a, b) => {
		if (a[param] < b[param]) {
			return 1;
		}
		if (a[param] > b[param]) {
			return -1;
		}
		return 0;
	});
	
	getTableContent(sortedData);

};

// ========================================================
const startMainFunctions = () => {
	logMatchInfo();
	checkTime();
	logGoalScorers();
	colorWinDrawLose();
};

[...statsTableBtns, mainStatsBtn].map(button => {
	button.addEventListener("click", e => {
		sortStatsData(players, e.target.getAttribute("data-sort"));
	});
});
[...tableBtns, mainTableBtn].map(button => {
	button.addEventListener("click", e => {
		sortTableData(teams, e.target.getAttribute("data-sort"));
	});
});

mainButtons.forEach(btn => btn.addEventListener("click", showContent));
timetableBtns.forEach(btn =>
	btn.addEventListener("click", openScorersAccordion)
);
window.addEventListener("click", clickOutsideAccordion);
window.addEventListener("load", startMainFunctions);

// for (let i = 0; i < teams.length; i++) {
// 	let number = i + 1;
// 	const p = document.createElement("p");
// 	p.textContent = i + 1;
// 	console.log(p);
// }
