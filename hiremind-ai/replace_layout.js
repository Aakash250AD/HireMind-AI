const fs = require('fs');
const path = require('path');

const files = [
    'src/app/analytics/page.tsx',
    'src/app/shortlist/page.tsx',
    'src/app/settings/page.tsx',
    'src/app/interviews/page.tsx',
    'src/app/notifications/page.tsx',
    'src/app/copilot/page.tsx',
    'src/app/candidates/page.tsx',
    'src/app/automations/page.tsx'
];

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
        console.log(`Missing ${file}`);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace import
    content = content.replace(/import \{ TopNavbar \} from ['"]@\/components\/TopNavbar['"];/g, 
        "import { DashboardLayout } from '@/components/DashboardLayout';");
        
    // Replace the opening tags
    content = content.replace(/<div className="min-h-screen[^>]+>\s*<TopNavbar role="hr" \/>\s*<main[^>]+>/g, 
        "<DashboardLayout role=\"hr\">\n      <div className=\"space-y-6 w-full max-w-7xl mx-auto\">");
        
    // Replace the closing tags
    content = content.replace(/<\/main>\s*<\/div>/g, 
        "</div>\n    </DashboardLayout>");
        
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
});
