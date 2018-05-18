export function MP(ak) {
  return new Promise(function (resolve, reject) {

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=KCzp8claYra8uYAvahElV9oKUT6j7Gx1";
    script.onerror = reject;
    // 解决 后退后 百度地图加载不了
    script.onload = function () {
      resolve(BMap)
    }
    document.head.appendChild(script);
  })
}  