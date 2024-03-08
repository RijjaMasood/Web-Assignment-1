window.onload = init;

let applications = [];

function init() {
  document.getElementById("addJob").addEventListener("click", addJob);
  document
    .getElementById("applicationForm")
    .addEventListener("submit", handleSubmit);
  document
    .getElementById("viewApplications")
    .addEventListener("click", viewApplications);
}

let jobIndex = 0;
let EMP_History = [];

function addJob() {
  var companyName = document.getElementById("companyName").value;
  var employmentDates = document.getElementById("employmentDates").value;
  var jobResponsibilities = document.getElementById(
    "jobResponsibilities"
  ).value;

  var entry = document.createElement("div");
  entry.className = "entry";
  entry.innerHTML =
    "<strong>Company Name:</strong> " +
    companyName +
    "<br>" +
    "<strong>Employment Dates:</strong> " +
    employmentDates +
    "<br>" +
    "<strong>Job Responsibilities:</strong> " +
    jobResponsibilities +
    "<br><br>";

  EMP_History.push({ companyName, employmentDates, jobResponsibilities });
  document.getElementById("displayEntries").appendChild(entry);

  document.getElementById("companyName").value = "";
  document.getElementById("employmentDates").value = "";
  document.getElementById("jobResponsibilities").value = "";
}

function handleSubmit(event) {
  event.preventDefault();

  let formData = new FormData(event.target);
  let application = Object.fromEntries(formData);
  application.jobs = EMP_History;
  EMP_History = [];
  applications.push(application);

  document.getElementById("displayEntries").innerHTML = "";
  event.target.reset();
  console.log("Form submitted successfully!");
  console.log(application);
}

function viewApplications() {
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  let headers = Object.keys(applications[0]);
  headers.forEach((header) => {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.textContent = header;
    tr.appendChild(th);

    applications.forEach((application) => {
      let td = document.createElement("td");
      if (Array.isArray(application[header])) {
        application[header] = application[header].map((x) => JSON.stringify(x));
        td.textContent = application[header].join(", ");
      } else {
        td.textContent = application[header];
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  let applicationsTableDiv = document.getElementById("applicationsTable");
  applicationsTableDiv.innerHTML = "";
  applicationsTableDiv.appendChild(table);
}
