/**
 * Copyright 2019 Goodwill of Central and Northern Arizona

 * Licensed under the BSD 3-Clause (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * https://opensource.org/licenses/BSD-3-Clause

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IncomingWebhook } from '@slack/webhook'
import { started, completed } from './config/payload'
import Renderer from './lib/renderer'

class Plugin {
  constructor (logger) {
    this.logger = logger
  }

  async run (config) {
    const payload = await this.getPayload(config)

    this.logger.debug(payload)

    return new IncomingWebhook(config.webhook).send(payload)
  }

  async getPayload (config) {
    if (config.started) {
      const payload = started
      payload.text = await this.renderTemplate(config.startedTemplate, config)
      return payload
    }

    const payload = completed

    // First block is the main text
    payload.text = await this.renderTemplate(config.template, config)
    payload.blocks[0].text.text = payload.text

    // Build Logs button
    payload.blocks[1].elements[0].url = config.build.link
    payload.blocks[1].elements[0].style = config.build.status === 'success' ? 'primary' : 'danger'

    // Build History
    payload.blocks[1].elements[1].url = await this.renderTemplate('{{server.proto}}://{{server.host}}/{{repo.owner}}/{{repo.name}}/', config)

    // Link to repo
    payload.blocks[2].elements[0].text = await this.renderTemplate('<{{repo.link}}|{{repo.owner}}/{{repo.name}}>', config)

    // Build time template
    payload.blocks[3].elements[0].text = await this.renderTemplate(config.buildTemplate, config)

    // Completed at template
    payload.blocks[3].elements[1].text = await this.renderTemplate(config.completedTemplate, config)

    return payload
  }

  async renderTemplate (template, config) {
    return new Renderer(template).render(config)
  }
}

export default Plugin
