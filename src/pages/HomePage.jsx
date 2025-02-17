import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('cazipTeklifler');
  
  const categories = [
    { id: 'cazipTeklifler', name: 'CAZİP TEKLİFLER', icon: '⭐' },
    { id: 'menuler', name: 'MENÜLER', icon: '🍔' },
    { id: 'happyMeal', name: 'Happy Meal®', icon: '🎁' }, 
    { id: 'tekUrunler', name: 'TEK ÜRÜNLER', icon: '🍗' },
    { id: 'tatlilar', name: 'TATLILAR', icon: '🍦' },
    { id: 'icecekler', name: 'İÇECEKLER', icon: '🥤' },
    { id: 'atistirmaliklar', name: 'ATIŞTIRMALIKLAR', icon: '🍟' },
    { id: 'ekstraSoslar', name: 'EKSTRA SOSLAR', icon: '🥫' }
  ];

  const displayProducts = products[activeCategory] || [];

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <div className="sidebar-menu">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`menu-item w-100 text-start border-0 ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="menu-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <h2 className="mb-4 text-warning text-bold  display-6">
            {`McDONALD'S LEZZETLERİ - ${categories.find(c => c.id === activeCategory)?.name}`}
          </h2>

          <div className="row">
            {displayProducts.map(product => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                <div className="product-card">
                  <Link to={`/urun/${product.id}`} className="text-decoration-none">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image rounded"
                      loading="lazy"
                    />
                    <h3 className="product-title">{product.name}</h3>
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="product-price">₺{product.price.toFixed(2)}</span> 
                      <button className="btn btn-add-cart">
                        SEPETE EKLE
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 