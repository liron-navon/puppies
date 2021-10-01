import { html } from 'lit';
import { imagesList } from './images-list.mocks';
import { defaultConfig, GalleryConfig } from './lazy-loaded-gallery.component';

export default {
    title: 'Components/pup-lazy-loaded-gallery',
    parameters: {
      docs: {
        description: {
          component: 'A lazy loading gallery of images, each image is lazy loaded, and the gallery adds more dom elements as you scroll',
        },
      },
    },
    argTypes: {
        images: {
            description: 'a list of image urls',
            control: '-',
            table: {
                type: { 
                    summary: 'string[]' 
                }
            }
        },
        config: {
            description: 'a configuration object containing imageHeight, imageWidth, and alt',
            defaultValue: defaultConfig,
            control: 'object',
            table: {
                type: { 
                    summary: 'GalleryConfig' 
                }
            }
        }
    },
};


const Template = ({ config } : { config: GalleryConfig }) => {
  return html`
    <div style="height: 400px; overflow: hidden;">
      <pup-lazy-loaded-gallery config=${JSON.stringify(config)} 
      images="${JSON.stringify(imagesList)}" ></pup-lazy-loaded-gallery>
    </div>
  `
};

export const Primary = Template.bind({});
