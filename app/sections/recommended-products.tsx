import {useLoaderData} from '@remix-run/react';
import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
} from '@weaverse/hydrogen';
import {forwardRef} from 'react';
import {ProductCardFragment} from 'storefrontapi.generated';
import {ProductSwimlane} from '~/components';

interface RecommendedProductsProps extends HydrogenComponentProps {
  heading: string;
  productsCount: number;
}

let RecommendedProducts = forwardRef<HTMLElement, RecommendedProductsProps>(
  (props, ref) => {
    let {recommended} = useLoaderData<{
      recommended: {nodes: ProductCardFragment[]};
    }>();
    let {heading, productsCount, ...rest} = props;
    if (recommended) {
      return (
        <section ref={ref} {...rest}>
          <ProductSwimlane
            title={heading}
            count={productsCount}
            products={recommended}
          />
        </section>
      );
    }
    return <section ref={ref} {...rest} />;
  },
);

export default RecommendedProducts;

export let schema: HydrogenComponentSchema = {
  type: 'recommended-products',
  title: 'Recommended products',
  limit: 1,
  enabledOn: {
    pages: ['PRODUCT'],
  },
  inspector: [
    {
      group: 'Recommended products',
      inputs: [
        {
          type: 'text',
          name: 'heading',
          label: 'Heading',
          defaultValue: 'You may also like',
          placeholder: 'Recommended products',
        },
        {
          type: 'range',
          name: 'productsCount',
          label: 'Number of products',
          defaultValue: 12,
          configs: {
            min: 1,
            max: 12,
            step: 1,
          },
        },
      ],
    },
  ],
  toolbar: ['general-settings', ['duplicate', 'delete']],
};
