const md5 = require('md5')

class Utils {
    static encodeUrl(url){
        if(!url && !url.length) {
            return;
        }
        return md5(url)
    }

    static decodeUrl(key){}
}

module.exports = {Utils}