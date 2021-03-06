
class File {

	constructor(fsFile, editor) {
		// save reference to original FS file
		this._file = fsFile || new defiant.File();
		this._editor = editor;
		this._bourne = Date.now();

		// editor
		let data = this._file.data || "";
		switch (this._file.kind) {
			case "html":
			case "htm" : break;
			case "txt" : data = data.replace(/\n/g, "<br>"); break;
			case "md"  : data = $.md(data); break;
		}
		this._editor.html(data);

		// to keep track if file is dirty
		this.digest = data.sha1();
		// undo stack
		this.undoStack = new window.History;
	}

	toBlob(kind) {
		let data = this._editor.html();
		let type, blob;

		// fallback on file kind
		kind = kind || this._file.kind;

		switch (kind) {
			case "txt":
				type = "text/plain";
				data = data.replace(/<br>|<br\/>/g, "\n").stripHtml();
				break;
			case "htm":
			case "html":
				type = "text/html";
				break;
			case "md":
				type = "text/markdown";
				data = service.turndown(data);
				break;
		}

		return new Blob([data], { type });
	}

	get isDirty() {
		return this.digest === this._editor.html().sha1();
	}

	focus() {
		
	}

	blur() {
		
	}

	undo() {
		
	}

	redo() {
		
	}

}
