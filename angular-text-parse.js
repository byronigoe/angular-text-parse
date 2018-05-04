/**
 * Generic text parsing utility to create JSON from structured TXT
 * @version v0.1.0 - 2016-09-01 * @link https://github.com/byronigoe/angular-text-parse
 * @author Byron Igoe <byronigoe@gmail.com>
 * @license GPL 3.0 License, https://www.gnu.org/licenses/gpl-3.0.en.html
 */
angular.module('text-parse',[])

.factory('textParse', function() {
	var obj = {};
	obj.reset = function() {
		obj.skipLines = 0;
		obj.lineDelimiter = '\n';
		obj.fieldDelimiter = ',';
		obj.hasHeader = true;
		obj.headers = [];
		obj.types = [];
	};
	obj.parse = function(input) {
		if (obj.fieldDelimiter == "\\t") {
			console.log("tab");
			obj.fieldDelimiter = '\t';
		}
		var output = [];
		var lines = input.split(obj.lineDelimiter);
		var skipLines = obj.skipLines;
		var headers = obj.headers;
		var types = obj.types;
		if (headers.length == 0) {
			if (obj.hasHeader) {
				headers = lines[skipLines].split(obj.fieldDelimiter);
				skipLines++;
			} else {
				var numFields = lines[obj.skipLines].split(obj.fieldDelimiter).length;
				for (var j=0; j < numFields; j++) {
					headers.push('field'+j);
				}
			}
		} else {
			if (obj.hasHeader) skipLines++;
		}
		for (var i=skipLines; i < lines.length; i++) {
			var line = lines[i].split(obj.fieldDelimiter);
			if (headers.length != line.length) {
				console.log("Warning: line " + i + " has " + line.length + " fields.");
			}
			var object = {};
			for (var j=0; j < obj.headers.length; j++) {
				if (headers[j] != '') {
					if (types[j]) {
						if (types[j] == "Date") {
							object[headers[j]] = JSON.parse(JSON.stringify(new Date(Date.parse(line[j]))));
						} else if (types[j] == "Float") {
							if (line[j] && line[j].substr(0,1) == "$") line[j] = line[j].substr(1);
							object[headers[j]] = Number.parseFloat(line[j]);
						} else if (types[j] == "Int") {
							object[headers[j]] = Number.parseInt(line[j]);
						} else if (types[j] == "String") {
							object[headers[j]] = "" + line[j];
						} else {
							object[headers[j]] = line[j];
						}
					} else {
						object[headers[j]] = line[j];
					}
				}
			}
			output.push(object);
		}
		return output;
	};
	obj.reset();
	return obj;
});
