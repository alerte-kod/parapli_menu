import React from 'react';
import { useMenu } from '../context/MenuContext';
import MenuItemCard from './MenuItemCard';
import { useAuth } from '../context/AuthContext';

interface MenuGridProps {
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
}

const CategoryHeader: React.FC<{ name: string }> = ({ name }) => {
  const getCategoryImage = (categoryName: string) => {
    // You can customize these image URLs for each category
    const images: Record<string, string> = {
      'Cocktails & Spirits': 'https://i.postimg.cc/4yHKnz21/pexels-enginakyurt-2531184.jpg',
      'Beers / Bières': 'https://i.postimg.cc/nVN22Txp/pexels-edwardeyer-667986.jpg',
      'Beverages / Boissons': 'https://i.postimg.cc/xjsvp5Sc/15d43aef6c8a5134e1fc00a9c98b8ab0-XL-removebg-preview.png',
      'Rhum': 'https://i.postimg.cc/jdJNjrGr/fas05247-1920x1280.webp',
      'Whiskey & Cognac': 'https://i.postimg.cc/hvXmTFvT/Jack-Daniels-Honey-Whiskey-1-1600x900-1-1200x900-cropped.webp',
      'Vodka': 'https://i.postimg.cc/440VZ325/50-99028cfa-d1a7-49c3-a123-a0060dc5f258.webp',
      'Liqueurs': 'https://i.postimg.cc/bNKx0vQJ/liqueur-02.webp',
      'Wine / Vins': 'https://i.postimg.cc/1XbqKWVT/grape-wine-1024x683.jpg',
      'Snacks / Food / Plats': 'https://i.postimg.cc/2SRWbKDL/pexels-robinstickel-70497.jpg',
      'Coffee & Tea / Café & Thé': 'https://i.postimg.cc/NMz9gNDM/pexels-chevanon-324028.jpg',
      'Soft Drinks': 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg',
      'Hot Drinks': 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      'Seafood': 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg',
      'Pasta': 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
      'Salads': 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
      'Grilled': 'https://images.pexels.com/photos/1105325/pexels-photo-1105325.jpeg'
    };
    
    // Case-insensitive lookup
    const normalizedName = categoryName.toLowerCase();
    const matchingKey = Object.keys(images).find(key => key.toLowerCase() === normalizedName);
    
    return matchingKey ? images[matchingKey] : 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg';
  };

  return (
    <div className="relative h-24 mb-8 rounded-xl overflow-hidden">
      <img
        src={getCategoryImage(name)}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-primary via-secondary to-accent mt-1 rounded-full"></div>
      </div>
    </div>
  );
};

const MenuGrid: React.FC<MenuGridProps> = ({ onEditItem, onDeleteItem }) => {
  const { menuItems, categories, selectedCategory, loading } = useMenu();
  const { user } = useAuth();
  
  const isAdmin = !!user;
  
  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category_id === selectedCategory)
    : menuItems;

  // Group items by category
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = filteredItems.filter(item => item.category_id === category.id);
    return acc;
  }, {} as Record<string, typeof menuItems>);
    
  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <p className="mt-2">Loading menu items...</p>
      </div>
    );
  }
  
  if (filteredItems.length === 0) {
    return (
      <div className="py-8 text-center">
        <p>No menu items found {selectedCategory ? 'in this category' : ''}.</p>
      </div>
    );
  }

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    return (
      <div>
        {category && <CategoryHeader name={category.name} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              onEdit={onEditItem ? () => onEditItem(item.id) : undefined}
              onDelete={onDeleteItem ? () => onDeleteItem(item.id) : undefined}
            />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryItems = itemsByCategory[category.id];
        if (!categoryItems?.length) return null;
        
        return (
          <div key={category.id}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary">{category.name}</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent mt-2 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  isAdmin={isAdmin}
                  onEdit={onEditItem ? () => onEditItem(item.id) : undefined}
                  onDelete={onDeleteItem ? () => onDeleteItem(item.id) : undefined}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;