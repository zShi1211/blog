export default Vue => {
    // 懒加载
    (() => {
        const arr = [];
        let flag = true;
        let watchFn = null;
        Vue.directive('lazy', {
            inserted(el, binding, vnode) {
                const { value, arg = 0 } = binding;
                const obj = {
                    el,
                    value,
                    arg: +arg,
                }
                // 如果该图片已经太加载了就返回true
                const res = imgLoad(obj);
                if (!res) {
                    arr.push(obj)
                }
                if (flag) {
                    watchFn = vnode.context.$throttle(scrollWatch, 50)
                    window.addEventListener('scroll', watchFn)
                    flag = false
                }
            },
            unbind(el) {
                // 如果数组为空，就清楚对滚动的监听
                if (arr.length === 0) {
                    window.removeEventListener('scroll', watchFn)
                    flag = true
                } else {
                    // 元素被移除就不用监听他的图片加载
                    const index = arr.find(item => item.el === el);
                    arr.splice(index, 1);
                }
            }
        })

        function scrollWatch() {
            for (let i = 0; i < arr.length; i++) {
                const res = imgLoad(arr[i]);
                if (res) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }

        function imgLoad({ el, value, arg }) {
            const { top } = el.getBoundingClientRect();
            const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (top - clientHeight < arg) {
                const img = new Image();
                img.src = value;
                img.onload = () => {
                    el.src = value;
                }
                return true
            }
            return false
        }
    })()

}

