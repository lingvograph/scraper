'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var jsBase64 = require('js-base64');
var fetch = _interopDefault(require('isomorphic-unfetch'));
var cheerio = _interopDefault(require('cheerio'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

function strip(s) {
  return _.trim(s == null ? void 0 : s.trim(), "\u200B");
}

function isNode() {
  return Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}

function isBrowser() {
  return !isNode() && typeof window !== "undefined";
}

var IS_BROWSER = /*#__PURE__*/isBrowser();

var unsplash = {
  type: "visual",
  name: "unsplash",
  url: "https://unsplash.com",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text;
    var txt = text.replace(" ", "-");
    return "/s/photos/" + txt;
  },
  plan: [{
    selector: "div[data-test=\"search-photos-route\"] figure img",
    exclude: ["^https://images.unsplash.com/profile-"],
    visual: ["@src"]
  }]
};

var wordnik = {
  type: "universal",
  engine: "playwright",
  name: "wordnik",
  url: "https://www.wordnik.com",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text;
    return "/words/" + text;
  },
  plan: [{
    selector: ".flickr-module .thumbs img",
    visual: ["@src"]
  }]
};

var macmillan = {
  type: "universal",
  name: "macmillan",
  url: "https://www.macmillandictionary.com",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text;
    return "/dictionary/british/" + text;
  },
  plan: [{
    selector: ".audio_play_button",
    audio: ["@data-src-mp3", "@data-src-ogg"]
  }, {
    selector: ".PRON",
    term: "transcription"
  }, {
    selector: ".PART-OF-SPEECH",
    term: "tag"
  }, {
    selector: ".SYNTAX-CODING",
    term: "tag"
  }, {
    selector: ".DEFINITION",
    term: "definition"
  }, {
    selector: ".EXAMPLES",
    term: "in"
  }, {
    selector: ".PHR-XREF",
    term: "in"
  }, {
    selector: ".synonyms .theslink",
    exclude: ["..."],
    term: "synonym"
  }]
};

var AUDIO_HOST = "https://audio00.forvo.com/audios/mp3";
var encode = encodeURIComponent;

function unquote(s) {
  if (s && s.startsWith("'")) {
    return s.substr(1, s.length - 2);
  }

  return s;
}

function parse_fn(src) {
  if (!src) {
    return undefined;
  }

  var i = src.indexOf("(");
  var j = src.indexOf(")");
  var name = src.substr(0, i);
  var a = src.substr(i + 1, j - i - 1).split(",");
  var args = a.map(unquote);
  return {
    name: name,
    args: args
  };
}

function translate_gender(val) {
  val = strip(val);

  if (val === "\u0436\u0435\u043D\u0449\u0438\u043D\u0430") {
    return "f";
  }

  if (val === "\u043C\u0443\u0436\u0447\u0438\u043D\u0430") {
    return "m";
  }

  return val;
}

function translate_counry(val) {
  val = strip(val); // r = dictcom.translate(val)
  // if r is not None and len(r['tran']) > 0:
  //     return r['tran'][0].lower()

  return val;
}

function parse_from(s) {
  if (!s) {
    return undefined;
  }

  s = _.trimEnd(_.trimStart(s, "("), ")");
  var a = s.split(",");

  if (_.isEmpty(a)) {
    return undefined;
  }

  var result = {
    gender: translate_gender(a[0])
  };

  if (a.length === 2) {
    result.country = translate_counry(a[1]);
  }

  return result;
}

