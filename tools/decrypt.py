from Crypto.Cipher import AES
import os
import sys


def hex_str_to_bytes(hex_str):
    byte_array = []
    for i in range(0, len(hex_str), 2):
        byte_array.append(int(hex_str[i:i + 2], 16))

    return bytes(byte_array)


def get_key():
    key_hex_string = os.environ.get('AES_KEY') or \
        'c0f04ab9d3b1939589072cd6ca0bf40539d8bf0a8b823adb09ccc855eee48b40'
    return hex_str_to_bytes(key_hex_string)


encrypted_hex_string = sys.argv[1]

encrypted = hex_str_to_bytes(encrypted_hex_string)

tag = encrypted[0:16]
nonce = encrypted[16:32]
cipher_text = encrypted[32:]
key = get_key()
cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
plain_text = cipher.decrypt(cipher_text).decode('utf-8')
print(plain_text)
