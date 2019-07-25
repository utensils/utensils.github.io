## Dependencies
Your development environment should have ruby and the gem package manager setup already.

1. Install bundler `gem install bundler`
2. Install [yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

```
$ bundle install
$ yarn install
$ bundle exec jekyll serve --config _config.yml,_config.development.yml
```
Site can be viewed from [http://localhost:4051](http://localhost:4051)

## Services

todo: connect the dots

`src/_data/services.yml`

`src/_includes/services`

## Blog

### Add obfuscated email address
```sh
$ bundle exec rake email
Please type in an email address then press ENTER/RETURN
contact@example.com

Installation:
Update src/_config.yml with the following pairs.

email-key: d05fIsWcv61GbThaN3FkOuL9mHXVnYgBQJUR8r2S7DizwKexqtAZMCP4Eoplyj
email-encoded: XhxWUXW@fIUzaNf.Xhz
```

### New post
```
$ bundle exec jekyll post "Hello beautiful world"
```

## Deploy to Github Pages from Travis
1. Point Travis to repository
2. Configure Travis
3. Generate a [Personal Access Token](https://github.com/settings/tokens) from Github
  - The only scope needed is repo:public_repo
4. Set `GITHUB_API=<token>` on Travis
  - Make sure `Display value in build log` toggle is set to `Off`!
