const monthWord = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
export default (date) =>{
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate().toString().padStart(2, 0);
    return `${monthWord[month]} ${day},  ${year}`;
}