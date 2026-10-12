/**
 * PrimeNG styled mode (v18–21) injects `<style data-primeng-style-id>` into
 * `document.head`. Class rules do not pierce Shadow DOM.
 *
 * Clone those sheets into the host shadow root and rewrite `:root` → `:host`
 * so theme class CSS applies inside the shadow tree.
 *
 * PrimeNG 22+ shares non-variable sheets via `adoptedStyleSheets` officially —
 * prefer that path and only keep this helper as a fallback.
 *
 * @returns disposer that disconnects the MutationObserver and removes clones
 */
export function attachPrimeNgStylesToShadowRoot(
  shadowRoot: ShadowRoot
): () => void {
  const ATTR = 'data-psd-cloned';

  const clearClones = () => {
    shadowRoot.querySelectorAll(`style[${ATTR}]`).forEach((n) => n.remove());
  };

  const cloneSheets = () => {
    clearClones();
    const sources = document.head.querySelectorAll(
      'style[data-primeng-style-id], style[data-primevue-style-id]'
    );
    sources.forEach((styleEl) => {
      const clone = document.createElement('style');
      clone.setAttribute(ATTR, 'true');
      const id = styleEl.getAttribute('data-primeng-style-id');
      if (id) {
        clone.setAttribute('data-psd-from', id);
      }
      clone.textContent = (styleEl.textContent ?? '').replace(/:root\b/g, ':host');
      shadowRoot.appendChild(clone);
    });
  };

  cloneSheets();

  const observer = new MutationObserver(() => cloneSheets());
  observer.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => {
    observer.disconnect();
    clearClones();
  };
}

/** Resolve the real click target when the event is retargeted to a shadow host. */
export function shadowAwareEventTarget(event: Event): EventTarget | null {
  const path =
    (event as any).path ||
    (typeof event.composedPath === 'function' ? event.composedPath() : null);
  if (path?.length) {
    return path[0];
  }
  return event.target;
}
