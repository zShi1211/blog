import avatar1 from "@/assets/img/avatar/1.jpg";
import avatar2 from "@/assets/img/avatar/2.jpg";
import avatar3 from "@/assets/img/avatar/3.jpg";
import avatar4 from "@/assets/img/avatar/4.jpg";
import avatar5 from "@/assets/img/avatar/5.jpg";
import avatar6 from "@/assets/img/avatar/6.jpg";
import avatar7 from "@/assets/img/avatar/7.jpg";
import avatar8 from "@/assets/img/avatar/8.jpg";
import avatar9 from "@/assets/img/avatar/9.jpg";
import avatar10 from "@/assets/img/avatar/10.jpg";
const arr = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10
]

export default () => {
    const num = Math.floor(Math.random() * arr.length)
    return arr[num]
}