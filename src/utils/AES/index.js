/**
 * AES 加密类
 * 
 * 注:
 * 1. 一定要在改文件中引用 vue 和 crypto-js;
 * 2. 两个方法中的第一个参数 word 是待加密或解密的字符串, 第二个参数 keyStr 是 aes 加密需要用到的16位字符串的 key;
 * 3. 如果想对一个 js 对象加密, 需要先把该对象转成 json字符串
 * 
 * 导入: import AES from '@/utils/AES/index'
 * 使用:
 *  加密: AES.encrypt('wantEncryptString', 'hAw6eqnFLKxpsDv3');
 *  解密: AES.decrypt('wantEncryptString', 'hAw6eqnFLKxpsDv3');
*/

import Vue from 'vue'
import CryptoJS from 'crypto-js'

export default {
  encrypt(word, keyStr) { //* 加密
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  },
  //* 解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}