/**
 * @author    Joseph Evans
 * @version   1.0.5
 * @since     20/08/2018
 * @copyright Joseph Evans 2018 (c)
 * @note      With version 1.0.4 the method(s) 'resolve' &
 *            'reject' have been made private.
 */


/**
 * @global
 * @function Promise
 * @param    {Function} fnc
 * @param    {Function} rej
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
function Promise (fnc, rej) {
  var method;
  var tempInterval;
  var catching;
  var queue = [];
  var rejections = [];
  var index = 0;
  var done = false;
  var args = null;

  var options = {
    /**
     * @public
     * @function then
     * @param    {Function} fnc
     * @param    {Function} rej
     * @desc     This is the code you would like to
     *           execute once the previous chained
     *           method has finished.
     */
    then : function (fnc, rej) {
      if (typeof fnc == "function") {
        queue.push(fnc);

        if (typeof rej == "function") {
          rejections.push(rej);
        } else {
          rejections.push(null);
        }


        if (done == true) {
          tempInterval = setInterval(function () {
            if (method == null) {
              if (queue.length > index) {
                reject(rejections[index]);
                method = queue[index++];
                runCode();
              } else {
                end();
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
     * @param    {Function} rej
     * @desc     This method essentially adds some
     *           syntax/context sugar coating, it's
     *           kinda like the 'then' method, only
     *           as it was meant to be the first one
     *           in the chain of methods, this one has
     *           a slightly different name.
     */
    do : function (fnc, rej) {
      if (typeof fnc == "function") {
        if (typeof rej == "function") {
          reject(rej);
        }

        method = fnc;
        runCode();
        done = true;
        delete options.do;
      }
      return options;
    }
  };

  /**
   * @private
   * @function reject
   * @param    {Function} fnc
   * @desc     The purpose of this method is quite simple,
   *           it allows the developer to do something
   *           when an error occurs.
   */
  function reject (fnc) {
    if (typeof fnc == "function") {
      catching = fnc;
    }  else {
      catching = null;
    }
    return options;
  }

  /**
   * @private
   * @function resolve
   * @desc     The purpose of this method is to simply allow
   *           a developer to go onto the 'next' step of the
   *           chain.
   */
  function resolve (_args) {
    method = null;
    args = _args;
  }

  /**
   * @ignore
   * @private
   * @function end
   * @desc     The purpose of this method is to simply
   *           clear up some memory if an error occurs.
   *           Or possibly, there's no more promises to
   *           run within the current chain, etc.
   */
  function end () {
    index = 0;
    queue = [];
    rejections = [];
    done = false;
    try {
      clearInterval(tempInterval);
      tempInterval = null;
    } catch (NoSuchInterval) {
      // do nothing
    }

    for (var x in this) {
      try {
        delete this[x];
      } catch (UnknownException) {
        // do nothing
      }
    }
  }

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
    try { method (resolve, /* reject, */ args); }
    catch (Exception) {
      if (typeof catching == "function") {
        catching(Exception, resolve);
      } else {
        end();
        throw Exception;
      }
    }
  }

  if (typeof fnc === "function") return options.do(fnc, rej);
  else return options;
}
