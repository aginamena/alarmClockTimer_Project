const currentTime = document.querySelector("#currentTime");
const alarmClock = document.querySelector("#alarmClock");
const countDown = document.querySelector("#countDown");
var timer;
var inputDate = alarmClock.querySelector("#alarmDate"); /*yyyy/mm/dd*/
var inputTime =  alarmClock.querySelector("#alarmTime"); /*hh;mm;ss */
/* at first, we want the stop button to be disabled since the user hasn
started the alarmClock */
alarmClock.querySelector("#stop").disabled = true;
function showCurrentTime(){
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours > 11 ? "PM" : "AM";

  hours %= 12;
  hours = hours == 0 ? 12 : hours;
  hours = hours < 10 ? "0"+hours : hours;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  seconds = seconds < 10 ? "0"+seconds : seconds;
  currentTime.querySelector("#showCurrentTime").innerHTML = hours + ":" + minutes + ":" + seconds;
  currentTime.querySelector("#currentTimeAmPm").innerHTML = ampm;
  currentTime.querySelector("#timeDate").innerHTML = date.toDateString();
}
 /*we want to call this function every 1sec = 1000ms*/
setInterval(showCurrentTime, 1000);
alarmClock.addEventListener("click", function(event){
  let child = event.target;
  if(child.id == "start" && inputTime.value.length != 0 && inputDate.value.length != 0){
    alarmClock.querySelector("#stop").disabled = false;
    alarmClock.querySelector("#start").disabled = true;
    /* once we start the user can't chnage the date nor th time till the
    stop button is pressed */
    alarmClock.querySelector("#alarmDate").disabled = true;
    alarmClock.querySelector("#alarmTime").disabled = true;
    startTimer();


  }
  if(child.id == "stop"){
    alarmClock.querySelector("#start").disabled = false;
    alarmClock.querySelector("#stop").disabled = true;
    /* we set the timer and set the RemainingDays to 0 */
    countDown.querySelector("#countDownTimer").innerHTML = "00:00:00";
    countDown.querySelector("#RemainingDays").innerHTML = "RemaingDays = 0";
    clearInterval(timer);
    /* the user can now edit the date and time */
    alarmClock.querySelector("#alarmDate").disabled = false;
    alarmClock.querySelector("#alarmTime").disabled = false;
  }


});

  function startTimer(){
  /*inputDate with inputTime separated with time */
  var countDownDate = new Date(inputDate.value + "T" + inputTime.value).getTime();
  if(isNaN(countDownDate)){
    alarmClock.querySelector("#errorMessage").innerHTML = "Invalid input date!";
    alarmClock.querySelector("#errorMessage").style.cssText = "color : red; font-style : italic;";
    return;
  }
  //the user shouldn't try to go back in time
  if(countDownDate - new Date().getTime() < 0){
    alarmClock.querySelector("#errorMessage").innerHTML = "You can't go back in time!";
    alarmClock.querySelector("#errorMessage").style.cssText = "color : red; font-style : italic;";
    return;
  }
  /* reset tthe error message */
  alarmClock.querySelector("#errorMessage").innerHTML = "";
  // Update the count down every 1 second
  timer = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  /* format the time in a presentable way */
  var formatTime = "";
  if(hours != 0)formatTime += hours + "h:";
  if(minutes != 0)formatTime += minutes + "m:";
  // Output the result in an element with id="countDownTimer"
  countDown.querySelector("#countDownTimer").innerHTML = formatTime + seconds +"s";
  if(days >= 0) countDown.querySelector("#RemainingDays").innerHTML = "RemainingDays = "+days;
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(timer); /* we stop the conter */
    countDown.querySelector("#countDownTimer").innerHTML = "Time up!";
  }
}, 1000);
}
