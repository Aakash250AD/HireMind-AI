/* eslint-disable @typescript-eslint/no-require-imports */  
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Backgrounds
  content = content.replace(/bg-\[#0D0D0D\]/g, 'bg-[#F4F2EE]');
  content = content.replace(/bg-\[#282828\]/g, 'bg-white');
  content = content.replace(/bg-\[#1F1F1F\]/g, 'bg-[#F4F2EE]');

  // Primary colors
  content = content.replace(/bg-\[#722F37\]/g, 'bg-[#0A66C2]');
  content = content.replace(/hover:bg-\[#8C3742\]/g, 'hover:bg-[#004182]');
  content = content.replace(/border-\[#8C3742\]/g, 'border-[#004182]');
  content = content.replace(/text-\[#B54956\]/g, 'text-[#0A66C2]');
  content = content.replace(/text-\[#722F37\]/g, 'text-[#0A66C2]');

  // Borders
  content = content.replace(/border-\[#282828\]/g, 'border-[#E0E0E0]');
  content = content.replace(/border-\[#383838\]/g, 'border-[#E0E0E0]');
  content = content.replace(/border-rose-900\/30/g, 'border-[#E0E0E0]');
  content = content.replace(/border-emerald-900\/30/g, 'border-[#E0E0E0]');
  content = content.replace(/border-\[#1F1F1F\]/g, 'border-[#E0E0E0]');

  // Muted text
  content = content.replace(/text-zinc-400/g, 'text-[#666666]');
  content = content.replace(/text-zinc-300/g, 'text-[#666666]');
  content = content.replace(/text-zinc-500/g, 'text-[#999999]');
  
  // Specific error classes
  content = content.replace(/bg-rose-950\/60/g, 'bg-red-50');
  content = content.replace(/border-rose-800/g, 'border-red-200');
  content = content.replace(/text-rose-300/g, 'text-red-600');
  content = content.replace(/bg-rose-900\/20/g, 'bg-red-50');
  content = content.replace(/text-rose-400/g, 'text-[#0A66C2]');
  
  // Hovers
  content = content.replace(/hover:bg-zinc-800/g, 'hover:bg-[#F4F2EE]');
  content = content.replace(/hover:text-white/g, 'hover:text-[#191919]');

  // Text colors (Tricky part: text-white to text-[#191919] except inside buttons/badges)
  // We'll replace it in common text elements safely
  content = content.replace(/<h([1-6])(.*?)text-white(.*?)>/g, '<h$1$2text-[#191919]$3>');
  content = content.replace(/<p(.*?)text-white(.*?)>/g, '<p$1text-[#191919]$2>');
  content = content.replace(/<span(.*?)text-white(.*?)>/g, '<span$1text-[#191919]$2>');
  content = content.replace(/<div(.*?)text-white(.*?)>/g, '<div$1text-[#191919]$2>');
  
  // Also global class text-white on main containers (like min-h-screen)
  content = content.replace(/text-white flex flex-col font-sans/g, 'text-[#191919] flex flex-col font-sans');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const srcDir = path.join(__dirname, 'src');
walkDir(srcDir, processFile);
console.log('Done replacing theme across all files in src/');
