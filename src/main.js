// const $siteList = $('.siteList')
// const $lastLi = $siteList.find('li.last')
//
// const localData = localStorage.getItem('localData')
// const localDataObject = JSON.parse(localData)
//
// // const localData = window.localStorage.getItem('localData')
// // const localDataObject = JSON.parse(localData)
//
//
// const hashMap = localDataObject || [
//     { logo: 'A', url: 'https://www.acfun.cn' },
//     { logo: 'B', url: 'https://www.bilibili.com' }
// ]
//
// // const hashMap = localDataObject || [
// //         { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
// //         { logo: 'image', logoType: 'image', url: 'https://www.acfun.cn' }
// //     ]
// // 创建一个简化的url，利用正则消除内容
// const simplifyUrl = (url) => {
//     return url.replace('https://', '')
//         .replace('http://', '')
//         .replace('//', '')
//         .replace('www.', '')
//         .replace('/\/.*', '')
//         .replace('/\..*/', '')
//         .replace('.cn', '')
//         .replace('.com', '')
// }
//
// const render = () => {
//     $siteList.find('li:not(.last)').remove()
//         // hashMap给的两个参数 node(当前节点) index(当前节点的下标顺序)
//     hashMap.forEach((node, index) => {
//         const $li = $(`<li>
//           <div class="site">
//             <div class="logo">${node.logo[0]}</div>
//             <div class="link">${simplifyUrl(node.url)}</div>
//             <div class="close">
//                 <svg class="icon">
//                     <use xlink:href="#icon-close"></use>
//                 </svg>
//             </div>
//           </div>
//         </li>`).insertBefore($lastLi);
//         // 直接做到点击 li元素 跳转到相应的url
//         $li.on('click', () => {
//                 window.open(node.url)
//             })
//             // 解决点击 .more 元素也会同时点击 li 元素 ，阻止事件冒泡
//         $li.on('click', '.close', (e) => {
//             e.stopPropagation() // 阻止冒泡
//             hashMap.splice(index, 1)
//             render()
//         })
//     })
// }
// render()
//
// $('.addButton').on('click', () => {
//     let url = window.prompt('输入你要添加的网址')
//     if (url.indexOf('http') !== 0) {
//         url = 'https://' + url
//     }
//     hashMap.push({
//         logo: simplifyUrl(url)[0],
//         logoType: "text",
//         url: url
//     })
//     render()
// })
//
// // window.onbeforeunload = () => {
// //     console.log('页面关闭了')
// //     const string = JSON.stringify(hashMap)
// //     window.localStorage.setItem('localDate', string)
// //     console.log(localData)
// // }
//
// window.onbeforeunload = () => {
//     const string = JSON.stringify(hashMap) //把对象变成字符串
//     localStorage.setItem('localDate', string)
// }