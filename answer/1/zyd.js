function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var self = this;
        //这里是通过对一个对象进行遍历，对这个对象的所有属性都进行监听
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data, key, val) {
      // 递归遍历所有子属性
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter () {
                
                return val;
            },
            set: function setter (newVal) {
                if (newVal === val) {
                    return;
                }
		console.log(val,newVal)
                val = newVal;
              // 新的值是object的话，进行监听
                childObj = observe(newVal);
		
  
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};
var data = {name: '1212'};
observe(data);
data.name = 'satin520';

