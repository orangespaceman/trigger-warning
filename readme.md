# Trigger warning

A node/websockets thing that displays a _trigger warning_ message and plays a klaxon sound when a bad thing happens.


## Installation

1. Clone the repo
2. Run `npm install` to get the dependencies
3. Run `node index.js`

The app uses port `7005` by default, but this can be passed in as a param, or changed in `index.js`


## Usage

View the web root (e.g. `http://localhost:7005`) in a web browser to see the trigger button

View `/host` in a web browser to see the placeholder page that displays the warning, when triggered.


## External use

The trigger warning can be embedded on any web page.

First, set up the node app running on a remote server. As an example, it could be set up at `http://example.com/` - visiting this URL in a web browser would display the page containing the trigger button.

To include the trigger in any HTML page, include the following lines:

```
<script>var rootUrl = 'http://example.com/';</script>
<script src="http://example.com/js/host.js"></script>
```


## Bookmarklet

Rather than needing to visit the web page to trigger a warning, a bookmarket can be created so that it can be triggered directly from a browser.

To update the bookmarklet:

1. Update the `rootUrl` variable in `/static/js/bookmarklet.js` to point at your server
2. Copy the contents of this JS file, and run it through a [bookmarket generator](http://ted.mielczarek.org/code/mozilla/bookmarklet.html)
3. Copy the output, and make it to the value of the bookmarklet link in `/static/views/client.html`