// Proxy

window.obj = new Proxy({}, {
    set: function(target, property, value) {
        console.log(target, property, value)
        target[property] = value;
    }
})

