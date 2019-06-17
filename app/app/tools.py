import base64
from Crypto.Cipher import AES
import hashlib
import bcrypt
import os
from Crypto.Random import get_random_bytes
import binascii
import re


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


def generate_aes_key():
    key = get_random_bytes(32)
    key_hex_string = binascii.hexlify(key).decode('ascii')
    return key_hex_string


def generate_pepper(iterations=12):
    pepper = bcrypt.gensalt(int(iterations))
    pepper_hex_string = binascii.hexlify(pepper).decode('ascii')
    return pepper_hex_string


def get_aes_key():
    return os.environ.get('AES_KEY') or \
        'c0f04ab9d3b1939589072cd6ca0bf40539d8bf0a8b823adb09ccc855eee48b40'


def get_aes_key_bytes():
    return hex_str_to_bytes(get_aes_key())


def encrypt(plain_text, key=get_aes_key_bytes(),
            min_length_for_padding=0, padding_char=' '):
    # Convert key to bytes type if not already
    key_bytes = key
    if type(key) == str:
        key_bytes = hex_str_to_bytes(key)
    cipher = AES.new(key_bytes, AES.MODE_EAX)
    nonce = cipher.nonce
    padded = plain_text + ' ' * (min_length_for_padding - len(plain_text))
    ciphertext, tag = cipher.encrypt_and_digest(padded.encode('utf-8'))
    encypted_payload = tag + nonce + ciphertext
    return bytes_to_b64_str(encypted_payload)


def decrypt(encrypted_str, key=get_aes_key_bytes(), padding_char=' '):
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


# See https://github.com/pyca/bcrypt/ for more information on bcrypt
# and recommendation for pre-hashing password to make it a consistent
# length.
# See https://blogs.dropbox.com/
#   tech/2016/09/how-dropbox-securely-stores-your-passwords/
# for their recommendation on how to store passwords
# See https://www.compose.com/articles/
#   you-may-get-pwned-at-least-protect-passwords-with-bcrypt/
# for explanation on bcrypt hash and how it also stores the salt


def hash_str(plain_text, iterations=12):
    pt = prep_plain_text_for_hashing(plain_text)
    hashed = bcrypt.hashpw(pt, bcrypt.gensalt(iterations))
    return hashed.decode('utf-8')


def get_pepper():
    return os.environ.get('PEPPER') or \
        '24326224313224715476454673646b776f6e4b47425a36313032584f2e'


# Peppered hash will only return the hash (last 31 bytes) and not the pepper
# as the pepper should be kept secret
def hash_str_with_pepper(plain_text, pepper=get_pepper()):
    pepper_bytes = pepper
    if type(pepper) == str:
        pepper_bytes = hex_str_to_bytes(pepper)
    pt = prep_plain_text_for_hashing(plain_text)
    hashed = bcrypt.hashpw(pt, pepper_bytes)
    return hashed.decode('utf-8')[29:]


def check_peppered_hash(plain_text, hash_to_compare, pepper=get_pepper()):
    pepper_bytes = pepper
    if type(pepper) == str:
        pepper_bytes = hex_str_to_bytes(pepper)
    pt = prep_plain_text_for_hashing(plain_text)
    full_hash = pepper_bytes + hash_to_compare.encode('utf-8')
    return bcrypt.checkpw(pt, full_hash)


def check_hash(plain_text, hash_to_compare):
    pt = prep_plain_text_for_hashing(plain_text)
    return bcrypt.checkpw(pt, hash_to_compare.encode('utf-8'))


def format_email(email):
    split_email = email.split('@')
    if len(split_email) != 2:
        return email
    domain = split_email[1].lower()
    user = split_email[0]
    return f'{user}@{domain}'


def getLessons():
    file_list = {}
    for root, dirs, files in os.walk('./app/app/static'):
        for file in files:
            if os.path.isdir(file):
                continue
            if file == '.DS_Store':
                continue
            file_without_hash = re.sub(r'-....................\.', '.', file)
            path = root.replace('./app/app/', '')

            if path not in file_list:
                file_list[path] = {}
            file_list[path][file_without_hash] = file

    return file_list

# key_str='0f21b3b2b4368d152a6976912b14f13b7fa159f2d456b71735bd220ff658c05c'
# len(encrypt('1', key_str))
# len(encrypt('12', key_str))
# len(encrypt('123', key_str))
# len(encrypt('1234', key_str))
# len(encrypt('12345', key_str))
# len(encrypt('123456', key_str))
