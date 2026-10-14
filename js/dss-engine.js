// ==========================================
// SHAPE BEFORE STRENGTH
// ENGINE V1 (FULL RESPONSES & REBIDS) - JS VERSION
// ==========================================

const BALANCED_SHAPES = new Set([
    "4333","3433","3343","3334",
    "4432","4423","4342","4243",
    "4324","4234","3442","2443",
    "3424","2434","3244","2344",
    "5332","5323","5233",
    "3532","3523","2533",
    "3352","3253","2353",
    "3325","3235","2335"
]);

const SPECIAL_D4C5 = new Set([
    "4045", "0445", "3145", "1345", "2245"
]);

function shapeLengths(shape) {
    let s = shape.toString();
    return [parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3])];
}

function isBalanced(shape) {
    return BALANCED_SHAPES.has(shape.toString());
}

function hasShort(shape) {
    let [s, h, d, c] = shapeLengths(shape);
    return s <= 1 || h <= 1 || d <= 1 || c <= 1;
}

// สุ่มสำรับไพ่มาตรฐาน 52 ใบจริง แจก 13 ใบ ไม่ซ้ำกัน
function generateRandomHand() {
    const suits = ['s', 'h', 'd', 'c'];
    const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    const cardValues = {'A': 4, 'K': 3, 'Q': 2, 'J': 1};
    const rankOrder = {'A':14, 'K':13, 'Q':12, 'J':11, '10':10, '9':9, '8':8, '7':7, '6':6, '5':5, '4':4, '3':3, '2':2};

    let deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => { deck.push({ suit: suit, rank: rank }); });
    });

    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    let hand = deck.slice(0, 13);
    let cardsObj = { s: [], h: [], d: [], c: [] };
    let counts = { s: 0, h: 0, d: 0, c: 0 };
    let hcp = 0;

    hand.forEach(card => {
        cardsObj[card.suit].push(card.rank);
        counts[card.suit]++;
        if (cardValues[card.rank]) hcp += cardValues[card.rank];
    });

    Object.keys(cardsObj).forEach(suit => {
        cardsObj[suit].sort((a, b) => rankOrder[b] - rankOrder[a]);
    });

    let shapeStr = `${counts.s}${counts.h}${counts.d}${counts.c}`;
    return { hcp, shape: shapeStr, cards: cardsObj };
}

