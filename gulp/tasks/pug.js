'use strict';

module.exports = function() {
  const patterns = [];
  $.gulp.task('pug', function() {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}` });

    return $.gulp.src('./source/template/*.pug')
      .pipe($.gp.pug({ pretty: true }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        };
      }))
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.root))
	  .pipe($.browserSync.stream({once: true}));
  });
};
