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

import axios from 'axios'
import fs from 'fs'
import Handlebars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import { fileURLToPath } from 'url'
import * as customHelpers from './template-helpers'

class Renderer {
  constructor (template) {
    this.template = template
    handlebarsHelpers([
      'array', 'collection', 'comparison', 'date', 'fs', 'inflection', 'match',
      'math', 'misc', 'number', 'object', 'path', 'regex', 'string', 'url', 'utils'
    ])
    Handlebars.registerHelper(customHelpers)
  }

  async render (context = {}) {
    return this
      .getTemplate()
      .then(template => Handlebars.compile(template)(context).trim())
  }

  async getTemplate () {
    try {
      const parsedUrl = new URL(this.template)

      if (['http:', 'https:'].includes(parsedUrl.protocol)) {
        return await axios.get(this.template)
      }

      if (parsedUrl.protocol === 'file:') {
        return fs.readFileSync(fileURLToPath(parsedUrl))
      }
    } catch (e) {
      // Do nothing, we'll just return the original template below
    }

    return this.template
  }
}

export default Renderer