// ==========================================
// 1. OPENING
// ==========================================
function openingBid(hcp, shape) {
    let [s, h, d, c] = shapeLengths(shape);
    let balanced = isBalanced(shape);

    if (hcp >= 5 && hcp <= 10) {
        if (s >= 8 && h <= 4 && d <= 4 && c <= 4) return ["4S", "มีแต้ม 5-10 และมี Spade 8 ใบขึ้นไป"];
        if (h >= 8 && s <= 4 && d <= 4 && c <= 4) return ["4H", "มีแต้ม 5-10 และมี Heart 8 ใบขึ้นไป"];
        if (d >= 8 && s <= 4 && h <= 4 && c <= 4) return ["4D", "มีแต้ม 5-10 และมี Diamond 8 ใบขึ้นไป"];
        if (c >= 8 && s <= 4 && h <= 4 && d <= 4) return ["4C", "มีแต้ม 5-10 และมี Club 8 ใบขึ้นไป"];
    }

    if (hcp >= 5 && hcp <= 10) {
        if (s === 7 && h <= 4 && d <= 4 && c <= 4) return ["3S", "มีแต้ม 5-10 และมี Spade 7 ใบ"];
        if (h === 7 && s <= 4 && d <= 4 && c <= 4) return ["3H", "มีแต้ม 5-10 และมี Heart 7 ใบ"];
        if (d === 7 && s <= 4 && h <= 4 && c <= 4) return ["3D", "มีแต้ม 5-10 และมี Diamond 7 ใบ"];
        if (c === 7 && s <= 4 && h <= 4 && c <= 4) return ["3C", "มีแต้ม 5-10 และมี Club 7 ใบ"];
    }

    if (balanced && hcp >= 20 && hcp <= 22) return ["2N", "20-22 Balanced"];
    if (hcp >= 21) return ["2C", "21+ any or 18+ playing tricks"];
    if (hcp >= 17 && hcp <= 20 && s >= 5 && h >= 5) return ["2D", "Multi 17-20 M55"];
    
    if (hcp >= 6 && hcp <= 10) {
        if (s === 6 && h <= 4 && d <= 4 && c <= 4) return ["2D", "Multi weak 1M"];
        if (h === 6 && s <= 4 && d <= 4 && c <= 4) return ["2D", "Multi weak 1M"];
    }

    if (11 <= hcp && hcp <= 13 && s === 6 && h <= 4 && d <= 4 && c <= 4) return ["2S", "11-13 S6"];
    if (11 <= hcp && hcp <= 13 && h === 6 && s <= 4 && d <= 4 && c <= 4) return ["2H", "11-13 H6"];

    if (balanced) {
        if (hcp >= 17 && hcp <= 19) {
            if (s >= 5) return ["1S", "11+ S5"];
            if (h >= 5) return ["1H", "11+ H5"];
            return ["1C", "big NT 17-19 no M5"];
        }
        if (hcp >= 14 && hcp <= 16) return ["1N", "strong NT 14-16"];
        if (hcp >= 11 && hcp <= 13) return ["1C", "weak NT 11-13"];
    }

    if (hcp >= 11 && hcp <= 20) {
        if (s >= 5 && h >= 5) return s >= h ? ["1S", "11+ S5"] : ["1H", "11+ H5"];
        if (s >= 5) return ["1S", "11+ S5"];
        if (h >= 5) return ["1H", "11+ H5"];
    }

    if (hcp >= 11 && hcp <= 20 && ["1444", "4144", "4441"].includes(shape.toString())) return ["1D", "11+ D4+ unbalanced"];
    if (hcp >= 11 && hcp <= 20 && shape.toString() === "4414") return ["1C", "11+ C4+ unbalanced"];

    if (SPECIAL_D4C5.has(shape.toString())) {
        if (hcp >= 11 && hcp <= 15) return ["1D", "11+ D4+ unbalanced"];
        if (hcp >= 16) return ["1C", "11-15 D4C5 open 1D rebid 2C"];
    }

    if (hcp >= 11 && hcp <= 20) {
        if (c > d) return ["1C", "11+ C4+ unbalanced"];
        return ["1D", "11+ D4+ unbalanced"];
    }

    return ["PASS", "0-10 no good bid"];
}

// ==========================================
// 2. RESPONSES (1C, 1D, 1M, 1NT)
// ==========================================

