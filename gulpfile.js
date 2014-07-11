var gulp = require('gulp'),
    connect = require('gulp-connect'),
    lr = require('gulp-livereload'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber');


var onError = function (err){
    console.log('An Error occured: ' + err);
}


var paths = {
    sass_src:['./components/dm-ecal/sass/*.scss'],

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


gulp.task('watch', function(){
    lr.listen();
    gulp.watch(paths.sass_src,['compass']);
    gulp.watch([paths.sass_src,'./app/index.html']).on('change',lr.changed);
})

gulp.task('default',['compass','watch','connect']);


