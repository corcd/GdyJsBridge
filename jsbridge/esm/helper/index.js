var isIOS = function () {
    var reg = /iPhone|iPad|iPod/i;
    if (reg.test(window.navigator.userAgent)) {
        return true;
    }
    return false;
};
var isAndroid = function () {
    var reg = /Android|Linux/i;
    if (reg.test(window.navigator.userAgent)) {
        return true;
    }
    return false;
};
export { isIOS, isAndroid };
