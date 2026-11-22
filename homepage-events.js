(() => {
  "use strict";

  const SLOT_COUNT = 3;
  const PLACEHOLDER_IMAGE =
    "https://socialbutterfliesfoundation.org/wp-content/uploads/2026/10/sbf-events-coming-soon.webp";

  function createPlaceholder(slotNumber) {
    const card = document.createElement("article");
    const titleId = `sbf-coming-soon-${slotNumber}`;

    card.className = "event-card event-card--placeholder";
    card.dataset.eventPlaceholder = "";
    card.setAttribute("aria-labelledby", titleId);
    card.innerHTML = `
      <figure class="event-card-media event-card-media--placeholder">
        <img
          src="${PLACEHOLDER_IMAGE}"
          width="1200"
          height="751"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div class="event-card-copy">
        <span class="card-kicker">Future Events</span>
        <h3 id="${titleId}">Coming Soon</h3>
        <p class="event-description">Stay tuned for upcoming SBF events and campaigns.</p>
        <span class="event-placeholder-status" aria-label="Event status: Coming Soon">Coming Soon</span>
      </div>
    `;

    return card;
  }

  function renderEventSlots(grid) {
    grid.querySelectorAll("[data-event-placeholder]").forEach((placeholder) => {
      placeholder.remove();
    });

    const eventCards = [...grid.querySelectorAll("[data-event-card]")];
    const activeEvents = eventCards.filter(
      (card) => card.dataset.eventStatus !== "inactive",
    );

    eventCards.forEach((card) => {
      card.hidden = true;
    });

    activeEvents.slice(0, SLOT_COUNT).forEach((card) => {
      card.hidden = false;
    });

    const visibleEventCount = Math.min(activeEvents.length, SLOT_COUNT);

    for (let index = visibleEventCount; index < SLOT_COUNT; index += 1) {
      grid.append(createPlaceholder(index + 1));
    }
  }

  function renderAllEventGrids() {
    document.querySelectorAll("[data-event-grid]").forEach(renderEventSlots);
  }

  renderAllEventGrids();
  document.addEventListener("sbf:events-updated", renderAllEventGrids);
})();
