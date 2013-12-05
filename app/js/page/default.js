define(function (require) {
  var AddTask = require('ui/add_task');
  var TaskList = require('ui/task_list');
  var TaskData = require('data/task_data');

  return function () {
    TaskData.attachTo(document);
    AddTask.attachTo('.js-add-task');
    TaskList.attachTo('.js-task-list');
  };
});
