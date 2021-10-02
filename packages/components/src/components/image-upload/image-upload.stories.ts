import { html } from 'lit';
import './image-upload.component';


export default {
  title: 'Components/pup-image-upload',
  parameters: {
    docs: {
      description: {
        component: 'A component that add functionality to add files with drag and drop interface',
      },
    },
  },
  argTypes: {
    onImageUpload: {
          description: 'An event that emits an ImageUploadEvent',
          action: 'uploaded',
          table: {
            type: { 
              summary: 'ImageUploadEvent'
            },
          }
      }
  },
};

const Template = ({onImageUpload}: any) => {
  // need to be called after storybook loaded the component
  setTimeout(() => {
    document
    .querySelector('pup-image-upload')
    .addEventListener('onImageUpload', onImageUpload);
  })
  return html`
    <div style="width: 200px; height: 200px;">
      <pup-image-upload></pup-image-upload>
    </div>
  `
};

export const Primary = Template.bind({});
