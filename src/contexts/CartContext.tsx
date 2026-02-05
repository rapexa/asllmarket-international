import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  supplierId: string;
  supplierName: string;
  supplierCountry: string;
  supplierVerified: boolean;
  supplierEscrowSupported: boolean;
  unitPrice: number;
  quantity: number;
  moq: number;
  variant?: string;
  inStock: boolean;
  currency: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotalBySupplier: (supplierId: string) => number;
  getGroupedBySupplier: () => Record<string, CartItem[]>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.supplierId}-${Date.now()}`,
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  };

  const getSubtotalBySupplier = (supplierId: string) => {
    return items
      .filter(item => item.supplierId === supplierId)
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  };

  const getGroupedBySupplier = () => {
    return items.reduce((acc, item) => {
      if (!acc[item.supplierId]) {
        acc[item.supplierId] = [];
      }
      acc[item.supplierId].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotalBySupplier,
        getGroupedBySupplier,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

