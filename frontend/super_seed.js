

const categories = {
    Mobiles: [
        { title: 'iPhone 15 Pro Max', keyword: 'iphone' },
        { title: 'Samsung Galaxy S24 Ultra', keyword: 'samsung+galaxy' },
        { title: 'Google Pixel 8 Pro', keyword: 'google+pixel' },
        { title: 'OnePlus 12', keyword: 'smartphone' },
        { title: 'Sony Xperia 1 V', keyword: 'sony+phone' },
        { title: 'Xiaomi 14 Pro', keyword: 'mobile+phone' },
        { title: 'Motorola Edge 50', keyword: 'cellphone' },
        { title: 'Nothing Phone (2)', keyword: 'smartphone+tech' }
    ],
    Fashion: [
        { title: 'Classic Leather Jacket', keyword: 'leather+jacket' },
        { title: 'Designer Denim Jeans', keyword: 'denim+jeans' },
        { title: 'Silk Summer Dress', keyword: 'summer+dress' },
        { title: 'Premium Cotton T-Shirt', keyword: 'cotton+tshirt' },
        { title: 'Wool Winter Coat', keyword: 'winter+coat' },
        { title: 'Athletic Running Shoes', keyword: 'running+shoes' },
        { title: 'Elegant Evening Gown', keyword: 'evening+gown' },
        { title: 'Casual Chino Pants', keyword: 'chino+pants' }
    ],
    Electronics: [
        { title: 'Sony WH-1000XM5 Headphones', keyword: 'headphones' },
        { title: 'MacBook Pro 16-inch', keyword: 'macbook' },
        { title: 'Apple Watch Series 9', keyword: 'smartwatch' },
        { title: 'DJI Mini 4 Pro Drone', keyword: 'drone' },
        { title: 'Bose SoundLink Speaker', keyword: 'bluetooth+speaker' },
        { title: 'Canon EOS R5 Camera', keyword: 'dslr+camera' },
        { title: 'Xbox Wireless Controller', keyword: 'gaming+controller' },
        { title: 'iPad Pro 12.9', keyword: 'ipad' }
    ],
    Home: [
        { title: 'Velvet Sofa Set', keyword: 'velvet+sofa' },
        { title: 'Oak Dining Table', keyword: 'dining+table' },
        { title: 'Minimalist Floor Lamp', keyword: 'floor+lamp' },
        { title: 'Persian Area Rug', keyword: 'persian+rug' },
        { title: 'Ergonomic Office Chair', keyword: 'office+chair' },
        { title: 'Ceramic Coffee Mug Set', keyword: 'coffee+mugs' },
        { title: 'Cotton Bedding Sheet Set', keyword: 'bedding+sheets' },
        { title: 'Wall Art Canvas', keyword: 'wall+art' }
    ],
    Appliances: [
        { title: 'Dyson V15 Vacuum', keyword: 'vacuum+cleaner' },
        { title: 'Nespresso Coffee Maker', Kitchen: 'coffee+maker' },
        { title: 'KitchenAid Stand Mixer', keyword: 'stand+mixer' },
        { title: 'Samsung Smart Refrigerator', keyword: 'refrigerator' },
        { title: 'Breville Toaster Oven', keyword: 'toaster' },
        { title: 'Ninja Air Fryer', keyword: 'air+fryer' },
        { title: 'LG Front Load Washer', keyword: 'washing+machine' },
        { title: 'Vitamix Blender', keyword: 'blender' }
    ],
    Toys: [
        { title: 'LEGO Star Wars Set', keyword: 'lego' },
        { title: 'Remote Control Car', keyword: 'rc+car' },
        { title: 'Barbie Dreamhouse', keyword: 'barbie' },
        { title: 'Hot Wheels Track', keyword: 'hot+wheels' },
        { title: 'Monopoly Board Game', keyword: 'board+game' },
        { title: 'Nerf Elite Blaster', keyword: 'nerf' },
        { title: 'Play-Doh Modeling Compound', keyword: 'play-doh' },
        { title: 'Fisher-Price Learning Toy', keyword: 'baby+toy' }
    ],
    Beauty: [
        { title: 'MAC Matte Lipstick', keyword: 'lipstick' },
        { title: 'Estee Lauder Foundation', keyword: 'foundation+makeup' },
        { title: 'Chanel No.5 Perfume', keyword: 'perfume' },
        { title: 'Olaplex Hair Treatment', keyword: 'hair+care' },
        { title: 'Fenty Beauty Highlighter', keyword: 'makeup+highlighter' },
        { title: 'Clinique Moisture Surge', keyword: 'skincare+cream' },
        { title: 'Urban Decay Eyeshadow Palette', keyword: 'eyeshadow' },
        { title: 'Dior Mascara', keyword: 'mascara' }
    ],
    Sports: [
        { title: 'Nike Air Max 270', keyword: 'nike+shoes' },
        { title: 'Spalding Basketball', keyword: 'basketball' },
        { title: 'Wilson Tennis Racket', keyword: 'tennis+racket' },
        { title: 'Yoga Mat with Alignment Lines', keyword: 'yoga+mat' },
        { title: 'Adjustable Dumbbells Set', keyword: 'dumbbells' },
        { title: 'Speedo Swim Goggles', keyword: 'swim+goggles' },
        { title: 'Trek Mountain Bike', keyword: 'mountain+bike' },
        { title: 'Titleist Pro V1 Golf Balls', keyword: 'golf+balls' }
    ],
    Books: [
        { title: 'Atomic Habits by James Clear', keyword: 'books+reading' },
        { title: 'The Midnight Library', keyword: 'fiction+book' },
        { title: 'Dune by Frank Herbert', keyword: 'sci-fi+book' },
        { title: 'Sapiens: A Brief History', keyword: 'history+book' },
        { title: 'Rich Dad Poor Dad', keyword: 'finance+book' },
        { title: 'The Great Gatsby', keyword: 'classic+book' },
        { title: 'Harry Potter Box Set', keyword: 'fantasy+book' },
        { title: 'A Promised Land', keyword: 'biography+book' }
    ],
    Groceries: [
        { title: 'Organic Avocados (4-Pack)', keyword: 'avocado' },
        { title: 'Whole Bean Arabica Coffee', keyword: 'coffee+beans' },
        { title: 'Extra Virgin Olive Oil', keyword: 'olive+oil' },
        { title: 'Almond Milk (1L)', keyword: 'almond+milk' },
        { title: 'Artisan Sourdough Bread', keyword: 'sourdough+bread' },
        { title: 'Fresh Strawberries', keyword: 'strawberries' },
        { title: 'Himalayan Pink Salt', keyword: 'pink+salt' },
        { title: 'Organic Honey (500g)', keyword: 'honey' }
    ]
};

