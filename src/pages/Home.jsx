import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { items: products, status, error } = useSelector(
    (state) => state.products
  );

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  let content;

  if (status === "loading") {
    content = (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products…</p>
      </div>
    );
  } else if (status === "failed") {
    content = <p style={{ color: "red" }}>Error: {error}</p>;
  } else if (products.length === 0) {
    content = <p>No products found.</p>;
  } else {
    content = (
      <div className="grid">
        {products.map((product) => {
          const cartItem = cartItems.find((i) => i.id === product.id);

          return (
            <div key={product.id} className="card">
              <img src={product.image} alt={product.title} />
              <div className="title">{product.title}</div>
              <div className="price">${product.price}</div>

              {cartItem ? (
                <div>
                  <button onClick={() => dispatch(decrementQuantity(product.id))}>−</button>
<span style={{ margin: "0 8px" }}>{cartItem.quantity}</span>
<button onClick={() => dispatch(incrementQuantity(product.id))}>+</button>

                </div>
              ) : (
                <button onClick={() => dispatch(addToCart(product))}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="container">{content}</div>;
}
