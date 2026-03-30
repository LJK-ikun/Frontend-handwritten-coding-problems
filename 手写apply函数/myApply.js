Function.prototype.myApply = function (ctx, args) {
    context = ctx || window;
    context.fn = this;
    const result = args ? context.fn(...args) : context.fn();
    delete context.fn;
    return result;
  }