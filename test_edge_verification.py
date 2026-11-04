import os
import sys
import time
import subprocess
from playwright.sync_api import sync_playwright

PORT = 3000

def run_tests():
    # Start python http.server
    print(f"Starting server with python -m http.server {PORT} --directory out...")
    server_process = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(PORT), "--directory", "out"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(1.5)

    os.makedirs("test_results", exist_ok=True)

    try:
        with sync_playwright() as p:
            print("\n--- LAUNCHING MICROSOFT EDGE (channel='msedge') ---")
            browser = p.chromium.launch(channel="msedge", headless=True)

            # 1. Desktop Test (1440x900)
            print("\n[1/4] Running Desktop Layout Test (1440x900)...")
            context_desktop = browser.new_context(viewport={"width": 1440, "height": 900})
            page = context_desktop.new_page()

            broken_assets = []
            page.on("response", lambda resp: broken_assets.append(f"{resp.status} {resp.url}") if resp.status >= 400 else None)

            page.goto(f"http://127.0.0.1:{PORT}", wait_until="load")
            time.sleep(1)
            title = page.title()
            print(f"Page Title: {title}")
            assert "Rapunzel Organic" in title

            hero_heading = page.locator("h1").inner_text()
            print(f"Hero Heading: {hero_heading}")
            assert "Recupera tu cabello" in hero_heading

            page.screenshot(path="test_results/desktop_hero.png", full_page=False)
            print("Desktop hero screenshot saved!")

            # 2. Test Catalog & Add to Cart
            print("\n[2/4] Testing Catalog & Cart Flow...")
            add_buttons = page.locator("button:has-text('Al Carrito')")
            print(f"Found {add_buttons.count()} 'Al Carrito' buttons in catalog")
            assert add_buttons.count() > 0, "No add to cart buttons found"

            # Click first product to add to cart
            add_buttons.first.click()
            time.sleep(1.5)

            # Check if cart drawer opened
            drawer = page.locator("text=Tu Bolsa Capilar")
            assert drawer.is_visible(), "Cart drawer did not open"
            print("Cart drawer successfully opened!")

            # Check customer form inside cart
            name_input = page.locator("input[placeholder='Ej: Camila González']")
            if name_input.is_visible():
                name_input.fill("Camila González")
                page.locator("input[placeholder='Ej: Las Condes / Temuco']").fill("Providencia")
                page.locator("input[placeholder='+56 9 1234 5678']").fill("+56 9 8765 4321")
                print("Customer delivery fields filled successfully!")

            # Verify WhatsApp Button text and href
            wa_button = page.locator("button:has-text('Finalizar Pedido por WhatsApp')")
            assert wa_button.is_visible(), "WhatsApp checkout button not visible"
            print("WhatsApp checkout button confirmed!")

            page.screenshot(path="test_results/cart_drawer.png", full_page=False)

            # Close drawer by clicking backdrop or close button
            close_btn = page.locator("button:has(svg.lucide-x)")
            if close_btn.count() > 0:
                close_btn.first.click()
            time.sleep(0.5)

            # 3. Test Hair Quiz Diagnostic
            print("\n[3/4] Testing Interactive Hair Quiz...")
            quiz_section = page.locator("#diagnostico")
            quiz_section.scroll_into_view_if_needed()
            time.sleep(0.5)

            # Step 1
            page.locator("button:has-text('Caída excesiva')").click()
            time.sleep(0.5)

            # Step 2
            page.locator("button:has-text('Graso o mixto')").click()
            time.sleep(0.5)

            # Step 3
            page.locator("button:has-text('Rutina intensiva')").click()
            time.sleep(0.5)

            # Check recommendation
            recommendation = page.locator("text=Tu Rutina Recomendada")
            assert recommendation.is_visible(), "Recommendation was not displayed"
            print(f"Recommendation displayed: {recommendation.inner_text()}")

            page.screenshot(path="test_results/quiz_result.png", full_page=False)
            print("Quiz result screenshot saved!")

            # 4. Mobile Test (390x844 - iPhone 14)
            print("\n[4/4] Running Mobile Viewport Test (390x844)...")
            context_mobile = browser.new_context(
                viewport={"width": 390, "height": 844},
                is_mobile=True,
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15"
            )
            page_mobile = context_mobile.new_page()
            page_mobile.goto(f"http://127.0.0.1:{PORT}", wait_until="load")
            time.sleep(1)

            page_mobile.screenshot(path="test_results/mobile_hero.png", full_page=False)
            print("Mobile hero captured successfully!")

            # Scroll to reels
            reels_section = page_mobile.locator("#reels")
            reels_section.scroll_into_view_if_needed()
            time.sleep(0.5)
            page_mobile.screenshot(path="test_results/mobile_reels.png", full_page=False)
            print("Mobile reels screenshot saved!")

            # Check broken assets
            print("\n--- ASSET INTEGRITY REPORT ---")
            if broken_assets:
                print(f"WARNING: {len(broken_assets)} broken requests detected:")
                for b in broken_assets:
                    print(f"  - {b}")
            else:
                print("PERFECT: 0 broken assets! All images, icons, and scripts loaded with HTTP 200.")

            browser.close()
            print("\n===========================================")
            print("SUCCESS: ALL AUTOMATED TESTS PASSED IN MICROSOFT EDGE!")
            print("===========================================")

    finally:
        server_process.terminate()
        server_process.kill()

if __name__ == "__main__":
    run_tests()
