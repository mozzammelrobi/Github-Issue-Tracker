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

const loadSingleIssue = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleIssue(data.data))
    console.log(id)
}


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
            <div onclick="loadSingleIssue(${issue.id})"
            class="cart cursor-pointer h-full p-4 shadow-lg bg-white rounded-lg border-t-4 ${issue.status == 'open' ? 'border-green-600' : 'border-red-600'}">
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
const displaySingleIssue = (issue) => {
    const issueDetailsContainer = document.getElementById('issue-details-container')

      const date = new Date(issue.createdAt);
        const date2 = new Date(issue.updatedAt);
        const normalDate = date.toLocaleDateString('en-GB');
        const normalDate2 = date2.toLocaleDateString('en-GB');

    issueDetailsContainer.innerHTML = `
        <div>
              <h4 class=" text-[30px] font-bold">${issue.title}</h4>
              <p>${issue.description}</p>


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

               <div class="flex justify-between text-[12px]">
                        <p># <span>${issue.author}</span></p>
                        <p>${normalDate}</p>
                    </div>
                    <div class="flex justify-between text-[12px]">
                        <p><span>${issue.assignee}</span> </p>
                        <p>Update <span>${normalDate2}</span></p>
                    </div>
        </div>
    `
    console.log(issue)
    document.getElementById('issue_modal').showModal()
}

// filter out and display data with filter
const allBtns = document.querySelectorAll('.bnt-issues')
allBtns.forEach(btn => {
    const issueCartContainer = document.getElementById('issues-cart-container')
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    btn.addEventListener('click', (event) => {

        removeActive()
        // add active class when button is click
        const clickedBtn = event.target
        clickedBtn.classList.add('active')

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
                    // console.log(filterIssues)

                    displayAllIssues(filterIssues)

                })
        }
        if (clickBtn === 'closed') {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const allDatas = data.data

                    const filterIssues = allDatas.filter((data) => data.status === 'closed')
                    // console.log(filterIssues)

                    displayAllIssues(filterIssues)

                })
        }
    })
});


// search function empllement 
document.getElementById('search-btn').addEventListener('click', (event) => {
    const searchInput = document.getElementById('search-input')
    const search = searchInput.value;
    
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`
    console.log(url)

    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayAllIssues(data.data)
        removeActive()
    })
})

loadAllIssues()