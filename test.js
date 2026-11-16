const createLevels = (levels) =>{
    const HtmlLevels =  levels.map((level) => `<span>${level}</span>`)
   const  elements =  HtmlLevels.join(' ')

    return elements;
}
const levesls = ['bug', 'help wanted']
createLevels(levesls)