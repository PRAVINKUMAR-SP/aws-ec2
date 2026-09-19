const categories = [
    { name: 'Mobiles', images: ['https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=500&fit=crop&q=80'] },
    { name: 'Fashion', images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop&q=80'] },
    { name: 'Electronics', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500&h=500&fit=crop&q=80'] },
    { name: 'Home', images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop&q=80'] },
    { name: 'Appliances', images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500&h=500&fit=crop&q=80'] },
    { name: 'Toys', images: ['https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop&q=80'] },
    { name: 'Beauty', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop&q=80'] },
    { name: 'Sports', images: ['https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=500&fit=crop&q=80'] },
    { name: 'Books', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop&q=80'] },
    { name: 'Groceries', images: ['https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop&q=80'] },
];

const adjectives = ['Premium', 'Luxury', 'Classic', 'Modern', 'Essential', 'Pro', 'Ultra', 'Smart', 'Elite', 'Sleek'];
const materials = ['Steel', 'Cotton', 'Wooden', 'Organic', 'Plastic', 'Glass', 'Leather', 'Carbon', 'Titanium'];

async function seed() {
    console.log("Starting data seeding...");
    for (const cat of categories) {
        for (let i = 1; i <= 8; i++) {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const mat = materials[Math.floor(Math.random() * materials.length)];
            const price = Math.floor(Math.random() * 5000) + 299;
            const img = cat.images[Math.floor(Math.random() * cat.images.length)];
            
            const product = {
                title: `${adj} ${cat.name} ${mat} Edition`,
                description: `This is a highly rated, premium quality ${cat.name.toLowerCase()} product. Features a beautiful ${mat.toLowerCase()} finish and exceptional durability. Perfect for your daily needs and fully guaranteed by A2Z~cart.`,
                price: price,
                category: cat.name,
                imageUrl: img,
                rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
                reviewCount: Math.floor(Math.random() * 5000) + 10
            };

            try {
                const res = await fetch('http://localhost:8080/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });
                if (res.ok) {
                    console.log(`Created: ${product.title}`);
                } else {
                    console.error(`Failed to create: ${product.title} (Status: ${res.status})`);
                }
            } catch (err) {
                console.error(`Error connecting to backend for: ${product.title}`, err.message);
            }
        }
    }
    console.log("Seeding complete! 80 products created.");
}

seed();
