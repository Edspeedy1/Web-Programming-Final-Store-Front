import pygame
import random
pygame.init()
pygame.display.set_mode((500, 500))


from scipy.spatial import KDTree
from webcolors import (
    CSS3_HEX_TO_NAMES,
    hex_to_rgb,
)

def convert_rgb_to_names(rgb_tuple):
    css3_db = CSS3_HEX_TO_NAMES
    names = []
    rgb_values = []
    for color_hex, color_name in css3_db.items():
        names.append(color_name)
        rgb_values.append(hex_to_rgb(color_hex))
    
    kdt_db = KDTree(rgb_values)
    distance, index = kdt_db.query(rgb_tuple[:3])
    return names[index]


def createItem(itemType):
    size = (200, 300)
    item = pygame.Surface(size, pygame.SRCALPHA)
    item.fill((random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))
    for _ in range(random.randint(0, 15)+random.randint(0, 15)+random.randint(0, 15)):
        a = random.randint(0,2)
        if a == 0:
            pygame.draw.circle(item, (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), (random.randint(0, size[0]), random.randint(0, size[1])), random.randint(0, int(size[0]/2.5)))
        elif a == 1:
            pygame.draw.line(item, (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), (random.randint(0, size[0]), random.randint(0, size[1])), (random.randint(0, size[0]), random.randint(0, size[1])), random.randint(0, 10))
        elif a == 2:
            pygame.draw.rect(item, (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), (random.randint(0, size[0]), random.randint(0, size[1]), random.randint(0, size[0]), random.randint(0, size[0])))
    
    color = pygame.transform.scale(item, (1,1)).get_at((0,0))
    color2 = pygame.transform.scale(item.subsurface((100,100,20,20)), (1,1)).get_at((0,0))
    pygame.draw.circle(item, (0,0,0), (5, 5), 6)
    pygame.draw.circle(item, (0,0,0), (15, 5), 6)
    pygame.draw.circle(item, color, (5, 5), 5)
    pygame.draw.circle(item, color2, (15, 5), 5)
    shirt = pygame.image.load(f'basic/Base{itemType}.png').convert_alpha()
    item.blit(shirt, (0, 0), None, pygame.BLEND_RGBA_MULT)

    return item

with open("items.txt", "w") as f:
    for i in range(60):
        itemType = random.choice(["Shirt", "Pants", "Shoes", "Hat", "Glasses", "Coat", "Jacket", "Gloves"])
        item = createItem(itemType)
        pygame.image.save(item, "items/item" + str(i) + ".png")
        name = random.choice(["Storm", "Sunset", "PowSlayer", "Crown", "Micro Puff", "Powder", "Trident", ""]) + " " + random.choice(["", "Shift", "Storm", "Groove", "Tailed", "Town", "Twisted", "Trick", "Insulated", "Shift"]) + " " + itemType
        
        color = item.get_at((5,5))
        color2 = item.get_at((15,5))
        colorName = convert_rgb_to_names(color)
        colorName2 = convert_rgb_to_names(color2)
        tags = [itemType, colorName] 
        if colorName != colorName2:
            tags.append(colorName2)
        for _ in range(random.randint(1, 4)):
            tags.append(random.choice(["Urban", "Winter", "Adventure", "Aquatic", "NIghtwear", "Climbing", "Hiking"]))

        f.write('{"id":' + str(i) + ', ' + '"name":"' + name + '", ' + '"price":'+str(random.randint(1, 1000)-0.01) + ', ' + '"tags":' + str(tags) + '},\n')