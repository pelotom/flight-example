define(function (require) {
  var Component = require('flight/lib/component');
  var withStorage = require('mixins/local_storage');

  return Component(taskData, withStorage);

  function taskData() {
    this.defaultAttrs({
      taskIdCounterKey: 'taskIdCounter',
      taskStorageKey: 'tasks'
    });

    this.after('initialize', function () {
      this.idCounter = this.retrieve(this.attr.taskIdCounterKey) || 0;
      this.tasks = this.retrieve(this.attr.taskStorageKey) || {};
      this.on('uiAddTask', handleAddTask);
      this.on('uiNeedsTask', handleNeedsTask);
      this.on('uiNeedsTasks', handleNeedsTasks);
      this.on('uiTaskCompleted', handleTaskCompleted);
    });
  }

  function handleAddTask(e, data) {
    data.task.id = '' + this.idCounter++;
    this.store(this.attr.taskIdCounterKey, this.idCounter);
    this.tasks[data.task.id] = data.task;
    this.store(this.attr.taskStorageKey, this.tasks);
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

  function handleNeedsTasks() {
    this.trigger('dataTasks', {
      tasks: this.tasks
    });
  }

  function handleTaskCompleted(e, data) {
    var task = this.tasks[data.taskId];
    if (task) {
      task.completed = true;
      this.trigger('dataTaskCompleted', { task: task });
    }
  }
});