/*
Gulp file that trans-compiles the TypeScript files.
Usage:
	- "gulp" to trans-compile
	- "gulp watch" to automatically trans-compile when a TS file changes
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');

var files = [
	"**.d.ts",
	"sounds.ts"
];

gulp.task("default", function() {
	var result = gulp.src(files)
		.pipe(ts({ // Transcompile
			out: "output.js" // Merge into one output file
		}));
	return result.js.pipe(gulp.dest("./")); // output file destination
});

// Automatically call the "default" task when a TS file changes
gulp.task("watch", function() {
	gulp.watch(files, ["default"]);
});
