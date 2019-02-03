import bcrypt
import binascii
import sys

iterations = 12
if len(sys.argv) > 1:
    iterations = sys.argv[1]

pepper = bcrypt.gensalt(iterations)
pepper_hex_string = binascii.hexlify(pepper).decode('ascii')
print(pepper_hex_string)
