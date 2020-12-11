/*
 * @description: 公共方法文件
 * @Author: duQings duqings@foxmail.com
 * @Date: 2020年12月11日11:31:04
 * @LastEditors: duQings duqings@foxmail.com
 * @LastEditTime: 2020-10-16 17:03:51
 * @FilePath: @/assets/scripts/base.js
 */

import {
  saveAs
} from 'file-saver'

let baseManage = {
  varTem: null,
  /**
   * 保存文件
   * @param {object} blob --> {
   *  blob.content: 文件内容;
   *  blob.type: 文件类型
   * }
   * @param {string} value 保存文件名
   */
  saveFile(blob, value) {
    this.blob = new Blob(blob.content, {
      type: blob.type
    });
    saveAs(this.blob, value);
  },
  /*
   * 产生任意长度随机字母数字组合
   * @param {boolean} randomFlag 是否任意长度 min 任意长度最小位[固定位数] max 任意长度最大位
   * @param {number} min 任意长度最小位[固定位数]
   * @param {number} max 任意长度最大位
   * randomFlag === false 时, 只需要一位长度即可
   * 
   */
  randomWord(randomFlag, min, max) {
    let str = "",
      range = min || 1,
      pos,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min; // 任意长度
    }
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }
}

export default baseManage