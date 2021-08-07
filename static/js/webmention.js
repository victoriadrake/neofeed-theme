/* webmention.js

Simple thing for embedding webmentions from webmention.io into a page, client-side.

(c)2018-2020 fluffy (http://beesbuzz.biz)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

GitHub repo (for latest released versions, issue tracking, etc.):

    http://github.com/PlaidWeb/webmention.js

Basic usage:

<script src="/path/to/webmention.js" data-param="val" ... async />
<div id="webmentions"></div>

Allowed parameters:

    page-url:

        The base URL to use for this page. Defaults to window.location

    add-urls:

        Additional URLs to check, separated by |s

    id:

        The HTML ID for the object to fill in with the webmention data.
        Defaults to "webmentions"

    wordcount:

        The maximum number of words to render in reply mentions.

    max-webmentions:

        The maximum number of mentions to retrieve. Defaults to 30.

    prevent-spoofing:

        By default, Webmentions render using the mf2 'url' element, which plays
        nicely with webmention bridges (such as brid.gy and telegraph)
        but allows certain spoofing attacks. If you would like to prevent
        spoofing, set this to 1.

    sort-by:

        What to order the responses by; defaults to 'published'. See
        https://github.com/aaronpk/webmention.io#api

    sort-dir:

        The order to sort the responses by; defaults to 'up' (i.e. oldest
        first). See https://github.com/aaronpk/webmention.io#api

A more detailed example:

<script src="/path/to/webmention.js"
    data-id="webmentionContainer"
    data-wordcount="30"
    data-prevent-spoofing="1"
    />

*/

