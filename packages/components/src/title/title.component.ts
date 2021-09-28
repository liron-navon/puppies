import { LitElement, html, css } from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('pup-title')
export class TitleComponent extends LitElement {
  @property({ type: Boolean })
  primary: boolean = false;

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

export interface TitleComponentAttributes extends React.HTMLAttributes<{}> {
  primary: boolean;
}




// import { LitElement, html, css } from 'lit';
// import {customElement, property} from 'lit/decorators.js';

// @customElement('pup-title')
// export class TitleComponent extends LitElement {

//   @property()
//   greeting: string = 'world';

//   static get styles() {
//     return css`
//       h1 {
//         font-family: serif;
//         color: green;
//       }
//     `
//   }

//   render() {
//     console.log('render...')
//     return html`
//       <h1>${this.greeting}</h1>
//     `
//   }
// }

// export interface TitleComponentAttributes extends React.HTMLAttributes<{}> {
//   greeting: string
// }
