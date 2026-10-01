//Get All Needed DOM Elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const recentAttendees = {
  water: [],
  zero: [],
  power: [],
};

function updateRecentAttendees(team, name) {
  recentAttendees[team].unshift(name);

  if (recentAttendees[team].length > 5) {
    recentAttendees[team].pop();
  }

  const attendeeList = document.getElementById(team + "Recent");
  attendeeList.textContent = "";

  for (let index = 0; index < recentAttendees[team].length; index++) {
    const listItem = document.createElement("li");
    listItem.textContent = recentAttendees[team][index];
    attendeeList.appendChild(listItem);
  }
}

//Track Attendacne
let count = 0;
const maxCount = 100;

//Handle Form Submissions
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get Values From
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment Count
  count++;
  console.log("Total Check-ins: ", count);

  //Update Progress Bar
  const percentage = Math.min(Math.round((count / maxCount) * 100), 100) + "%";
  attendeeCount.textContent = count;
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Update The Counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
  updateRecentAttendees(team, name);

  //Show Welcome Message
  greeting.textContent = `Welcome, ${name}, to ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  //Congratulate the team with the most attendees when the bar is full
  if (count >= maxCount) {
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent,
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent,
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent,
    );
    const highestCount = Math.max(waterCount, zeroCount, powerCount);
    let winningTeam = "Team Water Wise";

    if (zeroCount === highestCount) {
      winningTeam = "Team Net Zero";
    }

    if (powerCount === highestCount) {
      winningTeam = "Team Renewables";
    }

    greeting.textContent += ` Congratulations to ${winningTeam} for the most attendance!`;
  }

  form.reset();
});
