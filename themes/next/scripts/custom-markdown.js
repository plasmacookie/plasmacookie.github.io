const { marked } = require('marked');

hexo.extend.filter.register('template_locals', function(locals) {
  // 让 marked 在模板中可用
  locals.marked = marked;
  return locals;
});