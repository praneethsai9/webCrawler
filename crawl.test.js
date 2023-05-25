const {normalizeURL, getURLsFromHTML}=require('./crawl.js')
const {test,expect}=require('@jest/globals')

test('normalizeURL strip protocol',()=>{
    const input='https://blog.boot.dev/path/'
    const actual=normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)

})

test('normalizeURL strip traiiling slash',()=>{
    const input='https://blog.boot.dev/path/'
    const actual=normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)

})

test('normalizeURL capitals',()=>{
    const input='https://BLOG.boot.dev/path'
    const actual=normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)

})

test('normalizeURL strip http',()=>{
    const input='https://BLOG.boot.dev/path'
    const actual=normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)

})

test('Get URLs from HTML',()=>{
    const inputHTML=`
    <html>
    <body>
        <a href="https://blog.boot.dev/">Boot.dev Blog</a>
    </body>
</html>`
    const inputbaseURL=`https://blog.boot.dev`
    const actual=getURLsFromHTML(inputHTML,inputbaseURL)
    const expected=["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('Get URLs from HTML relative (relative means not link just a path)',()=>{
    const inputHTML=`
    <html>
    <body>
        <a href="/path/">
        Boot.dev Blog
        </a>
    </body>
</html>`
    const inputbaseURL=`https://blog.boot.dev`
    const actual=getURLsFromHTML(inputHTML,inputbaseURL)
    const expected=["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('Get URLs both)',()=>{
    const inputHTML=`
    <html>
    <body>
        <a href="https://blog.boot.dev/path1/">Boot.dev Blog path 1</a>
        <a href="/path2/">
        Boot.dev Blog path 2
        </a>
    </body>
</html>`
    const inputbaseURL=`https://blog.boot.dev`
    const actual=getURLsFromHTML(inputHTML,inputbaseURL)
    const expected=["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('Get URLs Invalid url',()=>{
    const inputHTML=`
    <html>
    <body>
        <a href="invalid">
        invalid URL
        </a>
    </body>
</html>`
    const inputbaseURL=`https://blog.boot.dev`
    const actual=getURLsFromHTML(inputHTML,inputbaseURL)
    const expected=[]
    expect(actual).toEqual(expected)
})