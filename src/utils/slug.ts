export function slugify(title:string){
    const slug = []
    for(let i=0;i<title.length;i++){
        if(i>30) break;
        let char = title[i].toLowerCase()
        if(char>="a" && char<="z")
        slug.push(char)
        else
        slug.push('-')

    }
    return slug.join('') as string
}