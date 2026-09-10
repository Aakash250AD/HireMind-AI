/* eslint-disable @typescript-eslint/no-require-imports */  
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Background replacements
  content = content.replace(/bg-\[#0D0D0D\]/g, 'bg-page-bg');
  content = content.replace(/bg-\[#F4F2EE\]/g, 'bg-page-bg'); // From previous iteration
  content = content.replace(/bg-\[#282828\]/g, 'bg-white');
  content = content.replace(/bg-\[#1F1F1F\]/g, 'bg-white');
  content = content.replace(/bg-\[#0A66C2\]/g, 'bg-primary');
  content = content.replace(/bg-\[#722F37\]/g, 'bg-primary');

  // Text replacements
  content = content.replace(/text-\[#666666\]/g, 'text-text-secondary');
  content = content.replace(/text-\[#999999\]/g, 'text-text-muted');
  content = content.replace(/text-\[#191919\]/g, 'text-text-primary');
  content = content.replace(/text-white/g, 'text-white'); // keep text white for buttons
  content = content.replace(/text-zinc-400/g, 'text-text-secondary');
  content = content.replace(/text-zinc-300/g, 'text-text-secondary');
  content = content.replace(/text-zinc-500/g, 'text-text-muted');
  
  // Primary brand interactions
  content = content.replace(/text-\[#0A66C2\]/g, 'text-primary');
  content = content.replace(/text-\[#B54956\]/g, 'text-primary');
  content = content.replace(/text-\[#722F37\]/g, 'text-primary');
  content = content.replace(/hover:text-white/g, 'hover:text-primary');

  // Hover states
  content = content.replace(/hover:bg-\[#004182\]/g, 'hover:bg-dark-blue');
  content = content.replace(/hover:bg-\[#8C3742\]/g, 'hover:bg-dark-blue');
  content = content.replace(/hover:bg-\[#F4F2EE\]/g, 'hover:bg-very-light-blue');

  // Borders
  content = content.replace(/border-\[#E0E0E0\]/g, 'border-border-color');
  content = content.replace(/border-\[#383838\]/g, 'border-border-color');
  content = content.replace(/border-\[#282828\]/g, 'border-border-color');
  content = content.replace(/border-\[#1F1F1F\]/g, 'border-border-color');
  content = content.replace(/border-\[#004182\]/g, 'border-dark-blue');
  content = content.replace(/border-\[#8C3742\]/g, 'border-dark-blue');

  // Status/AI replacements
  content = content.replace(/bg-red-50/g, 'bg-error-bg');
  content = content.replace(/border-red-200/g, 'border-error');
  content = content.replace(/text-red-600/g, 'text-error');
  content = content.replace(/bg-emerald-500\/10/g, 'bg-success-bg');
  content = content.replace(/text-emerald-500/g, 'text-success');

  // Enforce new standard border radii globally
  content = content.replace(/rounded-2xl/g, 'rounded-[var(--radius-lg)]');
  content = content.replace(/rounded-xl/g, 'rounded-[var(--radius-md)]');
  content = content.replace(/rounded-lg/g, 'rounded-[var(--radius-sm)]');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const srcDir = path.join(__dirname, 'src');
walkDir(srcDir, processFile);
console.log('Global redesign script complete.');
