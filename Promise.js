/**
 * @author    Joseph Evans
 * @version   1.0.2
 * @since     20/08/2018
 * @copyright Joseph Evans 2018 (c)
 */


/** @global
 * @function Promise
 * @param    {Function} fnc
 * @desc     The purpose behind this code is to simply
 *           allow one to write async style code, this is
 *           more popular with Node than it is traditional
 *           browser style JavaScript, but never the less,
 *           it allows you to run your code procedurally.
 *           You can think of it as an iterator, rather than
 *           you having to manually write all of the
 *           callback methods yourself, this essentially
 *           takes care fo that part for you. Unlike many
 *           alternatives, a big part of this code's purpose
 *           is to remain as simple and lightweight as possible.
 */
function Promise (fnc) {
  var method = this.method;
  var catching = this.error;
  var queue = [];
  var index = 0;
  var done = false;

  var options = {
    /**
     * @public
     * @function then
     * @param    {Function} fnc
     * @desc     This is the code you would like to
     *           execute once the previous chained
     *           method has finished.
     */
    then : function (fnc) {
      if (typeof fnc == "function") {
        queue.push(fnc);
        if (done == true) {
          tempInterval = setInterval(function () {
            if (method == null) {
              if (queue.length > index) {
                method = queue[index++];
                runCode();
              } else {
                index = 0;
                queue = [];
                clearInterval(tempInterval);
                done = false;
              }
            }
          }, 0);
        }
      }
      return options;
    },

    /**
     * @public
     * @function do
     * @param    {Function} fnc
     * @desc     This method essentially adds some
     *           syntax/context sugar coating, it's
     *           kinda like the 'then' method, only
     *           as it was meant to be the first one
     *           in the chain of methods, this one has
     *           a slightly different name.
     */
    do : function (fnc) {
      if (typeof fnc == "function") {
        method = fnc;
        runCode();
        done = true;
        delete options.do;
      }
      return options;
    },
    resolve : function () { method = null; },
    catch : function (fnc) {
      if (typeof fnc == "function") { catching = fnc; }
      return options;
    }
  };

  /**
   * @ignore
   * @private
   * @function runCode
   * @throws   Exception
   * @desc     The purpose of this code is simple,
   *           it will take the most recently available
   *           method/function and execute it, and if
   *           it cannot recover, then it will throw
   *           the exception.
   */
  function runCode () {
    try { method (options.resolve, options.catch); }
    catch (Exception) {
      if (typeof catching == "function") {
        catching(Exception);
      } else {
        throw Exception;
      }
    }
  }

  if (typeof fnc === "function") return options.do(fnc);
  else return options;
}
