define(function (require) {
  var Component = require('flight/lib/component');
  
  return Component(taskList);

  function taskList() {
    this.after('initialize', function () {
      this.on(document, 'dataTasks', this.handleDataTasks);
      this.on(document, 'dataTaskAdded', this.handleTaskAdded);
      this.trigger('uiNeedsTasks');
    });

    this.handleDataTasks = function (e, data) {
      for (key in data.tasks)
        this.addTaskItem(data.tasks[key]);
    }

    this.handleTaskAdded = function (e, data) {
      this.addTaskItem(data.task);
    }

    this.addTaskItem = function (task) {
      this.$node.append('<li>' + task.desc + '</li>');
    }
  }
});