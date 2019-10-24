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

        init () {
            this.uniqIndex = 0;//必须在navigateTo前初始化uniqIndex
            const firstPageUri = window.appJson.pages[0];
            this.navigateTo(firstPageUri);
        }

        _generateUniqId () {
            return `id${this.uniqIndex++}`;
        }
        
        navigateTo (uri) {
            const PageClass = classMap[uri];//拿配置
            //new完以后自己就往上挂了
            const page = new PageClass(this._generateUniqId(), uri);//id 同一个uri可能会被切进来多次，要区分开，否则setData都不知道改哪个 
        }
    }

    // 所有Page的基类
    class PageBase {
        constructor (id, uri) {
            this.uri = uri;//记一下，navigateTo的时候可以调用
            this.id = id;//同一个页面可能会被切进来多次
            this._initData();//在整个Page创建的时候就调用_initData，这样就创建了一个实例上的data
            this._render()
                .then(() => {//_render是个异步过程，iframe load完了再发消息
                    global.__bridge.postMessage(this.id, {
                        type: 'initSet',
                        data: this.data
                    });
                });
        }

        _initData () {
            //让开发者写配置时定义的类（原型）继承PageBase，这样PageBase天然就有个data
            this.data = JSON.parse(JSON.stringify(this.data || {}));
        }

        _render () {//小程序中没有，私有的
            return global.__bridge.createView(this.id)
                .then(frame => {
                    this.$el = frame;
                });
        }

        setData () {

        }
    }

    //让开发者定义Page时传进来的类继承PageBase
    const createPageClass = options => {
        class Page extends PageBase {
            constructor (...args) {
                super(...args);
            }
        }
        Object.assign(Page.prototype, options);
        return Page;
    };
    
    const Page = (uri, options) => {
        //在每次调用Page的时候，会把Page传进来的类记一下，但不立马执行
        //因为这些js都定义过Page,也有定义Component的，不能说定义了Page都往里推
        // how to 推？--》app.json文件
        classMap[uri] = createPageClass(options);//创建一个类，用options做原型；
    };

    global.logic = new Logic();
    global.Page = Page;
})(window);