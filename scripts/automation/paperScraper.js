const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

/**
 * BK CAREER ACADEMY - QUESTION PAPER AUTOMATION TOOL
 * 
 * This script is designed to download publicly accessible question papers 
 * and organize them by City and Bench.
 * 
 * TO CONFIGURE:
 * 1. Update CONFIG.BASE_URL with the target website.
 * 2. Update the selectors in the startScraper function to match the target site's HTML.
 */

const CONFIG = {
    // ⚠️ UPDATE THIS TO YOUR TARGET WEBSITE
    BASE_URL: 'https://example-legal-site.com', 
    
    // Directory where papers will be saved
    OUTPUT_ROOT: path.join(__dirname, '../../downloads/question_papers'),
    
    // Request settings
    DELAY_MS: 1500, // Stay ethical: delay between requests
    HEADERS: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BK-Career-Academy-Bot/1.0',
        'Accept': 'application/pdf,text/html,application/xhtml+xml'
    }
};

/**
 * Downloads a single file with deduplication and error handling
 */
async function downloadPaper(url, targetFolder, fileName) {
    const filePath = path.join(targetFolder, fileName);

    // Skip if already exists
    if (await fs.pathExists(filePath)) {
        console.log(`[EXISTING] Skipping: ${fileName}`);
        return;
    }

    try {
        await fs.ensureDir(targetFolder);
        
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            headers: CONFIG.HEADERS,
            timeout: 30000 // 30s timeout
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`[SUCCESS] Saved: ${fileName}`);
                resolve();
            });
            writer.on('error', (err) => {
                console.error(`[WRITE ERROR] ${fileName}:`, err.message);
                reject(err);
            });
        });
    } catch (error) {
        console.error(`[DOWNLOAD FAILED] ${url}:`, error.message);
    }
}

/**
 * Main scraper function
 * @param {string} city - The city name (used for folder structure)
 * @param {string} bench - The bench name (used for folder structure and URL params)
 */
async function runAutomation(city, bench) {
    console.log(`\n🚀 Starting Automation for ${city} [${bench}]`);
    
    try {
        // Construct the target URL based on the site's pattern
        // Example: https://site.com/papers?location=Mumbai&bench=HighCourt
        const searchUrl = `${CONFIG.BASE_URL}/papers?city=${encodeURIComponent(city)}&bench=${encodeURIComponent(bench)}`;
        
        console.log(`🔍 Searching: ${searchUrl}`);
        
        const { data } = await axios.get(searchUrl, { headers: CONFIG.HEADERS });
        const $ = cheerio.load(data);
        
        const papersFound = [];

        // ⚠️ SELECTOR CUSTOMIZATION
        // This looks for all PDF links. Adjust the selector to target specific paper lists.
        $('a[href*=".pdf"]').each((i, el) => {
            const href = $(el).attr('href');
            const rawTitle = $(el).text().trim() || `Paper_${i + 1}`;
            
            // Sanitize filename for Windows/Linux
            const safeTitle = rawTitle.replace(/[/\\?%*:|"<>]/g, '-').substring(0, 100);
            
            papersFound.push({
                url: href.startsWith('http') ? href : new URL(href, CONFIG.BASE_URL).href,
                name: `${safeTitle}.pdf`
            });
        });

        console.log(`📊 Found ${papersFound.length} papers for ${city}.`);

        // Process downloads sequentially to respect the server
        const downloadDir = path.join(CONFIG.OUTPUT_ROOT, city, bench);
        
        for (let i = 0; i < papersFound.length; i++) {
            const paper = papersFound[i];
            console.log(`[${i + 1}/${papersFound.length}] Processing...`);
            
            await downloadPaper(paper.url, downloadDir, paper.name);
            
            // Delay to avoid being flagged as a bot
            if (i < papersFound.length - 1) {
                await new Promise(r => setTimeout(r, CONFIG.DELAY_MS));
            }
        }

        console.log(`\n✅ Finished automation for ${city} - ${bench}`);

    } catch (error) {
        console.error(`\n❌ Automation Error:`, error.message);
        console.log('Check if CONFIG.BASE_URL is reachable and selectors are correct.');
    }
}

// --- EXECUTION ---
// Example usage: node paperScraper.js "Mumbai" "High-Court"
const args = process.argv.slice(2);
const targetCity = args[0] || 'DefaultCity';
const targetBench = args[1] || 'DefaultBench';

runAutomation(targetCity, targetBench);
