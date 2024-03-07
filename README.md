# Dom Cruise
This is a carousel implementation in native js only.
No peer dependency.
React is used for the demo, to show how it can be integrated.

## Problem
There are so many carousels available in js and all of them have problems because they try to solve every problem.
On the surface, making a carousel seems like a simple problem, but as soon as you dig deeper you stumble over many details that matter.
Here are a few examples:
- accessibility (screenreader , arrow controls)
- horizontal scrolling on desktop
- drag to scroll on desktop and mobile
- customizability needs to be given - each website wants a different style for arrows or for the progress bar. Maybe they even want to integrate it with a ui library.
- each project has very different requirements
  - sometimes it shows 10 elements at the same time
  - sometimes it only shows 2 or even only 1
  - it can also have multiple rows
  - Sometimes carousel elements can have different length - how do you determine where to scroll?

## Solution
Dom Cruise tries to solve this issue to do one thing, but doing it well.
### What it is supposed to do:
- It shows multiple elements in one row only,
- support Drag to scroll functionality on desktop
- provide functions for next and previous buttons and the scrollbar.
- Easy configuration
- Responsiveness by nature

### What it is not supposed to do:
- Have multiple rows
- only show one element at the same time
- endless scrolling
- implement next and previous buuttons and scrollbar
- have completely different configurations for different screensizes

If you need any of these features, a different carousel implementation is recommended.

### How to use
Not much configuration is needed.
- Specify the element that should be used as container and based on its width and the elements width it should just work.
- Implement your own buttons and scrollbar


## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
