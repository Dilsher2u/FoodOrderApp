import React, {useReducer} from "react";
import CartContext from "./cart-context";


const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state, action) =>{
    if(action.type === "ADD"){

        //We will use concat rather than push because concat gives us a brand new array rather than changing the memory
        //We don't want to change the memory state without React knowing about it, hence we will use concat rather than push

        const existingCartItemIndex = state.items.findIndex(item =>  (item.id===action.item.id))
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            };
            updatedItems=[...state.items]
            updatedItems[existingCartItemIndex]=updatedItem;
            
        }
        else{
            updatedItems=state.items.concat(action.item)
        }

        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        };

    }

    if(action.type === "REMOVE"){
        
        const existingCartItemIndex = state.items.findIndex(item =>  (item.id===action.id))
        const existingItem  = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if(existingItem.amount===1){
            updatedItems = state.items.filter(item=>(item.id !== action.id))
        }
        else{
            const updatedItem ={...existingItem, amount: existingItem.amount-1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }

    if(action.type==="CLEAR"){
        return defaultCartState;
        
    }
    return defaultCartState
};

const CartProvider = (props) =>{

    const [cartState, dispacthCartAction] =useReducer(cartReducer, defaultCartState);
    
    const addItemToCartHandler = (item) =>{
        dispacthCartAction({
            type:'ADD',
            item:item
        })
    }

    const removeItemFromCartHandler = (id) =>{
        dispacthCartAction({
            type:'REMOVE',
            id:id
        })
    }

    const clearCartHanlder = () =>{
        dispacthCartAction({type:"CLEAR"})
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHanlder
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};


export default CartProvider;