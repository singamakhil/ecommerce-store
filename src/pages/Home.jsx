import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { items: products, status, error } = useSelector(
    (state) => state.products
  );

  // On mount, load products
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
}else if (status === "failed") {
    content = <p style={{ color: "red" }}>Error: {error}</p>;
  } else if (products.length === 0) {
    content = <p>No products found.</p>;
  } else {
    content = (
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <div className="title">{product.title}</div>
            <div className="price">${product.price}</div>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    );
  }

  return <div className="container">{content}</div>;
}
