/* lesson 05 - Stop Watch Timer */

(function() {

  /* timer resolution, msec */
  var RESOLUTION = 25;

  var time_units = [
    { now: 0, delta: RESOLUTION,  limit: 999, display: msecDisplay },
    { now: 0, delta: 1, limit: 59, display: secDisplay },
    { now: 0, delta: 1, limit: 59, display: minDisplay },
    { now: 0, delta: 1, limit: 23, display: hourDisplay }
  ];

  time_units.forEach(function(unit) {
    // calculate number of unit chars
    unit.len = unit.limit.toString().length;
  });

  var TIME_UNITS_LENGTH = time_units.length;
  var start = false;
  var timerId;
  var commitIndex = 0;

  stopwatch__startButton.onclick = function(e) {
    start = !start;
    if (start) {
      timerId = setInterval(performTimeUnit, RESOLUTION, 0);
      stopwatch__startButton.value = 'Stop';
    } else {
      clearInterval(timerId);
      commitTime(e.target.value);
      stopwatch__startButton.value = 'Start';
    }
  }

  stopwatch__splitButton.onclick = function(e) {
    if (start) commitTime(e.target.value);
  }

  stopwatch__resetButton.onclick = function() {
    start = false;
    commitIndex = 0;
    stopwatch__startButton.value = 'Start';
    clearInterval(timerId);
    while(stopwatch__results.firstChild) {
      stopwatch__results.removeChild(stopwatch__results.firstChild);
    }
    time_units.forEach(function(unit) {
      unit.now = unit.limit;
    });
    performTimeUnit(0);
  }

  function performTimeUnit(step) {
    var unit = time_units[step];
    unit.now += unit.delta;
    if (unit.now > unit.limit) {
      unit.now = 0;
      if (step < TIME_UNITS_LENGTH - 1) performTimeUnit(++step);
    }
    unit.display.textContent = addZero(unit.now, unit.len);
  }

  function addZero(num, len) {
    num = num.toString();
    while(num.length < len) num = '0' + num;
    return num;
  }

  function commitTime(prefix) {
    var s = ++commitIndex + ' ' + prefix + ': ' + stopwatch__display.textContent;
    stopwatch__results.appendChild(document.createTextNode(s));
    stopwatch__results.appendChild(document.createElement('br'));
  }

})();
