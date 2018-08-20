function Promise () {
  var method = this.method;
  var catching = this.error;
  var queue = [];
  var index = 0;

  var options = {
    then : function (fnc) {
      if (typeof fnc == "function") {
        queue.push(fnc);
        var tempInterval = setInterval(function () {
          if (method == null) {
            if (queue.length > index) {
              method = queue[index++];
              runCode();
            } else {
              index = 0;
              queue = [];
              clearInterval(tempInterval);
            }
          }
        }, 1);
      }
      return options;
    },
    do : function (fnc) {
      if (typeof fnc == "function") {
        method = fnc;
        runCode();
      }
      delete options.do;
      return options;
    },
    resolve : function () { method = null; },
    catch : function (fnc) {
      if (typeof fnc == "function") { catching = fnc; }
      return options;
    }
  };

  function runCode () {
    try { method (); }
    catch (Exception) { catching(Exception); }
  }

  return options;
}
