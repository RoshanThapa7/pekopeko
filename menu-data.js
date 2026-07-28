/* Peko Peko Eatery — full menu data */
const PEKO_MENU = [
    {
        id: 'recommended',
        title: 'Recommended',
        icon: '⭐',
        entries: [
            { kind: 'item', id: 'hot-wings', name: 'Hot Chicken Wings', price: 350, desc: 'Crispy wings with our signature heat.', photo: 'wings' },
            { kind: 'item', id: 'buffalo-wings', name: 'Buffalo Wings', price: 350, desc: 'Classic buffalo sauce, bold and tangy.', photo: 'wings' },
            { kind: 'item', id: 'margherita', name: 'Margherita Pizza', price: 490, desc: 'Tomato, mozzarella, and fresh basil.', photo: 'pizza' },
            { kind: 'item', id: 'pepperoni-chicken', name: 'Pepperoni Pizza (Chicken)', price: 930, desc: 'Loaded pepperoni on a crisp base.', photo: 'pizza' },
            { kind: 'item', id: 'momo-chicken-steam', name: 'Chicken Mo:Mo (Steam)', price: 220, desc: 'Juicy chicken dumplings, steamed.', photo: 'momo-steam' },
            { kind: 'item', id: 'momo-buff-jhol', name: 'Buff Mo:Mo (Jhol)', price: 230, desc: 'Buff dumplings in spicy jhol sauce.', photo: 'momo-jhol' },
            { kind: 'item', id: 'keema-chicken', name: 'Keema Noodles (Chicken)', price: 260, desc: 'Savory minced chicken over noodles.', photo: 'noodles' },
            { kind: 'item', id: 'sekuwa-buff-plate', name: 'Buff Sekuwa (Plate)', price: 380, desc: 'Char-grilled buff, Nepali classic.', photo: 'sekuwa-buff' },
        ],
    },
    {
        id: 'appetizers',
        title: 'Appetizers',
        icon: '🍗',
        entries: [
            { kind: 'group', id: 'wings', name: 'Wings', photo: 'wings', desc: 'Crispy fried chicken wings — pick your sauce.', variants: [
                { id: 'hot-wings', label: 'Hot Chicken', price: 350 },
                { id: 'buffalo-wings', label: 'Buffalo', price: 350 },
            ]},
            { kind: 'item', id: 'chicken-takatak', name: 'Chicken Takatak', price: 485, desc: 'Sizzling spiced chicken off the griddle.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-pork', name: 'Chilly Pork', price: 520, desc: 'Wok-tossed pork with peppers.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-chicken', name: 'Chilly Chicken', price: 425, desc: 'Crispy chicken in chili sauce.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-mushroom', name: 'Chilly Mushroom', price: 375, desc: 'Vegetarian-friendly chili mushroom.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-buff', name: 'Chilly Buff', price: 475, desc: 'Tender buff in spicy coating.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-paneer', name: 'Chilly Paneer', price: 430, desc: 'Paneer cubes in chili glaze.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-veg', name: 'Chilly Veg', price: 350, desc: 'Mixed vegetables, chili style.', photo: 'appetizer' },
            { kind: 'item', id: 'chilly-fish', name: 'Chilly Fish', price: 550, desc: 'Fish fillet with chili kick.', photo: 'appetizer' },
            { kind: 'item', id: 'paneer-65', name: 'Paneer 65', price: 430, desc: 'South-style spiced paneer bites.', photo: 'appetizer' },
        ],
    },
    {
        id: 'snacks',
        title: 'Snacks',
        icon: '🍢',
        entries: [
            { kind: 'item', id: 'fried-buff-sausage', name: 'Fried Buff Sausage', price: 240, desc: 'Golden fried buff sausages.', photo: 'snacks' },
            { kind: 'item', id: 'buff-sukuti-sadeko', name: 'Buff Sukuti Sadeko', price: 370, desc: 'Smoky dried buff with spices.', photo: 'snacks' },
            { kind: 'item', id: 'fish-finger', name: 'Fish Finger', price: 370, desc: 'Crispy fish strips, snack-ready.', photo: 'snacks' },
            { kind: 'item', id: 'corn-dog', name: 'Corn Dog', price: 175, desc: 'Classic corn dog, fun and filling.', photo: 'snacks' },
        ],
    },
    {
        id: 'momo',
        title: 'Mo:Mo',
        icon: '🥟',
        note: 'All prices in Rs.',
        entries: [
            { kind: 'group', id: 'momo-steam', name: 'Steam Mo:Mo', photo: 'momo-steam', desc: 'Classic steamed dumplings — veg, buff, or chicken.', variants: [
                { id: 'momo-veg-steam', label: 'Veg', price: 180 },
                { id: 'momo-buff-steam', label: 'Buff', price: 200 },
                { id: 'momo-chicken-steam', label: 'Chicken', price: 220 },
            ]},
            { kind: 'group', id: 'momo-jhol', name: 'Jhol Mo:Mo', photo: 'momo-jhol', desc: 'Dumplings in spicy jhol broth.', variants: [
                { id: 'momo-veg-jhol', label: 'Veg', price: 210 },
                { id: 'momo-buff-jhol', label: 'Buff', price: 230 },
                { id: 'momo-chicken-jhol', label: 'Chicken', price: 250 },
            ]},
            { kind: 'group', id: 'momo-fried', name: 'Fried Mo:Mo', photo: 'momo-fried', desc: 'Crispy fried dumplings — same style, pick your filling.', variants: [
                { id: 'momo-veg-fried', label: 'Veg', price: 210 },
                { id: 'momo-buff-fried', label: 'Buff', price: 230 },
                { id: 'momo-chicken-fried', label: 'Chicken', price: 250 },
            ]},
            { kind: 'group', id: 'momo-chilly', name: 'Chilly Mo:Mo', photo: 'momo-chilly', desc: 'Dumplings tossed in chili sauce.', variants: [
                { id: 'momo-veg-chilly', label: 'Veg', price: 230 },
                { id: 'momo-buff-chilly', label: 'Buff', price: 250 },
                { id: 'momo-chicken-chilly', label: 'Chicken', price: 270 },
            ]},
            { kind: 'group', id: 'momo-kothey', name: 'Kothey Mo:Mo', photo: 'momo-kothey', desc: 'Pan-seared kothey style dumplings.', variants: [
                { id: 'momo-veg-kothey', label: 'Veg', price: 200 },
                { id: 'momo-chicken-kothey', label: 'Chicken', price: 240 },
            ]},
            { kind: 'group', id: 'momo-sadeko', name: 'Sadeko Mo:Mo', photo: 'momo-sadeko', desc: 'Dumplings tossed in Nepali sadeko spices.', variants: [
                { id: 'momo-veg-sadeko', label: 'Veg', price: 230 },
                { id: 'momo-chicken-sadeko', label: 'Chicken', price: 270 },
            ]},
        ],
    },
    {
        id: 'soup',
        title: 'Soup',
        icon: '🍲',
        entries: [
            { kind: 'group', id: 'soup', name: 'Soup', photo: 'soup', desc: 'Warm bowls to start your meal.', variants: [
                { id: 'soup-veg', label: 'Veg', price: 150 },
                { id: 'soup-mushroom', label: 'Mushroom', price: 220 },
                { id: 'soup-chicken', label: 'Chicken', price: 280 },
            ]},
        ],
    },
    {
        id: 'pizza',
        title: 'Pizza',
        icon: '🍕',
        entries: [
            { kind: 'item', id: 'pizza-margherita', name: 'Margherita', price: 490, desc: 'Tomato, mozzarella, and fresh basil.', photo: 'pizza' },
            { kind: 'item', id: 'pizza-veggi', name: 'Veggi Lover', price: 550, desc: 'Garden vegetables on cheese base.', photo: 'pizza' },
            { kind: 'item', id: 'pizza-tandoori', name: 'Tandoori Chicken', price: 550, desc: 'Tandoori chicken topping.', photo: 'pizza' },
            { kind: 'item', id: 'pizza-green-garden', name: 'Green Chicken Garden', price: 550, desc: 'Greens and chicken combo.', photo: 'pizza' },
            { kind: 'item', id: 'pizza-pepperoni-chicken', name: 'Pepperoni (Chicken)', price: 930, desc: 'Loaded chicken pepperoni.', photo: 'pizza' },
            { kind: 'item', id: 'pizza-pepperoni-pork', name: 'Pepperoni (Pork)', price: 990, desc: 'Pork pepperoni, fully loaded.', photo: 'pizza' },
        ],
    },
    {
        id: 'noodles',
        title: 'Keema Noodles',
        icon: '🍜',
        entries: [
            { kind: 'group', id: 'keema-noodles', name: 'Keema Noodles', photo: 'noodles', desc: 'Savory minced meat over noodles — pick your protein.', variants: [
                { id: 'keema-buff', label: 'Buff', price: 230 },
                { id: 'keema-chicken', label: 'Chicken', price: 260 },
                { id: 'keema-egg', label: 'Egg', price: 220 },
            ]},
        ],
    },
    {
        id: 'thukpa',
        title: 'Thukpa',
        icon: '🍜',
        entries: [
            { kind: 'group', id: 'thukpa', name: 'Thukpa', photo: 'thukpa', desc: 'Hearty noodle soup — choose your filling.', variants: [
                { id: 'thukpa-veg', label: 'Veg', price: 170 },
                { id: 'thukpa-egg', label: 'Egg', price: 220 },
                { id: 'thukpa-buff', label: 'Buff', price: 240 },
                { id: 'thukpa-chicken', label: 'Chicken', price: 260 },
                { id: 'thukpa-mixed', label: 'Mixed', price: 280 },
            ]},
        ],
    },
    {
        id: 'chowmein',
        title: 'Chowmein',
        icon: '🍝',
        entries: [
            { kind: 'group', id: 'chowmein', name: 'Chowmein', photo: 'chowmein', desc: 'Stir-fried noodles — choose your protein.', variants: [
                { id: 'chowmein-veg', label: 'Veg', price: 165 },
                { id: 'chowmein-egg', label: 'Egg', price: 200 },
                { id: 'chowmein-buff', label: 'Buff', price: 220 },
                { id: 'chowmein-chicken', label: 'Chicken', price: 250 },
                { id: 'chowmein-mixed', label: 'Mixed', price: 250 },
            ]},
        ],
    },
    {
        id: 'fried-rice',
        title: 'Fried Rice',
        icon: '🍚',
        entries: [
            { kind: 'group', id: 'fried-rice', name: 'Fried Rice', photo: 'fried-rice', desc: 'Wok-fried rice — choose your protein.', variants: [
                { id: 'fried-rice-veg', label: 'Veg', price: 180 },
                { id: 'fried-rice-chicken', label: 'Chicken', price: 240 },
                { id: 'fried-rice-buff', label: 'Buff', price: 220 },
                { id: 'fried-rice-pork', label: 'Pork', price: 270 },
                { id: 'fried-rice-mixed', label: 'Mixed', price: 270 },
            ]},
        ],
    },
    {
        id: 'sekuwa',
        title: 'Sekuwa',
        icon: '🔥',
        entries: [
            { kind: 'group', id: 'sekuwa-buff', name: 'Buff Sekuwa', photo: 'sekuwa-buff', desc: 'Char-grilled buff — Nepali classic.', variants: [
                { id: 'sekuwa-buff-plate', label: 'Plate', price: 380 },
                { id: 'sekuwa-buff-500', label: '500g', price: 750 },
                { id: 'sekuwa-buff-1kg', label: '1kg', price: 1400 },
            ]},
            { kind: 'group', id: 'sekuwa-chicken', name: 'Chicken Sekuwa', photo: 'sekuwa-chicken', desc: 'Smoky grilled chicken sekuwa.', variants: [
                { id: 'sekuwa-chicken-plate', label: 'Plate', price: 380 },
                { id: 'sekuwa-chicken-500', label: '500g', price: 700 },
                { id: 'sekuwa-chicken-1kg', label: '1kg', price: 1300 },
            ]},
            { kind: 'group', id: 'sekuwa-pork', name: 'Pork Sekuwa', photo: 'sekuwa-pork', desc: 'Char-grilled pork sekuwa.', variants: [
                { id: 'sekuwa-pork-plate', label: 'Plate', price: 430 },
                { id: 'sekuwa-pork-500', label: '500g', price: 800 },
                { id: 'sekuwa-pork-1kg', label: '1kg', price: 1450 },
            ]},
        ],
    },
    {
        id: 'thali',
        title: 'Khana Thali',
        icon: '🍛',
        note: 'Pre-order only · Minimum 4 people required',
        entries: [
            { kind: 'group', id: 'thali', name: 'Khana Thali Set', photo: 'thali', desc: 'Full Nepali khana set — pre-order only, minimum 4 people.', variants: [
                { id: 'thali-veg', label: 'Veg Paneer', price: 490 },
                { id: 'thali-chicken', label: 'Chicken', price: 540 },
                { id: 'thali-buff', label: 'Buff', price: 540 },
                { id: 'thali-fish', label: 'Fish', price: 550 },
                { id: 'thali-mutton', label: 'Mutton', price: 640 },
            ]},
        ],
    },
    {
        id: 'main-course',
        title: 'Main Course',
        icon: '⭐',
        entries: [
            { kind: 'item', id: 'grilled-chicken', name: 'Grilled Chicken', price: 690, desc: 'Whole grilled chicken plate.', photo: 'main' },
            { kind: 'item', id: 'pork-chop', name: 'Pork Chop', price: 790, desc: 'Juicy pork chop main.', photo: 'main' },
            { kind: 'item', id: 'triple-rice', name: 'Triple Rice', price: 500, desc: 'Rice trio special.', photo: 'main' },
            { kind: 'item', id: 'chicken-chips', name: 'Chicken & Chips', price: 450, desc: 'Chicken with crispy fries.', photo: 'main' },
            { kind: 'item', id: 'chicken-sizzler', name: 'Chicken Sizzler', price: 550, desc: 'Sizzling chicken platter.', photo: 'main' },
        ],
    },
];

/** Flat lookup: orderable id → { id, name, price } */
const PEKO_ORDERABLES = (() => {
    const map = new Map();
    PEKO_MENU.forEach((cat) => {
        (cat.entries || []).forEach((entry) => {
            if (entry.kind === 'group') {
                entry.variants.forEach((v) => {
                    map.set(v.id, {
                        id: v.id,
                        name: `${entry.name} (${v.label})`,
                        price: v.price,
                    });
                });
            } else {
                map.set(entry.id, { id: entry.id, name: entry.name, price: entry.price });
            }
        });
    });
    return map;
})();

if (typeof module !== 'undefined') module.exports = { PEKO_MENU, PEKO_ORDERABLES };
