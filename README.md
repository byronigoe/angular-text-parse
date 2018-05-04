# angular-text-parse
Generic text parsing utility to create JSON from structured TXT

## Usage:
0. Get this module
```
npm i -S angular-text-parse
```
1. Add the JavaScript to your HTML:
```html
<script src="angular-text-parse.js"></script>
```
2. Include the module:
```javascript
var myApp = angular.module('myApp', ['text-parse']);
```
3. Inject the service:
```javascript
myApp.controller('MyCtrl', ['$scope', 'textParse', function($scope, textParse){}]);
```
4. Define Settings:
```javascript
textParse.fieldDelimiter = '\t';
```
5. Parse
```javascript
var arrOfObj = textParse.parse(str);
```

## Settings:

Option | Default | Usage
--- | --- | ---
lineDelimiter | '\n' | String to use for splitting input into lines
skipLines | 0 | Ignore this many "lines" based on the *lineDelimiter*
fieldDelimiter | ',' | String to use for splitting a line into fields
hasHeader | true | Indicate whether the input includes column names
headers | [] | You can provide your own array of strings to use for property names
types | [] | Array of datatypes from Date, Float, Int, String. String is the default

## Example

Given an input of 
```
Worthless info
Dt;Company;Amount
3/15/18;ABC, Inc.;$87.50
5/5/18;MyCorp;$12.75
```
And settings of
```javascript
textParse.skipLines = 1;
textParse.fieldDelimiter = ';';
textParse.types = ['Date', 'String', 'Float'];
```
The parse function will return this array of objects, notice that dates are in JSON format
```
[
 {"Dt":"2018-03-15T04:00:00.000Z","Company":"ABC, Inc.","Amount":87.5},
 {"Dt":"2018-05-05T04:00:00.000Z","Company":"MyCorp","Amount":12.75}
]
```
