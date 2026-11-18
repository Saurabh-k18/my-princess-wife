// =========================================================
// 1. LOVE LETTERS DATA & MODAL INTERACTIVITY
// =========================================================
const loveLetters = [
    {
        tag: "Letter No. 01",
        title: "When You Smile",
        body: "My dearest Darshika,\n\nNo matter how busy or tiring my day gets, the second I see your smile or hear your voice, everything feels right again. You carry a softness and grace that turns ordinary moments into my favorite memories.\n\nNever stop shining, meri pyari Bayko."
    },
    {
        tag: "Letter No. 02",
        title: "My Safe Haven",
        body: "To my Princess,\n\nHome isn't a place on a map for me—it's wherever you are sitting next to me, laughing over little things, or holding my hand. Thank you for being my peace, my biggest cheerleader, and my best friend every single day."
    },
    {
        tag: "Letter No. 03",
        title: "My Promise to Bayko",
        body: "Meri Bayko,\n\nOn National Princess Day and every day after, I promise to always protect your heart, celebrate your dreams, spoil you with your favorite treats, and remind you that you will forever be treated like royalty by me."
    }
];

function openEnvelope(index) {
    const letter = loveLetters[index];
    document.getElementById('modal-letter-tag').textContent = letter.tag;
    document.getElementById('modal-letter-title').textContent = letter.title;
    document.getElementById('modal-letter-body').textContent = letter.body;

    // Mark envelope as opened
    const statusEl = document.getElementById(`status-${index}`);
    if (statusEl) {
        statusEl.textContent = "Opened with love ♥";
        statusEl.classList.remove("text-gold-600", "bg-gold-100/80");
        statusEl.classList.add("text-blush-500", "bg-blush-100");
    }

    const modal = document.getElementById('letter-modal');
    const box = document.getElementById('letter-modal-box');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    requestAnimationFrame(() => {
        box.classList.remove('scale-95', 'opacity-0');
        box.classList.add('scale-100', 'opacity-100');
    });

    triggerRoyalSparkles(0.5, 0.45);
}

function closeEnvelope() {
    const modal = document.getElementById('letter-modal');
    const box = document.getElementById('letter-modal-box');
    box.classList.remove('scale-100', 'opacity-100');
    box.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 200);
}

// =========================================================
// 2. REASONS YOU'RE MY PRINCESS CARD DECK
// =========================================================
const reasonsDeck = [
    {
        emoji: "🌸",
        title: "Your Effortless Grace",
        text: "“You don’t need a tiara to look royal, Darshika. The kindness in your eyes and the warmth in your voice make every room brighter.”"
    },
    {
        emoji: "✨",
        title: "Your Pure, Caring Heart",
        text: "“The way you care so deeply for the people you love—and the patience and magic you bring to everything you do—makes me admire you endlessly.”"
    },
    {
        emoji: "🎀",
        title: "Your Cute Little Tantrums",
        text: "“Even when my Bayko is being dramatic or demanding extra attention, you are still the cutest princess in the entire kingdom.”"
    },
    {
        emoji: "☕",
        title: "Our Simple Little Moments",
        text: "“Whether it's sharing a cup of chai, going on a drive, or just talking for hours, every ordinary minute with you feels royal.”"
    },
    {
        emoji: "💖",
        title: "How You Understand Me",
        text: "“You know what I’m thinking before I even say a word. Having you by my side makes me feel like the luckiest man alive.”"
    },
    {
        emoji: "🌟",
        title: "Your Radiant Smile",
        text: "“One genuine laugh from you has the power to erase all my stress and turn any bad day into a celebration.”"
    },
    {
        emoji: "👑",
        title: "Because You Are My Bayko",
        text: "“Out of everyone in this whole world, my heart chose you—and it will keep choosing you in every lifetime.”"
    }
];

let currentCardIndex = 0;

function renderDeck() {
    const item = reasonsDeck[currentCardIndex];
    const body = document.getElementById('card-body');
    body.style.opacity = '0';

    setTimeout(() => {
        document.getElementById('card-counter').textContent = `Card 0${currentCardIndex + 1} / 0${reasonsDeck.length}`;
        document.getElementById('card-emoji').textContent = item.emoji;
        document.getElementById('card-title').textContent = item.title;
        document.getElementById('card-text').textContent = item.text;
        body.style.opacity = '1';
    }, 140);

    // Update dots
    const dotsContainer = document.getElementById('deck-dots');
    dotsContainer.innerHTML = reasonsDeck.map((_, idx) => `
        <button type="button" onclick="goToReasonCard(${idx})" aria-label="Card ${idx + 1}"
            class="h-2 rounded-full transition-all ${idx === currentCardIndex ? 'w-6 bg-blush-500' : 'w-2 bg-gold-300 hover:bg-gold-400'}">
        </button>
    `).join('');
}

