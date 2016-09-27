/**
 * 绘制正方体
 * @param  {Number} l   宽
 * @param  {Number} h   高
 * @param  {String|Object} key 颜色代码或三个面的图片
 * @return {Canvas Element}    生成好的Canvas元素
 */
function drawCube(l, h, key) {
	if (!validate(key)) {
		throw new Error("DrawCube: "+"the params is not valid");
		return false;
	}

	var _canvas = document.createElement("canvas");
	_canvas.width = l;
	_canvas.height = l;
	var _ctx = _canvas.getContext("2d");

	// 左面
    _ctx.beginPath();
    _ctx.setTransform(1, 0.5, 0, 1, 0, 0);
    if (typeof key == "string") {
    	_ctx.rect(0, l/4, l/2, h/2);
		_ctx.fillStyle = shadeColor(key, -10);
        _ctx.strokeStyle = key;
        _ctx.stroke();
        _ctx.fill();
    } else {
        _ctx.drawImage(key.left, 0, l/4, l/2, h/2);
    }
    // 右面
    _ctx.beginPath();
    _ctx.setTransform(1, -0.5, 0, 1, 0, 0);
    if (typeof key == "string") {
    	_ctx.rect(l/2, 3*l/4, l/2, h/2);
		_ctx.fillStyle = shadeColor(key, 10);
        _ctx.strokeStyle = shadeColor(key, 50);
        _ctx.stroke();
        _ctx.fill();
    } else {
        _ctx.drawImage(key.right, l/2, 3*l/4, l/2, h/2);
    }
    
    // 顶部
    _ctx.beginPath();
    _ctx.setTransform(1, 0, 0, 1, 0, l/4);
    var __canvas = document.createElement("canvas");
    var __ctx = __canvas.getContext("2d");
    __ctx.beginPath();
    __ctx.setTransform(1, 0, 0.6, 0.8, 0, 0);
    if (typeof key == "string") {
    	__ctx.rect(0, 0, l*Math.sqrt(5)/4, l*Math.sqrt(5)/4);
    	__ctx.fillStyle = shadeColor(key, 20);
        __ctx.strokeStyle = shadeColor(key, 60);
        __ctx.stroke();
        __ctx.fill();
    } else {
	    __ctx.drawImage(key.top, 0, 0, l*Math.sqrt(5)/4, l*Math.sqrt(5)/4);
    }
    _ctx.rotate(-Math.asin(1/Math.sqrt(5)));
	_ctx.drawImage(__canvas, 0, 0);

	return _canvas;
    
	function shadeColor(color, percent) {
		color = color.substr(1);
		var num = parseInt(color, 16),
			amt = Math.round(2.55 * percent),
			R = (num >> 16) + amt,
			G = (num >> 8 & 0x00FF) + amt,
			B = (num & 0x0000FF) + amt;
		return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
	}

	function validate(key) {
		if (typeof key == "string") {
			var pattern = /^\#\w{6}$/;
			return pattern.exec(key);
		} else {
			if (typeof key != "object") {
				return false;
			} else {
				for (var index in key) {
					if (!key[index].nodeType || key[index].tagName.toUpperCase() != "IMG") return false;
				}
			}
		}
		return true;
	}
}