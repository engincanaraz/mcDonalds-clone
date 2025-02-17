import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, drinkOptions, sauceOptions, dessertPromoOptions } from '../data/products';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    drink1: drinkOptions[0],
    drink2: drinkOptions[0],
    sauce: null,
    dessertPromo: null
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Ürünü bul
    const foundProduct = Object.values(products)
      .flat()
      .find(p => p.id === productId);
      
    if (!foundProduct) {
      navigate('/');
      return;
    }
    
    setProduct(foundProduct);
  }, [productId, navigate]);

  if (!product) {
    return <div className="container py-5">Yükleniyor...</div>;
  }

  const calculateTotalPrice = () => {
    let total = product.price * quantity;
    
    if (selectedOptions.drink1?.additionalPrice) {
      total += selectedOptions.drink1.additionalPrice;
    }
    if (selectedOptions.drink2?.additionalPrice) {
      total += selectedOptions.drink2.additionalPrice;
    }
    if (selectedOptions.sauce?.additionalPrice) {
      total += selectedOptions.sauce.additionalPrice;
    }
    if (selectedOptions.dessertPromo?.additionalPrice) {
      total += selectedOptions.dessertPromo.additionalPrice;
    }
    
    return total;
  };

  const handleAddToCart = () => {
    addToCart(product, {
      ...selectedOptions,
      quantity
    });
    navigate('/sepetim');
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid product-image"
          />
          <h2 className="mt-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
        </div>
        
        <div className="col-md-6">
          <div className="options-container">
            <div className="mb-4">
              <label className="option-label mb-2">1. İçecek</label>
              <select
                className="form-select"
                value={selectedOptions.drink1?.id || ''}
                onChange={(e) => setSelectedOptions(prev => ({
                  ...prev,
                  drink1: drinkOptions.find(opt => opt.id === e.target.value)
                }))}
              >
                {drinkOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                    {option.additionalPrice > 0 && ` (+₺${option.additionalPrice})`}
                  </option>
                ))}
              </select>
            </div>

            {product.name.includes('İki Kişilik') && (
              <div className="mb-4">
                <label className="option-label mb-2">2. İçecek</label>
                <select
                  className="form-select"
                  value={selectedOptions.drink2?.id || ''}
                  onChange={(e) => setSelectedOptions(prev => ({
                    ...prev,
                    drink2: drinkOptions.find(opt => opt.id === e.target.value)
                  }))}
                >
                  {drinkOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                      {option.additionalPrice > 0 && ` (+₺${option.additionalPrice})`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="option-label mb-2">Sos</label>
              <select
                className="form-select"
                value={selectedOptions.sauce?.id || ''}
                onChange={(e) => setSelectedOptions(prev => ({
                  ...prev,
                  sauce: sauceOptions.find(opt => opt.id === e.target.value)
                }))}
              >
                <option value="">Seçiniz</option>
                {sauceOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                    {option.additionalPrice > 0 && ` (+₺${option.additionalPrice})`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="option-label mb-2">Tatlı Promosyon</label>
              <select
                className="form-select"
                value={selectedOptions.dessertPromo?.id || ''}
                onChange={(e) => setSelectedOptions(prev => ({
                  ...prev,
                  dessertPromo: dessertPromoOptions.find(opt => opt.id === e.target.value)
                }))}
              >
                {dessertPromoOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                    {option.additionalPrice > 0 && ` (+₺${option.additionalPrice})`}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="quantity-controls">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
              <div className="total-price">
                <span className="h4">₺{calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-add-cart w-100"
              onClick={handleAddToCart}
            >
              SEPETE EKLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 