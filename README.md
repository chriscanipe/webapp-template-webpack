## Dynamic Webpack/Gulp template

This is a stripped down version of the [interactive template](https://github.com/axioscode/generator-axios/tree/master/generators/app/templates#step-2-s3) we use at Axios. It includes [Gulp](https://gulpjs.com/) task manager and settings for running a local web server, automatic page refresh, [Sass](https://sass-lang.com/) (CSS library) and [Webpack](https://webpack.js.org/) (a bundling library for deploying streamlined code).

**You probably:** This is intimidating! Why do we need all of this stuff??

**Me:** The short answer is, you don't. A simple HTML/JS/CSS approach to D3 projects is fine for most simple projects. But this template gives us access to some modern conveniences like the ES6 and Sass. It also makes it super easy to fire up a local server and includes some boilerplate code that makes it easy to spin up a quick chart in D3. Most importantly, it takes care of a lot of complicated stuff in the background and frees us up to focus on the one thing we really care about, which is making things in D3.


---

### How to use this template.

1) Clone this repository to your working directory.

2) Using Terminal, `cd` into the directory

3) run `npm install`

4) run `gulp serve`


---

To build a chart in D3, you really only need to worry about the `/src` directory. 

This template takes an object-oriented approach to making charts in D3. In a nutshell, it's set up so you can write your chart script as a library or "module" that's then called from your main script. To learn more about this approach and why it works so well with D3, check out [this explainer](http://elliotbentley.com/2017/08/09/a-better-way-to-structure-d3-code-es6-version.html).

`src/js/app.js` is the main JavaScipt file. Think of this as your index page for JavaScript. Only the top level stuff goes here.
`src/js/chart-template.js` is 

---

### Available Gulp commands

#### `gulp serve`
Sets up a local server run out of `.tmp`. Watches your Sass, Handlebars and Javascript files and updates live in the browser.

The `gulp serve` task will default to `port 3000`, which you can view in browser as `http://localhost:3000/`.

Use the `-p` flag if you want to use a different port (for example, if you're already serving a proejct in port 3000, type `gulp serve -p 3002` to serve in port 3002.)

#### `gulp build`
Compiles your code into a single publishable directory called `/dist`

