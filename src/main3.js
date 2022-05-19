const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const localData = localStorage.getItem('localData')
const localDataObject = JSON.parse(localData) //字符串变成对象

const isTouchDevice = 'ontouchstart' in document.documentElement
if (isTouchDevice) {
    document.body.style.minWidth = document.documentElement.clientWidth + 'px'
    document.body.style.minHeight = document.documentElement.clientHeight + 'px'
}

const hashMap = localDataObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('//', '')
        .replace('www.', '')
        .replace('/\/.*', '')
        .replace('/\..*/', '')
        .replace('.cn', '')
        .replace('.com', '')
}

const storage = () => {
    window.onbeforeunload = () => {
        const string = JSON.stringify(hashMap) //把对象变成字符串
        localStorage.setItem('localData', string)
    }
}

const iconWrapper = (node) => {
    if (node.logoType === 'text') {
        return `<div class="icon">${node.logo}</div>`
    } else if (node.logoType === 'svg') {
        return `<svg class="icon" aria-hidden="true">
        <use xlink:href=${node.logo}></use>`
    } else if (node.logoType === 'image') {
        return `<img class="icon" height="24" width="24" src='//www.google.com/s2/favicons?domain=${node.url}' alt="${node.title}"/>`
    }
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
          <div class="site">
            <div class="icon-wrapper">${iconWrapper(node)}</div>         
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>   
      </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
            changeIcon(node)
        })
        $li.on('click', '.close', (e) => {
            console.log('这里')
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1) //删除一个此网站
            render()
        })
    })
}
render()

$(".addButton").on("click", () => {
    let url = window.prompt("请问你要添加的网址是啥？");
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: `${title[0]}`, url: url, title: title, logoType: 'text' })
    storage()
    render()
});
// $(document).on('keypress', (e) => {
//     const { key } = e
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toLowerCase() === key) { //toLowerCase把字母变成小写
//             window.open(hashMap[i].url)
//         }
//     }
// })

function changeIcon(node) {
    if (node.logoType === 'text') {
        node.logoType = 'image'
    }
    storage()
}

let sf
let timer

const deleteIcon = () => {
    if (isTouchDevice) {
        return `
            <div class="close">
              <svg class="icon">
                <use xlink:href=#icon-close></use>
              </svg>
            </div>
            `
    } else {
        return `
            <div class="close2">
              <svg class="icon">
                <use xlink:href=#icon-close></use>
              </svg>
            </div>
            `
    }
}

if (isTouchDevice) {
    $li.on('touchend', '.close', (e) => {
        e.stopPropagation()
        $li.css('animation', 'scaleBack 0.7s linear 1 forwards')
        setTimeout(() => {
            hashMap.splice(index, 1)
            storage()
            render()
        }, 700)
    })
    $li.on('touchstart', (e) => {
        e.preventDefault()
        timer = Date.now()
        sf = setTimeout(() => {
            $siteList.find('li:not(.last)').each((index, node) => {
                node.classList.add('shake')
            })
            $('.close').css('display', 'block')
        }, 700)
    })
    $li.on('touchend', () => {
        timer = Date.now() - timer
        if (timer < 700) {
            clearTimeout(sf)
            changeIcon(node)
        }
        timer = 0;
    })
}