define(function (require) {
  var Component = require('flight/lib/component');
  return Component(function() {
    this.defaultAttrs({
      descSel: '.js-add-task-description',
      submitSel: '.js-add-task-submit'
    });
    this.after('initialize', function () {
      this.on('submit', handleSubmit);
      this.on(document, 'dataTaskAdded', handleTaskAdded);
    });
  });

  function handleSubmit (evt) {
    evt.preventDefault();
    this.select('submitSel').attr('disabled', true);
    this.select('descSel').attr('disabled', true);
    this.trigger('uiAddTask', {
      task: {
        desc: $.trim(this.select('descSel').val())
      }
    });
  }

  function handleTaskAdded () {
    this.select('submitSel').attr('disabled', false);
    this.select('descSel').attr('disabled', false);
  }
});