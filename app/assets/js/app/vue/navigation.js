var repos = new Vue({
    el: '#navBar',
    data: {
        isOpen: false,
    },
    created: function () {
        var WebP;
        WebP = new Image();
        WebP.onload = WebP.onerror = function () {
            var s, sc;
            if (WebP.height !== 2) {
                sc = document.createElement('script');
                sc.type = 'text/javascript';
                sc.async = true;
                s = document.getElementsByTagName('script')[0];
                sc.src = 'assets/js/webpjs.min.js';
                s.parentNode.insertBefore(sc, s);
            }
        }
        WebP.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    },
    methods: {
        open: function (e) {
            this.isOpen = true;
        },
        outside: function (e) {
            this.isOpen = false;
        },
    },
    directives: {
        'click-outside': {
            bind: function (el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                    const compName = vNode.context.name
                    let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
                    if (compName) {
                        warn += `Found in component '${compName}'`;
                    }

                    console.warn(warn)
                }
                // Define Handler and cache it on the element
                const bubble = binding.modifiers.bubble;
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e);
                    }
                }
                el.__vueClickOutside__ = handler;

                // add Event Listeners
                document.addEventListener('click', handler);
            },

            unbind: function (el, binding) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__);
                el.__vueClickOutside__ = null;

            }
        }
    }
})