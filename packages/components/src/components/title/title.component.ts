import { LitElement, html, css } from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('pup-title')
export class TitleComponent extends LitElement {
  primary: boolean = false

  static get properties() {
    return {
      primary: {
        type: Boolean
      }
    }
  }

  static get styles() {
    return css`
      h1 {
        font-family: serif;
        color: green;
      }
    `
  }

  render() {
    return this.primary ? html`<h1><slot></slot></h1>` : html`<h2><slot></slot></h2>`;
  }
}

export interface TitleComponentAttributes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  primary: boolean;
}