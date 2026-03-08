let allIssues = [];

const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      displayIssues(allIssues);
    });
};

const displayIssues = (issues) => {

  const container = document.getElementById("issue-container");
  const issueCount = document.getElementById("issue-count");

  container.innerHTML = "";
  issueCount.innerText = issues.length + " Issues";

  for (let issue of issues) {

    const labelsHTML = issue.labels.map(label =>
      `<span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">${label}</span>`
    ).join(" ");

    const border =
      issue.status === "open"? "border-green-500": "border-purple-500";

    const div = document.createElement("div");

    div.className = `bg-white p-4 rounded shadow border-t-4 ${border}`;
    div.onclick = () => modal(issue);
    div.innerHTML = `
      <div class ="flex justify-between">
      <p class="text-xs font-bold mt-2 text-green-600"> ${issue.status}</p>
      <h1 class="font-semibold mb-2 bg-red-200 w-[70px] rounded-md text-center">${issue.priority}</h1>
      </div>
      <h3 class="font-semibold mb-2">${issue.title}</h3>

      <p class="text-gray-500 text-sm mb-3">${issue.description}</p>

      <div class="flex gap-2 mb-3 flex-wrap">
        ${labelsHTML}
      </div>
    
      <p class="text-xs text-gray-400">#: ${issue.author}</p>
      <p class="text-xs font-semibold mt-2 text-[#64748B]"> ${issue.createdAt}
      </p>
    `;

    container.appendChild(div);
  }
};

// modal add  / /
const labelContainer = document.getElementById("modal-labels");

const modal = (issue) =>{
  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-description").innerText = issue.description;
  document.getElementById("modal-author").innerText = issue.author;
  document.getElementById("modal-date").innerText = issue.createdAt;
  document.getElementById("modal-status").innerText= issue.status;
  document.getElementById("modal-priority").innerText= issue.priority;
  


labelContainer.innerHTML = issue.labels
.map(label => `<span class="badge badge-warning">${label}</span>`).join(" ");

  document.getElementById("my_modal_5").showModal();
}




const showAll = () => {
  displayIssues(allIssues);
};

const showOpen = () => {
  const open = allIssues.filter(issue => issue.status === "open");
  displayIssues(open);
};

const showClosed = () => {
  const closed = allIssues.filter(issue => issue.status === "closed");
  displayIssues(closed);
};


const searchIssue = () => {

  const text = document.getElementById("search").value.toLowerCase();

  if (text === "") {
    displayIssues(allIssues);
    return;
  }

  const result = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(text)
  );

  displayIssues(result);

};

document.getElementById("search-btn").addEventListener("click", () => {

const text = document
.getElementById("search-input")
.value
.toLowerCase();

if(text === ""){
displayIssues(allIssues);
return;
}

const result = allIssues.filter(issue =>

issue.title.toLowerCase().includes(text) ||

issue.description.toLowerCase().includes(text) ||

issue.author.toLowerCase().includes(text)

);

displayIssues(result);

});
loadIssues();