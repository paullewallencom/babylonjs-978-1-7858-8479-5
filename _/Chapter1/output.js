// Declare enum
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["Read"] = 0] = "Read";
    FileAccess[FileAccess["Writer"] = 1] = "Writer";
})(FileAccess || (FileAccess = {}));
;
// Function in "window" scope
this.trainWithTypes = function () {
    var notSpecified = 1.0; // Do not specify type
    var specified = 1.0; // Specify type
    var anySpecified = 1.0; // Specify type as "any"
    var myEnumValue = 0 /* Read */; // Work with enums
    var myArray = new Array(); // Declare array. Same as "Array<any>"
    myArray.push("Hello !");
    myArray.push(1);
    myArray.splice(0, 1);
    console.log(myArray); // "[1]"
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Class Writer, that implements IWriter
var Writer = (function () {
    // Constructor
    // parameter "message": can be a string or an array of strings 
    function Writer(message) {
        this._privateMessage = "Private message !"; // Private member
        this.message = message;
        this._protectedMessage = "Protected message !"; // Allowed
    }
    // Public function that writes the messages
    Writer.prototype.write = function () {
        console.log(this.message); // Allowed because "public"
        console.log(this._privateMessage); // Allowed because we are in "this"
        console.log(this._protectedMessage); // Allowed because we are in "this"
    };
    // Implementation of the "IWriter" interface
    // Reset messages
    Writer.prototype.resetMessages = function () {
        this.message = ""; // Allowed
        this._privateMessage = ""; // Allowed
        this._protectedMessage = ""; // Allowed
    };
    return Writer;
})();
// Class "BetterWriter" that extends (inheritance) the "Writer" class
var BetterWriter = (function (_super) {
    __extends(BetterWriter, _super);
    // Constructor. Same as "Writer" constructor
    function BetterWriter(message) {
        // Needed: Call the constructor of the base class "Writer".
        _super.call(this, message);
    }
    // Override the "writer" function
    BetterWriter.prototype.write = function () {
        if (typeof this.message === "string") {
            // Call the "writer" function of the base class "Writer"
            _super.prototype.write.call(this);
        }
        else {
            for (var i = 0; i < this.message.length; i++) {
                console.log(this.message[i]);
            }
        }
    };
    return BetterWriter;
})(Writer);
// Function in "window" scope
this.trainWithClasses = function () {
    var writer = new Writer("Hello World with Writer !");
    writer.write();
    var betterWriter = new BetterWriter(["Hello World with BetterWriter !", "Second message from BetterWriter !"]);
    betterWriter.write();
};
