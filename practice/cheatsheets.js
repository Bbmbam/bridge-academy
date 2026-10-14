// practice/cheatsheets.js - รวมข้อมูลสรุปกฎกติกาด่วนสำหรับ Cheat Sheet
const CheatSheetsData = {
    "opening": `
        <h4>Opening Rules:</h4>
        <ul>
            <li><strong>Pass:</strong> 0-10 HCP</li>
            <li><strong>1C:</strong> 11-20 HCP, ♣ 2+ (Balanced ไม่บังคับชุดยาว เช่น 5332, 4432)</li>
            <li><strong>1D:</strong> 11-20 HCP, Unbalanced, ♦ 4+</li>
            <li><strong>1H:</strong> 11-20 HCP, M5 (ไม่มี 5332 ยกเว้น 17+ HCP)</li>
            <li><strong>1S:</strong> 11-20 HCP, M5 (ไม่มี 5332 ยกเว้น 17+ HCP)</li>
            <li><strong>1NT:</strong> 14-16 (Balanced)</li>
            <li><strong>2C:</strong> 21+ or 8.5 PT</li>
            <li><strong>2D:</strong> weak 1M or 17-20 M55</li>
            <li><strong>2M:</strong> 11-13 M6 no second suit >4</li>
        </ul>
    `,
    "response_1c": `
        <h4>Response 1C Rules:</h4>
        <ul>
            <li><strong>1D:</strong> Transfer H (4+)</li>
            <li><strong>1H:</strong> Transfer S (4+)</li>
            <li><strong>1S:</strong> 0-10, No M4, No Void</li>
            <li><strong>1NT:</strong> GF, No M5</li>
            <li><strong>2C:</strong> Transfer D</li>
            <li><strong>2D:</strong> GI (C 5+)</li>
            <li><strong>2H:</strong> GI Balanced (M<4 m<5)</li>
            <li><strong>3C:</strong> NF (C 6)</li>
        </ul>
    `,
    "response_1d": `
        <h4>Response 1D Rules:</h4>
        <ul>
            <li><strong>Level 1:</strong> คล้ายเปิด 1C</li>
            <li><strong>2C:</strong> NF C6+ or 3325 (แทน 1N)</li>
            <li><strong>2D:</strong> NF D3-4</li>
            <li><strong>2H:</strong> 11-12 Balanced</li>
            <li><strong>2S:</strong> GI C5+ (C>D)</li>
            <li><strong>3C:</strong> GI D4+ (D>C)</li>
            <li><strong>3D:</strong> NF D5 or D4 with any short</li>
        </ul>
    `,
    "response_1h": `
        <h4>Response 1H Rules:</h4>
        <ul>
            <li><strong>1S:</strong> S<5 (แทน 1NFC)</li>
            <li><strong>1NT:</strong> S5+ less than GF</li>
            <li><strong>2C:</strong> GF RELAY</li>
            <li><strong>2D:</strong> GI H3 or GF H3 with short</li>
            <li><strong>2H:</strong> Constructive raised H3 or 3433</li>
            <li><strong>2S:</strong> <10 S6</li>
            <li><strong>2NT:</strong> 10-12 H4+ with short</li>
            <li><strong>3C:</strong> 8-12 H4+ no short</li>
            <li><strong>3D:</strong> 0-5 H4 or GF H4 with void</li>
            <li><strong>3H:</strong> 4-7 H4 (4-5 HCP must have Ace)</li>
            <li><strong>3S / 3N / 4C:</strong> GF H4+ with singleton S / C / D</li>
            <li><strong>4H:</strong> <10 H5 or H4+ short</li>
        </ul>
    `,
    "response_1s": `
        <h4>Response 1S Rules:</h4>
        <ul>
            <li><strong>1NT:</strong> Force 1 round</li>
            <li><strong>2C:</strong> GF RELAY</li>
            <li><strong>2D:</strong> Transfer H</li>
            <li><strong>2H:</strong> GI S3 or GF S3 with short</li>
            <li><strong>2S:</strong> Constructive raised S3 or 4333</li>
            <li><strong>2NT+:</strong> คล้ายเปิด 1H</li>
        </ul>
    `,
    "response_1nt": `
        <h4>Response 1NT Rules:</h4>
        <ul>
            <li><strong>2C:</strong> Inverted Stayman (จะทยอยเพิ่มรายละเอียด)</li>
            <li><strong>2D:</strong> Transfer to H or m55</li>
            <li><strong>2H:</strong> Transfer to S</li>
            <li><strong>2S / 2NT:</strong> Transfer to C / D</li>
            <li><strong>3C:</strong> Ask M (ไม่มี M5, เล่นแค่เกมไม่สนสแลม)</li>
            <li><strong>3D:</strong> GF 9+ M55 (ถ้า GF 10+ M54 ใช้ 2C)</li>
            <li><strong>3H / 3S:</strong> GF 3154/3145 หรือ 1354/1345</li>
            <li><strong>3NT:</strong> To Play</li>
        </ul>
    `,
    "opener_rebid_1c": `
        <h4>Opener 1C Rebid Rules:</h4>
        <ul>
            <li><strong>After 1C - 1D or 1C - 1H:</strong>
                <ul>
                    <li><strong>Extra Hand (16+ HCP):</strong>
                        <ul>
                            <li><strong>2NT:</strong> 17-19 Balanced M4</li>
                            <li><strong>2D:</strong> Turbo Fit 16+ M3</li>
                            <li><strong>2oM:</strong> Power Fit 16+ M4</li>
                            <li><strong>1NT:</strong> 17-19 Bal no M4 or 16+ M<3</li>
                        </ul>
                    </li>
                    <li><strong>Medium Hand (14-15 HCP):</strong>
                        <ul>
                            <li><strong>2M:</strong> 14-15 M4</li>
                            <li><strong>3C:</strong> 14-15 good C6+</li>
                        </ul>
                    </li>
                    <li><strong>Minimum Hand (11-15 HCP):</strong>
                        <ul>
                            <li><strong>1M:</strong> Accept transfer (11-13 Bal or M4)</li>
                            <li><strong>1S:</strong> 11-15 S4 unbalanced</li>
                            <li><strong>2C:</strong> 11-15 C5+</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    `,
    "opener_rebid_1d": `
        <h4>Opener 1D Rebid Rules:</h4>
        <ul>
            <li><strong>After 1D - 1N (หรือ 1C - 1N):</strong>
                <ul>
                    <li><strong>2C:</strong> 4441 หรือ Balanced (กรณีเปิด 1C)</li>
                    <li><strong>2D / 2H / 2S:</strong> Transfer H / S / C (C6 เมื่อเปิด 1C)</li>
                    <li><strong>2NT:</strong> Transfer D6 have short (D4 with short S เมื่อเปิด 1C)</li>
                    <li><strong>3C:</strong> Transfer D6 no short (D4 with short H เมื่อเปิด 1C, หรือ D4 no short 2245 เมื่อเปิด 1C)</li>
                </ul>
            </li>
            <li><strong>After 1D - 2H (หรือ 1C - 2H):</strong>
                <ul>
                    <li><strong>2S:</strong> Forcing bid, 2NT (11-12 4441 หรือ 14+ any / 14+ หรือ 11-12 no m5)</li>
                    <li><strong>2NT:</strong> 11-13 C<4 (13 Balanced)</li>
                    <li><strong>3C:</strong> 11-12 C4+ (11-12 C5)</li>
                    <li><strong>3D:</strong> 11-13 D6 (11-12 D5)</li>
                </ul>
            </li>
        </ul>
    `,
    "default": `
        <h4>General Rules:</h4>
        <ul>
            <li>ยึดหลัก <strong>Shape Before Strength</strong></li>
            <li>ใช้ Transfer First เพื่อหา Fit และซ่อนมือ</li>
            <li>ตรวจสอบเงื่อนไขและแต้ม HCP ให้ละเอียดก่อนเลือกตอบ</li>
        </ul>
    `
};
