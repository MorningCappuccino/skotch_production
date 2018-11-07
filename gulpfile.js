var gulp = require('gulp'); // Собственно gulp

var less = require('gulp-less'); // Less-компилятор
var postcss = require('gulp-postcss'); // Пост-обработка CSS
var autoprefixer = require('autoprefixer'); // Добавление вендорных префиксов
var minifyCSS = require('gulp-csso'); // CSS минификатор
var sourcemaps = require('gulp-sourcemaps'); // карты исходного кода
var stylelint = require('gulp-stylelint'); // проверка качества кода

var concat = require('gulp-concat'); // объединение набора файлов в один

var browserSync = require('browser-sync').create(); // обновление налету

var sftp = require('gulp-sftp'); //Публикация SFTP

// ================== LESS ============================
// Библиотеки
var libCSS = [
	'css/jquery.fancybox.min.css',
	'css/owl.carousel.min.css',
	'css/normalize.css'
];

// Собираем все CSS библиотеки
gulp.task( 'css:libs', function(){
	return gulp.src( libCSS )
		.pipe( concat( 'app.bundle.css' ) )
		.pipe( minifyCSS() )
		.pipe( gulp.dest( 'css' ) );
});

// Проверка качества кода CSS
gulp.task( 'css:check', function(){
	return gulp.src( 'less/**/*.less' )
		.pipe( stylelint({
			failAfterError: false,
			// reportOutputDir: 'dev',
			reporters: [
				{formatter: 'verbose', console: true},
				{formatter: 'string', save: 'stylelint.txt'}
			],
			debug: false
		}));
});

// Собираем CSS
gulp.task( 'css', [ 'css:libs' ], function(){
	// Настройки для вендорных префиксов
	var plugins = [
		autoprefixer({
			browsers: ['last 4 versions', 'ie >= 10', 'iOS >= 8']
		}),
	];
	return gulp.src( 'less/app.less' )
		.pipe( sourcemaps.init() )
		.pipe( less() )
		.pipe( postcss( plugins ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'css' ) )
		.pipe( browserSync.stream() );
        // .pipe(  browserSync.reload() )
});

// ================== JS ============================
var libJS = [
	'js/jquery.min.js',
    'js/fancybox.min.js',
    'js/owl-carousel.min.js',
    'js/ya-share.min.js'
];

// Собираем все JS библиотеки
gulp.task( 'js:libs', function(){
	return gulp.src( libJS )
		.pipe( concat( 'app.bundle.js' ) )
		.pipe( gulp.dest( 'js' ) );
});

gulp.task( 'js:check', function(){
	return gulp.src( 'js/*.js' )
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
});

// gulp.task( 'js', [ 'js:libs' ], function(){
// 	return gulp.src( 'src/assets/js/*.js' )
// 	  .pipe( concat( 'app.js' ) )
// 	  .pipe( gulp.dest( 'dev/assets/js' ) )
// 	  .pipe( browserSync.stream() );
// });

// ================== DEV ============================
// Слежение за dev
gulp.task( 'serve', ['js:libs', 'css'], function() {

	browserSync.init({
        injectChanges: true,
		server: {
			baseDir: './'
		}
	});

	gulp.watch( 'less/*.less' , ['css']);
    gulp.watch( 'js/*.js').on('change', browserSync.reload);
	gulp.watch( '*.html' ).on('change', browserSync.reload);

});

// Публикация на prod
gulp.task( 'prod', function(){

	return gulp.src('+(css|fonts|img|js|index.html)')
	.pipe(sftp({
		host: 'ftp.gorgeousflowers.us',
		user: 'vanilla@gorgeousflowers.us',
		pass: 'Flowers47',
		timeout: 30000,
		remotePath: '/test/public/skotch/'
	}));
});

gulp.task('default', ['serve']);
