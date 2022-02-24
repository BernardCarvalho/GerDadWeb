function ajax(recurso, funcao) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", recurso, true);
    xhr.onreadystatechange = funcao;
    xhr.send();
}

document.getElementById("botao").onclick = pegarDadosAssincronos;

function pegarDadosAssincronos() {
    ajax("dados.xml",
        function () {
            if (this.status == 200 && this.readyState == 4) {
                let dados = [];
                let raiz = this.responseXML.documentElement;
                let filhos = raiz.childNodes;
                for (let filho of filhos) {
                    if (filho.nodeType == 1) {
                        dados.push(filho.firstChild.nodeValue);
                    }
                }
                let template = document.getElementById("template");
                let pai = document.getElementsByTagName("body")[0];
                let copia = template.content.cloneNode(true);
                let spans = copia.querySelectorAll("span");
                for (let i = 0; i < spans.length; i++) {
                    spans[i].firstChild.nodeValue = dados[i];
                }
                pai.appendChild(copia);
            }
        }
    );
}

