function ajax(recurso,funcao)
{
    let xhr=new XMLHttpRequest();
    xhr.open("get",recurso,true);
    xhr.setRequestHeader("Cache-Control","no-cache, no-store, must-revalidate");
    xhr.onreadystatechange=funcao;
    xhr.send();
}
        
function copiarTemplate(dados) {
    let template=document.getElementById("template");
    let pai=document.getElementsByTagName("body")[0];
    let copia=template.content.cloneNode(true);
    preencherDados(copia,dados);
    pai.appendChild(copia);
}
function preencherDados(artigo,dados)
{
    let spans=artigo.querySelectorAll("span");
    for(let i=0;i<spans.length;i++)
    {
        spans[i].firstChild.nodeValue=dados[i];
    }
}
function pegarDadosAssincronos()
{
    //alert(this.innerHTML+".xml");
    ajax(this.firstChild.nodeValue+".xml",
        function()
        {
            let dados=[];
            if(this.status==200&&this.readyState==4)
            {
                let raiz=this.responseXML.documentElement;
                let filhos=raiz.childNodes;
                for(let filho of filhos)
                {
                    //console.log(filho.firstChild.nodeValue);
                    if(filho.nodeType==1)
                    {
                        dados.push(filho.firstChild.nodeValue);
                    }
                }
                copiarTemplate(dados);
            }
        }
    );
}

//document.getElementsByTagName("button")[0].onclick=updateMenu;

setInterval(updateMenu, 2000);

function updateMenu(){
    //alert("A");
    ajax("menu.xml",updateMenuView);
}

function updateMenuView(){
    let dados=[];//string que guardará o nome dos arquivos com ".xml"
    if(this.status===200&&this.readyState===4){
        let ul=this.responseXML.documentElement;
        let filhos=ul.childNodes;
        for(let filho of filhos)
            if(filho.nodeType===1)
                dados.push(filho.firstChild.nodeValue);
        let pai = document.getElementsByTagName("nav")[0];
        limparConteudoObjeto(pai);
        for(let dado of dados){
            let botao=document.createElement("button"),
                nomeArquivo=dado.substr(0,dado.length-4);
            botao.appendChild(document.createTextNode(nomeArquivo));
            pai.appendChild(botao);
            botao.onclick=pegarDadosAssincronos;
        }
    }
}
function limparConteudoObjeto(pai){
    for(let i=pai.childNodes.length-1; i>=0; i--){
        pai.removeChild(pai.childNodes[i]);
    }
}