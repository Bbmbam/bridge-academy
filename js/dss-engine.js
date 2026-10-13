// ==========================================
// SHAPE BEFORE STRENGTH
// ENGINE V1 (CENTRALIZED DECISION + SHOW RULES) - JS VERSION
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

// ==========================================
// HELPERS
// ==========================================

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

// ==========================================
// CENTRALIZED DECISION ENGINE
// ==========================================

function evaluateCentralDecision(openerHcp, openerShape, responseRangeDict, currentBidStr) {
    let [s, h, d, c] = shapeLengths(openerShape);
    let balanced = isBalanced(openerShape);
    let responseStr = (currentBidStr || "").toUpperCase().trim();

    let minResp = responseRangeDict.min !== undefined ? responseRangeDict.min : (responseRangeDict.p_min !== undefined ? responseRangeDict.p_min : 6);
    let maxResp = responseRangeDict.max !== undefined ? responseRangeDict.max : (responseRangeDict.p_max !== undefined ? responseRangeDict.p_max : 10);
    
    let respS = responseRangeDict.s_min || 0;
    let respH = responseRangeDict.h_min || 0;
    let respD = responseRangeDict.d_min || 0;
    let respC = responseRangeDict.c_min || 0;

    let totalS = s + respS;
    let totalH = h + respH;
    let totalD = d + respD;
    let totalC = c + respC;

    let suitLengths = [s, h, d, c];
    let minLen = Math.min(...suitLengths);
    let distPoints = 0;
    if (minLen === 0) distPoints += 5;
    else if (minLen === 1) distPoints += 3;
    else if (minLen === 2) distPoints += 1;

    let openerTotal = openerHcp + distPoints;
    let minTotal = openerTotal + minResp;
    let maxTotal = openerTotal + maxResp;
    
    let ntMin = openerHcp + minResp;
    let ntMax = openerHcp + maxResp;

    const SLAM_ZONE = 32;
    const GAME_ZONE_MIN = 25;
    const GAME_ZONE_MAX = 31;

    function suitRank(suitChar) {
        return { "C": 1, "D": 2, "H": 3, "S": 4, "N": 5 }[suitChar.toUpperCase()] || 0;
    }

    let currentLevel = responseStr && !isNaN(responseStr[0]) ? parseInt(responseStr[0]) : 1;
    let currentSuit = responseStr.length > 1 ? responseStr.substring(1) : "C";
    let currentScoreVal = currentLevel * 5 + suitRank(currentSuit);

    function getCheapestBid(targetSuit) {
        for (let lvl of [2, 3, 4, 5]) {
            let candVal = lvl * 5 + suitRank(targetSuit);
            if (candVal > currentScoreVal) {
                return `${lvl}${targetSuit}`;
            }
        }
        return `3${targetSuit}`;
    }

    let fitSuit = null;
    let fitType = null;
    let openerTrumpLen = 0;

    if (totalS >= 8) { fitSuit = "S"; fitType = "Major"; openerTrumpLen = s; }
    else if (totalH >= 8) { fitSuit = "H"; fitType = "Major"; openerTrumpLen = h; }
    else if (totalD >= 8) { fitSuit = "D"; fitType = "Minor"; openerTrumpLen = d; }
    else if (totalC >= 8) { fitSuit = "C"; fitType = "Minor"; openerTrumpLen = c; }

    if (fitSuit && maxTotal < GAME_ZONE_MIN) {
        return ["PASS", `Decision: ${fitType} Fit 8+ below game (Max ${maxTotal}pts), safe to PASS`];
    }

    if (fitType === "Major") {
        if (minTotal >= SLAM_ZONE) return [`6${fitSuit}`, "Decision: Major Slam"];
        if (minTotal >= GAME_ZONE_MIN && minTotal <= GAME_ZONE_MAX) return [`4${fitSuit}`, "Decision: Major Game"];
        
        if (minTotal < GAME_ZONE_MIN && maxTotal >= GAME_ZONE_MIN) {
            if (fitSuit === "H" && (s <= 1 || d <= 1 || c <= 1) && openerTrumpLen >= 6) {
                let shortSuit = s <= 1 ? "S" : (d <= 1 ? "D" : "C");
                return ["2N", `Decision: Game Try (Short ${shortSuit}, Trump 6+)`];
            }
            if (d <= 1 && openerTrumpLen >= 6 && fitSuit !== "D") return ["3D", "Decision: Game Try (Short D, Trump 6+)"];
            if (c <= 1 && openerTrumpLen >= 6 && fitSuit !== "C") return ["3C", "Decision: Game Try (Short C, Trump 6+)"];
            
            let askBid = fitSuit === "H" ? "3H" : "3S";
            return [askBid, "Decision: Game Try Ask Honor & Min/Max (Low Priority)"];
        }
        return [`4${fitSuit}`, "Decision: Major Game"];
    }

    if (fitType === "Minor") {
        if (minTotal >= SLAM_ZONE) return [`6${fitSuit}`, "Decision: Minor Slam"];
        if (minTotal >= 29 && distPoints > 12) return [`5${fitSuit}`, `Decision: Strong Minor Game 5${fitSuit}`];
        
        if (minTotal >= GAME_ZONE_MIN && minTotal <= GAME_ZONE_MAX) {
            if (ntMin >= GAME_ZONE_MIN) return ["3N", `Decision: NT Game preferred over 5${fitSuit} (Safer)`];
            return [`4${fitSuit}`, "Decision: Minor Game Invite / Safe Stop at 4"];
        }
        if (minTotal < GAME_ZONE_MIN && maxTotal >= GAME_ZONE_MIN) {
            let cheapest = getCheapestBid(fitSuit);
            return [cheapest, "Decision: Minor Game Try / Invitational"];
        }
    }

    if (ntMin >= SLAM_ZONE) return ["6N", "Decision: NT Slam"];
    if (ntMin >= GAME_ZONE_MIN && ntMin <= GAME_ZONE_MAX) return ["3N", "Decision: NT Game"];
    
    if (minTotal < GAME_ZONE_MIN && maxTotal >= GAME_ZONE_MIN) {
        if (balanced) return ["2N", "Decision: Game Invite (Balanced, Max goes to game)"];
        let unbidSuit = s >= 4 ? "S" : (h >= 4 ? "H" : (d >= 4 ? "D" : "C"));
        return [getCheapestBid(unbidSuit), "Decision: New Suit Forcing / 4th Suit Game Force"];
    }
    
    if (ntMax < GAME_ZONE_MIN) return ["2N", "Decision: No fit, park at 2NT"];
    return ["3N", "Decision: Max reaches game, bid 3NT"];
}

