// practice/cheatsheets.js - ไฟล์รวมกฎ Cheat Sheet สำหรับแต่ละหมวดการฝึก
const CHEATSHEETS = {
  opening: `
    <h4>Opening Rules:</h4>
    <ul>
      <li><strong>Pass:</strong> 0-10 HCP</li>
      <li><strong>1♣:</strong> 11-20 HCP, ♣ 2+ (ถ้า Balanced ไม่จำกัดว่าชุดต้องยาวกว่า เช่น 5332, 4432)</li>
      <li><strong>1♦:</strong> 11-20 HCP, Unbalanced, ♦ 4+</li>
      <li><strong>1♥:</strong> 11-20 HCP, M5 (ไม่มี 5332 ยกเว้นมี 17+ HCP)</li>
      <li><strong>1♠:</strong> 11-20 HCP, M5 (ไม่มี 5332 ยกเว้นมี 17+ HCP)</li>
      <li><strong>1NT:</strong> 14-16 (Balanced)</li>
      <li><strong>2♣:</strong> 21+ or 8.5 PT</li>
      <li><strong>2♦:</strong> weak 1M or 17-20 M55</li>
      <li><strong>2M:</strong> 11-13 M6 no second suit &gt; 4</li>
    </ul>
  `,
  response_1c: `
    <h4>Response 1C Rules:</h4>
    <ul>
      <li><strong>1♦:</strong> Transfer H (4+)</li>
      <li><strong>1♥:</strong> Transfer S (4+)</li>
      <li><strong>1♠:</strong> 0-10, No M4, No Void</li>
      <li><strong>1NT:</strong> GF, No M5</li>
      <li><strong>2♣:</strong> Transfer D</li>
      <li><strong>2♦:</strong> GI (C 5+)</li>
      <li><strong>2♥:</strong> GI Balanced (M&lt;4 m&lt;5)</li>
      <li><strong>3♣:</strong> NF (C 6)</li>
    </ul>
  `,
  default: `
    <h4>General Rules:</h4>
    <ul>
      <li>ปฏิบัติตามหลักการ Shape Before Strength และ Transfer First เสมอ</li>
      <li>คำนวณ HCP และรูปทรงไพ่ให้รอบคอบก่อนตัดสินใจ</li>
    </ul>
  `
};
