import re  # noqa: E902
import os
import pathlib

files = []
versions = {}

for r, d, f in os.walk('./src/content'):
    for file in f:
        if file.endswith('btest.js'):
            version_path = pathlib.Path(r).parents[0].as_posix()
            if version_path not in versions:
                versions[version_path] = {}
            if 'tests' not in versions[version_path]:
                versions[version_path]["tests"] = []
            versions[version_path]["tests"].append(pathlib.Path(r) / file)
      if (file == 'version.js'):
          if r not in versions:
              versions[pathlib.Path(r).as_posix()] = {}
          version = open(pathlib.Path(r) / file, "r")
          topic_type = 'generic'
          for line in version:
              if re.match("  type: (.*)", line):
                  topic_type = re.sub("  type: *'", "", line)
                  topic_type = re.sub(" *' *,", "", topic_type)
          versions[pathlib.Path(r).as_posix()]["version"] = topic_type.strip()

for value in versions.values():
    if 'tests' in value:
        print(value['version'])
        for test_file in value['tests']:
            name = test_file.name
            stage = re.sub("\..*", "", name)
            print(test_file.parent, stage, test_file.name, test_file.suffix)
            print(test_file.parent / f"{stage}.{value['version']}.btest.js")
            target = test_file.parent / f"{stage}.{value['version']}.btest.js"
            test_file.rename(target)
        print('\n')
