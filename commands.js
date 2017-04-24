let fs = require('fs');
let http = require('http');

exports.date = function() {
    return done( (new Date()).toDateString() );
}
exports.pwd = function () {
    return done( process.cwd() );
}
exports.ls = function() {
    var str = "";
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        
	files.forEach(function(file) {
            str += file.toString() + "\n";
        });
	done(str);
	
    });
}
exports.cat = function() {
    [].slice.call(arguments).forEach(elem=> {
        fs.readFile(elem,function(err,data) {
            if (err) throw err;

            done( data );
        });
    })
}

exports.head = function() {
    var str = "";
    var result = [];
    [].slice.call(arguments).forEach(elem=> {
        fs.readFile(elem,function(err,data) {
            if (err) throw err;

            let lines = data.toString().split('\n');
	    lines.slice(0,4).forEach( line=>{
	      str += line.toString() + "\n";
	    });
	    done(str);
        });
    })
}

exports.echo = function() {
  [].slice.call(arguments).forEach( elem=>{
    done(elem);
  });
}

// create an http.ClientRequest object
// attach listeners to the object
// the 'data' event for recieving data via a "ReadableStream" interface
// submit cached data to the done() function once complete (ie on 
// 'done' event)
exports.curl = function(host){
  var options = {host: host};
  var callback = function(response) {

    var str = '';
    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function() {
      done(str);
    });
  };

  //http.request() creates an object of type http.ClientRequest
  //http.request() syntax: http.request(options[, callback])
  //The optional callback parameter will be added as a one time listener for the 'response' event.
  //Reference: https://nodejs.org/api/http.html#http_class_http_clientrequest
  //Reference: https://nodejs.org/api/http.html#http_http_request_options_callback
  http.request(options, callback).end();
}

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}


return exports;
