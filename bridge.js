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
 }
//test
 window.__bridge = new Bridge();