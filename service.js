/**
 * @file 小程序核心逻辑层
 * @author sunjuan
 */
(function (global) {
    let wx = {};
    let classMap = {};

    // 需要有一个核心的总控（service层）；
    // 需要有一个history,不停地推iframe，用iframe来模拟webview

    class Logic {
        navigateTo () {
            
        }
    }

    // 所有Page的基类
    class PageBase {
        constructor (id, uri) {
            this.uri = uri;//记一下，navigateTo的时候可以调用
            this.id = id;//同一个页面可能会被切进来多次
        }

        _render () {//小程序中没有，私有的
            global.__bridge.createView(1)
                .then(frame => {
                    this.$el = frame;
                });
        }

        setData () {

        }
    }

    const Page = (uri, options) => {
        classMap[uri] = options;
    };

    global.logic = new Logic();
})(window);