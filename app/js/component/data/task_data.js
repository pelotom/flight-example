define(function (require) {
  var idCounter = 0;

  var Component = require('flight/lib/component');
  return Component(function () {
    this.after('initialize', function () {
      
      this.tasks = {};

      this.on('uiAddTask', handleAddTask);
      this.on('uiNeedsTask', handleNeedsTask);
      this.on('uiTaskCompleted', handleTaskCompleted);
    });
  });

  function handleAddTask(e, data) {
    data.task.id = '' + idCounter++;
    this.tasks[data.task.id] = data.task;
    this.trigger('dataTaskAdded', { task: data.task });
  }

  function handleNeedsTask(e, data) {
    var task = this.tasks[data.taskId];
    if (task) {
      this.trigger('dataTask', {
        task: task
      });
    }
  }

  function handleTaskCompleted(e, data) {
    var task = this.tasks[data.taskId];
    if (task) {
      task.completed = true;
      this.trigger('dataTaskCompleted', { task: task });
    }
  }
});