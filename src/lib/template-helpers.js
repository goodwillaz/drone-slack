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

import humanizeDuration from 'humanize-duration';
import moment from 'moment-timezone';

export const duration = (started, finished) => humanizeDuration((finished - started) * 1000);

export const since = start => humanizeDuration(Date.now() - (start * 1000));

export const regexReplace = (pattern, input, replace) => input.replace(new RegExp(pattern, 'g'), replace);

export const substring = (input, start, end) => input.substring(start, end);

export function datetime (timestamp, format, zone) {
  if (typeof zone !== 'string' || zone.length === 0) {
    return moment.unix(timestamp).format(format);
  }

  if (moment.tz.zone(zone)) {
    return moment.unix(timestamp).tz(zone).format(format);
  }

  return moment.unix(timestamp).tz(moment.tz.guess()).format(format);
}

export function success (conditional, options) {
  if (conditional === undefined) {
    return options.inverse(this);
  }

  return conditional === 'success' ? options.fn(this) : options.inverse(this);
}

export function failure (conditional, options) {
  if (conditional === undefined) {
    return options.inverse(this);
  }

  return ['failure', 'error', 'killed'].includes(conditional) ? options.fn(this) : options.inverse(this);
}
