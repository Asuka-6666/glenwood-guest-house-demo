from __future__ import annotations

import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.anchors: list[str] = []
        self.images: list[dict[str, str | None]] = []
        self.external_links: list[dict[str, str | None]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if data.get("id"):
            self.ids.append(data["id"] or "")
        href = data.get("href") or ""
        if href.startswith("#") and len(href) > 1:
            self.anchors.append(href[1:])
        if tag == "img":
            self.images.append(data)
        if tag == "a" and data.get("target") == "_blank":
            self.external_links.append(data)


def main() -> int:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    parser = AuditParser()
    parser.feed(html)
    failures: list[str] = []

    duplicates = [name for name, count in Counter(parser.ids).items() if count > 1]
    missing_anchors = sorted(set(parser.anchors) - set(parser.ids))
    missing_alt = [image.get("src") or "<dynamic>" for image in parser.images if image.get("alt") is None]
    bad_external_rel = [link.get("href") or "" for link in parser.external_links if not {"noopener", "noreferrer"}.issubset(set((link.get("rel") or "").split()))]
    asset_refs = sorted(set(re.findall(
        r"image/(?:[A-Za-z0-9_.-]+/)*[A-Za-z0-9_.-]+\.(?:avif|gif|jpe?g|png|svg|webp)",
        html + css,
        flags=re.IGNORECASE,
    )))
    missing_assets = [asset for asset in asset_refs if not (ROOT / asset).is_file()]

    if duplicates:
        failures.append(f"Duplicate IDs: {duplicates}")
    if missing_anchors:
        failures.append(f"Missing anchor targets: {missing_anchors}")
    if missing_alt:
        failures.append(f"Images without alt: {missing_alt}")
    if bad_external_rel:
        failures.append(f"External links missing noopener/noreferrer: {bad_external_rel}")
    if missing_assets:
        failures.append(f"Missing image assets: {missing_assets}")
    if css.count("{") != css.count("}"):
        failures.append("CSS brace count does not match")

    print(f"IDs: {len(parser.ids)}")
    print(f"Anchor references: {len(parser.anchors)}")
    print(f"HTML images: {len(parser.images)}")
    print(f"Referenced local images: {len(asset_refs)}")
    if failures:
        print("AUDIT FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1
    print("AUDIT PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
