
// textedit.tabs

{
	init() {
		let editor = window.find("div[data-id='editor']");

		// fast references
		this.files = [];
		this.template = editor.clone();

		editor.remove();
	},
	dispatch(event) {
		let APP = textedit,
			Self = APP.tabs,
			file,
			editor,
			tab,
			index,
			data;
		switch (event.type) {
			case "new-file":
			case "tab-new":
				if (Self.active && Date.now() - Self.active._bourne < 300) {
					Self.dispatch({ type: "tab-close", index: 0 });
				}
				// editor
				editor = APP.content.append(Self.template.clone());
				// wrap filesystem file with custom File object
				file = new File(event.file, editor);

				// create new tab if needed
				if (Self.files.length) {
					tab = window.tabs.add(file._file.base);
					requestAnimationFrame(() => tab.trigger("click"));
				}
				// save to files array
				Self.files.push(file);

				Self.dispatch({
					type: "tab-clicked",
					el: tab || { index: () => 0 },
				});
				break;
			case "tab-clicked":
				if (Self.active) {
					Self.active._editor.addClass("hidden");
				}
				// update "active"
				index = event.el.index();
				Self.active = Self.files[index];
				Self.active._editor.removeClass("hidden");
				// Self.active._editor.focus();

				let selection = Self.active.selection;
				if (selection) {
					// restore selection
					APP.queryCommand.selection.restore(Self.active._editor[0], selection);
				}

				// set window title to active file name
				window.title = Self.active._file.base;
				break;
			case "tab-close":
				index = event.index ?? event.el.index();
				Self.files.splice(index, 1);
				break;
		}
	}
}
