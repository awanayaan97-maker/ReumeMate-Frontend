

const API_URL = "https://resume-mate-olive.vercel.app"

document.getElementById('close-popup').onclick = function() {
document.getElementById('ai-info-popup').classList.remove('show');
};

const jobTitleInput2 = document.getElementById('jobTitleInput2');

jobTitleInput2.addEventListener('input', (e) => {
document.getElementById('previewJobTitle2').innerText = e.target.value;
});

const allInputs = document.querySelectorAll('[data-preview]');
console.log(allInputs);

allInputs.forEach(input => {
input.addEventListener('input', (e) => {
        
const targetId = input.getAttribute('data-preview'); 
        
const targetElement = document.getElementById(targetId);
        
if (targetElement) {
targetElement.innerText = input.value;
 }

});
});

function showPopup(message) {
const popup = document.getElementById('ai-info-popup');
const textElement = document.getElementById('popup-text');

textElement.innerHTML = message;

popup.classList.add('show');
    
setTimeout(() => {
popup.classList.remove('show');
}, 7000);
}

async function descriptionEnhance(description, jobTitle, companyName, id){

if (!description.value || !jobTitle.value || !companyName.value) {
showPopup("Please enter your Job Title and Company Name so AI can write a much better description for you!");
return
}

try {
    
let experienceDetails = {
    description: description.value,
    jobTitle: jobTitle.value,
    companyName:companyName.value
}

let response = await fetch(`${API_URL}/api/gemini/description`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(experienceDetails)
});

let data = await response.json();
console.log(data, "ye data hai");

if (response.ok === true) {
    const { point1, point2, point3 } = data.enhanceData;
    const fullDescription = `${point1}\n${point2}\n${point3}`;

    description.value = fullDescription;
    let targetContainerId = (id === 1) ? 'previewDescriptionContainer' : 'previewDescriptionContainer2'
            
    handleDescriptionUpdate(fullDescription, targetContainerId);
    }

    else {
    showPopup("AI failed to enhance description.");
    }
}


catch (error) {
console.log(error);    
}
}

let AiBtn = document.getElementById("AiBtn");
AiBtn.addEventListener("click", async function(){

let proSummery = document.getElementById("proSummery");
let workTitle = document.getElementById("workTitle");
let previewSummary = document.getElementById("previewSummary");

if (!proSummery.value) {
    showPopup(`
        Please enter your Professional Title (e.g., Full Stack Developer) 
        to help AI craft a high-impact summary tailored to your career.
    `);
    return
}

if (!workTitle.value) {
    showPopup(`
        Please enter your Professional Title (e.g., Full Stack Developer) 
        to help AI craft a high-impact summary tailored to your career.
    `)
    return
}

let summaryObj = {summary:proSummery.value, title: workTitle.innerText};
try {
    
let response = await fetch(`${API_URL}/api/gemini/summary`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(summaryObj)
});

let data = await response.json();
console.log(data);

if (response.ok === true) {
    proSummery.value = data.data.summary
   handleDescriptionUpdate(data.data.summary, 'previewSummary');
}

else{
    showPopup("AI failed to enhance description.");
}

}

catch (error) {
console.log(error);
    
}

})


let descriptionAiBtn = document.getElementById("descriptionAiBtn");
descriptionAiBtn.addEventListener("click", function(){
let id = 1
let description = document.getElementById("description");
let jobTitle = document.getElementById("jobTitle");
let companyName = document.getElementById("companyName");
descriptionEnhance(description, jobTitle, companyName, id)
})

let enhanceAI2 = document.getElementById("enhanceAI2");
enhanceAI2.addEventListener("click", function(){
let id = 2
let description2 = document.getElementById("description2");
let companyInput2 = document.getElementById("companyInput2");
let jobTitleInput2 = document.getElementById("jobTitleInput2");

descriptionEnhance(description2, jobTitleInput2, companyInput2, id)

})


async function addResume() { 
    const allInputs = document.querySelectorAll('[data-preview]');
    console.log(allInputs);

    let resumeData = {};
    let hasError = false;

    const skillContainer = document.getElementById("skillContainer");
    const proSkills = document.getElementById("proSkills");
    
    if (skillContainer && skillContainer.innerText.trim() === "") {
        if (proSkills) proSkills.style.border = "2px solid red";
        hasError = true;
    } 
    else {
        if (proSkills) proSkills.style.border = "";
    }

    allInputs.forEach(function(input) {
        if (input.offsetParent === null) {
            input.style.border = "";
            return;
        }

      
        if (input.tagName === "INPUT" || input.tagName === 'TEXTAREA') {
            if (input.value.trim() === "") {
                input.style.border = "2px solid red";
                hasError = true;
            } else {
                input.style.border = ""; 
            }
        }

        if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
            resumeData[input.name] = input.value;
        } else {
            let tagKey = input.getAttribute('data-preview');
            let textVal = input.innerText.trim();
            if (tagKey === "PreviewSkills") {
                resumeData[tagKey] = textVal.split('•').map(s => s.trim()).filter(s => s !== "");
            } else {
                resumeData[tagKey] = textVal;
            }
        }
    });

    if (hasError) {
        showPopup("Please complete all required fields before continuing.");
        return; 
    }

    try {
        let response = await fetch(`${API_URL}/api/resume/professional`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(resumeData)
        });

        let data = await response.json();
        console.log(data);
        if (response.ok === true) {
            showPopup("Data saved successfully! Downloading your CV...");             
            downloadResume();
        } else {            
            showPopup("Error: " + (data.message || "Something went wrong"));
        }
    } catch(error) {
        console.log(error);
        showPopup("Server error connection failed.");
    }
}

