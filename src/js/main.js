
let file = {
	"file-1.txt": { "name": "file-1.txt", ext: "txt", "text": "Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
	"file-2.md": { "name": "file-2.md", ext: "md", "text": `
## How to play
Othello is a simple game that you play on an 8 by 8 in checkered board with 64 double-sided black and white discs. The game is easy to learn, but it takes time to master and develop your strategies for winning the game.

### Object of the Game
The goal is to get the majority of colour discs on the board at the end of the game.
`}
};

const textEdit = {
	init() {
		// fast references
		this.content = window.find("content");

		// init sub objects
		Object.keys(this).filter(i => this[i].init).map(i => this[i].init());

		this.dispatch({ type: "tab-new" });
	},
	async openFile(event) {
		// let file = await event.open();
		this.dispatch({ type: "tab-new", file: file[event.name] });
	},
	dispatch(event) {
		let Self = textEdit;
		// console.log(event);
		switch (event.type) {
			// system events
			case "open.file":
				Self.openFile(event);
				break;
			// custom events
			case "save-file":
				// console.log( Self.tabs.active.editor.html() );
				window.dialog.save();
				break;
			case "tab-new":
			case "tab-clicked":
			case "tab-close":
				Self.tabs.dispatch(event);
				break;
			case "query-command-state":
			case "format":
			case "format-fontSize":
			case "format-fontName":
			case "window.keyup":
				Self.queryCommand.dispatch(event);
				break;
		}
	},
	tabs: defiant.require("./modules/tabs.js"),
	undoStack: defiant.require("./modules/undoStack.js"),
	queryCommand: defiant.require("./modules/queryCommand.js"),
};

window.exports = textEdit;
