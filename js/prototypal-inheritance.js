(function(global) {
    var debug = document.querySelector('.debug tbody');

    function logScreen(message) {
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        debugMsg = document.createElement('tr');
        debugMsgTD = document.createElement('td');  
        debugMsgTD.innerText = message;
        debugMsg.appendChild(debugMsgTD);
        debug.insertBefore(debugMsg, debug.childNodes[0]);
    };

    function logConsole(message, throwError) {
        if (throwError) {
            throw "[Error]: " + message;
        } else {
            console.log(message);
            console.log('------------------');
        }
    };

    function logFull(message, throwError) {
        logScreen(message);
        logConsole(message, throwError);
    };

    // Exposing the function to the global object ('window' passed in the IIFE)
    global.logFull = logFull;
    
}(window));

var print;

var person = {
    firstname: 'Rodrigo',
    lastname: 'Vallades',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;        
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe'    
}

// this will output all john's properties, INCLUDING what's in prototype
logFull(john);

print = '';
for (prop in john) {    
    print = print + prop + ': ' + john[prop] + '\n';
}
logFull(print);

// !!! DON'T EVER DO THIS
// !!! JUST TESTING
john.__proto__ = person;

print = '';
// now I can see the getFullName method as well
for (prop in john) {
    print = print + (prop + ': ' + john[prop]) + '\n';
}
logFull(print);

// But what if I only want the real john's properties?
// Ignoring the prototype properties, I mean.
print = '';
for (prop in john) {
    if (john.hasOwnProperty(prop)) {
        print = print + (prop + ': ' + john[prop]) + '\n';
    }
}
logFull(print);

