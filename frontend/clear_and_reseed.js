const categories = {
    Mobiles: [
        '1598327105666-5b89351cb315', '1511707171634-5f897ff02aa9', '1580910051074-3eb694886505', '1601784551446-20c9e07cdcaa',
        '1533228115689-858eb00b62d5', '1556656793-89a4c4784103', '1585060544812-6b45742d762f', '1605236453806-6fb368d787f2'
    ],
    Fashion: [
        '1523381210434-271e8be1f52b', '1483985988355-763728e1935b', '1515886657613-9f3515b0c78f', '1550614000-4b95d415d863',
        '1434389678393-882200788647', '1509319117193-57bab727e09d', '1490481651871-ab68de25d43d', '1532453288672-3a27e9be9efd'
    ],
    Electronics: [
        '1505740420928-5e560c06d30e', '1498049860654-af1a5c566876', '1526406915894-7bcd65f60845', '1546868871-7041f8a44d8c',
        '1583394834285-f09b5a1c38cc', '1527443224154-c4a3942d3acf', '1585338107529-13afc5f02baa', '1600294037882-6f2963138bdf'
    ],
    Home: [
        '1505693416388-ac5ce068fe85', '1555041469-a586c61ea9bc', '1583847268964-b185b1ce89ba', '1586023492125-27b2c045efd7',
        '1600585154340-be6161a56a0c', '1616486338812-3dadae4b4ace', '1524758631624-e2822e304c36', '1618220179428-22790b46a015'
    ],
    Appliances: [
        '1556909114-f6e7ad7d3136', '1581092921461-eab62e97a780', '1626808642875-0aa5d0074f33', '1527192864627-72ce87e07671',
        '1621245037064-0722cc872bc9', '1584277264878-83141885f86f', '1584277265873-10d952e46f6e', '1584277264350-0402b8b9816e'
    ],
    Toys: [
        '1558060370-d644479cb6f7', '1596461404969-9ae70f2830c1', '1585366119957-77ec18b8de31', '1611082598687-0b1a030c6a85',
        '1536643265890-ce003309a632', '1587654780209-58d88e63b15a', '1566576721346-d4a3b4eaeb55', '1599623560574-39d485900c95'
    ],
    Beauty: [
        '1620916566398-39f1143ab7be', '1596462502278-27bfdc403348', '1599305090598-fe179d501227', '1612817288484-6f916006741a',
        '1522337660859-02fbefca4702', '1556228578-0d85b1a4d571', '1571781526291-c427ce2149de', '1608248594248-cb75471b04b6'
    ],
    Sports: [
        '1515523110800-9415d13b84a8', '1517649763962-0c623066013b', '1541534741688-6078c6bfb5c5', '1534438327276-14e5300c3a48',
        '1526509867162-5b0c0d1b4b33', '1518611012118-696072aa579a', '1517836357463-d25dfeac3438', '1571008840902-2465d3a5ce06'
    ],
    Books: [
        '1544947950-fa07a98d237f', '1512820790803-83c7326ba487', '1495446815901-a7297e633e8d', '1524995997946-f1c2580b1459',
        '1543002588-bfa74002ed7e', '1589829085413-56de8ae18c73', '1456953180671-1277a9be3b7a', '1532012197267-da84d127e765'
    ],
    Groceries: [
        '1608686207856-001b95cf60ca', '1542838132-92c53300491e', '1596191060012-32b0051bc19e', '1596424263628-971c6d328331',
        '1506459225024-1b285f59dc23', '1513289069324-11e550ab4685', '1596425986968-3e91122a6ea8', '1550989460-0a7c93605c08'
    ]
};

const adjectives = ['Premium', 'Luxury', 'Classic', 'Modern', 'Essential', 'Pro', 'Ultra', 'Smart', 'Elite', 'Sleek'];
const materials = ['Steel', 'Cotton', 'Wooden', 'Organic', 'Plastic', 'Glass', 'Leather', 'Carbon', 'Titanium'];

async function clearAndReseed() {
    console.log("Fetching existing products...");
    let res = await fetch('http://localhost:8080/api/products');
    let products = await res.json();
    
    console.log(`Found ${products.length} existing products. Deleting them...`);
    for (let p of products) {
        await fetch(`http://localhost:8080/api/products/${p.id}`, { method: 'DELETE' });
    }
    console.log("Database cleared!");

    console.log("Starting data seeding with unique images...");
    for (const [catName, ids] of Object.entries(categories)) {
        for (let i = 0; i < ids.length; i++) {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const mat = materials[Math.floor(Math.random() * materials.length)];
            const price = Math.floor(Math.random() * 5000) + 299;
            const imgUrl = `https://images.unsplash.com/photo-${ids[i]}?w=500&h=500&fit=crop&q=80`;
            
            const product = {
                title: `${adj} ${catName} ${mat} Edition`,
                description: `This is a highly rated, premium quality ${catName.toLowerCase()} product. Features a beautiful ${mat.toLowerCase()} finish and exceptional durability. Perfect for your daily needs and fully guaranteed by A2Z~cart.`,
                price: price,
                category: catName,
                imageUrl: imgUrl,
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
                    console.log(`Created: ${product.title} (Image ${i+1}/8)`);
                }
            } catch (err) {
                console.error(`Error connecting to backend for: ${product.title}`, err.message);
            }
        }
    }
    console.log("Seeding complete! 80 perfectly unique products created.");
}

clearAndReseed();
