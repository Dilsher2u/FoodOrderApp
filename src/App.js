import Header from "./components/Layout/Header";
import React, {useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CarProvider";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () =>{
    setCartIsShown(true);
  };

  const hideCartHandler = () =>{
    setCartIsShown(false);
  };

  // We are wrapping the elements with CartProvider because all the elements would need access to the Cart
  // Cart will require the access to show the items
  // header will need access because we want to display the number of items in the cart 
  // Meals will need access because we need to add the items to the cart
  
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart = {showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
