var gulp = require("gulp");
var jshint = require("gulp-jshint"); /* Wymagamy użycia wtyczki jshint */
var sass = require("gulp-sass"); // Wymagamy użycie wtyczki gulp-sass
var sourcemaps = require('gulp-sourcemaps'); // Wymagamy użycia wtyczki sourcemaps

gulp.task("test", function (done) {
    console.log("test")
    done()
})

gulp.task("jshint", function () {
    return gulp.src("js/*.js") /* Przeszukaj folder js i szuka plików z rozszerzeniem js */
        .pipe(jshint()) //wykonuje wtyczkę jshint
        .pipe(jshint.reporter("default"))
});

gulp.task("sass", function () {
    return gulp.src("scss/main.scss") //Przeszukaj folder scss i znajdź plik main.js
        .pipe(sourcemaps.init()) //inicjalicuje tworzenie source mapy
        .pipe(sass({
            outputStyle: 'expanded', //style w wygenerowanym pliku css,opcje: neasted, expanded, compact, compressed
            // sourceComments: 'map' //doda informację z którego miejsca pliku sass pochodzi wygenerowany kod
        }).on("error", sass.logError)) //Wykonuje wtyczkę sass - kompilacja, wypisze błędy jeśli są
        .pipe(sourcemaps.write()) //tworzy sourcemapę
        .pipe(gulp.dest("css")) //przekazuje plik docelowy do folderu css
});

gulp.task("watch", function () {
    gulp.watch("scss/**/*.scss", gulp.series("sass")); //obserwacja zmiany w plikach o rozszerzeniu .scss w folderze scss, a potem wywołuje przy każdej wykrytej zmianie zadanie "sass".
    // konstrukcja scss/**/*.scss sprawia, że śledzone są też pliki w podfolderach folderu "sass"
    //Można przekazać więcej zadań w sposób jak poniżej:
    // gulp.series("sass", "minify")
    // można wywołać zadanie nie w serii za pomocą gulp.series() jak powyżej, lecz równolegle używając gulp.parallel()
});