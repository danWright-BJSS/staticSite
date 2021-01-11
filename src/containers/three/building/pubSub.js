let subscribers = {};
module.exports = {
    publish(e, d) {
        if (!subscribers[e]) return;
        subscribers[e].forEach(subscriberCallback =>
            subscriberCallback(d));
    },
    subscribe(e, c) {
        if (!subscribers[e]) {
            subscribers[e] = [];
        }
        subscribers[e].push(c);
    }
};