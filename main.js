/* lesson 06 - Stop-Split Watch Timer */
/* more precision,
  based on code:
  http://stopwatch.onlineclock.net/new/
  http://codereview.stackexchange.com/questions/45335/milliseconds-to-time-string-time-string-to-milliseconds
*/

(function() {

  var buttons = document.querySelectorAll('input'),
      startButton = buttons[0],
      splitButton = buttons[1],
      resetButton = buttons[2],
      startTime,
      timerId,
      commitIndex;

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onfocus = function() {
      this.blur();
    }
  }

  initTimer();

  startButton.onclick = function(e) {
    if (startTime <= 0) {
      startTime += Date.now();
      timerId = setInterval(function() {
        msToDisplay(Date.now() - startTime);
      }, 43);
      this.value = 'Stop';
    } else {
      commitTime(e.target.value);
      startTime -= Date.now();
      clearInterval(timerId);
      this.value = 'Start';
    }
  }

  splitButton.onclick = function(e) {
    if (startTime > 0) commitTime(e.target.value);
  }

  resetButton.onclick = initTimer;

  function initTimer() {
    startTime = 0;
    commitIndex = 0;
    clearInterval(timerId);
    startButton.value = 'Start';
    msToDisplay(0);
    while(stopwatch__results.firstChild) {
      stopwatch__results.removeChild(stopwatch__results.firstChild);
    }
  }

  function msToDisplay(ms) {
    stopwatch__display.textContent = ms2String(ms);
  }

  function ms2String(raw) {
    var ms = raw % 1000,
        sec = raw / 1000 % 60 | 0,
        min = raw / 60000 % 60 | 0,
        hour = raw / 3600000 % 24 | 0;
    return (hour < 10 ? '0' + hour : hour) + ':' +
      (min < 10 ? '0' + min : min) + ':' +
      (sec < 10 ? '0' + sec : sec) + '.' +
      (ms < 100 ? ms < 10 ? '00' : '0' : '') + ms;
  }

  function commitTime(prefix) {
    var s = ++commitIndex + ' ' + prefix + ': ' + stopwatch__display.textContent;
    // var s = ++commitIndex + ' ' + prefix + ': ' + ms2String(Date.now() - startTime);
    stopwatch__results.appendChild(document.createTextNode(s));
    stopwatch__results.appendChild(document.createElement('br'));
  }

})();
