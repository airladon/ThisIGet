import subprocess
import datetime
# import os
# for root, dirs, files in os.walk("/mydir"):
#     for file in files:
#         if file.endswith(".txt"):
#              print(os.path.join(root, file))

output = subprocess.run(
            ["git", "log", "-1", '--pretty="format:%ci"', "./src/Lessons/Math/Geometry_1/AreaCircle/explanation/base/content.js"], capture_output=True)
if output.returncode == 0:
    results = output.stdout.decode("utf-8").strip().replace(
        "format:", "").replace('"', '')
    date_time = datetime.datetime.strptime(results, '%Y-%m-%d %H:%M:%S %z')
    print(date_time.strftime("%Y-%m-%dT%H:%M:%S%z"))
    # print(date_time.astimezone().strftime("%Y-%m-%dT%H:%M:%SZ%z"))