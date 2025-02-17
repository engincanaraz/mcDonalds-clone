import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Sepetiniz Boş</h2>
        <p className="text-muted">Lezzetli menülerimizi keşfetmek için ana sayfaya dönebilirsiniz.</p>
        <Link to="/" className="btn btn-warning mt-3">
          ANA SAYFAYA DÖN
        </Link>
      </div>
    );
  }

  const formatOptionName = (option) => {
    if (!option) return '';
    return option.additionalPrice > 0
      ? `${option.name} (+₺${option.additionalPrice})`
      : option.name;
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Sepetim</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={`${item.id}-${JSON.stringify(item.options)}`} className="card mb-3 bg-white">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <h5 className="card-title">{item.name}</h5>
                    <div className="small text-muted">
                      {item.options.drink1 && (
                        <div>1. İçecek: {formatOptionName(item.options.drink1)}</div>
                      )}
                      {item.options.drink2 && (
                        <div>2. İçecek: {formatOptionName(item.options.drink2)}</div>
                      )}
                      {item.options.sauce && (
                        <div>Sos: {formatOptionName(item.options.sauce)}</div>
                      )}
                      {item.options.dessertPromo && (
                        <div>Tatlı: {formatOptionName(item.options.dessertPromo)}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="quantity-controls">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(
                            item.id,
                            item.options,
                            item.quantity - 1
                          )}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(
                            item.id,
                            item.options,
                            item.quantity + 1
                          )}
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.id, item.options)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    
                    <div className="text-end mt-2">
                      <span className="price">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-lg-4">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title mb-4">Sipariş Özeti</h5>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Ara Toplam</span>
                <span>₺{calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Teslimat Ücreti</span>
                <span>₺0.00</span>
              </div>
              
              <hr className="my-3" />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Toplam</strong>
                <strong>₺{calculateTotal().toFixed(2)}</strong>
              </div>
              
              <button className="btn btn-warning w-100">
                SİPARİŞİ TAMAMLA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 