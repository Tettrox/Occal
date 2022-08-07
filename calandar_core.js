class Task
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

class Day
{
	
	constructor(day_number)
	{
		this.dayNumber = 0;
		this.tasks = [];
		this.objectives = [];
	}
	
}

class Month
{

	constructor(name, day_count)
	{
		this.name = name;
		this.dayCount = day_count;
		this.days = [];

		for (let i = 1; i < this.dayCount; i++)
		{
			this.days.push(new Day(i));
		}
	}
}

/*Globals*/
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

var today = new Date();
var monthView = today.getMonth();
var objectives = [];

//Increments the month view either forwards or backwards. Argument is a string that can be: forwards, backwards. Returns 1 on success or 0 on failure.
function incrementMonthView(direction)
{
	if (typeof direction != "string")
	{
		console.warn("Invalid argument for incrementMonthView! Argument must be a string. Options: forwards, backwards.");
		return 0;
	}

	if (direction == "forwards" && monthView < 11)
	{
		monthView += 1;
		return 1;
	} else if (direction == "forwards") {
		monthView = 0;
		return 1;
	}

	if (direction == "backwards" && monthView > 0)
	{
		monthView -= 1;
		setWeekday
		return 1;
	} else if (direction == "backwards") {
		monthView = 12;
		return 1;
	}

	console.warn("Incorrect value for argument in incrementMonthView; Options: forwards, backwards.");
	return 0;
}

//Returns the name of a month. Argument is a number between 0 and 11. Returns ERROR on failure.
function getMonthStr(month_no)
{
	if (typeof month_no != "number")
	{
		console.warn("Argument provided for getMonthStr is not a number!");
		return "ERROR";
	}

	switch(month_no)
	{
		case 0:
			return "January";
			break;
		case 1:
			return "February";
			break;
		case 2:
			return "March";
			break;
		case 3:
			return "April";
			break;
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;
		case 7:
			return "August";
			break;
		case 8:
			return "September";
			break;
		case 9:
			return "October";
			break;
		case 10:
			return "November";
			break;
		default:
			return "December";
			break;
	}

	console.warn("Month number fallthrough in getMonthStr! Valid values: 0-11. Returned ERROR.");
	return "ERROR";
}

//Returns a string from the number of the day of the week. Returns ERROR on failure.
function getDayStr(day_no)
{
	if (typeof day_no != "number")
	{
		console.warn("Invalid argument provided to getDayStr. Argument must be a number.");
		return "ERROR";
	}

	switch(day_no)
	{
		case 0:
			return "Sunday";
			break;
		case 1:
			return "Monday";
			break;
		case 2:
			return "Tuesday";
			break;
		case 3:
			return "Wednesday";
			break;
		case 4:
			return "Thursday";
			break;
		case 5:
			return "Friday";
			break;
		default:
			return "Saturday";
			break;
	}

	console.warn("Day number fallthrough!");
	return "Saturday";
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
	console.log(currentDate.getDate());

	for (let i = currentDate.getDate() + 1; i < 33; i++)
	{
		document.getElementById("Day" + i).style.display = "none";
	}
}

function showCreationMenu(start_date)
{
		
}

/*Init*/
function init()
{
	document.getElementById("month").innerHTML = getMonthStr(today.getMonth());
	setWeekdayNames(today.getMonth(), today.getYear());
	resizeDaysInMonth(today.getMonth(), today.getYear());
}

/*Entry point*/
document.addEventListener("DOMContentLoaded", function() { init(); });