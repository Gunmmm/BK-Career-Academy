import os
import time
import csv
import logging
import argparse
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# --- CONFIGURATION & LOGGING ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

class PaperScraper:
    def __init__(self, base_url, download_dir='downloads', delay=1.0):
        self.base_url = base_url
        self.download_dir = download_dir
        self.delay = delay
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BK-Academy-Bot/1.0'
        })
        self.metadata_file = os.path.join(download_dir, 'download_report.csv')
        
        if not os.path.exists(self.download_dir):
            os.makedirs(self.download_dir)

    def login(self, login_url, username, password, user_field='username', pass_field='password'):
        """
        Handles authentication with specific field names.
        """
        logger.info(f"🔑 Attempting login at {login_url}...")
        payload = {
            user_field: username,
            pass_field: password
        }
        try:
            # 1. Get login page first to capture any CSRF tokens if they exist
            initial_resp = self.session.get(login_url)
            soup = BeautifulSoup(initial_resp.text, 'html.parser')
            
            # Find CSRF token (common in modern sites)
            csrf_token = soup.find('input', {'name': 'csrf_token'})
            if csrf_token:
                payload['csrf_token'] = csrf_token['value']

            # 2. Post credentials
            response = self.session.post(login_url, data=payload)
            response.raise_for_status()
            
            if response.status_code == 200:
                logger.info("✅ Login successful.")
            else:
                logger.warning(f"⚠️ Login returned status {response.status_code}. Check your credentials.")
        except Exception as e:
            logger.error(f"❌ Login failed: {e}")

    def scrape(self, menu_selector='.sidebar a', paper_selector='a[href$=".pdf"]'):
        """
        Sequentially navigates the site structure.
        """
        logger.info(f"🌐 Starting scrape at {self.base_url}...")
        try:
            response = self.session.get(self.base_url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find the navigation menu
            menu_links = soup.select(menu_selector)
            if not menu_links:
                logger.warning(f"No menu links found with selector '{menu_selector}'. Checking for generic links...")
                menu_links = soup.find_all('a', href=True)[:10] # Fallback to first 10 links
            
            logger.info(f"📂 Found {len(menu_links)} potential sections.")

            for link in menu_links:
                name = link.text.strip() or "Unnamed_Section"
                category_name = "".join([c if c.isalnum() else "_" for c in name])
                
                href = link.get('href')
                if not href or href.startswith('#'): continue
                
                category_url = urljoin(self.base_url, href)
                logger.info(f"--- Exploring: {name} ---")
                
                try:
                    cat_resp = self.session.get(category_url, timeout=15)
                    cat_resp.raise_for_status()
                    cat_soup = BeautifulSoup(cat_resp.text, 'html.parser')
                    
                    papers = cat_soup.select(paper_selector)
                    if not papers:
                        logger.info(f"   No papers found in this section.")
                        continue

                    for i, p in enumerate(papers):
                        p_href = p.get('href')
                        if not p_href: continue
                        
                        p_url = urljoin(category_url, p_href)
                        p_title = p.text.strip() or f"Paper_{i+1}"
                        safe_title = "".join([c if c.isalnum() else "_" for c in p_title])[:50]
                        
                        filename = f"{safe_title}.pdf"
                        status, final_url = self.download_file(p_url, category_name, filename)
                        self.log_metadata(filename, final_url, status)
                        
                        logger.info(f"   [{i+1}/{len(papers)}] {status}: {filename}")

                except Exception as e:
                    logger.error(f"   Error in category {name}: {e}")

        except Exception as e:
            logger.error(f"❌ Critical Scraper Error: {e}")

        except Exception as e:
            logger.error(f"Scraping error: {e}")

# --- CLI INTERFACE ---
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="BK Academy - Question Paper Downloader")
    parser.add_argument("--url", required=True, help="Target website URL")
    parser.add_argument("--dir", default="paper_downloads", help="Local directory to save files")
    parser.add_argument("--delay", type=float, default=1.5, help="Seconds between requests")
    
    args = parser.parse_args()

    # INITIALIZE SCRAPER
    scraper = PaperScraper(base_url=args.url, download_dir=args.dir, delay=args.delay)
    
    # EXAMPLE LOGIN (Uncomment and customize if needed)
    # scraper.login("https://example.com/login", {"user": "admin", "pass": "123"})
    
    # START SCRAPING
    # Note: Customize selectors based on the target website's HTML structure
    scraper.scrape(
        menu_selector=".sidebar a",      # Example selector for left menu
        paper_selector="a[href*='.pdf']" # Example selector for PDF links
    )
