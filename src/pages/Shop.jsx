import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import styles from './Shop.module.css';

const Shop = () => {
  const { products } = useContext(ShopContext);
  const location = useLocation();
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const filter = params.get('filter');
    
    // Reset to 'all' if no category is present, otherwise set to the URL value
    setFilterCategory(category || 'all');
    
    // Explicitly reset the active filter unless 'best-seller' is specified in the URL
    setActiveFilter(filter);
  }, [location]);

  const filteredProducts = products.filter(p => {
    // Category filter
    let matchesCategory = true;
    if (filterCategory !== 'all') {
      matchesCategory = p.category.toLowerCase().includes(filterCategory.toLowerCase());
    }

    // Custom filename-based filter for Best Sellers
    let matchesFilter = true;
    if (activeFilter === 'best-seller') {
      matchesFilter = p.images.some(img => img.toLowerCase().includes('(best seller)'));
    }

    return matchesCategory && matchesFilter;
  }).sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    return 0; // newest/featured
  });

  return (
    <div className={styles.shopPage}>
      <header className={styles.shopHeader}>
        <div className={styles.container}>
          <h1>Collection</h1>
          <p>Carefully curated silhouettes, thoughtfully designed for you.</p>
        </div>
      </header>

      <div className={styles.shopControls}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <Filter size={16} />
              <span>Filter By:</span>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="dresses">Dresses</option>
                <option value="coords">Co-ords</option>
                <option value="sarees">Sarees</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <span>Sort By:</span>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <p className={styles.resultsCount}>{filteredProducts.length} Products</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No products found in this category.</p>
              <button onClick={() => setFilterCategory('all')}>View All</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
