// Declare enum
enum FileAccess {Read, Writer};

// Function in "window" scope
this.trainWithTypes = () => {
	var notSpecified = 1.0; // Do not specify type
	var specified: number = 1.0; // Specify type
	var anySpecified: any = 1.0; // Specify type as "any"
	var myEnumValue = FileAccess.Read; // Work with enums
	var myArray = new Array(); // Declare array. Same as "Array<any>"
	
	myArray.push("Hello !");
	myArray.push(1);
	myArray.splice(0, 1);
	console.log(myArray); // "[1]"
};
