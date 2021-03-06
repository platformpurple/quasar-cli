/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/
<%
function hash (str) {
  const name = str.replace(/\W+/g, '')
  return name.charAt(0).toUpperCase() + name.slice(1)
}

let QImports, QOptions = []
if (framework === 'all') {
  QImports = ', * as All'
  QOptions = ', {components: All, directives: All, plugins: All}'
}
else if (framework !== false) {
  let options = []
  ;['components', 'directives', 'plugins'].forEach(type => {
    if (framework[type]) {
      let items = framework[type].filter(item => item)
      if (items.length > 0) {
        QOptions.push(type + ': {' + items.join(',') + '}')
        options = options.concat(items)
      }
    }
  })
  if (options.length) {
    QImports = ', {' + options.join(',') + '}'
    QOptions = ', {' + QOptions.join(',') + '}'
  }
}
%>

<% if (supportIE) { %>
import 'quasar-framework/dist/quasar.ie.polyfills'
<% } %>

<%
extras && extras.filter(asset => asset).forEach(asset => {
%>
import 'quasar-extras/<%= asset %>'
<% }) %>

<%
if (animations) {
  if (animations === 'all') {
%>
import 'quasar-extras/animate'
<%
  }
  else {
    animations.filter(asset => asset).forEach(asset => {
%>
import 'quasar-extras/animate/<%= asset %>.css'
<%
    })
  }
}
%>

import 'quasar-app-styl'

<% css && css.filter(css => css).forEach(asset => { %>
import 'src/css/<%= asset %>'
<% }) %>

import Vue from 'vue'
import Quasar<%= QImports || '' %> from 'quasar'

Vue.config.productionTip = false
import App from 'src/App'

Vue.use(Quasar<%= QImports ? QOptions : '' %>)

<% if (framework && framework.i18n) { %>
import lang from 'quasar-framework/i18n/<%= framework.i18n %>'
Quasar.i18n.set(lang)
<% } %>
<% if (framework && framework.iconSet) { %>
import iconSet from 'quasar-framework/icons/<%= framework.iconSet %>'
Quasar.icons.set(iconSet)
<% } %>

import router from 'src/router'
<% if (store) { %>
import store from 'src/store'
<% } %>

const app = {
  el: '#q-app',
  router,
<% if (store) { %>store,<% } %>
  ...App
}

<% if (plugins) { %>
const plugins = []
<%
plugins.filter(asset => asset).forEach(asset => {
  let importName = 'plugin' + hash(asset)
%>
import <%= importName %> from 'src/plugins/<%= asset %>'
plugins.push(<%= importName %>)
<% }) %>
plugins.forEach(plugin => plugin({ app, router,<% if (store) { %> store,<% } %> Vue }))
<% } %>

<% if (ctx.mode.electron) { %>
import electron from 'electron'
Vue.prototype.$q.electron = electron
<% } %>

<% if (ctx.mode.pwa) { %>
import FastClick from 'fastclick'
// Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
<% } %>

<% if (ctx.mode.cordova) { %>
  <% if (ctx.target.ios) { %>
    // Needed only for iOS
    import FastClick from 'fastclick'
    document.addEventListener('DOMContentLoaded', () => {
      FastClick.attach(document.body)
    }, false)
  <% } %>
document.addEventListener('deviceready', () => {
Vue.prototype.$q.cordova = window.cordova
<% } %>

/* eslint-disable no-new */
new Vue(app)

<% if (ctx.mode.cordova) { %>
}, false) // on deviceready
<% } %>
