# react-rotating-text

![effect showcase](http://i.imgur.com/AC5g7KD.gif)

A simple component to create a typewriter effect where strings are typed out and then deleted. Simply pass in an array of strings and the component will rotate through all of them.


## Demo & Examples

Live demo: [adrianmcli.github.io/react-rotating-text](http://adrianmcli.github.io/react-rotating-text/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-rotating-text is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), [Brunch](http://brunch.io/), etc).

You can also use the standalone build by including `dist/react-rotating-text.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-rotating-text --save
```


## Usage

Simply require the component and then pass in an array of strings into the `items` prop:

```jsx
var ReactRotatingText = require('react-rotating-text');

<ReactRotatingText items={['first', 'second', 'third']} />
```

In order to have a blinking cursor, you'll need to apply some CSS to the `react-rotating-text-cursor` class:

```css
.react-rotating-text-cursor {
  animation: blinking-cursor 0.8s cubic-bezier(0.68, 0.01, 0.01, 0.99) 0s infinite;
}

@keyframes blinking-cursor {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

Don't forget to put in vendor prefixes should you need them. A full example is available in `example/dist/ReactRotatingText.css`.

### Properties

**items (*array*)**  
*(default: ['first', 'second', 'third'])*  
The array of strings to be cycled through.

**color (*string*)**  
*(default: 'inherit')*  
This specifies the color of the text.

**cursor (*boolean*)**  
*(default: true)*  
If set to true, it will display the cursor after the text.

**pause (*integer*)**  
*(default: 1500)*  
The number of milliseconds to pause after the text has just finished being typed out.

**emptyPause (*integer*)**  
*(default: 1000)*  
The number of milliseconds to pause while no text is being displayed (i.e. after deleting has just finished).

**eraseMode (*string*)**  
*(default: 'erase')*
This specifies the erasing mode. May be set to "erase" or "overwrite".

**typingInterval (*integer*)**  
*(default: 50)*  
The number of milliseconds between each typing action.

**deletingInterval (*integer*)**  
*(default: 50)*  
The number of milliseconds between each deleting action.

### Events

#### onTypingStart
A callback function to call when typing starts for current item.

#### onTypingEnd
A callback function to call when typing ends for current item.

#### onDeletingStart
A callback function to call when deleting starts for current item.

#### onDeletingEnd
A callback function to call when deleting finishes for current item.

Example:
```
<ReactRotatingText items={[`events`,`are`,`fun`]} onTypingStart={() => console.log(`Typing Started`)} />
```

### Notes

Enhancements and pull requests are welcomed.


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

The MIT License (MIT)

Copyright (c) 2016 Adrian Li.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
