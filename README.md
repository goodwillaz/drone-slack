## Drone.io Slack Plugin

This [Drone.io](https://drone.io) plugin allows Slack notifications before or after a build with
configurable templates (based on [Handlebars](http://handlebarsjs.com) with some extra helpers).
This plugin differs from the [official drone-slack](https://github.com/drone-plugins/drone-slack)
plugin by using the new Slack [Block Kit](https://api.slack.com/block-kit) framework for
publishing messages to Slack.

### Slack Setup

Slack Custom Integrations are [deprecated](https://api.slack.com/custom-integrations) so this plugin
uses Slack Apps.  There is a tiny bit more setup required on the Slack side, but it's fairly painless.
Slack even has a [tutorial](https://api.slack.com/tutorials/slack-apps-hello-world) that you should
follow for setting up your app.

_Note that unlike the legacy webhook's, the webhook URL you generate with your app cannot have their
username, icon nor channel changed on the fly.  The channel that you give your webhook access to is
the only channel it can interact with._

Once your Slack App is created and configured with at least one webhook, you'll need to take one more
step.  This Plugin uses the Block API to create buttons in the Slack message that link to the Build.
Since these are interactive elements, they require an endpoint that will give a `200 Ok` response.

In the _Add features and functionality_ settings of your app, enable Interactivity and use the httpbin.org
address as shown in the screenshot.  You can potentially use any other endpoint you create yourself that
accepts a `POST` and returns a `200` response.

![Interactive Components](https://user-images.githubusercontent.com/1494713/61660103-f9011d00-ac7d-11e9-9d73-fbca6eda02a3.png)

### Docker

If you'd like to play locally or build your own Docker image, you can do so like so:

```bash
$ docker build --rm -t <username>/slack .
```

### Usage

In `.drone.yml`:

```yaml
steps:
- name: slack
  image: goodwillaz/drone-slack
  settings:
    webhook: https://hooks.slack.com/services/...
```

From the command line:

```bash
$ docker run --rm \
  -e PLUGIN_WEBHOOK=https://hooks.slack.com/services/... \
  -e DRONE_REPO_OWNER=octocat \
  -e DRONE_REPO_NAME=hello-world \
  -e DRONE_COMMIT_SHA=7fd1a60b01f91b314f59955a4e4d4e80d8edf11d \
  -e DRONE_COMMIT_BRANCH=master \
  -e DRONE_COMMIT_AUTHOR=octocat \
  -e DRONE_BUILD_NUMBER=1 \
  -e DRONE_BUILD_STATUS=success \
  -e DRONE_BUILD_LINK=http://github.com/octocat/hello-world \
  -e DRONE_TAG=1.0.0 \
  goodwillaz/drone-slack
```

### Settings Support

* webhook
* template
* build_time_template
* completed_at_template
* started_template
* started
* debug

### Environment Variable Support

Here's a full list of environment variables supported by the plugin and how they can be used in the templates:

* PLUGIN_WEBHOOK
* PLUGIN_TEMPLATE
* PLUGIN_USERNAME_MAP
* PLUGIN_BUILD_TIME_TEMPLATE
* PLUGIN_COMPLETED_AT_TEMPLATE
* PLUGIN_STARTED_TEMPLATE
* PLUGIN_STARTED - `{{started}}`
* PLUGIN_DEBUG- `{{debug}}`
* DRONE_SYSTEM_PROTO - `{{system.proto}}`
* DRONE_SYSTEM_HOST - `{{system.host}}`
* DRONE_REPO_OWNER - `{{repo.owner}}`
* DRONE_REPO_NAME - `{{repo.name}}`
* DRONE_REPO_LINK - `{{repo.link}}`
* DRONE_TAG - `{{build.tag}}`
* DRONE_BUILD_NUMBER - `{{build.number}}`
* DRONE_BUILD_EVENT - `{{build.event}}`
* DRONE_BUILD_STATUS - `{{build.status}}`
* DRONE_DEPLOY_TO - `{{build.deployTo}}`
* DRONE_BUILD_LINK - `{{build.link}}`
* DRONE_BUILD_STARTED - `{{build.started}}`
* DRONE_BUILD_CREATED - `{{build.created}}`
* DRONE_BUILD_FINISHED - `{{build.finished}}`
* DRONE_COMMIT - `{{commit.hash}}`
* DRONE_COMMIT_REF - `{{commit.ref}}`
* DRONE_COMMIT_BRANCH - `{{commit.branch}}`
* DRONE_COMMIT_AUTHOR - `{{commit.author}}`
* DRONE_PULL_REQUEST - `{{commit.pull}}`
* DRONE_COMMIT_MESSAGE - `{{commit.message}}`
* DRONE_COMMIT_LINK - `{{commit.link}}`
* DRONE_JOB_STARTED - `{{job.started}}`
* DRONE_STEP_NUMBER - `{{job.step}}`
* DRONE_FAILED_STAGES = `{{build.failedStages}}`
* DRONE_FAILED_STEPS = `{{build.failedSteps}}`

### License

See the [LICENSE](LICENSE.md) file for license rights and limitations (BSD 3-clause).