function downloadProResume(){
    addResume()
}

function addExperience(){
let id = 1
openAndClose(id)
}

function addSkills(){
let proSkills = document.getElementById("proSkills");
let skillContainer = document.getElementById("skillContainer");

if (proSkills.value == "") {
  showPopup("Please Enter Skill");
  return
}

skillContainer.innerHTML += `<span style="display: inline-block; margin-right: 10px;">• ${proSkills.value}</span>`;
proSkills.value = ""
}

function closeExperience(){
let id = 2
 openAndClose(id)
}

function addProject(){
let id = 3;
openAndClose(id)
}

function closeProject(){
let id = 4;
openAndClose(id)
}

function openAndClose(id){

let experience2 = document.getElementById("experience2");
let experienceCloseBtn = document.getElementById("experienceCloseBtn");
let previewSecondExp = document.getElementById("previewSecondExp");
let addMore = document.getElementById("addMore")

let project2 = document.getElementById("project2");
let closeProjectBtn = document.getElementById("closeProjectBtn");
let addMoreProject = document.getElementById("addMoreProject");
let previewProjectItem2 = document.getElementById("previewProjectItem2");

if (id === 1) {

experience2.style.display = "block"
experienceCloseBtn.style.display = "block";
previewSecondExp.style.display = "block";
addMore.style.display = "none"
}

if (id === 2) {
experience2.style.display = "none"
experienceCloseBtn.style.display = "none";
previewSecondExp.style.display = "none"
addMore.style.display = "block"
}

if (id === 3) {
project2.style.display = "block";
closeProjectBtn.style.display = "block";
previewProjectItem2.style.display = "block"
addMoreProject.style.display = "none"
}

if (id === 4) {
project2.style.display = "none";
closeProjectBtn.style.display = "none"
previewProjectItem2.style.display = "none"
addMoreProject.style.display = "block"
}


}


function handleDescriptionUpdate(text, containerId) {

const container = document.getElementById(containerId);
if (!container) return;
    
   
    if (!text || text.trim() === "") {


    if(containerId === "previewDescriptionContainer"){

    container.innerHTML = `
    <div class="resume-bullet">Led development of mission-critical web platforserving 2M+ users</div>
    <div class="resume-bullet">Architected microservices infrastructurincreasing system reliability by 40%</div>
    <div class="resume-bullet">Mentored team of 5 junior developers</div>`;
}

else if (containerId === "previewSummary"){
  container.innerText=  `Experienced Senior Web Developer with 8+ years of expertise in building scalable web applications using React, Node.js, and cloud technologies. Proven track record of delivering high-impact solutions for Fortune 500 companies.`
}

else if (containerId === "previewDescriptionContainer2") {

container.innerHTML = `
    
  <div class="resume-bullet" id="point1">Developed and optimized front-end components using modern JavaScript frameworks.</div>
  <div class="resume-bullet" id="point2">Collaborated with backend teams to integrate RESTful APIs and ensure data consistency.</div>
  <div class="resume-bullet" id="point3">Improved page load speed by 30% through image optimization and code refactoring.</div>
    `;
}

else if (containerId === "previewProjectDesc1"){

 container.innerHTML = `<div class="resume-bullet">Developed a fully functional e-commerce site with secure Stripe payment integration.</div>
<div class="resume-bullet">Optimized database queries, reducing page load time by 40%.</div>
<div class="resume-bullet">Implemented an admin dashboard for real-time inventory and order tracking.</div>`
}

else if (containerId === "previewProjectDesc2"){

container.innerHTML =  `<div class="resume-bullet">Built a collaborative task manager with real-time updates using WebSockets.</div>
<div class="resume-bullet">Integrated Google Auth for seamless user onboarding and security.</div>
<div class="resume-bullet">Designed a responsive UI that works across mobile, tablet, and desktop devices.</div>`

}

else if(containerId === "previewCertification"){
container.innerHTML =  `<div class="resume-bullet">AWS Solutions Architect Certification</div>
<div class="resume-bullet" id="previewAwards">Employee of the Year 2023 - Tech Corp Inc.</div>
<div class="resume-bullet">Innovation Award Winner 2022</div>`
}

return
}
        
  const lines = text.split('\n').filter(line => line.trim() !== "");
  const htmlContent = lines.map(line => `<div class="resume-bullet">${line}</div>`).join('');
  container.innerHTML = htmlContent;
    

}

function downloadResume() {
    
const element = document.querySelector('.resume');
if (!element) return;

const options = {
        margin:       0, 
        filename:     'My_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollY: 0,
        windowY: 0
    },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(options).from(element).save();
}



