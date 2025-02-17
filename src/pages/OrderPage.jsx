import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products, drinkOptions, sauceOptions, dessertPromoOptions } from '../data/products';

const OrderPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Tüm ürünleri düz bir diziye çevirme
  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return <div className="container py-5">Ürün bulunamadı.</div>;
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value));
    setQuantity(newQuantity);
  };

  // Ürünün kategorisini bulma
  const getProductCategory = () => {
    return Object.keys(products).find(category => 
      products[category].some(p => p.id === id)
    );
  };

  // Ürün tipine göre ekstra seçenekleri belirleme
  const getProductOptions = () => {
    const category = getProductCategory();
    const options = [];

    if (!['menuler', 'cazipTeklifler', 'happyMeal'].includes(category)) {
      return options;
    }

    // İçecek seçenekleri
    if (category === 'happyMeal') {
      options.push({ 
        id: 'icecek1', 
        label: 'İçecek', 
        defaultValue: 'Coca-Cola',
        choices: drinkOptions 
      });
    } else if (product.name.includes('2\'li') || product.name.includes('İkili') || product.name.includes('Üçlü')) {
      options.push(
        { 
          id: 'icecek1', 
          label: '1. İçecek', 
          defaultValue: 'Coca-Cola',
          choices: drinkOptions 
        },
        { 
          id: 'icecek2', 
          label: '2. İçecek', 
          defaultValue: 'Coca-Cola',
          choices: drinkOptions 
        }
      );
    } else {
      options.push({ 
        id: 'icecek1', 
        label: 'İçecek', 
        defaultValue: 'Coca-Cola',
        choices: drinkOptions 
      });
    }

    // Sos seçenekleri
    if (product.name.toLowerCase().includes('nugget') || 
        product.name.toLowerCase().includes('wings') || 
        product.name.toLowerCase().includes('tenders')) {
      options.push({ 
        id: 'sos', 
        label: 'Sos', 
        defaultValue: 'Seçiniz',
        choices: sauceOptions 
      });
    }

    // Tatlı promosyon seçeneği
    if (category === 'menuler' || category === 'cazipTeklifler') {
      options.push({ 
        id: 'tatliPromosyon', 
        label: 'Tatlı Promosyon', 
        defaultValue: 'Seçiniz',
        choices: dessertPromoOptions 
      });
    }

    return options;
  };

  const productOptions = getProductOptions();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image-large rounded mb-4"
            style={{ width: '560px', height: '560px' }}
          />
        </div>
        <div className="col-lg-6">
          <div className="product-details">
            <h1 className="product-title mb-3">{product.name}</h1>
            <p className="product-description mb-4">{product.description}</p>

            {productOptions.length > 0 && (
              <div className="options-container mb-4">
                {productOptions.map(option => (
                  <div key={option.id} className="option-group mb-3">
                    <label className="d-flex justify-content-between align-items-center mb-2">
                      {option.label}
                    </label>
                    <select className="form-select">
                      <option value="">{option.defaultValue}</option>
                      {option.choices.map(choice => (
                        <option key={choice.id} value={choice.id}>
                          {choice.name} {choice.additionalPrice > 0 ? `(+₺${choice.additionalPrice.toFixed(2)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div className="quantity-section mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">TUTAR</span>
                <div className="quantity-wrapper">
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="form-control form-control-sm quantity-input" 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    min="1"
                    max="10"
                  />
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="total-price mt-3">
                <span className="h3">₺{(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg w-100">
              SEPETE EKLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage; 