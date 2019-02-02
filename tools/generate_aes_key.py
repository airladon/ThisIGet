# In Heroku, the AES key is stored as a string of hex values.from

from Crypto.Random import get_random_bytes
import binascii
key = get_random_bytes(32)
key_hex_string = binascii.hexlify(key).decode('ascii')
print(key_hex_string)

# just for good measure, this is how the hex string can be converted back
# to usable bytes
byte_array=[]
for i in range(0, len(key_hex_string), 2):
    byte_array.append( int (key_hex_string[i:i+2], 16 ) )

key_from_hex_string = bytes(byte_array)
print(key_from_hex_string == key)