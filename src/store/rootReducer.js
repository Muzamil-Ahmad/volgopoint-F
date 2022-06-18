/* eslint-disable */
import { combineReducers } from 'redux';

// reducers
import cartReducer from './cart';
import compareReducer from './compare';
import currencyReducer from './currency';
import localeReducer from './locale';
import mobileMenuReducer from './mobile-menu';
import quickviewReducer from './quickview';
import sidebarReducer from './sidebar';
import version from './version';
import wishlistReducer from './wishlist';
import homeReducer from './home/homeReducer';
import productReducer from './product/productReducer';
import categoryReducer from './category';
import navReducer from './topnavbar';

import authReducer from './auth/authReducer';
import contactReducer from './contact/contactReducer';
import addressReducer from './address';
import orderReducer from './order';

export default combineReducers({
    version: (state = version) => state,
    cart: cartReducer,
    compare: compareReducer,
    currency: currencyReducer,
    locale: localeReducer,
    mobileMenu: mobileMenuReducer,
    quickview: quickviewReducer,
    sidebar: sidebarReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    home: homeReducer,
    contact: contactReducer,
    product: productReducer,
    category:categoryReducer,
    navReducer:navReducer,
    address:addressReducer,
    order:orderReducer,
});
/* eslint-enable */
