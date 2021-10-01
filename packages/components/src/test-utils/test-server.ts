// returns a url to the storybook page where the component can be tested
export const getTestUrl = (componentName: string, variationName: string) => {
    return `${global.TEST_ENV_URL}?id=components-${componentName}--${variationName}`;
}