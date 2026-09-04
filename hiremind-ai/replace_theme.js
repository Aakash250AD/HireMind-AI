/* eslint-disable @typescript-eslint/no-require-imports */  
const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Backgrounds
content = content.replace(/bg-\[#0D0D0D\]/g, 'bg-[#F4F2EE]');
content = content.replace(/bg-\[#282828\]/g, 'bg-white');
content = content.replace(/bg-\[#1F1F1F\]/g, 'bg-white');

// Primary colors
content = content.replace(/bg-\[#722F37\]/g, 'bg-[#0A66C2]');
content = content.replace(/hover:bg-\[#8C3742\]/g, 'hover:bg-[#004182]');
content = content.replace(/border-\[#8C3742\]/g, 'border-[#004182]');
content = content.replace(/text-\[#B54956\]/g, 'text-[#0A66C2]');

// Borders
content = content.replace(/border-\[#282828\]/g, 'border-[#E0E0E0]');
content = content.replace(/border-\[#383838\]/g, 'border-[#E0E0E0]');
content = content.replace(/border-rose-900\/30/g, 'border-[#E0E0E0]');
content = content.replace(/border-emerald-900\/30/g, 'border-[#E0E0E0]');

// Text colors (General)
// Be careful with text-white, it's used on buttons and hero text
// Let's replace text-white with text-[#191919] globally EXCEPT inside buttons (which have bg-[#0A66C2])
content = content.replace(/text-white flex flex-col font-sans/g, 'text-[#191919] flex flex-col font-sans');
content = content.replace(/text-white max-w-4xl/g, 'text-[#191919] max-w-4xl');
content = content.replace(/text-white text-xs/g, 'text-[#191919] text-xs');
// Keep text-white on buttons by not changing all text-white globally.
content = content.replace(/<h2 className="text-3xl font-extrabold text-white">/g, '<h2 className="text-3xl font-extrabold text-[#191919]">');
content = content.replace(/<h4 className="text-base font-bold text-white">/g, '<h4 className="text-base font-bold text-[#191919]">');
content = content.replace(/<h2 className="text-2xl sm:text-3xl font-extrabold text-white">/g, '<h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919]">');

// Muted text
content = content.replace(/text-zinc-400/g, 'text-[#666666]');
content = content.replace(/text-zinc-300/g, 'text-[#666666]');
content = content.replace(/text-zinc-500/g, 'text-[#666666]');

// Hovers
content = content.replace(/hover:bg-zinc-800/g, 'hover:bg-[#F4F2EE]');
content = content.replace(/hover:text-white/g, 'hover:text-[#191919]');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('page.tsx updated.');