var forvo = {
  type: "audio",
  name: "forvo",
  url: "https://forvo.com",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text,
        lang = _ref.lang;
    return "https://ru.forvo.com/word/" + encode(text) + "/#" + lang;
  },
  plan: [{
    selector: "article.pronunciations ul.show-all-pronunciations li",
    parse: /*#__PURE__*/function () {
      var _parse = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(elem) {
        var btn, fn, rel, url, result, author, val, from, d;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return elem.$$("span.play");

              case 2:
                btn = _context.sent[0];

                if (btn) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", undefined);

              case 5:
                _context.t0 = parse_fn;
                _context.next = 8;
                return btn.getAttribute("onclick");

              case 8:
                _context.t1 = _context.sent;
                fn = (0, _context.t0)(_context.t1);

                if (!(!fn || fn.name !== "Play")) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", undefined);

              case 12:
                rel = jsBase64.Base64.decode(fn["args"][4]);
                url = AUDIO_HOST + "/" + rel;

                if (url.endsWith(".mp3")) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", undefined);

              case 16:
                result = {
                  url: url
                };
                _context.next = 19;
                return elem.$$("span.ofLink");

              case 19:
                author = _context.sent[0];

                if (!author) {
                  _context.next = 25;
                  break;
                }

                _context.next = 23;
                return author.getAttribute("data-p2");

              case 23:
                val = _context.sent;

                if (val) {
                  result.author = val;
                }

              case 25:
                _context.next = 27;
                return elem.$$("span.from");

              case 27:
                from = _context.sent[0];

                if (!from) {
                  _context.next = 35;
                  break;
                }

                _context.t2 = parse_from;
                _context.next = 32;
                return from.textContent();

              case 32:
                _context.t3 = _context.sent;
                d = (0, _context.t2)(_context.t3);

                if (d) {
                  Object.assign(result, d);
                }

              case 35:
                return _context.abrupt("return", [{
                  audio: result
                }]);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function parse(_x) {
        return _parse.apply(this, arguments);
      }

      return parse;
    }()
  }]
};

