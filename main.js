process.argv

const {crawlPage}=require('./crawl.js')

function main(){
    if (process.argv.length<3){
        console.log("No website given")
        process.exit(1)
    }else if(process.argv.length>3){
            console.log("Too many arguments")
            process.exit(1)
    }
    const baseURL=process.argv[2]

    console.log(`starting crawl of ${baseURL}`)
    crawlPage(baseURL)
}

main()