function nextReasonCard() {
    currentCardIndex = (currentCardIndex + 1) % reasonsDeck.length;
    renderDeck();
}

function prevReasonCard() {
    currentCardIndex = (currentCardIndex - 1 + reasonsDeck.length) % reasonsDeck.length;
    renderDeck();
}

function goToReasonCard(index) {
    currentCardIndex = index;
    renderDeck();
}

// =========================================================
// 3. REDEEMABLE ROYAL VOUCHERS
// =========================================================
const vouchers = [
    { id: 0, icon: "🍰", title: "Royal Coffee & Dessert Date", desc: "Your favorite café, your favorite sweet treat, zero arguments.", redeemed: false },
    { id: 1, icon: "🎬", title: "Cozy Movie & Snack Night", desc: "You pick the movie, I bring all the snacks and warm blankets.", redeemed: false },
    { id: 2, icon: "💆‍♀️", title: "20-Min Royal Head Massage", desc: "Redeemable anytime you feel tired after a long day.", redeemed: false },
    { id: 3, icon: "🚗", title: "Late-Night Long Drive", desc: "Windows down, your playlist on repeat, and ice cream on the way.", redeemed: false },
    { id: 4, icon: "🍜", title: "Instant Craving Fulfilled", desc: "Whatever Bayko craves right now magically appears.", redeemed: false },
    { id: 5, icon: "👑", title: "One 'Yes Bayko' Pass", desc: "Instant approval on any wish—no questions asked!", redeemed: false }
];

function renderVouchers() {
    const grid = document.getElementById('voucher-grid');
    grid.innerHTML = vouchers.map(v => `
        <button type="button" onclick="toggleVoucher(${v.id})"
            class="relative text-left rounded-2xl p-4 border-2 transition-all duration-300 active:scale-95 flex flex-col justify-between ${
                v.redeemed 
                ? 'bg-blush-100/80 border-blush-400 shadow-inner' 
                : 'bg-cream-50 hover:bg-gold-100/50 border-dashed border-gold-400 shadow-storybook hover:-translate-y-0.5'
            }">
            <div class="flex items-start justify-between gap-2">
                <span class="text-2xl">${v.icon}</span>
                <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    v.redeemed 
                    ? 'bg-blush-500 text-cream-50' 
                    : 'bg-gold-100 text-gold-600 border border-gold-300'
                }">
                    ${v.redeemed ? 'Claimed ✓' : 'Tap to Claim'}
                </span>
            </div>
            <div class="mt-2.5">
                <h3 class="font-serif font-bold text-lg text-plum-900 leading-snug">${v.title}</h3>
                <p class="text-xs text-plum-800/80 mt-1 leading-relaxed">${v.desc}</p>
            </div>
        </button>
    `).join('');
}

function toggleVoucher(id) {
    const v = vouchers.find(item => item.id === id);
    if (!v) return;
    v.redeemed = !v.redeemed;
    renderVouchers();
    if (v.redeemed) {
        triggerRoyalSparkles(0.5, 0.6);
    }
}

// =========================================================
// 4. ROYAL SPARKLES, CONFETTI & AMBIENT FLOATING CROWNS
// =========================================================
function triggerRoyalSparkles(originX = 0.5, originY = 0.5) {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 45,
            spread: 70,
            origin: { x: originX, y: originY },
            colors: ['#D4AF37', '#DF5880', '#F4AFC2', '#F3E3B8', '#FFFDFB']
        });
    }
}

function stampDecree() {
    triggerRoyalSparkles(0.5, 0.7);
}

function spawnFloatingParticles() {
    const layer = document.getElementById('floating-layer');
    const icons = ['✨', '👑', '🌸', '💖', '✦'];
    for (let i = 0; i < 10; i++) {
        const el = document.createElement('span');
        el.className = 'floating-particle text-base sm:text-lg opacity-55';
        el.textContent = icons[i % icons.length];
        el.style.left = `${Math.random() * 90 + 5}%`;
        el.style.top = `${Math.random() * 85 + 8}%`;
        el.style.animation = `float ${5 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`;
        el.onclick = (e) => {
            triggerRoyalSparkles(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
            el.style.transform = 'scale(1.8) rotate(25deg)';
            setTimeout(() => { el.style.transform = ''; }, 300);
        };
        layer.appendChild(el);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    renderDeck();
    renderVouchers();
    spawnFloatingParticles();

    document.getElementById('magic-wand-btn').addEventListener('click', () => {
        triggerRoyalSparkles(0.8, 0.1);
    });

    document.getElementById('hero-crown').addEventListener('click', () => {
        triggerRoyalSparkles(0.5, 0.3);
    });
});
