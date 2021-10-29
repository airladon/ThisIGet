#!/bin/bash

if [ "$1" = 'rm' ];
then
    find ./src/content ./tests -regex '.*__replacements__.*png' -delete
fi

if [ "$1" = 'ls' ];
then
    find ./src/content ./tests -regex '.*__replacements__.*png'
fi

if [ "$1" = 'replace' ];
then
    python tools/replace_with_replacements.py
fi
