---
title: 'Trigger GitHub Actions from another repository'
excerpt: "GitHub has no official support for trigger workflows across repos but that won't stop us!"
date: '2021-06-13'
slug: 'trigger-github-actions-from-another-repo'
authors:
  - name: Sean Callan
    github: https://github.com/doomspork
tags:
  - 'GitHub Actions'
  - 'Workflow'
  - 'CI/CD'
---

As part of the new [Elixir School](https://elixirischool.com) facelift we're splitting the Elixir Phoenix portion of the application out from the translated content.
In order to continue down the path of CI/CD we needed to identify a way to trigger the deployment in one repo based on merges in another.
We decided it was best to keep things inside GitHub Actions for now.

Out of the box GitHub does not provide an immediately obvious solution to this problem so after scouring the internet we were finally able to piece together a working solution which we'll document here today.

Before getting into the nuts and bolts let's review what we want to accomplish:

1. For merges to [school_house](https://github.com/elixirschool/school_house) deploy to Production. This exists today via the deploy.yml workflow.
2. Whenever changes are merged into the content repository, [elixirschool](https://github.com/elixirschool/elixirschool), trigger the aforementioned deployment.

While GitHub may not provide a solution for this exact problem they do provide a robust API which has everything we'll need.
To achieve our goal we'll be relying on the [`workflow_dispatch`](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/) event.

## Deployment Workflow

Let's start by updating our existing deployment workflow to work with this new event.
Thanks to the flexibility of GitHub Actions we won't need to make many changes to our existing deploy script.
The minimal change we can make here is adding `workflow_dispatch` to the `on:` configuration for our Workflow.
This tells GitHub that for any `workflow_dispatch`, trigger this workflow, which is precisely what we need.

Let's update our `deploy.yml`:

```yaml
name: Deploy

on:
  workflow_dispatch:
  push:
    branches:
      - master
```

Here we're telling GitHub for any `workflow_dispatch` and for pushes to `master` we want to trigger this workflow, our deployment.

## Personal Access Token

Before we can trigger our `workflow_dispatch` even we'll need to generate a Personal Access Token to authenticate our request. Head over to the official GitHub document to see how to [Create a personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).

We'll need to add this new token to our repository (or organization) secrets. For this example we'll call our secret `ACCESS_TOKEN`.
With that in place we're ready to trigger the workflow

## External Repository Worflow

We've updated our deployment workflow to listen to and trigger on the `workflow_dispatch` event and we've setup our personal access token so now it's time to tie it all together with a simple cURL request:

```shell
 curl -X POST \
 -H "Authorization: Bearer ${{secrets.ACCESS_TOKEN}}" \
 -H "Accept: application/vnd.github.v3+json" \
 https://api.github.com/repos/<YOUR ORG>/<YOUR REPO>/actions/workflows/deploy.yml/dispatches \
 -d '{"ref": "master"}'
```

We make an HTTP to the `dispatches` endpoint of our workflow with our personal access token as the bearer token, the contents of the request body are not important here.
With a testing and working cURL command in place we need to create workflow file in our external repository to call it on merge:

```yaml
---
name: Trigger Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST \
          -H "Authorization: Bearer ${{secrets.ACCESS_TOKEN}}" \
          -H "Accept: application/vnd.github.v3+json" \
          https://api.github.com/repos/<YOUR ORG>/<YOUR REPO>/actions/workflows/deploy.yml/dispatches \
          -d '{"ref": "master"}'
```

That's it! When `master` is pushed to we'll fire off our cURL request which will in turn trigger our other repository's deployment worflow.
