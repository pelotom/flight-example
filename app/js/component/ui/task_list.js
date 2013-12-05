define(function (require) {
  var Component = require('flight/lib/component');
  return Component(function () {
    this.after('initialize', function () {
      this.on(document, 'dataTaskAdded', handleTaskAdded);
    });
  });

  function handleTaskAdded(e, data) {
    this.$node.append('<li>' + data.task.desc + '</li>');
  }
});