(function () {
  'use strict'

  function getCfg (key, dfl) {
    return document.currentScript.getAttribute('data-' + key) || dfl
  }

  const refurl = getCfg('page-url', window.location.href.replace(/#.*$/, ''))
  const addurls = getCfg('add-urls', undefined)
  const containerID = getCfg('data-id', 'webmentions')
  const textMaxWords = getCfg('wordcount')
  const maxWebmentions = getCfg('max-webmentions', 100)
  const mentionSource = getCfg('prevent-spoofing') ? 'wm-source' : 'url'
  const sortBy = getCfg('sort-by', 'published')
  const sortDir = getCfg('sort-dir', 'up')

  const reactTitle = {
    'in-reply-to': 'replied',
    'like-of': 'liked',
    'repost-of': 'reposted',
    'bookmark-of': 'bookmarked',
    'mention-of': 'mentioned',
    rsvp: 'RSVPed',
    'follow-of': 'followed'
  }

  const reactEmoji = {
    'in-reply-to': '',
    'like-of': '',
    'repost-of': '',
    'bookmark-of': '',
    'mention-of': '',
    rsvp: '',
    'follow-of': ''
  }

  const rsvpEmoji = {
    yes: '✅',
    no: '❌',
    interested: '💡',
    maybe: '💭'
  }

  function entities (text) {
    return text.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&quot;')
  }

  function reactImage (r) {
    const who = entities((r.author && r.author.name) ? r.author.name : r.url.split('/')[2])
    const response = reactTitle[r['wm-property']] || 'reacted'
    let html = '<a rel="nofollow ugc" title="' + who + ' ' + response + '" href="' + r[mentionSource] + '">'
    if (r.author && r.author.photo) {
      html += '<img class="webmention__author__img" src="' + entities(r.author.photo) + '">'
    }
    // html += (reactEmoji[r['wm-property']] )
    // if (r.rsvp && rsvpEmoji[r.rsvp]) {
    //   html += '<sub>' + rsvpEmoji[r.rsvp] + '</sub>'
    // }
    html += '</a>'

    return html
  }

  function publishDate (d) {
    const dateObj = new Date(d)
    const date = dateObj.toString()
    // var options = { month: 'long'}
    // let month = new Intl.DateTimeFormat('en-US', options).format(date)
    // let html = '<span class="webmention__date">" + date.getDay() + ' ' + month + ' ' + date.getFullYear() + '</span>'
    const html = '<span class="webmention__date">' + date.substr(0, 15) + '</span>'
    return html
  }

  // strip the protocol off a URL
  function stripurl (url) {
    return url.substr(url.indexOf('//'))
  }

  // Deduplicate multiple mentions from the same source URL
  function dedupe (mentions) {
    const filtered = []
    const seen = {}

    mentions.forEach(function (r) {
      // Strip off the protocol (i.e. treat http and https the same)
      const source = stripurl(r.url)
      if (!seen[source]) {
        filtered.push(r)
        seen[source] = true
      }
    })

    return filtered
  }

  function formatComments (comments) {
    let html = '<h2>Webmentions</h2><ul class="comments">'
    comments.forEach(function (c) {
      html += '<li><div class="webmention">'

      html += '<div class="webmention__meta"><a class="source" rel="nofollow ugc" href="' +
        c[mentionSource] + '">'
      if (c.author && c.author.name) {
        html += entities(c.author.name)
      } else {
        html += entities(c.url.split('/')[2])
      }

      html += '</a> ' + reactImage(c) + ' ' + publishDate(c.published) + '</div>'

      let linkclass
      let linktext
      if (c.content && c.content.text) {
        let text = entities(c.content.text)

        if (textMaxWords) {
          let words = text.replace(/\s+/g, ' ')
            .split(' ', textMaxWords + 1)
          if (words.length > textMaxWords) {
            words[textMaxWords - 1] += '&hellip;'
            words = words.slice(0, textMaxWords)
            text = words.join(' ')
          }
        }
        linkclass = 'text'
        linktext = text
      } else {
        linkclass = 'name'
        linktext = '(mention)'
      }

      html += '<div class="webmention__content ' + linkclass + '">' + linktext + '</div>'

      html += '</div></li>'
    })
    html += '</ul><div class="page-separator"><hr /></div>'

    return html
  }

  function formatReactions (reacts) {
    let html = '<h2>Appreciation</h2><ul class="reacts">'

    reacts.forEach(function (r) {
      html += '<li><div class="webmention">'
      html += reactImage(r)
    })

    return html
  }

  function getData (url, callback) {
    if (window.fetch) {
      window.fetch(url).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      }).then(function (response) {
        return response.json()
      }).then(callback).catch(function (error) {
        console.error('Request failed', error)
      })
    } else {
      const oReq = new XMLHttpRequest()
      oReq.onload = function (data) {
        callback(JSON.parse(data))
      }
      oReq.onerror = function (error) {
        console.error('Request failed', error)
      }
    }
  }

  window.addEventListener('load', function () {
    // const counter = document.getElementById('counter')
    const container = document.getElementById(containerID)
    if (!container) {
      // no container, so do nothing
      return
    }

    const pages = [stripurl(refurl)]
    if (addurls) {
      addurls.split('|').forEach(function (url) {
        pages.push(stripurl(url))
      })
    }

    let apiURL = 'https://webmention.io/api/mentions.jf2?per-page=' + maxWebmentions + '&sort-by=' + sortBy + '&sort-dir=' + sortDir

    pages.forEach(function (path) {
      apiURL += '&target[]=' + encodeURIComponent('http:' + path) +
        '&target[]=' + encodeURIComponent('https:' + path)
    })

    getData(apiURL, function (json) {
      let html = ''

      const comments = []
      const collects = []

      const mapping = {
        'in-reply-to': comments,
        'like-of': collects,
        'repost-of': collects,
        'bookmark-of': collects,
        'mention-of': comments,
        rsvp: comments
      }

      json.children.forEach(function (c) {
        const store = mapping[c['wm-property']]
        if (store) {
          store.push(c)
        }
      })

      // format the comment-type things
      if (comments.length > 0) {
        html += formatComments(dedupe(comments))
      }

      // format the other reactions
      if (collects.length > 0) {
        html += formatReactions(dedupe(collects))
      }
      container.innerHTML = html
      // Just show counts of webmentions
      //   const count = comments.length + collects.length
      //   if (count > 0) {
      //     counter.innerHTML = count
      //   }
    })
  })
}())