var howjsay = {
  type: "audio",
  name: "howjsay",
  url: "https://howjsay.com",
  getData: function getData(_ref) {
    return _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var text, url;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = _ref.text;
              url = "https://howjsay.com/mp3/" + encodeURIComponent(text) + ".mp3"; // TODO check url exists

              return _context.abrupt("return", {
                audio: [{
                  url: url
                }]
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};

var webster = {
  type: "universal",
  name: "merriam-webster",
  url: "https://www.merriam-webster.com",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text;
    return "/dictionary/" + encodeURIComponent(text);
  },
  plan: [{
    selector: "span.prs a.play-pron",
    audio: /*#__PURE__*/function () {
      var _audio = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(btn) {
        var lang, dir, file;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return btn.getAttribute("data-lang");

              case 2:
                lang = _context.sent.replace("_", "/");
                _context.next = 5;
                return btn.getAttribute("data-dir");

              case 5:
                dir = _context.sent;
                _context.next = 8;
                return btn.getAttribute("data-file");

              case 8:
                file = _context.sent;
                return _context.abrupt("return", "https://media.merriam-webster.com/audio/prons/" + lang + "/mp3/" + dir + "/" + file + ".mp3");

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function audio(_x) {
        return _audio.apply(this, arguments);
      }

      return audio;
    }()
  }, {
    selector: "span.prs span.pr",
    term: "transcription"
  }, {
    selector: "div.vg .dt",
    term: "definition",
    lstrip: ":"
  }, {
    selector: ".ex-sent.t",
    term: "in"
  }, {
    selector: ".ure",
    term: "related"
  }, {
    selector: "span.fl",
    term: "tag"
  }]
};

var header = "div.page div.dictionary div.pos-header";
var body = "div.page div.dictionary div.pos-body"; // TODO get translations

var cambridge = {
  type: "universal",
  name: "cambridge",
  url: "https://dictionary.cambridge.org",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text;
    var txt = text.replace(" ", "-");
    return "/dictionary/english/" + txt;
  },
  plan: [{
    // TODO extract region too
    selector: header + " span.dpron-i amp-audio source",
    audio: ["@src"]
  }, {
    selector: header + " span.dpron-i span.ipa",
    term: "transcription"
  }, {
    selector: header + " .posgram .pos",
    term: "tag"
  }, {
    selector: header + " .posgram .gram .gc",
    term: "tag",
    map: function map(c) {
      var codes = {
        C: "countable",
        U: "uncountable",
        S: "singular"
      };
      return codes[c] || undefined;
    }
  }, {
    selector: body + " div.def-block div.def",
    term: "definition"
  }, {
    selector: body + " div.def-block amp-img",
    visual: ["@src"]
  }, {
    selector: body + " div.def-block span.eg",
    term: "in"
  }, {
    selector: "div.page div.dataset span.deg",
    term: "in"
  }, {
    selector: "div.page div.dataset div.cpegs div.lbb a.hdib",
    term: "collocation"
  }]
};

var urban = {
  type: "universal",
  name: "urban-dictionary",
  url: "https://www.urbandictionary.com",
  makeUrl: function makeUrl(_ref) {
    var text = _ref.text;
    return "/define.php?term=" + encodeURIComponent(text);
  },
  plan: [{
    selector: "#content div.def-panel a.play-sound",
    audio: ["@data-urls"],
    map: function map(s) {
      return _.trimEnd(_.trimStart(s, "[\""), "\"]");
    }
  }, {
    selector: "#content div.def-panel div.meaning",
    term: "definition"
  }]
};

var EngineStub = /*#__PURE__*/function () {
  function EngineStub() {}

  var _proto = EngineStub.prototype;

  _proto.$$ = function $$(selector) {
    return Promise.resolve([]);
  };

  _proto.close = function close() {
    return Promise.resolve(undefined);
  };

  return EngineStub;
}();

var ElementImpl = /*#__PURE__*/function () {
  function ElementImpl(page, elem) {
    this.page = page;
    this.elem = elem;
  }

  var _proto2 = ElementImpl.prototype;

  _proto2.$$ = /*#__PURE__*/function () {
    var _$$ = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(selector) {
      var _this = this;

      var elems;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.elem.$$(selector);

            case 2:
              elems = _context.sent;
              return _context.abrupt("return", elems.map(function (e) {
                return new ElementImpl(_this.page, e);
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function $$(_x) {
      return _$$.apply(this, arguments);
    }

    return $$;
  }();

  _proto2.getAttribute = function getAttribute(name) {
    return this.elem.getAttribute(name);
  };

  _proto2.textContent = function textContent() {
    return this.elem.textContent();
  };

  return ElementImpl;
}();

var EngineImpl = /*#__PURE__*/function () {
  function EngineImpl(browser, page) {
    this.browser = browser;
    this.page = page;
  }

  var _proto3 = EngineImpl.prototype;

  _proto3.$$ = /*#__PURE__*/function () {
    var _$$2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(selector) {
      var _this2 = this;

      var elems;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.page.waitForSelector(selector, {
                timeout: 5000
              });

            case 3:
              _context2.next = 7;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);

            case 7:
              _context2.next = 9;
              return this.page.$$(selector);

            case 9:
              elems = _context2.sent;
              return _context2.abrupt("return", elems.map(function (e) {
                return new ElementImpl(_this2.page, e);
              }));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 5]]);
    }));

    function $$(_x2) {
      return _$$2.apply(this, arguments);
    }

    return $$;
  }();

  _proto3.close = /*#__PURE__*/function () {
    var _close = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.page.close();

            case 2:
              _context3.next = 4;
              return this.browser.close();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function close() {
      return _close.apply(this, arguments);
    }

    return close;
  }();

  return EngineImpl;
}();

function makePlaywrightEngine(_x3) {
  return _makePlaywrightEngine.apply(this, arguments);
}

function _makePlaywrightEngine() {
  _makePlaywrightEngine = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(url) {
    var _require, chromium, browser, page;

    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!IS_BROWSER) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", new EngineStub());

          case 2:
            // TODO support other browser
            _require = require("playwright"), chromium = _require.chromium;
            _context4.next = 5;
            return chromium.launch();

          case 5:
            browser = _context4.sent;
            _context4.next = 8;
            return browser.newPage();

          case 8:
            page = _context4.sent;
            _context4.next = 11;
            return page["goto"](url);

          case 11:
            return _context4.abrupt("return", new EngineImpl(browser, page));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _makePlaywrightEngine.apply(this, arguments);
}

