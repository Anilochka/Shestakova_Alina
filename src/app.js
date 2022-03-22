class Skill {
    constructor(name, ratio) {
        this.name = name;
        this.ratio = ratio;
    }
    setRatio(ratio) {
        this.ratio = ratio;
    }
}

class SkillView {
    redrawSkillsContainer() {
        skillsContainer.innerHTML = '<h2>Coding Skills</h2>';
        for (let i = 0; i < skillsList.length; i++) {
            this.redrawSkillsContainerAfterAdd(skillsList[i]);
        }
    }

    redrawSkillsContainerAfterDelete(skill) {
        skillsContainer.querySelector('.card_additional-info_coding-skills_programming-language-' + skill.name).remove();
    }

    redrawSkillsContainerAfterAdd(skill) {
        const element = document.createElement("section");
        element.classList.add("card_additional-info_coding-skills_programming-language-" + skill.name);
        element.innerHTML =
            `<h3>${skill.name}</h3>
                <progress class="card_additional-info_coding-skills_programming-language-${skill.name}_progress" 
                    max="100" value=${skill.ratio}>
                </progress>
                <button class="card_additional-info_coding-skills_programming-language-${skill.name}_minus-button">-</button>`;
        skillsContainer.appendChild(element);
        let deleteButton = document.querySelector('.card_additional-info_coding-skills_programming-language-'
            + skill.name + '_minus-button');
        deleteButton.addEventListener("click", () => deleteSkill(skill));
    }

    redrawSkillsContainerAfterValueChange(skill) {
        skillsContainer.querySelector('.card_additional-info_coding-skills_programming-language-' + skill.name + '_progress')
            .setAttribute("value", skill.ratio);
    }
}

function init () {
    const addButton = document.querySelector('.card_additional-info_coding-skills_add-panel_add-button');
    addButton.addEventListener("click", () => addSkill());
    skillView.redrawSkillsContainer();
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
                alert("This skill already exists!");
                shouldAdd = false;
            }
            skillsList[i].setRatio(valueInput.value);
            shouldAdd = false;
            skillView.redrawSkillsContainerAfterValueChange(skillsList[i])
        }
    }
    if (shouldAdd) {
        let skill = new Skill(nameInput.value, valueInput.value);
        skillsList.push(skill);
        skillView.redrawSkillsContainerAfterAdd(skill);
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
    skillView.redrawSkillsContainerAfterDelete(skill);
}

const skillsContainer = document.querySelector('.card_additional-info_coding-skills_skills-info');
let skillsList = [
    new Skill('Java', 30),
    new Skill('C', 20),
    new Skill('Python', 10),
    new Skill('JavaScript', 5),
];
const skillView = new SkillView();

init();
