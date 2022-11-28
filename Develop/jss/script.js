
const timeDisplayEL = $('#time-display');

  //Fucntion to set all jQuery code to be called after HTML is loaded.
$(document).ready(function () {
  //Event Listener for button
  $(".saveBtn").on("click", function () {
     //Sets the variable for the input of whatever the user puts into the writable section. 
    var input = $(this).siblings(".description").val();
    //Sets the Variable for the specific id of each timeslot.
    var timeSlot = $(this).parent().attr("id");
      //Save input and timeSlot data to local storage
       localStorage.setItem(timeSlot, input);
  });


  // loop for getting specific keys in local storage to place them back into the page.
  Object.keys(localStorage).forEach(function(key){
  //interpollate the key(as a string) and # concanation  to get items from local storage to the correct element.
    $(`#${String(key)} .description`).val(localStorage.getItem(key))
    //dynamicly building out hour-9 portion $(`#hour-9 .description`).val(localStorage.getItem(key))
  });
  
//Function that forces my timeCheck to perform every second.
var intervalId = window.setInterval(function(){
  //function for tracking the current time on the page.
  function timeCheck() {
    //day.js code for hour of the day.
    var currentHour = dayjs().hour();
    //function for setting a class for specific locations at specific times.
    $(".time-block").each(function () {
    var blockTime = parseInt($(this).attr("id").split("hour-")[1]);

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

  }
  //Runs the timeCheck function
  timeCheck();
  }, 1000);
  
});
// Function for adding a Date display at the top of the page.
function displayTime() {
  const currentTime = dayjs().format('dddd, MMMM D');
  timeDisplayEL.text(currentTime);

};

// runs the Display time Function.
displayTime();