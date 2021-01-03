------------------------------------------
SERVER
------------------------------------------

For each example (starting from Chapter 2), don't forget to run the following command line to
install a static server (which is required) with node.js and NPM:

    $ npm install node-static

And, to run the server, type the following command line:

    $ node server.js
    
You are now able to run the example in your internet brower at http://localhost:8000/index.html
   
------------------------------------------
COMPILE TYPESCRIPT
------------------------------------------

If you want to modify the sources and recompile the TypeScript files, you'll have to
install the "gulp" and "gulp-typescript" packages using NPM.

Type the following command lines to install the gulp packages using NPM:

    $ npm install gulp
    $ npm install gulp-typescript
    
Once the gulp packages are installed, type the following command line to compile
the TypeScript files:

    $ gulp
    
If you want to compile the TypeScript files automatically once you saved your
changements, type the following command line:
    
    $ gulp watch
