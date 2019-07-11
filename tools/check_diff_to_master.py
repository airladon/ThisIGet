import subprocess

master_sha = subprocess.run(
    ['git', 'rev-parse', 'master'],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip()
current_sha = subprocess.run(
    ['git', 'rev-parse', 'HEAD'],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip()

diff = subprocess.run(
    ['git', 'diff', '--name-only', master_sha, current_sha],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip().split('\n')

paths = set()
test_all = False
max_depth = 7

for path in diff:
    print(path)
