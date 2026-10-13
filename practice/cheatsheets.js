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
    "default": `
        <h4>General Rules:</h4>
        <ul>
            <li>ยึดหลัก <strong>Shape Before Strength</strong></li>
            <li>ใช้ Transfer First เพื่อหา Fit และซ่อนมือ</li>
            <li>ตรวจสอบเงื่อนไขและแต้ม HCP ให้ละเอียดก่อนเลือกตอบ</li>
        </ul>
    `
};
