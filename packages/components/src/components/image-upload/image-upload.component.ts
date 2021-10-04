import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map';

export interface ImageUploadEvent extends Event {
  detail: {
    image: string
  }
}

export const imageUploadEventName: Readonly<string> = 'onImageUpload';

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
    const event: ImageUploadEvent = new CustomEvent(imageUploadEventName, {
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
    if(!file.type || !file.type.startsWith('image')) {
      return;
    }
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
      width: 100%;
      height: 100%;
      border: 2px dashed grey;
      transition: all 0.32s ease-in-out;
    }
    .root-dragover {
      border-color: blue;
      opacity: 50%;
    }
    .root:hover {
      opacity: 50%;
    }
    .form {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: space-between;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .input {
      opacity: 0%;
      height: 100%;
      width: 100%;
      position: absolute;
      cursor: pointer;
    }
    .img {
      height: 50%;
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
        <span>Drop a file or click here</span>
        <img class="img" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-1024.png" />
        <input name="image upload" class="input" type="file" accept="image/*" @change="${this.inputChangeHandler}">
      </form>
    </div>
    `;
  }
}

export interface ImageUploadComponentAttributes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
}