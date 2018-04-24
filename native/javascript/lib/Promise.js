(function() {
    var Promise = function(execute) {
        this.status = "pending"
        this.data = null
        this.error = null
        this.onFullFilledList = []
        this.onRejectedList = []
        var _self = this
        function resolve(data) {
            if(_self.status === "pending") {
                _self.status = "fullfilled"
                _self.data = data
            }
        }
        function reject(err) {
            if(_self.status === "pending") {
                _self.status = "rejected"
                _self.error = err
            }
        }
        execute(resolve, reject);
    }
    Promise.prototype.then = function(res, rej) {
        if(this.status === "fullfilled") {
            res && res(this.data);
            return;
        }
        if(this.status === "rejected") {
            rej && rej(this.error);
        }
    }
    Promise.prototype.catch = function(reject) {
        this.then(null, reject);
    }
    Promise.prototype.finally = function(finallyFunc) {
        if(this.status !== "pending") {
            finallyFunc();
        }
    }
    var test = function() {
        return new Promise(function(resolve, reject) {
            resolve("success");
        })
    }
    test().then(function(data) {
        console.log(data)
    }, function(err) {
        console.log(err)
    })
}.call(this))