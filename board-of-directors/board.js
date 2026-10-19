(() => {
  const dialog = document.querySelector("#board-biography");
  const dialogContent = document.querySelector("#bio-dialog-content");
  const closeButton = dialog?.querySelector(".bio-dialog__close");
  const biographyButtons = document.querySelectorAll("[data-biography]");

  if (!dialog || !dialogContent || !closeButton || !biographyButtons.length) {
    return;
  }

  let returnFocus = null;

  const getFocusableElements = () =>
    Array.from(
      dialog.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

  const openBiography = (button) => {
    const templateId = button.dataset.biography;
    const template = document.getElementById(templateId);

    if (!(template instanceof HTMLTemplateElement)) {
      return;
    }

    returnFocus = button;
    dialogContent.replaceChildren(template.content.cloneNode(true));
    document.body.classList.add("board-dialog-open");
    dialog.showModal();
    closeButton.focus();
  };

  biographyButtons.forEach((button) => {
    button.addEventListener("click", () => openBiography(button));
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("board-dialog-open");
    dialogContent.replaceChildren();
    returnFocus?.focus();
    returnFocus = null;
  });
})();
