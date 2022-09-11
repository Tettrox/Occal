/*class Task
{
	constructor(name, content, repeat_from, repeat_to, time_start, time_end)
	{
		this.name = name;
		this.content = content;
		this.repeatFrom = repeat_from;
		this.repeatTo = repeat_to;
		this.timeStart = time_start;
		this.timeEnd = time_end;
	}
}
*/

class Task
{
	constructor(day_number, name)
	{
		//Not the day of the week, the day number out of the total number of days.
		this.day_no = day_number;
		this.month_no = monthView;
		this.name = name;
		console.log("New task created for ${months[monthView]} ${this.day_no}: ${this.name}");
	}
}

class Objective
{
	constructor(name, content, time_start, time_end)
	{
		this.name = name;
		this.content = content;
		this.timeStart = time_start;
		this.timeEnd = time_end;
	}
}

/*Globals*/
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var sb_default_menu = [document.getElementById("sb_btn_load"), document.getElementById("sb_btn_save"), document.getElementById("sb_btn_theme"), document.getElementById("sb_btn_settings"), document.getElementById("sb_btn_about")];

var sb_theme_menu = [document.getElementById("sb_btn_original"), document.getElementById("sb_btn_nightmode"), document.getElementById("sb_btn_outrun")];

var today = new Date();
var monthView = today.getMonth();
var objectives = [];
var tasks = [];

//Increments the month view either forwards or backwards. Argument is a string that can be: forwards, backwards. Returns 1 on success or 0 on failure.
function incrementMonthView(direction)
{
	if (typeof direction != "string")
	{
		console.warn("Invalid argument for incrementMonthView! Argument must be a string. Options: forwards, backwards.");
		return 0;
	}

	if (direction == "forwards" && monthView < 12)
	{
		monthView += 1;
	} else if (direction == "forwards") {
		monthView = 0;
	}

	if (direction == "backwards" && monthView > 0)
	{
		monthView -= 1;
	} else if (direction == "backwards") {
		monthView = 11;
	}

	resizeDaysInMonth(monthView, today.getFullYear());
	setWeekdayNames(monthView, today.getFullYear());
	updateMonthStr(monthView);
	refreshDayLongTags();
	updateTasks();
	console.log("Month view changed: " + monthView);
	return 1;
}

function refreshDayLongTags()
{
	let dayLTags = document.getElementsByClassName("dayinfo_container");

	for (let i = 0; i < dayLTags.length; i++)
	{
		dayLTags[i].style.display = "none";
	}
}

function updateMonthStr(month_no)
{
	document.getElementById("month").innerHTML = getMonthStr(month_no);
}

//Returns the name of a month. Argument is a number between 0 and 11. Returns ERROR on failure.
function getMonthStr(month_no)
{
	if (typeof month_no != "number")
	{
		console.warn("Argument provided for getMonthStr is not a number!");
		return "ERROR";
	}

	if (month_no > months.length)
	{
		console.warn("Argument provided for getMonthStr is outside of range!");
		return "ERROR";
	}

	return months[month_no];
}

//Returns a string from the number of the day of the week. Returns ERROR on failure.
function getDayStr(day_no)
{
	if (typeof day_no != "number")
	{
		console.warn("Invalid argument provided to getDayStr. Argument must be a number.");
		return "ERROR";
	}

	if (day_no > days.length)
	{
		console.warn("getDayStr provided an out-of-range value.");
		return "ERROR";
	}

	return days[day_no];
}

//Sets the days of the week in the DOM. Arguments are the month as a number and the year as a number. Returns 0 on failure and 1 on success.
function setWeekdayNames(month_no, year)
{
	if (typeof month_no != "number" || typeof year != "number")
	{
		console.warn("Non-string value passed to setWeekdayNames! Argument must be a string.");
		return 0;
	}

	let currentDate = new Date(year, month_no, 1);
	let monthDays = new Date(year, month_no + 1, 0);
	let dSelector = 0;
	let pSelector = 0;

	/*TODO: Optimize this later.*/
	for (let i = 1; i < monthDays.getDate() + 1; i++)
	{
		currentDate.setDate(i);
		dSelector = document.querySelector("#Day" + i);
		pSelector = dSelector.querySelector(".day_tag");

		pSelector.innerHTML = getDayStr(currentDate.getDay());
	}

	return 1;
}

//Takes a day and a month as arguments, returns 0 on failure and 1 on success.
function resizeDaysInMonth(month_no, year)
{
	let currentDate = new Date(year, month_no + 1, 0);


	//TODO: Optimize.
	for (let i = currentDate.getDate() + 1; i < 33; i++)
	{
		document.getElementById("Day" + i).style.display = "none";
	}

	for (let i = 1; i < currentDate.getDate() + 1; i++)
	{
		document.getElementById("Day" + i).style.display = "flex";
	}
}

