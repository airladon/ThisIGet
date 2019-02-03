import base64
from Crypto.Cipher import AES
import hashlib
import bcrypt
import os


def bytes_to_b64_str(bytes_to_convert):
    # return base64.b64encode(bytes_to_convert).decode('ascii')
    return base64.b64encode(bytes_to_convert).decode('utf-8')


def b64_str_to_bytes(str_to_convert):
    # return base64.b64decode(str_to_convert.encode('ascii'))
    str_to_convert = str_to_convert
    return base64.b64decode(str_to_convert.encode('utf-8'))


def hex_str_to_bytes(hex_str_to_convert):
    byte_array = []
    for i in range(0, len(hex_str_to_convert), 2):
        byte_array.append(int(hex_str_to_convert[i:i + 2], 16))
    return bytes(byte_array)


def bytes_to_hex_str(bytes_to_convert):
    hex_str = ''
    for i in range(0, len(bytes_to_convert)):
        hex_str += '{:02x}'.format(bytes_to_convert[i])
    return hex_str


def encrypt(plain_text, key, min_length_for_padding=320, padding_char=' '):
    # Convert key to bytes type if not already
    key_bytes = key
    if type(key) == str:
        key_bytes = hex_str_to_bytes(key)
    cipher = AES.new(key_bytes, AES.MODE_EAX)
    nonce = cipher.nonce
    plain_text_to_use = plain_text
    if len(plain_text) < min_length_for_padding:
        plain_text_to_use += ' ' * (min_length_for_padding - len(plain_text))
    ciphertext, tag = cipher.encrypt_and_digest(plain_text_to_use.encode('utf-8'))
    print(ciphertext)
    encypted_email = tag + nonce + ciphertext
    return bytes_to_b64_str(encypted_email)


def decrypt(encrypted_str, key, padding_char=' '):
    # Convert key to bytes type if not already
    key_bytes = key
    if type(key) == str:
        key_bytes = hex_str_to_bytes(key)
    encrypted_bytes = b64_str_to_bytes(encrypted_str)
    tag = encrypted_bytes[0:16]
    nonce = encrypted_bytes[16:32]
    ciphertext = encrypted_bytes[32:]
    cipher = AES.new(key_bytes, AES.MODE_EAX, nonce=nonce)
    plain_text = cipher.decrypt_and_verify(ciphertext, tag).decode('utf-8')
    return plain_text.rstrip(padding_char)


def prep_plain_text_for_hashing(plain_text):
    normalized_length = hashlib.sha512(plain_text.encode('utf-8')).digest()
    normalized_length_b64 = base64.b64encode(normalized_length)
    return normalized_length_b64


def hash(plain_text, iterations=12):
    pt = prep_plain_text_for_hashing(plain_text)
    h = bcrypt.hashpw(pt, bcrypt.gensalt(iterations))
    return h.decode('utf-8')


def check_hash(plain_text, hash_to_compare):
    pt = prep_plain_text_for_hashing(plain_text)
    return bcrypt.checkpw(pt, hash_to_compare.encode('utf-8'))


def get_aes_key():
    return key_hex_string = os.environ.get('AES_KEY') or \
        'c0f04ab9d3b1939589072cd6ca0bf40539d8bf0a8b823adb09ccc855eee48b40'


def get_aes_key_bytes():
    return hex_str_to_bytes(get_key)


key_str='0f21b3b2b4368d152a6976912b14f13b7fa159f2d456b71735bd220ff658c05c'
len(encrypt('1', key_str))
len(encrypt('12', key_str))
len(encrypt('123', key_str))
len(encrypt('1234', key_str))
len(encrypt('12345', key_str))
len(encrypt('123456', key_str))
