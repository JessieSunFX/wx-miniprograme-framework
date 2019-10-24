/**
 * @file 小程序核心逻辑（推iframe）
 * @author sunjuan
 */

 class Bridge {
     createView (id) {//创建一个iframe,最后回调的时候通知外面

        return new Promise(resolve => {
            let frame = document.createElement('iframe');
            frame.src = './view.html';
            frame.id = id;
            frame.className = 'view';
            frame.onload = () => resolve(frame);
            document.body.appendChild(frame);
        })
     }

     /**
      * 逻辑层向视图层发消息
      * @param {String} [id] - 视图的唯一标识
      * @param {Object} [params] - 需要set的数据 
      */
     postMessage (id, params) {
        const target = document.querySelector(`#${id}`);
        target.contentWindow.postMessage(params);//H5,file协议下不能postMessage
     }

     onMessage (callback) {
         console.log('onmessage!!!');
         window.addEventListener('message', function (event) {
            console.log('receive-message:', event);
            callback && callback();
         });
     }
 }
 window.__bridge = new Bridge();