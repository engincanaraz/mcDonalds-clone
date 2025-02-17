
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <>
      

      <header className="main-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="navbar-brand">
              <img src="src/assets/images/logo.png" alt="McDonald's" className="logo" />
            </Link>

            <div className="d-flex align-items-center gap-4">
              <div className="location-selector">
                <i className="fas fa-map-marker-alt text-warning me-2"></i>
                <span className="text-dark">Teslimat Adresi Seçin</span> 
              </div>

              <Link to="/giris" className="btn-login">
                GİRİŞ YAP
              </Link>

              <Link to="/sepetim" className="btn-cart">
                <i className="fas fa-shopping-basket"></i>
                <span className="ms-2">SEPETİM</span>
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

     
    </>
  );
};

export default Header; 