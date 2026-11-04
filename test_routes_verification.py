import sys
import time
import subprocess
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

PORT = 3000

def run_tests():
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(PORT), "--directory", "out"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(1.5)

    routes = [
        ("/", "Recupera tu cabello"),
        ("/catalogo/", "Catálogo Oficial"),
        ("/diagnostico/", "Diagnóstico Capilar"),
        ("/tutoriales/", "Aprende a Usarlos"),
        ("/testimonios/", "Antes y Después"),
        ("/faq/", "Preguntas Frecuentes")
    ]

    try:
        with sync_playwright() as p:
            print("\n--- TESTING MULTI-PAGE ROUTING IN MICROSOFT EDGE ---")
            browser = p.chromium.launch(channel="msedge", headless=True)
            page = browser.new_page()

            for path, expected_text in routes:
                url = f"http://127.0.0.1:{PORT}{path}"
                resp = page.goto(url, wait_until="load")
                print(f"Testing {url} -> Status: {resp.status}")
                assert resp.status == 200, f"Route {path} returned status {resp.status}"
                body_text = page.locator("body").inner_text()
                assert expected_text.lower() in body_text.lower(), f"Expected '{expected_text}' in {path}"
                print(f"  ✓ Route {path} OK (verified: '{expected_text}')")

            # Test Navigation Click from Navbar
            page.goto(f"http://127.0.0.1:{PORT}/", wait_until="load")
            page.locator("a:has-text('Catálogo')").first.click()
            page.wait_for_url(f"**/catalogo/**")
            print("  ✓ Navigation link click to /catalogo/ OK")

            browser.close()
            print("\nALL MULTI-PAGE ROUTES VERIFIED IN MICROSOFT EDGE!")
    finally:
        server.terminate()
        server.kill()

if __name__ == "__main__":
    run_tests()
