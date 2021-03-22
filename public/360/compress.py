from PIL import Image
from os import listdir
from os.path import isfile, join
import re

filenames = [f for f in listdir('.') if isfile(join('.', f))]

for filename in filenames:
    if re.match('\S+\.(jpg|png)', filename):
        print("Compressing ", filename)
        img = Image.open(filename)
        img.save(filename, quality=70)
