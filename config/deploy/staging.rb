server 'covid19.development.opencontracting.uk0.bigv.io',
user: 'covid19',
roles: %w{web app},
port: 22


# Directory to deploy
# ===================
set :env, 'staging'
set :app_debug, 'false'
set :deploy_to, '/home/covid19/web'
set :shared_path, '/home/covid19/web/shared'
set :overlay_path, '/home/covid19/web/overlay'
set :tmp_dir, '/home/covid19/web/tmp'
set :site_url, 'https://covid19.development.opencontracting.uk0.bigv.io'
set :rollbar_token, ''
