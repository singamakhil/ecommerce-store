import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Failed to load products</p>;

  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <img src={product.image} alt={product.title} style={{ height: "150px", objectFit: "contain" }} />
          <h4>{product.title}</h4>
          <p>${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
