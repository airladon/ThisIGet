import os
import subprocess
# import sys


def set_app_env(app, show_changes=False):
    # app_names = {
    #     'dev': 'thisiget-dev',
    #     'beta': 'thisiget-beta',
    #     'test': 'thisiget-test',
    #     'prod': 'thisiget-prod',
    # }

    if app == 'local':
        keys = [
            'SECRET_KEY', 'AES_KEY', 'PEPPER',
            'DATABASE_URL', 'MAIL_PASSWORD', 'MAIL_SENDER',
            'MAIL_SENDER', 'MAIL_SERVER', 'MAIL_USERNAME'
        ]
        for key in keys:
            if key in os.environ:
                if show_changes:
                    print(f'Removing {key}')
                del os.environ[key]
    else:
        output = subprocess.run(
            ["heroku", "config", "--app=thisiget-dev"], capture_output=True)
        if output.returncode == 0:
            results = output.stdout.decode("utf-8").split('\n')
            for result in results:
                split = result.split(': ')
                if len(split) == 1:
                    continue
                env_name = split[0].strip()
                env_value = split[1].strip()
                if show_changes:
                    print(f'setting {env_name} = {env_value}')
                os.environ[env_name] = env_value
        else:
            raise Exception(f'Error getting heroku config vars for {app}')
