
const API_URL = "https://resume-mate-olive.vercel.app"

document.getElementById('close-popup').onclick = function() {
document.getElementById('ai-info-popup').classList.remove('show');
};

const jobTitleInput2 = document.getElementById('jobTitleInput2');

if (jobTitleInput2) {
    jobTitleInput2.addEventListener('input', (e) => {
    document.getElementById('previewJobTitle2').innerText = e.target.value;
    });
}

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

async function descriptionEnhance(description, projectName, techStack, id){

if (!description.value || !projectName.value || !techStack.value) {
showPopup("Please enter your Job Title and Company Name so AI can write a much better description for you!");
return
}

try {
    
let experienceDetails = {
    description: description.value,
    projectName: projectName.value,
    techStack:techStack.value
}

let response = await fetch(`${API_URL}/api/gemini/fresher`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(experienceDetails)
});

let data = await response.json();
console.log(data);

console.log(data.data.data);


if (response.ok === true) {

const { point1, point2, point3 } = data.data.data;
const fullDescription = `${data.data.data.point1}\n${data.data.data.point2}\n${data.data.data.point3}`;

description.value = fullDescription
let targetContainer = (id === 1) ? 'projectsPoints' : 'projectPoints2';
textAreaHandler(fullDescription, targetContainer)

}
else{
    showPopup("Google Gemini is experiencing high demand. Please wait a moment and try again!")
}

} 

catch (error) {
console.log(error);    
showPopup("Google Gemini is experiencing high demand. Please wait a moment and try again!")
}
}



function fresherAddProjectHandler(){
let id = 3
openAndClose(id)
}

function projectCloser(){

let project2 = document.getElementById("fresherProject2");
let id = 4
openAndClose(id)
}


let fresherAiBtn = document.getElementById("fresherAiBtn");
if (fresherAiBtn) {
    fresherAiBtn.addEventListener("click", async function(){

    let objective = document.getElementById("objective");
    let fresherPreviewSummary = document.getElementById("fresherPreviewSummary");

    if (!objective.value) {
        showPopup(`
            Please enter your Professional Title/Role (e.g., Junior Web Developer) 
            to help AI craft a compelling career objective tailored to your profile.
        `);
        return
    }

    let objectiveData = {objective: objective.value};
    console.log(objective.value);
    
    
    try {
        
    let response = await fetch(`${API_URL}/api/gemini/objective`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        cache: "no-store",
        body: JSON.stringify(objectiveData)
    });

    let data = await response.json();
    console.log(data);

    if (response.ok === true) {
     objective.value = data.update
     fresherPreviewSummary.innerText = data.update
    }

    }

    catch (error) {
    console.log(error);
    showPopup(`Google Gemini is experiencing high demand. Please wait a moment and try again!`)   
    }

    })
}


function projectDescription(){
let projectName = document.getElementById("projectName");
let techStack = document.getElementById("techStack");
let description = document.getElementById("description");
let id = 1;
descriptionEnhance(description, projectName, techStack, id)
}


function projectDescription2(){
let projectName2 = document.getElementById("projectName2");
let techStack2 = document.getElementById("techStack2");
let description2 = document.getElementById("description2");
descriptionEnhance(description2, projectName2, techStack2)
}


function openInternSection(){
let id = 1;
openAndClose(id)
}

function closeInternSection(){
let id = 2
openAndClose(id)
}

function openAndClose(id){
let outerText = document.getElementById("outerText");
let openSectionBtn = document.getElementById("openSectionBtn");
let internshipSection = document.getElementById("internshipSection");
let closeSection = document.getElementById("closeSection");
let previewInternship = document.getElementById("previewInternship");


let project2 = document.getElementById("fresherProject2");
let secondProjectSection = document.getElementById("secondProjectSection");
let addMoreProject = document.getElementById("fresherAddMoreProject");
let closeProject = document.getElementById("closeProject");

if (id === 1) {
previewInternship.style.display = "block";
outerText.style.display = "none";
openSectionBtn.style.display = "none";
internshipSection.style.display = "block";
closeSection.style.display = "block";
}

if (id === 2) {
previewInternship.style.display = "none"
outerText.style.display = "block";
openSectionBtn.style.display = "block";
internshipSection.style.display = "none";
closeSection.style.display = "none";
}

if (id === 3) {
    project2.style.display = "block";
    closeProject.style.display = "block"
    secondProjectSection.style.display = "block"
    addMoreProject.style.display = "none"
}

if (id === 4) {
    project2.style.display = "none";
    closeProject.style.display = "none"
    secondProjectSection.style.display = "none"
    addMoreProject.style.display = "block"
}




}

function downloadBtn(){
  addResume()
}


