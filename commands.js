let fs = require('fs');

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

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}


return exports;
