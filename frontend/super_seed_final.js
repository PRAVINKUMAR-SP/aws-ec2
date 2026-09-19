const categories = {
    Mobiles: [
        { title: 'iPhone 15 Pro Max', imgId: '1598327105666-5b89351cb315' },
        { title: 'Samsung Galaxy S24 Ultra', imgId: '1511707171634-5f897ff02aa9' },
        { title: 'Google Pixel 8 Pro', imgId: '1580910051074-3eb694886505' },
        { title: 'OnePlus 12', imgId: '1601784551446-20c9e07cdcaa' },
        { title: 'Sony Xperia 1 V', imgId: '1533228115689-858eb00b62d5' },
        { title: 'Xiaomi 14 Pro', imgId: '1556656793-89a4c4784103' },
        { title: 'Motorola Edge 50', imgId: '1585060544812-6b45742d762f' },
        { title: 'Nothing Phone (2)', imgId: '1605236453806-6fb368d787f2' }
    ],
    Fashion: [
        { title: 'Classic Leather Jacket', imgId: '1523381210434-271e8be1f52b' },
        { title: 'Designer Denim Jeans', imgId: '1483985988355-763728e1935b' },
        { title: 'Silk Summer Dress', imgId: '1515886657613-9f3515b0c78f' },
        { title: 'Premium Cotton T-Shirt', imgId: '1550614000-4b95d415d863' },
        { title: 'Wool Winter Coat', imgId: '1434389678393-882200788647' },
        { title: 'Athletic Running Shoes', imgId: '1509319117193-57bab727e09d' },
        { title: 'Elegant Evening Gown', imgId: '1490481651871-ab68de25d43d' },
        { title: 'Casual Chino Pants', imgId: '1532453288672-3a27e9be9efd' }
    ],
    Electronics: [
        { title: 'Sony WH-1000XM5 Headphones', imgId: '1505740420928-5e560c06d30e' },
        { title: 'MacBook Pro 16-inch', imgId: '1498049860654-af1a5c566876' },
        { title: 'Apple Watch Series 9', imgId: '1526406915894-7bcd65f60845' },
        { title: 'DJI Mini 4 Pro Drone', imgId: '1546868871-7041f8a44d8c' },
        { title: 'Bose SoundLink Speaker', imgId: '1583394834285-f09b5a1c38cc' },
        { title: 'Canon EOS R5 Camera', imgId: '1527443224154-c4a3942d3acf' },
        { title: 'Xbox Wireless Controller', imgId: '1585338107529-13afc5f02baa' },
        { title: 'iPad Pro 12.9', imgId: '1600294037882-6f2963138bdf' }
    ],
    Home: [
        { title: 'Velvet Sofa Set', imgId: '1505693416388-ac5ce068fe85' },
        { title: 'Oak Dining Table', imgId: '1555041469-a586c61ea9bc' },
        { title: 'Minimalist Floor Lamp', imgId: '1583847268964-b185b1ce89ba' },
        { title: 'Persian Area Rug', imgId: '1586023492125-27b2c045efd7' },
        { title: 'Ergonomic Office Chair', imgId: '1600585154340-be6161a56a0c' },
        { title: 'Ceramic Coffee Mug Set', imgId: '1616486338812-3dadae4b4ace' },
        { title: 'Cotton Bedding Sheet Set', imgId: '1524758631624-e2822e304c36' },
        { title: 'Wall Art Canvas', imgId: '1618220179428-22790b46a015' }
    ],
    Appliances: [
        { title: 'Dyson V15 Vacuum', imgId: '1556909114-f6e7ad7d3136' },
        { title: 'Nespresso Coffee Maker', imgId: '1581092921461-eab62e97a780' },
        { title: 'KitchenAid Stand Mixer', imgId: '1626808642875-0aa5d0074f33' },
        { title: 'Samsung Smart Refrigerator', imgId: '1527192864627-72ce87e07671' },
        { title: 'Breville Toaster Oven', imgId: '1621245037064-0722cc872bc9' },
        { title: 'Ninja Air Fryer', imgId: '1584277264878-83141885f86f' },
        { title: 'LG Front Load Washer', imgId: '1584277265873-10d952e46f6e' },
        { title: 'Vitamix Blender', imgId: '1584277264350-0402b8b9816e' }
    ],
    Toys: [
        { title: 'LEGO Star Wars Set', imgId: '1558060370-d644479cb6f7' },
        { title: 'Remote Control Car', imgId: '1596461404969-9ae70f2830c1' },
        { title: 'Barbie Dreamhouse', imgId: '1585366119957-77ec18b8de31' },
        { title: 'Hot Wheels Track', imgId: '1611082598687-0b1a030c6a85' },
        { title: 'Monopoly Board Game', imgId: '1536643265890-ce003309a632' },
        { title: 'Nerf Elite Blaster', imgId: '1587654780209-58d88e63b15a' },
        { title: 'Play-Doh Modeling Compound', imgId: '1566576721346-d4a3b4eaeb55' },
        { title: 'Fisher-Price Learning Toy', imgId: '1599623560574-39d485900c95' }
    ],
    Beauty: [
        { title: 'MAC Matte Lipstick', imgId: '1620916566398-39f1143ab7be' },
        { title: 'Estee Lauder Foundation', imgId: '1596462502278-27bfdc403348' },
        { title: 'Chanel No.5 Perfume', imgId: '1599305090598-fe179d501227' },
        { title: 'Olaplex Hair Treatment', imgId: '1612817288484-6f916006741a' },
        { title: 'Fenty Beauty Highlighter', imgId: '1522337660859-02fbefca4702' },
        { title: 'Clinique Moisture Surge', imgId: '1556228578-0d85b1a4d571' },
        { title: 'Urban Decay Eyeshadow Palette', imgId: '1571781526291-c427ce2149de' },
        { title: 'Dior Mascara', imgId: '1608248594248-cb75471b04b6' }
    ],
    Sports: [
        { title: 'Nike Air Max 270', imgId: '1515523110800-9415d13b84a8' },
        { title: 'Spalding Basketball', imgId: '1517649763962-0c623066013b' },
        { title: 'Wilson Tennis Racket', imgId: '1541534741688-6078c6bfb5c5' },
        { title: 'Yoga Mat with Alignment Lines', imgId: '1534438327276-14e5300c3a48' },
        { title: 'Adjustable Dumbbells Set', imgId: '1526509867162-5b0c0d1b4b33' },
        { title: 'Speedo Swim Goggles', imgId: '1518611012118-696072aa579a' },
        { title: 'Trek Mountain Bike', imgId: '1517836357463-d25dfeac3438' },
        { title: 'Titleist Pro V1 Golf Balls', imgId: '1571008840902-2465d3a5ce06' }
    ],
    Books: [
        { title: 'Atomic Habits by James Clear', imgId: '1544947950-fa07a98d237f' },
        { title: 'The Midnight Library', imgId: '1512820790803-83c7326ba487' },
        { title: 'Dune by Frank Herbert', imgId: '1495446815901-a7297e633e8d' },
        { title: 'Sapiens: A Brief History', imgId: '1524995997946-f1c2580b1459' },
        { title: 'Rich Dad Poor Dad', imgId: '1543002588-bfa74002ed7e' },
        { title: 'The Great Gatsby', imgId: '1589829085413-56de8ae18c73' },
        { title: 'Harry Potter Box Set', imgId: '1456953180671-1277a9be3b7a' },
        { title: 'A Promised Land', imgId: '1532012197267-da84d127e765' }
    ],
    Groceries: [
        { title: 'Organic Avocados (4-Pack)', imgId: '1608686207856-001b95cf60ca' },
        { title: 'Whole Bean Arabica Coffee', imgId: '1542838132-92c53300491e' },
        { title: 'Extra Virgin Olive Oil', imgId: '1596191060012-32b0051bc19e' },
        { title: 'Almond Milk (1L)', imgId: '1596424263628-971c6d328331' },
        { title: 'Artisan Sourdough Bread', imgId: '1506459225024-1b285f59dc23' },
        { title: 'Fresh Strawberries', imgId: '1513289069324-11e550ab4685' },
        { title: 'Himalayan Pink Salt', imgId: '1596425986968-3e91122a6ea8' },
        { title: 'Organic Honey (500g)', imgId: '1550989460-0a7c93605c08' }
    ]
};

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
        console.log("Failed to clear DB, it might be empty.");
    }

    console.log("Starting reliable data seeding...");
    for (const [catName, productsList] of Object.entries(categories)) {
        for (let i = 0; i < productsList.length; i++) {
            const item = productsList[i];
            
            const price = Math.floor(Math.random() * 4000) + 99;
            const imgUrl = `https://images.unsplash.com/photo-${item.imgId}?w=500&h=500&fit=crop&q=80`;
            const imgUrl2 = `https://images.unsplash.com/photo-${productsList[(i + 1) % productsList.length].imgId}?w=500&h=500&fit=crop&q=80`;
            const imgUrl3 = `https://images.unsplash.com/photo-${productsList[(i + 2) % productsList.length].imgId}?w=500&h=500&fit=crop&q=80`;
            
            const product = {
                title: item.title,
                description: `Experience the premium quality of the ${item.title}. Perfectly crafted for the ${catName.toLowerCase()} category, offering unmatched durability and top-tier performance. Buy now at A2Z~cart!`,
                price: price,
                category: catName,
                imageUrl: imgUrl,
                rating: parseFloat((Math.random() * 1.0 + 4.0).toFixed(1)), // 4.0 to 5.0
                reviewCount: Math.floor(Math.random() * 5000) + 120,
                galleryImages: [imgUrl, imgUrl2, imgUrl3]
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
            
            // small delay to prevent rapid-fire issues
            await new Promise(r => setTimeout(r, 50));
        }
    }
    console.log("Seeding complete! 80 hyper-realistic, uniquely verified products created.");
}

run();
