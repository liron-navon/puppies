import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map';

export interface ImageUploadEvent extends CustomEvent {
  detail: {
    image: string
  }
}

@customElement('pup-image-upload')
export class ImageUploadComponent extends LitElement {
  private isDragOver: boolean;
  private imageUrl: string;

  static get properties() {
    return {
      imageUrl: {
        state: true
      },
      isDragOver: {
        state: true
      }
    }
  }

  dispatchImageUploadedEvent() {
    const event: ImageUploadEvent = new CustomEvent("onImageUpload", {
      detail: {
        image: this.imageUrl
      }
    });
    this.dispatchEvent(event);
  }

  connectedCallback() {
    super.connectedCallback()
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result as string;
      this.dispatchImageUploadedEvent();
    }, false);
    reader.readAsDataURL(file)
  }

  dragOverHandler(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  dragleaveHandler() {
    this.isDragOver = false;
  }

  dropHandler(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer.items) {
      const firstItem = event.dataTransfer.items[0];
      if(firstItem.kind === 'file') {
        this.handleFile(firstItem.getAsFile());
      }
    } else {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  inputChangeHandler(event: InputEvent) {
    const files = (event.target as HTMLInputElement).files;
    this.handleFile(files[0]);
  }

  static get styles() {
    return css`
    .root {
      padding: 10px;
      width: 100%;
      height: 100%;
      border: 1px solid black;
    }
    .root-dragover {
      border: 1px solid red;
    }
    .form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: space-between;
      height: 100%;
    }
    `
  }

  render() {
    return html`
    <div
      class="${classMap({ root: true, 'root-dragover': this.isDragOver })}"
      @drop="${this.dropHandler}"
      @dragleave="${this.dragleaveHandler}"
      @dragover="${this.dragOverHandler}"
      >
        <form class="form">
        <p>Upload file</p>
        <input type="file" accept="image/*" @change="${this.inputChangeHandler}">
      </form>
    </div>
    `;
  }
}