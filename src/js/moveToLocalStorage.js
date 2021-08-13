
function addToLibary(){

const buttonWatch = document.querySelector(".modal__button-add");
buttonWatch.addEventListener("click", watch);

function watch(e){
    conssole.log(e.target);
}
}

export default {addToLibary};

