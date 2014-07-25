var gulp = require('gulp'),
    connect = require('gulp-connect'),
    lr = require('gulp-livereload'),
    compass = require('gulp-compass'),
    sourcemaps = require('gulp-sourcemaps'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber');


var onError = function (err){
console.log('An Error occured: ' + err);
}


var paths = {
    sass_src:['./components/dm-ecal/sass/*.scss'],
    js_dest:'./app/js/'
}

gulp.task('connect', function(){
    connect.server({
        livereload:true,
        port:9006,
        root:['app']
    });
});

gulp.task('compass', function(){
    return gulp.src(paths.sass_src)
           .pipe(plumber({
                errorHandler:onError
           }))
           .pipe(compass({
               sass: './components/dm-ecal/sass',
               css : './app/css',
               require: ['susy','breakpoint']
           }))
           .pipe(gulp.dest('./app/css'))
})

gulp.task('coffee', function(){
    return gulp.src(['./components/coffee/modules/digitalmonkstudio/event-calendar/*.coffee','./components/coffee/modules/digitalmonkstudio/event-calendar/**/*.coffee'])
        .pipe(sourcemaps.init())
        .pipe(concat('dm.mod.eventcalendar.coffee'))
        .pipe(gulp.dest('./components/coffee/modules/digitalmonkstudio/'))
        .pipe(coffee({bare:true, sourceMaps:true}))
        .pipe(sourcemaps.write({ addComment: false } ))
        .pipe(gulp.dest(paths.js_dest));

})

gulp.task('watch', function(){
    lr.listen();
    gulp.watch(paths.sass_src,['compass']);
    gulp.watch(['./app/css/evcal.css','./app/index.html']).on('change',lr.changed);
})

gulp.task('default',['compass','watch','connect']);


