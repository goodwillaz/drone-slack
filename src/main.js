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

import logger from './lib/logger'
import Plugin from './plugin'

let config

try {
  config = require('./config/config')
} catch (e) {
  logger.error(e)
  process.exit(1)
}

if (config.debug === true) {
  logger.level = 'debug'
}

logger.debug(config); // eslint-disable-line semi

(async function () {
  try {
    await new Plugin().run(config)
  } catch (e) {
    logger.error(JSON.stringify(e))
    process.exit(1)
  }
})()