var CheerioElement = /*#__PURE__*/function () {
  function CheerioElement($, elem) {
    this.$ = $;
    this.elem = elem;
  }

  var _proto = CheerioElement.prototype;

  _proto.$$ = /*#__PURE__*/function () {
    var _$$ = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(selector) {
      var _this = this;

      var $, result;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $ = this.elem.find(selector);
              result = [];
              $.each(function (i, elem) {
                result.push(new CheerioElement(_this.$, _this.$(elem)));
              });
              return _context.abrupt("return", result);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function $$(_x) {
      return _$$.apply(this, arguments);
    }

    return $$;
  }();

  _proto.getAttribute = /*#__PURE__*/function () {
    var _getAttribute = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(name) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.elem.attr(name));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getAttribute(_x2) {
      return _getAttribute.apply(this, arguments);
    }

    return getAttribute;
  }();

  _proto.textContent = /*#__PURE__*/function () {
    var _textContent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.elem.text());

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function textContent() {
      return _textContent.apply(this, arguments);
    }

    return textContent;
  }();

  return CheerioElement;
}();

var CheerioEngine = /*#__PURE__*/function () {
  function CheerioEngine(html) {
    this.$ = cheerio.load(html);
  }

  var _proto2 = CheerioEngine.prototype;

  _proto2.$$ = function $$(selector) {
    var _this2 = this;

    var $ = this.$(selector);
    var result = [];
    $.each(function (i, elem) {
      result.push(new CheerioElement(_this2.$, _this2.$(elem)));
    });
    return Promise.resolve(result);
  };

  _proto2.close = function close() {
    return Promise.resolve(undefined);
  };

  return CheerioEngine;
}();

function makeCheerioEngine(_x3) {
  return _makeCheerioEngine.apply(this, arguments);
}

