let fs = require('fs');

exports.date = function() {
    return process.stdout.write(Date());
}
exports.pwd = function () {
    return process.stdout.write(process.cwd());
}
exports.ls = function() {
    return fs.readdir('.', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            process.stdout.write(file.toString() + "\n");
        });
    });
}
exports.cat = function() {
    [].slice.call(arguments).forEach(elem=> {
        fs.readFile(elem,function(err,data) {
            if (err) throw err;
            process.stdout.write(data + "\n");
        });
    })
}

exports.head = function() {
    [].slice.call(arguments).forEach(elem=> {
        fs.readFile(elem,function(err,data) {
            if (err) throw err;
            let lines = data.toString().split('\n');
            for(var i = 0; i < 5; i++) {
                process.stdout.write(lines[i] + '\n');
            }
        });
    })
}



return exports;