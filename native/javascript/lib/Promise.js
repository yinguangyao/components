(function() {
    const toString = Object.prototype.toString;
    const isArray = arr => {
        if(toString.call(arr) === "[object Array]") {
            return true;
        }
        return false;
    }
    function noop() {}
    const PENDING = "pending",
        RESOLVE = "resolve",
        REJECT = "reject"
    const handler = {
        resolve: (self, value) => {
            if(self.state == PENDING) {
                self.value = value;
                self.state = RESOLVE;
            }
        },
        reject: (self, value) => {
            if(self.state == PENDING) {
                self.value = value;
                self.state = REJECT;
            }
        }
    }
    const executeResolver = (self, resolver) => {
        let called = false
        const resolve = (value) => {
            if(!called) {
                called = true
                handler.resolve(self, value);
            }
        }
        const reject = (value) => {
            if(!called) {
                called = true
                handler.reject(self, value);
            }
        }
        resolver(resolve, reject);
    }
    class Promise {
        constructor(resolver) {
            if(typeof resolver !== "function") {
                throw new Error("the parameter of Promise must be a function")
            }
            this.queue = []
            this.value = void 0
            this.state = PENDING
            executeResolver(this, resolver);
        }

        static resolve() {

        }

        static all(arr) {

        }

        static race() {

        }

        then(resolve, reject) {
            const p = new Promise(noop);
            if(this.state == RESOLVE && resolve) {
                setTimeout(() => {
                    const value = resolve(this.value);
                    handler.resolve(p, value);
                }, 0)
                return p;
            }
            if(this.state == REJECT && reject) {
                setTimeout(() => {
                    const value = reject(this.value);
                    handler.reject(p, value);
                }, 0)
                return p;
            }
            return this;
        }

        catch(reject) {
            return this.then(null, reject);
        }

        finally() {

        }
    }
    window.Promise = Promise
}.call(this))