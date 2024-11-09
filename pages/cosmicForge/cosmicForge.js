function EnableEditing() {
    const editableArea = document.getElementById("backstoryEdit");
    const toolbar = document.getElementById("toolbar"); // Make sure this line is inside the function
    const isEditable = editableArea.getAttribute("contenteditable") === "true";

    // Toggle contenteditable attribute
    editableArea.setAttribute("contenteditable", !isEditable);

    // Toggle toolbar visibility and button text
    toolbar.style.display = isEditable ? "none" : "block";
    document.getElementById("toggleEdit").textContent = isEditable ? "Edit" : "Save";

    if (!isEditable) {
        editableArea.focus(); // Focus the editable area when enabled
    }
}

function applyStyle(style) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Create a <span> to apply styling
        const span = document.createElement("span");
        span.textContent = range.toString();

        // Apply or toggle the specific style
        if (style === 'bold') {
            toggleStyle(span, "fontWeight", "bold", "normal");
        } else if (style === 'italic') {
            toggleStyle(span, "fontStyle", "italic", "normal");
        } else if (style === 'underline') {
            toggleStyle(span, "textDecoration", "underline", "none");
        }

        // Replace the selected content with the styled <span>
        range.deleteContents();
        range.insertNode(span);
    }
}

function toggleStyle(element, styleProperty, activeValue, inactiveValue) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;

    if (parentElement && parentElement.style[styleProperty] === activeValue) {
        // If the style is already applied, remove it
        parentElement.style[styleProperty] = inactiveValue;
    } else {
        // Otherwise, apply the style
        element.style[styleProperty] = activeValue;
    }
}