import { Link } from "react-router-dom";
import CartContext from "../../Context";

import "./index.css";

const CartSummary = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value;
      let total = 0;
      cartList.forEach((eachCartItem) => {
        total += eachCartItem.price * eachCartItem.quantity;
      });

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-value">
            <span className="order-total-label">Order Total:</span> Rs {total}/-
          </h1>
          <p className="total-items">{cartList.length} Items in cart</p>

          {/* Checkout button */}
          <Link to={cartList.length > 0 ? "/payment" : "#"}>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </Link>
        </div>
      );
    }}
  </CartContext.Consumer>
);

export default CartSummary;
