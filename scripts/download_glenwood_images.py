from __future__ import annotations

import csv
import hashlib
import re
import ssl
import time
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urljoin, urlparse
from urllib.request import Request, urlopen


START_URL = "https://www.snowdonia-bedbreakfast.co.uk/"
PROPERTY_PAGES = [
    START_URL,
    urljoin(START_URL, "/item/glenwood_guest_house.html"),
    urljoin(START_URL, "/item/bedrooms.html"),
    urljoin(START_URL, "/item/twin_and_family_bedrooms.html"),
    urljoin(START_URL, "/item/glenwood_cottage.html"),
    urljoin(START_URL, "/publicgallery"),
]
HOST = "www.snowdonia-bedbreakfast.co.uk"
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "image" / "official-website"
MANIFEST = ROOT / "image" / "sources.csv"
CTX = ssl._create_unverified_context()
UA = "Mozilla/5.0 (compatible; GlenwoodDemoAssetCollector/1.0)"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
        self.images: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if tag == "a" and data.get("href"):
            self.links.append(data["href"] or "")
        if tag == "img":
            src = data.get("data-src") or data.get("data-lazy-src") or data.get("src")
            if src:
                self.images.append((src, data.get("alt") or ""))
            srcset = data.get("srcset") or data.get("data-srcset")
            if srcset:
                for item in srcset.split(","):
                    candidate = item.strip().split(" ")[0]
                    if candidate:
                        self.images.append((candidate, data.get("alt") or ""))


def fetch(url: str) -> tuple[bytes, str]:
    req = Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urlopen(req, timeout=35, context=CTX) as response:
        return response.read(), response.headers.get_content_type()


def clean_page_url(base: str, href: str) -> str | None:
    url = urldefrag(urljoin(base, href))[0]
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or parsed.netloc.lower() != HOST:
        return None
    if re.search(r"\.(?:jpg|jpeg|png|gif|webp|svg|pdf|zip)(?:$|\?)", parsed.path, re.I):
        return None
    return url


def image_filename(url: str, content_type: str, digest: str) -> str:
    name = Path(urlparse(url).path).name
    stem = re.sub(r"[^a-zA-Z0-9_-]+", "-", Path(name).stem).strip("-") or "image"
    suffix = Path(name).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}:
        suffix = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/gif": ".gif",
            "image/webp": ".webp",
            "image/svg+xml": ".svg",
        }.get(content_type, ".bin")
    return f"{stem[:80]}-{digest[:10]}{suffix}"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    queue = deque(PROPERTY_PAGES)
    visited: set[str] = set()
    seen_images: set[str] = set()
    seen_hashes: dict[str, str] = {}
    rows: list[dict[str, str | int]] = []

    while queue and len(visited) < 350:
        page = queue.popleft()
        if page in visited:
            continue
        visited.add(page)
        try:
            body, content_type = fetch(page)
        except Exception as exc:
            rows.append({"platform": "official-website", "page_url": page, "image_url": "", "file": "", "alt": "", "bytes": 0, "status": f"page-error: {exc}"})
            continue
        if content_type not in {"text/html", "application/xhtml+xml"}:
            continue
        parser = PageParser()
        parser.feed(body.decode("utf-8", errors="replace"))
        # The domain also hosts a large regional tourism database. Deliberately
        # do not follow it: only the property-owned pages above are in scope.
        for src, alt in parser.images:
            image_url = urljoin(page, src)
            if image_url in seen_images:
                continue
            seen_images.add(image_url)
            try:
                data, image_type = fetch(image_url)
                digest = hashlib.sha256(data).hexdigest()
                if digest in seen_hashes:
                    filename = seen_hashes[digest]
                    status = "duplicate"
                else:
                    filename = image_filename(image_url, image_type, digest)
                    (OUT / filename).write_bytes(data)
                    seen_hashes[digest] = filename
                    status = "downloaded"
                rows.append({"platform": "official-website", "page_url": page, "image_url": image_url, "file": f"official-website/{filename}", "alt": alt, "bytes": len(data), "status": status})
            except Exception as exc:
                rows.append({"platform": "official-website", "page_url": page, "image_url": image_url, "file": "", "alt": alt, "bytes": 0, "status": f"image-error: {exc}"})
            time.sleep(0.08)

    with MANIFEST.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=["platform", "page_url", "image_url", "file", "alt", "bytes", "status"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"pages={len(visited)} image_urls={len(seen_images)} unique_files={len(seen_hashes)} manifest={MANIFEST}")


if __name__ == "__main__":
    main()
