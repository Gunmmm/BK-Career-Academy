@echo off
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting Scraper...
python paper_downloader.py --url "https://example.com" --dir "./downloads"
pause
