(() => {
  const initializeBoardBiographies = () => {
    const page = document.querySelector(".sbf-board-page");

    if (!page || page.dataset.biographiesInitialized === "true") {
      return;
    }

    const dialog = page.querySelector("#board-biography");
    const dialogContent = page.querySelector("#bio-dialog-content");
    const closeButton = dialog?.querySelector(".bio-dialog__close");

    if (!dialog || !dialogContent || !closeButton) {
      return;
    }

    page.dataset.biographiesInitialized = "true";
    let returnFocus = null;

    const biographyButtons = Array.from(
      page.querySelectorAll("[data-biography]"),
    );

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const resetBiographyState = () => {
      document.body.classList.remove("board-dialog-open");
      dialogContent.replaceChildren();
      biographyButtons.forEach((button) =>
        button.setAttribute("aria-expanded", "false"),
      );
      returnFocus?.focus();
      returnFocus = null;
    };

    const closeBiography = () => {
      if (typeof dialog.close === "function" && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
        resetBiographyState();
      }
    };

    const openBiography = (button) => {
      const templateId = button.dataset.biography;
      const template = templateId ? document.getElementById(templateId) : null;

      if (!template || template.tagName !== "TEMPLATE") {
        return;
      }

      returnFocus = button;
      dialogContent.replaceChildren(template.content.cloneNode(true));
      biographyButtons.forEach((bioButton) =>
        bioButton.setAttribute("aria-expanded", String(bioButton === button)),
      );
      document.body.classList.add("board-dialog-open");

      if (typeof dialog.showModal === "function") {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        dialog.setAttribute("open", "");
      }

      closeButton.focus();
    };

    biographyButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", () => openBiography(button));
    });

    closeButton.addEventListener("click", closeBiography);

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeBiography();
      }
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeBiography();
        return;
      }

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

    dialog.addEventListener("close", resetBiographyState);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBoardBiographies, {
      once: true,
    });
  } else {
    initializeBoardBiographies();
  }
})();
