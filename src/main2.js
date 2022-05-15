//点击添加网站 - 弹出输入网址
// $('.addButton').on('click', () => {
//         let url = window.prompt('输入你要添加的网址')

//         if (url.indexOf('http') !== 0) {
//             url = 'https://' + url
//         }


//         const $siteList = $('.siteList')
//             //在siteList里面找li.last
//         const $lastLi = $siteList.find('li.last')
//             //创建一个新的li样式 然后插在lastLi的前面
//         const $li = $(`<li>
//       <div class="site">
//         <div class="logo">${url[0]}</div>
//         <div class="link">${url}</div>
//       </div>
//     </li>`).insertBefore($lastLi)
//     })
//用数据结构存下当前网站（数组）hashMap
// const hashMap = [
//     { logo: 'A', url: 'https//:www.acfun.cn' },
//     { logo: 'A', url: 'https//:www.acfun.cn' },
// ]

//  此时我们需要将这两个网站永久存在数据中，然后用到hashMap这个数据类型 来储存这两个网站
//此时遇到logo类型 是文字还是图片 所有我们需要加入logo的类型
// const hashMap = [
//     { logo: 'A', logoType: 'text', url: 'https//:www.acfun.cn' },
//     { logo: 'image', logoType: 'image', url: 'https//:www.acfun.cn' },
// ]

// 用hashMap遍历这个数组(.forEach)
//  node 表示此节点（数组）的任何一个
//  node.url 表示数组里面的url 
//  node.logo 表示数组里面的logo
// hashMap.forEach(node => {
//         const $li = $(`<li>
//     <a href="${node.url}">
//       <div class="site">
//         <div class="logo">${node.logo}</div>
//         <div class="link">${node.url}</div>
//       </div>
//     </a>  
//     </li>`)
//     })
//  !!! 注意的是，此时这两个li是不同的，都需要用到，因为一个是为了储存两个网站，一个是为了创建一个新的网站


//  最终代码，需要将$siteList 和 $lastLi 放到全局变量上
// const $siteList = $('.siteList')
// const $lastLi = $siteList.find('li.last')

// const hashMap = [
//     { logo: 'A', logoType: 'text', url: 'https//:www.acfun.cn' },
//     { logo: 'image', logoType: 'image', url: 'https//:www.acfun.cn' },
// ]

// $('.addButton').on('click', () => {
//     let url = window.prompt('输入你要添加的网址')
//     if (url.indexOf('http') !== 0) {
//         url = 'https://' + url
//     }
//     const $li = $(`<li>
//       <div class="site">
//         <div class="logo">${url[0]}</div>
//         <div class="link">${url}</div>
//       </div>
//     </li>`).insertBefore($lastLi)
// })

// hashMap.forEach(node => {
//     const $li = $(`<li>
//     <a href="${node.url}">
//       <div class="site">
//         <div class="logo">${node.logo}</div>
//         <div class="link">${node.url}</div>
//       </div>
//     </a>  
//     </li>`).insertBefore($lastLi)
// })

// 代码演炼
// $('.addButton').on('click', () => {
//         let url = window.prompt('输入你要添加的网址')
//         if (url.indexOf('http') !== 0) {
//             url = 'https://' + url
//         }
//         const $li = $(`<li>
//       <div class="site">
//         <div class="logo">${url[0]}</div>
//         <div class="link">${url}</div>
//       </div>
//     </li>`).insertBefore($lastLi)
//     })
// 不再创建一个li
// 而是直接hashMap添加===hashMap.push
// hashMap.push({
//         logo: url[0],
//         logoType: "text",
//         url: url
//     })
//  演炼之后
// $('.addButton').on('click', () => {
//     let url = window.prompt('输入你要添加的网址')
//     if (url.indexOf('http') !== 0) {
//         url = 'https://' + url
//     }
//     hashMap.push({
//         logo: url[0],
//         logoType: "text",
//         url: url
//     })
// })

//其实就是什么也不管 将页面中所有的siteList都删掉，唯独不删最后一个last
// $siteList.find('li:not(.last)').remove()

//代码重复，创建一个函数render
// const render = () => {
//     将 ... 移到这
//     $siteList.find('li:not(.last)').remove()
//     hashMap.forEach(node => {
//         const $li = $(`<li>
//         <a href="${node.url}">
//           <div class="site">
//             <div class="logo">${node.logo}</div>
//             <div class="link">${node.url}</div>
//           </div>
//         </a>  
//         </li>`).insertBefore($lastLi)
//     })
// }

//  最终代码
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const hashMap = [
    { logo: 'A', logoType: 'text', url: 'https//:www.acfun.cn' },
    { logo: 'image', logoType: 'image', url: 'https//:www.acfun.cn' },
]

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(node => {
        const $li = $(`<li>
        <a href="${node.url}">
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${node.url}</div>
          </div>
        </a>  
        </li>`).insertBefore($lastLi)
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('输入你要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: url[0],
        logoType: "text",
        url: url
    })
    render()
})