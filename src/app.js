class Skill {
    constructor(name, ratio) {
        this.name = name;
        this.ratio = ratio;
    }
    setRatio(ratio) {
        this.ratio = ratio;
    }
}

const skillsContainer = document.querySelector('.card_additional-info_coding-skills_skills-info');
let skillsList = [
    new Skill('Java', 30),
    new Skill('C', 20),
    new Skill('Python', 10),
    new Skill('JavaScript', 5),
];

function init () {
    const addButton = document.querySelector('.card_additional-info_coding-skills_add-panel_add-button');
    addButton.addEventListener("click", () => addSkill());
    redrawSkillsContainer();
}

function addSkill() {
    let nameInput = document.querySelector('.card_additional-info_coding-skills_add-panel_input-skill-name');
    let valueInput = document.querySelector('.card_additional-info_coding-skills_add-panel_input-skill-value');
    let shouldAdd = true;
    if (nameInput.value === "" || nameInput.value.includes("<") || nameInput.value.includes(">")) {
        alert("Please write correct skill name!");
        shouldAdd = false;
    }
    if (valueInput.value === "" || isNaN(valueInput.value) || valueInput.value < 0 || valueInput.value > 100) {
        alert("Please write correct skill ratio!");
        shouldAdd = false;
    }
    for (let i = 0; i < skillsList.length; i++) {
        if (skillsList[i].name === nameInput.value) {
            if (skillsList[i].ratio === valueInput.value) {
                alert("This skill already exist!");
                shouldAdd = false;
            }
            skillsList[i].setRatio(valueInput.value);
            shouldAdd = false;
            redrawSkillsContainer();
        }
    }
    if (shouldAdd) {
        skillsList.push(new Skill(nameInput.value, valueInput.value));
        redrawSkillsContainer();
    }
    nameInput.value = "";
    valueInput.value = "";
}

function deleteSkill(skill) {
    let index = skillsList.indexOf(skill);
    if (index === -1) {
        return;
    }
    skillsList.splice(index, 1);
    redrawSkillsContainer();
}

function redrawSkillsContainer() {
    skillsContainer.innerHTML = '<h2>Coding Skills</h2>';
    for (let i = 0; i < skillsList.length; i++) {
        const skill = document.createElement("section");
        skill.classList.add("card_additional-info_coding-skills_programming-language-"+skillsList[i].name);
        skill.innerHTML =
            `<h3>${skillsList[i].name}</h3>
                <progress class="card_additional-info_coding-skills_programming-language-${skillsList[i].name}_progress" 
                    max="100" value=${skillsList[i].ratio}>
                </progress>
                <button class="card_additional-info_coding-skills_programming-language-${skillsList[i].name}_minus-button">-</button>`;
        skillsContainer.appendChild(skill);
        let deleteButton = document.querySelector('.card_additional-info_coding-skills_programming-language-'+skillsList[i].name+'_minus-button');
        deleteButton.addEventListener("click", () => deleteSkill(skillsList[i]));
    }
}

init();
