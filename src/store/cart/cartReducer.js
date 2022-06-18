/* eslint-disable */
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES } from './cartActionTypes';
import * as actionTypes from './cartActionTypes';

/**
 * @param {array} items
 * @param {object} product
 * @param {array} options
 * @return {number}
 */
function findItemIndex(items, product, options) {
    return items.findIndex((item) => {
        if (item.product.id !== product.id || item.options.length !== options.length) {
            return false;
        }

        for (let i = 0; i < options.length; i += 1) {
            const option = options[i];
            const itemOption = item.options.find((itemOption) => (
                itemOption.optionId === option.optionId && itemOption.valueId === option.valueId
            ));

            if (!itemOption) {
                return false;
            }
        }

        return true;
    });
}

function calcSubtotal(items) {
    return items.reduce((subtotal, item) => subtotal + item.total, 0);
}

function calcQuantity(items) {
    return items.reduce((quantity, item) => quantity + item.quantity, 0);
}

function calcTotal(subtotal, extraLines) {
    return subtotal + extraLines.reduce((total, extraLine) => total + extraLine.price, 0);
}

function addItem(state, product, options, quantity) {
    const itemIndex = findItemIndex(state.items, product, options);

    let newItems;
    let { lastItemId } = state;

    if (itemIndex === -1) {
        lastItemId += 1;
        newItems = [...state.items, {
            id: lastItemId,
            product: JSON.parse(JSON.stringify(product)),
            options: JSON.parse(JSON.stringify(options)),
            price: product.price,
            total: product.price * quantity,
            quantity,
        }];
    } else {
        const item = state.items[itemIndex];

        newItems = [
            ...state.items.slice(0, itemIndex),
            {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * item.price,
            },
            ...state.items.slice(itemIndex + 1),
        ];
    }

    const subtotal = calcSubtotal(newItems);
    const total = calcTotal(subtotal, state.extraLines);

    return {
        ...state,
        lastItemId,
        subtotal,
        total,
        items: newItems,
        quantity: calcQuantity(newItems),
    };
}

function removeItem(state, itemId) {
    const { items } = state;
    const newItems = items.filter((item) => item.id !== itemId);

    const subtotal = calcSubtotal(newItems);
    const total = calcTotal(subtotal, state.extraLines);

    return {
        ...state,
        items: newItems,
        quantity: calcQuantity(newItems),
        subtotal,
        total,
    };
}

function updateQuantities(state, quantities) {
    let needUpdate = false;

    const newItems = state.items.map((item) => {
        const quantity = quantities.find((x) => x.itemId === item.id && x.value !== item.quantity);

        if (!quantity) {
            return item;
        }

        needUpdate = true;

        return {
            ...item,
            quantity: quantity.value,
            total: quantity.value * item.price,
        };
    });

    if (needUpdate) {
        const subtotal = calcSubtotal(newItems);
        const total = calcTotal(subtotal, state.extraLines);

        return {
            ...state,
            items: newItems,
            quantity: calcQuantity(newItems),
            subtotal,
            total,
        };
    }

    return state;
}

/*
* item example:
* {
*   id: 1,
*   product: {...}
*   options: [
*     {optionId: 1, optionTitle: 'Color', valueId: 1, valueTitle: 'Red'}
*   ],
*   price: 250,
*   quantity: 2,
*   total: 500
* }
* extraLine example:
* {
*   type: 'shipping',
*   title: 'Shipping',
*   price: 25
* }
*/
const initialState = {
    lastItemId: 0,
    quantity: 0,
    items: [],
    subtotal: 0,
    extraLines: [ // shipping, taxes, fees, .etc
        {
            type: 'shipping',
            title: 'Shipping',
            price: 0,
        },
        {
            type: 'tax',
            title: 'Tax',
            price: 0,
        },
    ],
    total: 0,

    //new added by sami ullah
    // items: null,
    error: true,
    count: null,
    // message: "No Items in Cart",
    successCart : null,
    errorCart : null,
    orderCode : null,
    reviewData : null,
    // cartItems: null,
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
    case CART_ADD_ITEM:
        return addItem(state, action.product, action.options, action.quantity);
    
    case CART_REMOVE_ITEM:
        return removeItem(state, action.itemId);

    case CART_UPDATE_QUANTITIES:
        return updateQuantities(state, action.quantities);
    
        //my reducers
        case actionTypes.GET_CART_ITEMS: 
            return { ...state, items: action.value.orders, error:false, quantity:action.value.quantity, orderCode:null,subtotal:action.value.subtotal,total:action.value.total  };
        case actionTypes.REMOVE_CART_ITEM:
            return { ...state, items: state.items.filter((item) => { return item.id !== action.id } )};
        case actionTypes.ADD_PRODUCT_TO_CART:
            return { ...state, successCart: true, quantity:action.value};
        case actionTypes.ADD_PRODUCT_TO_CART_ERROR:
            return { ...state, errorCart: true};
        case actionTypes.GET_COUNT: 
            return { ...state, count: action.value};
        case actionTypes.CHANGE_QUANTITY: 
            return { ...state, quantity: action.quan, subtotal: action.subtotal, total: action.total,  items: state.items.map((item) => { 
                return (item.id === action.id) ? {
                    ...item,
                    quantity: action.quan
                }: { ...item }
            })};
        case actionTypes.RESET_CART_AFTER_LOGOUT:
            return { ...state, count : 0, items : null};
        case actionTypes.PLACE_ORDER:
            return { ...state, orderCode: action.value, items:null};
        case actionTypes.REVIEW_ORDER:
            return { ...state, reviewData: action.value};
        case actionTypes.GET_CART_ITEMS_WITHOUT_LOGIN:
            return { ...state, items: action.value.orders, error:false, count: action.value.count, orderCode:null};
    default:
        return state;
    }
}
