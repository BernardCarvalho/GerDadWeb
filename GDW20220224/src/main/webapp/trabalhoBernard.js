/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
function ajaxBernard(recurso,funcao)
{
    let xhr=new XMLHttpRequest();
    xhr.open("get",recurso,true);
    xhr.onreadystatechange=funcao;
    xhr.send();
}

setInterval(AtualizaVisaoMenu, 2000);

function AtualizaVisaoMenu(){
    ajaxBernard("menu.xml",function(){
        let dados=[];
        if(this.status==200&&this.readyState==4){
            let ul=this.responseXML.documentElement;
            let filhos=ul.childNodes;
            for(let filho of filhos)
            {
                if(filho.nodeType==1)
                {
                    dados.push(filho.firstChild.nodeValue);
                }
            }
            //console.log(dados);
            copiarTemplateBernard(dados);
        }
        
    });
}

function copiarTemplateBernard(dados){
    let pai = document.getElementsByTagName("nav")[0];
    //console.log(dados);
    
    for(let i=pai.childNodes.length-1; i>=0; i--){
        pai.removeChild(pai.childNodes[i]);
    }
    //console.log(pai.childNodes.length);  
    for(dado of dados){
        let botao=document.createElement("button");
        let nomeArquivo=dado.substr(0,dado.length-4);
        //console.log(nomeArquivo);
        botao.appendChild(document.createTextNode(nomeArquivo));
        botao.setAttribute("name",dado);
        pai.appendChild(botao);
        botao.onclick=pegarDadosAssincronos;
    }
    //let copia=templateBernard.content.cloneNode(true);
    //pai.appendChild(copia);
   // console.log(pai.childNodes.length);  
}


