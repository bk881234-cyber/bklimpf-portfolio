from playwright.sync_api import sync_playwright
import time
import json
import os

def scrape():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://www.bklimportfolio.com/", wait_until="networkidle")
        
        # Scroll to bottom slowly to load all dynamic images
        for i in range(10):
            page.mouse.wheel(0, 500)
            time.sleep(0.5)
            
        time.sleep(2) # Final wait
        
        # Extract all image sources
        images = page.eval_on_selector_all("img", "elements => elements.map(e => e.src || e.getAttribute('data-src'))")
        images = [img for img in images if img and ("wixstatic.com" in img or "bklimportfolio" in img)]
        
        # Remove duplicates
        images = list(set(images))
        
        with open("scraped_images.json", "w", encoding="utf-8") as f:
            json.dump(images, f, indent=2)
            
        print(f"Scraped {len(images)} images.")
        browser.close()

if __name__ == "__main__":
    scrape()
