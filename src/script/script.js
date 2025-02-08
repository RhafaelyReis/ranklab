/*INSERIR E MOSTRAR IMAGENS*/
const divsImg = document.querySelectorAll(".div-img");
const mostrarImagens = document.getElementById("mostrarImagens");

function inserirImagens(){
    const inputFile = document.getElementById("img");
    const files = inputFile.files;

    if(files.length > 0){
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imagemURL = URL.createObjectURL(file);
            const imagemID = 'img' + new Date().getTime() + i;

            mostrarImagens.innerHTML += `<img draggable="true" ondragstart="drag(event)" id="${imagemID}" src="${imagemURL}" style="width: 100px; height: 100px; margin: 0 5px">`
        }
        
        inputFile.value = '';
    } else {
        alert("Nenhuma imagem foi selecionada.")
    }
}

/*FUNÇÕES DRAG & DROP*/
function allowDrop(event){
    event.preventDefault();
}

function drag(event){
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event){
    const idImagem = event.dataTransfer.getData("text");
    const imagem = document.getElementById(idImagem);

    if (imagem && event.target.classList.contains('div-img')) {
        event.target.appendChild(imagem);
        event.target.style.display = 'flex';
        event.target.style.flexWrap = 'wrap';
    }
}

divsImg.forEach(div => {
    div.ondragover = allowDrop;
    div.ondrop = drop;
});

/*FUNÇÃO DE DOWNLOAD DO PDF DO RANK*/
function downloadRank(){
    window.print();
}

function limparRank() {
    if (confirm("Tem certeza que deseja limpar todo o rank?")) {
        divsImg.forEach(div => {
            const imagens = div.querySelectorAll("img");
            imagens.forEach(img => mostrarImagens.appendChild(img));
        });
    }
}