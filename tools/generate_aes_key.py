# In Heroku, the AES key is stored as a string of hex values.from

from Crypto.Random import get_random_bytes
import binascii

key = get_random_bytes(32)
key_hex_string = binascii.hexlify(key).decode('ascii')
print(key_hex_string)
