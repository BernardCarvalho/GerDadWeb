function mostrar(dados){
	//alert(dados);
	
    let parser= new DOMParser();
    let docXML=parser.parseFromString(dados,"text/xml");
    let raiz=docXML.documentElement;
    let compromissos=raiz.getElementsByTagName("compromisso");
    //for (let i=0;i<compromissos.length;i++)
    for(let DOMCompromisso of compromissos)
    {
        //let DOMCompromisso=compromissos[i];
        let objCompromisso=pegaCompromisso(DOMCompromisso);
        inserirTr(objCompromisso,document.querySelector("tbody"));
    }
}
function inserirTr(objCompromisso,pai)
{
    let tr=document.createElement("tr");
    pai.appendChild(tr);
    for(let chave in objCompromisso)
    {
        let noTexto=document.createTextNode(objCompromisso[chave])
        let td=document.createElement("td")
        td.appendChild(noTexto)
        tr.appendChild(td)
    }
    let tdDeletar=document.createElement("td");
    let btDeletar=document.createElement("input");
    btDeletar.type="button";
    btDeletar.value="Deletar";
    btDeletar.onclick=deletar;
    tdDeletar.appendChild(btDeletar);
    tr.appendChild(tdDeletar);
	
	let tdEditar=document.createElement("td");
	let btEditar=document.createElement("input");
	btEditar.type="button";
	btEditar.value="Editar";
	btEditar.onclick=editar;
	tdEditar.appendChild(btEditar);
	tr.appendChild(tdEditar);
	
}
function editar()
{
	//Titulo
	console.log(this.parentNode.parentNode.childNodes[0].childNodes[0]);
	this.parentNode.parentNode.childNodes[0].innerHTML = document.getElementById("titulo").value;
	console.log(document.getElementById("titulo").value);
	
	//Descricao
	console.log(this.parentNode.parentNode.childNodes[1].childNodes[0]);
	this.parentNode.parentNode.childNodes[1].innerHTML = document.getElementById("descricao").value;
	console.log(document.getElementById("titulo").value);
	
	//Data
	console.log(this.parentNode.parentNode.childNodes[2].childNodes[0]);
	this.parentNode.parentNode.childNodes[2].innerHTML = document.getElementById("data").value;
	console.log(document.getElementById("titulo").value);
	
	//Local
	console.log(this.parentNode.parentNode.childNodes[3].childNodes[0]);
	this.parentNode.parentNode.childNodes[3].innerHTML = document.getElementById("local").value;
	console.log(document.getElementById("titulo").value);
}
function deletar()
{

    //botoa.pega o pai que ?? a TD. pega o pai que ?? a TR. pega o primeiro filho
    //que ?? a primeira TD. pega o primeiro filho que ?? o n?? tipo texto. pega o nodeValue
    let textoTitulo=this.parentNode.parentNode.firstChild.firstChild.nodeValue;
    let textoCompromissos=localStorage.dados;
    let parser=new DOMParser();
    let docXML=parser.parseFromString(textoCompromissos,"text/xml");
    let raiz=docXML.documentElement;
    let compromisso=buscaTitulo(raiz,textoTitulo)
    if(compromisso!=null)
    {
        raiz.removeChild(compromisso);
    }
    let serealizador=new XMLSerializer();
    let textoXML=serealizador.serializeToString(docXML);
    localStorage.dados=textoXML;
    document.querySelector("tbody").innerHTML="";
    mostrar(localStorage.dados);
    
}
function buscaTitulo(raiz,textoTitulo)
{
    let titulos=raiz.getElementsByTagName("titulo");
    //for(let i=0;i<titulos.length;i++)
    //{
    //    let titulo=titulos[i]
    for(let titulo of titulos)
    {
        if(titulo.firstChild.nodeValue==textoTitulo)
            return titulo.parentNode;
    }
    return null;
}
function pegaCompromisso(DOMCompromisso)
{
    let objCompromisso={};
    objCompromisso.titulo=pegaInformacao(DOMCompromisso,"titulo");
    objCompromisso.descricao=pegaInformacao(DOMCompromisso,"descricao");
    objCompromisso.data=pegaInformacao(DOMCompromisso,"data");
    objCompromisso.local=pegaInformacao(DOMCompromisso,"local");
    return objCompromisso;
}
function pegaInformacao(domCompromisso,elemento)
{
    return domCompromisso.getElementsByTagName(elemento)[0].
    firstChild.nodeValue;
}

function inserir(){
	let tr = document.createElement("tr");
	let pai = document.querySelector("tbody");
	pai.appendChild(tr);
	
	let tdInput1 = document.createElement("td");
	let Input1 = document.getElementById("titulo");
	tr.appendChild(tdInput1);
	tdInput1.innerHTML=Input1.value;
	
	let tdInput2 = document.createElement("td");
	let Input2 = document.getElementById("descricao");
	tr.appendChild(tdInput2);
	tdInput2.innerHTML=Input2.value;
	
	let tdInput3 = document.createElement("td");
	let Input3 = document.getElementById("data");
	tr.appendChild(tdInput3);
	tdInput3.innerHTML=Input3.value;
	
	let tdInput4 = document.createElement("td");
	let Input4 = document.getElementById("local");
	tr.appendChild(tdInput4);
	tdInput4.innerHTML=Input4.value;
	
	
	
	let tdDeletar=document.createElement("td");
    let btDeletar=document.createElement("input");
    btDeletar.type="button";
    btDeletar.value="Deletar";
    btDeletar.onclick=deletar;
    tdDeletar.appendChild(btDeletar);
    tr.appendChild(tdDeletar);
	
	let tdEditar=document.createElement("td");
	let btEditar=document.createElement("input");
	btEditar.type="button";
	btEditar.value="Editar";
	btEditar.onclick=editar;
	tdEditar.appendChild(btEditar);
	tr.appendChild(tdEditar);
	
	
}
onload=()=>{
	//alert(localStorage.dados);
    if(localStorage.dados!=null)
    {
        let textoCompromissos=localStorage.dados;
        mostrar(textoCompromissos);
    }
    else
    {
        alert("Sem compromissos");
    }
    
};