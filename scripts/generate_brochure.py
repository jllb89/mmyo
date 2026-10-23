#!/usr/bin/env python3
"""Generate MMYO's bilingual full-services brochure and its QR assets."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "MMYO-Brochure-Servicios-2026.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "brochures" / OUTPUT.name
QR_DIR = ROOT / "tmp" / "pdfs"

BLUE = HexColor("#272E37")
GOLD = HexColor("#CBBAA1")
PAGE_W, PAGE_H = A4
MARGIN = 48

WEBSITE_URL = "https://mmyo.com.mx"
BROCHURE_URL = f"https://mmyo.vercel.app/brochures/{OUTPUT.name}"

IMAGES = {
    "cover": ROOT / "public" / "images" / "hero-architecture-v2.png",
    "overview": ROOT / "public" / "images" / "team.webp",
    "fiscal": ROOT / "public" / "images" / "f4.png",
    "legal": ROOT / "public" / "images" / "f2.png",
    "patrimonial": ROOT / "public" / "images" / "f3.png",
    "venture-capital": ROOT / "public" / "images" / "f5.png",
    "alianzas-estrategicas": ROOT / "public" / "images" / "mailing.png",
}


CATEGORIES = [
    {
        "key": "fiscal",
        "index": "01",
        "namespace": "servicios-fiscales",
        "services": [
            ("consultoria-fiscal-local-e-internacional", "consultoria"),
            ("especialización-en-transacciones-del-sector-financiero", "especializacion"),
            ("emisiones-a-traves-de-bolsas-de-valores", "emisiones-bolsas"),
            ("fondos-de-inversion-vc-y-pc", "fondos-vcpc"),
            ("proyectos-de-inversion", "proyectos-inversion"),
            ("proyectos-de-infraestructura-generacion-de-energia-e-inmobiliarios", "proyectos-infraestructura"),
            ("reestructuraciones-corporativas", "reestructuraciones-corporativas"),
            ("asesoria-en-alianzas-estrategicas", "asesoria-alianzas"),
            ("promociones-ante-las-autoridades-fiscales", "promociones-autoridades"),
            ("due-diligence-fiscal", "due-dilligence"),
            ("revision-fiscal-de-documentos-relevantes", "revision-fiscal"),
            ("proyectos-de-energia", "proyectos-energia"),
            ("dictamenes-y-certificaciones-fiscales", "dictamenes-certificaciones"),
        ],
    },
    {
        "key": "legal",
        "index": "02",
        "namespace": "servicios-legales",
        "services": [
            ("análisis-preventivo-de-operaciones", "analisis-preventivo"),
            ("litigio-contencioso-en-materias-fiscales-y-administrativas", "litigio-fiscal"),
            ("litigio-constitucional-fiscal-y-administrativo", "litigio-constitucional"),
            ("solución-anticipada-de-controversias", "solucion-controversias"),
        ],
    },
    {
        "key": "patrimonial",
        "index": "03",
        "namespace": "servicios-patrimoniales",
        "services": [
            ("acompañamiento-en-la-evolucion-familiar", "evolucion-familiar"),
            ("trust-book", "trust-book"),
            ("family-governance-y-planeacion-sucesoria-en-los-negocios", "family-governance"),
            ("planeacion-y-regularizacion-de-estructuras-e-inversiones", "planeacion-estructuras"),
            ("cumplimientos-de-obligaciones-fiscales-patrimoniales", "cumplimiento-fiscal"),
            ("planeacion-y-acompañamiento-en-procesos-sucesorios-en-mexico-y-el-extranjero", "procesos-sucesorios"),
            ("eventos-de-liquidez-familiar", "liquidez-familiar"),
            ("estructuración-de-nuevas-inversiones-en-mexico-y-el-extranjero", "nuevas-inversiones"),
            ("corporate-transparency-act", "transparency-act"),
        ],
    },
    {
        "key": "venture-capital",
        "index": "04",
        "namespace": "venture-capital",
        "services": [
            ("estructuración-de-las-inversiones-con-enfoque-multi-pais", "estructuracion-inv"),
            ("diagnostico-inicial", "diagnostico-inicial"),
        ],
    },
    {
        "key": "alianzas-estrategicas",
        "index": "05",
        "namespace": "alianzas-estratégicas",
        "services": [("asesoría-fiscal-en-estados-unidos-de-america", "asesoria-usa")],
    },
]


INTROS = {
    "es": {
        "fiscal": "Alta calidad y valor agregado distinguen una práctica que integra estrategia, cumplimiento y certeza jurídica.",
        "legal": "Conocimiento, experiencia y seguimiento puntual para anticipar contingencias y defender decisiones.",
        "patrimonial": "Trato personalizado, alta especialización y confidencialidad total para proteger y proyectar el patrimonio.",
        "venture-capital": "Un enfoque especializado, oportuno y accesible para estructurar inversiones y planear salidas.",
        "alianzas-estrategicas": "Alianzas cuidadosamente seleccionadas amplían nuestra capacidad para resolver necesidades especializadas.",
    },
    "en": {
        "fiscal": "High quality and added value distinguish a practice that integrates strategy, compliance, and legal certainty.",
        "legal": "Knowledge, experience, and close follow-up help anticipate exposure and defend important decisions.",
        "patrimonial": "Personal attention, deep specialization, and complete confidentiality help protect and project family wealth.",
        "venture-capital": "A specialized, timely, and accessible approach to structuring investments and planning exits.",
        "alianzas-estrategicas": "Carefully selected alliances expand our capacity to solve specialized needs.",
    },
}


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize(text: str) -> str:
    return (
        text.replace("\u2011", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2212", "-")
    )


def brochure_data(lang: str) -> list[dict]:
    base = ROOT / "src" / "locales" / lang
    nav = read_json(base / "navbar.json")
    result = []
    for category in CATEGORIES:
        category_copy = {
            "key": category["key"],
            "index": category["index"],
            "title": normalize(read_json(base / f"{category['namespace']}.json")["header"].strip()),
            "intro": normalize(INTROS[lang][category["key"]]),
            "services": [],
        }
        for namespace, preview_key in category["services"]:
            category_copy["services"].append(
                {
                    "title": normalize(read_json(base / f"{namespace}.json")["header"].strip()),
                    "summary": normalize(nav[f"preview-{preview_key}"]),
                }
            )
        result.append(category_copy)
    return result


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    lines: list[str] = []
    for paragraph in text.splitlines() or [""]:
        words = paragraph.split()
        if not words:
            lines.append("")
            continue
        line = words[0]
        for word in words[1:]:
            candidate = f"{line} {word}"
            if pdfmetrics.stringWidth(candidate, font, size) <= width:
                line = candidate
            else:
                lines.append(line)
                line = word
        lines.append(line)
    return lines


def draw_text(c: canvas.Canvas, text: str, x: float, y_top: float, width: float, font: str, size: float, leading: float, color) -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    y = y_top
    for line in wrap(normalize(text), font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_image_cover(c: canvas.Canvas, image_path: Path, x: float, y: float, width: float, height: float) -> None:
    """Draw an image as an art-directed cover crop inside a clipped rectangle."""
    with Image.open(image_path) as source:
        image_width, image_height = source.size
    scale = max(width / image_width, height / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    draw_x = x + (width - draw_width) / 2
    draw_y = y + (height - draw_height) / 2
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.saveState()
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(str(image_path)), draw_x, draw_y, draw_width, draw_height, mask="auto")
    c.restoreState()


def page_base(c: canvas.Canvas, lang: str, number: int, background, foreground) -> None:
    c.setFillColor(background)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(foreground)
    c.setFont("Inter-Medium", 7)
    c.drawString(MARGIN, PAGE_H - 38, f"{lang.upper()} / {number:02d}")
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 42, "MUÑOZ MANZO & OCAMPO")


def page_footer(c: canvas.Canvas, number: int, color) -> None:
    c.setFillColor(color)
    c.setFont("Inter-Regular", 6.3)
    c.drawString(MARGIN, 31, "MMYO.COM.MX")
    c.drawRightString(PAGE_W - MARGIN, 31, f"{number:02d}")


def draw_brand(c: canvas.Canvas, x: float, y: float, color) -> None:
    c.setFillColor(color)
    c.setFont("Inter-Light", 18)
    c.drawString(x, y, "MMYO")
    c.setFont("Inter-Medium", 5.5)
    c.drawString(x + 62, y + 7, "MUÑOZ MANZO & OCAMPO")
    c.drawString(x + 62, y - 1, "ASESORES FISCALES")


def draw_cover(c: canvas.Canvas, lang: str, number: int) -> None:
    draw_image_cover(c, IMAGES["cover"], 0, 0, PAGE_W, PAGE_H)
    c.saveState()
    c.setFillColor(BLUE)
    c.setFillAlpha(0.9)
    c.rect(0, 0, PAGE_W * 0.68, PAGE_H, fill=1, stroke=0)
    c.restoreState()
    c.setFillColor(GOLD)
    c.setFont("Inter-Medium", 7.5)
    c.drawString(MARGIN, PAGE_H - 68, "PERFIL DE SERVICIOS / 2026" if lang == "es" else "SERVICES PROFILE / 2026")
    title = "Una firma.\nCinco perspectivas." if lang == "es" else "One firm.\nFive perspectives."
    c.setFont("Inter-Light", 39)
    for i, line in enumerate(title.splitlines()):
        c.drawString(MARGIN, PAGE_H - 150 - i * 46, line)
    support = (
        "Asesoría personalizada para decisiones empresariales, familiares y patrimoniales complejas."
        if lang == "es"
        else "Personalized counsel for complex business, family, and wealth decisions."
    )
    draw_text(c, support, MARGIN, PAGE_H - 292, 295, "Inter-Regular", 10, 15, GOLD)
    c.setFillColor(GOLD)
    c.setFont("Inter-Light", 24)
    statement = "Perspectiva antes que respuesta." if lang == "es" else "Perspective before answers."
    draw_text(c, statement, MARGIN, 200, 260, "Inter-Light", 24, 29, GOLD)
    draw_brand(c, MARGIN, 72, GOLD)
    c.showPage()


def draw_overview(c: canvas.Canvas, lang: str, number: int, categories: list[dict]) -> None:
    page_base(c, lang, number, GOLD, BLUE)
    c.setFillColor(BLUE)
    title = "Decisiones complejas,\nclaridad compartida." if lang == "es" else "Complex decisions,\nshared clarity."
    c.setFont("Inter-Light", 32)
    for i, line in enumerate(title.splitlines()):
        c.drawString(MARGIN, PAGE_H - 110 - i * 37, line)
    body = (
        "Somos una firma mexicana independiente que combina especialización técnica, visión estratégica y trato personal. Trabajamos de forma interdisciplinaria para acompañar decisiones que atraviesan negocios, patrimonio y familia."
        if lang == "es"
        else "We are an independent Mexican firm combining deep specialization, strategic perspective, and personal attention. Our interdisciplinary work supports decisions across business, wealth, and family."
    )
    draw_text(c, body, MARGIN, PAGE_H - 215, 465, "Inter-Regular", 9.5, 14.5, BLUE)
    y = PAGE_H - 330
    col_width = (PAGE_W - MARGIN * 2 - 34) / 2
    for i, category in enumerate(categories):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (col_width + 34)
        cy = y - row * 72
        c.setFont("Inter-Medium", 6.5)
        c.drawString(x, cy, category["index"])
        draw_text(c, category["title"], x, cy - 17, col_width, "Inter-Light", 13.5, 16, BLUE)
    draw_image_cover(c, IMAGES["overview"], 0, 0, PAGE_W, 255)
    page_footer(c, number, BLUE)
    c.showPage()


def category_header(c: canvas.Canvas, category: dict, continuation: bool, color, lang: str, compact: bool = False, intro_width: float = 410) -> float:
    c.setFillColor(color)
    c.setFont("Inter-Medium", 7)
    label = ("CONTINUACIÓN" if continuation else "ÁREA DE PRÁCTICA") if lang == "es" else ("CONTINUED" if continuation else "PRACTICE AREA")
    c.drawString(MARGIN, PAGE_H - 76, f"{category['index']} / {label}")
    c.setFont("Inter-Light", 30 if not compact else 26)
    title_y = PAGE_H - 118
    draw_text(c, category["title"], MARGIN, title_y, PAGE_W - MARGIN * 2, "Inter-Light", 30 if not compact else 26, 34 if not compact else 30, color)
    if not continuation:
        return draw_text(c, category["intro"], MARGIN, PAGE_H - 182, intro_width, "Inter-Regular", 9, 13.5, color)
    return PAGE_H - 170


def service_module(c: canvas.Canvas, service: dict, number: int, x: float, y: float, width: float, color, marker_color) -> None:
    c.setFillColor(color)
    c.setFont("Inter-Medium", 6.5)
    c.drawString(x, y, f"{number:02d}")
    c.setFillColor(marker_color)
    c.rect(x, y - 13, 18, 3, fill=1, stroke=0)
    title_lines = wrap(service["title"], "Inter-Light", 11.2, width)
    c.setFillColor(color)
    c.setFont("Inter-Light", 11.2)
    title_y = y - 31
    for line in title_lines[:3]:
        c.drawString(x, title_y, line)
        title_y -= 13.5
    summary_y = title_y - 8
    draw_text(c, service["summary"], x, summary_y, width, "Inter-Regular", 7.2, 10, color)


def draw_category_page(c: canvas.Canvas, lang: str, number: int, category: dict, services: list[dict], start_number: int, continuation: bool, background, foreground, image_key: str | None = None) -> None:
    page_base(c, lang, number, background, foreground)
    category_header(c, category, continuation, foreground, lang, compact=continuation, intro_width=325 if image_key else 410)
    if image_key and not continuation:
        draw_image_cover(c, IMAGES[image_key], PAGE_W - 190, PAGE_H - 288, 142, 142)
    top = PAGE_H - (300 if image_key and not continuation else 225)
    col_gap = 34
    col_width = (PAGE_W - MARGIN * 2 - col_gap) / 2
    rows = (len(services) + 1) // 2
    available = top - 70
    row_height = min(138, available / max(rows, 1))
    for offset, service in enumerate(services):
        col = offset % 2
        row = offset // 2
        x = MARGIN + col * (col_width + col_gap)
        y = top - row * row_height
        service_module(c, service, start_number + offset, x, y, col_width, foreground, GOLD if background == BLUE else BLUE)
    page_footer(c, number, foreground)
    c.showPage()


def draw_close(c: canvas.Canvas, lang: str, number: int, venture: dict, alliances: dict) -> None:
    page_base(c, lang, number, GOLD, BLUE)
    draw_image_cover(c, IMAGES["venture-capital"], 0, PAGE_H - 248, PAGE_W, 248)
    c.saveState()
    c.setFillColor(BLUE)
    c.setFillAlpha(0.68)
    c.rect(0, PAGE_H - 248, PAGE_W, 248, fill=1, stroke=0)
    c.restoreState()
    c.setFillColor(GOLD)
    c.setFont("Inter-Medium", 7)
    c.drawString(MARGIN, PAGE_H - 82, f"04 / {'ÁREA DE PRÁCTICA' if lang == 'es' else 'PRACTICE AREA'}")
    draw_text(c, venture["title"], MARGIN, PAGE_H - 122, 360, "Inter-Light", 29, 33, GOLD)
    service_module(c, venture["services"][0], 1, MARGIN, PAGE_H - 310, 218, BLUE, BLUE)
    service_module(c, venture["services"][1], 2, MARGIN + 252, PAGE_H - 310, 218, BLUE, BLUE)
    c.setFillColor(BLUE)
    c.rect(MARGIN, 286, PAGE_W - MARGIN * 2, 126, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont("Inter-Medium", 6.5)
    c.drawString(MARGIN + 22, 384, f"05 / {'ÁREA DE PRÁCTICA' if lang == 'es' else 'PRACTICE AREA'}")
    draw_text(c, alliances["title"], MARGIN + 22, 352, 190, "Inter-Light", 17, 20, GOLD)
    draw_text(c, alliances["services"][0]["title"], MARGIN + 244, 352, 210, "Inter-Light", 11.2, 14, GOLD)
    draw_text(c, alliances["services"][0]["summary"], MARGIN + 244, 312, 210, "Inter-Regular", 7.2, 10, GOLD)
    c.setFillColor(BLUE)
    c.setFont("Inter-Light", 21)
    closing = "Las buenas decisiones\nempiezan aquí." if lang == "es" else "Good decisions\nstart here."
    for i, line in enumerate(closing.splitlines()):
        c.drawString(MARGIN, 224 - i * 25, line)
    c.setFont("Inter-Regular", 7)
    c.drawRightString(PAGE_W - MARGIN, 222, "mmyo@mmyo.com.mx · mmyo.com.mx")
    address = "Carretera México-Toluca 5420 / Piso 26 · Santa Fe, CDMX" if lang == "es" else "Mexico-Toluca Highway 5420 / Floor 26 · Santa Fe, Mexico City"
    c.drawRightString(PAGE_W - MARGIN, 207, address)
    page_footer(c, number, BLUE)
    c.showPage()


def make_qr_svg(url: str, path: Path, fill: str = "#272E37") -> None:
    widget = QrCodeWidget(url)
    widget.qr.make()
    matrix = widget.qr.modules
    quiet = 4
    size = len(matrix) + quiet * 2
    path_parts = []
    for row, values in enumerate(matrix):
        for col, value in enumerate(values):
            if value:
                path_parts.append(f"M{col + quiet} {row + quiet}h1v1h-1z")
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" shape-rendering="crispEdges"><path fill="{fill}" d="{"".join(path_parts)}"/></svg>'
    path.write_text(svg, encoding="utf-8")


def make_qr_png(url: str, path: Path, fill=(39, 46, 55, 255), scale: int = 10) -> None:
    widget = QrCodeWidget(url)
    widget.qr.make()
    matrix = widget.qr.modules
    quiet = 4
    size = len(matrix) + quiet * 2
    image = Image.new("RGBA", (size * scale, size * scale), (0, 0, 0, 0))
    drawing = ImageDraw.Draw(image)
    for row, values in enumerate(matrix):
        for col, value in enumerate(values):
            if value:
                x0, y0 = (col + quiet) * scale, (row + quiet) * scale
                drawing.rectangle((x0, y0, x0 + scale - 1, y0 + scale - 1), fill=fill)
    image.save(path)


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    QR_DIR.mkdir(parents=True, exist_ok=True)

    # Keep the print PDF sharp without embedding the multi-megabyte originals on
    # every Spanish and English page where the same editorial crop is reused.
    print_image_dir = QR_DIR / "brochure-images"
    print_image_dir.mkdir(parents=True, exist_ok=True)
    for key, source in list(IMAGES.items()):
        target = print_image_dir / f"{key}.jpg"
        with Image.open(source) as image:
            image = image.convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            image.save(target, "JPEG", quality=84, optimize=True)
        IMAGES[key] = target

    # Static TrueType instances generated from MMYO's Inter variable font.
    pdfmetrics.registerFont(TTFont("Inter-Light", str(ROOT / "public" / "fonts" / "Inter-Light.ttf")))
    pdfmetrics.registerFont(TTFont("Inter-Regular", str(ROOT / "public" / "fonts" / "Inter-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("Inter-Medium", str(ROOT / "public" / "fonts" / "Inter-Medium.ttf")))

    data = {"es": brochure_data("es"), "en": brochure_data("en")}
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("MMYO - Perfil de Servicios 2026")
    c.setAuthor("Muñoz Manzo & Ocampo")
    c.setSubject("Brochure bilingüe de servicios")

    for lang, start in (("es", 1), ("en", 9)):
        categories = data[lang]
        draw_cover(c, lang, start)
        draw_overview(c, lang, start + 1, categories)
        draw_category_page(c, lang, start + 2, categories[0], categories[0]["services"][:7], 1, False, BLUE, GOLD, "fiscal")
        draw_category_page(c, lang, start + 3, categories[0], categories[0]["services"][7:], 8, True, BLUE, GOLD)
        draw_category_page(c, lang, start + 4, categories[1], categories[1]["services"], 1, False, GOLD, BLUE, "legal")
        draw_category_page(c, lang, start + 5, categories[2], categories[2]["services"][:5], 1, False, BLUE, GOLD, "patrimonial")
        draw_category_page(c, lang, start + 6, categories[2], categories[2]["services"][5:], 6, True, BLUE, GOLD)
        draw_close(c, lang, start + 7, categories[3], categories[4])

    c.save()
    shutil.copyfile(OUTPUT, PUBLIC_OUTPUT)
    make_qr_svg(WEBSITE_URL, QR_DIR / "qr-website.svg")
    make_qr_svg(BROCHURE_URL, QR_DIR / "qr-long-brochure.svg")
    make_qr_png(BROCHURE_URL, QR_DIR / "qr-long-brochure.png")
    Image.new("RGBA", (1, 1), (0, 0, 0, 0)).save(QR_DIR / "transparent.png")
    print(OUTPUT)
    print(PUBLIC_OUTPUT)
    print(BROCHURE_URL)


if __name__ == "__main__":
    main()
