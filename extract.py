import fitz  # PyMuPDF
import os

pdf_path = "portfolio.pdf"
doc = fitz.open(pdf_path)

# Create assets directory
os.makedirs("assets", exist_ok=True)

text_content = []

for page_index in range(len(doc)):
    page = doc[page_index]
    
    # Extract text
    text = page.get_text()
    if text.strip():
        text_content.append(f"--- Page {page_index + 1} ---")
        text_content.append(text)
    
    # Extract images
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        image_filename = f"assets/page{page_index + 1}_img{img_index + 1}.{image_ext}"
        with open(image_filename, "wb") as f:
            f.write(image_bytes)

# Save extracted text
with open("extracted_text.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(text_content))

print(f"Extracted {len(doc)} pages.")
print("Text saved to extracted_text.txt")
print("Images saved to assets/ directory")
