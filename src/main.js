const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const hashMap = [
        { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
        { logo: 'image', logoType: 'image', url: 'https://www.acfun.cn' },
    ]
    // 创建一个简化的url，利用正则消除内容
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('//', '')
        .replace('www.', '')
        .replace('/\/.*', '')
        .replace('/\..*/', '')
        .replace('.cn', '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(node => {
        const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
          </div>
        </a>  
        </li>`).insertBefore($lastLi)
            // 直接做到点击 li元素 跳转到相应的url
        $li.on('click', () => {
            window.open(node.url)
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('输入你要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: "text",
        url: url
    })
    render()
})