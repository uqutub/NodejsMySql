// Import Modules
var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var sequence = require('gulp-sequence');
var gulpNodemon = require('gulp-nodemon');
//var gulpIgnore = require('gulp-ignore');
var typescript = require('gulp-typescript');

// Define Typescript Configuration
var clientTsConfig = {
    "target": "ES5",
    "module": "system",
    "moduleResolution": "node",
    "sourceMap": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
};

var serverTsConfig = {
    "target": "ES5",
    "module": "commonjs",
    "sourceMap": true
};

// Define Paths
var path = {
    libjs: [
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/materialize-css/dist/js/materialize.js',
    ],
    libcss: [
        'node_modules/materialize-css/dist/css/materialize.css',
        'node_modules/mdi/css/materialdesignicons.css',
        'node_modules/mdi/css/materialdesignicons.css.map'
    ],
    libfonts: [
        'node_modules/materialize-css/dist/fonts/**/*',
        'node_modules/mdi/fonts/**/*'
    ],
    index: 'src/client/index.html',
    html: 'src/client/components/**/*.html',
    css: 'src/client/components/**/*.css',
    clientts: 'src/client/components/**/*.ts',
    serverts: 'src/server/**/*.ts',
    dist: 'dist',
    distclient: 'dist/public',
    distclientapp: 'dist/public/components',
    distclientlib: 'dist/public/lib',
    distclientfonts: 'dist/public/fonts'
};

// Clean the Contents of the Distribution Directory
gulp.task('clean', function() {
	return del(path.dist);
});

// Copy Index
gulp.task('copy:index', function() {
  return gulp.src(path.index)
    .pipe(gulp.dest(path.distclient));
});

// Copy Html
gulp.task('copy:html', function() {
  return gulp.src(path.html)
    .pipe(gulp.dest(path.distclientapp));
});

// Copy Css
gulp.task('copy:css', function() {
  return gulp.src(path.css)
    .pipe(gulp.dest(path.distclientapp));
});

// copy Libs
gulp.task('copy:libjs', function() {
  return gulp.src(path.libjs)
    .pipe(gulp.dest(path.distclientlib));
});
gulp.task('copy:libcss', function() {
  return gulp.src(path.libcss)
    .pipe(gulp.dest(path.distclientlib));
});

// copy Fonts
gulp.task('copy:fonts', function() {
  return gulp.src(path.libfonts)
    .pipe(gulp.dest(path.distclientfonts));
});

// TypeScript Transpile
gulp.task('transpile:client', function() {
	return gulp
		.src(path.clientts)
        // .pipe(gulpIgnore.exclude('./*.d.ts'))
		.pipe(typescript(clientTsConfig))
		.pipe(gulp.dest(path.distclientapp));
});
gulp.task('transpile:server', function() {
	return gulp
		.src(path.serverts)
		.pipe(typescript(serverTsConfig))
		.pipe(gulp.dest(path.dist));
});

// Build Project
gulp.task('build', sequence('clean', 'copy:index', 'copy:html', 'copy:css', 'copy:libjs', 'copy:libcss', 'copy:fonts', 'transpile:server', 'transpile:client'));

// Default Task
gulp.task('default', sequence('build', ['nodemon', 'watch']));

// Serve Task
gulp.task('nodemon', function () {
    gulpNodemon({
        script: path.dist + '/server.js'
    }).on('restart', function() {
        console.log('GULP: nodemon restarted server.js');
    });
});
// Watch Task
gulp.task('watch', ['watchserverts', 'watchclientts', 'watchindex', 'watchhtml', 'watchcss']);

// Watch TypeScript
gulp.task('watchserverts', function() {
    // return gulp.watch(path.serverts, function(file){
    //             console.log(file.type, ': ', file.path)
    //             gulp.src(file.path)
    //                 .pipe(typescript(serverTsConfig))
    //                 .pipe(gulp.dest(path.dist));
    //         })
    gulp.watch(path.serverts, ['transpile:server']);
});
gulp.task('watchclientts', function() {
    // return gulp.watch(path.clientts, function(file){
    //             console.log(file.type, ': ', file.path)
    //             gulp.src(file.path)
    //                 .pipe(typescript(clientTsConfig))
    //                 .pipe(gulp.dest(path.distclientapp));
    //         })
    gulp.watch(path.clientts, ['transpile:client'])
});

// Watch Index
gulp.task('watchindex', function() {
  return watch(path.index)
    .pipe(gulp.dest(path.distclient));
});

// Watch Html
gulp.task('watchhtml', function() {
    return watch(path.html)
    .pipe(gulp.dest(path.distclientapp));
});

// Watch CSS
gulp.task('watchcss', function() {
  return watch(path.css)
    .pipe(gulp.dest(path.distclientapp));
});
