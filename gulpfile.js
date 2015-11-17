var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    electron  = require('gulp-atom-electron'),
    symdest = require('gulp-symdest'),
    inSequence = require('run-sequence');

gulp.task('private:clean', function(){
    del.sync('dist', {force: true});
    del.sync('package', {force: true});
});


gulp.task('private:vendor-js', function(){
    return gulp.src('node_modules/angular2/bundles/angular2.sfx.dev.js')
        .pipe(gulp.dest('dist/frontend/libs'));
});

gulp.task('private:app-js', function(){
    gulp.src('src/frontend/app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist/frontend/app'));

    return gulp.src('src/main/**/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist/main'));
});

gulp.task('private:app-html', function(){
    return gulp.src('src/frontend/index.html')
        .pipe(gulp.dest('dist/frontend'));
});

var buildApp = function(platform, slug){
    gulp.src(['package.json', 'dist/**/*', '!dist/server/**/*'])
        .pipe(electron({
            version: '0.34.3',
            platform: platform }))
        .pipe(symdest('package/ng2-es2015-electron-'+slug));
};

gulp.task('private:app-package', function(){
    var platforms = [{ platform: 'darwin', slug: 'osx'}, { platform: 'win32', slug: 'windows'}, { platform: 'linux', slug: 'linux'}];
    platforms.map(function(p){
        buildApp(p.platform, p.slug);
    });
});

gulp.task('private:server-js', function(){
     return gulp.src('src/server/**/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist/server'));
});

gulp.task('default', function(done){
    return inSequence('private:clean', ['private:server-js', 'private:vendor-js', 'private:app-js', 'private:app-html'], 'private:app-package',done);
});