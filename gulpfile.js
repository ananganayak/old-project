const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const {parallel, series, dest, src, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
// const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const terser = require('gulp-terser');
const ngAnnotate = require('gulp-ng-annotate');
const cleanCSS = require('gulp-clean-css');
// const plumber = require('gulp-plumber');
// const autoprefixer = require('autoprefixer');
// const imagemin = require('gulp-imagemin');
var $ = require('gulp-load-plugins')();


// Style function
function styles() {
  return src(['app/css/*.css'])
  .pipe($.plumber())
  .pipe($.autoprefixer('last 1 version'))
  .pipe(dest('.tmp/styles'))
  .pipe($.size());
};

// Scripts function
function scripts() {
  return src(['app/**/*.js'])
  .pipe($.jshint())
  .pipe(uglify())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe(dest('dist/scripts'))
  .pipe($.size());
};

// Partial Function
function partials() {
  return src(['app/**/*.html','app/**/*.json','app/**/*.xml'])
  .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
  }))
  .pipe(dest('dist/app'))
  .pipe($.size());
};

// Image Function 
function images() {
  return src(['app/img/**/*'])
  // .pipe(imagemin())
  // .pipe(imagemin({
  //   optimizationLevel: 3,
  //   progressive: true,
  //   interlaced: true
  // }))
  .pipe(dest('dist/app/img'))
  .pipe($.size());
};

// Fonts Function
function fonts() {
  return src(['app/fonts/**/*'])            
  .pipe(dest('dist/app/fonts'))
  .pipe($.size());
};

// Lib Function 
function libfilecopy(done) {
  src(['lib/config/**/*']) .pipe(dest('dist/lib/config'));
  src(['lib/echarts.min.js','lib/form-builder.min.js','lib/form-render.min.js','lib/socket.io.min.js']).pipe(dest('dist/lib'));
  src(['app/css/google_fonts.css']).pipe(dest('dist/app/css'));
  src(['app/css/lib/font-awesome/*.css']).pipe(dest('dist/app/css/lib/font-awesome'));
  src(['app/css/lib/ionicons/*.css']).pipe(dest('dist/app/css/lib/ionicons'));
  src(['app/css/lib/bootstrap/*.css']).pipe(dest('dist/app/css/lib/bootstrap'));
  src(['app/css/lib/uniform/*.css']).pipe(dest('dist/app/css/lib/uniform'));
  src(['sw.js','manifest.json']).pipe(dest('dist'));
  done();
};

// html Function
function html() {
  var jsFilter = $.filter('**/*.js',{restore: true});
  var cssFilter = $.filter('**/*.css',{restore: true});
  return src(['*.html'])
  .pipe($.plumber())
  .pipe(useref())
  .pipe($.rev())
  .pipe(jsFilter)
  .pipe($.ngAnnotate())
  .pipe(terser())
  .pipe(jsFilter.restore)
  .pipe(cssFilter)
  .pipe(cleanCSS())
  .pipe(cssFilter.restore)
  // .pipe(useref.restore())
  .pipe($.revReplace())
  .pipe(dest('dist'))
  .pipe($.size());
}

// clean Function
function clean(){
  return src(['.tmp'], {read: false}).pipe($.clean());
}

// Cachebust
function cacheBustTask(){
  var cbString = new Date().getTime();
  return src(['index.html'])
  .pipe($.replace(/cb=\d+/g, 'cb=' + cbString))
  .pipe(dest('.'));
}

// function karmatest(){
//   karma.start({
//     configFile: ''
//   }, done);
// }

// // watch Function
// function watchTask(){
//   // browserSync.init({
//   //   server : {
//   //     baseDir : './'
//   //   }
//   // })
//   watch('app/css/*.css', styles)
//   watch('app/**/*.js', scripts)
//   watch(('app/**/*.html','app/**/*.json','app/**/*.xml'), partials)
//   watch('app/fonts/**/*', fonts)
//   // gulp.watch('app/css/*.css', libfilecopy)
//   watch('app/img/**/*', images)
// }

// const html = series(styles, partials, scripts);

// exports.html = html;
// exports.styles = styles;
// exports.watch = watch;
// exports.scripts = scripts;
// exports.partials = partials;
// exports.clean = clean;
// exports.cacheBustTask = cacheBustTask;

// exports.karmatest = karmatest;

// exports.libfilecopy = libfilecopy;
// exports.images = images;
// exports.fonts = fonts;

gulp.task("html", html);
gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("partials", partials);
gulp.task("images", images);
gulp.task("fonts", fonts);
gulp.task("cacheBustTask", cacheBustTask);
gulp.task("clean", clean);


gulp.task("default", series(
  parallel(html, styles, scripts, partials, libfilecopy, images, fonts),
  // watchTask, 
  cacheBustTask,
  clean
));

