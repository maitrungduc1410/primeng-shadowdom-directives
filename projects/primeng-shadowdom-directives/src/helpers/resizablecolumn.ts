import { DomHandler } from 'primeng/dom';
import { Table } from 'primeng/table';

export function ensureResizableColumn(dt: Table, shadowRoot?: ShadowRoot) {
  dt.destroyStyleElement = () => {
    if (dt.styleElement) {
      if (shadowRoot instanceof ShadowRoot) {
        shadowRoot.removeChild(dt.styleElement);
      } else {
        document.head.removeChild(dt.styleElement);
      }

      dt.styleElement = null;
    }
  };

  dt.createStyleElement = () => {
    dt.styleElement = document.createElement('style');
    dt.styleElement.type = 'text/css';
    DomHandler.setAttribute(dt.styleElement, 'nonce', dt.config?.csp()?.nonce);

    if (shadowRoot instanceof ShadowRoot) {
      // Use the component's shadow root instead of document.head
      shadowRoot.appendChild(dt.styleElement);
    } else {
      document.head.appendChild(dt.styleElement);
    }
  };
}
