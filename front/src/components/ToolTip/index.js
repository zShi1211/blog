import ToolTip from './ToolTip'
import Vue from 'vue'
const V = Vue.extend(ToolTip)
const messageWrapper = document.createElement('div');
messageWrapper.classList.add('tip-message');
document.body.appendChild(messageWrapper)
export default (type, msg) => {
    const tip = new V({
        el: document.createElement('div'),
        propsData: {
            type,
            msg
        }
    });
    messageWrapper.appendChild(tip.$el)
    setTimeout(()=>{
        tip.isShow = false;
    },1500)
}