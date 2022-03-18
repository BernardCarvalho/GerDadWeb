

function ajax(recurso,funcao)
{
    let xhr=new XMLHttpRequest();
    xhr.open("get",recurso,true);
    xhr.setRequestHeader("Cache-Control","no-cache, no-store, must-revalidate");
    xhr.onreadystatechange=funcao;
    xhr.send();
}

function limparConteudoObjeto(objeto){
    for(let i=objeto.childNodes.length-1; i>=0; i--){
        objeto.removeChild(objeto.childNodes[i]);
    }
}

function updateMenuView(){
    if(this.status===200&&this.readyState===4){
        let dados=[];

        let root = this.responseXML.documentElement;
        let lembretes = root.childNodes;
        
        for(let lembrete of lembretes){
            if(lembrete.nodeType===1)
                dados.push(lembrete.firstChild.nodeValue);
        }
        let pai = document.getElementsByTagName("nav")[0];
        limparConteudoObjeto(pai);
        
        for(let dado of dados){
            let     botao = document.createElement("button"),
                    tituloLembrete=dado;
            botao.appendChild(document.createTextNode(tituloLembrete));
            pai.appendChild(botao);
            botao.onclick=updateLembreteView;
        }
    }
}

function updateLembreteView(){
    let tituloLembrete=this.firstChild.nodeValue;
    console.log("PegaLembreteDoXML?nomeArquivo=lembretes.xml?&ituloLembrete="+tituloLembrete);
    ajax("PegaLembreteDoXML?nomeArquivo=lembretes.xml&tituloLembrete="+tituloLembrete,function(){
        if(this.status===200&&this.readyState===4){    
            
            let tipoDado=[];
            let dados=[];
            let root = this.responseXML.documentElement;
            let informacoes = root.childNodes;
            
            for(let informacao of informacoes){
                if(informacao.nodeType==1){
                    dados.push(informacao.firstChild.nodeValue);
                    tipoDado.push(informacao.nodeName);
                }
            }
            let conteudo = document.getElementsByTagName("div")[0];
            
            for(let i=0; i<dados.length;i++){
                conteudo.innerHTML+="<p><b>"+tipoDado[i]+"</b>:"+dados[i]+"</p>";
            }
            conteudo.appendChild(document.createElement("hr"));
       }
    });
}



setInterval(function(){ajax("PegaTitulosDoXML?nomeArquivo=lembretes.xml",updateMenuView);}, 15000);
ajax("PegaTitulosDoXML?nomeArquivo=lembretes.xml",updateMenuView);