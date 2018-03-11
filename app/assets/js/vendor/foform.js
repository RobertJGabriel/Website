'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  if (window.attachEvent && !window.addEventListener) return;
  /******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/if (installedModules[moduleId]) {
        /******/return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/var module = installedModules[moduleId] = {
        /******/i: moduleId,
        /******/l: false,
        /******/exports: {}
        /******/ };
      /******/
      /******/ // Execute the module function
      /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // identity function for calling harmony imports with the correct context
    /******/__webpack_require__.i = function (value) {
      return value;
    };
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
      /******/if (!__webpack_require__.o(exports, name)) {
        /******/Object.defineProperty(exports, name, {
          /******/configurable: false,
          /******/enumerable: true,
          /******/get: getter
          /******/ });
        /******/
      }
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
      /******/var getter = module && module.__esModule ?
      /******/function getDefault() {
        return module['default'];
      } :
      /******/function getModuleExports() {
        return module;
      };
      /******/__webpack_require__.d(getter, 'a', getter);
      /******/return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 6);
    /******/
  })(
  /************************************************************************/
  /******/[
  /* 0 */
  /***/function (module, exports, __webpack_require__) {

    /* WEBPACK VAR INJECTION */(function (setImmediate) {
      (function (root) {

        // Store setTimeout reference so promise-polyfill will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var setTimeoutFunc = setTimeout;

        function noop() {}

        // Polyfill for Function.prototype.bind
        function bind(fn, thisArg) {
          return function () {
            fn.apply(thisArg, arguments);
          };
        }

        function Promise(fn) {
          if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
          if (typeof fn !== 'function') throw new TypeError('not a function');
          this._state = 0;
          this._handled = false;
          this._value = undefined;
          this._deferreds = [];

          doResolve(fn, this);
        }

        function handle(self, deferred) {
          while (self._state === 3) {
            self = self._value;
          }
          if (self._state === 0) {
            self._deferreds.push(deferred);
            return;
          }
          self._handled = true;
          Promise._immediateFn(function () {
            var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
            if (cb === null) {
              (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
              return;
            }
            var ret;
            try {
              ret = cb(self._value);
            } catch (e) {
              reject(deferred.promise, e);
              return;
            }
            resolve(deferred.promise, ret);
          });
        }

        function resolve(self, newValue) {
          try {
            // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
              var then = newValue.then;
              if (newValue instanceof Promise) {
                self._state = 3;
                self._value = newValue;
                finale(self);
                return;
              } else if (typeof then === 'function') {
                doResolve(bind(then, newValue), self);
                return;
              }
            }
            self._state = 1;
            self._value = newValue;
            finale(self);
          } catch (e) {
            reject(self, e);
          }
        }

        function reject(self, newValue) {
          self._state = 2;
          self._value = newValue;
          finale(self);
        }

        function finale(self) {
          if (self._state === 2 && self._deferreds.length === 0) {
            Promise._immediateFn(function () {
              if (!self._handled) {
                Promise._unhandledRejectionFn(self._value);
              }
            });
          }

          for (var i = 0, len = self._deferreds.length; i < len; i++) {
            handle(self, self._deferreds[i]);
          }
          self._deferreds = null;
        }

        function Handler(onFulfilled, onRejected, promise) {
          this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
          this.onRejected = typeof onRejected === 'function' ? onRejected : null;
          this.promise = promise;
        }

        /**
         * Take a potentially misbehaving resolver function and make sure
         * onFulfilled and onRejected are only called once.
         *
         * Makes no guarantees about asynchrony.
         */
        function doResolve(fn, self) {
          var done = false;
          try {
            fn(function (value) {
              if (done) return;
              done = true;
              resolve(self, value);
            }, function (reason) {
              if (done) return;
              done = true;
              reject(self, reason);
            });
          } catch (ex) {
            if (done) return;
            done = true;
            reject(self, ex);
          }
        }

        Promise.prototype['catch'] = function (onRejected) {
          return this.then(null, onRejected);
        };

        Promise.prototype.then = function (onFulfilled, onRejected) {
          var prom = new this.constructor(noop);

          handle(this, new Handler(onFulfilled, onRejected, prom));
          return prom;
        };

        Promise.all = function (arr) {
          var args = Array.prototype.slice.call(arr);

          return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
              try {
                if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
                  var then = val.then;
                  if (typeof then === 'function') {
                    then.call(val, function (val) {
                      res(i, val);
                    }, reject);
                    return;
                  }
                }
                args[i] = val;
                if (--remaining === 0) {
                  resolve(args);
                }
              } catch (ex) {
                reject(ex);
              }
            }

            for (var i = 0; i < args.length; i++) {
              res(i, args[i]);
            }
          });
        };

        Promise.resolve = function (value) {
          if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
            return value;
          }

          return new Promise(function (resolve) {
            resolve(value);
          });
        };

        Promise.reject = function (value) {
          return new Promise(function (resolve, reject) {
            reject(value);
          });
        };

        Promise.race = function (values) {
          return new Promise(function (resolve, reject) {
            for (var i = 0, len = values.length; i < len; i++) {
              values[i].then(resolve, reject);
            }
          });
        };

        // Use polyfill for setImmediate for performance gains
        Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
          setImmediate(fn);
        } || function (fn) {
          setTimeoutFunc(fn, 0);
        };

        Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
          if (typeof console !== 'undefined' && console) {
            console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
          }
        };

        /**
         * Set the immediate function to execute callbacks
         * @param fn {function} Function to execute
         * @deprecated
         */
        Promise._setImmediateFn = function _setImmediateFn(fn) {
          Promise._immediateFn = fn;
        };

        /**
         * Change the function to execute on unhandled rejection
         * @param {function} fn Function to execute on unhandled rejection
         * @deprecated
         */
        Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
          Promise._unhandledRejectionFn = fn;
        };

        if (typeof module !== 'undefined' && module.exports) {
          module.exports = Promise;
        } else if (!root.Promise) {
          root.Promise = Promise;
        }
      })(this);

      /* WEBPACK VAR INJECTION */
    }).call(exports, __webpack_require__(4).setImmediate);

    /***/
  },
  /* 1 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var index = typeof fetch == 'function' ? fetch : function (url, options) {
      options = options || {};
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open(options.method || 'get', url);

        for (var i in options.headers) {
          request.setRequestHeader(i, options.headers[i]);
        }

        request.withCredentials = options.credentials == 'include';

        request.onload = function () {
          resolve(response());
        };

        request.onerror = reject;

        request.send(options.body);

        function response() {
          var _keys = [],
              all = [],
              headers = {},
              header;

          request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
            _keys.push(key = key.toLowerCase());
            all.push([key, value]);
            header = headers[key];
            headers[key] = header ? header + "," + value : value;
          });

          return {
            ok: (request.status / 200 | 0) == 1, // 200-399
            status: request.status,
            statusText: request.statusText,
            url: request.responseURL,
            clone: response,
            text: function text() {
              return Promise.resolve(request.responseText);
            },
            json: function json() {
              return Promise.resolve(request.responseText).then(JSON.parse);
            },
            xml: function xml() {
              return Promise.resolve(request.responseXML);
            },
            blob: function blob() {
              return Promise.resolve(new Blob([request.response]));
            },
            headers: {
              keys: function keys() {
                return _keys;
              },
              entries: function entries() {
                return all;
              },
              get: function get(n) {
                return headers[n.toLowerCase()];
              },
              has: function has(n) {
                return n.toLowerCase() in headers;
              }
            }
          };
        }
      });
    };

    /* harmony default export */__webpack_exports__["a"] = index;
    //# sourceMappingURL=unfetch.es.js.map


    /***/
  },
  /* 2 */
  /***/function (module, exports) {

    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
      return [];
    };

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
      return '/';
    };
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
      return 0;
    };

    /***/
  },
  /* 3 */
  /***/function (module, exports, __webpack_require__) {

    /* WEBPACK VAR INJECTION */(function (global, process) {
      (function (global, undefined) {
        "use strict";

        if (global.setImmediate) {
          return;
        }

        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;
        var doc = global.document;
        var registerImmediate;

        function setImmediate(callback) {
          // Callback can either be a function or a string
          if (typeof callback !== "function") {
            callback = new Function("" + callback);
          }
          // Copy function arguments
          var args = new Array(arguments.length - 1);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
          }
          // Store and register the task
          var task = { callback: callback, args: args };
          tasksByHandle[nextHandle] = task;
          registerImmediate(nextHandle);
          return nextHandle++;
        }

        function clearImmediate(handle) {
          delete tasksByHandle[handle];
        }

        function run(task) {
          var callback = task.callback;
          var args = task.args;
          switch (args.length) {
            case 0:
              callback();
              break;
            case 1:
              callback(args[0]);
              break;
            case 2:
              callback(args[0], args[1]);
              break;
            case 3:
              callback(args[0], args[1], args[2]);
              break;
            default:
              callback.apply(undefined, args);
              break;
          }
        }

        function runIfPresent(handle) {
          // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
          // So if we're currently running a task, we'll need to delay this invocation.
          if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
          } else {
            var task = tasksByHandle[handle];
            if (task) {
              currentlyRunningATask = true;
              try {
                run(task);
              } finally {
                clearImmediate(handle);
                currentlyRunningATask = false;
              }
            }
          }
        }

        function installNextTickImplementation() {
          registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
              runIfPresent(handle);
            });
          };
        }

        function canUsePostMessage() {
          // The test against `importScripts` prevents this implementation from being installed inside a web worker,
          // where `global.postMessage` means something completely different and can't be used for this purpose.
          if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
              postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
          }
        }

        function installPostMessageImplementation() {
          // Installs an event handler on `global` for the `message` event: see
          // * https://developer.mozilla.org/en/DOM/window.postMessage
          // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

          var messagePrefix = "setImmediate$" + Math.random() + "$";
          var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
              runIfPresent(+event.data.slice(messagePrefix.length));
            }
          };

          if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
          } else {
            global.attachEvent("onmessage", onGlobalMessage);
          }

          registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
          };
        }

        function installMessageChannelImplementation() {
          var channel = new MessageChannel();
          channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
          };

          registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
          };
        }

        function installReadyStateChangeImplementation() {
          var html = doc.documentElement;
          registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
              runIfPresent(handle);
              script.onreadystatechange = null;
              html.removeChild(script);
              script = null;
            };
            html.appendChild(script);
          };
        }

        function installSetTimeoutImplementation() {
          registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
          };
        }

        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
        attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

        // Don't get fooled by e.g. browserify environments.
        if ({}.toString.call(global.process) === "[object process]") {
          // For Node.js before 0.9
          installNextTickImplementation();
        } else if (canUsePostMessage()) {
          // For non-IE10 modern browsers
          installPostMessageImplementation();
        } else if (global.MessageChannel) {
          // For web workers, where supported
          installMessageChannelImplementation();
        } else if (doc && "onreadystatechange" in doc.createElement("script")) {
          // For IE 6â€“8
          installReadyStateChangeImplementation();
        } else {
          // For older browsers
          installSetTimeoutImplementation();
        }

        attachTo.setImmediate = setImmediate;
        attachTo.clearImmediate = clearImmediate;
      })(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);

      /* WEBPACK VAR INJECTION */
    }).call(exports, __webpack_require__(5), __webpack_require__(2));

    /***/
  },
  /* 4 */
  /***/function (module, exports, __webpack_require__) {

    var apply = Function.prototype.apply;

    // DOM APIs, for completeness

    exports.setTimeout = function () {
      return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
    };
    exports.setInterval = function () {
      return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
    };
    exports.clearTimeout = exports.clearInterval = function (timeout) {
      if (timeout) {
        timeout.close();
      }
    };

    function Timeout(id, clearFn) {
      this._id = id;
      this._clearFn = clearFn;
    }
    Timeout.prototype.unref = Timeout.prototype.ref = function () {};
    Timeout.prototype.close = function () {
      this._clearFn.call(window, this._id);
    };

    // Does not start the time, just sets up the members needed.
    exports.enroll = function (item, msecs) {
      clearTimeout(item._idleTimeoutId);
      item._idleTimeout = msecs;
    };

    exports.unenroll = function (item) {
      clearTimeout(item._idleTimeoutId);
      item._idleTimeout = -1;
    };

    exports._unrefActive = exports.active = function (item) {
      clearTimeout(item._idleTimeoutId);

      var msecs = item._idleTimeout;
      if (msecs >= 0) {
        item._idleTimeoutId = setTimeout(function onTimeout() {
          if (item._onTimeout) item._onTimeout();
        }, msecs);
      }
    };

    // setimmediate attaches itself to the global object
    __webpack_require__(3);
    exports.setImmediate = setImmediate;
    exports.clearImmediate = clearImmediate;

    /***/
  },
  /* 5 */
  /***/function (module, exports) {

    var g;

    // This works in non-strict mode
    g = function () {
      return this;
    }();

    try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1, eval)("this");
    } catch (e) {
      // This works if the window reference is available
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object") g = window;
    }

    // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}

    module.exports = g;

    /***/
  },
  /* 6 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_promise_polyfill__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_promise_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise_polyfill__);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__(1);

    // To add to window
    if (!window.Promise) {
      window.Promise = __WEBPACK_IMPORTED_MODULE_0_promise_polyfill___default.a;
    }

    if (!window.fetch) {
      window.fetch = __WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */];
    }

    (function () {
      try {
        var submit = function submit(onSubmitMethodName, form, onSuccessMethodName, onFailureMethodName, state, foformId) {
          executeIfGlobalFunction(onSubmitMethodName);

          var postData = { isFinal: true };
          postData.formData = getFormData(form);

          var successAction = function successAction() {
            if (onSubmitMethodName) {
              executeIfGlobalFunction(onSuccessMethodName);
            } else {
              removeFormInsertThank(form);
            }
          };
          function failureAction() {
            executeIfGlobalFunction(onFailureMethodName);
          }

          processForm(state, postData, foformId, successAction, failureAction);
        };

        var processForm = function processForm(state, postData, foformId, action, failureAction) {
          if (!state.submissionUuid && state.createSubmissionSent) {
            state.pendingSubmissionData.push(postData);
          } else if (state.submissionUuid) {
            updateSubmission(postData, foformId, state.submissionUuid).then(function (data) {
              action();
            }).catch(function (err) {
              failureAction();
            });
          } else {
            state.createSubmissionSent = true;
            state.submissionUuid = uuidv4();
            postData.uuid = state.submissionUuid;
            createSubmission(postData, foformId).then(function (response) {
              return response.json();
            }).then(function (jsonData) {
              action();
              for (var index = 0; index < state.pendingSubmissionData.length; index += 1) {
                updateSubmission(state.pendingSubmissionData[index], foformId, state.submissionUuid).then(function (data) {}).catch(function (err) {
                  failureAction();
                });
              }
            }).catch(function (err) {
              failureAction();
            });
          }
        };

        var getFormData = function getFormData(form) {
          var formDataAsOrderedObjects = [];
          for (var fieldIndex = 0; fieldIndex < form.length; fieldIndex++) {
            var field = form[fieldIndex];
            if (field.type !== 'submit') {
              formDataAsOrderedObjects.push({ name: field.name, value: field.value });
            }
          }
          return formDataAsOrderedObjects;
        };

        var createSubmission = function createSubmission(data, foformId) {
          console.log('Creating the submission');
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])(baseApiUrl + '/forms/' + foformId + '/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).then(function (response) {
            if (response.ok) {
              return response;
            }
            throw new Error('Failed to create submission');
          });
        };

        var updateSubmission = function updateSubmission(data, foformId, submissionUuid) {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])(baseApiUrl + '/submissions/' + submissionUuid, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).then(function (response) {
            if (response.ok) {
              return response;
            }
            throw new Error('error updating  submission');
          });
        };

        var removeFormInsertThank = function removeFormInsertThank(form) {
          var paragraph = document.createElement('p');
          paragraph.className = 'foform-success';
          var textNode = document.createTextNode('Thank you for contacting us.');
          paragraph.appendChild(textNode);
          form.parentElement.replaceChild(paragraph, form);
        };

        var uuidv4 = function uuidv4() {
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };

        var s4 = function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        var executeIfGlobalFunction = function executeIfGlobalFunction(functionName) {
          if (typeof window[functionName] === 'function') {
            window[functionName]();
          }
        };

        var isDev = Boolean(document.querySelectorAll('[foform-is-dev="true"]').length);
        console.log('Development mode is', isDev);

        var baseApiUrl = '';
        if (isDev) {
          baseApiUrl = 'https://dev-api.foform.com';
        } else {
          baseApiUrl = 'https://api.foform.com';
        }

        document.addEventListener('DOMContentLoaded', function () {
          var state = {
            submissionUuid: null,
            createSubmissionSent: false,
            pendingSubmissionData: []
          };

          var forms = document.getElementsByTagName('form');
          var foformActionUrlRegex = /api.foform.com\/forms\/.*\/submissions/;
          console.log('Forms on page', forms);
          var foformForms = [].concat(_toConsumableArray(forms)).filter(function (form) {
            return foformActionUrlRegex.test(form.action);
          });

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var form = _step.value;

              var foformActionUrl = form.attributes.action.value;
              var regex = /forms\/(.*)\/submissions/;
              var foformId = foformActionUrl.match(regex)[1];

              form.addEventListener('submit', function (event) {
                event.preventDefault();

                var onSubmitMethodName = form.getAttribute('data-on-submit');
                var onSuccessMethodName = form.getAttribute('data-on-success');
                var onFailureMethodName = form.getAttribute('data-on-error');
                var onValidateMethodName = form.getAttribute('data-is-valid');

                if (typeof window[onValidateMethodName] === 'function') {
                  if (window[onValidateMethodName]()) {
                    submit(onSubmitMethodName, form, onSuccessMethodName, onFailureMethodName, state, foformId);
                  } else {
                    console.log('Validation error');
                  }
                } else {
                  submit(onSubmitMethodName, form, onSuccessMethodName, onFailureMethodName, state, foformId);
                }
              }, false);

              form.addEventListener('blur', function (event) {
                if (event.srcElement.type !== 'submit') {
                  var postData = { isFinal: false };
                  postData.formData = getFormData(form);
                  processForm(state, postData, foformId, function () {});
                }
              }, true);
            };

            for (var _iterator = foformForms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    })();

    /***/
  }]);
})();
