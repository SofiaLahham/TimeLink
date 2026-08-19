from PIL import Image, ImageDraw, ImageFont
import os

BASE = os.path.dirname(os.path.abspath(__file__))

def make_icon(size, path, maskable=False):
    img = Image.new("RGBA", (size, size), (0,0,0,0))
    draw = ImageDraw.Draw(img)

    c1 = (56, 189, 248, 255)    # #38bdf8
    c2 = (59, 130, 246, 255)    # #3b82f6
    bg = (14, 21, 38, 255)      # #0e1526

    # background: rounded square (or full bleed for maskable) filled with dark bg
    pad = 0 if maskable else int(size*0.06)
    radius = int(size*0.5) if maskable else int(size*0.22)
    draw.rounded_rectangle([pad, pad, size-pad, size-pad], radius=radius, fill=bg)

    # gradient-ish diagonal bar using multiple lines
    steps = 60
    inner_pad = int(size*0.18)
    for i in range(steps):
        t = i/steps
        r = int(c1[0]+(c2[0]-c1[0])*t)
        g = int(c1[1]+(c2[1]-c1[1])*t)
        b = int(c1[2]+(c2[2]-c1[2])*t)
        y0 = inner_pad + (size-2*inner_pad)*t
        draw.rectangle([inner_pad, y0, size-inner_pad, y0+(size-2*inner_pad)/steps+1], fill=(r,g,b,255))

    # mask the gradient block into a rounded square matching icon shape
    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle([pad, pad, size-pad, size-pad], radius=radius, fill=255)
    grad_layer = Image.new("RGBA", (size,size), (0,0,0,0))
    gdraw = ImageDraw.Draw(grad_layer)
    for i in range(steps):
        t = i/steps
        r = int(c1[0]+(c2[0]-c1[0])*t)
        g = int(c1[1]+(c2[1]-c1[1])*t)
        b = int(c1[2]+(c2[2]-c1[2])*t)
        y0 = t*size
        gdraw.rectangle([0, y0, size, y0+size/steps+1], fill=(r,g,b,255))
    result = Image.composite(grad_layer, Image.new("RGBA",(size,size),(0,0,0,0)), mask)

    # draw a simple calendar glyph in the center (white, bold)
    d2 = ImageDraw.Draw(result)
    cx, cy = size/2, size/2
    w = size*0.42
    h = size*0.36
    x0, y0b = cx-w/2, cy-h/2+size*0.02
    x1, y1b = cx+w/2, cy+h/2+size*0.02
    lw = max(2, int(size*0.035))
    d2.rounded_rectangle([x0,y0b,x1,y1b], radius=size*0.05, outline=(255,255,255,255), width=lw)
    # top tabs
    tab_w = lw*1.6
    d2.line([x0+w*0.22, y0b-size*0.05, x0+w*0.22, y0b+size*0.03], fill=(255,255,255,255), width=lw)
    d2.line([x1-w*0.22, y0b-size*0.05, x1-w*0.22, y0b+size*0.03], fill=(255,255,255,255), width=lw)
    # header bar
    d2.line([x0, y0b+h*0.28, x1, y0b+h*0.28], fill=(255,255,255,255), width=lw)
    # dots grid
    rows, cols = 2, 3
    gx0, gx1 = x0+w*0.15, x1-w*0.15
    gy0, gy1 = y0b+h*0.5, y1b-h*0.15
    for r in range(rows):
        for cidx in range(cols):
            px = gx0 + (gx1-gx0)*(cidx/(cols-1))
            py = gy0 + (gy1-gy0)*(r/(rows-1))
            rad = size*0.02
            d2.ellipse([px-rad,py-rad,px+rad,py+rad], fill=(255,255,255,230))

    result.save(path)

make_icon(180, os.path.join(BASE, "icon-180.png"))
make_icon(192, os.path.join(BASE, "icon-192.png"))
make_icon(512, os.path.join(BASE, "icon-512.png"))
make_icon(512, os.path.join(BASE, "icon-512-maskable.png"), maskable=True)
print("done")
