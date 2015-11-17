var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    electron  = require('gulp-atom-electron'),
    symdest = require('gulp-symdest'),
    inSequence = require('run-sequence'),
    inject = require('gulp-inject');

gulp.task('private:clean', function(){
    del.sync('dist', {force: true});
    del.sync('package', {force: true});
});

gulp.task('private:vendor-js', function(){
    return gulp.src([
        'node_modules/angular2/bundles/angular2.sfx.dev.js',
        'node_modules/systemjs/dist/system.js'
        ])
        .pipe(gulp.dest('dist/frontend/libs'));
});

gulp.task('private:app-js', function(){
    gulp.src('src/frontend/**/*.js')
        
        .pipe(babel(
            {
                presets: ['es2015'],
                plugins: ['transform-es2015-modules-systemjs', 'syntax-decorators']
                }
        ))
        .pipe(gulp.dest('dist/frontend'));

    return gulp.src('src/main/**/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['es2015']
            }))
        .pipe(gulp.dest('dist/main'));
});

gulp.task('private:app-templates', function(){
    return gulp.src(['src/frontend/**/*.html', '!src/frontend/index.html'])
        .pipe(gulp.dest('dist/frontend'));
});
gulp.task('private:app-html', function(){
    var injectables = gulp.src('dist/frontend/css/*.css');

    return gulp.src('src/frontend/index.html')
        .pipe(inject(injectables, {ignorePath: 'dist/frontend', addRootSlash: false}))
        .pipe(gulp.dest('dist/frontend'));
});

var buildApp = function(platform, slug){
    gulp.src(['dist/**/*', '!dist/server/**/*'])
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
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/server'));
});

gulp.task('private:vendor-css', function(){
    return gulp.src('src/frontend/css/photon.min.css')
        .pipe(gulp.dest('dist/frontend/css'));
});

gulp.task('private:vendor-fonts', function(){
    return gulp.src('src/frontend/fonts/*.*')
        .pipe(gulp.dest('dist/frontend/fonts'));
});

gulp.task('private:app-package-file', function(){
    return gulp.src('package.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function(done){
    return inSequence('private:clean', ['private:vendor-css', 'private:app-templates','private:app-package-file', 'private:vendor-fonts', 'private:server-js', 'private:vendor-js', 'private:app-js'], 'private:app-html', 'private:app-package',done);
});