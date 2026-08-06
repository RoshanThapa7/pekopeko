(function initMenuOrder() {
    const grid = document.getElementById('menuOrderGrid');
    const nav = document.getElementById('menuCategoryNav');
    const bar = document.getElementById('menuOrderBar');
    const countEl = document.getElementById('menuOrderCount');
    const totalEl = document.getElementById('menuOrderTotal');
    const cartTotalEl = document.getElementById('menuCartTotal');
    const cartListEl = document.getElementById('menuCartList');
    const cartEmptyEl = document.getElementById('menuCartEmpty');
    const whatsappBtn = document.getElementById('menuOrderWhatsapp');
    const clearBtn = document.getElementById('menuOrderClear');
    const dialog = document.getElementById('menuOrderDialog');
    const dialogBackdrop = document.getElementById('menuOrderDialogBackdrop');
    const dialogClose = document.getElementById('menuOrderDialogClose');
    const barOpen = document.getElementById('menuOrderBarOpen');

    if (!grid || typeof PEKO_MENU === 'undefined') return;

    const orderables = typeof PEKO_ORDERABLES !== 'undefined' ? PEKO_ORDERABLES : new Map();
    const cart = new Map();
    const WHATSAPP = '9779849089199';

    const formatRs = (n) => `Rs. ${n.toLocaleString('en-NP')}`;

    const PHOTO_LABELS = {
        'momo-steam': 'Steam momo',
        'momo-jhol': 'Jhol momo',
        'momo-fried': 'Fried momo',
        'momo-chilly': 'Chilly momo',
        'momo-kothey': 'Kothey momo',
        'momo-sadeko': 'Sadeko momo',
        wings: 'Wings',
        pizza: 'Pizza',
        noodles: 'Noodles',
        chowmein: 'Chowmein',
        thukpa: 'Thukpa',
        'fried-rice': 'Fried rice',
        soup: 'Soup',
        thali: 'Thali',
        'sekuwa-buff': 'Buff sekuwa',
        'sekuwa-chicken': 'Chicken sekuwa',
        'sekuwa-pork': 'Pork sekuwa',
        appetizer: 'Appetizer',
        snacks: 'Snacks',
        main: 'Main course',
        default: 'Photo',
    };

    const FOOD_IMAGES = {
        /* Wings */
        'hot-wings':                  'images/food/spicyWings.png',
        'spicy-wings':                'images/food/spicyWings.png',
        'wings':                      'images/food/spicyWings.png',
        'buffalo-wings':              'images/food/buffaloWings.png',

        /* Pizza */
        'pizza':                      'images/food/MargheritaPizza.png',
        'margherita':                 'images/food/MargheritaPizza.png',
        'pizza-margherita':           'images/food/MargheritaPizza.png',
        'pizza-veggi':                'images/food/veggieLoverPizza.png',
        'pizza-green-garden':         'images/food/veggieLoverPizza.png',
        'pizza-tandoori':             'images/food/tandooriPizza.png',
        'pepperoni-pizza':            'images/food/pepperoniPizza.png',
        'pepperoni-chicken':          'images/food/pepperoniPizzaChicken.png',
        'pizza-pepperoni-chicken':    'images/food/pepperoniPizzaChicken.png',
        'pizza-pepperoni-pork':       'images/food/pepperoniPizza.png',

        /* Noodles / Thukpa / Chowmein */
        'noodles':                    'images/food/keemaNoodles.png',
        'keema-noodles':              'images/food/keemaNoodles.png',
        'keema-chicken':              'images/food/keemaNoodles.png',
        'keema-buff':                 'images/food/keemaNoodles.png',
        'keema-egg':                  'images/food/keemaNoodles.png',
        'thukpa':                     'images/food/thukpa.png',
        'chowmein':                   'images/food/chowmien.png',

        /* Fried Rice */
        'fried-rice':                 'images/food/friedRice.png',

        /* Soup */
        'soup':                       'images/food/soup.png',

        /* Sekuwa */
        'sekuwa-chicken':             'images/food/chickenSekuwa.png',
        'sekuwa-pork':                'images/food/porkSekuwa.png',

        /* Thali */
        'thali':                      'images/food/thaliSet.png',

        /* Main Course */
        'grilled-chicken':            'images/food/grilledChicken.jpg',
        'pork-chop':                  'images/food/porkChop.png',
        'triple-rice':                'images/food/tripleRice.png',
        'chicken-chips':              'images/food/chicken&Chips.png',
        'chicken-sizzler':            'images/food/chickenSizzler.png',
    };

    const photoBlock = (photo, item) => {
        const id = item && item.id;
        const imgSrc = (id && FOOD_IMAGES[id]) || FOOD_IMAGES[photo];
        const key = photo || 'default';
        const label = PHOTO_LABELS[key] || 'Photo';

        if (imgSrc) {
            const name = (item && item.name) || label;
            return `
        <div class="menu-order-card__photo menu-order-card__photo--has-img" data-photo="${key}">
            <img src="${imgSrc}" alt="${name}" class="menu-order-card__photo-img" loading="lazy">
        </div>
    `;
        }

        return `
        <div class="menu-order-card__photo" data-photo="${key}" aria-hidden="true">
            <span class="menu-order-card__photo-label">${label}</span>
        </div>
    `;
    };

    const stepperHtml = (id, qty, label) => qty > 0
        ? `<div class="menu-order-card__stepper" data-stepper-id="${id}">
               <button type="button" class="menu-order-card__stepper-btn" data-card-minus="${id}" aria-label="Remove one ${label}">−</button>
               <span class="menu-order-card__stepper-qty">${qty}</span>
               <button type="button" class="menu-order-card__stepper-btn menu-order-card__stepper-btn--plus" data-card-plus="${id}" aria-label="Add one more ${label}">+</button>
           </div>`
        : `<button type="button" class="menu-order-card__add" data-add="${id}" aria-label="Add ${label}">Add</button>`;

    const variantRows = (variants) => variants.map((v) => `
        <li class="menu-order-card__variant">
            <span class="menu-order-card__variant-label">${v.label}</span>
            <span class="menu-order-card__variant-price">${formatRs(v.price)}</span>
            <div class="menu-order-card__variant-ctrl" data-variant-id="${v.id}">${stepperHtml(v.id, 0, v.label)}</div>
        </li>
    `).join('');

    const renderItemCard = (item) => {
        const card = document.createElement('article');
        card.className = 'menu-order-card';
        card.innerHTML = `
            ${photoBlock(item.photo, item)}
            <div class="menu-order-card__body">
                <h3 class="menu-order-card__name">${item.name}</h3>
                <p class="menu-order-card__desc">${item.desc}</p>
                <div class="menu-order-card__footer">
                    <span class="menu-order-card__price">${formatRs(item.price)}</span>
                    <div class="menu-order-card__item-ctrl" data-item-id="${item.id}">${stepperHtml(item.id, 0, item.name)}</div>
                </div>
            </div>
        `;
        return card;
    };

    const renderGroupCard = (group) => {
        const card = document.createElement('article');
        card.className = 'menu-order-card menu-order-card--group';
        card.innerHTML = `
            ${photoBlock(group.photo, group)}
            <div class="menu-order-card__body">
                <h3 class="menu-order-card__name">${group.name}</h3>
                <p class="menu-order-card__desc">${group.desc}</p>
                <ul class="menu-order-card__variants">${variantRows(group.variants)}</ul>
            </div>
        `;
        return card;
    };

    const allTab = document.createElement('button');
    allTab.type = 'button';
    allTab.className = 'menu-order-nav__link menu-order-nav__link--active';
    allTab.dataset.category = 'all';
    allTab.textContent = 'All';
    nav.appendChild(allTab);

    const setActiveCategory = (categoryId) => {
        nav.querySelectorAll('.menu-order-nav__link').forEach((link) => {
            link.classList.toggle('menu-order-nav__link--active', link.dataset.category === categoryId);
        });
        document.querySelectorAll('.menu-order-category').forEach((section) => {
            section.hidden = categoryId !== 'all' && section.id !== `cat-${categoryId}`;
        });
        if (categoryId !== 'all') {
            document.getElementById(`cat-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            document.querySelector('.menu-order-tip-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    nav.addEventListener('click', (e) => {
        const link = e.target.closest('.menu-order-nav__link');
        if (!link) return;
        setActiveCategory(link.dataset.category);
    });

    PEKO_MENU.forEach((category, index) => {
        const section = document.createElement('section');
        section.className = 'menu-order-category menu-order-category--panel';
        section.id = `cat-${category.id}`;
        section.style.setProperty('--panel-delay', `${index * 0.05}s`);

        const thaliBanner = category.id === 'thali' ? `
            <div class="menu-thali-banner menu-thali-banner--order menu-thali-banner--dark" role="note">
                <p class="menu-thali-banner__title">Pre-order only</p>
                <p class="menu-thali-banner__rule">Minimum 4 people required — book ahead before ordering</p>
            </div>
        ` : '';

        section.innerHTML = `
            <div class="container menu-order-category__layout">
                <aside class="menu-order-category__aside">
                    <p class="menu-order-category__eyebrow">Menu</p>
                    <h2 class="menu-order-category__title">${category.title}</h2>
                    ${category.note ? `<p class="menu-order-category__note">${category.note}</p>` : ''}
                    <span class="menu-order-category__deco" aria-hidden="true">${category.icon}</span>
                </aside>
                <div class="menu-order-category__content">
                    ${thaliBanner}
                    <div class="menu-order-category__grid"></div>
                </div>
            </div>
        `;

        const catGrid = section.querySelector('.menu-order-category__grid');
        (category.entries || []).forEach((entry, i) => {
            const card = entry.kind === 'group' ? renderGroupCard(entry) : renderItemCard(entry);
            card.style.setProperty('--card-delay', `${i * 0.04}s`);
            catGrid.appendChild(card);
        });
        grid.appendChild(section);

        const tab = document.createElement('button');
        tab.type = 'button';
        tab.dataset.category = category.id;
        tab.className = 'menu-order-nav__link';
        tab.textContent = category.title;
        nav.appendChild(tab);
    });

    setActiveCategory('all');

    const observeCards = () => {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.menu-order-card, .menu-order-category--panel').forEach((el) => {
                el.classList.add('is-visible');
            });
            return;
        }
        const panelObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    panelObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06, rootMargin: '0px 0px -5% 0px' });

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

        document.querySelectorAll('.menu-order-category--panel').forEach((el) => panelObserver.observe(el));
        document.querySelectorAll('.menu-order-card').forEach((el) => cardObserver.observe(el));
    };

    observeCards();

    const lookupItem = (id) => orderables.get(id);

    const getCartTotals = () => {
        let count = 0;
        let total = 0;
        cart.forEach((qty, id) => {
            count += qty;
            const item = lookupItem(id);
            if (item) total += item.price * qty;
        });
        return { count, total };
    };

    const setDialogOpen = (open) => {
        if (!dialog) return;
        dialog.classList.toggle('menu-order-dialog--open', open);
        dialog.setAttribute('aria-hidden', open ? 'false' : 'true');
        document.body.classList.toggle('menu-dialog-open', open);
    };

    const renderCartList = () => {
        if (!cartListEl || !cartEmptyEl) return;
        cartListEl.innerHTML = '';
        if (cart.size === 0) {
            cartEmptyEl.hidden = false;
            return;
        }
        cartEmptyEl.hidden = true;

        cart.forEach((qty, id) => {
            const item = lookupItem(id);
            if (!item) return;
            const li = document.createElement('li');
            li.className = 'menu-order-dialog__item';
            li.innerHTML = `
                <div class="menu-order-dialog__item-info">
                    <span class="menu-order-dialog__item-name">${item.name}</span>
                    <span class="menu-order-dialog__item-unit">${formatRs(item.price)} each</span>
                </div>
                <div class="menu-order-dialog__item-controls">
                    <button type="button" class="menu-order-dialog__qty" data-qty-minus="${id}" aria-label="Decrease">−</button>
                    <span class="menu-order-dialog__qty-val">${qty}</span>
                    <button type="button" class="menu-order-dialog__qty" data-qty-plus="${id}" aria-label="Increase">+</button>
                </div>
                <div class="menu-order-dialog__item-end">
                    <span class="menu-order-dialog__item-line">${formatRs(item.price * qty)}</span>
                    <button type="button" class="menu-order-dialog__remove" data-remove="${id}">Remove</button>
                </div>
            `;
            cartListEl.appendChild(li);
        });
    };

    const changeQty = (id, delta) => {
        const next = (cart.get(id) || 0) + delta;
        if (next <= 0) cart.delete(id);
        else cart.set(id, next);
        updateUI();
    };

    const updateUI = () => {
        const { count, total } = getCartTotals();
        const totalText = formatRs(total);
        const hasItems = count > 0;

        if (countEl) countEl.textContent = String(count);
        if (totalEl) totalEl.textContent = totalText;
        if (cartTotalEl) cartTotalEl.textContent = totalText;
        if (bar) bar.classList.toggle('menu-order-bar--visible', hasItems);
        if (whatsappBtn) whatsappBtn.disabled = !hasItems;

        /* Re-render each item ctrl */
        document.querySelectorAll('[data-item-id]').forEach((wrap) => {
            const id = wrap.dataset.itemId;
            const qty = cart.get(id) || 0;
            const label = orderables.get(id)?.name || id;
            wrap.innerHTML = stepperHtml(id, qty, label);
        });

        /* Re-render each variant ctrl */
        document.querySelectorAll('[data-variant-id]').forEach((wrap) => {
            const id = wrap.dataset.variantId;
            const qty = cart.get(id) || 0;
            const label = orderables.get(id)?.name || id;
            wrap.innerHTML = stepperHtml(id, qty, label);
        });

        renderCartList();
    };

    const buildWhatsAppMessage = () => {
        const lines = ['Hi Peko Peko, I would like to order:', ''];
        cart.forEach((qty, id) => {
            const item = lookupItem(id);
            if (item) lines.push(`• ${item.name} x${qty} — ${formatRs(item.price * qty)}`);
        });
        const { total } = getCartTotals();
        lines.push('', `Total: ${formatRs(total)}`);
        if ([...cart.keys()].some((id) => id.startsWith('thali-'))) {
            lines.push('', 'Note: This order includes Khana Thali set(s) — pre-order only, minimum 4 people required.');
        }
        lines.push('', 'Please confirm my order. Thank you!');
        return encodeURIComponent(lines.join('\n'));
    };

    const sendWhatsApp = () => {
        if (cart.size === 0) return;
        window.open(`https://wa.me/${WHATSAPP}?text=${buildWhatsAppMessage()}`, '_blank', 'noopener,noreferrer');
    };

    grid.addEventListener('click', (e) => {
        const add  = e.target.closest('[data-add]');
        const plus = e.target.closest('[data-card-plus]');
        const minus = e.target.closest('[data-card-minus]');
        if (add)   changeQty(add.dataset.add, 1);
        if (plus)  changeQty(plus.dataset.cardPlus, 1);
        if (minus) changeQty(minus.dataset.cardMinus, -1);
    });

    cartListEl?.addEventListener('click', (e) => {
        const minus = e.target.closest('[data-qty-minus]');
        const plus = e.target.closest('[data-qty-plus]');
        const remove = e.target.closest('[data-remove]');
        if (minus) changeQty(minus.dataset.qtyMinus, -1);
        if (plus) changeQty(plus.dataset.qtyPlus, 1);
        if (remove) {
            cart.delete(remove.dataset.remove);
            updateUI();
        }
    });

    clearBtn?.addEventListener('click', () => {
        cart.clear();
        updateUI();
    });

    whatsappBtn?.addEventListener('click', sendWhatsApp);
    barOpen?.addEventListener('click', () => setDialogOpen(true));
    dialogClose?.addEventListener('click', () => setDialogOpen(false));
    dialogBackdrop?.addEventListener('click', () => setDialogOpen(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dialog?.classList.contains('menu-order-dialog--open')) {
            setDialogOpen(false);
        }
    });

    updateUI();
})();
