import React, { useContext } from 'react';
import { Search, X } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return showSearch ? (
    <div className={styles.searchBar}>
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            placeholder="Search our collection..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <Search className={styles.searchIcon} size={18} />
        </div>
        <X 
          className={styles.closeIcon} 
          size={20} 
          onClick={() => setShowSearch(false)} 
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