function showCreationMenu(start_date)
{
	toggleDialogBox();
	document.getElementById("db_i2").value = (monthView + 1) + "/" + start_date;
}

function switchCalandarTheme(switched_theme)
{
	document.getElementById("custom_style").href = switched_theme;
}

function switchSidebarMenu(switched_menu)
{
	const sbMenuList = [
		document.getElementById("sidebar_themes_menu"),
		document.getElementById("sidebar_main_menu")
	];

	for (let i = 0; i < sbMenuList.length; i++)
	{
		sbMenuList[i].style.display = "none";
	}

	switch (switched_menu)
	{
		case "main":
			document.getElementById("sidebar_main_menu").style.display = "flex";
			break;
		case "themes":
			document.getElementById("sidebar_themes_menu").style.display = "flex";
			break;
		default:
			console.warn("Unknown menu passed to switchSidebarMenu.");
	}
}

//Toggles visibility of sidebar using animation. Returns 0 when closed and 1 when opened.
function toggleSidebar()
{
	let sidebar = document.querySelector("#sidebar_main");
	let calNavbar = document.getElementsByClassName("calandar_navbar")[0];
	let compStyles = window.getComputedStyle(sidebar);	
	console.log(compStyles.getPropertyValue('width'));
	
	if (compStyles.getPropertyValue('width') == "0px")
	{
		calNavbar.style.animation = "0.2s unpack_calnavbar forwards";
		sidebar.style.animation = "0.2s sidebar_open forwards";
		return 1;
	}

	calNavbar.style.animation = "0.2s pack_calnavbar forwards";
	sidebar.style.animation = "0.2s sidebar_close forwards";
	return 0;
}

//Opens or closes dialog box. Returns 1 when opened and 0 when closed.
function toggleDialogBox()
{
	/*TODO: Take element as argument.*/
	let dialogBox = document.querySelector(".dialog_box");
	let pCont = document.querySelector("#create_dial_main");
	let compStyles = window.getComputedStyle(dialogBox);
	console.log("dialogbox maxwidth" + compStyles.getPropertyValue('max-width'));

	if (compStyles.getPropertyValue('max-width') == "0%")
	{
		pCont.style.animation = "none";
		pCont.style.visibility = "visible";
		dialogBox.style.animation = "0.2s open_dialogbox forwards";
		document.getElementById("db_i1").focus();
		return 1;
	}

	dialogBox.style.animation = "0.2s close_dialogbox forwards";
	pCont.style.animation = "0.3s disappear forwards";
	return 0;
}

function updateTaskList()
{
	for (let i = 1; i < 31; i++)
	{
		document.getElementById("Day" + i + "_info").style.display = "none";
	}

	for (let i = 0; i < tasks.length; i++)
	{
		if (tasks[i].month_no == monthView)
		{
			document.getElementById("Day" + tasks[i].day_no + "_info").style.display = "flex";
		}
	}
}

function setDayInfoNames()
{
	let modDate = new Date(today.getFullYear(), monthView, 1);

	//This is hardcoded to avoid wasting clock cycles running all the date code just to only hit the number of days in the month. Elements that error out will never be visible and are reset when the month changes.
	for (let i = 1; i < 33; i++)
	{
		modDate.setDate(i);
		document.getElementById("Day" + i + "_iname").innerText = days[modDate.getDay()];
	}
}

/*Removes all tasks from DOM. To restore visibility, use updateTasks.*/
function clearTasks()
{
	for (let i = 1; i < 33; i++)
	{
		console.log(i);
		document.getElementById("Day" + i + "_tasks").innerHTML = "";
	}
}

function getTasksByMonth(t_month)
{
	let results = [];

	for (let i = 0; i < tasks.length; i++)
	{
		if (tasks[i].month_no == t_month)
		{ results.push(tasks[i]); }
	}

	return results;
}

function updateTasks()
{
	clearTasks();
	let taskList = getTasksByMonth(monthView);

	for (let i = 0; i < taskList.length; i++)
	{
		document.getElementById("Day" + taskList[i].day_no + "_tasks").innerHTML += "<span class='important-txt-color full-width day_task'>" + taskList[i].name + "</span>";
	}
	updateTaskList();
}

function createTaskFromDBox()
{
	let dateInput = document.getElementById("db_i2").value;

	//TODO: Add a catch here for if someone puts the year.
	let dateSelStr = dateInput.slice(dateInput.lastIndexOf('/') + 1);

	let task = new Task(Number(dateSelStr), document.getElementById("db_i1").value);
	tasks.push(task);
	updateTasks();
	updateTaskList();
	toggleDialogBox();
}

/*Init*/
function init()
{
	document.getElementById("month").innerHTML = getMonthStr(today.getMonth());
	setWeekdayNames(today.getMonth(), today.getFullYear());
	resizeDaysInMonth(today.getMonth(), today.getFullYear());
	setDayInfoNames();
}

/*Entry point*/
document.addEventListener("DOMContentLoaded", function() { init(); });
