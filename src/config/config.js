import convict from 'convict'

const config = convict({
  debug: {
    format: Boolean,
    doc: 'Debug',
    default: false,
    arg: 'debug',
    env: 'PLUGIN_DEBUG'
  },
  server: {
    proto: {
      format: String,
      doc: 'Drone server protocol',
      default: 'http',
      arg: 'server-proto',
      env: 'DRONE_SERVER_PROTO'
    },
    host: {
      format: String,
      doc: 'Drone server hostname',
      default: '',
      arg: 'server-host',
      env: 'DRONE_SERVER_HOST'
    }
  },
  repo: {
    owner: {
      format: String,
      doc: 'Repo owner',
      default: '',
      arg: 'repo-owner',
      env: 'DRONE_REPO_OWNER'
    },
    name: {
      format: String,
      doc: 'Repo name',
      default: '',
      arg: 'repo-name',
      env: 'DRONE_REPO_NAME'
    },
    link: {
      format: String,
      doc: 'Repo link',
      default: '',
      arg: 'repo-link',
      env: 'DRONE_REPO_LINK'
    }
  },
  build: {
    tag: {
      format: String,
      doc: 'Build tag',
      default: '',
      arg: 'build-tag',
      env: 'DRONE_TAG'
    },
    number: {
      format: Number,
      doc: 'Build number',
      default: '',
      arg: 'build-number',
      env: 'DRONE_BUILD_NUMBER'
    },
    event: {
      format: String,
      doc: 'Build event',
      default: '',
      arg: 'build-event',
      env: 'DRONE_BUILD_EVENT'
    },
    status: {
      format: String,
      doc: 'Build status',
      default: '',
      arg: 'build-status',
      env: 'DRONE_BUILD_STATUS'
    },
    deployTo: {
      format: String,
      doc: 'Deploy to environment',
      default: '',
      arg: 'deploy-to',
      env: 'DRONE_DEPLOY_TO'
    },
    link: {
      format: String,
      doc: 'Build link',
      default: '',
      arg: 'build-link',
      env: 'DRONE_BUILD_LINK'
    },
    started: {
      format: 'integer',
      doc: 'Build started',
      default: 0,
      arg: 'build-started',
      env: 'DRONE_BUILD_STARTED'
    },
    created: {
      format: 'integer',
      doc: 'Build created',
      default: 0,
      arg: 'build-created',
      env: 'DRONE_BUILD_CREATED'
    },
    finished: {
      format: 'integer',
      doc: 'Build finished',
      default: 0,
      arg: 'build-finished',
      env: 'DRONE_BUILD_FINISHED'
    }
  },
  commit: {
    hash: {
      format: String,
      doc: 'Commit hash',
      default: '',
      arg: 'commit-hash',
      env: 'DRONE_COMMIT'
    },
    ref: {
      format: String,
      doc: 'Commit ref',
      default: '',
      arg: 'commit-ref',
      env: 'DRONE_COMMIT_REF'
    },
    branch: {
      format: String,
      doc: 'Commit branch',
      default: '',
      arg: 'commit-branch',
      env: 'DRONE_COMMIT_BRANCH'
    },
    author: {
      format: String,
      doc: 'Commit author',
      default: '',
      arg: 'commit-author',
      env: 'DRONE_COMMIT_AUTHOR'
    },
    pull: {
      format: String,
      doc: 'Pull Request',
      default: '',
      arg: 'commit-pull',
      env: 'DRONE_PULL_REQUEST'
    },
    message: {
      format: String,
      doc: 'Commit message',
      default: '',
      arg: 'commit-message',
      env: 'DRONE_COMMIT_MESSAGE'
    },
    link: {
      format: String,
      doc: 'Commit link',
      default: '',
      arg: 'commit-link',
      env: 'DRONE_COMMIT_LINK'
    }
  },
  job: {
    started: {
      format: 'integer',
      doc: 'Job started',
      default: 0,
      arg: 'job-started',
      env: 'DRONE_JOB_STARTED'
    },
    step: {
      format: Number,
      doc: 'Step number',
      default: 1,
      arg: 'job-step',
      env: 'DRONE_STEP_NUMBER'
    }
  },
  webhook: {
    format: String,
    doc: 'Slack webhook url',
    default: null,
    arg: 'webhook',
    env: 'PLUGIN_WEBHOOK'
  },
  template: {
    format: String,
    doc: 'Slack template',
    default: `
{{#success build.status}}
    Build *succeeded* for \`{{commit.branch}}\` @ \`<{{commit.link}}|{{substring commit.hash 0 8}}>\` by @{{commit.author}}
{{else}}
    Build *failed* for \`{{commit.branch}}\` @ \`<{{commit.link}}|{{substring commit.hash 0 8}}>\` by @{{commit.author}}
{{/success}}
`,
    arg: 'template',
    env: 'PLUGIN_TEMPLATE'
  },
  buildTemplate: {
    format: String,
    doc: 'Slack template',
    default: 'Build time: {{duration build.started build.finished}}',
    arg: 'build-template',
    env: 'PLUGIN_BUILD_TIME_TEMPLATE'
  },
  completedTemplate: {
    format: String,
    doc: 'Slack template',
    default: 'Completed at {{datetime build.finished "MMM Do, Y h:mm::ss a"}}',
    arg: 'completed-template',
    env: 'PLUGIN_COMPLETED_AT_TEMPLATE'
  },
  started: {
    format: Boolean,
    doc: 'Beginning Build',
    default: false,
    arg: 'started',
    env: 'PLUGIN_STARTED'
  },
  startedTemplate: {
    format: String,
    doc: 'Started slack template',
    default: 'Build *started* for <{{repo.link}}|{{repo.owner}}/{{repo.name}}> on `{{commit.branch}}` @ `<{{commit.link}}|{{substring commit.hash 0 8}}>`',
    arg: 'started-template',
    env: 'PLUGIN_STARTED_TEMPLATE'
  }
})

// Perform validation
config.validate({ allowed: 'strict' })

export default config.getProperties()
