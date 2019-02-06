#!/usr/bin/env sh

AES_KEY=`python tools/generate_aes_key.py`
SECRET_KEY=`python tools/generate_secret_key.py`
PEPPER=`python tools/generate_pepper.py`

echo
echo "export AES_KEY=\"$AES_KEY\""
echo "export SECRET_KEY=\"$SECRET_KEY\""
echo "export PEPPER=\"$PEPPER\""
echo