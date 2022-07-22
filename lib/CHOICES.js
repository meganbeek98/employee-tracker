import { getDepts, getManagers, getNonManagers, getRoleIds, getEmpRaw } from '../db/query_lib';

// calls for the database (db) and makes objects, then passes those objects through Inquirer
const deptChoices = async () => {
    const tempArr = await getDepts();

    const choices = tempArr[0];
  
    let choicesArr = [];
  
    choices.forEach(element => {
      let valueObj = {
        name: element.department_name,
        value: element.id
      }
      choicesArr.push(valueObj);
    });
  
    return choicesArr;
}

const mgmtChoices = async () => {  
    const tempArr = await getManagers();
  
    const choices = tempArr[0];
  
    let choicesArr = [];
  
    choices.forEach(element => {
      let valueObj = {
        name: element.manager_name,
        value: element.id
      }
      choicesArr.push(valueObj);
    });
  
    return choicesArr;
}

const NonMgmtChoices = async () => {
    const tempArr = await getNonManagers();
  
    const choices = tempArr[0];
  
    let choicesArr = [];
  
    choices.forEach(element => {
      let valueObj = {
        name: element.employee_name,
        value: element.id
      }
      choicesArr.push(valueObj);
    });
  
    return choicesArr;
}

const roleChoices = async () => {
    const tempArr = await getRoleIds();

    const choices = tempArr[0];
  
    let choicesArr = [];
  
    choices.forEach(element => {
      let valueObj = {
        name: element.title,
        value: element.id
      }
      choicesArr.push(valueObj);
    });
  
    return choicesArr;
}

const empChoices = async () => {
    const tempArr = await getEmpRaw();
  
    const choices = tempArr[0];
  
    let choicesArr = [];
  
    choices.forEach(element => {
      let valueObj = {
        name: element.first_name + ' ' + element.last_name,
        value: element.id
      }
      choicesArr.push(valueObj);
    });
  
    return choicesArr;
}
  
export default { deptChoices, mgmtChoices, roleChoices, empChoices, NonMgmtChoices };