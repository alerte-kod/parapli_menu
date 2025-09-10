import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMenuItems, getCategories, subscribeToMenuChanges } from '../services/menuService';
import type { MenuItem, Category } from '../types';

interface MenuContextType {
  menuItems: MenuItem[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  loading: boolean;
  error: Error | null;
  refreshMenu: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  categories: [],
  selectedCategory: null,
  setSelectedCategory: () => {},
  loading: true,
  error: null,
  refreshMenu: async () => {},
});

export const useMenu = () => useContext(MenuContext);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const [items, cats] = await Promise.all([getMenuItems(), getCategories()]);
      setMenuItems(items);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch menu data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();

    const unsubscribe = subscribeToMenuChanges(() => {
      fetchMenuData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories,
        selectedCategory,
        setSelectedCategory,
        loading,
        error,
        refreshMenu: fetchMenuData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};