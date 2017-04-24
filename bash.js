var cmds = require('./commands.js')
// Output a prompt
process.stdout.write('\nprompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var argument = data.toString().trim().split(' '); // remove the newline
  var cmd = argument.shift();
//   console.log(cmd);
  
//   process.stdout.write('You typed: ' + cmd);
    if(cmd === 'pwd') cmds.pwd();
    if(cmd === 'date') cmds.date();
    if(cmd === 'ls') cmds.ls();
    if(cmd === 'cat') cmds.cat.apply(null,argument);
    if(cmd === 'head')cmds.head.apply(null,argument);
     process.stdout.write('\nprompt > ');
     
});

function done(output) {
    
}