async function getUnsplashImage(keyword) {
    try {
        const res = await fetch(`https://unsplash.com/napi/search/photos?query=${keyword}&per_page=1`);
        if (!res.ok) return null;
        const data = await res.json();
        if (data && data.results && data.results.length > 0) {
            // Return the regular URL, formatted to 500x500 crop
            return data.results[0].urls.raw + '&w=500&h=500&fit=crop&q=80';
        }
    } catch (e) {
        console.error(`Error fetching image for ${keyword}`, e.message);
    }
    // Fallback if unsplash api fails
    return `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80`; 
}

async function run() {
    console.log("Fetching existing products...");
    try {
        let res = await fetch('http://localhost:8080/api/products');
        let products = await res.json();
        
        console.log(`Found ${products.length} existing products. Deleting them...`);
        for (let p of products) {
            await fetch(`http://localhost:8080/api/products/${p.id}`, { method: 'DELETE' });
        }
        console.log("Database cleared!");
    } catch(e) {
        console.log("Failed to clear DB, it might be empty or backend is down.");
    }

    console.log("Starting intelligent data seeding...");
    for (const [catName, products] of Object.entries(categories)) {
        for (let i = 0; i < products.length; i++) {
            const item = products[i];
            const imgKeyword = item.keyword || item.Kitchen || item.title;
            const imgUrl = await getUnsplashImage(imgKeyword);
            
            const price = Math.floor(Math.random() * 4000) + 99;
            
            const product = {
                title: item.title,
                description: `Experience the premium quality of the ${item.title}. Perfectly crafted for the ${catName.toLowerCase()} category, offering unmatched durability and top-tier performance. Buy now at A2Z~cart!`,
                price: price,
                category: catName,
                imageUrl: imgUrl,
                rating: parseFloat((Math.random() * 1.0 + 4.0).toFixed(1)), // 4.0 to 5.0
                reviewCount: Math.floor(Math.random() * 5000) + 120
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
                    console.error(`Failed to create: ${product.title}`);
                }
            } catch (err) {
                console.error(`Error connecting to backend for: ${product.title}`);
            }
            
            // small delay to prevent rate limit
            await new Promise(r => setTimeout(r, 200));
        }
    }
    console.log("Seeding complete! 80 hyper-realistic unique products created.");
}

run();
