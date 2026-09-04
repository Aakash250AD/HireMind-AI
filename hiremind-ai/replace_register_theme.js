/* eslint-disable @typescript-eslint/no-require-imports */  
const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'register', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Backgrounds
content = content.replace(/bg-\[#0D0D0D\]/g, 'bg-[#F4F2EE]');
content = content.replace(/bg-\[#282828\]/g, 'bg-white');
content = content.replace(/bg-\[#1F1F1F\]/g, 'bg-[#F4F2EE]');

// Primary colors
content = content.replace(/bg-\[#722F37\]/g, 'bg-[#0A66C2]');
content = content.replace(/hover:bg-\[#8C3742\]/g, 'hover:bg-[#004182]');
content = content.replace(/border-\[#8C3742\]/g, 'border-[#004182]');
content = content.replace(/text-\[#B54956\]/g, 'text-[#0A66C2]');

// Borders
content = content.replace(/border-\[#383838\]/g, 'border-[#E0E0E0]');

// Text colors (General)
// Headings and labels
content = content.replace(/<h1 className="text-xl font-extrabold text-white mt-4">/g, '<h1 className="text-xl font-extrabold text-[#191919] mt-4">');
content = content.replace(/text-white placeholder-zinc-500/g, 'text-[#191919] placeholder-[#999999]');

// Hover text inside role toggle
content = content.replace(/hover:text-white/g, 'hover:text-[#191919]');

// Muted text
content = content.replace(/text-zinc-400/g, 'text-[#666666]');
content = content.replace(/text-zinc-300/g, 'text-[#666666]');

// Error state colors
content = content.replace(/bg-rose-950\/60/g, 'bg-red-50');
content = content.replace(/border-rose-800/g, 'border-red-200');
content = content.replace(/text-rose-300/g, 'text-red-600');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('register/page.tsx updated.');
