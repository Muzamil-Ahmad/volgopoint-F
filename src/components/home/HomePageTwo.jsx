/* eslint-disable */
// react
import React, { useMemo } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import shopApi from '../../api/shop';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import BlockProductColumns from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
import shopcategories from '../../data/shopBlockCategories';
import posts from '../../data/blogPosts';
import theme from '../../data/theme';

import { connect } from 'react-redux';
import { categoryAction } from '../../store/category';
import { GET_CATEGORIES } from '../../store/category/categoryActionTypes';
// import { popularProductsAction } from '../../store/product';
import { GET_PRODUCTS } from '../../store/product/popularProductActionTypes';
function HomePageTwo({...props}) {
    /**
     * Featured products.
     */
    useMemo(() => props.getCategories(),[]);
    const featuredProducts = useProductTabs(
        useMemo(() => props.categories.category, []),
        (tab) => shopApi.getPopularProductsImplement({ limit: 12, category_slug:tab.category_slug }),
    );
  
    /**
     * Bestsellers.
     */
    const bestsellers = useDeferredData(() => (
        shopApi.getPopularProductsImplement({ limit: 7 })
    ), []);

    /**
     * Latest products.or New Arrivals.
     */
    const latestProducts = useProductTabs(
        useMemo(() => props.categories.category, []),
        (tab) => shopApi.getLatestProductsImplement({ limit: 8, category_slug:tab.category_slug}),
    );

    /**
     * Product columns.
     */
    const columns = useProductColumns(
        useMemo(() => [
            {
                title: 'Top Rated Products',
                source: () => shopApi.getTopRatedProductsImplement({ limit: 3 }),
            },
            {
                title: 'Special Offers',
                source: () => shopApi.getDiscountedProductsImplement({ limit: 3 }),
            },
            {
                title: 'Bestsellers',
                source: () => shopApi.getPopularProductsImplement({ limit: 3 }),
            },
        ], []),
    );

    return (
        <React.Fragment>
            <Helmet>
                {/* <title>{`Home Page Two — ${theme.name}`}</title> */}
                <title>{`BrotherCart - ${theme.name}`}</title>
            </Helmet>
            {useMemo(() => <BlockSlideShow />, [])}

            {useMemo(() => <BlockFeatures layout="boxed" />, [])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="Featured Products"
                    layout="grid-5"
                    rows={2}
                    products={featuredProducts.data}
                    loading={featuredProducts.isLoading}
                    groups={featuredProducts.tabs}
                    onGroupClick={featuredProducts.handleTabChange}
                />
            ), [featuredProducts])}

            {useMemo(() => <BlockBanner />, [])}

            {useMemo(() => (
                <BlockProducts
                    title="Bestsellers"
                    layout="large-last"
                    featuredProduct={bestsellers.data[0]}
                    products={bestsellers.data.slice(1, 7)}
                />
            ), [bestsellers.data])}

            {useMemo(() => (
                <BlockCategories
                    title="Popular Categories"
                    layout="compact"
                    categories={props.categories.category}
                />
            ), [])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="New Arrivals"
                    layout="grid-5"
                    products={latestProducts.data}
                    loading={latestProducts.isLoading}
                    groups={latestProducts.tabs}
                    onGroupClick={latestProducts.handleTabChange}
                />
            ), [latestProducts])}

            {useMemo(() => <BlockPosts title="Latest News" layout="grid-nl" posts={posts} />, [])}

            {useMemo(() => <BlockBrands />, [])}

            {useMemo(() => <BlockProductColumns columns={columns} />, [columns])}
        </React.Fragment>
    );
}

// export default HomePageTwo;
const mapStateToProps = (state) => ({
    locale: state.locale,
    categories:state.category,
    // popularProductsData:state.popularProducts
});
const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(categoryAction(GET_CATEGORIES)),
        // getPopularProductsPending: (data) => dispatch(popularProductsAction(GET_PRODUCTS,data)),
    }
  };

export default connect(mapStateToProps,mapDispatchToProps)(HomePageTwo);
/* eslint-enable */
