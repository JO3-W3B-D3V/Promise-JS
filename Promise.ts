/**
 * @author    Joseph Evans
 * @version   1.0.0
 * @since     19/09/2018
 * @copyright 2018 (c)
 * @desc      The purpose of this code is to provide a simple
 *            TypeScript promise solution.
 */


/**
 * @class ResolveReject
 * @desc  The purpose of this class is quite simple, it
 *        is essentially a data object that holds two
 *        functions. One being the 'success' function, the
 *        other being the 'fail' function.
 */
class ResolveReject {

  /**
   * @public
   * @property resolve
   * @desc     This is the 'success' function.
   */
  public resolve: Function;

  /**
   * @public
   * @property reject
   * @desc     This is the 'fail' function.
   */
  public reject: Function;

  /**
   * @public
   * @function constructor
   * @param    {Function} resolve
   * @param    {Function} reject
   * @return   {ReolveReject}
   * @desc     The purpose of this method is to simply
   *           allow a developer to just add the properties
   *           via creating the object, nothing more nothing
   *           less.
   */
  public constructor (resolve: Function, reject: Function) {
    this.resolve = resolve;
    this.reject = reject;
    return this;
  }
}


/**
 * @class Promsie
 * @desc  This is a class that simply allows you to implement
 *        promises, this means that you can have code that will
 *        in theory wait for 'x' function to finish before 'y' function
 *        can start, this is known as async programming.
 */
class Promise {

  /**
   * @private
   * @property method
   * @desc     This is the method that the developer would like to run.
   */
  private method: Function;

  /**
   * @private
   * @property catching
   * @desc     This is the method that the developer would like to run,
   *           only when an error occurs.
   */
  private catching: Function;

  /**
   * @private
   * @property interval
   * @desc     This is the 'loop' so to speak.
   */
  private interval: any;

  /**
   * @private
   * @property queue
   * @desc     This is the queue of functions that you'd like to run,
   *           of course each element in the array is of type ResolveReject,
   *           this means that each element will have a resolve and a reject
   *           method in place.
   */
  private queue: Array<ResolveReject>;

  /**
   * @private
   * @property running
   * @desc     This property simply states whether or not the promise
   *           loop is currently in a running state or not.
   */
  private running: boolean;

  /**
   * @private
   * @property index
   * @desc     This property will be responsible for keeping track
   *           of how far one has progressed through the queue
   *           property.
   */
  private index: number;

  /**
   * @public
   * @function constructor
   * @desc     This simply allows you to create an object from the
   *           Promise class.
   */
  public constructor () {
    this.clear(true);
    return this;
  }

  /**
   * @public
   * @function then
   * @param    {any} promise
   * @return   {Promise}
   * @desc     The purpose of this method is to simply add some
   *           ResolveReject object to the queue property. This
   *           method is essentially also responsible for starting
   *           the whole process off.
   */
  public then (promise: any) : Promise {
    if (!(promise instanceof ResolveReject)) {
      const rejection = arguments[1] || null;
      promise = new ResolveReject(arguments[0], rejection);
    }

    if (this.queue == null || this.queue.length == 0) {
      this.clear(false);
      this.running = true;
    }

    this.queue.push(promise);

    if (this.running) {
      this.interval = setInterval(() => {
        if (this.queue == null || this.index >= this.queue.length) {
          this.clear(true);
          try {
            clearInterval(this.interval);
          } catch (Exception) {
            // do nothing
          }
        } else {
          const resolver = this.queue[this.index];
          this.method = resolver.resolve;
          this.catching = resolver.reject;
          this.run();
          this.index++;
        }
      }, 0);
    }

    return this;
  }

  /**
   * @private
   * @function clear
   * @param    {boolean} del
   * @return   {void}
   * @desc     This method will simply clear all properties from
   *           the current object, this method is only meant to run
   *           once the queue of ResolveReject objects has been
   *           completed. The reason as to why there is a boolean
   *           parameter here is to simply state if we would like
   *           to free up some system memory by deleting this object's
   *           properties or not.
   */
  private clear (del: boolean) : void {
    this.index = 0;
    this.running = false;
    this.queue = [];

    try {
      clearInterval(this.interval);
    } catch (NoSuchIntervalException) {
      // do nothing
    }

    if (del === true) {
      try {
        for (let x in this) {
          try {
            delete this[x];
          } catch (CannotDeleteException) {
            // do nothing
          }
        }
      } catch (NothingToIterateException) {
        // do nothing
      }
    }
  }

  /**
   * @private
   * @function resolve
   * @return   {void}
   * @desc     The purpose of this method is to simply allow the
   *           current object to go onto the next element in the queue
   *           property. It simply sets the method property to null.
   */
  private resolve () : void {
    this.method = null;
  }

  /**
   * @private
   * @function reject
   * @param    {Function} execute
   * @return   {void}
   * @desc     The purpose of this method is to set the current
   *           catching property to some new value.
   */
  private reject (execute: Function) : void {
    this.catching = execute;
  }

  /**
   * @private
   * @function run
   * @return   {void}
   * @desc     The purpose of this method is to execute the current
   *           method property.
   */
  private run () : void {
    try {
      this.method(this.resolve, this.reject);
    } catch (Exception) {
      try {
        this.catching(Exception, this.resolve);
      } catch (Exception) {
        this.clear(true);
        throw Exception;
      }
    }
  }
}
