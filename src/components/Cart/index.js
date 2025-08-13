import Header from "../Header";
import EmptyCartView from "../EmptyCartView";
import CartListView from "../CartListView";
import CartSummary from "../CartSummary";

import "./index.css";
import CartContext from "../../Context";

const Cart = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList, removeAllCartItems } = value;
      const showEmptyView = cartList.length === 0;
      const onClickRemoveAllBtn = () => {
        removeAllCartItems();
      };

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="cart-header">
                   <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
                </div>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      );
    }}
  </CartContext.Consumer>
);

export default Cart;
