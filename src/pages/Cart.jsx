import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearcart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Cart</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                {item.quantity}
                <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={() => dispatch(clearcart())}>Clear Cart</button>
    </div>
  );
}
