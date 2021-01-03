// Interface IWriter.
// Classes that implements IWriter must provide the
// "message" member and "resetMessages" function
// All members and functions are "public"
interface IWriter {
	message: string|string[];
	resetMessages(): void;
}

// Class Writer, that implements IWriter
class Writer implements IWriter {
	public message: string|string[]; // Relative to IWriter
	private _privateMessage: string = "Private message !"; // Private member
	protected _protectedMessage: string; // Protected member
	
	// Constructor
	// parameter "message": can be a string or an array of strings 
	constructor(message: string|string[]) {
		this.message = message;
		this._protectedMessage = "Protected message !"; // Allowed
	}
	
	// Public function that writes the messages
	public write(): void {
		console.log(this.message); // Allowed because "public"
		console.log(this._privateMessage); // Allowed because we are in "this"
		console.log(this._protectedMessage); // Allowed because we are in "this"
	}
	
	// Implementation of the "IWriter" interface
	// Reset messages
	public resetMessages(): void {
		this.message = ""; // Allowed
		this._privateMessage = ""; // Allowed
		this._protectedMessage = ""; // Allowed
	}
}

// Class "BetterWriter" that extends (inheritance) the "Writer" class
class BetterWriter extends Writer {
	
	// Constructor. Same as "Writer" constructor
	constructor(message: string|string[]) {
		// Needed: Call the constructor of the base class "Writer".
		super(message);
	}
	
	// Override the "writer" function
	public write(): void {
		if (typeof this.message === "string") {
			// Call the "writer" function of the base class "Writer"
			super.write();
		}
		else { // Array of strings
			for (var i=0; i < this.message.length; i++) {
				console.log(this.message[i]);
			}
		}
	}
}

// Function in "window" scope
this.trainWithClasses = () => {
	var writer = new Writer("Hello World with Writer !");
	writer.write();
	
	var betterWriter: BetterWriter = new BetterWriter(["Hello World with BetterWriter !", "Second message from BetterWriter !"]);
	betterWriter.write();
};
