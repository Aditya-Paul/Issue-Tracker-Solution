function submitIssue(){
    const getinfo = id => document.getElementById(id).value
    const description = getinfo("issueDescription")
    const severity = getinfo("issueSeverity")
    const assigned_To = getinfo("issueAssignedTo")
    const id = Math.floor(Math.random()* 100000000)
    const status = 'open'
    if(description.length == 0 || assigned_To.length == 0){
        alert("Please fill these field with valid information")
        document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
    }
    else{
        document.getElementById('add-issue').removeAttribute("data-target", "#emptyField") 
        
        const issue = {description, severity, assigned_To, id, status}
        let issues = []
        
        if(localStorage.getItem("getissue")){
            issues = JSON.parse(localStorage.getItem("getissue"))
        }
        issues.push(issue)
        localStorage.setItem("getissue", JSON.stringify(issues))
        console.log(issues)
    }
    fetchIssues()
}


//doing closeIssue
function closeIssue(id){
    let issues = JSON.parse(localStorage.getItem("getissue"))
    const data = issues.find(close => close.id == id)
    data.status = 'closed'
    // i add this strike on the destription after click on the close option
    data.description = `<strike>${data.description}</strike>`
    localStorage.setItem("getissue", JSON.stringify(issues))
    fetchIssues()
}

//another way of doing closeIssue
// function closeIssue(id){
//     let issues = JSON.parse(localStorage.getItem("getissue"))
//     let data = issues.find(function(close){
//         if (close.id == id){
//             close.status = 'closed'
//             close.description = `<strike>${close.description}</strike>`
//         }
//     })
//     localStorage.setItem("getissue", JSON.stringify(issues))
//     fetchIssues()
// }

// i add this part to count how many close iassue are there
//Please refresh the page after every click on the close button.
let issues = JSON.parse(localStorage.getItem("getissue"))
for (let i = 0; i < issues.length; i++) {
    let element = issues[i];
    let issuecount = document.getElementById('closeCount')
    if(element.status == "closed"){
        issuecount.innerHTML = parseFloat( issuecount.innerHTML) + 1
    }
}

//doing deleteIssue
function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem("getissue"))
    let data = issues.filter(x => x.id != id)
    localStorage.removeItem("getissue")
    localStorage.setItem("getissue", JSON.stringify(data))

    // i add this part, if you want to delete any closed issue and this will be automatically update
    const issuecount = document.getElementById('closeCount')
    let minus = issues.find( a => a.id == id )
        if (minus.status == "closed") {
            issuecount.innerHTML = parseFloat( issuecount.innerHTML) - 1
        }
    
    fetchIssues()
}
// fetch part
function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem("getissue"))
    let issuelist = document.getElementById ("issuesList")
    issuelist.innerHTML = ''

    for (let i = 0; i < issues.length; i++) {
        let {description, severity, assigned_To, id, status} = issues[i];
        
        issuelist.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assigned_To}</p>
                                <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                                <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                                </div>`;


                                let issuecount = document.getElementById('issueCount')
                                let count = issuesList.querySelectorAll('.well').length
                                issuecount.innerHTML = count
    }
}
fetchIssues()