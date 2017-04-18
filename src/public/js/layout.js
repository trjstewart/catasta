$(document).ready(function() {
  $('.ui.dropdown').dropdown();
  $('#time-day-start').calendar({ type: 'time' });
  $('#time-day-end').calendar({ type: 'time' });
});
