import React from 'react';

const categories = [
  { id: 1, name: 'Mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 2, name: 'Fashion', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 3, name: 'Electronics', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 4, name: 'Home', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 5, name: 'Appliances', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 6, name: 'Toys', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 7, name: 'Beauty', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 8, name: 'Sports', img: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 9, name: 'Books', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop&crop=entropy&q=80' },
  { id: 10, name: 'Groceries', img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=300&h=300&fit=crop&crop=entropy&q=80' },
];

const CategorySlider = ({ onCategorySelect, activeCategory }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-[1500px] mx-auto px-10 py-6">
        <div className="flex gap-10 overflow-x-auto no-scrollbar items-center justify-between pb-2">
          {categories.map((cat) => (
            <div 
                key={cat.id} 
                className="flex flex-col items-center gap-4 cursor-pointer group min-w-[120px]"
                onClick={() => onCategorySelect && onCategorySelect(cat.name)}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden border-[3px] transition-all duration-300 shadow-md group-hover:shadow-lg ${activeCategory === cat.name ? 'border-accent' : 'border-transparent group-hover:border-accent'}`}>
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-base font-bold text-gray-800 group-hover:text-accent transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
