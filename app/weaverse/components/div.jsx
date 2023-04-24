import {useLoaderData} from '@remix-run/react';
import {forwardRef} from 'react';

let Div = forwardRef((props, ref) => {
  let data = useLoaderData();
  console.log('👉 --------> - props:', props);
  console.log('👉 --------> - data:', data);
  const {children, text, ...rest} = props;
  return (
    <div ref={ref} {...rest}>
      {text}
      {children}
    </div>
  );
});

export default Div;

export let css = {
  '@desktop': {
    backgroundColor: 'red',
  },
};

/**
 *
 * @param {import('@weaverse/hydrogen').WeaverseComponentLoaderArgs} loaderArgs
 * @returns
 */
export let loader = async (loaderArgs) => {
  return {text: 'this data is from div component loader'};
};