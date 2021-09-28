import './title.component';
import { html } from 'lit';

export default {
    title: 'Components/pup-title',
    argTypes: {
        slot: {
            description: 'slot passed between the html tags',
            defaultValue: 'hello world',
            control: 'text',
            table: {
                type: { 
                    summary: 'string' 
                }
            }
        },
        primary: {
            description: 'is it a primary title',
            defaultValue: true,
            control: 'boolean',
            table: {
                type: { 
                    summary: 'boolean' 
                }
            }
        }
    },
};

const Template = ({slot, primary}) => {
    if(primary) {
        return html`<pup-title primary>${slot}</test-element>`
    }
    return html`<pup-title >${slot}</test-element>`
};

export const Primary = Template.bind({});
export const Secondary = () => html`<pup-title>secondary title</test-element>`;