// ==========================================
// OPENING
// ==========================================

function openingBid(hcp, shape) {
    let [s, h, d, c] = shapeLengths(shape);
    let balanced = isBalanced(shape);

    if (hcp >= 5 && hcp <= 10) {
        if (s >= 8 && h <= 4 && d <= 4 && c <= 4) return ["4S", "มีแต้ม 5-10 และมีไพ่ Spade 8 ใบขึ้นไป (4 Level Preempt)"];
        if (h >= 8 && s <= 4 && d <= 4 && c <= 4) return ["4H", "มีแต้ม 5-10 และมีไพ่ Heart 8 ใบขึ้นไป (4 Level Preempt)"];
        if (d >= 8 && s <= 4 && h <= 4 && c <= 4) return ["4D", "มีแต้ม 5-10 และมีไพ่ Diamond 8 ใบขึ้นไป (4 Level Preempt)"];
        if (c >= 8 && s <= 4 && h <= 4 && d <= 4) return ["4C", "มีแต้ม 5-10 และมีไพ่ Club 8 ใบขึ้นไป (4 Level Preempt)"];
    }

    if (hcp >= 5 && hcp <= 10) {
        if (s === 7 && h <= 4 && d <= 4 && c <= 4) return ["3S", "มีแต้ม 5-10 และมีไพ่ Spade 7 ใบ (3 Level Preempt)"];
        if (h === 7 && s <= 4 && d <= 4 && c <= 4) return ["3H", "มีแต้ม 5-10 และมีไพ่ Heart 7 ใบ (3 Level Preempt)"];
        if (d === 7 && s <= 4 && h <= 4 && c <= 4) return ["3D", "มีแต้ม 5-10 และมีไพ่ Diamond 7 ใบ (3 Level Preempt)"];
        if (c === 7 && s <= 4 && h <= 4 && d <= 4) return ["3C", "มีแต้ม 5-10 และมีไพ่ Club 7 ใบ (3 Level Preempt)"];
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
            return ["1C", "big NT 17-19 no M5 open 1C"];
        }
        if (hcp >= 14 && hcp <= 16) return ["1N", "strong NT 14-16 open 1N"];
        if (hcp >= 11 && hcp <= 13) return ["1C", "weak NT 11-13 open 1C"];
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
        if (hcp >= 16) return ["1C", "11-15 D4C5 เปิด 1D เตรียมรีบิด 2C"];
    }

    if (hcp >= 11 && hcp <= 20) {
        if (c > d) return ["1C", "11+ C4+ unbalanced"];
        return ["1D", "11+ D4+ unbalanced"];
    }

    return ["PASS", "0-10 no good bid"];
}

// ==========================================
// DSSEngine Object Export Wrapper
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
    evaluateCentralDecision(hcp, shape, responseDict, currentBid) {
        return evaluateCentralDecision(hcp, shape, responseDict, currentBid);
    }
};
