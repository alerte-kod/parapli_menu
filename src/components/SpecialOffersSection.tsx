import React from 'react';
import { useMenu } from '../context/MenuContext';
import MenuItemCard from './MenuItemCard';
import { Sparkles, Percent } from 'lucide-react';

interface SpecialOffersSectionProps {
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  isAdmin?: boolean;
}

const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onEditItem,
  onDeleteItem,
  isAdmin = false
}) => {
  const { menuItems, loading } = useMenu();
  
  const specialOffers = menuItems.filter(item => item.is_special_offer && item.original_price);
  
  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <p className="mt-2">Loading special offers...</p>
      </div>
    );
  }
  
  if (specialOffers.length === 0) {
    return null;
  }

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="mb-16">
      {/* Header with animated background */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/90 to-pink-600/90"></div>
        <div className="relative px-8 py-12 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={40} className="text-yellow-300 animate-bounce" />
            <h2 className="text-4xl font-bold">Special Offers</h2>
            <Percent size={40} className="text-yellow-300 animate-bounce" />
          </div>
          <p className="text-xl opacity-90">
            Limited time deals you don't want to miss!
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-sm font-medium">🔥 {specialOffers.length} Items on Sale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special offers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialOffers.map((item) => {
          const discount = item.original_price ? calculateDiscount(item.original_price, item.price) : 0;
          
          return (
            <div key={item.id} className="relative">
              {/* Discount badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform rotate-12 animate-pulse">
                  <div className="text-center">
                    <div className="text-xs font-bold">-{discount}%</div>
                    <div className="text-xs">OFF</div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced menu item card for special offers */}
              <div className="relative overflow-hidden rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 hover:border-red-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-600"></div>
                <div className="p-4">
                  <MenuItemCard
                    item={item}
                    isAdmin={isAdmin}
                    onEdit={onEditItem ? () => onEditItem(item.id) : undefined}
                    onDelete={onDeleteItem ? () => onDeleteItem(item.id) : undefined}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 border border-red-200 rounded-full px-6 py-3">
          <Sparkles size={20} className="text-red-600" />
          <span className="text-red-800 font-medium">
            Hurry! These offers won't last long
          </span>
          <Sparkles size={20} className="text-red-600" />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;