
# Set a name for the current cache


cacheName = 'v1.30'

offlineUrl = '404.html';


# Default files to always cache
cacheFiles = []


##
# Function for the installing of the serivce worker
# @param { event } e
# @return {} none
##
self.addEventListener 'install', (e) ->
    # e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil caches.open(cacheName).then((cache) ->
        # Add all the default files to the cache
        cache.addAll [
            cacheFiles
            offlineUrl
        ]
    )
    # end e.waitUntil
    return


##
# Function for the push event of the serivce worker
# @param { event } e
# @return {} none
##
self.addEventListener 'push', (event) ->

    title = 'Hey'
    event.waitUntil self.registration.showNotification(title,
        body: 'Click to read the latest update'
        icon: './assets/images/196.png'
        tag: 'new-article')
    return


##
# Function for the activate event of the serivce worker
# @param { event } e
# @return {} none
##
self.addEventListener 'activate', (e) ->

    e.waitUntil caches.keys().then((cacheNames) ->
        Promise.all cacheNames.map((thisCacheName) ->
            # If a cached item is saved under a previous cacheName
            if thisCacheName != cacheName
                # Delete that cached file
                return caches.delete(thisCacheName)
            return
        )
    )
    # end e.waitUntil
    return


##
# Function for the notification click
# @param { event } e
# @return {} none
##
self.addEventListener 'notificationclick', (event) ->
    event.notification.close()
    url = './index.html?notification=true'
    event.waitUntil clients.matchAll(type: 'window').then((windowClients) ->
        i = 0
        while i < windowClients.length
            client = windowClients[i]
            if client.url == url and 'focus' of client
                return client.focus()
            i++
        if clients.openWindow
            return clients.openWindow(url)
        return
    )
    return


##
# Function for the fetch the scripts click
# @param { event } e
# @return {} none
##
self.addEventListener 'fetch', (event) ->
    #console.log event
    # request.mode = navigate isn't supported in all browsers
    # so include a check for Accept: text/html header.
    event.respondWith fetch(event.request).catch(->
        #console.log event.request
        caches.match event.request
    )
    return