function _makeCheerioEngine() {
  _makeCheerioEngine = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(url) {
    var resp, html;
    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (IS_BROWSER) {
              url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
            }

            _context4.next = 3;
            return fetch(url, {
              headers: {
                "User-Agent": "lingua-bot",
                Accept: "text/html,application/xhtml+xml"
              }
            });

          case 3:
            resp = _context4.sent;

            if (resp.ok) {
              _context4.next = 6;
              break;
            }

            throw new Error(resp.statusText);

          case 6:
            _context4.next = 8;
            return resp.text();

          case 8:
            html = _context4.sent;
            return _context4.abrupt("return", new CheerioEngine(html));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _makeCheerioEngine.apply(this, arguments);
}

function makeEngine(type, url) {
  if (type === "playwright") {
    return makePlaywrightEngine(url);
  }

  return makeCheerioEngine(url);
}

var sources = [unsplash, wordnik, macmillan, webster, cambridge, urban, forvo, howjsay];

function parse(_x, _x2, _x3) {
  return _parse.apply(this, arguments);
}

function _parse() {
  _parse = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(source, root, query) {
    var data, ensureSet, collect, is_excluded, term_handler, get_values, audio_handler, visual_handler, parse_handler, _iterator4, _step4, item;

    return runtime_1.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            data = {};

            ensureSet = function ensureSet(key) {
              if (key && !data[key]) {
                data[key] = new Set();
              }
            };

            collect = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(key, item, extract) {
                var content, elements, _iterator, _step, element, values, _iterator2, _step2, val;

                return runtime_1.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        ensureSet(key);
                        content = key ? data[key] : undefined;
                        _context2.next = 4;
                        return root.$$(item.selector);

                      case 4:
                        elements = _context2.sent;
                        _iterator = _createForOfIteratorHelperLoose(elements);

                      case 6:
                        if ((_step = _iterator()).done) {
                          _context2.next = 16;
                          break;
                        }

                        element = _step.value;
                        _context2.next = 10;
                        return extract(item, element);

                      case 10:
                        values = _context2.sent;

                        if (Array.isArray(values)) {
                          _context2.next = 13;
                          break;
                        }

                        return _context2.abrupt("continue", 14);

                      case 13:
                        for (_iterator2 = _createForOfIteratorHelperLoose(values.filter(function (v) {
                          return !_.isNil(v) && v !== "";
                        })); !(_step2 = _iterator2()).done;) {
                          val = _step2.value;

                          if (content) {
                            content.add(val);
                          } else {
                            _.forEach(val, function (v, k) {
                              ensureSet(k);
                              data[k].add(v);
                            });
                          }
                        }

                      case 14:
                        _context2.next = 6;
                        break;

                      case 16:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function collect(_x5, _x6, _x7) {
                return _ref3.apply(this, arguments);
              };
            }();

            is_excluded = function is_excluded(item, val) {
              if (item.exclude) {
                return item.exclude.some(function (s) {
                  if (s.startsWith("^")) {
                    return val.startsWith(s.substr(1));
                  }

                  return val === s;
                });
              }

              return false;
            };

            term_handler = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(item, elem) {
                var val;
                return runtime_1.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = strip;
                        _context3.next = 3;
                        return elem.textContent();

                      case 3:
                        _context3.t1 = _context3.sent;
                        val = (0, _context3.t0)(_context3.t1);

                        if (val) {
                          _context3.next = 7;
                          break;
                        }

                        return _context3.abrupt("return", undefined);

                      case 7:
                        if (!is_excluded(item, val)) {
                          _context3.next = 9;
                          break;
                        }

                        return _context3.abrupt("return", undefined);

                      case 9:
                        if (item.lstrip && val.startsWith(item.lstrip)) {
                          val = strip(val.substr(item.lstrip.length));
                        }

                        if (val) {
                          _context3.next = 12;
                          break;
                        }

                        return _context3.abrupt("return", undefined);

                      case 12:
                        if (item.map) {
                          val = item.map(val);
                        }

                        if (val) {
                          _context3.next = 15;
                          break;
                        }

                        return _context3.abrupt("return", undefined);

                      case 15:
                        return _context3.abrupt("return", [val]);

                      case 16:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function term_handler(_x8, _x9) {
                return _ref4.apply(this, arguments);
              };
            }();

            get_values = /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(item, elem, commands) {
                var results, _iterator3, _step3, cmd, val, _val;

                return runtime_1.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        results = [];

                        if (!_.isArray(commands)) {
                          _context4.next = 33;
                          break;
                        }

                        _iterator3 = _createForOfIteratorHelperLoose(commands);

                      case 3:
                        if ((_step3 = _iterator3()).done) {
                          _context4.next = 31;
                          break;
                        }

                        cmd = _step3.value;
                        val = void 0;

                        if (!_.isString(cmd)) {
                          _context4.next = 20;
                          break;
                        }

                        if (!cmd.startsWith("@")) {
                          _context4.next = 13;
                          break;
                        }

                        _context4.next = 10;
                        return elem.getAttribute(cmd.substr(1));

                      case 10:
                        val = _context4.sent;
                        _context4.next = 18;
                        break;

                      case 13:
                        _context4.t0 = strip;
                        _context4.next = 16;
                        return elem.text();

                      case 16:
                        _context4.t1 = _context4.sent;
                        val = (0, _context4.t0)(_context4.t1);

                      case 18:
                        _context4.next = 23;
                        break;

                      case 20:
                        _context4.next = 22;
                        return cmd(elem);

                      case 22:
                        val = _context4.sent;

                      case 23:
                        if (!is_excluded(item, val)) {
                          _context4.next = 25;
                          break;
                        }

                        return _context4.abrupt("continue", 29);

                      case 25:
                        if (item.map) {
                          val = item.map(val);
                        }

                        if (val) {
                          _context4.next = 28;
                          break;
                        }

                        return _context4.abrupt("continue", 29);

                      case 28:
                        results.push(val);

                      case 29:
                        _context4.next = 3;
                        break;

                      case 31:
                        _context4.next = 37;
                        break;

                      case 33:
                        _context4.next = 35;
                        return commands(elem);

                      case 35:
                        _val = _context4.sent;

                        if (!is_excluded(item, _val)) {
                          if (item.map) {
                            _val = item.map(_val);
                          }

                          if (_val) {
                            results.push(_val);
                          }
                        }

                      case 37:
                        return _context4.abrupt("return", results.length === 0 ? undefined : results);

                      case 38:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function get_values(_x10, _x11, _x12) {
                return _ref5.apply(this, arguments);
              };
            }();

            audio_handler = /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(item, elem) {
                return runtime_1.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return get_values(item, elem, item.audio);

                      case 2:
                        return _context5.abrupt("return", _context5.sent);

                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function audio_handler(_x13, _x14) {
                return _ref6.apply(this, arguments);
              };
            }();

            visual_handler = /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(item, elem) {
                return runtime_1.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return get_values(item, elem, item.visual);

                      case 2:
                        return _context6.abrupt("return", _context6.sent);

                      case 3:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function visual_handler(_x15, _x16) {
                return _ref7.apply(this, arguments);
              };
            }();

            parse_handler = function parse_handler(item, elem) {
              return item.parse(elem);
            };

            _iterator4 = _createForOfIteratorHelperLoose(source.plan);

          case 10:
            if ((_step4 = _iterator4()).done) {
              _context7.next = 32;
              break;
            }

            item = _step4.value;

            if (!item.term) {
              _context7.next = 17;
              break;
            }

            _context7.next = 15;
            return collect(item.term, item, term_handler);

          case 15:
            _context7.next = 30;
            break;

          case 17:
            if (!item.audio) {
              _context7.next = 22;
              break;
            }

            _context7.next = 20;
            return collect("audio", item, audio_handler);

          case 20:
            _context7.next = 30;
            break;

          case 22:
            if (!item.visual) {
              _context7.next = 27;
              break;
            }

            _context7.next = 25;
            return collect("visual", item, visual_handler);

          case 25:
            _context7.next = 30;
            break;

          case 27:
            if (!item.parse) {
              _context7.next = 30;
              break;
            }

            _context7.next = 30;
            return collect(undefined, item, parse_handler);

          case 30:
            _context7.next = 10;
            break;

          case 32:
            return _context7.abrupt("return", {
              source: {
                name: source.name,
                url: source.url
              },
              data: _.mapValues(data, function (v) {
                return Array.from(v);
              })
            });

          case 33:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _parse.apply(this, arguments);
}

function makeParser(source) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref) {
      var text, lang, query, data, url, engine, results;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = _ref.text, lang = _ref.lang;
              // TODO auto detect lang
              query = {
                text: text,
                lang: lang || "en"
              };

              if (!source.getData) {
                _context.next = 14;
                break;
              }

              _context.prev = 3;
              _context.next = 6;
              return source.getData(query);

            case 6:
              data = _context.sent;
              return _context.abrupt("return", {
                source: {
                  name: source.name,
                  url: source.url
                },
                data: data
              });

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log("error", source.name, _context.t0);
              return _context.abrupt("return", {
                source: {
                  name: source.name,
                  url: source.url
                },
                error: _context.t0
              });

            case 14:
              url = source.makeUrl(query);

              if (url.startsWith("/")) {
                url = source.url + url;
              }

              _context.prev = 16;
              _context.next = 19;
              return makeEngine(source.engine, url);

            case 19:
              engine = _context.sent;
              results = parse(source, engine, query);
              return _context.abrupt("return", results);

            case 24:
              _context.prev = 24;
              _context.t1 = _context["catch"](16);
              console.log("error", source.name, _context.t1);
              return _context.abrupt("return", {
                source: {
                  name: source.name,
                  url: source.url
                },
                error: _context.t1
              });

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10], [16, 24]]);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }();
}

function fetchData(query, options) {
  if (options === void 0) {
    options = {};
  }

  var src = options.sources || sources.filter(function (s) {
    if (options.type && !(s.type === options.type || s.type === "universal")) {
      return false;
    }

    if (!_.isEmpty(options.include) && !options.include.some(function (name) {
      return s.name.toLowerCase() === name.toLowerCase();
    })) {
      return false;
    }

    if (!_.isEmpty(options.exclude) && options.exclude.some(function (name) {
      return s.name.toLowerCase() === name.toLowerCase();
    })) {
      return false;
    }

    return true;
  });
  return Promise.all(src.map(makeParser).map(function (fn) {
    return fn(query);
  }));
}

exports.fetchData = fetchData;
exports.sources = sources;
//# sourceMappingURL=lingua-scraper.cjs.development.js.map