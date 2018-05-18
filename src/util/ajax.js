
function postJSON(url, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}


function getJSON(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {

                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send()
    })
}
function putJSON(url, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}

function deleteJSON(url, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("DELETE", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}


function UpladFile(file, productName, description, price, count, type) {
    // 接收上传文件的后台地址
    // FormData 对象
    return new Promise((resolve, reject) => {
        var form = new FormData();
        // 可以增加表单数据
        form.append("fileupload", file);
        form.append("productName", productName)
        form.append("description", description)
        form.append("price", price)
        form.append("count", count)
        form.append("type", type)
        var xhr = new XMLHttpRequest();

        xhr.open("post", "http://120.79.197.130:8080/admin/product/insertProduct", true);
        xhr.send(form);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
    })
}













export default { postJSON, getJSON, putJSON, deleteJSON, UpladFile };