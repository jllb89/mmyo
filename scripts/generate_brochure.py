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


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "MMYO-Brochure-Servicios-2026.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "brochures" / OUTPUT.name
QR_DIR = ROOT / "tmp" / "pdfs"

BLUE = HexColor("#272E37")
GOLD = HexColor("#CBBAA1")
PAGE_W, PAGE_H = A4
MARGIN = 48

WEBSITE_URL = "https://mmyo.com.mx"
BROCHURE_URL = f"{WEBSITE_URL}/brochures/{OUTPUT.name}"


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


def page_base(c: canvas.Canvas, lang: str, number: int, background, foreground) -> None:
    c.setFillColor(background)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(foreground)
    c.setFont("Inter-Medium", 7)
    c.drawString(MARGIN, PAGE_H - 42, f"{lang.upper()} / {number:02d}")
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 42, "MUÑOZ MANZO & OCAMPO")


def page_footer(c: canvas.Canvas, number: int, color) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(0.65)
    c.line(MARGIN, 50, PAGE_W - MARGIN, 50)
    c.setFillColor(color)
    c.setFont("Inter-Medium", 6.5)
    c.drawString(MARGIN, 33, "MMYO.COM.MX")
    c.drawRightString(PAGE_W - MARGIN, 33, f"{number:02d}")


def draw_brand(c: canvas.Canvas, x: float, y: float, color) -> None:
    c.setFillColor(color)
    c.setFont("Inter-Light", 18)
    c.drawString(x, y, "MMYO")
    c.setFont("Inter-Medium", 5.5)
    c.drawString(x + 62, y + 7, "MUÑOZ MANZO & OCAMPO")
    c.drawString(x + 62, y - 1, "ASESORES FISCALES")


