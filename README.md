## Dynamic Webpack/Gulp template

This is a stripped down version of the interactive template we use at Axios. It includes Gulp task manager and settings for running a local web server, automatic page refresh, Sass (CSS library) and Webpack (a bundling library for deploying streamlined code).

Why do we need all of this stuff?? The short answer is you don't! A simple HTML/JS/CSS approach to D3 projects is fine for most simple projects. But this template gives us access to some modern conveniences like the ES6 and Sass. It also makes it super easy to fire up a local server and includes some boilerplate code that makes it easy to spin up a quick chart in D3.

---

### How to use this template.

1) Clone this repository to your working directory.

2) Using Terminal, `cd` into the directory

3) run `npm install`

4) run `gulp serve`

---

### `gulp serve`
Sets up a local server run out of `.tmp`. Watches your Sass, Handlebars and Javascript files and updates live in the browser.

The `gulp serve` task will default to `port 3000`, which you can view in browser as `http://localhost:3000/`.

Use the `-p` flag if you want to use a different port (for example, if you're already serving a proejct in port 3000, type `gulp serve -p 3002` to serve in port 3002.)

### `gulp build`
Compiles your code into a single publishable directory called `/dist`

### ES6 and beyond

