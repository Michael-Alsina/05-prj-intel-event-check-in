//Get All Needed DOM Elements
const form = document.getElementById("checkInForm"); 
const nameInput = document.getElementById("attendeeName")
const teamSelect = document.getElementById("teamSelect")

//Track Attendacne
let count = 0; 
const maxCount = 50; 

//Handle Form Submissions
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  //Get Values From
  const name = nameInput.value; 
  const team = teamSelect.value; 
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name,teamName); 

  //Increment Count
  count++
  console.log("Total Check-ins: ", count); 

  //Update Progress Bar
  const percentage =Math.round((count / maxCount) * 100) + "%"; 
  console.log(`Progress: ${percentage}`);

  //Update THe Counter
  const teamCounter = document.getElementById(team + "Count")
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
  
  //Show Welcome Message
  const messgage = `Welcome, ${name} from ${teamName}`;
  console.log(messgage);

  form.reset();
});