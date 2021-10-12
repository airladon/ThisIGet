
if [ "$1" = 'rm' ];
then
    find ./src/content ./tests -regex '.*__diff_output__.*png' -delete
fi

if [ "$1" = 'ls' ];
then
    find ./src/content ./tests -regex '.*__diff_output__.*png'
fi

if [ "$1" = 'cp' ];
then
    python tools/copy_diff_snapshots.py
fi
