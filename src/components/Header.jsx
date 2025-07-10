import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              color: "white",
              marginRight: "1rem",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            My Store
          </Link>
        </div>
        <div>
          <Link to="/cart" style={{ color: "white", position: "relative" }}>
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  fontSize: "0.75rem",
                  padding: "0 5px",
                  borderRadius: "50%",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
