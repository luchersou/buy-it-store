import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

const useSearchBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const navigate = useNavigate();

  const { data: products, loading: loadingSuggestions } = useFetch(
    debouncedTerm.length > 1 ? 'https://fakestoreapi.com/products' : null
  );

  const isDefaultCategory = () => 
    !selectedCategory || 
    selectedCategory === 'Categories' || 
    selectedCategory === 'All';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const suggestions = products
    ? products
        .filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (isDefaultCategory() || 
           item.category.toLowerCase() === selectedCategory.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    setShowSuggestions(searchTerm.length > 0);
  }, [searchTerm, products]);

  const handleCategoryClose = (category) => {
    setAnchorEl(null);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleSearch = (term = searchTerm) => {
    if (!term.trim()) return;
    
    setShowSuggestions(false);
    
    const params = new URLSearchParams({ q: term });
    if (!isDefaultCategory()) params.set('category', selectedCategory);
    
    navigate(`/products?${params}`);
    setSearchTerm('');
    setDebouncedTerm('');
  };

  return {
    anchorEl,
    setAnchorEl,
    selectedCategory,
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    loadingSuggestions,
    handleCategoryClose,
    handleSearch
  };
}

export default useSearchBar;