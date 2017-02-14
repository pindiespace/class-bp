# Class Boilerplate (adapted from fastshell)

A project boilerplate using gulp and best practices for HTML, CSS, JS.

## Project setup and Gulp installation
You'll need to install Node and Gulp, along with several other npm libraries. Here's a walkthrough of 
how to get a project up and running.

1. Download this [repository](http://github.com/pindiespace/class-bp) archive. You can use a web download, but ideally you should go to Terminal and use 

   `git clone http://github.com/pindiespace/class-bp`.

2. Install [Node.js](http://nodejs.org/download), [Sass](http://sass-lang.com/tutorial.html) and [Git](http://git-scm.com) on your machine. If you're a Windows user you'll also need to install [Ruby](http://rubyinstaller.org/downloads) for Sass to work.

3. [Install Gulp](http://Gulpjs.com/) using `npm install -g gulp`. You may need to use `sudo` in front of the Gulp install command to give it permissions.

4. Open Terminal and run `npm install`. You don't use `sudo` unless your machine's config requires you to use `sudo` to do this.

5. run `npm install gulp -g` to make sure you have gulp present.

6. After installing, type `gulp` to start everything. Watch for errors, sometimes you may need to install or re-install some libraries via npm.

## How to use
1. Edit in /app/index.html to change your default page.
2. Edit either /src/js/app.js to change JavaScript.
3. You can also save files with an .es6 extension.
3. Edit /src/scss/style.scss (or subfolders to change your CSS, see description below).

## Operation
Once running, Class Boilerplate does the following:

1. Mounts the `app` folder onto a local server.

2. Listens for changes inside the `src` directory, and compiles the necessary files into the `app` directory, which will then automaticaly livereload or inject changes. 

CSS changes are injected, all other changes force a page reload.

3. Images in src/images saved into a sub-folder (e.g. src/png) will be compressed and optimized before being saved into app/img directory

4. Audio and video files in src/audio and src/video are transferred to the /app directory when they are changed. This allows you to work with authoring environments (e.g. Premiere) and automatically transfer exported files in .mp3 or .mp4 format.

````js
/*!
 * class-bp
 * Default template for student OOP builds
 * https://github.com/pindiespace/class-bp
 * Adapted from fastshell
 * https://HosseinKarami.github.io/fastshell
 * @author Pete Markiewicz
 * @version 1.0.0
 * Copyright 2017. MIT licensed.
 */
````

### Browser-Sync
Gulp's browser-sync will inject the following script into your HTML for you (not included when you deploy):

````html
<script type='text/javascript'>//<![CDATA[
;document.write("<script defer src='//HOST:3000/socket.io/socket.io.js'><\/script><script defer src='//HOST:3001/client/browser-sync-client.0.9.1.js'><\/script>".replace(/HOST/g, location.hostname));
//]]></script>
````

It's pretty useful when used with a single browser, watching a CSS file for changes & injecting it. When using multiple devices/monitors browsersync can keep all browsers in sync & make your workflow much faster.

### Extending Gulp tasks
If you're including more Gulp tasks in your project, remember to use the `npm install <Gulp package> --save-dev` inside your Terminal so that it gets added to your `package.json` file for future dependencies.

Add new tasks to either the default `gulp` task at the `gulpfile.js`:

## JavaScript
FastShell comes with a single `app.js` to get you started, using an immediately invoked function expression (IIFE). You may need a different configuration for frameworks or pure ES6/7/8 projects:

````js
(function ($, window, document, undefined) {
  'use strict';
  // FastShell
})(jQuery, window, document);
````

The example imports window and document so you can use in debugging. Passing in the `jQuery` object and giving it the dollar alias also makes it play nicely if you're including other frameworks that use the `$` namespace.

## Sass/SCSS file configuration
FastShell comes with a `.scss` file setup and existing `@import` declarations to the very common web components. FastShell hopes to help those out who aren't sure about structuring a CSS project confidently as well as getting them setup with using a CSS PreProcessor. 

The basic idea:

* `mixins` holds all Sass/SCSS mixins, FastShell ships with a few helpers
* `module` holds modules, more Object-Orientated components and a generic `app.scss` for everything else, all file names should be modular/OO.
* `partials` holds the blueprints for the project, the header, footer, sidebar and so on.
* `vendor` holds any files that are third party, such as the font awesome icons CSS
* `style.scss` imports all the necessary files from the above folders, when adding new files be sure to add it inside this file.

Note: The default background is in src/scss/modules/_vars.scss.

## Hidden files on Macs (from fastshell)

It's a good idea to expose hidden files so you can configure your `.editorconfig`, `.jshintrc`, `.gitignore` files. On the command line, enter:

````
defaults write com.apple.Finder AppleShowAllFiles YES
````

To hide hidden files enter:

````
defaults write com.apple.Finder AppleShowAllFiles NO
````

### .editorconfig
EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The `.editorconfig` file consists of a format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles.

### .gitignore
Ignores minified and generated files, this is best for working in teams to avoid constant conflict, only the source files are needed.

### .travis.yml
This is used on [travis-ci.org](http://travis-ci.org) for continuous integration tests, which monitor the FastShell build.

## Platform support

Runs on Mac OS X and Windows.