async function addResume() {
    let resumeData = {};
    let hasError = false; 
    let isFormEmpty = false;
    let isSkillEmpty = false;

    const allInputs = document.querySelectorAll('[data-preview]');

    let skillContainer = document.getElementById("skillContainer");
    let inputField = document.getElementById("inputSkill");

    if (skillContainer && skillContainer.innerText.trim() === "") {
        if (inputField) inputField.style.border = "2px solid red";
        isSkillEmpty = true; 
        hasError = true;    
    } else {
        if (inputField) inputField.style.border = ""; 
    }

    let previewLanguage = document.getElementById("previewLanguage");
    let languageInput = document.getElementById("languageInput");
    let isLanguageEmpty = false;

    if (previewLanguage && previewLanguage.innerText.trim() === "") {
        if (languageInput) languageInput.style.border = "2px solid red";
        isLanguageEmpty = true; 
        hasError = true;    
    } else {
        if (languageInput) languageInput.style.border = ""; 
    }

 
    allInputs.forEach(function(input) {
        if (input.offsetParent === null) {
            input.style.border = "";
            return;
        }

        if (input.tagName === "INPUT" || input.tagName === 'TEXTAREA') {
            
            if (input.id === "inputSkill" || input.id === "languageInput") {
                
            } 
            else if (input.value.trim() === "") {
                input.style.border = "2px solid red";
                isFormEmpty = true; 
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
            } else if (tagKey === "fresherPreviewLanguages") {
                resumeData[tagKey] = textVal.split('•').map(s => s.trim()).filter(s => s !== "");
            } else {
                resumeData[tagKey] = textVal;
            }
        }
    });


    if (hasError) {
        if (isFormEmpty) {
        showPopup("Please complete all required fields before continuing.");
        } 
        
        else if (isSkillEmpty) {
        showPopup("Please add at least one skill before continuing.");
        } 
        
        else if (isLanguageEmpty) {
            
        showPopup("Please add at least one language before continuing.");
        }
        return; 
    }

    console.log(resumeData);
    try {
        let response = await fetch(`${API_URL}/api/resume/fresher`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(resumeData)
        });

        let data = await response.json(); 
        if (response.ok) {
            showPopup("Data saved successfully! Downloading your CV...");             
            downloadResume();
        } else {            
            showPopup("Error: " + (data.message || "Something went wrong"));
        }
    } catch (error) {
        console.log(error);
        showPopup("Server error connecting to database.");
    }
}

function addSkills(){
let inputSkill = document.getElementById("inputSkill");
let skillContainer = document.getElementById("skillContainer");
if (!inputSkill || !skillContainer) return;

if (inputSkill.value == "") {
  showPopup("Please Enter Skill");
  return
}

skillContainer.innerHTML += `<span style="display: inline-block; margin-right: 10px;">• ${inputSkill.value}</span>`;
inputSkill.value = ""

}


function addLanguage(){
let languageInput = document.getElementById("languageInput");
let previewLanguage = document.getElementById("previewLanguage");
if (!languageInput || !previewLanguage) return;

if (languageInput.value == "") {
    showPopup("Please Enter Language");
  return
}

previewLanguage.innerHTML += `<span style="display: inline-block; margin-right: 10px;">• ${languageInput.value}</span>`;
languageInput.value = ""

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
        windowY: 0,
        height: element.scrollHeight, 
        removeContainer: true
    },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    html2pdf().set(options).from(element).save();    

}

function textAreaHandler(text, containerId) {
    
const container = document.getElementById(containerId);
if (!container) return;

if (!text || text.trim() === "") {
    
    if (containerId === "projectsPoints") {
     
    container.innerHTML = `
         <div class="resume-bullet" id="projectPoint1">Built a full-stack learning management system for 100+ beta users</div>
        <div class="resume-bullet" id="projectPoint2">Implemented real-time notifications and course progress tracking</div>
        `;    
    }
    else if (containerId === "projectPoints2") {
        container.innerHTML = `
           <div class="resume-bullet" id="projectPoint4">Conducted comprehensive market research for a local startup to identify growth opportunities in 3 new cities.</div>
            <div class="resume-bullet" id="projectPoint5">Analyzed consumer behavior data from 500+ respondents to refine brand positioning and pricing strategy.</div>
            <div class="resume-bullet" id="projectPoint6">Developed a 12-month marketing roadmap that projected a 20% increase in customer engagement.</div>
        
        `;
    }
    else if (containerId === "AwardsText") {
        container.innerHTML = `
            <div class="resume-bullet" id="fresherPreviewCertification">Google Cloud Skills Boost - Web Development</div>
            <div class="resume-bullet" id="fresherPreviewCourses">Udemy - The Complete React Course 2024</div>
            <div class="resume-bullet">Coursera - Full Stack Web Development Specialization</div>
        `;
    }
    else if (containerId === "previewCertificationsContainer") {
        container.innerHTML = `
            <div class="resume-bullet">Google Cloud Skills Boost - Web Development</div>
            <div class="resume-bullet">Coursera - Full Stack Web Development Specialization</div>
        `;
    }
    else if (containerId === "previewCoursesContainer") {
        container.innerHTML = `
            <div class="resume-bullet">Udemy - The Complete React Course 2026</div>
            <div class="resume-bullet">FreeCodeCamp - Responsive Web Design Certification</div>
        `;
    }

    else if(containerId === "internshipPoints"){

      container.innerHTML = `<div class="resume-bullet" id="fresherInternBullet1">Developed responsive UI components using React and CSS, improving page load time by 25%</div>
     <div class="resume-bullet" id="fresherInternBullet2">Collaborated with senior developers on a real-world project, gaining hands-on experience</div>
     <div class="resume-bullet" id="fresherInternBullet3">Fixed 15+ bugs and implemented 5 feature requests under code review supervision</div>`

    }
    else if(containerId === "fresherPreviewAchievements"){
     container.innerHTML = ` 
     <div class="resume-bullet">Dean's List - All 4 Years</div>
     <div class="resume-bullet">Hackathon Winner - State University Tech Hackathon 2024</div>`
    }
    return; 
}
const lines = text.split('\n').filter(line => line.trim() !== "");
const htmlContent = lines.map(line => `<div class="resume-bullet">${line}</div>`).join('');
    
container.innerHTML = htmlContent;

}