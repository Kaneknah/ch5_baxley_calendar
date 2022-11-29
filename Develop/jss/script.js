
const timeDisplayEL = $('#time-display');

  //Function to set all jQuery code to be called after HTML is loaded.
$(document).ready(function () {
  
  //Event Listener for button
  $(".saveBtn").on("click", function () {
     //Sets the variable for the input of whatever the user puts into the writable section. 
    var input = $(this).siblings(".description").val();
    //Sets the Variable for the specific id of each time slot.
    var timeSlot = $(this).parent().attr("id");
      //Save input and timeSlot data to local storage
       localStorage.setItem(timeSlot, input);
  });

  // loop for getting specific keys in local storage to place them back into the page.
  Object.keys(localStorage).forEach(function(key){
  //interpolate the key(as a string) and # concatenation  to get items from local storage to the correct element.
    $(`#${String(key)} .description`).val(localStorage.getItem(key))
    //dynamically building out hour-9 portion $(`#hour-9 .description`).val(localStorage.getItem(key))
  });

//function for tracking the current time on the page.
function timeCheck() {
   //day.js code for hour of the day.
  var currentHour = dayjs().hour();
  //function for setting a class for specific locations at specific times.
  $(".time-block").each(function () {
  var blockTime = parseInt($(this).attr("id").split("hour-")[1]);
  //console.log(blockTime)
    if (blockTime < currentHour) {
      $(this).addClass("past");
    }
    else if (blockTime === currentHour) {
      $(this).addClass("present");
    }
    else {
      $(this).addClass("future");
    }
  });
  //console.log(currentHour);
}
  //Runs the timeCheck function
  timeCheck();
 
});
// Function for adding a Date display at the top of the page.
function displayTime() {
  const currentTime = dayjs().format('dddd, MMMM D');
  //Sets the text of the display to be the variable above.
  timeDisplayEL.text(currentTime);

};

// runs the Display time Function.
displayTime();
//Function that forces my timeCheck to perform every second.
setInterval(timeCheck,5000);