function response_1c(hcp, shape, balanced = false, badSuit = false) {
    let [s, h, d, c] = shapeLengths(shape);
    balanced = isBalanced(shape);

    if (hcp >= 13 && s < 4 && h < 4) return ["1N", "GF RELAY"];
    if (hcp >= 13 && balanced && !badSuit && (s === 4 || h === 4)) return ["1N", "GF RELAY"];
    if (h >= 4 && ((h === 4 && s === 4) || h > s)) return ["1D", "Transfer H4+"];
    if (s >= 4 && !(s === 4 && h === 4) && s >= h) return ["1H", "Transfer S4+"];
    if (11 <= hcp && hcp <= 12 && c === 5) return ["2D", "11-12 C5+"];
    if (11 <= hcp && hcp <= 12 && balanced && s < 4 && h < 4 && d < 5 && c < 5) return ["2H", "11-12 Balanced no m5"];
    if (6 <= hcp && hcp <= 10 && d >= 6 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (11 <= hcp && hcp <= 12 && d >= 5 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (0 <= hcp && hcp <= 5 && d >= 7 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (6 <= hcp && hcp <= 10 && d >= 5 && c >= 5) return ["2S", "6-10 m55"];
    if (0 <= hcp && hcp <= 5 && c >= 6) return ["2N", "weak raised"];
    if (6 <= hcp && hcp <= 10 && c >= 6) return ["3C", "blocking raised"];
    if (6 <= hcp && hcp <= 10 && s < 4 && h < 4 && d < 6 && c < 6) return ["1S", "6-10 M<4 m<5"];
    return ["PASS", "no good bid"];
}

function response_1d(hcp, shape, balanced = false, badSuit = false) {
    let [s, h, d, c] = shapeLengths(shape);
    balanced = isBalanced(shape);

    if (hcp >= 13 && s < 3 && h < 3) return ["1N", "GF RELAY"];
    if (hcp >= 13 && balanced && !badSuit && (s === 4 || h === 4)) return ["1N", "GF RELAY"];
    if (10 <= hcp && hcp <= 12 && s < 4 && h < 4 && c >= 5 && c > d) return ["2S", "Game invited C5+ C>D"];
    if (10 <= hcp && hcp <= 12 && s < 4 && h < 4 && d >= 4 && d >= c) return ["3C", "Game invited D4+ unbalanced"];
    if (11 <= hcp && hcp <= 12 && balanced && s < 4 && h < 4) return ["2H", "11-12 Balanced"];
    if (6 <= hcp && hcp <= 10 && d >= 5 && s < 4 && h < 4) return ["3D", "6-9 D5+ or D4 unbalanced"];
    if (6 <= hcp && hcp <= 9 && d === 4 && s < 4 && h < 4 && (s <= 1 || h <= 1)) return ["3D", "6-9 D5+ or D4 unbalanced"];
    if (hcp === 10 && shape.toString() === "3325") return ["2C", "NF C5+"];
    if (6 <= hcp && hcp <= 9 && c >= 6 && d < 4 && s < 4 && h < 4) return ["2C", "NF C5+"];
    if (6 <= hcp && hcp <= 10 && d === 3 && s < 4 && h < 4) return ["2D", "constructive D3-4"];
    if (0 <= hcp && hcp <= 5 && d >= 5 && s < 4 && h < 4) return ["2N", "weak raised"];
    if (hcp >= 6 && s >= 4 && s >= h && !(s === 4 && h === 4)) return ["1S", "S4+"];
    if (0 <= hcp && hcp <= 5 && s >= 4 && d >= 4 && s >= h && !(s === 4 && h === 4)) return ["1S", "S4+"];
    if (hcp >= 6 && h >= 4 && h > s) return ["1H", "H4+"];
    if (0 <= hcp && hcp <= 5 && h >= 4 && d >= 4 && h > s) return ["1H", "H4+"];
    return ["PASS", "no good bid"];
}

function response_1major(opening, hcp, shape, hasAce = false) {
    let [s, h, d, c] = shapeLengths(shape);
    let trump = (opening === "1H") ? h : s;
    let otherMajor = (opening === "1H") ? s : h;
    let hasVoid = (s === 0 || h === 0 || d === 0 || c === 0);
    let hasShort = (s <= 1 || h <= 1 || d <= 1 || c <= 1);

    if (trump >= 4) {
        if (hcp >= 13 && hasVoid) return ["3D", "GF 13+ M4+ with any void"];
        if (hcp >= 13 && otherMajor === 1) return (opening === "1H") ? ["3S", "GF 13+ H4+ singleton S"] : ["3H", "GF 13+ S4+ singleton H"];
        if (hcp >= 13 && c === 1) return ["3N", "GF 13+ singleton C"];
        if (hcp >= 13 && d === 1) return ["4C", "GF 13+ singleton D"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (10 <= hcp && hcp <= 12 && hasShort) return ["2N", "Game Invite M4+ with any short"];
        if (8 <= hcp && hcp <= 12 && !hasShort) return ["3C", "Game Invite M4+ with no short"];
        if (6 <= hcp && hcp <= 9 && trump >= 5) return (opening === "1H") ? ["4H", "Non Force M4+"] : ["4S", "Non Force M4+"];
        if (6 <= hcp && hcp <= 9 && hasShort) return (opening === "1H") ? ["4H", "Non Force M4+"] : ["4S", "Non Force M4+"];
        if (4 <= hcp && hcp <= 7 && shape.toString() !== "4333" && hasAce) return (opening === "1H") ? ["3H", "Blocking M4+"] : ["3S", "Blocking M4+"];
        if (0 <= hcp && hcp <= 5 && shape.toString() !== "4333") return ["3D", "weak raise M4+"];
        if (shape.toString() === "4333") {
            if (hcp >= 5) return (opening === "1H") ? ["2H", "constructive raised"] : ["2S", "constructive raised"];
            return ["PASS", "no good bid"];
        }
    }

    if (trump === 3) {
        if (hcp >= 13) {
            if (hasShort) return (opening === "1H") ? ["2D", "GF 13+ M3 with short"] : ["2H", "GF 13+ M3 with short"];
            return ["2C", "GF RELAY"];
        }
        if (10 <= hcp && hcp <= 12) return (opening === "1H") ? ["2D", "Game invited H3"] : ["2H", "Game invited S3"];
        if (6 <= hcp && hcp <= 9) return (opening === "1H") ? ["2H", "constructive raised"] : ["2S", "constructive raised"];
        return ["PASS", "no good bid"];
    }

    if (opening === "1S") {
        if (6 <= hcp && hcp <= 10 && h >= 6 && s < 3) return ["2D", "Transfer H"];
        if (11 <= hcp && hcp <= 12 && h >= 5 && s < 4) return ["2D", "Transfer H"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (6 <= hcp && hcp <= 12) return ["1N", "1N Forcing"];
        return ["PASS", "no good bid"];
    } else {
        if (6 <= hcp && hcp <= 9 && s === 6 && h < 2) return ["2S", "6-9 S6"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (0 <= hcp && hcp <= 9 && s >= 5 && h < 3) return ["1N", "6-12 S5+"];
        if (10 <= hcp && hcp <= 11 && s >= 5 && h < 4) return ["1N", "6-12 S5+"];
        if (6 <= hcp && hcp <= 12) return ["1S", "S<5 1RF"];
        return ["PASS", "no good bid"];
    }
}

function response_1nt(hcp, shape) {
    let [s, h, d, c] = shapeLengths(shape);

    if (hcp >= 9 && s >= 5 && h >= 5) return ["3D", "GF 9+ M55"];
    if (hcp >= 10 && ((s >= 5 && h === 4) || (h >= 5 && s === 4))) return ["2C", "GF 10+ M5+ and oM4"];
    if (8 <= hcp && hcp <= 9 && ((s >= 5 && h >= 5) || ((s >= 5 || h >= 5) && (d >= 5 || c >= 5)))) return ["2C", "Constructive 8-9"];
    if (hcp === 9 && (s >= 5 || h >= 5)) return ["2C", "GI 9 Hcp M5-6"];
    if ((10 <= hcp && hcp <= 12 && s >= 6) || (6 <= hcp && hcp <= 9 && s >= 7) || (0 <= hcp && hcp <= 5 && s >= 8)) return ["4D", "Transfer Spade"];
    if ((10 <= hcp && hcp <= 12 && h >= 6) || (6 <= hcp && hcp <= 9 && h >= 7) || (0 <= hcp && hcp <= 5 && h >= 8)) return ["4C", "Transfer Heart"];
    if (hcp >= 11 && (shape.toString() === "1345" || shape.toString() === "1354")) return ["3S", "GF m54 with singleton S"];
    if (hcp >= 11 && (shape.toString() === "3145" || shape.toString() === "3154")) return ["3H", "GF m54 with singleton H"];
    if (d >= 5 && c >= 5) return ["2D", "m55"];
    if (10 <= hcp && hcp <= 12 && Math.max(s, h) < 3 && Math.max(d, c) >= 6) return ["3N", "To Play"];
    if (11 <= hcp && hcp <= 15 && (shape.toString() === "2254" || shape.toString() === "2245")) return ["3N", "To Play"];
    if ((0 <= hcp && hcp <= 8 && s >= 5 && s >= h) || (hcp >= 10 && s >= 5 && h < 4)) return ["2H", "Transfer S"];
    if ((0 <= hcp && hcp <= 8 && h >= 5 && h > s) || (hcp >= 10 && h >= 5 && s < 4)) return ["2D", "Transfer H"];
    if (13 <= hcp && hcp <= 15 && (s >= 3 || h >= 3) && Math.min(d, c) < 6) return ["3C", "Ask M no M5"];
    if (11 <= hcp && hcp <= 12 && (s >= 3 || h >= 3) && Math.min(d, c) < 7) return ["3C", "Ask M no M5"];
    if (hcp === 10 && (s >= 3 || h >= 3) && Math.min(d, c) === 6) return ["3C", "Ask M no M5"];
    if ((0 <= hcp && hcp <= 9 && d >= 6) || (13 <= hcp && d >= 6) || (10 <= hcp && hcp <= 12 && d >= 7)) return ["2N", "Transfer D6+"];
    if ((0 <= hcp && hcp <= 9 && c >= 6) || (13 <= hcp && c >= 6) || (10 <= hcp && hcp <= 12 && c >= 7)) return ["2S", "Transfer C"];
    if (hcp >= 16 && s < 5 && h < 5 && d < 6 && c < 6 && !(d >= 5 && c >= 5)) return ["2C", "16+ M<5"];
    if (hcp === 10 && s < 5 && h < 5 && d < 6 && c < 6 && !(d >= 5 && c >= 5)) return ["2C", "Game invited"];
    return ["PASS", "no good bid"];
}

// ==========================================
// 3. OPENER REBIDS (1C, 1D, 1H)
// ==========================================

function opener_rebid_1c(response, hcp, shape, extraInfo = {}) {
    let [s, h, d, c] = shapeLengths(shape);
    let balanced = isBalanced(shape);
    let responseStr = (response || "").toUpperCase().trim();

    if (responseStr === "1D") {
        if (17 <= hcp && hcp <= 19 && balanced && h === 4) return ["2N", "2N FIT 16+ H4 Balanced"];
        if (16 <= hcp && hcp <= 20 && !balanced && h >= 4) return ["2S", "Power Fit 16+ H4 unbalanced"];
        if (16 <= hcp && hcp <= 20 && !balanced && h === 3) return ["2D", "Turbo Fit 16+ H3"];
        if (16 <= hcp && hcp <= 20 && h < 4) return ["1N", "1N no fit 16+ H<4"];
        if (14 <= hcp && hcp <= 15 && h === 4) return ["2H", "Medium Fit 14-15 H4"];
        if (14 <= hcp && hcp <= 15 && h < 3 && c >= 6) return ["3C", "Medium Fit 14-15 C6"];
        if (balanced || (11 <= hcp && hcp <= 13 && h === 4)) return ["1H", "weak NT or H4"];
        if (11 <= hcp && hcp <= 15 && s === 4 && !balanced) return ["1S", "minimum 11-15 S4 unbalanced"];
        if (11 <= hcp && hcp <= 15 && c >= 6) return ["2C", "minimum 11-15 C6"];
        return ["1H", "weak NT or H4"];
    }
    else if (responseStr === "1H") {
        if (17 <= hcp && hcp <= 19 && balanced && s === 4) return ["2N", "2N FIT 16+ S4 Balanced"];
        if (16 <= hcp && hcp <= 20 && !balanced && s >= 4) return ["2H", "Power Fit 16+ S4 unbalanced"];
        if (16 <= hcp && hcp <= 20 && !balanced && s === 3) return ["2D", "Turbo Fit 16+ S3"];
        if (16 <= hcp && hcp <= 20 && s < 4) return ["1N", "1N no fit 16+ S<4"];
        if (14 <= hcp && hcp <= 15 && s === 4) return ["2S", "Medium Fit 14-15 S4"];
        if (14 <= hcp && hcp <= 15 && s < 3 && c >= 6) return ["3C", "Medium Fit 14-15 good C6"];
        if (balanced || (11 <= hcp && hcp <= 13 && s === 4)) return ["1S", "weak NT or S4"];
        if (11 <= hcp && hcp <= 15 && c >= 5) return ["2C", "minimum 11-15 C5"];
        return ["1S", "weak NT or S4"];
    }
    else if (responseStr === "1S") {
        if (11 <= hcp && hcp <= 13 && s >= 5) return ["PASS", "Minimum S5"];
        if ((17 <= hcp && hcp <= 19 && balanced) || (hcp >= 16 && d >= 4)) return ["2D", "Big NT or 16+ D4"];
        if (hcp >= 16 && s >= 4) return ["2S", "16+ SH4"];
        if (hcp >= 16 && h >= 4) return ["2H", "16+ H4"];
        if (11 <= hcp && hcp <= 15 && c >= 5) return ["2C", "Minimum 11-15 C5+"];
        if (balanced || shape.toString() === "4414") return ["1N", "weak NT or 4414"];
    }
    else if (responseStr === "1N") {
        if (17 <= hcp && hcp <= 19 && balanced) return ["2C", "Big NT"];
        if (11 <= hcp && hcp <= 13 && balanced) return ["2C", "weak NT"];
        if (11 <= hcp && hcp <= 20 && shape.toString() === "4414") return ["2C", "4-4-1-4"];
        if (h >= 4) return ["2D", "Transfer H"];
        if (s >= 4) return ["2H", "Transfer S"];
        if (c >= 6) return ["2S", "Transfer C"];
        if (d >= 4 && s <= 1) return ["2N", "Transfer D"];
        if (d >= 4 && h <= 1) return ["3C", "Transfer D"];
        if (d >= 4) return ["3D", "Transfer D"];
    }
    return ["PASS", "no good bid for 1C rebid"];
}

function opener_rebid_1h(response, hcp, shape, extraInfo = {}) {
    let [s, h, d, c] = shapeLengths(shape);
    let hasShortSuit = hasShort(shape);
    let responseStr = (response || "").toUpperCase().trim();

    if (responseStr === "1S") {
        if (13 <= hcp && hcp <= 15 && h >= 6 && (d >= 5 || c >= 5) && (extraInfo.akq_honors || 0) >= 1) return ["4H", "H6m5 AKQ"];
        if (13 <= hcp && hcp <= 15 && c >= 6 && (extraInfo.akq_honors || 0) >= 1) return ["4C", "C6H5 AKQ"];
        if (13 <= hcp && hcp <= 15 && d >= 6 && (extraInfo.akq_honors || 0) >= 1) return ["4D", "D6H5 AKQ"];
        if (11 <= hcp && hcp <= 15 && h >= 7) return ["3H", "minimum H7"];
        if (15 <= hcp && hcp <= 17 && c >= 5) return ["3C", "15-17 C5"];
        if (15 <= hcp && hcp <= 17 && d >= 5) return ["3D", "15-17 D5"];
        if (14 <= hcp && hcp <= 16 && h >= 6) return ["2H", "medium H6"];
        if (11 <= hcp && hcp <= 15 && s >= 5) return ["2S", "minimum H6S5"];
        if (11 <= hcp && hcp <= 15 && s >= 4) return ["2D", "minimum S"];
        if (11 <= hcp && hcp <= 15 && c >= 4) return ["2C", "minimum C"];
        if ((11 <= hcp && hcp <= 15 && d >= 4) || hcp >= 16) return ["1N", "minimum D or Extra"];
    }
    else if (responseStr === "1N") {
        if (13 <= hcp && hcp <= 15 && h >= 6 && (d >= 5 || c >= 5)) return ["4H", "H6m5"];
        if (13 <= hcp && hcp <= 15 && c >= 6) return ["4C", "C6H5"];
        if (13 <= hcp && hcp <= 15 && d >= 6) return ["4D", "D6H5"];
        if (14 <= hcp && hcp <= 15 && s >= 3) return ["3S", "Medium S4"];
        if (11 <= hcp && hcp <= 15 && h >= 7 && s < 3) return ["3H", "minimum H7"];
        if (15 <= hcp && hcp <= 17 && c >= 5) return ["3C", "15-17 C5"];
        if (15 <= hcp && hcp <= 17 && d >= 5) return ["3D", "15-17 D5"];
        if (14 <= hcp && hcp <= 16 && h >= 6) return ["2H", "medium H6"];
        if (hcp >= 16 && s >= 3) return ["2N", "Extra S3+"];
        if (11 <= hcp && hcp <= 13 && s >= 3) return ["2S", "11-13 S3+"];
        if (11 <= hcp && hcp <= 15 && d === 4) return ["2D", "minimum D4"];
        return ["2C", "Minimum C4 or Extra"];
    }
    return ["PASS", "no good bid for 1H rebid"];
}

// ==========================================
// 4. DSSEngine Export Wrapper
// ==========================================
const DSSEngine = {
    calculateHCP(cards) {
        let hcp = 0;
        const values = { 'A': 4, 'K': 3, 'Q': 2, 'J': 1 };
        cards.forEach(card => {
            let rank = card.charAt(0).toUpperCase();
            if (values[rank]) hcp += values[rank];
        });
        return hcp;
    },
    openingBid(hcp, shape) {
        return openingBid(hcp, shape);
    },
    response1C(hcp, shape, balanced, badSuit) {
        return response_1c(hcp, shape, balanced, badSuit);
    },
    response1D(hcp, shape, balanced, badSuit) {
        return response_1d(hcp, shape, balanced, badSuit);
    },
    response1Major(opening, hcp, shape, hasAce) {
        return response_1major(opening, hcp, shape, hasAce);
    },
    response1NT(hcp, shape) {
        return response_1nt(hcp, shape);
    },
    openerRebid1C(response, hcp, shape, extraInfo) {
        return opener_rebid_1c(response, hcp, shape, extraInfo);
    },
    openerRebid1H(response, hcp, shape, extraInfo) {
        return opener_rebid_1h(response, hcp, shape, extraInfo);
    },
    generateRandomHand() {
        return generateRandomHand();
    }
};
