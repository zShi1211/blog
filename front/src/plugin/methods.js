export default Vue => {
    //防抖
    Vue.prototype.$debounce = (fn, duration = 100) => {
        let timer = null;
        return (...args) => {
            clearInterval(timer)
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, duration)
        }
    }
    //节流
    Vue.prototype.$throttle = (fn, duration = 100, immediately = false) => {
        if (immediately) {
            let t;
            // 首次立即执行
            return (...args) => {
                if (!t || Date.now() - t > duration) {
                    fn.apply(this, args)
                    t = Date.now();
                }
            }

        } else {
            let timer = null;
            return (...args) => {
                if (timer) {
                    return
                }
                timer = setTimeout(() => {
                    fn.apply(this, args)
                    timer = null
                }, duration)
            }
        }
    }

    // 让滚动条滚动到某一个元素
    /**
     * 
     * @param {*} el dom元素也可以是一个vue实列还可以时一个数字
     * @param {*} duration // 滚动所需要执行的时间
     * @param {*} offset // 默认顶部对齐，偏移量
     */
    Vue.prototype.$scroll2El = (el, duration = 400, offset = 60) => {
        let position;
        if (el instanceof Element) {
            // dom
            const { top } = el.getBoundingClientRect();
            position = top;
        } else if (typeof el ===  'number' && !isNaN(el)) {
            // 数字
            position = el - window.scrollY
        } else {
            // Vue实列
            el.$el && (el = el.$el);
            if (el) {
                const { top } = el.getBoundingClientRect();
                position = top;
            } else {
                position = 0;
            }
        }

        const num = Math.ceil(duration / 16);
        let count = 0;
        let timer = null;
        let itemDis = (position - offset) / num;
        timer = setInterval(() => {
            if (count >= num) {
                clearInterval(timer)
                return;
            }
            window.scrollBy(0, itemDis)
            count++;
        }, 16)
        // 返回一个清理函数
        return () => {
            clearInterval(timer)
        }
    }
}