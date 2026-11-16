const createLevels = (levels) => {
    const HtmlLevels = levels.map((level) => `<span class="text-gray-600 px-2 bg-red-100 text-[12px] rounded-full">${level}</span>`)
    const elements = HtmlLevels.join(' ')

    return elements;
}

const removeActive = () => {
    document.getElementById('btn-all').classList.remove('active')
    document.getElementById('btn-open').classList.remove('active')
    document.getElementById('btn-closed').classList.remove('active')
}

const loadAllIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllIssues(data.data))
}


// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayAllIssues = (issues) => {
    document.getElementById('all-issues-count').innerText = issues.length

    const issueCartContainer = document.getElementById('issues-cart-container')
    issueCartContainer.innerHTML = ' '

    // console.log(issues)
    issues.forEach(issue => {
        const date = new Date(issue.createdAt);
        const date2 = new Date(issue.updatedAt);
        const normalDate = date.toLocaleDateString('en-GB');
        const normalDate2 = date2.toLocaleDateString('en-GB');

        const issueDiv = document.createElement('div')
        issueDiv.innerHTML = `
           <!-- cart one -->
            <div 
            class="cart h-full p-4 shadow-lg bg-white rounded-lg border-t-4 ${issue.status == 'open' ? 'border-green-600' : 'border-red-600'}">
                <div class="flex justify-between mb-3">
                    ${issue.status == 'open'
                ? '  <i class="fa-regular fa-circle-check text-green-600"></i>'
                : '   <i class="fa-regular fa-circle-check text-purple-600"></i>'
            }
                    <button 
                      class="px-2 ${issue.priority === 'high'
                ? ' bg-red-100'
                : issue.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-500 text-white'
            } text-red-500 rounded-full
                        ">
                             ${issue.priority}
                    </button>
                </div>
                <h4 class=" text-[14px] font-bold">${issue.title}</h4>
                <p class="text-gray-400 text-[12px] mb-3">${issue.description}</p>
                <div>
                
                    ${createLevels(issue.labels)}

                
                </div>
                <hr class="mt-3 opacity-50">

                <div class="mt-5">
                    <div class="flex justify-between text-[12px]">
                        <p># <span>${issue.author}</span></p>
                        <p>${normalDate}</p>
                    </div>
                    <div class="flex justify-between text-[12px]">
                        <p><span>${issue.assignee}</span> </p>
                        <p>Update <span>${normalDate2}</span></p>
                    </div>
                </div>
            </div>
        
        `
        issueCartContainer.appendChild(issueDiv)
    });
}

// filter out and display data with filter
const allBtns = document.querySelectorAll('.bnt-issues')
allBtns.forEach(btn => {
    const issueCartContainer = document.getElementById('issues-cart-container')
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    btn.addEventListener('click', (event) => {


        // const allButtons = document.getElementsByClassName('bnt-issues')
        // allButtons.classList.remove('active')
        // console.log(allButtons)

        removeActive()
        // add active class when button is click
        const clickedBtn = event.target
        clickedBtn.classList.add('active')
        console.log(clickedBtn)

        const clickBtn = event.target.innerText
        if (clickBtn === 'All') {
            fetch(url)
                .then(res => res.json())
                .then(data => displayAllIssues(data.data))
        }
        if (clickBtn === 'open') {
            issueCartContainer.innerHTML = ' '
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const allDatas = data.data

                    const filterIssues = allDatas.filter((data) => data.status === 'open')
                    console.log(filterIssues)

                    displayAllIssues(filterIssues)

                })
        }
        if (clickBtn === 'closed') {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const allDatas = data.data

                    const filterIssues = allDatas.filter((data) => data.status === 'closed')
                    console.log(filterIssues)

                    displayAllIssues(filterIssues)

                })
        }
    })
});

loadAllIssues()