def draw_cover(c: canvas.Canvas, lang: str, number: int) -> None:
    page_base(c, lang, number, BLUE, GOLD)
    c.setFillColor(GOLD)
    c.rect(0, PAGE_H - 246, PAGE_W, 246, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("Inter-Medium", 8)
    c.drawString(MARGIN, PAGE_H - 78, "PERFIL DE SERVICIOS / 2026" if lang == "es" else "SERVICES PROFILE / 2026")
    statement = "Perspectiva antes\nque respuesta." if lang == "es" else "Perspective before\nanswers."
    c.setFont("Inter-Light", 34)
    for i, line in enumerate(statement.splitlines()):
        c.drawString(MARGIN, PAGE_H - 132 - i * 39, line)
    c.setFillColor(GOLD)
    title = "Una firma.\nCinco perspectivas." if lang == "es" else "One firm.\nFive perspectives."
    c.setFont("Inter-Light", 37)
    for i, line in enumerate(title.splitlines()):
        c.drawString(MARGIN, PAGE_H - 360 - i * 44, line)
    support = (
        "Asesoría personalizada para decisiones empresariales, familiares y patrimoniales complejas."
        if lang == "es"
        else "Personalized counsel for complex business, family, and wealth decisions."
    )
    draw_text(c, support, MARGIN, PAGE_H - 500, 370, "Inter-Light", 11, 17, GOLD)
    draw_brand(c, MARGIN, 76, GOLD)
    c.setFont("Inter-Medium", 6.5)
    c.drawString(MARGIN, 55, "19.3866° N / 99.2524° W")
    c.showPage()


def draw_overview(c: canvas.Canvas, lang: str, number: int, categories: list[dict]) -> None:
    page_base(c, lang, number, GOLD, BLUE)
    c.setFillColor(BLUE)
    c.setFont("Inter-Medium", 8)
    c.drawString(MARGIN, PAGE_H - 95, "MUÑOZ MANZO & OCAMPO")
    title = "Decisiones complejas,\nclaridad compartida." if lang == "es" else "Complex decisions,\nshared clarity."
    c.setFont("Inter-Light", 31)
    for i, line in enumerate(title.splitlines()):
        c.drawString(MARGIN, PAGE_H - 140 - i * 36, line)
    body = (
        "Somos una firma mexicana independiente que combina especialización técnica, visión estratégica y trato personal. Trabajamos de forma interdisciplinaria para acompañar decisiones que atraviesan negocios, patrimonio y familia."
        if lang == "es"
        else "We are an independent Mexican firm combining deep specialization, strategic perspective, and personal attention. Our interdisciplinary work supports decisions across business, wealth, and family."
    )
    draw_text(c, body, MARGIN, PAGE_H - 255, 450, "Inter-Light", 10.5, 16, BLUE)
    y = PAGE_H - 390
    for category in categories:
        c.setFont("Inter-Medium", 7)
        c.drawString(MARGIN, y, category["index"])
        c.setFont("Inter-Light", 15)
        c.drawString(MARGIN + 52, y - 2, category["title"])
        c.setLineWidth(0.6)
        c.line(MARGIN, y - 30, PAGE_W - MARGIN, y - 30)
        y -= 64
    page_footer(c, number, BLUE)
    c.showPage()


def category_header(c: canvas.Canvas, category: dict, continuation: bool, color, lang: str) -> None:
    c.setFillColor(color)
    c.setFont("Inter-Light", 40)
    c.drawString(MARGIN, PAGE_H - 118, category["index"])
    c.setFont("Inter-Medium", 7)
    label = ("CONTINUACIÓN" if continuation else "ÁREA DE PRÁCTICA") if lang == "es" else ("CONTINUED" if continuation else "PRACTICE AREA")
    c.drawString(MARGIN + 82, PAGE_H - 92, label)
    c.setFont("Inter-Light", 27)
    c.drawString(MARGIN + 82, PAGE_H - 127, category["title"])
    intro = ("Servicios 08-13" if lang == "es" else "Services 08-13") if continuation else category["intro"]
    draw_text(c, intro, MARGIN + 82, PAGE_H - 160, PAGE_W - MARGIN * 2 - 82, "Inter-Light", 9, 13, color)


def service_row(c: canvas.Canvas, service: dict, number: int, y: float, color, row_height: float) -> None:
    c.setFillColor(color)
    c.setFont("Inter-Medium", 7)
    c.drawString(MARGIN, y, f"{number:02d}")
    title_x = MARGIN + 48
    title_lines = wrap(service["title"], "Inter-Light", 12, PAGE_W - MARGIN - title_x)
    c.setFont("Inter-Light", 12)
    ty = y
    for line in title_lines[:2]:
        c.drawString(title_x, ty, line)
        ty -= 15
    summary_y = y - 34 if len(title_lines) == 1 else y - 44
    draw_text(c, service["summary"], title_x, summary_y, PAGE_W - MARGIN - title_x, "Inter-Light", 7.4, 10.5, color)
    c.setStrokeColor(color)
    c.setLineWidth(0.45)
    c.line(MARGIN, y - row_height + 17, PAGE_W - MARGIN, y - row_height + 17)


def draw_category_page(c: canvas.Canvas, lang: str, number: int, category: dict, services: list[dict], start_number: int, continuation: bool, background, foreground, row_height: float) -> None:
    page_base(c, lang, number, background, foreground)
    category_header(c, category, continuation, foreground, lang)
    y = PAGE_H - 235
    for offset, service in enumerate(services):
        service_row(c, service, start_number + offset, y, foreground, row_height)
        y -= row_height
    page_footer(c, number, foreground)
    c.showPage()


def draw_close(c: canvas.Canvas, lang: str, number: int, venture: dict, alliances: dict) -> None:
    page_base(c, lang, number, GOLD, BLUE)
    category_header(c, venture, False, BLUE, lang)
    y = PAGE_H - 250
    for i, service in enumerate(venture["services"], 1):
        service_row(c, service, i, y, BLUE, 88)
        y -= 88
    c.setFont("Inter-Light", 28)
    c.drawString(MARGIN, y - 18, "05")
    c.setFont("Inter-Light", 19)
    c.drawString(MARGIN + 58, y - 18, alliances["title"])
    draw_text(c, alliances["intro"], MARGIN + 58, y - 47, PAGE_W - MARGIN * 2 - 58, "Inter-Light", 8, 12, BLUE)
    service_row(c, alliances["services"][0], 1, y - 115, BLUE, 96)
    c.setFont("Inter-Light", 22)
    closing = "Las buenas decisiones\nempiezan aquí." if lang == "es" else "Good decisions\nstart here."
    for i, line in enumerate(closing.splitlines()):
        c.drawString(MARGIN, 150 - i * 27, line)
    c.setFont("Inter-Regular", 7)
    c.drawRightString(PAGE_W - MARGIN, 148, "mmyo@mmyo.com.mx · mmyo.com.mx")
    address = "Carretera México-Toluca 5420 / Piso 26 · Santa Fe, CDMX" if lang == "es" else "Mexico-Toluca Highway 5420 / Floor 26 · Santa Fe, Mexico City"
    c.drawRightString(PAGE_W - MARGIN, 132, address)
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


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    QR_DIR.mkdir(parents=True, exist_ok=True)

    # ReportLab cannot embed the CFF-flavoured Inter OTFs in this project.
    # The bundled Swiss 721 TTF family is the closest print-safe counterpart.
    pdfmetrics.registerFont(TTFont("Inter-Light", str(ROOT / "public" / "fonts" / "swiss721-light.ttf")))
    pdfmetrics.registerFont(TTFont("Inter-Regular", str(ROOT / "public" / "fonts" / "swiss721bt.ttf")))
    pdfmetrics.registerFont(TTFont("Inter-Medium", str(ROOT / "public" / "fonts" / "swiss721.ttf")))

    data = {"es": brochure_data("es"), "en": brochure_data("en")}
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("MMYO - Perfil de Servicios 2026")
    c.setAuthor("Muñoz Manzo & Ocampo")
    c.setSubject("Brochure bilingüe de servicios")

    for lang, start in (("es", 1), ("en", 9)):
        categories = data[lang]
        draw_cover(c, lang, start)
        draw_overview(c, lang, start + 1, categories)
        draw_category_page(c, lang, start + 2, categories[0], categories[0]["services"][:7], 1, False, BLUE, GOLD, 68)
        draw_category_page(c, lang, start + 3, categories[0], categories[0]["services"][7:], 8, True, BLUE, GOLD, 78)
        draw_category_page(c, lang, start + 4, categories[1], categories[1]["services"], 1, False, GOLD, BLUE, 112)
        draw_category_page(c, lang, start + 5, categories[2], categories[2]["services"][:5], 1, False, BLUE, GOLD, 91)
        draw_category_page(c, lang, start + 6, categories[2], categories[2]["services"][5:], 6, True, BLUE, GOLD, 112)
        draw_close(c, lang, start + 7, categories[3], categories[4])

    c.save()
    shutil.copyfile(OUTPUT, PUBLIC_OUTPUT)
    make_qr_svg(WEBSITE_URL, QR_DIR / "qr-website.svg")
    make_qr_svg(BROCHURE_URL, QR_DIR / "qr-long-brochure.svg")
    print(OUTPUT)
    print(PUBLIC_OUTPUT)
    print(BROCHURE_URL)


if __name__ == "__main__":
    main()
